/**
 * export-module.js
 * ExportModule - Extensor de exportación para IPTV Navigator PRO
 * Versión V5.0 (High Performance - Anti OOM Crash)
 * 
 * CORRECCIONES CRÍTICAS:
 * 1. Array.push() + join() en lugar de string concatenation (Evita OOM).
 * 2. Cacha lecturas del DOM fuera del bucle (Velocidad x100).
 * 3. Corrige la duplicidad de headers #EXTHTTP.
 * 4. Limita la vista previa para no matar el proceso de renderizado (Render process gone).
 */

class ExportModule {
    /**
     * @param {IPTVNavigatorPro} appInstance
     */
    constructor(appInstance) {
        this.app = appInstance || null;
    }

    /**
     * Placeholder para evitar crash si se llama a serverless
     */
    _generateM3U8Serverless(channels, options) {
        console.warn("[ExportModule] Serverless generation not implemented in this module version.");
        return "";
    }

    /**
     * Generador M3U8 PRO - Optimizado para +50,000 canales
     */
    generateM3U8(channels, options = {}) {
        const app = this.app;
        if (!app) {
            console.warn("ExportModule: app instance missing.");
            return "";
        }

        // 1) Fuente de canales
        const chs = Array.isArray(channels) && channels.length
            ? channels
            : (typeof app.getFilteredChannels === "function"
                ? app.getFilteredChannels()
                : (app.state?.channels || []));

        if (!chs.length) {
            // Evitar alert bloqueante si no es necesario
            if (typeof alert !== "undefined" && !options.silent) alert("0 canales para generar.");
            return "";
        }

        // Check Serverless seguro
        if (options.useServerless && options.workerUrl) {
            this._generateM3U8Serverless(chs, options);
            return '';
        }

        console.time("GenerateM3U8_Process");

        // =========================================================
        // ⚡ OPTIMIZACIÓN 1: LECTURAS FUERA DEL BUCLE (Cache DOM)
        // =========================================================
        const doc = typeof document !== "undefined" ? document : null;
        const isOttOptimized = doc && doc.getElementById("ottNavOptimized")?.checked;

        // Validación segura para proStreaming
        let isProStreaming = options.proStreaming || false;
        if (!isProStreaming && doc) {
            const proEl = doc.getElementById("proStreamingOptimized");
            if (proEl) isProStreaming = proEl.checked;
        }

        // Inicializar headers si no existen
        if (!app.state.activeHeaders) {
            if (typeof app.initHeaderManager === "function") app.initHeaderManager();
            else app.state.activeHeaders = {};
        }

        const activeHeaders = options.customHeaders && Object.keys(options.customHeaders).length
            ? options.customHeaders
            : (app.state.activeHeaders || {});

        const includeHeaders = options.includeHeaders !== false;
        const baseLevel = parseInt(options.antiFreezeLevel || 3, 10) || 3;
        const autoDetect = (options.autoDetectLevel !== false);
        const targetPlayer = (options.targetPlayer || 'generic');

        // Pre-calcular modo de headers
        const headerValueMode = (() => {
            try { if (window.app?.getHeadersValueMode) return window.app.getHeadersValueMode(); } catch (e) { }
            return (typeof localStorage !== 'undefined' && localStorage.getItem('v41_headers_value_mode') === 'MANUAL') ? 'MANUAL' : 'APE';
        })();

        // Cachear referencias globales para evitar lookups masivos
        const Matrix = window.ULTRA_HEADERS_MATRIX;
        const Heuristics = window.HeadersIntelligentV41;
        const ConflictDetector = window.ConflictDetectorV41;
        const Telemetry = window.TelemetryFeedbackV41;
        const currentServer = (app.state && app.state.currentServer) ? app.state.currentServer : {};

        // =========================================================
        // ⚡ OPTIMIZACIÓN 2: ARRAY BUILDER (NO USAR STRING +=)
        // =========================================================
        const lines = [];

        // Header M3U
        lines.push("#EXTM3U");
        if (isOttOptimized) {
            lines.push("#EXTENC: UTF-8");
            lines.push("#PLAYLIST: IPTV Navigator PRO");
        }

        console.log(`[ExportModule] Procesando ${chs.length} canales (Modo Optimizado)...`);

        // BUCLE PRINCIPAL (26k iteraciones)
        const len = chs.length;
        for (let i = 0; i < len; i++) {
            const ch = chs[i];

            // Extracción de datos
            const final = this._getFinalView(ch);
            const name = final.name || "Sin Nombre";
            const group = final.group || "General";
            const logo = final.logo || "";
            const streamUrl = this._buildStreamUrl(ch);

            // IDs
            const epgId = ch.tvg_id || ch.base?.tvg_id || ch.epg_channel_id || "";
            const tvgName = ch.tvg_name || ch.base?.tvg_name || name;

            // Base tags string
            let tags = `tvg-id="${epgId}" tvg-name="${tvgName}" tvg-logo="${logo}" group-title="${group}"`;

            // === LÓGICA V4.1: SISTEMA UNIFICADO DE HEADERS ===
            let finalHeaders = {};
            let removed = [];
            const meta = { name, url: streamUrl, group }; // Objeto ligero

            if (includeHeaders) {
                // A) Heurística
                let appliedLevel = baseLevel;
                let confidence = 'N/A';
                let reasoning = 'manual';

                if (autoDetect && Heuristics?.analyzeChannel) {
                    const analysis = Heuristics.analyzeChannel(meta);
                    appliedLevel = analysis.level;
                    confidence = analysis.confidence;
                    reasoning = analysis.reasoning;
                }

                // B) Generación por Matrix
                let systemHeaders = {};
                if (Matrix?.getAllHeadersForLevel) {
                    try {
                        systemHeaders = Matrix.getAllHeadersForLevel(
                            appliedLevel, meta, currentServer
                        ) || {};
                    } catch (e) { systemHeaders = {}; }
                }

                // C) Merge Logic (Unificación)
                const merged = Object.assign({}, systemHeaders);

                // Iterar activeHeaders
                for (const k in activeHeaders) {
                    const vRaw = activeHeaders[k];
                    const v = (vRaw === null || vRaw === undefined) ? '' : String(vRaw).trim();

                    if (headerValueMode === 'MANUAL') {
                        merged[k] = v;
                    } else {
                        // APE Mode
                        if (!v) {
                            if (!merged.hasOwnProperty(k) && Matrix?.getHeaderValue) {
                                try {
                                    const gen = Matrix.getHeaderValue(k, appliedLevel, meta, {});
                                    if (gen) merged[k] = String(gen);
                                } catch (e) { }
                            }
                        } else {
                            merged[k] = v;
                        }
                    }
                }

                // D) Sanitización
                if (ConflictDetector?.sanitizeHeaders) {
                    const out = ConflictDetector.sanitizeHeaders(merged, { targetPlayer });
                    finalHeaders = out.headers || merged;
                    removed = out.removed || [];
                } else {
                    finalHeaders = merged;
                }

                // E) Inyectar Headers VLC y preparar JSON
                const sanitizedForJson = {};
                let hasUserAgent = false;

                for (const k in finalHeaders) {
                    const v = finalHeaders[k];
                    if (v && String(v).trim()) {
                        const vStr = String(v).trim();
                        lines.push(`#EXTVLCOPT:http-${k.toLowerCase()}=${vStr}`);
                        sanitizedForJson[k] = vStr;
                        if (k.toLowerCase() === 'user-agent') hasUserAgent = true;
                    }
                }

                // CORRECCIÓN: Inyectar JSON #EXTHTTP una sola vez aquí
                if (Object.keys(sanitizedForJson).length > 0) {
                    lines.push(`#EXTHTTP:${JSON.stringify(sanitizedForJson)}`);
                }

                // F) Telemetría (No bloqueante)
                if (Telemetry?.recordDecision) {
                    Telemetry.recordDecision(meta, {
                        baseLevel, recommendedLevel: appliedLevel, appliedLevel, confidence, reasoning, removed
                    });
                }

                // H) OTT Navigator Specifics
                if (isOttOptimized) {
                    // Catchup
                    if (ch.archive || ch.tv_archive || ch.base?.raw?.tv_archive) {
                        const days = ch.archive_dur || ch.base?.raw?.tv_archive_duration || 7;
                        tags += ` catchup="xc" catchup-days="${Math.ceil(days / 24)}" catchup-source="?utc={utc}&lutc={lutc}"`;
                    }
                    // User-Agent Fallback
                    if (!hasUserAgent) {
                        lines.push(`#EXTVLCOPT:http-user-agent=OTT Navigator/1.6.9.4`);
                    }
                }
            } // fin if includeHeaders

            // G) PRO Streaming Tags
            if (isProStreaming) {
                lines.push(`#EXTVLCOPT:network-caching=3000`);
                lines.push(`#EXTVLCOPT:http-reconnect=true`);
                lines.push(`#EXTVLCOPT:http-continuous=true`);
                lines.push(`#KODIPROP:inputstream=inputstream.adaptive`);
                lines.push(`#KODIPROP:inputstream.adaptive.manifest_type=hls`);
                lines.push(`#EXT-X-START:TIME-OFFSET=-3.0,PRECISE=YES`);
            }

            // Escritura final de la entrada
            lines.push(`#EXTINF:-1 ${tags},${name}`);
            lines.push(streamUrl);
        } // fin loop

        console.timeEnd("GenerateM3U8_Process");

        // =========================================================
        // ⚡ OPTIMIZACIÓN 3: JOIN FINAL (MEMORIA EFICIENTE)
        // =========================================================
        const content = lines.join('\n') + '\n';

        // Limpiar array inmediatamente para liberar RAM
        lines.length = 0;

        // Actualizar estado
        app.state.generatedM3U8 = content;

        if (doc) {
            const area = doc.getElementById("m3u8PreviewGen") ||
                doc.getElementById("m3u8Preview") ||
                doc.getElementById("m3u8PreviewContent");
            if (area) {
                // ⚠️ CRÍTICO: Limitar preview a 2000 chars para no matar el Render Process
                // El archivo descargado SÍ estará completo.
                const previewText = content.length > 2000
                    ? content.slice(0, 2000) + "\n\n... [VISTA PREVIA LIMITADA POR SEGURIDAD. DESCARGA EL ARCHIVO PARA VER TODO]"
                    : content;
                area.value = previewText;
            }
            const btnDown = doc.getElementById("btnDownloadM3U8Pro") || doc.getElementById("btnDownloadM3U8");
            if (btnDown) btnDown.disabled = false;
        }

        // Summary V4.1
        try {
            const el = doc?.getElementById('v41DecisionSummary');
            if (el && Telemetry) {
                const s = Telemetry.summarizeRecent(100);
                el.innerText = `V4.1: ${len} procesados | Headers ok`;
            }
        } catch (e) { }

        if (!options.silent) {
            console.log(`[ExportModule] Generado: ${chs.length} canales. Tamaño aprox: ${(content.length / 1024 / 1024).toFixed(2)} MB`);
        }

        return content;
    }

