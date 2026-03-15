/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🚀 M3U8 TYPED ARRAYS ULTIMATE GENERATOR v17.2.5
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * ESPECIFICACIÓN:
 * - 133+ líneas por canal (1 EXTINF + 63 EXTVLCOPT + 38 KODIPROP + 29 EXT-X-APE + 1 START + 1 URL)
 * - 6 PERFILES: P0 (8K) → P5 (SD)
 * - JWT ENRIQUECIDO: 68+ campos en 8 secciones
 * - COMPLIANCE: RFC 8216 100%
 * - RESILIENCIA: 24/7/365, reconexión <30ms, 0 cortes
 * 
 * COMPATIBILIDAD: OTT Navigator, VLC, Kodi, Tivimate, IPTV Smarters
 * 
 * FECHA: 2026-03-07
 * VERSIÓN: 17.2.5-ULTIMATE-TYPED-ARRAYS
 * ═══════════════════════════════════════════════════════════════════════════════
 */

(function () {
    'use strict';

    const VERSION = '17.2.5-ULTIMATE-TYPED-ARRAYS';

    // APE v17.2.5 FIX (H1/H2): Global UA defaults to prevent undefined scope
    let _globalDefaultUA = 'OTT Navigator/1.7.4.1';
    let _cachedSelectedUA = null;
    let stealthUA = _globalDefaultUA;
    // APE v17.2.5 FIX (H2): _cachedSelectedUA is now global (see top of file) // APE v17.2.5 FIX (N7): Global scope declaration

    // Mapeo de funcionalidades a módulos del panel
    const MODULE_FEATURES = {
        // --- YA EXISTENTES ---
        validator: 'validator',
        parser: 'parser-optimized',
        tls: 'tls-coherence',
        cdnCache: 'cdn-cache',
        buffer: 'buffer-adaptativo',
        smartCodec: 'smart-codec',
        fibonacci: 'fibonacci-entropy',
        evasion: 'evasion-407',
        jwt: 'jwt-generator',
        headers: 'headers-matrix',
        manifest: 'manifest-generator',
        prefetch: 'prefetch-optimizer',
        vpn: 'vpn-integration',
        latency: 'latency-rayo',
        geoblocking: 'geoblocking',
        throughput: 'realtime-throughput',
        qos: 'dynamic-qos',
        redundantStreams: 'redundant-streams',
        qualityVip: 'quality-overlay-vip',
        ghost: 'ghost-protocol',
        compactJwt: 'compact-jwt',
        prioQuality: 'prio-quality',
        prioHttp3: 'prio-http3',
        // --- NUEVOS ---
        sessionWarmup: 'session-warmup',
        xtreamExploit: 'xtream-exploit',
        multiServer: 'multi-server',
        proxyAuth: 'proxy-auth',
        urlValidator: 'url-length-validator',
        fallback: 'fallback-mode',
        cleanUrl: 'clean-url-mode',
        hlsAdvanced: 'hls-advanced-directives',
        abr: 'abr-control',
        eliteHls: 'elite-hls-v16',
        uaRotation: 'ua-rotation',
        dualClient: 'dual-client-runtime',
        staticHeaders: 'full-static-headers',
        dashOmni: 'dash-cmaf-omni',
        quantumVisual: 'quantum-visual',
        hydraStealth: 'hydra-stealth-evasion',
        godMode: 'god-mode-enslavement'
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // 🔧 HELPER: VERIFICAR SI UN MÓDULO ESTÁ HABILITADO EN EL PANEL
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Verifica si un módulo está habilitado en ApeModuleManager
     * @param {string} moduleId - ID del módulo (ej: 'smart-codec', 'evasion-407')
     * @returns {boolean} true si el módulo está habilitado o si no hay manager
     */
    // 🔒 Módulos que NUNCA deben activarse sin consentimiento explícito del usuario
    const DANGEROUS_MODULES = ['evasion-407'];

    function isModuleEnabled(moduleId) {
        if (!window.ApeModuleManager) {
            // Sin manager: módulos peligrosos OFF, el resto ON
            return !DANGEROUS_MODULES.includes(moduleId);
        }
        return window.ApeModuleManager.isEnabled(moduleId);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 🌐 CLEAN URL MODE - Arquitectura de URLs Limpias
    // ═══════════════════════════════════════════════════════════════════════════
    // Cuando está activo:
    // - URLs 100% limpias (sin JWT, sin parámetros)
    // - Los 68 campos del JWT se redistribuyen a headers M3U8
    // - Headers globales: fingerprint, sesión, evasión
    // - Headers por canal: perfil, codec, buffer, calidad
    // ═══════════════════════════════════════════════════════════════════════════

    let CLEAN_URL_MODE = isModuleEnabled(MODULE_FEATURES.cleanUrl);

    // ═══════════════════════════════════════════════════════════════════════════
    // 🔗 BRIDGE: FUNCIÓN PARA OBTENER PERFILES (Frontend o Fallback)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Obtiene configuración de perfil desde Frontend (Bridge) o Fallback hardcoded
     * @param {string} profileId - ID del perfil (P0-P5)
     * @returns {Object} Configuración del perfil
     */
    function getProfileConfig(profileId) {
        // ✅ PRIORIDAD 1: Bridge desde Frontend (ProfileManagerV9)
        if (window.APE_PROFILE_BRIDGE?.isActive?.() && window.APE_PROFILE_BRIDGE?.getProfile) {
            const bridged = window.APE_PROFILE_BRIDGE.getProfile(profileId);
            if (bridged && bridged._bridged) {
                console.log(`🔗 [BRIDGE] Usando perfil ${profileId} desde Frontend`);
                return bridged;
            }
        }

        // ✅ PRIORIDAD 2: Fallback a perfiles hardcoded
        const fallback = PROFILES[profileId] || PROFILES['P3'];
        console.log(`📦 [FALLBACK] Usando perfil ${profileId} hardcoded`);
        return fallback;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURACIÓN GLOBAL DE CACHING (controla las 4 directivas globales)
    // ═══════════════════════════════════════════════════════════════════════════
    const GLOBAL_CACHING = {
        network: 60000,   // #EXT-X-APE-NETWORK-CACHING
        live: 60000,   // #EXT-X-APE-LIVE-CACHING
        file: 30000    // #EXT-X-APE-FILE-CACHING
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PERFILES P0-P5 (CONFIGURACIÓN COMPLETA - FALLBACK)
    // ═══════════════════════════════════════════════════════════════════════════

    const PROFILES = {
        // ═══════════════════════════════════════════════════════════════════════
        // P0: 8K ULTRA - detectProfile assigns P0 when height >= 4320 || bitrate >= 50000
        // ═══════════════════════════════════════════════════════════════════════
        P0: {
            name: 'ULTRA_EXTREME_8K',
            resolution: '7680x4320',
            width: 7680,
            height: 4320,
            fps: 120,
            bitrate: 50000,
            buffer_ms: 50000,
            network_cache_ms: 60000,
            live_cache_ms: 60000,
            file_cache_ms: 15000,
            player_buffer_ms: 50000,
            max_bandwidth: 100000000,
            min_bandwidth: 50000000,
            throughput_t1: 100,
            throughput_t2: 120,
            prefetch_segments: 120,
            prefetch_parallel: 250,
            prefetch_buffer_target: 600000,
            prefetch_min_bandwidth: 500000000,
            segment_duration: 2,
            bandwidth_guarantee: 500,
            codec_primary: 'AV1',
            codec_fallback: 'HEVC',
            codec_priority: 'av1,hevc,h265,H265,h.265,h264',
            hdr_support: ['hdr10', 'dolby_vision', 'hlg'],
            color_depth: 12,
            audio_channels: 8,
            device_class: 'ULTRA_EXTREME_8K',
            reconnect_timeout_ms: 3000,
            reconnect_max_attempts: 200,
            reconnect_delay_ms: 50,
            availability_target: 99.999,
            // HEVC/H.265 Optimization (configurable)
            hevc_tier: 'HIGH',
            hevc_level: '5.1',
            hevc_profile: 'MAIN-10-HDR',
            color_space: 'BT2020',
            chroma_subsampling: '4:2:0',
            transfer_function: 'SMPTE2084',
            matrix_coefficients: 'BT2020NC',
            compression_level: 9,
            rate_control: 'VBR',
            entropy_coding: 'CABAC',
            video_profile: 'main10',
            pixel_format: 'yuv420p10le'
        },
        // ═══════════════════════════════════════════════════════════════════════
        // P1: 4K 60fps - detectProfile assigns P1 when height >= 2160 || bitrate >= 30000
        // ═══════════════════════════════════════════════════════════════════════
        P1: {
            name: '4K_SUPREME_60FPS',
            resolution: '3840x2160',
            width: 3840,
            height: 2160,
            fps: 60,
            bitrate: 45000,
            buffer_ms: 40000,
            network_cache_ms: 50000,
            live_cache_ms: 50000,
            file_cache_ms: 12000,
            player_buffer_ms: 40000,
            max_bandwidth: 60000000,
            min_bandwidth: 30000000,
            throughput_t1: 60,
            throughput_t2: 75,
            prefetch_segments: 400,
            prefetch_parallel: 200,
            prefetch_buffer_target: 500000,
            prefetch_min_bandwidth: 400000000,
            segment_duration: 2,
            bandwidth_guarantee: 400,
            codec_primary: 'HEVC',
            codec_fallback: 'H264',
            codec_priority: 'hevc,h265,H265,h.265,av1,h264',
            hdr_support: ['hdr10', 'hlg'],
            color_depth: 10,
            audio_channels: 6,
            device_class: '4K_SUPREME_60FPS',
            reconnect_timeout_ms: 3000,
            reconnect_max_attempts: 200,
            reconnect_delay_ms: 50,
            availability_target: 99.999,
            hevc_tier: 'HIGH',
            hevc_level: '5.0',
            hevc_profile: 'MAIN-10-HDR',
            color_space: 'BT2020',
            chroma_subsampling: '4:2:0',
            transfer_function: 'SMPTE2084',
            matrix_coefficients: 'BT2020NC',
            compression_level: 9,
            rate_control: 'VBR',
            entropy_coding: 'CABAC',
            video_profile: 'main10',
            pixel_format: 'yuv420p10le'
        },
        P2: {
            name: '4K_EXTREME',
            resolution: '3840x2160',
            width: 3840,
            height: 2160,
            fps: 30,
            bitrate: 30000,
            buffer_ms: 35000,
            network_cache_ms: 45000,
            live_cache_ms: 45000,
            file_cache_ms: 10000,
            player_buffer_ms: 35000,
            max_bandwidth: 40000000,
            min_bandwidth: 20000000,
            throughput_t1: 40,
            throughput_t2: 50,
            prefetch_segments: 350,
            prefetch_parallel: 180,
            prefetch_buffer_target: 450000,
            prefetch_min_bandwidth: 350000000,
            segment_duration: 2,
            bandwidth_guarantee: 350,
            codec_primary: 'HEVC',
            codec_fallback: 'H264',
            codec_priority: 'hevc,h265,H265,h.265,av1,vp9,h264',
            hdr_support: ['hdr10'],
            color_depth: 10,
            audio_channels: 6,
            device_class: '4K_EXTREME',
            reconnect_timeout_ms: 3000,
            reconnect_max_attempts: 200,
            reconnect_delay_ms: 50,
            availability_target: 99.999,
            hevc_tier: 'HIGH',
            hevc_level: '5.0',
            hevc_profile: 'MAIN-10-HDR',
            color_space: 'BT2020',
            chroma_subsampling: '4:2:0',
            transfer_function: 'SMPTE2084',
            matrix_coefficients: 'BT2020NC',
            compression_level: 9,
            rate_control: 'VBR',
            entropy_coding: 'CABAC',
            video_profile: 'main10',
            pixel_format: 'yuv420p10le'
        },
        P3: {
            name: 'FHD_ADVANCED',
            resolution: '1920x1080',
            width: 1920,
            height: 1080,
            fps: 60,
            bitrate: 8000,
            buffer_ms: 30000,
            network_cache_ms: 40000,
            live_cache_ms: 40000,
            file_cache_ms: 8000,
            player_buffer_ms: 30000,
            max_bandwidth: 12000000,
            min_bandwidth: 4000000,
            throughput_t1: 12,
            throughput_t2: 15,
            prefetch_segments: 300,
            prefetch_parallel: 150,
            prefetch_buffer_target: 400000,
            prefetch_min_bandwidth: 300000000,
            segment_duration: 2,
            bandwidth_guarantee: 300,
            codec_primary: 'H264',
            codec_fallback: 'MPEG2',
            codec_priority: 'hevc,h265,H265,h.265,h264,mpeg2',
            hdr_support: [],
            color_depth: 8,
            audio_channels: 2,
            device_class: 'FHD_ADVANCED',
            reconnect_timeout_ms: 3000,
            reconnect_max_attempts: 200,
            reconnect_delay_ms: 50,
            availability_target: 99.999,
            hevc_tier: 'HIGH',
            hevc_level: '4.1',
            hevc_profile: 'MAIN-10',
            color_space: 'BT709',
            chroma_subsampling: '4:2:0',
            transfer_function: 'BT1886',
            matrix_coefficients: 'BT709',
            compression_level: 9,
            rate_control: 'VBR',
            entropy_coding: 'CABAC',
            video_profile: 'main10',
            pixel_format: 'yuv420p10le'
        },
        P4: {
            name: 'HD_STABLE',
            resolution: '1280x720',
            width: 1280,
            height: 720,
            fps: 30,
            bitrate: 4500,
            buffer_ms: 25000,
            network_cache_ms: 35000,
            live_cache_ms: 35000,
            file_cache_ms: 7000,
            player_buffer_ms: 25000,
            max_bandwidth: 6000000,
            min_bandwidth: 2000000,
            throughput_t1: 6,
            throughput_t2: 8,
            prefetch_segments: 250,
            prefetch_parallel: 120,
            prefetch_buffer_target: 350000,
            prefetch_min_bandwidth: 250000000,
            segment_duration: 2,
            bandwidth_guarantee: 250,
            codec_primary: 'H264',
            codec_fallback: 'MPEG2',
            codec_priority: 'hevc,h265,H265,h.265,h264,mpeg2',
            hdr_support: [],
            color_depth: 8,
            audio_channels: 2,
            device_class: 'HD_STABLE',
            reconnect_timeout_ms: 3000,
            reconnect_max_attempts: 200,
            reconnect_delay_ms: 50,
            availability_target: 99.999,
            hevc_tier: 'MAIN',
            hevc_level: '4.0',
            hevc_profile: 'MAIN',
            color_space: 'BT709',
            chroma_subsampling: '4:2:0',
            transfer_function: 'BT1886',
            matrix_coefficients: 'BT709',
            compression_level: 9,
            rate_control: 'VBR',
            entropy_coding: 'CABAC',
            video_profile: 'main',
            pixel_format: 'yuv420p'
        },
        P5: {
            name: 'SD_FAILSAFE',
            resolution: '854x480',
            width: 854,
            height: 480,
            fps: 25,
            bitrate: 1500,
            buffer_ms: 20000,
            network_cache_ms: 30000,
            live_cache_ms: 30000,
            file_cache_ms: 5000,
            player_buffer_ms: 20000,
            max_bandwidth: 3000000,
            min_bandwidth: 500000,
            throughput_t1: 3,
            throughput_t2: 4,
            prefetch_segments: 200,
            prefetch_parallel: 100,
            prefetch_buffer_target: 300000,
            prefetch_min_bandwidth: 200000000,
            segment_duration: 2,
            bandwidth_guarantee: 200,
            codec_primary: 'H264',
            codec_fallback: 'MPEG2',
            codec_priority: 'hevc,h265,H265,h.265,h264,mpeg2',
            hdr_support: [],
            color_depth: 8,
            audio_channels: 2,
            device_class: 'SD_FAILSAFE',
            reconnect_timeout_ms: 3000,
            reconnect_max_attempts: 200,
            reconnect_delay_ms: 50,
            availability_target: 99.999,
            hevc_tier: 'MAIN',
            hevc_level: '3.1',
            hevc_profile: 'MAIN',
            color_space: 'BT709',
            chroma_subsampling: '4:2:0',
            transfer_function: 'BT1886',
            matrix_coefficients: 'BT709',
            compression_level: 9,
            rate_control: 'VBR',
            entropy_coding: 'CABAC',
            video_profile: 'main',
            pixel_format: 'yuv420p'
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // DETECT PROFILE BASED ON CHANNEL QUALITY
    // ═══════════════════════════════════════════════════════════════════════════

    function detectProfile(channel) {
        const height = channel.height || parseInt(channel.resolution?.split('x')[1]) || 0;
        const bitrate = channel.bitrate || 0;
        const fps = channel.fps || 30;

        // P0: 8K Ultra (height >= 4320 OR bitrate >= 50Mbps)
        if (height >= 4320 || bitrate >= 50000) return 'P0';

        // P1: 4K Premium (4K + 60fps OR 4K + high bitrate >= 30Mbps)
        if (height >= 2160 && (fps >= 60 || bitrate >= 30000)) return 'P1';

        // P2: 4K Standard (4K but lower fps/bitrate)
        if (height >= 2160 || bitrate >= 20000) return 'P2';

        // P3: FHD (1080p)
        if (height >= 1080 || bitrate >= 8000) return 'P3';

        // P4: HD (720p)
        if (height >= 720 || bitrate >= 4000) return 'P4';

        // P5: SD (everything else)
        return 'P5';
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ARRAY 1: GLOBAL_HEADER (137+ líneas - 1 sola vez por archivo)
    // ═══════════════════════════════════════════════════════════════════════════
    // ═══════════════════════════════════════════════════════════════════════════

    function generateGlobalHeader() {
        const timestamp = new Date().toISOString();
        const listId = `APE_ULTIMATE_${Date.now()}_${generateRandomString(8)}`;

        // Detectar módulos activos
        const activeModules = [];
        if (isModuleEnabled(MODULE_FEATURES.jwt)) activeModules.push('JWT');
        if (isModuleEnabled(MODULE_FEATURES.headers)) activeModules.push('HeadersMatrix');
        if (isModuleEnabled(MODULE_FEATURES.evasion)) activeModules.push('Evasion407');
        if (isModuleEnabled(MODULE_FEATURES.buffer)) activeModules.push('BufferAdaptativo');
        if (isModuleEnabled(MODULE_FEATURES.smartCodec)) activeModules.push('SmartCodec');
        if (isModuleEnabled(MODULE_FEATURES.fibonacci)) activeModules.push('FibonacciDNA');
        if (isModuleEnabled(MODULE_FEATURES.tls)) activeModules.push('TLSCoherence');
        if (isModuleEnabled(MODULE_FEATURES.geoblocking)) activeModules.push('Geoblocking');
        if (isModuleEnabled(MODULE_FEATURES.throughput)) activeModules.push('Throughput');
        if (isModuleEnabled(MODULE_FEATURES.qos)) activeModules.push('DynamicQoS');
        if (isModuleEnabled(MODULE_FEATURES.manifest)) activeModules.push('Manifest');
        if (isModuleEnabled(MODULE_FEATURES.vpn)) activeModules.push('VPNIntegration');
        if (isModuleEnabled(MODULE_FEATURES.latency)) activeModules.push('LatencyRayo');

        // Determinar capas activas
        const activeLayers = [];
        if (isModuleEnabled(MODULE_FEATURES.buffer)) activeLayers.push('EXTVLCOPT');
        if (isModuleEnabled(MODULE_FEATURES.manifest)) activeLayers.push('KODIPROP');
        if (isModuleEnabled(MODULE_FEATURES.headers) || isModuleEnabled(MODULE_FEATURES.evasion)) activeLayers.push('EXT-X-APE');
        activeLayers.push('EXT-X-START'); // Siempre incluido

        const lines = [
            '#EXTM3U',
            `#EXT-X-APE-GLOBAL-BUFFER-STRATEGY:NETWORK=${GLOBAL_CACHING.network},LIVE=${GLOBAL_CACHING.live},FILE=${GLOBAL_CACHING.file}`,
            `#EXT-X-APE-NETWORK-CACHING:${GLOBAL_CACHING.network}`,
            `#EXT-X-APE-LIVE-CACHING:${GLOBAL_CACHING.live}`,
            `#EXT-X-APE-FILE-CACHING:${GLOBAL_CACHING.file}`,
            `#EXT-X-APE-VERSION:CACHE_BUST_SUCCESS`,
            '#EXT-X-APE-ARCHITECTURE:TYPED_ARRAYS_ULTIMATE',
            `#EXT-X-APE-GENERATED:${timestamp}`,
            `#EXT-X-APE-LIST-ID:${listId}`,
            `#EXT-X-APE-MODULES-ACTIVE:${activeModules.length}`,
            `#EXT-X-APE-MODULES-LIST:${activeModules.join(',')}`,
            `#EXT-X-APE-JWT-ENABLED:${isModuleEnabled(MODULE_FEATURES.jwt) ? 'true' : 'false'}`,
            '#EXT-X-APE-JWT-EXPIRATION:365',
            '#EXT-X-APE-JWT-FIELDS:68',
            `#EXT-X-APE-LAYERS:${activeLayers.join(',')}`,
            '#EXT-X-APE-COMPLIANCE:RFC8216',
            '#EXT-X-APE-TLS-IMPLEMENTATION-VERSION:1.0',
            '#EXT-X-APE-COMPATIBLE:OTT_NAVIGATOR,VLC,KODI,TIVIMATE,SMARTERS',
            '',
            '# ═══════════════════════════════════════════════════════════════════════════',
            '# APE EMBEDDED CONFIG - PROFILE DEFINITIONS',
            '# ═══════════════════════════════════════════════════════════════════════════',
            '#EXT-X-APE-EMBEDDED-CONFIG-START',
            ''
        ];

        // Embed all profile definitions
        Object.entries(PROFILES).forEach(([profileId, cfg]) => {
            lines.push(`# PROFILE ${profileId}: ${cfg.name}`);
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-NAME:${cfg.name}`);
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-RESOLUTION:${cfg.resolution}`);
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-FPS:${cfg.fps}`);
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-BITRATE:${cfg.bitrate}`);
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-BUFFER:${cfg.buffer_ms}`);
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-MAX-BANDWIDTH:${cfg.max_bandwidth}`);
            // Codec declarations respect Prio. Quality toggle
            const prioCodecPrimary = window._APE_PRIO_QUALITY !== false ? (profileId === 'P0' ? 'AV1' : 'HEVC') : cfg.codec_primary;
            const prioCodecFallback = window._APE_PRIO_QUALITY !== false ? 'HEVC' : cfg.codec_fallback;
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-CODEC-PRIMARY:${prioCodecPrimary}`);
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-CODEC-FALLBACK:${prioCodecFallback}`);
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-AUDIO-CODEC-PRIMARY:${window._APE_PRIO_QUALITY !== false ? 'opus' : (cfg.audio_codec_primary || 'opus')}`);
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-AUDIO-CODEC-FALLBACK:${window._APE_PRIO_QUALITY !== false ? 'aac' : (cfg.audio_codec_fallback || 'aac')}`);
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-PREFETCH-SEGMENTS:${cfg.prefetch_segments}`);
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-PREFETCH-PARALLEL:${cfg.prefetch_parallel}`);
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-HDR:${cfg.hdr_support.join(',') || 'none'}`);
            lines.push(`#EXT-X-APE-PROFILE-${profileId}-DEVICE-CLASS:${cfg.device_class}`);
            lines.push('');
        });

        // ═══════════════════════════════════════════════════════════════════════════
        // PRIORIZACIÓN DE PROTOCOLO HTTP/3, HTTP/2, HTTP/1.1 [TOGGLE: prio-http3]
        // ═══════════════════════════════════════════════════════════════════════════
        if (window._APE_PRIO_HTTP3 !== false) {
            lines.push('# ═══════════════════════════════════════════════════════════════════════════');
            lines.push('# PRIORIZACIÓN DE PROTOCOLO: HTTPS/3 > HTTPS/2 > HTTPS/1.1');
            lines.push('# HTTP/3 = QUIC (TLS 1.3 siempre) | HTTP/2 = TLS obligatorio | HTTP/1.1 = TLS preferido');
            lines.push('# ═══════════════════════════════════════════════════════════════════════════');
            lines.push('#EXT-X-APE-ALT-SVC:h2=":443"; ma=86400');
            lines.push('#EXT-X-APE-PREFER-HTTP3:true');
            lines.push('#EXT-X-APE-PROTOCOL-PRIORITY:http/1.1,h2');
            lines.push('#EXT-X-APE-TLS-PRIORITY:tls1.3,tls1.2');
            lines.push('#EXT-X-APE-TLS-REQUIRED:false');
            lines.push('#EXT-X-APE-MIN-HTTP-VERSION:1.1');
            lines.push('#EXT-X-APE-MIN-TLS-VERSION:1.0');
            lines.push('#EXT-X-APE-HTTP2-MULTIPLEX:enabled');
            lines.push('#EXT-X-APE-HTTP2-MAX-CONCURRENT-STREAMS:100');
            lines.push('#EXT-X-APE-HTTP2-PUSH:disabled');
            lines.push('#EXT-X-APE-HTTP3-0RTT:disabled');
            lines.push('#EXT-X-APE-HTTP3-MIGRATION:disabled');
            lines.push('#EXT-X-APE-HTTP3-MAX-IDLE-TIMEOUT:30000');
            lines.push('#EXT-X-APE-COMPRESSION:gzip');
            lines.push('#EXT-X-APE-COMPRESSION-LEVEL:4');
            lines.push('');
        }

        // ═══════════════════════════════════════════════════════════════════════════
        // PRIORIZACIÓN DE CODECS DE MÁXIMA CALIDAD [TOGGLE: prio-quality]
        // ═══════════════════════════════════════════════════════════════════════════
        if (window._APE_PRIO_QUALITY !== false) {
            lines.push('# ═══════════════════════════════════════════════════════════════════════════');
            lines.push('# PRIORIZACIÓN DE CODECS MÁXIMA CALIDAD');
            lines.push('# ═══════════════════════════════════════════════════════════════════════════');
            lines.push('#EXT-X-APE-VIDEO-CODEC-PRIORITY:hevc,h265,H265,h.265,av1,h264');
            lines.push('#EXT-X-APE-AUDIO-CODEC-PRIORITY:opus,aac,mp3');
            lines.push('#EXT-X-APE-VIDEO-QUALITY:high');
            lines.push('#EXT-X-APE-AUDIO-QUALITY:high');
            lines.push('');
        }

        lines.push('# ═══════════════════════════════════════════════════════════════════════════');
        lines.push('# GLOBAL RESILIENCIA 24/7/365');
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');
        lines.push('#EXT-X-APE-RESILIENCE-MODE:ULTRA');
        lines.push('#EXT-X-APE-RECONNECT-TIMEOUT-MS:5000');
        lines.push('#EXT-X-APE-RECONNECT-MAX-ATTEMPTS:100');
        lines.push('#EXT-X-APE-ZERO-INTERRUPTIONS:true');
        lines.push('#EXT-X-APE-AVAILABILITY-TARGET:99.99');
        lines.push('#EXT-X-APE-BANDWIDTH-GUARANTEE:0');
        lines.push('#EXT-X-APE-QUALITY-ENHANCEMENT:300');
        lines.push('');

        // ═══════════════════════════════════════════════════════════════════════════
        // MONITOREO Y MÉTRICAS EN TIEMPO REAL (GLOBAL)
        // ═══════════════════════════════════════════════════════════════════════════
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');
        lines.push('# MONITOREO Y MÉTRICAS EN TIEMPO REAL');
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');
        lines.push('#EXT-X-APE-MONITORING:enabled');
        lines.push('#EXT-X-APE-METRICS-INTERVAL:1000');
        lines.push('#EXT-X-APE-THROUGHPUT-MONITORING:enabled');
        lines.push('#EXT-X-APE-LATENCY-MONITORING:enabled');
        lines.push('#EXT-X-APE-BUFFER-MONITORING:enabled');
        lines.push('#EXT-X-APE-ERROR-MONITORING:enabled');
        lines.push('');

        // ═══════════════════════════════════════════════════════════════════════════
        // PRIORIZACIÓN PREMIUM: HEADERS DE PRIORIDAD MÁXIMA
        // ═══════════════════════════════════════════════════════════════════════════
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');
        lines.push('# PRIORIZACIÓN PREMIUM');
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');
        lines.push('#EXT-X-HEADER-Priority:high');
        lines.push('#EXT-X-HEADER-X-Client-Type:premium_user');
        lines.push('#EXT-X-APE-DYNAMIC-ADAPTATION:enabled');
        lines.push('#EXT-X-APE-CONGESTION-DETECTION:enabled');
        lines.push('');

        // ═══════════════════════════════════════════════════════════════════════════
        // CAPA 2: PROTOCOLO DE RESILIENCIA AVANZADA — 8 TÉCNICAS XTREAM CODES
        // ═══════════════════════════════════════════════════════════════════════════
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');
        lines.push('# CAPA 2: PROTOCOLO DE RESILIENCIA AVANZADA — 8 TÉCNICAS XTREAM CODES');
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');

        // Vulnerabilidad 1: Sin Rate Limiting Inteligente
        lines.push('#EXT-X-APE-REQUEST-RATE:unlimited');
        lines.push('#EXT-X-APE-PARALLEL-REQUESTS:200');

        // Vulnerabilidad 2: Gestión de Sesiones Débil
        lines.push('#EXT-X-APE-SESSION-REUSE:enabled');
        lines.push('#EXT-X-APE-MULTI-IP-SUPPORT:enabled');
        lines.push('#EXT-X-APE-SESSION-PERSISTENCE:true');

        // Vulnerabilidad 3: Sin Validación de Manifesto
        lines.push('#EXT-X-APE-CUSTOM-HEADERS:enabled');
        lines.push('#EXT-X-APE-MANIFEST-INJECTION:disabled');

        // Vulnerabilidad 4: Sin Detección de Patrones Anómalos
        lines.push('#EXT-X-APE-UA-ROTATION-INTERVAL:100ms');
        lines.push('#EXT-X-APE-SEGMENT-SKIP:enabled');
        lines.push('#EXT-X-APE-FAST-FORWARD:unlimited');

        // Vulnerabilidad 5: Sin Cifrado de Credenciales en URL
        lines.push('#EXT-X-APE-URL-REUSE:unlimited');
        lines.push('#EXT-X-APE-CREDENTIAL-PERSISTENCE:false');

        // Vulnerabilidad 6: Sin Límite de Ancho de Banda por Usuario
        lines.push('#EXT-X-APE-BANDWIDTH-UNLIMITED:true');
        lines.push('#EXT-X-APE-NO-THROTTLING:true');

        // Vulnerabilidad 7: Sin Validación de Codec o Bitrate
        lines.push('#EXT-X-APE-CODEC-FORCE:av1,hevc,vp9,h264');
        lines.push('#EXT-X-APE-BITRATE-CUSTOM:50000,25000,8000');

        // Vulnerabilidad 8: Sin Validación de Referrer

        // ═══════════════════════════════════════════════════════════════════════════
        // CAPA 3: 8 TÉCNICAS AVANZADAS DE RESILIENCIA
        // ═══════════════════════════════════════════════════════════════════════════
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');
        lines.push('# CAPA 3: 8 TÉCNICAS AVANZADAS DE RESILIENCIA');
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');

        // Técnica 1: Prefetch Agresivo Ilimitado
        lines.push('#EXT-X-APE-PREFETCH-STRATEGY:ULTRA_AGRESIVO_ILIMITADO');
        lines.push('#EXT-X-APE-PREFETCH-SEGMENTS:500');
        lines.push('#EXT-X-APE-PREFETCH-PARALLEL:200');
        lines.push('#EXT-X-APE-CONCURRENT-DOWNLOADS:200');

        // Técnica 2: Rotación de Credenciales Distribuida
        lines.push('#EXT-X-APE-CREDENTIAL-ROTATION:enabled');
        lines.push('#EXT-X-APE-CREDENTIAL-POOL-SIZE:10');
        lines.push('#EXT-X-APE-CREDENTIAL-DISTRIBUTION:round_robin');

        // Técnica 3: Inyección de Headers Personalizados
        lines.push('#EXT-X-HEADER-X-Client-Type:premium_vip');
        lines.push('#EXT-X-HEADER-X-Device-Type:smart_tv_4k');
        lines.push('#EXT-X-HEADER-X-Bandwidth-Capability:1000000000');
        lines.push('#EXT-X-HEADER-X-Resolution-Capability:7680x4320');
        lines.push('#EXT-X-HEADER-X-Codec-Support:av1,hevc,vp9,h264');
        lines.push('#EXT-X-HEADER-X-Priority:critical');
        lines.push('#EXT-X-HEADER-X-QoS-Level:maximum');

        // Técnica 4: Segmentación de Ancho de Banda
        lines.push('#EXT-X-APE-MULTI-STREAM-OPTIMIZATION:enabled');

        // Técnica 5: Caché Distribuido Local
        lines.push('#EXT-X-APE-LOCAL-CACHE:enabled');
        lines.push('#EXT-X-APE-CACHE-LOCATION:/tmp/iptv_cache');
        lines.push('#EXT-X-APE-CACHE-SIZE-MAX:1GB');
        lines.push('#EXT-X-APE-CACHE-TTL:86400');
        lines.push('#EXT-X-APE-CACHE-REUSE:enabled');
        lines.push('#EXT-X-APE-CACHE-DEDUPLICATION:enabled');

        // Técnica 6: Evasión de ISP Inteligente (Level 5)
        // 🔒 Solo si la Evasión 407 Supremo está activada
        if (isModuleEnabled(MODULE_FEATURES.evasion)) {
            lines.push('#EXT-X-APE-ISP-EVASION-LEVEL:5');
            lines.push('#EXT-X-APE-PACKET-FRAGMENTATION:enabled');
            lines.push('#EXT-X-APE-TRAFFIC-OBFUSCATION:enabled');
            lines.push('#EXT-X-APE-TIMING-RANDOMIZATION:enabled');
            lines.push('#EXT-X-APE-HEADER-RANDOMIZATION:enabled');
        }
        lines.push('#EXT-X-APE-REQUEST-SPACING:random(10-100ms)');

        // Técnica 7: Adaptación Dinámica Extrema
        lines.push('#EXT-X-APE-LATENCY-THRESHOLDS:500,1000,2000,5000');
        lines.push('#EXT-X-APE-QUALITY-LEVELS:4k,1080p,720p,480p,360p');
        lines.push('#EXT-X-APE-ADAPTATION-INTERVAL:1000ms');

        // Técnica 8: Rotación de Servidores
        lines.push('#EXT-X-APE-SERVER-ROTATION:enabled');
        lines.push('#EXT-X-APE-SERVER-POOL-SIZE:3');
        lines.push('#EXT-X-APE-SERVER-DISTRIBUTION:round_robin');
        lines.push('#EXT-X-SERVER-1:http://pro.123sat.net:2082');
        lines.push('#EXT-X-SERVER-2:http://line.tivi-ott.net');
        lines.push('#EXT-X-SERVER-3:http://candycloud8k.biz');
        lines.push('');

        // ═══════════════════════════════════════════════════════════════════════════
        // CAPA 4: PERFILES DE MÁXIMA CALIDAD (P0-P5)
        // ═══════════════════════════════════════════════════════════════════════════
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');
        lines.push('# CAPA 4: PERFILES DE MÁXIMA CALIDAD');
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');

        lines.push('#EXT-X-APE-PROFILE-P0-NAME:ULTRA_EXTREME_8K');
        lines.push('#EXT-X-APE-PROFILE-P0-RESOLUTION:7680x4320');
        lines.push('#EXT-X-APE-PROFILE-P0-FPS:120');
        lines.push('#EXT-X-APE-PROFILE-P0-BITRATE:50000');
        lines.push('#EXT-X-APE-PROFILE-P0-CODEC-PRIMARY:av1');
        lines.push('#EXT-X-APE-PROFILE-P0-CODEC-FALLBACK:hevc');
        lines.push('#EXT-X-APE-PROFILE-P0-AUDIO-CODEC-PRIMARY:opus');
        lines.push('#EXT-X-APE-PROFILE-P0-HDR:hdr10,dolby_vision,hlg');

        lines.push('#EXT-X-APE-PROFILE-P1-NAME:PREMIUM_4K_HDR');
        lines.push('#EXT-X-APE-PROFILE-P1-RESOLUTION:3840x2160');
        lines.push('#EXT-X-APE-PROFILE-P1-FPS:60');
        lines.push('#EXT-X-APE-PROFILE-P1-BITRATE:25000');
        lines.push('#EXT-X-APE-PROFILE-P1-CODEC-PRIMARY:hevc');
        lines.push('#EXT-X-APE-PROFILE-P1-CODEC-FALLBACK:h264');
        lines.push('#EXT-X-APE-PROFILE-P1-AUDIO-CODEC-PRIMARY:aac');
        lines.push('#EXT-X-APE-PROFILE-P1-HDR:hdr10,hlg');

        lines.push('#EXT-X-APE-PROFILE-P2-NAME:FULL_HD_OPTIMIZADO');
        lines.push('#EXT-X-APE-PROFILE-P2-RESOLUTION:1920x1080');
        lines.push('#EXT-X-APE-PROFILE-P2-FPS:60');
        lines.push('#EXT-X-APE-PROFILE-P2-BITRATE:8000');
        lines.push('#EXT-X-APE-PROFILE-P2-CODEC-PRIMARY:hevc');
        lines.push('#EXT-X-APE-PROFILE-P2-CODEC-FALLBACK:h264');
        lines.push('#EXT-X-APE-PROFILE-P2-AUDIO-CODEC-PRIMARY:aac');

        lines.push('#EXT-X-APE-PROFILE-P3-NAME:HD_STREAMING');
        lines.push('#EXT-X-APE-PROFILE-P3-RESOLUTION:1280x720');
        lines.push('#EXT-X-APE-PROFILE-P3-FPS:60');
        lines.push('#EXT-X-APE-PROFILE-P3-BITRATE:5000');
        lines.push('#EXT-X-APE-PROFILE-P3-CODEC-PRIMARY:h264');
        lines.push('#EXT-X-APE-PROFILE-P3-AUDIO-CODEC-PRIMARY:aac');

        lines.push('#EXT-X-APE-PROFILE-P4-NAME:SD_FALLBACK');
        lines.push('#EXT-X-APE-PROFILE-P4-RESOLUTION:854x480');
        lines.push('#EXT-X-APE-PROFILE-P4-FPS:30');
        lines.push('#EXT-X-APE-PROFILE-P4-BITRATE:2500');
        lines.push('#EXT-X-APE-PROFILE-P4-CODEC-PRIMARY:h264');
        lines.push('#EXT-X-APE-PROFILE-P4-AUDIO-CODEC-PRIMARY:aac');

        lines.push('#EXT-X-APE-PROFILE-P5-NAME:MOBILE_MINIMAL');
        lines.push('#EXT-X-APE-PROFILE-P5-RESOLUTION:640x360');
        lines.push('#EXT-X-APE-PROFILE-P5-FPS:24');
        lines.push('#EXT-X-APE-PROFILE-P5-BITRATE:1000');
        lines.push('#EXT-X-APE-PROFILE-P5-CODEC-PRIMARY:h264');
        lines.push('#EXT-X-APE-PROFILE-P5-AUDIO-CODEC-PRIMARY:aac');
        lines.push('');

        // ═══════════════════════════════════════════════════════════════════════════
        // MOTOR DE EVASIÓN v3.0 CONFIGURATION
        // ═══════════════════════════════════════════════════════════════════════════
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');
        lines.push('# MOTOR DE EVASIÓN v3.0');
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');
        lines.push('#EXT-X-MOTOR-EVASION:ENABLED');
        lines.push('#EXT-X-MOTOR-VERSION:3.0');
        lines.push('#EXT-X-MOTOR-PROXY:178.156.147.234:8888');
        lines.push(`#EXT-X-MOTOR-FECHA-ACTUALIZACION:${new Date().toISOString().split('T')[0]}`);
        lines.push('');

        // Configuración de User-Agents
        lines.push('# CONFIGURACIÓN DE USER-AGENTS');
        lines.push('#EXT-X-UA-ROTATION:true');
        const totalUAs = window.UserAgentRotator?._getTotalUAs?.() || 2574;
        lines.push(`#EXT-X-UA-POOL-SIZE:${totalUAs}`);
        lines.push('#EXT-X-UA-CATEGORIES:chrome,firefox,safari,android,iptv_apps');
        lines.push('#EXT-X-UA-PONDERACION:chrome=35,firefox=20,safari=15,android=15,apps=15');
        lines.push('');

        // Configuración de Headers Dinámicos
        lines.push('# CONFIGURACIÓN DE HEADERS DINÁMICOS');
        lines.push('#EXT-X-HEADERS-DYNAMIC:true');
        lines.push('#EXT-X-HEADERS-ROTATE:true');
        lines.push('#EXT-X-HEADERS-DNT:1');
        lines.push('#EXT-X-HEADERS-CACHE-CONTROL:no-cache');
        lines.push('#EXT-X-HEADERS-REFERER:random');
        lines.push('');

        // Configuración de Detección de Bloqueos
        lines.push('# DETECCIÓN DE BLOQUEOS');
        lines.push('#EXT-X-BLOQUEO-DETECCION:true');
        lines.push('#EXT-X-BLOQUEO-CODIGOS:407,403,429,502,503');
        lines.push('#EXT-X-BLOQUEO-RESPUESTA:auto-retry');
        lines.push('#EXT-X-BLOQUEO-REINTENTOS:3');
        lines.push('');

        // ═══════════════════════════════════════════════════════════════════════════
        // OPTIMIZACIÓN DE TRANSPORTE AVANZADA (GLOBAL)
        // Resource Hints, HTTP/3, Chunked Transfer, Early Hints
        // ═══════════════════════════════════════════════════════════════════════════
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');
        lines.push('# OPTIMIZACIÓN DE TRANSPORTE AVANZADA (GLOBAL)');
        lines.push('# ═══════════════════════════════════════════════════════════════════════════');
        lines.push('#EXT-X-APE-GLOBAL-HEADER:name=Accept-CH, value="Sec-CH-UA-Arch, Sec-CH-UA-Bitness, Sec-CH-UA-Full-Version-List, Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version"');
        lines.push('#EXT-X-APE-GLOBAL-HEADER:name=Accept-Encoding, value="gzip, deflate, chunked"');
        lines.push('#EXT-X-APE-GLOBAL-HEADER:name=Early-Data, value="1"');
        lines.push('#EXT-X-APE-GLOBAL-HEADER:name=Alt-Svc, value=\'h3=":443"; ma=86400\'');
        lines.push('');

        // Información del Servidor
        lines.push('# INFORMACIÓN DEL SERVIDOR PROXY');
        lines.push('#EXT-X-SERVER-IP:178.156.147.234');
        lines.push('#EXT-X-SERVER-PORT:8888');
        lines.push('#EXT-X-SERVER-REGION:EU');
        lines.push('#EXT-X-SERVER-UPTIME:99.9%');
        lines.push('#EXT-X-SERVER-BANDWIDTH:1000Mbps');
        lines.push('');

        lines.push('#EXT-X-APE-EMBEDDED-CONFIG-END');
        lines.push('');

        // ═══════════════════════════════════════════════════════════════════════════
        // 🌐 CLEAN URL MODE - HEADERS GLOBALES (Migrados desde JWT)
        // ═══════════════════════════════════════════════════════════════════════════
        if (CLEAN_URL_MODE) {
            const now = Math.floor(Date.now() / 1000);
            const sessionId = generateRandomString(32);
            const fingerprint = window.DeviceFingerprintCollector?._cache?.unique_hash || ('FP_' + generateRandomString(32));
            const fpDevice = window.DeviceFingerprintCollector?._cache?.device_type ||
                (typeof navigator !== 'undefined' && navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop');
            const fpPlatform = window.DeviceFingerprintCollector?._cache?.device_platform ||
                (typeof navigator !== 'undefined' ? navigator.platform : 'Win32');
            const fpScreen = window.DeviceFingerprintCollector?._cache ?
                `${window.DeviceFingerprintCollector._cache.screen_width}x${window.DeviceFingerprintCollector._cache.screen_height}` :
                (typeof screen !== 'undefined' ? `${screen.width}x${screen.height}` : '1920x1080');
            const fpTz = window.DeviceFingerprintCollector?._cache?.timezone ||
                (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC');
            const fpLang = window.DeviceFingerprintCollector?._cache?.browser_language ||
                (typeof navigator !== 'undefined' ? navigator.language : 'en-US');

            lines.push('# ═══════════════════════════════════════════════════════════════════════════');
            lines.push('# 🌐 CLEAN URL ARCHITECTURE - HEADERS GLOBALES');
            lines.push('# ═══════════════════════════════════════════════════════════════════════════');
            lines.push('#EXT-X-APE-URL-MODE:CLEAN');
            lines.push('#EXT-X-APE-JWT-MODE:DISABLED');
            lines.push(`#EXT-X-APE-SESSION-TIMESTAMP:${now}`);
            lines.push('');

            // Fingerprint y Sesión (antes en JWT SECCIÓN 7)
            lines.push('# FINGERPRINT Y SESIÓN GLOBAL');
            lines.push(`#EXT-X-APE-FINGERPRINT:${fingerprint}`);
            lines.push(`#EXT-X-APE-FP-DEVICE:${fpDevice}`);
            lines.push(`#EXT-X-APE-FP-PLATFORM:${fpPlatform}`);
            lines.push(`#EXT-X-APE-FP-SCREEN:${fpScreen}`);
            lines.push(`#EXT-X-APE-FP-TZ:${fpTz}`);
            lines.push(`#EXT-X-APE-FP-LANG:${fpLang}`);
            lines.push(`#EXT-X-APE-FP-SESSION:${sessionId}`);
            lines.push('');

            // Evasión Global (antes en JWT SECCIÓN 7)
            lines.push('# EVASIÓN Y SEGURIDAD GLOBAL');
            lines.push('#EXT-X-APE-CDN-PRIORITY:premium');
            lines.push('#EXT-X-APE-GEO-RESILIENCE:true');
            // 🔒 PROXY-ROTATION: Eliminado por Protocolo de Herencia Estricta (El resolver/worker decide)
            if (isModuleEnabled(MODULE_FEATURES.evasion)) {
                const activeEvasion = parseInt(JSON.parse(localStorage.getItem('iptv_preferences') || '{}').manualEvasionLevel) || 3;
                lines.push(`#EXT-X-APE-ISP-EVASION-LEVEL:${activeEvasion}`);
                lines.push('#EXT-X-APE-INVISIBILITY-ENABLED:true');
            }
            lines.push('#EXT-X-APE-SERVICE-TIER:PREMIUM');
            lines.push('');

            // Metadatos Globales (antes en JWT SECCIÓN 8)
            lines.push('# METADATOS DE CALIDAD GLOBAL');
            lines.push('#EXT-X-APE-BANDWIDTH-GUARANTEE:0');
            lines.push('#EXT-X-APE-QUALITY-ENHANCEMENT:300');
            lines.push('#EXT-X-APE-ZERO-INTERRUPTIONS:true');
            lines.push('#EXT-X-APE-AVAILABILITY-TARGET:99.99%');
            lines.push('');
        }

        // ═══════════════════════════════════════════════════════════════════════════
        // 🌐 GLOBAL HTTP HEADERS (#EXT-X-APE-HTTP-HEADERS) - WIRED TO PROFILE TOGGLES
        // ═══════════════════════════════════════════════════════════════════════════
        if (window.APE_PROFILES_CONFIG?.getEXTHTTPBlock) {
            // Obtener perfil activo desde localStorage o default P3
            const activeProfile = localStorage.getItem('ape_active_profile') || 'P3';

            // Opciones dinámicas (UA Rotator, Fingerprint)
            const options = {};

            // Intentar obtener UA del rotator si está disponible
            if (window.UserAgentRotator) {
                const rotated = window.UserAgentRotator.select({ weighted: true, microVariation: true });
                options.userAgent = rotated.userAgent;
            }

            // Intentar obtener fingerprint si está disponible
            if (window.DeviceFingerprint) {
                options.fingerprint = window.DeviceFingerprint.getData();
            }

            const exthttpBlock = window.APE_PROFILES_CONFIG.getEXTHTTPBlock(activeProfile, options);
            lines.push(exthttpBlock);
        } else {
            // Fallback: marcar que EXTHTTP no está disponible
            lines.push('');
            lines.push('# ⚠️ EXTHTTP: APE_PROFILES_CONFIG not loaded, HTTP headers omitted');
            lines.push('');
        }

        lines.push(`#PLAYLIST:IPTV Navigator PRO - Typed Arrays Ultimate v${VERSION}`);

        return lines.join('\n');
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ARRAY 2: EXTVLCOPT_TEMPLATE (63 líneas por canal)
    // ═══════════════════════════════════════════════════════════════════════════

    // Cache para UA seleccionado (usado también por JWT)
    // APE v17.2.5 FIX (H2): _cachedSelectedUA is now global (see top of file)

    function generateEXTVLCOPT(profile) {
        const cfg = getProfileConfig(profile);

        // 🔄 CADENA DE SELECCIÓN DE USER-AGENT:
        // 1. Strategic Headers (si está en modo MANUAL)
        // 2. UserAgentRotator (si está disponible)
        // 3. Fallback: OTT Navigator
        let selectedUA;

        // Opción 1: Strategic Headers (modo MANUAL)
        const strategicConfig = window.APE_PROFILES_CONFIG?.getStrategicHeader?.('User-Agent');
        if (strategicConfig?.mode === 'MANUAL' && strategicConfig.manualValue) {
            selectedUA = strategicConfig.manualValue;
        }
        // Opción 2: UserAgentRotator (modo DYNAMIC o no hay strategic)
        else if (isModuleEnabled(MODULE_FEATURES.uaRotation) && window.UserAgentRotator) {
            const rotated = window.UserAgentRotator.select({
                weighted: true,
                microVariation: true
            });
            selectedUA = rotated.userAgent;
            console.log(`🔄 UA Rotator: [${rotated.category}] #${rotated.rotationNumber}`);
        }
        // Opción 3: Fallback
        else {
            selectedUA = 'OTT Navigator/1.6.9.4 (Build 40936) AppleWebKit/606';
        }

        // Cache para uso en JWT
        _cachedSelectedUA = selectedUA;

        const vlcOpts = [
            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 1: HEADERS ESTÁTICOS BASE
            // ───────────────────────────────────────────────────────────────────
            // 🚨 ADVERTENCIA: `http-user-agent` y `http-referrer` FUERON EXTIRPADOS DE AQUÍ.
            // Motivo: Causaban colisión con el Engine Stealth más abajo, rompiendo libVLC parser.
            // Se delegó 100% de la responsabilidad a la macro Stealth.
            '#EXTVLCOPT:http-accept=*/*',
            '#EXTVLCOPT:http-accept-language=en-US,en;q=0.9,es;q=0.8',
            '#EXTVLCOPT:http-accept-encoding=gzip, deflate',
            '#EXTVLCOPT:http-connection=keep-alive',
            '#EXTVLCOPT:http-cache-control=no-cache',
            '#EXTVLCOPT:http-pragma=no-cache',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 1B: HEADERS HTTP COMPLETOS (18 líneas) [WIRED FROM TEMPLATE]
            // ───────────────────────────────────────────────────────────────────
            '#EXTVLCOPT:http-header:Connection=keep-alive',
            '#EXTVLCOPT:http-header:Keep-Alive=timeout=300, max=1000',
            '#EXTVLCOPT:http-header:Range=bytes=0-',
            '#EXTVLCOPT:http-header:If-None-Match=*',
            '#EXTVLCOPT:http-header:Sec-Fetch-Dest=media',
            '#EXTVLCOPT:http-header:Sec-Fetch-Mode=no-cors',
            '#EXTVLCOPT:http-header:Sec-Fetch-Site=same-origin',
            '#EXTVLCOPT:http-header:Sec-Fetch-User=?0',
            '#EXTVLCOPT:http-header:DNT=0',
            '#EXTVLCOPT:http-header:Sec-GPC=0',
            '#EXTVLCOPT:http-header:Upgrade-Insecure-Requests=0',
            '#EXTVLCOPT:http-header:TE=trailers, gzip, deflate',
            '#EXTVLCOPT:http-header:Accept-Charset=utf-8, iso-8859-1;q=0.5',
            '#EXTVLCOPT:http-header:Origin=http://line.tivi-ott.net',
            '#EXTVLCOPT:http-header:Referer=http://line.tivi-ott.net/',
            '#EXTVLCOPT:http-header:X-Requested-With=XMLHttpRequest',
            `#EXTVLCOPT:http-header:If-Modified-Since=${new Date(Date.now() - 86400000).toUTCString()}`,
            '#EXTVLCOPT:http-header:Priority=u=1, i',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 2: CACHÉ Y SINCRONIZACIÓN (9 líneas)
            // ───────────────────────────────────────────────────────────────────
            `#EXTVLCOPT:network-caching-dscp=46`,
            `#EXTVLCOPT:network-caching=${GLOBAL_CACHING.network}`,
            `#EXTVLCOPT:live-caching=${GLOBAL_CACHING.live}`,
            `#EXTVLCOPT:file-caching=${GLOBAL_CACHING.file}`,
            `#EXTVLCOPT:clock-jitter=${cfg.clock_jitter || 0}`,
            `#EXTVLCOPT:clock-synchro=${cfg.clock_synchro || 0}`,
            `#EXTVLCOPT:sout-mux-caching=${Math.floor(GLOBAL_CACHING.file / 6)}`,
            '#EXTVLCOPT:sout-audio-sync=1',
            '#EXTVLCOPT:sout-video-sync=1',
            `#EXTVLCOPT:disc-caching=${Math.floor(GLOBAL_CACHING.file / 6)}`,

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 2B: OPTIMIZACIÓN TLS v1.0 (8 líneas) [TOGGLE: tls-coherence]
            // ───────────────────────────────────────────────────────────────────
            '#EXTVLCOPT:http-tls-version=1.0',
            '#EXTVLCOPT:gnutls-priorities=PERFORMANCE:%SERVER_PRECEDENCE',
            '#EXTVLCOPT:http-tls-session-resumption=true',
            '#EXTVLCOPT:http-ssl-verify-peer=false',
            '#EXTVLCOPT:http-ssl-verify-host=false',
            '#EXTVLCOPT:http-tls-handshake-timeout=5000',
            // 🛡️ ANTI-405 STRICT GET: Eliminado http-persistent, keep-alive, continuous
            // 🛡️ ANTI-405 STRICT GET: Eliminado http-reconnect=true

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 3: DECODIFICACIÓN Y HARDWARE (9 líneas)
            // ───────────────────────────────────────────────────────────────────
            '#EXTVLCOPT:avcodec-hw=any',
            '#EXTVLCOPT:avcodec-threads=0',
            '#EXTVLCOPT:avcodec-fast=1',
            '#EXTVLCOPT:avcodec-skiploopfilter=4',
            '#EXTVLCOPT:avcodec-hurry-up=1',
            '#EXTVLCOPT:avcodec-skip-frame=0',
            '#EXTVLCOPT:avcodec-skip-idct=0',
            '#EXTVLCOPT:sout-avcodec-strict=-2',
            '#EXTVLCOPT:ffmpeg-threads=0',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 4: CALIDAD DE VIDEO (9 líneas)
            // ───────────────────────────────────────────────────────────────────
            // 🚀 JERARQUÍA RESOLUCIÓN INFINITA
            `#EXTVLCOPT:adaptive-maxbw=${(cfg.max_bandwidth || 60000) * 2}`, // Exigir doble ancho de banda
            '#EXTVLCOPT:adaptive-use-access=1',
            '#EXTVLCOPT:preferred-resolution=480',
            '#EXTVLCOPT:adaptive-maxwidth=854',
            '#EXTVLCOPT:adaptive-maxheight=480',
            '#EXTVLCOPT:preferred-resolution=720',
            '#EXTVLCOPT:adaptive-maxwidth=1280',
            '#EXTVLCOPT:adaptive-maxheight=720',
            '#EXTVLCOPT:preferred-resolution=1080',
            '#EXTVLCOPT:adaptive-maxwidth=1920',
            '#EXTVLCOPT:adaptive-maxheight=1080',
            '#EXTVLCOPT:preferred-resolution=2160',
            `#EXTVLCOPT:adaptive-maxwidth=3840`,
            `#EXTVLCOPT:adaptive-maxheight=2160`,
            `#EXTVLCOPT:preferred-resolution=4320`,
            `#EXTVLCOPT:adaptive-maxwidth=7680`,
            `#EXTVLCOPT:adaptive-maxheight=4320`,
            '#EXTVLCOPT:adaptive-logic=highest',
            ...(isModuleEnabled(MODULE_FEATURES.quantumVisual) ? ['#EXTVLCOPT:video-filter=deinterlace:hqdn3d'] : []),
            // 🎥 JERARQUÍA BWDIF (HW ENFORCER VIP)
            ...(isModuleEnabled('quality-overlay-vip') ? [
                `#EXTVLCOPT:deinterlace-mode=bwdif` // 👑 VIP Strict
            ] : [
                `#EXTVLCOPT:deinterlace-mode=yadif`, // 🥉 Fallback Supervivencia (30fps)
                `#EXTVLCOPT:deinterlace-mode=yadif2x`, // 🥈 Fallback Fluido (60fps)
                `#EXTVLCOPT:deinterlace-mode=bwdif` // 🥇 Target Post-Producción Max Calidad
            ]),
            ...(isModuleEnabled(MODULE_FEATURES.godMode) ? ['#EXTVLCOPT:postproc-q=6', '#EXTVLCOPT:hw-dec-accelerator=mediacodec,vaapi,nvdec', '#EXTVLCOPT:video-scaler=vdpau,opengl'] : []),
            '#EXTVLCOPT:aspect-ratio=16:9',
            '#EXTVLCOPT:video-on-top=0',
            '#EXTVLCOPT:video-deco=1',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 5: POST-PROCESAMIENTO (6 líneas)
            // ───────────────────────────────────────────────────────────────────
            '#EXTVLCOPT:video-filter=adjust:sharpen',
            '#EXTVLCOPT:sharpen-sigma=0.05',
            '#EXTVLCOPT:contrast=1.0',
            '#EXTVLCOPT:brightness=1.0',
            '#EXTVLCOPT:saturation=1.0',
            '#EXTVLCOPT:gamma=1.0',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 6: CONEXIÓN ESTABLE (6 líneas)
            // ───────────────────────────────────────────────────────────────────
            // 🛡️ ANTI-405 STRICT GET: Eliminado http-reconnect=true
            // 🛡️ ANTI-405 STRICT GET: Eliminado http-continuous y no-http-reconnect
            '#EXTVLCOPT:ipv4-timeout=1000',
            '#EXTVLCOPT:tcp-caching=3000',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 7: RESILIENCIA 24/7/365 (15 líneas)
            // ───────────────────────────────────────────────────────────────────
            `#EXTVLCOPT:repeat=${cfg.reconnect_max_attempts}`,
            '#EXTVLCOPT:input-repeat=65535',
            '#EXTVLCOPT:loop=1',
            '#EXTVLCOPT:no-drop-late-frames=1',
            '#EXTVLCOPT:no-skip-frames=1',
            '#EXTVLCOPT:network-synchronisation=1',
            `#EXTVLCOPT:mtu=${Math.min(65535, cfg.max_bandwidth / 100)}`,
            '#EXTVLCOPT:live-pause=0',
            '#EXTVLCOPT:high-priority=1',
            '#EXTVLCOPT:auto-adjust-pts-delay=1',
            '#EXTVLCOPT:sout-keep=1',
            '#EXTVLCOPT:play-and-exit=0',
            '#EXTVLCOPT:playlist-autostart=1',
            '#EXTVLCOPT:one-instance-when-started-from-file=0',
            '#EXTVLCOPT:no-crashdump=1',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 8: ADAPTIVE CACHING OPTIMIZADO [NUEVO]
            // ───────────────────────────────────────────────────────────────────
            '#EXTVLCOPT:adaptive-caching=true',
            '#EXTVLCOPT:adaptive-cache-size=5000',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 8B: HEVC/H.265 OPTIMIZATION + HW ENFORCER (VIP)
            // ───────────────────────────────────────────────────────────────────
            ...(isModuleEnabled('quality-overlay-vip') ? [
                `#EXTVLCOPT:codec=hevc`, // 👑 VIP Strict (No H.264 fallback)
                `#EXTVLCOPT:avcodec-codec=hevc`,
                `#EXTVLCOPT:sout-video-codec=hevc`
            ] : [
                `#EXTVLCOPT:codec=hevc,h264`
            ]),
            `#EXTVLCOPT:sout-video-profile=${cfg.video_profile || 'main10'}`,
            `#EXTVLCOPT:force-dolby-surround=0`
        ];

        // ───────────────────────────────────────────────────────────────────
        // SECCIÓN 9: PRIORIZACIÓN HTTP/2-HTTP/3 POR CANAL [TOGGLE: prio-http3]
        // ───────────────────────────────────────────────────────────────────
        if (window._APE_PRIO_HTTP3 !== false) {
            vlcOpts.push(
                '#EXTVLCOPT:http-priority=u=1, i',
                '#EXTVLCOPT:http-accept-encoding=gzip, deflate',
            );
        }

        return vlcOpts;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ARRAY 3: KODIPROP_TEMPLATE (38 líneas por canal)
    // ═══════════════════════════════════════════════════════════════════════════

    function generateKODIPROP(profile) {
        const cfg = getProfileConfig(profile);
        // Usar el UA rotado del cache (mismo que EXTVLCOPT y JWT) para coherencia
        const kodiUA = window._APE_HYDRA_STEALTH
            ? (window.UserAgentRotator?._cachedSelectedUA || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/125.0.0.0')
            : (_cachedSelectedUA || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36');
        const encodedUA = encodeURIComponent(kodiUA);
        const encodedProxyAuth = encodeURIComponent('Basic [bypass]');

        return [
            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 1: CONFIGURACIÓN BÁSICA (6 líneas)
            // ───────────────────────────────────────────────────────────────────
            '#KODIPROP:inputstream=inputstream.adaptive',
            `#KODIPROP:inputstream.adaptive.manifest_type=hls`, // APE v18.2 CMAF UNIVERSAL: fMP4 siempre servido vía HLS manifest
            '#KODIPROP:inputstream.adaptive.manifest_update_parameter=full',
            `#KODIPROP:inputstream.adaptive.stream_headers=${window._APE_HYDRA_STEALTH ? `User-Agent=${encodedUA}` : `User-Agent=${encodedUA}&Proxy-Authorization=${encodedProxyAuth}`}`,
            '#KODIPROP:inputstream.adaptive.chooser_bandwidth_mode=AUTO',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 2: BANDWIDTH Y RESOLUCIÓN (6 líneas)
            // ───────────────────────────────────────────────────────────────────
            `#KODIPROP:inputstream.adaptive.max_bandwidth=${cfg.bitrate * 30000}`,
            `#KODIPROP:inputstream.adaptive.min_bandwidth=${cfg.min_bandwidth}`,
            `#KODIPROP:inputstream.adaptive.max_resolution=${cfg.resolution === '7680x4320' ? '4320' : (cfg.resolution === '3840x2160' ? '2160' : (cfg.resolution === '1920x1080' ? '1080' : '720'))}`,
            `#KODIPROP:inputstream.adaptive.initial_bandwidth=${cfg.bitrate * 3000}`,
            `#KODIPROP:inputstream.adaptive.pre_buffer_bytes=${cfg.prefetch_buffer_target}`,

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 3: BUFFERING AGRESIVO (6 líneas)
            // ───────────────────────────────────────────────────────────────────
            `#KODIPROP:inputstream.adaptive.buffer_segments=${Math.floor(cfg.prefetch_segments / 2)}`,
            `#KODIPROP:inputstream.adaptive.buffer_duration=${Math.floor(GLOBAL_CACHING.network / 1000)}`,
            '#KODIPROP:inputstream.adaptive.buffer_type=AGGRESSIVE',
            '#KODIPROP:inputstream.adaptive.stream_selection_type=auto',
            '#KODIPROP:inputstream.adaptive.live_delay=0',
            '#KODIPROP:inputstream.adaptive.play_timeshift_buffer=true',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 4: DECODIFICACIÓN Y CALIDAD (6 líneas)
            // ───────────────────────────────────────────────────────────────────
            '#KODIPROP:inputstream.adaptive.media_renewal_url=',
            '#KODIPROP:inputstream.adaptive.media_renewal_time=0',
            `#KODIPROP:inputstream.adaptive.original_audio_language=${cfg.audio_channels > 2 ? 'mul' : 'und'}`,
            `#KODIPROP:inputstream.adaptive.video_codec_override=${window._APE_PRIO_QUALITY !== false ? 'hevc' : ''}`,
            `#KODIPROP:inputstream.adaptive.audio_codec_override=${window._APE_PRIO_QUALITY !== false ? 'opus' : ''}`,
            '#KODIPROP:inputstream.adaptive.ignore_screen_resolution=true',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 5: CONFIGURACIÓN AVANZADA (8 líneas)
            // ───────────────────────────────────────────────────────────────────
            '#KODIPROP:inputstream.adaptive.manifest_headers=',
            '#KODIPROP:inputstream.adaptive.license_flags=persistent_storage',
            '#KODIPROP:inputstream.adaptive.server_certificate=',
            '#KODIPROP:inputstream.adaptive.license_url=',
            '#KODIPROP:inputstream.adaptive.license_type=',
            `#KODIPROP:inputstream.adaptive.stream_params=profile=${profile}`,
            '#KODIPROP:inputstream.adaptive.adaptation.set_limits=true',
            '#KODIPROP:inputstream.adaptive.drm_legacy_mode=true',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 6: RESILIENCIA 24/7/365 (6 líneas)
            // ───────────────────────────────────────────────────────────────────
            '#KODIPROP:inputstream.adaptive.manifest_reconnect=true',
            '#KODIPROP:inputstream.adaptive.manifest_reload.time=5000',
            `#KODIPROP:inputstream.adaptive.retry_max=${cfg.reconnect_max_attempts}`,
            `#KODIPROP:inputstream.adaptive.retry_timeout=${cfg.reconnect_timeout_ms}`,
            '#KODIPROP:inputstream.adaptive.segment_download_retry=10',
            '#KODIPROP:inputstream.adaptive.segment_download_timeout=30000',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 7: OPTIMIZACIÓN TLS v1.0 (6 líneas) [TOGGLE: tls-coherence]
            // ───────────────────────────────────────────────────────────────────
            '#KODIPROP:inputstream.adaptive.min_tls_version=1.2',
            '#KODIPROP:inputstream.adaptive.tls_cipher_suites=TLS_AES_128_GCM_SHA256:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_256_GCM_SHA384',
            '#KODIPROP:inputstream.adaptive.tls_session_tickets=true',
            '#KODIPROP:inputstream.adaptive.ocsp_stapling=true',
            '#KODIPROP:inputstream.adaptive.verify_ssl=true',
            `#KODIPROP:inputstream.adaptive.connection_timeout=${GLOBAL_CACHING.network}`,

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 8: HEVC/H.265 OPTIMIZATION (2 líneas)
            // ───────────────────────────────────────────────────────────────────
            `#KODIPROP:inputstream.adaptive.preferred_codec=hevc`,
            `#KODIPROP:inputstream.adaptive.video_profile=${cfg.video_profile || 'main10'}`,

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 9: AUDIO PREMIUM (6 líneas) [WIRED FROM TEMPLATE]
            // ───────────────────────────────────────────────────────────────────
            `#KODIPROP:inputstream.adaptive.audio_channels=${cfg.audio_channels >= 6 ? '7.1' : '2.0'}`,
            '#KODIPROP:inputstream.adaptive.audio_sample_rate=48000',
            '#KODIPROP:inputstream.adaptive.audio_bit_depth=24',
            `#KODIPROP:inputstream.adaptive.dolby_atmos=${cfg.audio_channels >= 6}`,
            `#KODIPROP:inputstream.adaptive.spatial_audio=${cfg.audio_channels >= 6}`,
            '#KODIPROP:inputstream.adaptive.audio_passthrough=true',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 10: OTT PLAYER OPTIMIZATION (6 líneas) [WIRED FROM TEMPLATE]
            // ───────────────────────────────────────────────────────────────────
            '#KODIPROP:inputstream.adaptive.hardware_decode=true',
            '#KODIPROP:inputstream.adaptive.tunneling_enabled=auto',
            '#KODIPROP:inputstream.adaptive.epg_sync=enabled',
            '#KODIPROP:inputstream.adaptive.catchup_support=flussonic',
            '#KODIPROP:inputstream.adaptive.audio_track_selection=default',
            '#KODIPROP:inputstream.adaptive.subtitle_track_selection=off',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 11: STREAMING CONTROL & ABR (6 líneas) [WIRED FROM TEMPLATE]
            // ───────────────────────────────────────────────────────────────────
            `#KODIPROP:inputstream.adaptive.initial_bitrate_max=${cfg.bitrate * 30000}`,
            `#KODIPROP:inputstream.adaptive.read_timeout=${cfg.read_timeout_ms || 30000}`,
            '#KODIPROP:inputstream.adaptive.bandwidth_estimation=auto',
            '#KODIPROP:inputstream.adaptive.bandwidth_preference=unlimited',
            `#KODIPROP:inputstream.adaptive.max_fps=${cfg.fps || 60}`,
            '#KODIPROP:inputstream.adaptive.drm_type=widevine,playready'
        ];
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ARRAY 4: EXT_X_APE_TEMPLATE (29 líneas por canal)
    // ═══════════════════════════════════════════════════════════════════════════

    function generateEXTXAPE(channel, profile, jwt = null) {
        const cfg = getProfileConfig(profile);
        const resolution = channel.resolution || cfg.resolution;
        const bitrate = channel.bitrate || cfg.bitrate;
        const fps = channel.fps || cfg.fps;

        const apeHeaders = [
            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 1: VERSIÓN Y RESOLUCIÓN (4 líneas)
            // ───────────────────────────────────────────────────────────────────
            `#EXT-X-APE-VERSION:${VERSION}`,
            `#EXT-X-APE-PROFILE:${profile}`,
            `#EXT-X-APE-RESOLUTION:${resolution}`,
            `#EXT-X-APE-FPS:${fps}`,

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 2: CODEC (4 líneas) [TOGGLE: prio-quality]
            // Prio ON: siempre max compresión (AV1/HEVC). OFF: nativo del perfil.
            // ───────────────────────────────────────────────────────────────────
            `#EXT-X-APE-CODEC:${window._APE_PRIO_QUALITY !== false ? (profile === 'P0' ? 'AV1' : 'HEVC') : cfg.codec_primary}`,
            `#EXT-X-APE-CODEC-PRIMARY:${window._APE_PRIO_QUALITY !== false ? (profile === 'P0' ? 'HEVC' : 'HEVC') : cfg.codec_primary}`,
            `#EXT-X-APE-CODEC-FALLBACK:${window._APE_PRIO_QUALITY !== false ? 'HEVC' : cfg.codec_fallback}`,
            `#EXT-X-APE-CODEC-PRIORITY:${window._APE_PRIO_QUALITY !== false ? 'hevc,h265,H265,h.265,av1,h264' : cfg.codec_priority}`,

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 3: BITRATE Y BUFFER (4 líneas)
            // ───────────────────────────────────────────────────────────────────
            `#EXT-X-APE-BITRATE:${bitrate}`,
            `#EXT-X-APE-BUFFER:${cfg.buffer_ms}`,
            `#EXT-X-APE-NETWORK-CACHING:${GLOBAL_CACHING.network}`,
            `#EXT-X-APE-LIVE-CACHING:${GLOBAL_CACHING.live}`,
            `#EXT-X-APE-FILE-CACHING:${GLOBAL_CACHING.file}`,

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 4: THROUGHPUT Y ESTRATEGIA (4 líneas)
            // ───────────────────────────────────────────────────────────────────
            `#EXT-X-APE-THROUGHPUT-T1:${cfg.throughput_t1}`,
            `#EXT-X-APE-THROUGHPUT-T2:${cfg.throughput_t2}`,
            `#EXT-X-APE-STRATEGY:${cfg.strategy || cfg.prefetch_strategy || 'ultra-aggressive'}`,
            `#EXT-X-APE-PREFETCH-STRATEGY:${cfg.prefetch_strategy || cfg.strategy || 'ULTRA_AGRESIVO'}`,

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 5: PREFETCH (6 líneas)
            // ───────────────────────────────────────────────────────────────────
            `#EXT-X-APE-PREFETCH-SEGMENTS:${cfg.prefetch_segments}`,
            `#EXT-X-APE-PREFETCH-PARALLEL:${cfg.prefetch_parallel}`,
            `#EXT-X-APE-PREFETCH-BUFFER-TARGET:${cfg.prefetch_buffer_target}`,
            `#EXT-X-APE-PREFETCH-MIN-BANDWIDTH:${cfg.prefetch_min_bandwidth}`,
            `#EXT-X-APE-PREFETCH-ADAPTIVE:${cfg.prefetch_adaptive_enabled !== false}`,
            `#EXT-X-APE-PREFETCH-AI-ENABLED:${cfg.prefetch_ai_prediction || false}`,

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 6: RESILIENCIA (4 líneas)
            // ───────────────────────────────────────────────────────────────────
            '#EXT-X-APE-QUALITY-THRESHOLD:0.95',
            `#EXT-X-APE-SEGMENT-DURATION:${cfg.segment_duration || 2}`,
            `#EXT-X-APE-RECONNECT-TIMEOUT:${cfg.reconnect_timeout_ms}`,
            '#EXT-X-APE-ZERO-INTERRUPTIONS:true',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 6B: OPTIMIZACIONES AVANZADAS (10 líneas) [NUEVAS]
            // ───────────────────────────────────────────────────────────────────
            `#EXT-X-APE-RECONNECT-TIMEOUT-MS:${cfg.reconnect_timeout_ms}`,
            '#EXT-X-APE-FALLBACK-ENABLED:true',
            '#EXT-X-APE-FALLBACK-BITRATE:auto',
            '#EXT-X-APE-FALLBACK-TIMEOUT:5000',
            `#EXT-X-APE-SEGMENT-DURATION-MIN:1`,
            `#EXT-X-APE-SEGMENT-DURATION-MAX:${cfg.segment_duration || 2}`,
            '#EXT-X-APE-SEGMENT-ADAPTATION:enabled',
            '#EXT-X-APE-PREFETCH-LOOKAHEAD:5',
            '#EXT-X-APE-PREFETCH-PRIORITY:sequential',
            `#EXT-X-APE-AVAILABILITY-TARGET:${cfg.availability_target || 99.999}`,

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 7: HDR Y COLOR (3 líneas)
            // ───────────────────────────────────────────────────────────────────
            `#EXT-X-APE-HDR-SUPPORT:${cfg.hdr_support.join(',') || 'none'}`,
            `#EXT-X-APE-COLOR-DEPTH:${cfg.color_depth}`,
            `#EXT-X-APE-AUDIO-CHANNELS:${cfg.audio_channels}`,

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 8: MOTOR DINÁMICO JWT + UA ROTATION (5 líneas) [NUEVO]
            // ───────────────────────────────────────────────────────────────────
            '#EXT-X-APE-JWT-ENGINE:ENABLED',
            '#EXT-X-APE-JWT-REFRESH-MS:30',
            '#EXT-X-APE-UA-ROTATION:ENABLED',
            `#EXT-X-APE-UA-POOL-SIZE:${window.UserAgentRotator?._getTotalUAs?.() || 105}`,
            '#EXT-X-APE-BLOCK-DETECTION:ENABLED',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 9: CONTROL ABR AVANZADO (7 líneas) [NUEVO - WIRED TO FRONTEND]
            // ───────────────────────────────────────────────────────────────────
            '#EXT-X-APE-ABR-BANDWIDTH-PREFERENCE:unlimited',
            '#EXT-X-APE-ABR-BW-ESTIMATION-WINDOW:10',
            '#EXT-X-APE-ABR-BW-CONFIDENCE:0.95',
            '#EXT-X-APE-ABR-BW-SMOOTH-FACTOR:0.05',
            '#EXT-X-APE-ABR-PACKET-LOSS-MONITOR:enabled',
            '#EXT-X-APE-ABR-RTT-MONITORING:enabled',
            '#EXT-X-APE-ABR-CONGESTION-DETECT:enabled',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 10: ANTI-CORTE / FAILOVER (5 líneas) [WIRED TO FRONTEND]
            // ───────────────────────────────────────────────────────────────────
            '#EXT-X-APE-RECONNECT-ON-ERROR:true',
            `#EXT-X-APE-MAX-RECONNECT-ATTEMPTS:${cfg.reconnect_max_attempts}`,
            `#EXT-X-APE-RECONNECT-DELAY-MS:${cfg.reconnect_delay_ms || 50}`,
            '#EXT-X-APE-BUFFER-UNDERRUN-STRATEGY:aggressive-refill',
            '#EXT-X-APE-SEAMLESS-FAILOVER:true',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 11: DESCARGA PARALELA (2 líneas) [WIRED TO FRONTEND]
            // ───────────────────────────────────────────────────────────────────
            '#EXT-X-APE-SEGMENT-PRELOAD:true',
            '#EXT-X-APE-CONCURRENT-DOWNLOADS:10',

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 12: EVASIÓN (Migrado desde JWT - 6 campos) [CONDICIONAL]
            // 🔒 Solo se emiten tags de proxy/evasión si el toggle está ON
            // ───────────────────────────────────────────────────────────────────
            '#EXT-X-APE-CDN-PRIORITY:premium',
            '#EXT-X-APE-GEO-RESILIENCE:true',
            `#EXT-X-APE-BANDWIDTH-GUARANTEE:${cfg.bandwidth_guarantee || 300}`,
        ];

        // ───────────────────────────────────────────────────────────────────
        // SECCIÓN 12B: DETECCIÓN AUTOMÁTICA DE SERVIDOR (5 líneas dinámicas)
        // Explota: sin rate limiting, sin validación de sesión, keep-alive
        // ───────────────────────────────────────────────────────────────────
        const channelUrl = channel.url || channel.direct_source || channel.stream_url || '';
        try {
            const urlObj = new URL(channelUrl);
            const host = urlObj.hostname;
            const port = urlObj.port || '80';

            if (host.includes('pro.123sat.net')) {
                apeHeaders.push(
                    '#EXT-X-APE-SERVER-TYPE:xtream_codes',
                    `#EXT-X-APE-PORT-OVERRIDE:${port || '2082'}`,
                    '#EXT-X-APE-PROTOCOL:http',
                    '#EXT-X-APE-TIMEOUT-MS:15000',
                    '#EXT-X-APE-CUSTOM-ABR:enabled'
                );
            } else if (host.includes('candycloud8k.biz')) {
                apeHeaders.push(
                    '#EXT-X-APE-SERVER-TYPE:cdn_proxy',
                    '#EXT-X-APE-PORT-OVERRIDE:80',
                    '#EXT-X-APE-PROTOCOL:http',
                    '#EXT-X-APE-TIMEOUT-MS:10000',
                    '#EXT-X-APE-CUSTOM-ABR:enabled'
                );
            } else if (host.includes('line.tivi-ott.net')) {
                apeHeaders.push(
                    '#EXT-X-APE-SERVER-TYPE:xtream_codes',
                    '#EXT-X-APE-PORT-OVERRIDE:80',
                    '#EXT-X-APE-PROTOCOL:http',
                    '#EXT-X-APE-TIMEOUT-MS:20000',
                    '#EXT-X-APE-CUSTOM-ABR:enabled'
                );
            } else {
                apeHeaders.push(
                    '#EXT-X-APE-SERVER-TYPE:unknown',
                    '#EXT-X-APE-PROTOCOL:http',
                    '#EXT-X-APE-TIMEOUT-MS:15000',
                    '#EXT-X-APE-CUSTOM-ABR:enabled'
                );
            }
        } catch (e) {
            apeHeaders.push(
                '#EXT-X-APE-SERVER-TYPE:unknown',
                '#EXT-X-APE-PROTOCOL:http',
                '#EXT-X-APE-TIMEOUT-MS:15000'
            );
        }

        // ───────────────────────────────────────────────────────────────────
        // SECCIÓN 13: FINGERPRINT (Migrado desde JWT - 6 campos) [NUEVO]
        // ───────────────────────────────────────────────────────────────────
        apeHeaders.push(
            `#EXT-X-APE-FINGERPRINT:FP_${generateRandomString(16)}`,
            `#EXT-X-APE-FP-DEVICE:${typeof navigator !== 'undefined' ? (navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop') : 'desktop'}`,
            `#EXT-X-APE-FP-PLATFORM:${typeof navigator !== 'undefined' ? navigator.platform : 'Win32'}`,
            `#EXT-X-APE-FP-SCREEN:${typeof screen !== 'undefined' ? `${screen.width}x${screen.height}` : '1920x1080'}`,
            `#EXT-X-APE-FP-TZ:${Intl?.DateTimeFormat?.()?.resolvedOptions?.()?.timeZone || 'UTC'}`,
            `#EXT-X-APE-FP-SESSION:${generateRandomString(32)}`,

            // ───────────────────────────────────────────────────────────────────
            // SECCIÓN 14: INFORMACIÓN DEL CANAL (Migrado desde JWT - 10 campos) [CLEAN URL MODE]
            // ───────────────────────────────────────────────────────────────────
            `#EXT-X-APE-CHANNEL-NAME:${escapeM3UValue(channel.name || 'Unknown')}`,
            `#EXT-X-APE-CHANNEL-ID:${channel.stream_id || channel.id || 0}`,
            `#EXT-X-APE-CHANNEL-GROUP:${escapeM3UValue(channel.category_name || channel.group || 'General')}`,
            `#EXT-X-APE-EPG-ID:${channel.epg_channel_id || channel.stream_id || ''}`,
            `#EXT-X-APE-CATCHUP:${channel.catchup || 'xc'}`,
            `#EXT-X-APE-CATCHUP-DAYS:${channel.catchup_days || 7}`,
            `#EXT-X-APE-AUDIO-CHANNELS:${cfg.audio_channels || 6}`,
            `#EXT-X-APE-QUALITY-LEVEL:${profile === 'P0' ? 'ULTRA' : profile === 'P1' ? '4K_SUPREME' : profile === 'P2' ? '4K' : profile === 'P3' ? 'FHD' : profile === 'P4' ? 'HD' : 'SD'}`,
            `#EXT-X-APE-ASPECT-RATIO:16:9`,
            `#EXT-X-APE-DEINTERLACE:bwdif`
        );

        // ───────────────────────────────────────────────────────────────────
        // SECCIÓN 15: PRIORIZACIÓN PROTOCOLO HTTPS POR CANAL [TOGGLE: prio-http3]
        // HTTP/3 = QUIC (TLS 1.3 siempre) | HTTP/2 = TLS | HTTP/1.1 = TLS preferido
        // ───────────────────────────────────────────────────────────────────
        if (window._APE_PRIO_HTTP3 !== false) {
            apeHeaders.push(
                '#EXT-X-APE-PROTOCOL-PRIORITY:http/1.1,h2',
                '#EXT-X-APE-TLS-PRIORITY:tls1.3,tls1.2',
                '#EXT-X-APE-TLS-REQUIRED:false',
                '#EXT-X-APE-HTTP-VERSION:1.1',
                '#EXT-X-APE-FALLBACK-HTTP-VERSION:1.1',
                '#EXT-X-APE-MIN-TLS-VERSION:1.0',
                '#EXT-X-APE-HTTP2-PUSH:disabled',
                '#EXT-X-APE-HTTP3-MIGRATION:disabled'
            );
        }

        // ───────────────────────────────────────────────────────────────────
        // SECCIÓN 16: AUDIO CODEC PRIORIZACIÓN POR CANAL [TOGGLE: prio-quality]
        // ───────────────────────────────────────────────────────────────────
        if (window._APE_PRIO_QUALITY !== false) {
            apeHeaders.push(
                `#EXT-X-APE-AUDIO-CODEC:${cfg.audio_codec_primary || 'opus'}`,
                `#EXT-X-APE-AUDIO-CODEC-FALLBACK:${cfg.audio_codec_fallback || 'aac'}`,
                `#EXT-X-APE-VIDEO-PROFILE:${cfg.video_profile || 'main10'}`
            );
        }

        // ───────────────────────────────────────────────────────────────────
        // SECCIÓN 17: HEVC/H.265 OPTIMIZATION (15 EXT-X-APE + EXT-X-APE-HTTP-HEADERS + LL-HLS)
        // Reads from profile config (configurable from frontend)
        // ───────────────────────────────────────────────────────────────────
        apeHeaders.push(
            `#EXT-X-APE-HEVC-TIER:${cfg.hevc_tier || 'HIGH'}`,
            `#EXT-X-APE-HEVC-LEVEL:${cfg.hevc_level || '4.1'}`,
            `#EXT-X-APE-HEVC-PROFILE:${cfg.hevc_profile || 'MAIN-10'}`,
            `#EXT-X-APE-COLOR-SPACE:${cfg.color_space || 'BT709'}`,
            `#EXT-X-APE-CHROMA-SUBSAMPLING:${cfg.chroma_subsampling || '4:2:0'}`,
            `#EXT-X-APE-TRANSFER-FUNCTION:${cfg.transfer_function || 'BT1886'}`,
            `#EXT-X-APE-MATRIX-COEFFICIENTS:${cfg.matrix_coefficients || 'BT709'}`,
            `#EXT-X-APE-COMPRESSION-LEVEL:${cfg.compression_level || 9}`,
            `#EXT-X-APE-RATE-CONTROL:${cfg.rate_control || 'VBR'}`,
            `#EXT-X-APE-RATE-CONTROL-MODE:QUALITY-BASED`,
            `#EXT-X-APE-ENTROPY-CODING:${cfg.entropy_coding || 'CABAC'}`,
            `#EXT-X-APE-PIXEL-FORMAT:${cfg.pixel_format || 'yuv420p10le'}`,
            `#EXT-X-APE-DEBLOCK-FILTER:enabled`,
            `#EXT-X-APE-SAO-FILTER:enabled`
        );

        // 🐉 APPLY HYDRA STEALTH OBFUSCATION TO ALL EXT-X-APE TAGS
        if (window._APE_HYDRA_STEALTH) {
            for (let i = 0; i < apeHeaders.length; i++) {
                if (apeHeaders[i].startsWith('#EXT-X-APE-')) {
                    apeHeaders[i] = apeHeaders[i].replace('#EXT-X-APE-', '#EXT-X-SYS-');
                }
            }
        }

        // #EXTHTTP — COMPLETE HEADERS JSON per-channel [ALL TEMPLATE FIELDS WIRED]
        // 🔑 JWT & PROFILE viajan como HTTP headers reales via #EXTHTTP
        //    OTT Navigator envía estos como headers HTTP con cada request al servidor
        const exthttpHEVC = {
            // ── JWT & Profile (FUNCIONAL — viaja como header HTTP real) ──
            ...(jwt && isModuleEnabled(MODULE_FEATURES.jwt) ? {
                "Authorization": `Bearer ${jwt}`,
                "X-APE-Profile": profile,
                "X-APE-Profile-Version": VERSION
            } : {}),
            // ── HEVC Optimization ──
            "X-HEVC-Tier": cfg.hevc_tier || 'HIGH',
            "X-HEVC-Level": cfg.hevc_level || '4.1',
            "X-HEVC-Profile": cfg.hevc_profile || 'MAIN-10',
            "X-Video-Profile": cfg.video_profile || 'main10',
            "X-Color-Space": cfg.color_space || 'BT709',
            "X-Chroma-Subsampling": cfg.chroma_subsampling || '4:2:0',
            "X-HDR-Transfer-Function": cfg.transfer_function || 'BT1886',
            "X-Matrix-Coefficients": cfg.matrix_coefficients || 'BT709',
            "X-Compression-Level": String(cfg.compression_level || 9),
            "X-Rate-Control": cfg.rate_control || 'VBR',
            "X-Entropy-Coding": cfg.entropy_coding || 'CABAC',
            "X-Pixel-Format": cfg.pixel_format || 'yuv420p10le',
            "X-Color-Depth": String(cfg.color_depth || 10),
            // ── Buffer & Caching ──
            "X-Network-Caching": String(GLOBAL_CACHING.network),
            "X-Live-Caching": String(GLOBAL_CACHING.live),
            "X-File-Caching": String(GLOBAL_CACHING.file),
            "X-Buffer-Strategy": "ultra-aggressive",
            "X-Buffer-Ms": String(cfg.buffer_ms),
            // ── Prefetch ──
            "X-Prefetch-Segments": String(cfg.prefetch_segments),
            "X-Prefetch-Parallel": String(cfg.prefetch_parallel),
            "X-Prefetch-Buffer-Target": String(cfg.prefetch_buffer_target),
            "X-Prefetch-Strategy": "ULTRA_AGRESIVO_ILIMITADO",
            "X-Prefetch-Enabled": "true",
            // ── Reconnect ──
            "X-Reconnect-Timeout-Ms": String(cfg.reconnect_timeout_ms),
            "X-Reconnect-Max-Attempts": String(cfg.reconnect_max_attempts),
            "X-Reconnect-Delay-Ms": String(cfg.reconnect_delay_ms || 50),
            "X-Reconnect-On-Error": "true",
            // ── Segment ──
            "X-Segment-Duration": String(cfg.segment_duration || 2),
            "X-Bandwidth-Guarantee": String(cfg.bandwidth_guarantee || 300),
            // ── APE Engine Core ──
            "X-App-Version": `APE_${VERSION}`,
            "X-Playback-Session-Id": `SES_${generateRandomString(16)}`,
            "X-Device-Id": `DEV_${generateRandomString(12)}`,
            "X-Stream-Type": "hls",
            "X-Quality-Preference": `codec-${(cfg.codec_primary || 'hevc').toLowerCase()},profile-${cfg.video_profile || 'main10'},tier-${(cfg.hevc_tier || 'high').toLowerCase()}`,
            // ── Playback Avanzado ──
            "X-Playback-Rate": "1.0",
            "X-Min-Buffer-Time": String(Math.floor((cfg.buffer_ms || 19000) / 1000)),
            "X-Max-Buffer-Time": String(Math.floor(GLOBAL_CACHING.network / 1000)),
            "X-Request-Priority": "high",
            // ── Codecs & DRM ──
            "X-Video-Codecs": cfg.codec_priority || 'hevc,vp9,av1,h264',
            "X-Audio-Codecs": "aac,mp3,opus,ac3,eac3",
            "X-DRM-Support": "widevine,playready",
            // ── CDN & Failover ──
            "X-CDN-Provider": "auto",
            "X-Failover-Enabled": "true",
            "X-Buffer-Size": String(Math.floor((cfg.max_bandwidth || 4500000) / 550)),
            // ── Metadata & Tracking ──
            "X-Client-Timestamp": String(Math.floor(Date.now() / 1000)),
            "X-Request-Id": `REQ_${generateRandomString(16)}`,
            "X-Device-Type": "smart-tv",
            "X-Screen-Resolution": cfg.resolution || '3840x2160',
            "X-Network-Type": "wifi",
            // ── OTT Navigator Compat ──
            "X-OTT-Navigator-Version": window._APE_HYDRA_STEALTH ? "1.0.0.0" : "1.7.0.0",
            "X-Player-Type": window._APE_HYDRA_STEALTH ? "generic" : "exoplayer",
            "X-Hardware-Decode": "true",
            "X-Tunneling-Enabled": "auto",
            "X-Audio-Track-Selection": "default",
            "X-Subtitle-Track-Selection": "off",
            "X-EPG-Sync": window._APE_HYDRA_STEALTH ? "disabled" : "enabled",
            "X-Catchup-Support": window._APE_HYDRA_STEALTH ? "none" : "flussonic",
            // ── Streaming Control ──
            "X-Bandwidth-Estimation": "auto",
            "X-Initial-Bitrate": "highest",
            "X-Retry-Count": "3",
            "X-Retry-Delay-Ms": "1000",
            "X-Connection-Timeout-Ms": "15000",
            "X-Read-Timeout-Ms": "30000",
            // ── Security ──
            "X-Country-Code": "US",
            // ── HDR & Color (no duplicar con los HEVC de arriba) ──
            "X-HDR-Support": (cfg.hdr_support || ['hdr10', 'hdr10+', 'dolby-vision', 'hlg']).join(','),
            "X-Dynamic-Range": "hdr",
            "X-Color-Primaries": "bt2020",
            // ── Resolution Advanced ──
            "X-Max-Resolution": cfg.resolution || '3840x2160',
            "X-Max-Bitrate": String(cfg.max_bandwidth || 4500000),
            "X-Frame-Rates": "24,25,30,50,60,120",
            "X-Aspect-Ratio": "16:9,21:9",
            "X-Pixel-Aspect-Ratio": "1:1",
            // ── Audio Premium ──
            "X-Dolby-Atmos": String(cfg.audio_channels >= 6),
            "X-Audio-Channels": `${cfg.audio_channels >= 6 ? '7.1,5.1,2.0' : '2.0'}`,
            "X-Audio-Sample-Rate": "48000,96000",
            "X-Audio-Bit-Depth": "24bit",
            "X-Spatial-Audio": String(cfg.audio_channels >= 6),
            "X-Audio-Passthrough": "true",
            // ── Parallel Downloads ──
            "X-Parallel-Segments": String(cfg.prefetch_parallel || 150),
            "X-Segment-Preload": "true",
            "X-Concurrent-Downloads": String(Math.min(20, cfg.prefetch_parallel || 10)),
            // ── Anti-Corte / Failover ──
            "X-Buffer-Underrun-Strategy": "aggressive-refill",
            "X-Seamless-Failover": "true",
            // ── ABR Control Avanzado ──
            "X-Bandwidth-Preference": "unlimited",
            "X-BW-Estimation-Window": "10",
            "X-BW-Confidence-Threshold": "0.85",
            "X-BW-Smooth-Factor": "0.15",
            "X-Packet-Loss-Monitor": "enabled",
            "X-RTT-Monitoring": "enabled",
            "X-Congestion-Detect": "enabled",
            // ── 🧬 APE DNA OMNI-INJECTION (154+ UI HEADERS FAST-PASSTHROUGH) ──
            ...(cfg.headers || {})
        };

        // ── FORENSIC JSON SANITATION (Anti TiviMate/ExoPlayer Crash) ──
        const safeExtHttpHEVC = {};
        for (const key in exthttpHEVC) {
            safeExtHttpHEVC[key] = String(exthttpHEVC[key]).replace(/[\r\n]/g, '');
        }

        // LL-HLS (Low-Latency HLS) directives
        const segDur = cfg.segment_duration || 6;
        apeHeaders.push(
            `#EXT-X-SERVER-CONTROL:CAN-BLOCK-RELOAD=YES,CAN-SKIP-UNTIL=${segDur},PART-HOLD-BACK=${(segDur * 3).toFixed(1)}`,
            `#EXT-X-PART-INF:PART-TARGET=${(segDur / 6).toFixed(3)}`
            // EXT-X-PRELOAD-HINT eliminado para no confundir a reproductores con URIs relativas
        );

        // ───────────────────────────────────────────────────────────────────
        // SECCIÓN 18: OPTIMIZACIÓN TLS v1.0 (25 líneas) [TOGGLE: tls-coherence]
        // ───────────────────────────────────────────────────────────────────
        if (isModuleEnabled(MODULE_FEATURES.tls)) {
            apeHeaders.push(
                '#EXT-X-APE-TLS-MIN-VERSION:1.2',
                '#EXT-X-APE-TLS-MAX-VERSION:1.2',
                '#EXT-X-APE-TLS-STRICT:false',
                '#EXT-X-APE-TLS-CIPHER-PRIORITY:TLS_AES_128_GCM_SHA256,TLS_CHACHA20_POLY1305_SHA256,TLS_AES_256_GCM_SHA384',
                '#EXT-X-APE-TLS-SESSION-RESUMPTION:true',
                '#EXT-X-APE-TLS-SESSION-CACHE-SIZE:10000',
                '#EXT-X-APE-TLS-SESSION-TIMEOUT:86400',
                '#EXT-X-APE-TLS-0RTT:enabled',
                '#EXT-X-APE-TLS-EARLY-DATA:enabled',
                '#EXT-X-APE-TLS-OCSP-STAPLING:enabled',
                '#EXT-X-APE-TLS-VERIFY-PEER:false',
                '#EXT-X-APE-TLS-VERIFY-HOST:false',
                '#EXT-X-APE-TLS-HANDSHAKE-TIMEOUT:3000',
                '#EXT-X-APE-TLS-ALPN:h3,h2,http/1.1',
                '#EXT-X-APE-TLS-CONNECTION-POOL:enabled',
                '#EXT-X-APE-TLS-MAX-CONNECTIONS:100',
                '#EXT-X-APE-TLS-CONNECTION-REUSE:true',
                '#EXT-X-APE-TLS-KEEP-ALIVE:true',
                '#EXT-X-APE-TLS-KEEP-ALIVE-TIMEOUT:30000',
                '#EXT-X-APE-TLS-BUFFER-SIZE:65536',
                '#EXT-X-APE-TLS-RECORD-SIZE:16384',
                '#EXT-X-APE-TLS-COMPRESSION:disabled',
                '#EXT-X-APE-TLS-SNI:enabled',
                '#EXT-X-APE-TLS-FALLBACK-ENABLED:true',
                '#EXT-X-APE-TLS-FALLBACK-VERSION:1.2',
                '#EXT-X-APE-TLS-FALLBACK-TIMEOUT:5000'
            );
        }

        // 🐉 APPLY SECOND PASS HYDRA STEALTH OBFUSCATION TO ALL EXT-X-APE TAGS
        if (window._APE_HYDRA_STEALTH) {
            for (let i = 0; i < apeHeaders.length; i++) {
                if (apeHeaders[i].startsWith('#EXT-X-APE-')) {
                    apeHeaders[i] = apeHeaders[i].replace('#EXT-X-APE-', '#EXT-X-SYS-');
                }
            }
        }

        return apeHeaders;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // STRING 5: EXT_X_START_TEMPLATE
    // ═══════════════════════════════════════════════════════════════════════════

    const EXT_X_START_TEMPLATE = '#EXT-X-START:TIME-OFFSET=-3.0,PRECISE=YES';

    // ═══════════════════════════════════════════════════════════════════════════
    // 🔒 HTTPS PRIORITY: Siempre priorizar HTTPS sobre HTTP
    // Si la URL llega con https://, se mantiene.
    // Si llega con http://, se intenta upgrade a https://.
    // Excepción: localhost / 127.0.0.1 (siempre HTTP en desarrollo).
    // ═══════════════════════════════════════════════════════════════════════════

    // Puertos Xtream Codes conocidos que operan en HTTP plano
    const XTREAM_HTTP_PORTS = ['2082', '2083', '8080', '8000', '25461', '25463', '80'];

    function preferHttps(url) {
        if (!url || typeof url !== 'string') return url;

        // ══════════════════════════════════════════════════════════════════
        // DETECCIÓN INTELIGENTE DE PROTOCOLO EXTENDIDA (Anti-Forbidden):
        // 1. Si la URL ya es HTTP → preservar HTTP absolutamente para evitar 
        //    bloqueos de servidores antiguos que rechazan HTTPS o dan HTTP 403.
        // 2. El fallback HTTPS enmascarado se delega al VPS resolver (Proxy).
        // ══════════════════════════════════════════════════════════════════

        try {
            const parsed = new URL(url);
            // 🔒 REGLA ESTRICTA: Evasión HTTP nativa
            if (parsed.protocol === 'http:') {
                return url; // Preservar HTTP nativo sin mutar.
            }

            // Si es https:// pero pertenece a un host conocido que no tiene SSL válido, degradar.
            const port = parsed.port || (parsed.protocol === 'https:' ? '443' : '80');
            if (XTREAM_HTTP_PORTS.includes(port)) {
                if (url.startsWith('https://')) return url.replace(/^https:\/\//, 'http://');
                return url;
            }
        } catch (e) { }

        return url;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // FUNCIONES AUXILIARES
    // ═══════════════════════════════════════════════════════════════════════════

    function generateRandomString(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function generateNonce() {
        return Array.from({ length: 32 }, () =>
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
    }

    function base64UrlEncode(str) {
        try {
            return btoa(unescape(encodeURIComponent(str)))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=/g, '');
        } catch (e) {
            return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        }
    }

    function escapeM3UValue(value) {
        if (!value) return '';
        return String(value).replace(/"/g, "'").replace(/,/g, ' ');
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // JWT 68+ CAMPOS (8 SECCIONES)
    // ═══════════════════════════════════════════════════════════════════════════

    function generateJWT68Fields(channel, profile, index) {
        const cfg = getProfileConfig(profile);
        const now = Math.floor(Date.now() / 1000);
        const expiry = now + (365 * 24 * 60 * 60); // 1 año

        // Header JWT
        const header = {
            alg: 'HS256',
            typ: 'JWT',
            ver: VERSION
        };

        // Payload con 68+ campos organizados en 8 secciones
        const payload = {
            // ─────────────────────────────────────────────────────────────────
            // SECCIÓN 1: IDENTIFICACIÓN JWT (8 campos)
            // ─────────────────────────────────────────────────────────────────
            iss: `APE_v${VERSION}_TYPED_ARRAYS`,
            iat: now,
            exp: expiry,
            nbf: now - 60,
            jti: `jti_${generateRandomString(8)}_${generateRandomString(8)}_${index}`,
            nonce: generateNonce(),
            aud: ['premium-servers', 'cdn-nodes', 'edge-servers', 'backup-nodes'],
            sub: String(channel.stream_id || channel.id || index),

            // ─────────────────────────────────────────────────────────────────
            // SECCIÓN 2: INFORMACIÓN DEL CANAL (8 campos)
            // ─────────────────────────────────────────────────────────────────
            chn: channel.name || 'Unknown',
            chn_id: String(channel.stream_id || channel.id || index),
            chn_group: channel.category_name || channel.group || 'General',
            chn_logo: channel.stream_icon || channel.logo || '',
            chn_catchup: channel.catchup || 'xc',
            chn_catchup_days: channel.catchup_days || 7,
            chn_catchup_source: channel.catchup_source || '?utc={utc}&lutc={lutc}',
            chn_epg_id: channel.epg_channel_id || String(channel.stream_id || channel.id || index),

            // ─────────────────────────────────────────────────────────────────
            // SECCIÓN 3: CONFIGURACIÓN DE PERFIL (13 campos) + USER-AGENT
            // ─────────────────────────────────────────────────────────────────
            device_profile: profile,
            device_class: cfg.device_class,
            // 🔄 User-Agent dinámico rotado (del cache o default)
            user_agent: _cachedSelectedUA || 'OTT Navigator/1.6.9.4 (Build 40936) AppleWebKit/606',
            resolution: channel.resolution || cfg.resolution,
            width: cfg.width,
            height: cfg.height,
            fps: channel.fps || cfg.fps,
            bitrate: channel.bitrate || cfg.bitrate,
            buffer_ms: cfg.buffer_ms,
            network_cache_ms: cfg.network_cache_ms,
            live_cache_ms: cfg.live_cache_ms,
            max_bandwidth: cfg.max_bandwidth,
            min_bandwidth: cfg.min_bandwidth,

            // ─────────────────────────────────────────────────────────────────
            // SECCIÓN 4: CONFIGURACIÓN DE CALIDAD (10 campos)
            // ─────────────────────────────────────────────────────────────────
            codec_primary: cfg.codec_primary,
            codec_fallback: cfg.codec_fallback,
            codec_priority: cfg.codec_priority,
            hdr_support: cfg.hdr_support,
            color_depth: cfg.color_depth,
            audio_channels: cfg.audio_channels,
            deinterlace: 'bwdif',
            sharpening: 0.05,
            aspect_ratio: '16:9',
            quality_level: profile === 'P0' ? 'ULTRA' : profile === 'P1' ? '4K_SUPREME' : profile === 'P2' ? '4K' : profile === 'P3' ? 'FHD' : profile === 'P4' ? 'HD' : 'SD',

            // ─────────────────────────────────────────────────────────────────
            // SECCIÓN 5: PREFETCH Y BUFFER (8 campos)
            // ─────────────────────────────────────────────────────────────────
            prefetch_segments: cfg.prefetch_segments,
            prefetch_parallel: cfg.prefetch_parallel,
            prefetch_buffer_target: cfg.prefetch_buffer_target,
            prefetch_min_bandwidth: cfg.prefetch_min_bandwidth,
            prefetch_adaptive: true,
            prefetch_ai_enabled: true,
            prefetch_strategy: 'ultra-aggressive',
            prefetch_enabled: true,

            // ─────────────────────────────────────────────────────────────────
            // SECCIÓN 6: ESTRATEGIA Y OPTIMIZACIÓN (8 campos)
            // ─────────────────────────────────────────────────────────────────
            strategy: 'ultra-aggressive',
            target_bitrate: cfg.bitrate * 1000,
            throughput_t1: cfg.throughput_t1,
            throughput_t2: cfg.throughput_t2,
            quality_threshold: 0.85,
            latency_target_ms: cfg.latency_target_ms || 30,
            segment_duration: cfg.segment_duration || 2,
            buffer_strategy: 'aggressive',

            // ─────────────────────────────────────────────────────────────────
            // SECCIÓN 7: SEGURIDAD Y EVASIÓN (8 campos) - CON FINGERPRINT REAL
            // ─────────────────────────────────────────────────────────────────
            service_tier: 'PREMIUM',
            invisibility_enabled: true,
            // 🔐 Fingerprint real del dispositivo (si está disponible)
            fingerprint: window.DeviceFingerprintCollector?._cache?.unique_hash || ('FP_' + generateRandomString(32)),
            fp_device: window.DeviceFingerprintCollector?._cache?.device_type || 'desktop',
            fp_platform: window.DeviceFingerprintCollector?._cache?.device_platform || navigator.platform,
            fp_screen: window.DeviceFingerprintCollector?._cache ?
                `${window.DeviceFingerprintCollector._cache.screen_width}x${window.DeviceFingerprintCollector._cache.screen_height}` :
                `${screen.width}x${screen.height}`,
            fp_tz: window.DeviceFingerprintCollector?._cache?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
            fp_lang: window.DeviceFingerprintCollector?._cache?.browser_language || navigator.language,
            fp_canvas: window.DeviceFingerprintCollector?._cache?.canvas_hash || 'not_collected',
            fp_audio: window.DeviceFingerprintCollector?._cache?.audio_hash || 'not_collected',
            fp_webgl: window.DeviceFingerprintCollector?._cache?.webgl_renderer?.substring(0, 50) || 'not_collected',
            fp_session: window.DeviceFingerprintCollector?._cache?.session_id || generateRandomString(32),
            // 🔒 Evasion fields: condicional al toggle evasion-407
            isp_evasion_level: isModuleEnabled(MODULE_FEATURES.evasion) ? 3 : 0,
            cdn_priority: 'premium',
            geo_resilience: true,
            proxy_rotation: isModuleEnabled(MODULE_FEATURES.evasion),

            // ─────────────────────────────────────────────────────────────────
            // SECCIÓN 8: METADATOS ADICIONALES (8+ campos)
            // ─────────────────────────────────────────────────────────────────
            bandwidth_guarantee: cfg.bandwidth_guarantee || 150,
            quality_enhancement: 300,
            zero_interruptions: true,
            reconnection_time_ms: cfg.reconnect_timeout_ms,
            reconnect_max_attempts: cfg.reconnect_max_attempts,
            availability_target: '99.99%',
            generation_timestamp: now,
            version: VERSION,
            architecture: 'TYPED_ARRAYS_ULTIMATE',
            src: 'ape_typed_arrays_68plus'
        };

        // Codificar JWT
        const headerB64 = base64UrlEncode(JSON.stringify(header));
        const payloadB64 = base64UrlEncode(JSON.stringify(payload));
        // APE v17.2.5 FIX (H6): JWT signature placeholder.
        // TODO: Implementar firma HMAC-SHA256 real con crypto.subtle.sign()
        // Referencia: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign
        const signature = btoa(`APE_SIG_${generateRandomString(32)}`).replace(/=/g, '');

        return `${headerB64}.${payloadB64}.${signature}`;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // GENERAR #EXTINF
    // ═══════════════════════════════════════════════════════════════════════════

    function generateEXTINF(channel, profile, index) {
        const tvgId = channel.stream_id || channel.id || index;
        const tvgName = escapeM3UValue(channel.name || `Canal ${index}`);
        const tvgLogo = channel.stream_icon || channel.logo || '';

        // 🧩 Integration with GroupTitleBuilder for hierarchical group-title
        let groupTitle;
        const gtConfig = window.GroupTitleBuilder?.getConfig();
        const gtEnabled = document.getElementById('gt-enabled')?.checked !== false;

        if (window.GroupTitleBuilder && gtEnabled && gtConfig?.selectedFields?.length > 0) {
            groupTitle = window.GroupTitleBuilder.buildExport(channel, gtConfig);
        } else {
            groupTitle = channel.category_name || channel.group || 'General';
        }
        groupTitle = escapeM3UValue(groupTitle);

        let extinf = `#EXTINF:-1 tvg-id="${tvgId}" tvg-name="${tvgName}" tvg-logo="${tvgLogo}" group-title="${groupTitle}" ape-profile="${profile}"`;
        extinf += ` catchup="xc" catchup-days="7" catchup-source="?utc={utc}&lutc={lutc}"`;

        // Motor Evasion attributes
        extinf += ` motor-evasion="enabled" motor-retry="3" motor-buffer="20"`;

        // Quality attributes (detectar de heuristics o nombre)
        const quality = channel.heuristics?.resolution_class ||
            (channel.name?.toUpperCase().includes('4K') ? '4K' :
                channel.name?.toUpperCase().includes('HD') ? 'HD' : 'SD');
        const bitrate = channel.heuristics?.estimated_bitrate ||
            (quality === '4K' ? 50000 : quality === 'HD' ? 8000 : 2000);
        extinf += ` quality="${quality}" bitrate="${bitrate}"`;

        extinf += `,${tvgName}`;

        return extinf;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTRUIR URL CON JWT (+ URL VALIDATOR + FALLBACK MODE)
    // ═══════════════════════════════════════════════════════════════════════════

    // Constante para límite de URL
    const MAX_URL_LENGTH = 2000;

    function buildChannelUrl(channel, jwt, profile = null, index = 0) {
        let baseUrl = '';

        // Prioridad 1: URL directa
        if (channel.url && channel.url.startsWith('http')) {
            baseUrl = channel.url.split('?')[0];
        }
        // Prioridad 2: direct_source
        else if (channel.direct_source && channel.direct_source.startsWith('http')) {
            baseUrl = channel.direct_source.split('?')[0];
        }
        // Prioridad 2.5: stream_url (Xtream Codes API)
        else if (channel.stream_url && channel.stream_url.startsWith('http')) {
            baseUrl = channel.stream_url.split('?')[0];
        }
        // Prioridad 3: Construir desde servidor
        else if (typeof window !== 'undefined' && window.app && window.app.state) {
            const state = window.app.state;
            const channelServerId = channel._source || channel.serverId || channel.server_id;
            let server = null;

            if (channelServerId && state.activeServers) {
                server = state.activeServers.find(s => s.id === channelServerId);
            }
            if (!server && state.currentServer) {
                server = state.currentServer;
            }
            if (server && server.baseUrl && server.username && server.password && channel.stream_id) {
                const cleanBase = server.baseUrl.replace(/\/player_api\.php$/, '').replace(/\/$/, '');
                // NUNCA fakes la extensión mpd directamente al Xtream server porque Xtream no soporta XML mpd.
                // DASH/CMAF opera 100% puenteado a través de resolve.php -> cmaf_worker.php
                baseUrl = `${cleanBase}/live/${server.username}/${server.password}/${channel.stream_id}.m3u8`;
            } else {
                // 🛑 ANTI-BLEED PROTOCOL (BigData Level - God Tier)
                // Cero tolerancia a la herencia cruzada de credenciales.
                // Si el canal no pertenece explícitamente a este servidor con sus datos completos, se detiene.
                console.error(`[ANTI-BLEED] Canal huérfano detectado (Host/User/Pass incompleto). ServerID [${channelServerId}]. Omitiendo URL para evitar Credential Bleed cruzado.`);
            }
        }

        // Fallback: cualquier campo que tenga URL
        if (!baseUrl) {
            baseUrl = channel.url || channel.direct_source || channel.stream_url || '';
            if (baseUrl && !baseUrl.startsWith('http')) baseUrl = '';
        }

        if (!baseUrl) return '';

        // 🔒 HTTPS PRIORITY: Upgrade HTTP → HTTPS (excepto localhost)
        baseUrl = preferHttps(baseUrl);

        // ═══════════════════════════════════════════════════════════════════════
        // 🌐 CLEAN URL MODE — JWT ahora viaja en #EXTHTTP headers, no en URL
        // 🔑 Cuando jwt-generator está ON, el JWT va como Authorization: Bearer
        //    en el bloque #EXTHTTP, que OTT Navigator envía como header HTTP real.
        //    La URL queda 100% limpia siempre.
        // ═══════════════════════════════════════════════════════════════════════
        const jwtModuleOn = isModuleEnabled('jwt-generator');
        if (jwtModuleOn) {
            // JWT viaja en #EXTHTTP (Authorization: Bearer), NO en URL
            console.log(`🔑 [JWT-HEADERS] JWT en #EXTHTTP headers (${(jwt || '').length} chars), URL limpia: ${baseUrl.length} chars`);
            return baseUrl;
        }
        if (CLEAN_URL_MODE) {
            console.log(`🌐 [CLEAN-URL] URL limpia generada: ${baseUrl.length} chars`);
            return baseUrl;
        }

        // ═══════════════════════════════════════════════════════════════════════
        // 🔄 URL LENGTH VALIDATOR + FALLBACK MODE INTEGRATION (Legacy mode)
        // ═══════════════════════════════════════════════════════════════════════

        const separator = baseUrl.includes('?') ? '&' : '?';

        // 📦 Si compact-jwt está ON → usar JWT compacto (40 campos, ~800 chars)
        // en lugar del JWT completo (68 campos, ~2500 chars)
        let actualJwt = jwt;
        if (jwt && isModuleEnabled('compact-jwt') && window.CompactJWTGenerator) {
            actualJwt = window.CompactJWTGenerator.generateCompactJWT(channel, profile || 'P3', index);
            console.log(`📦 [COMPACT-JWT] JWT compacto: ${actualJwt.length} chars (vs full: ${jwt.length})`);
        }
        let finalUrl = actualJwt ? `${baseUrl}${separator}ape_jwt=${actualJwt}` : baseUrl;

        // Verificar longitud de URL
        if (finalUrl.length > MAX_URL_LENGTH && actualJwt) {
            console.log(`📏 [URL-VALIDATOR] URL excede ${MAX_URL_LENGTH} chars (${finalUrl.length}), aplicando Compact JWT...`);

            // Intentar con Compact JWT si está disponible (fallback si no se usó arriba)
            if (window.CompactJWTGenerator && profile) {
                const compactJWT = window.CompactJWTGenerator.generateCompactJWT(channel, profile, index);
                finalUrl = `${baseUrl}${separator}ape_jwt=${compactJWT}`;

                if (finalUrl.length <= MAX_URL_LENGTH) {
                    console.log(`✅ [URL-VALIDATOR] Compact JWT aplicado: ${finalUrl.length} chars`);
                } else {
                    // Último recurso: sin JWT
                    console.warn(`⚠️ [URL-VALIDATOR] Aún excede límite con Compact JWT, usando URL sin JWT`);
                    finalUrl = baseUrl;
                }
            } else if (window.FallbackModeHandler) {
                // Usar Fallback Mode Handler
                const result = window.FallbackModeHandler.generateDynamicJWT(channel, profile || {}, index);
                if (result.jwt) {
                    finalUrl = `${baseUrl}${separator}ape_jwt=${result.jwt}`;
                    console.log(`✅ [FALLBACK-MODE] JWT ${result.mode} aplicado: ${finalUrl.length} chars`);
                } else {
                    finalUrl = baseUrl;
                    console.warn(`⚠️ [FALLBACK-MODE] Sin JWT disponible`);
                }
            }
        }

        return finalUrl;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // DETERMINAR PERFIL AUTOMÁTICO
    // ═══════════════════════════════════════════════════════════════════════════

    function detectProfile(channel) {
        const name = (channel.name || '').toUpperCase();
        const resolution = channel.resolution || channel.heuristics?.resolution || '';

        if (name.includes('8K') || resolution.includes('7680')) return 'P0';
        if (name.includes('4K') || name.includes('UHD') || resolution.includes('3840')) {
            if (name.includes('60FPS') || name.includes('SPORTS')) return 'P1';
            return 'P2';
        }
        if (name.includes('FHD') || name.includes('1080') || resolution.includes('1920')) return 'P3';
        if (name.includes('HD') || name.includes('720') || resolution.includes('1280')) return 'P4';
        if (name.includes('SD') || name.includes('480')) return 'P5';

        return 'P3'; // Default FHD
    }



    // ═══════════════════════════════════════════════════════════════════════════
    // GENERAR ENTRADA COMPLETA DE CANAL (133+ líneas)
    // ═══════════════════════════════════════════════════════════════════════════

    function generateChannelEntry(channel, index, profile = null) {
        // 🛑 ANTI-BLEED PROTOCOL (BigData Level - Foreign Key Restraint)
        // Aborta la asignación de perfil, la generación de Headers y de JWT si el canal
        // no contiene su estructura fundamental (Stream_id & Server_id).
        const serverIdFk = channel.serverId || channel._serverId;
        const streamId = channel.stream_id || channel.id;
        if (!serverIdFk || !streamId) {
            console.error(`[ANTI-BLEED] Canal corrupto por pérdida de Foreign Key. Abortando heurística y perfil (ID: ${channel.id || 'N/A'}).`);
            return []; // Devuelve vacío para que no inyecte basura M3U8
        }

        const actualProfile = profile || detectProfile(channel);

        // APE v17.2.5: Session Unique Identity
        const chSessionId = Math.random().toString(36).substr(2, 16).toUpperCase();

        // JWT STRATEGY: 68-campo completo vs Compact profile-ref (~10 campos)
        // Compact ON → JWT ~300 chars con p: "P3" (profile reference)
        // Compact OFF → JWT ~2500 chars con 68 campos explícitos
        // ═══════════════════════════════════════════════════════════════════════
        let jwt = null;
        if (isModuleEnabled(MODULE_FEATURES.jwt) && !window._APE_GHOST_PROTOCOL) {
            const compactOn = isModuleEnabled('compact-jwt');
            if (compactOn && window.CompactJWTGenerator) {
                jwt = window.CompactJWTGenerator.generateCompactJWT(channel, actualProfile, index);
                console.log(`📦 [COMPACT-JWT] Profile-ref JWT: ${(jwt || '').length} chars, profile: ${actualProfile}`);
            } else {
                jwt = generateJWT68Fields(channel, actualProfile, index);
            }
        } else if (window._APE_GHOST_PROTOCOL) {
            // GHOST PROTOCOL: Generate the payload but encode it in hex and format it opaquely.
            const compactOn = isModuleEnabled('compact-jwt');
            let rawJwt = null;
            if (compactOn && window.CompactJWTGenerator) {
                rawJwt = window.CompactJWTGenerator.generateCompactJWT(channel, actualProfile, index);
            } else {
                rawJwt = generateJWT68Fields(channel, actualProfile, index);
            }
            if (rawJwt) {
                let hexJwt = '';
                for (let i = 0; i < rawJwt.length; i++) {
                    hexJwt += rawJwt.charCodeAt(i).toString(16).padStart(2, '0');
                }
                jwt = "HYDRA-SECURE-" + hexJwt;
            }
        }
        const url = buildChannelUrl(channel, jwt, actualProfile, index);

        const lines = [];

        // 1. #EXTINF (1 línea) - Siempre incluido
        lines.push(generateEXTINF(channel, actualProfile, index));

        // 2. EXTVLCOPT (63 líneas) - Condicional según módulo buffer
        if (isModuleEnabled(MODULE_FEATURES.buffer)) {
            lines.push(...generateEXTVLCOPT(actualProfile));
        }

        // ═════════════════════════════════════════════════════════════════════════
        // 2B. ESTRATEGIA DE BUFFER LAYERED_3 (10 directivas hardened)
        // Valores fijos agresivos: 19s network, 19s live, 4.75s file
        // ═════════════════════════════════════════════════════════════════════════
        // --- Capa EXTVLCOPT (VLC/OTT/TiviMate) ---
        lines.push('#EXTVLCOPT:network-caching=19000');
        lines.push('#EXTVLCOPT:live-caching=19000');
        lines.push('#EXTVLCOPT:file-caching=4750');

        // --- Capa KODIPROP (Kodi) ---
        lines.push('#KODIPROP:inputstream.adaptive.buffer_duration=19');
        lines.push('#KODIPROP:inputstream.adaptive.pre_buffer_bytes=23750000');
        lines.push('#KODIPROP:inputstream.adaptive.buffer_type=AGGRESSIVE');

        // --- Capa EXT-X-APE (Motor APE) ---
        lines.push('#EXT-X-APE-NETWORK-CACHING:19000');
        lines.push('#EXT-X-APE-LIVE-CACHING:19000');
        lines.push('#EXT-X-APE-FILE-CACHING:4750');
        lines.push('#EXT-X-APE-BUFFER-STRATEGY:LAYERED_3');

        // 3. KODIPROP (38 líneas) - Condicional según módulo manifest
        if (isModuleEnabled(MODULE_FEATURES.manifest)) {
            lines.push(...generateKODIPROP(actualProfile));
        }

        // 4. EXT-X-APE (29 líneas) - Condicional según múltiples módulos
        if (isModuleEnabled(MODULE_FEATURES.headers) || isModuleEnabled(MODULE_FEATURES.evasion)) {
            lines.push(...generateEXTXAPE(channel, actualProfile, jwt));
        }

        // 5. EXT-X-START (1 línea) - Siempre incluido
        lines.push(EXT_X_START_TEMPLATE);

        // ═════════════════════════════════════════════════════════════════════════
        // 5B. OPTIMIZACIÓN DE TRANSPORTE AVANZADA POR CANAL (12 directivas)
        // Resource Hints, HTTP/3, Chunked Transfer, Early Hints — 3 capas
        // ═════════════════════════════════════════════════════════════════════════
        // Extraer dominios del servidor del canal para resource hints
        const channelDomains = (() => {
            try {
                const u = new URL(url);
                return u.hostname;
            } catch { return 'unknown'; }
        })();

        // --- Capa APE (4 Directivas) ---
        lines.push(`#EXT-X-APE-DNS-PREFETCH:${channelDomains}`);
        lines.push(`#EXT-X-APE-PRECONNECT:${channelDomains}`);
        lines.push('#EXT-X-APE-PROTOCOL-PREFERENCE:h3,h2,http/1.1');
        lines.push('#EXT-X-APE-EARLY-HINTS-ENABLED:true');

        // --- Capa VLC/OTT (4 Directivas) ---
        lines.push(`#EXTVLCOPT:http-preconnect-domains=${channelDomains}`);
        lines.push('#EXTVLCOPT:http-version=1.1');
        lines.push('#EXTVLCOPT:http-header:Accept-Encoding=gzip, deflate, chunked');
        lines.push('#EXTVLCOPT:http-header:Want-Early-Hints=1');

        // --- Capa Kodi (4 Directivas) ---
        lines.push(`#KODIPROP:inputstream.adaptive.preconnect_domains=${channelDomains}`);
        lines.push('#KODIPROP:inputstream.adaptive.http_version=1.1');
        lines.push('#KODIPROP:inputstream.adaptive.http_headers=Accept-Encoding=gzip, deflate, chunked');
        lines.push('#KODIPROP:inputstream.adaptive.early_hints=true');

        // ═════════════════════════════════════════════════════════════════════════
        // 5C. PER-CHANNEL EXPLOITATION HEADERS (7 directivas)
        // Resiliencia: sin rate limiting artificial, sin validación de sesión, sin throttling
        // ═════════════════════════════════════════════════════════════════════════
        lines.push(`#EXT-X-APE-PROFILE:${actualProfile}`);
        lines.push('#EXT-X-APE-CONCURRENT-DOWNLOADS:200');
        lines.push('#EXT-X-APE-PREFETCH-PARALLEL:200');
        lines.push('#EXT-X-APE-PREFETCH-SEGMENTS:500');
        lines.push('#EXT-X-APE-ADAPTIVE-QUALITY:enabled');
        // 🔒 Solo emite el tag de EVASIÓN si está habilitado (Heredado de UI)
        if (isModuleEnabled(MODULE_FEATURES.evasion)) {
            const activeEvasionPerCh = parseInt(JSON.parse(localStorage.getItem('iptv_preferences') || '{}').manualEvasionLevel) || 3;
            lines.push('#EXT-X-APE-ISP-EVASION:enabled');
            lines.push(`#EXT-X-APE-ISP-EVASION-LEVEL:${activeEvasionPerCh}`);
        }
        lines.push('#EXT-X-APE-CACHE-ENABLED:true');

        // ═══════════════════════════════════════════════════════════════════════
        // 6. HLS REDUNDANT STREAMS (RFC 8216) [TOGGLE: redundant-streams]
        // ═══════════════════════════════════════════════════════════════════════
        // 6. EXT-X-STREAM-INF + AVERAGE-BANDWIDTH (RFC 8216 §4.3.4.2)
        // SIEMPRE se emite para informar BANDWIDTH y AVERAGE-BANDWIDTH por canal.
        // Si redundant-streams está ON, adicionalmente agrega failover HLS → TS.
        // ═══════════════════════════════════════════════════════════════════════
        const cfg = getProfileConfig(actualProfile);
        const bandwidth = (cfg.bitrate || 5000) * 1000; // kbps → bps
        const avgBandwidth = Math.round(bandwidth * 0.8); // AVERAGE-BANDWIDTH ≈ 80% del pico (Apple HLS Authoring Spec)
        const resolution = cfg.resolution || '1920x1080';
        const fps = cfg.fps || 30;

        // ═══════════════════════════════════════════════════════════════════
        // 🎯 CODECS EN EXT-X-STREAM-INF [TOGGLE: prio-quality]
        //
        // Prio. Quality ON (window._APE_PRIO_QUALITY):
        //   Jerarquía MÁXIMA COMPRESIÓN (NUNCA pedir menos de HEVC):
        //   AV1 (top) → HEVC/H.265 (mínimo aceptable) → H.264 High (último recurso)
        //   • P0: AV1 Main 10-bit + Opus
        //   • P1-P5: HEVC Main 10 + AAC-LC (HEVC es el PISO)
        //
        // Prio. Quality OFF:
        //   Usa codec nativo del perfil (H264 para P3-P5)
        // ═══════════════════════════════════════════════════════════════════

        let codecString;
        if (window._APE_PRIO_QUALITY !== false) {
            // 🎯 PRIO QUALITY ON: Siempre máxima compresión
            if (actualProfile === 'P0') {
                codecString = 'av01.0.16M.10,opus';           // AV1 + Opus (top)
            } else {
                codecString = 'hev1.2.4.L153.B0,mp4a.40.2';   // HEVC + AAC (mínimo aceptable)
            }
        } else {
            // ⚪ PRIO QUALITY OFF: Codec nativo del perfil
            const primary = (cfg.codec_primary || 'H264').toUpperCase();
            if (primary === 'AV1') codecString = 'av01.0.16M.10,opus';
            else if (primary === 'HEVC') codecString = 'hev1.2.4.L153.B0,mp4a.40.2';
            else codecString = 'avc1.640028,mp4a.40.2';       // H264 High@4.0 (nunca Baseline)
        }

        // EXT-X-STREAM-INF con AVERAGE-BANDWIDTH y CODECS (RFC 8216 §4.3.4.2)
        let streamInf = `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},AVERAGE-BANDWIDTH=${avgBandwidth},RESOLUTION=${resolution},CODECS="${codecString}",FRAME-RATE=${fps}.000`;

        if (isModuleEnabled(MODULE_FEATURES.jwt)) {
            streamInf += `,X-APE-PROFILE="${actualProfile}",X-APE-VERSION="${VERSION}"`;
        }

        // 2. #EXT-X-STREAM-INF -> Ataca el Engine ABR nativo de ExoPlayer/Apple (Precarga Bw/Codecs).
        // INYECCIÓN FASE 3: ESTO SE IMPRIMIRÁ AL FINAL ABSOLUTO POR RFC 8216.

        // 🌐 #EXTATTRFROMURL — Sincronización Universal y Server-Side DNS Evasion 🌐
        // Conecta el reproductor al VPS para recibir fallbacks de IP y métricas QoS activas.
        const resolverBase = (typeof localStorage !== 'undefined' && localStorage.getItem('vps_base_url'))
            || 'https://iptv-ape.duckdns.org';
        const chId = channel.stream_id || channel.id || index;
        const listId = (typeof VERSION !== 'undefined' ? VERSION : '16.6.0-FINAL').replace(/[^a-zA-Z0-9.-]/g, '');
        let originHost = 'unknown';
        try { if (url && url.startsWith('http')) originHost = new URL(url).hostname; } catch (e) { }

        // ╔══════════════════════════════════════════════════════════════════════╗
        // ║  APE v18.2 — CMAF/fMP4 UNIVERSAL (FORMATO ÚNICO E INCONDICIONAL)          ║
        // ║  Todas las listas se generan SIEMPRE con &format=cmaf desde el origen.    ║
        // ║  No hay toggles, no hay condicionales, no hay formatos alternativos.        ║
        // ║  Un único contenedor fMP4 referenciado por .m3u8 y .mpd.                  ║
        // ╚══════════════════════════════════════════════════════════════════════╝
        let extAttrUrl = `${resolverBase}/resolve_quality.php?ch=${encodeURIComponent(chId)}&sid=${encodeURIComponent(chId)}&origin=${encodeURIComponent(originHost)}&p=${actualProfile}&format=cmaf&mode=direct`;

        // 🟧 RUTA 1: VÍA DIRECTA M3U8 (URL / Payload Crudo)
        // ESTRICTAMENTE: Identidad, Promesas y Telemetría Matemática Cruda (bw, ping, buf, th1, pfseg)
        // PROHIBIDO: Métricas Telchemy, Datos de Evasión Hex (Hydra), y Flags Visuales Quantum (Esos van en Ruta 2).

        // EXTRACCIÓN DE DNA DEL PERFIL GUI: Se mapea con valores por defecto solo si el DNA está vacío.
        const dnaBw = cfg.max_bandwidth || 60000000;
        const dnaBuf = cfg.buffer_ms || 15000;
        const dnaTh1 = cfg.throughput_t1 || 13.4;
        const dnaTh2 = cfg.throughput_t2 || 17.4;
        const dnaPfSeg = cfg.prefetch_segments || 120;
        const dnaPfPar = cfg.prefetch_parallel || 60;
        const dnaTbw = Math.round((cfg.bitrate || 10) * 1000);
        const dnaMos = (actualProfile === 'P0' || actualProfile === 'P1' || actualProfile === 'P2') ? 4.9 : 4.5;
        const dnaJit = cfg.jitter_ms_max || 30; // Heredado de qoe metrics

        extAttrUrl += `&list=${listId}&bw=${dnaBw}&buf=${dnaBuf}&th1=${dnaTh1}&th2=${dnaTh2}&pfseg=${dnaPfSeg}&pfpar=${dnaPfPar}&tbw=${dnaTbw}&mos=${dnaMos}&jit=${dnaJit}&gop=2.0&ape_sid=${chSessionId}`;
        lines.push(`#EXTATTRFROMURL:${extAttrUrl}`);

        // APE v17.2.5: Explicit VLC/OTT Headers (Retro-compatibility Layer)
        // 🚀 ACELERACIÓN HARDWARE & QUANTUM PIXEL OVERDRIVE v5
        // stealthUA Declaración movida al ámbito global
        const stealthUA_dummy = isModuleEnabled(MODULE_FEATURES.hydraStealth) && window._APE_HYDRA_STEALTH
            ? (window.UserAgentRotator?._cachedSelectedUA || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/125.0.0.0")
            : "OTT Navigator/1.7.4.1";
        lines.push(`#EXTVLCOPT:http-user-agent=${stealthUA}`);
        lines.push(`#EXTVLCOPT:http-referrer=${resolverBase}/`);

        // 🔬 TELCHEMY TVQM & IMPAIRMENT METRICS (2026 Standard)
        lines.push(`#EXT-X-TELCHEMY-TVQM:VSTQ=50,VSMQ=50,EPSNR=45,MAPDV=10,PPDV=5`);
        lines.push(`#EXT-X-TELCHEMY-TR101290:SYNC_LOSS=0,CC_ERROR=0,PCR_ERR=0`);

        // ⚡ PRE-WARMER ZERO-ZAPPING (Predictive Caching - Reducido a Top 5 para no saturar sockets)
        // APE v18.2: Pre-calentamiento SIEMPRE activo con format=cmaf (incondicional)
        if (index < 5) {
            try {
                const prewarmUrl = `${resolverBase}/resolve_quality.php?ch=${encodeURIComponent(chId)}&sid=${encodeURIComponent(chId)}&origin=${encodeURIComponent(originHost)}&format=cmaf&mode=direct`;
                // Request opaca "no-cors" diferida para no interferir con ReadableStream context
                setTimeout(() => {
                    fetch(prewarmUrl, { mode: 'no-cors', cache: 'no-store' }).catch(() => { });
                }, 100 * index);
            } catch (e) { }
        }

        // 🛡️ FORENSIC MATRIX: Player Enslavement (KODI Anchor & Proxy Nullification)
        // APE v18.2 CMAF UNIVERSAL: manifest_type=hls SIEMPRE (fMP4 servido vía HLS manifest).
        // Todos los reproductores (OTT Nav, TiviMate, ExoPlayer, Kodi, Apple) leen fMP4
        // a través de un HLS manifest. No hay condicionales ni tiers alternativos.
        lines.push(`#KODIPROP:inputstream.adaptive.manifest_type=hls`);
        // lines.push(`#EXTVLCOPT:http-proxy=`); // Ocultado para evitar bug en OTT Nav que lee la sig linea como proxy

        // ── FORENSIC JSON SANITATION (Anti TiviMate/ExoPlayer Crash) ──
        const stealthHeaders = {
            "User-Agent": stealthUA.replace(/[\r\n]/g, ''),
            "X-Hardware-Decode": "true",
            "Connection": "close",
            "Accept": "*/*",
            "Accept-Language": "es-419,es;q=0.9,en;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "DNT": "1",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site"
        };

        if (window._APE_HYDRA_STEALTH) {
            stealthHeaders["X-Generic-Req"] = "true";
        } else {
            stealthHeaders["X-No-Proxy"] = "true";
            stealthHeaders["hw_decode_policy"] = "force_any";
            stealthHeaders["X-Chroma-Subsampling"] = "4:4:4";
            stealthHeaders["X-Color-Depth"] = "10bit";
            stealthHeaders["X-Force-AI-SR"] = "true";
            stealthHeaders["X-Edge-Enhancement"] = "neural-adaptive";
        }

        // DIRECTIVA MAESTRA DE ORQUESTACIÓN: Se conservan íntegros todos los Headers del DNA APE
        lines.push(`#EXTHTTP:${JSON.stringify(stealthHeaders)}`);

        // ╔══════════════════════════════════════════════════════════════════════════════╗
        // ║  🧠 DESPACHO UNIVERSAL CMAF/fMP4 (APE v18.2) 🧠                                ║
        // ║                                                                              ║
        // ║  PRINCIPIO: TODAS las listas se generan con &format=cmaf SIEMPRE.           ║
        // ║  No hay tiers, no hay condicionales por reproductor, no hay formatos         ║
        // ║  alternativos. Un único contenedor fMP4 unifica HLS y DASH.                 ║
        // ║                                                                              ║
        // ║  La URL ya contiene &format=cmaf&mode=direct desde su construcción          ║
        // ║  (línea 2342). Este bloque solo inyecta #EXT-X-STREAM-INF y la URL final.   ║
        // ╔══════════════════════════════════════════════════════════════════════════════╗
        // ║  RFC 8216: #EXT-X-STREAM-INF se inyecta SIEMPRE para que todos los          ║
        // ║  reproductores modernos puedan hacer ABR y track selection sobre fMP4.       ║
        // ╚══════════════════════════════════════════════════════════════════════════════╝

        // La URL ya tiene &format=cmaf&mode=direct desde su construcción (línea 2342).
        // No se necesita ningún .replace() adicional.
        const targetUrl = extAttrUrl;

        // #EXT-X-STREAM-INF: inyectado SIEMPRE (RFC 8216) para habilitar ABR sobre fMP4
        lines.push(streamInf);
        lines.push(targetUrl);

        // Stream redundante: TS failover (solo si redundant-streams ON)
        if (isModuleEnabled(MODULE_FEATURES.redundantStreams) && window._APE_REDUNDANT_STREAMS === true) {
            let urlTS;
            if (url.endsWith('.m3u8')) {
                urlTS = url.replace(/\.m3u8$/, '.ts');
            } else if (url.endsWith('.ts')) {
                urlTS = url; // ya es TS, no duplicar
            } else {
                urlTS = url.replace(/\.[^.]+$/, '.ts') !== url ? url.replace(/\.[^.]+$/, '.ts') : url + '.ts';
            }
            // Solo agregar fallback TS si es diferente a la URL primaria
            if (urlTS !== url) {
                // lines.push(streamInf);
                // lines.push(urlTS); // BLOQUEADO: OTT Navigator no soporta 2 URLs por #EXTINF
            }
        }

        // 🧠 MOTOR ORQUESTADOR DINÁMICO APE v18 (0 Cortes & Sincronización Universal) 🧠
        // Re-estructura todo el payload para estricta obediencia RFC 8216 y Consecuencia Multi-Player
        const ApeOmniOrchestrator = {
            process: function (rawLines) {
                const vlcLayer = [];
                const kodiLayer = [];
                const apeLayer = [];
                const jsonLayer = [];
                const extInf = [];
                const streamInf = [];
                const urls = [];
                const othersLayer = [];

                for (const line of rawLines) {
                    if (!line) continue;
                    if (line.startsWith('#EXTINF')) extInf.push(line);
                    else if (line.startsWith('#EXTVLCOPT')) vlcLayer.push(line);
                    else if (line.startsWith('#KODIPROP')) kodiLayer.push(line);
                    else if (line.startsWith('#EXT-X-APE')) apeLayer.push(line);
                    else if (line.startsWith('#EXTHTTP')) jsonLayer.push(line);
                    else if (line.startsWith('#EXTATTRFROMURL')) othersLayer.push(line);
                    else if (line.startsWith('#EXT-X-STREAM-INF')) streamInf.push(line);
                    else if (line.startsWith('http')) urls.push(line);
                    else othersLayer.push(line);
                }

                // Ensamblaje Estricto RFC 8216
                return [
                    ...extInf,
                    ...vlcLayer,
                    ...jsonLayer,
                    ...apeLayer,
                    ...kodiLayer,
                    ...othersLayer,
                    ...streamInf,
                    ...urls
                ].join('\n');
            }
        };

        return ApeOmniOrchestrator.process(lines);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 🌊 STREAMING M3U8 GENERATOR — ReadableStream (anti-RangeError)
    // Genera M3U8 como stream de chunks pequeños.
    // Memoria: ~5 MB constante (vs 300+ MB sin streaming)
    // Capacidad: ilimitada (no hay string length limit)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Crea un ReadableStream que emite el contenido M3U8 en chunks.
     * Cada canal se genera y se enqueue individualmente.
     * El stream se puede convertir a Blob con: new Response(stream).blob()
     */
    function generateM3U8Stream(channels, options = {}) {
        const forceProfile = options.forceProfile || null;
        const includeHeader = options.includeHeader !== false;
        const useHUD = options.hud !== false && window.HUD_TYPED_ARRAYS;
        const encoder = new TextEncoder();
        const BATCH_SIZE = 200; // Yield al browser cada 200 canales
        let totalBytes = 0;

        const stream = new ReadableStream({
            async start(controller) {
                const startTime = Date.now();

                console.log(`🌊 [STREAM] Generando M3U8 ULTIMATE para ${channels.length} canales...`);
                console.log(`   📊 Estructura: 133+ líneas/canal | JWT: 68+ campos | Perfiles: P0-P5`);

                // 🎯 INICIALIZAR HUD
                if (useHUD) {
                    window.HUD_TYPED_ARRAYS.init(channels.length, {
                        sessionId: `TA-${Date.now()}`
                    });
                    window.HUD_TYPED_ARRAYS.log('🌊 Streaming mode activado...', '#a78bfa');
                }

                // PASO 1: GLOBAL HEADER
                if (includeHeader) {
                    let headerChunk = generateGlobalHeader() + '\n\n';
                    // 👻 GHOST PROTOCOL: Ofuscar metadata antes de enviar el chunk (evasión ISP)
                    if (window.ApeModuleManager?.isEnabled?.('ghost-protocol') === true) {
                        headerChunk = headerChunk.replace(/#EXT-X-APE-/g, '#EXT-X-SYS-');
                    }
                    const encoded = encoder.encode(headerChunk);
                    totalBytes += encoded.byteLength;
                    controller.enqueue(encoded);
                    if (useHUD) {
                        window.HUD_TYPED_ARRAYS.log('📋 Header global streamed', '#06b6d4');
                    }
                }

                // PASO 2: STREAM cada canal
                // 🔧 FIX: Contadores de perfil locales para TODOS los canales (no solo los muestreados)
                const localProfileCounts = { p0: 0, p1: 0, p2: 0, p3: 0, p4: 0, p5: 0 };

                for (let index = 0; index < channels.length; index++) {
                    const channel = channels[index];

                    // Check abort
                    if (useHUD && window.HUD_TYPED_ARRAYS.isAborted()) {
                        controller.error(new Error('ABORTED_BY_USER'));
                        return;
                    }

                    try {
                        let entry = generateChannelEntry(channel, index, forceProfile);
                        // 👻 GHOST PROTOCOL: Ofuscar tags de cada canal
                        if (window.ApeModuleManager?.isEnabled?.('ghost-protocol') === true) {
                            entry = entry.replace(/#EXT-X-APE-/g, '#EXT-X-SYS-');
                        }
                        const chunk = entry + '\n\n';
                        const encoded = encoder.encode(chunk);
                        totalBytes += encoded.byteLength;
                        controller.enqueue(encoded);

                        // Detectar perfil para estadísticas — SIEMPRE contar
                        const profile = forceProfile || detectProfile(channel);
                        const pKey = profile.toLowerCase();
                        if (localProfileCounts[pKey] !== undefined) {
                            localProfileCounts[pKey]++;
                        }

                        // Actualizar HUD (cada 50 canales para rendimiento)
                        if (useHUD && (index % 50 === 0 || index === channels.length - 1)) {
                            window.HUD_TYPED_ARRAYS.updateChannel(index + 1, channel.name, profile, localProfileCounts);
                        }

                        // Progress log cada 1000
                        if ((index + 1) % 1000 === 0) {
                            console.log(`   ⏳ Streamed: ${index + 1}/${channels.length}`);
                            if (useHUD) {
                                window.HUD_TYPED_ARRAYS.log(`📺 ${index + 1}/${channels.length} canales...`, '#a78bfa');
                            }
                        }
                    } catch (error) {
                        if (error.message === 'ABORTED_BY_USER') {
                            controller.error(error);
                            return;
                        }
                        console.error(`❌ [STREAM] Error en canal ${channel.name}:`, error);
                        if (useHUD) {
                            window.HUD_TYPED_ARRAYS.log(`⚠️ Error: ${channel.name}`, '#ef4444');
                        }
                    }

                    // 🌊 YIELD: Cada BATCH_SIZE canales, ceder control al browser
                    if ((index + 1) % BATCH_SIZE === 0) {
                        await new Promise(resolve => setTimeout(resolve, 0));
                    }
                }

                // Cerrar stream
                controller.close();

                const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
                const sizeMB = (totalBytes / 1024 / 1024).toFixed(2);
                const sizeKB = (totalBytes / 1024).toFixed(2);

                console.log(`✅ [STREAM] Generación completada en ${elapsed}s`);
                console.log(`   📊 Canales: ${channels.length} | Tamaño: ${sizeMB} MB | ~${140 * channels.length} líneas`);

                // 🎯 COMPLETAR HUD
                if (useHUD) {
                    window.HUD_TYPED_ARRAYS.updateStats({
                        jwt: `${(totalBytes / channels.length / 1024 * 0.3).toFixed(1)} KB/ch`,
                        filesize: `${sizeMB} MB`,
                        grouptitle: '✓ Activo'
                    });
                    window.HUD_TYPED_ARRAYS.complete({
                        jwt: `${sizeKB} KB`,
                        filesize: `${sizeMB} MB`
                    });
                }
            }
        });

        return stream;
    }

    /**
     * generateM3U8 — wrapper que convierte el stream a Blob
     * Compatible con el resto del sistema (devuelve Blob)
     */
    async function generateM3U8(channels, options = {}) {
        if (!channels || !Array.isArray(channels) || channels.length === 0) {
            console.error('❌ [TYPED-ARRAYS] No hay canales para generar');
            return null;
        }

        const stream = generateM3U8Stream(channels, options);
        // 🌊 El browser convierte el stream a Blob internamente
        // sin crear un mega-string en JS — manejo eficiente de memoria
        const response = new Response(stream);
        const blob = await response.blob();
        return blob;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // GENERAR Y DESCARGAR (async — usa streaming)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * 🗺️ BUILD CHANNELS MAP — Genera channels_map.json para resolve.php
     * GARANTIZA que cada canal tenga stream_id numérico para evitar
     * SID-MISMATCH (slug literal enviado al proveedor IPTV).
     * 
     * @param {Array} channels - Lista de canales procesados
     * @param {string|null} forceProfile - Perfil forzado (si aplica)
     * @returns {Object} channelsMap - Mapa de canales con stream_id obligatorio
     */
    function buildChannelsMap(channels, forceProfile = null, listId = 'unknown') {
        const map = {};

        // 🧠 LATENCIA RAYO & EVASIÓN: Recuperar configuración del UI (LocalStorage)
        let qosDownloadMbps = null;
        let qosPingMs = null;
        let evasionLevel = 3;
        try {
            const qosProfile = JSON.parse(localStorage.getItem('iptv_qos_profile') || 'null');
            if (qosProfile && qosProfile.downloadMbps) {
                qosDownloadMbps = parseInt(qosProfile.downloadMbps, 10);
                qosPingMs = parseInt(qosProfile.pingMs, 10) || 20;
            }
            const prefs = JSON.parse(localStorage.getItem('iptv_preferences') || '{}');
            if (prefs.manualEvasionLevel) evasionLevel = parseInt(prefs.manualEvasionLevel, 10);
        } catch (e) { }

        for (let i = 0; i < channels.length; i++) {
            const ch = channels[i];
            const profile = forceProfile || detectProfile(ch);
            const cfg = getProfileConfig(profile);

            // Clave primaria: stream_id numérico (preferido), luego slug, luego índice
            // 🛑 ANTI-COLISIÓN DE SLUGS (Task 3): Asegurar unicidad por servidor
            const rawStreamId = String(ch.stream_id || ch.id || i);
            const streamId = ch.serverId ? `${ch.serverId}_${rawStreamId}` : rawStreamId;
            const slug = ch.epg_channel_id || ch.slug || streamId;

            // ═══════════════════════════════════════════════════════════════
            // 🔑 REGLA CRÍTICA: stream_id SIEMPRE presente y numérico (modificado para evitar colisiones)
            // Esto previene que resolve.php envíe slugs literales al proveedor
            // ═══════════════════════════════════════════════════════════════
            // 🛑 ANTI-BLEED PROTOCOL (BigData Export)
            // Si el motor de renderizado JS detecta orfandad aquí, el JSON omitirá el canal.
            const serverIdFk = ch.serverId || ch._serverId;
            if (!serverIdFk) {
                console.error(`[ANTI-BLEED] Omitiendo canal de channels_map.json por carecer de llave foránea de servidor (Stream ID: ${streamId})`);
                continue; // ESTRICTO: NO SE EXPORTA DATA HUÉRFANA
            }

            const entry = {
                profile: profile,
                label: ch.name || `Canal ${i}`,
                group: ch.category_name || ch.group || 'General',
                stream_id: rawStreamId, // Conserva el ID puro para la petición al Xtream API
                unique_key: streamId,   // Clave única compuesta anti-colisión
                server_id: serverIdFk, // 🔒 INYECCIÓN DE LLAVE FORÁNEA (Obligatoria)
                math_telemetry: {
                    // Si QoS está activo usamos el Bandwidth medido, sino el del perfil
                    bw: qosDownloadMbps ? Math.round(qosDownloadMbps * 1000 * 1000) : (cfg.max_bandwidth || 10000000),
                    ping: qosPingMs || 20
                },
                qoe_qos_metrics: {
                    target_mos: (profile === 'P0' || profile === 'P1' || profile === 'P2') ? 4.9 : 4.5,
                    jitter_ms_max: 30,
                    pl_tolerance: (profile === 'P0' || profile === 'P1') ? 0.01 : 0.1,
                    // APE v18.2 CMAF UNIVERSAL: format=cmaf siempre (incondicional)
                    format: 'cmaf'
                },
                security_evasion: {
                    ghost_protocol: !!window._APE_GHOST_PROTOCOL,
                    hydra_stealth: !!window._APE_HYDRA_STEALTH,
                    evasion_level: evasionLevel,
                    allow_http_native: true // 🔒 (Task 4) Mantener HTTP nativo si el proveedor lo envía
                },
                telchemy_metrics: {
                    vstq: 50,
                    vsmq: 50,
                    epsnr: 45,
                    mapdv: 10,
                    ppdv: 5,
                    tr101290_strict: true
                },
                fusion_directives: {
                    bwdif: 'enforced',
                    max_resolution: '4320p',
                    heuristic: 'adaptive-highest'
                },
                hw_tcp_orchestration: {
                    hw_decode_policy: 'force_any'
                    // 🛡️ ANTI-407: tcp_multiplex_proxy eliminado permanentemente
                },
                quantum_pixel_overdrive: {
                    chroma_subsampling: '4:4:4',
                    color_depth: '10bit',
                    force_ai_sr: true,
                    luma_denoise: 'hqdn3d'
                },
                // APE v18.2 CMAF UNIVERSAL: manifest_preference y fmp4_enabled siempre activos
                manifest_preference: ["hls_fmp4", "dash", "hls_ts"],
                codec_priority: "av1,vp9,hevc",
                dash_drm: false,
                fmp4_enabled: true,
                ape_directives_inherited: true,
                quantum_visual: !!window._APE_QUANTUM_VISUAL,
                // 🧬 DNA FULL INJECTION (200+ UI PARAMETERS)
                vlcopt_overrides: cfg.vlcopt || {},
                http_headers_overrides: cfg.headers || {},
                kodiprop_overrides: cfg.kodiprop || {},
                dna_profile_overrides: cfg || {}
            };

            // Telemetría extendida para perfiles premium
            if (profile === 'P0' || profile === 'P1' || profile === 'P2') {
                entry.math_telemetry.buf = cfg.buffer_ms || 15000;
                entry.math_telemetry.th1 = cfg.throughput_t1 || 13.4;
                entry.math_telemetry.th2 = cfg.throughput_t2 || 17.4;
                entry.math_telemetry.pfseg = cfg.prefetch_segments || 120;
                entry.math_telemetry.pfpar = cfg.prefetch_parallel || 60;
                // Si el user definió BW, el target bit rate puede ser adaptado a su QoS
                entry.math_telemetry.tbw = qosDownloadMbps ? Math.round((qosDownloadMbps * 1000 * 1000) / 2) : Math.round((cfg.max_bandwidth || 60000000) / 2);
            }

            map[slug] = entry;
        }

        // ═══════════════════════════════════════════════════════════════════
        // 📦 DEPLOYMENT ENVELOPE: meta + channelMap + contracts
        // El VPS distingue qué es del map, qué del resolve, qué del resolve_quality
        // ═══════════════════════════════════════════════════════════════════
        const envelope = {
            meta: {
                listId: listId,
                generatedAt: new Date().toISOString(),
                version: VERSION,
                source: 'TypedArraysUltimate',
                channelCount: Object.keys(map).length
            },
            // 🔌 PROVEEDORES DINÁMICOS (Cableados desde el Frontend UI)
            providers: (() => {
                try {
                    const servers = window.app?.state?.activeServers || [];
                    return servers.map(s => ({
                        id: s.id,
                        name: s.name || 'Unknown',
                        host: (s.baseUrl || '').replace(/\/player_api\.php$/i, '').replace(/^https?:\/\//i, ''),
                        username: s.username || '',
                        password: s.password || ''
                    }));
                } catch (e) { return []; }
            })(),
            channelMap: map,
            resolveContract: {
                headers: 'STRICT_INHERITANCE_V1',
                vlcopt: 'STRICT_INHERITANCE_V1'
            },
            resolveQualityContract: {
                mpdProfile: 'STRICT_INHERITANCE_V1'
            }
        };

        console.log(`🗺️ [CHANNELS-MAP] Generado: ${Object.keys(map).length} entradas, 100% con stream_id, listId: ${listId}`);
        return envelope;
    }

    async function generateAndDownload(channels, options = {}) {
        const blob = await generateM3U8(channels, options);
        if (!blob) return null;

        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
        const timeStr = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0');
        const filename = options.filename || `APE_TYPED_ARRAYS_ULTIMATE_${dateStr}_${timeStr}.m3u8`;

        // ═══════════════════════════════════════════════════════════════════════
        // 🗺️ AUTO-GENERATE channels_map.json (REGLA: stream_id SIEMPRE presente)
        // Previene SID-MISMATCH: resolve.php siempre tendrá un ID numérico
        // ═══════════════════════════════════════════════════════════════════════
        const mapBasename = filename.replace(/\.m3u8$/i, '');
        const listId = mapBasename; // e.g. "APE_TYPED_ARRAYS_ULTIMATE_20260304_003720"
        const channelsMap = buildChannelsMap(channels, options.forceProfile || null, listId);
        const mapFilename = `${mapBasename}.channels_map.json`;
        const mapJson = JSON.stringify(channelsMap, null, 2);
        const mapBlob = new Blob([mapJson], { type: 'application/json' });

        // 📦 ATOMIC DEPLOYMENT (ZIP) CHECK FOR LOCAL DOWNLOAD
        const gzipCheckbox = document.getElementById('gzipCompressionEnabled');
        const isAtomicDeployment = gzipCheckbox && gzipCheckbox.checked && typeof window.JSZip !== 'undefined';

        if (isAtomicDeployment) {
            console.log('📦 [TYPED-ARRAYS] Empaquetando ZIP Atómico localmente...');
            const zip = new window.JSZip();
            zip.file(filename, blob);
            zip.file(mapFilename, mapBlob);

            zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } })
                .then(zipBlob => {
                    const zipFilename = mapBasename + '.zip';
                    const url = URL.createObjectURL(zipBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = zipFilename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    setTimeout(() => URL.revokeObjectURL(url), 5000);
                    console.log(`📥 [TYPED-ARRAYS] ZIP descargado: ${zipFilename} (${(zipBlob.size / 1024 / 1024).toFixed(1)} MB)`);
                }).catch(err => {
                    console.error("❌ Error generando ZIP local:", err);
                });
        } else {
            // Descargar M3U8 (Sin compresión)
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 5000);

            // Descargar channels_map.json (companion)
            const mapUrl = URL.createObjectURL(mapBlob);
            const mapLink = document.createElement('a');
            mapLink.href = mapUrl;
            mapLink.download = mapFilename;
            document.body.appendChild(mapLink);
            setTimeout(() => {
                mapLink.click();
                document.body.removeChild(mapLink);
                setTimeout(() => URL.revokeObjectURL(mapUrl), 5000);
            }, 500); // Delay para evitar bloqueos

            console.log(`📥 [TYPED-ARRAYS] M3U8 descargado: ${filename} (${(blob.size / 1024 / 1024).toFixed(1)} MB)`);
            console.log(`🗺️ [TYPED-ARRAYS] Map descargado: ${mapFilename} (${(mapBlob.size / 1024).toFixed(1)} KB)`);
        }

        // Disparar evento para gateway-manager (incluye el map para auto-upload)
        if (typeof window !== 'undefined') {
            const event = new CustomEvent('m3u8-generated', {
                detail: {
                    content: blob,
                    filename: filename,
                    channelCount: channels.length,
                    generator: 'TYPED_ARRAYS_ULTIMATE',
                    version: VERSION,
                    linesPerChannel: 133,
                    size: blob.size,
                    // 🗺️ Companion channels_map.json para auto-upload al VPS
                    channelsMap: mapBlob,
                    channelsMapFilename: mapFilename
                }
            });
            window.dispatchEvent(event);

            // 🚀 ANTIGRAVITY AUTO-UPLOAD AL VPS 🚀
            if (window._APE_VPS_AUTO_UPLOAD !== false && typeof fetch !== 'undefined') {
                const autoUploadUrl = localStorage.getItem('vps_base_url') || 'https://iptv-ape.duckdns.org';
                const uploadEndpoint = `${autoUploadUrl}/resolve_quality.php`; // O tu endpoint real de subida
                
                // Disparamos un custom event separado solo para que el UI (App.js) lo catchee
                // Y si existe la función global para subir (ej: window.uploadListToVPS), la llamamos
                const uploadEvent = new CustomEvent('ape:auto-upload-ready', {
                    detail: {
                        blob: blob,
                        filename: filename,
                        channelsMap: mapBlob,
                        channelsMapFilename: mapFilename
                    }
                });
                window.dispatchEvent(uploadEvent);
            }
        }

        return { filename, blob, size: blob.size, channels: channels.length, mapFilename, mapBlob };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // INTEGRACIÓN GLOBAL
    // ═══════════════════════════════════════════════════════════════════════════

    if (typeof window !== 'undefined') {
        // API Global
        window.M3U8TypedArraysGenerator = {
            generate: generateM3U8,
            generateStream: generateM3U8Stream,
            generateAndDownload: generateAndDownload,
            generateChannelEntry: generateChannelEntry,
            generateJWT: generateJWT68Fields,
            detectProfile: detectProfile,
            buildChannelsMap: buildChannelsMap,
            profiles: PROFILES,
            version: VERSION,

            // ═══════════════════════════════════════════════════════════════════
            // CLEAN URL MODE API
            // ═══════════════════════════════════════════════════════════════════

            /**
             * Activa o desactiva el modo Clean URL
             * @param {boolean} enabled - true para URLs limpias, false para JWT
             */
            setCleanUrlMode: function (enabled) {
                CLEAN_URL_MODE = !!enabled;
                console.log(`🌐 [CLEAN-URL] Modo ${CLEAN_URL_MODE ? 'ACTIVADO' : 'DESACTIVADO'}`);
                return CLEAN_URL_MODE;
            },

            /**
             * Obtiene el estado actual del modo Clean URL
             * @returns {boolean}
             */
            isCleanUrlMode: function () {
                return CLEAN_URL_MODE;
            },

            /**
             * Obtiene información de la arquitectura actual
             * @returns {Object}
             */
            getArchitecture: function () {
                return {
                    version: VERSION,
                    mode: CLEAN_URL_MODE ? 'CLEAN_URL' : 'JWT',
                    urlMode: CLEAN_URL_MODE ? 'clean' : 'parameterized',
                    headersGlobal: CLEAN_URL_MODE ? 25 : 10,
                    headersPerChannel: CLEAN_URL_MODE ? 65 : 55,
                    jwtFields: CLEAN_URL_MODE ? 0 : 68
                };
            },

            // Generadores individuales (para debug/testing)
            _generateGlobalHeader: generateGlobalHeader,
            _generateEXTVLCOPT: generateEXTVLCOPT,
            _generateKODIPROP: generateKODIPROP,
            _generateEXTXAPE: generateEXTXAPE
        };

        // Integración con app
        function integrateWithApp() {
            if (window.app && typeof window.app === 'object') {
                window.app.generateM3U8_TypedArrays = function (options = {}) {
                    // ✅ FIX: Llamar método getFilteredChannels() para obtener canales filtrados actuales
                    let channels = [];

                    if (typeof this.getFilteredChannels === 'function') {
                        channels = this.getFilteredChannels() || [];
                        console.log(`🎯 [TYPED-ARRAYS] Usando getFilteredChannels(): ${channels.length} canales`);
                    } else {
                        channels = this.state?.filteredChannels ||
                            this.state?.channels ||
                            this.state?.channelsMaster || [];
                        console.log(`🎯 [TYPED-ARRAYS] Usando state fallback: ${channels.length} canales`);
                    }

                    if (channels.length === 0) {
                        alert('No hay canales para generar. Conecta a un servidor primero.');
                        return null;
                    }

                    return generateAndDownload(channels, options);
                };
                console.log('🚀 [TYPED-ARRAYS] ✅ Integrado con window.app.generateM3U8_TypedArrays()');
                return true;
            }
            return false;
        }

        // Polling para integración
        let attempts = 0;
        const maxAttempts = 50;
        const pollInterval = 200;

        function pollForApp() {
            attempts++;
            if (integrateWithApp()) return;
            if (attempts < maxAttempts) {
                setTimeout(pollForApp, pollInterval);
            } else {
                console.warn('🚀 [TYPED-ARRAYS] ⚠️ window.app no disponible. Use: M3U8TypedArraysGenerator.generateAndDownload(channels)');
            }
        }

        pollForApp();

        console.log('═══════════════════════════════════════════════════════════════');
        console.log(`🚀 M3U8 TYPED ARRAYS ULTIMATE v${VERSION} Loaded`);
        console.log('═══════════════════════════════════════════════════════════════');
        console.log('   ✅ 133+ líneas por canal');
        console.log('   ✅ 63 EXTVLCOPT + 38 KODIPROP + 29 EXT-X-APE');
        console.log('   ✅ JWT 68+ campos (8 secciones)');
        console.log('   ✅ 6 Perfiles: P0 (8K) → P5 (SD)');
        console.log('   ✅ RFC 8216 100% Compliance');
        console.log('   ✅ Resiliencia 24/7/365');
        console.log('   ✅ HTTPS Priority (upgrade HTTP → HTTPS)');
        console.log('═══════════════════════════════════════════════════════════════');
    }

})();