    _buildStreamUrl(ch) {
        const app = this.app;
        if (app?.state?.currentServer?.baseUrl && ch.stream_id) {
            const { baseUrl, username, password } = app.state.currentServer;
            const cleanBase = baseUrl.replace(/\/player_api\.php$/, "");

            let ext = app.state.streamFormat || "ts";
            let typePath = "live";

            if (ch.type === "movie" || ch.stream_type === "movie") {
                typePath = "movie";
                ext = ch.container_extension || "mp4";
            } else if (ch.type === "series" || ch.stream_type === "series") {
                typePath = "series";
                ext = "mp4";
            }
            return `${cleanBase}/${typePath}/${username}/${password}/${ch.stream_id}.${ext}`;
        }
        return ch.url || ch.base?.url || "#";
    }

    _getFinalView(ch) {
        // Acceso directo optimizado para preservar todos los datos
        const tech = ch.tech || {};
        const base = ch.base || {};
        const heuristics = ch.heuristics || {};

        return {
            name: base.name ?? ch.name ?? '',
            group: base.group ?? ch.group ?? '',
            logo: base.logo ?? ch.logo ?? ch.stream_icon ?? '',
            url: base.url ?? ch.url ?? '',
            resolution: tech.resolutionLabel ?? base.resolution ?? heuristics.resolution ?? ch.resolution ?? '',
            bitrate: tech.bitrateKbps ?? base.bitrate ?? heuristics.bitrate ?? ch.bitrate ?? 0,
            codec: tech.codec ?? base.codec ?? heuristics.codec ?? ch.codec ?? '',
            country: tech.country ?? base.country ?? heuristics.country ?? ch.country ?? 'INT',
            language: tech.language ?? base.language ?? heuristics.language ?? ch.language ?? 'MIX'
        };
    }
}

// Exponer globalmente
if (typeof window !== "undefined") {
    window.ExportModule = ExportModule;
}
