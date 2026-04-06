/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎚️ APE PROFILES CONFIG v9.0
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Configuración de perfiles P0-P5 con headers organizados por categorías.
 * Este archivo define los valores por defecto para cada perfil.
 * 
 * AUTOR: APE Engine Team - IPTV Navigator PRO
 * VERSIÓN: 13.1.0-SUPREMO
 * FECHA: 2026-01-05
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // CATEGORÍAS DE HEADERS
    // ═══════════════════════════════════════════════════════════════════════
    const STORAGE_KEY = 'ape_profiles_v9';
    const MANIFEST_STORAGE_KEY = 'ape_manifest_v9';

    const HEADER_CATEGORIES = {
        identity: {
            name: "🔐 Identidad",
            description: "User-Agent, Client Hints y fingerprinting",
            headers: [
                "User-Agent", "Accept", "Accept-Encoding", "Accept-Language",
                "Sec-CH-UA", "Sec-CH-UA-Mobile", "Sec-CH-UA-Platform",
                "Sec-CH-UA-Full-Version-List", "Sec-CH-UA-Arch",
                "Sec-CH-UA-Bitness", "Sec-CH-UA-Model"
            ]
        },
        connection: {
            name: "🔗 Conexión & Seguridad",
            description: "Keep-alive, Sec-Fetch y seguridad",
            headers: [
                "Connection", "Keep-Alive", "Sec-Fetch-Dest", "Sec-Fetch-Mode",
                "Sec-Fetch-Site", "Sec-Fetch-User", "DNT", "Sec-GPC",
                "Upgrade-Insecure-Requests", "TE"
            ]
        },
        cache: {
            name: "💾 Cache & Range",
            description: "Control de cache y rangos de bytes",
            headers: [
                "Cache-Control", "Pragma", "Range", "If-None-Match", "If-Modified-Since"
            ]
        },
        cors: {
            name: "🌐 Origen & Referer",
            description: "CORS, Referer y peticiones XHR",
            headers: [
                "Origin", "Referer", "X-Requested-With"
            ]
        },
        ape_core: {
            name: "🎯 APE Engine Core",
            description: "Headers núcleo del motor SUPREMO",
            headers: [
                "X-App-Version", "X-Playback-Session-Id", "X-Device-Id",
                "X-Stream-Type", "X-Quality-Preference"
            ]
        },
        playback: {
            name: "🎬 Playback Avanzado",
            description: "Prioridad, buffers y prefetch",
            headers: [
                "Priority", "X-Playback-Rate", "X-Segment-Duration",
                "X-Min-Buffer-Time", "X-Max-Buffer-Time",
                "X-Request-Priority", "X-Prefetch-Enabled"
            ]
        },
        codecs: {
            name: "🎥 Codecs & DRM",
            description: "Soporte de video/audio y licencias",
            headers: [
                "X-Video-Codecs", "X-Audio-Codecs", "X-DRM-Support"
            ]
        },
        cdn: {
            name: "📡 CDN & Buffer",
            description: "Estrategia de Edge y tamaño de red",
            headers: [
                "X-CDN-Provider", "X-Failover-Enabled", "X-Buffer-Size",
                "X-Buffer-Target", "X-Buffer-Min", "X-Buffer-Max",
                "X-Network-Caching", "X-Live-Caching", "X-File-Caching"
            ]
        },
        metadata: {
            name: "📊 Metadata & Tracking",
            description: "Info del dispositivo y telemetría",
            headers: [
                "X-Client-Timestamp", "X-Request-Id", "X-Device-Type",
                "X-Screen-Resolution", "X-Network-Type"
            ]
        },
        extra: {
            name: "⚡ Extras SUPREMO",
            description: "Headers adicionales de la versión 13.1",
            headers: [
                "Accept-Charset", "X-Buffer-Strategy", "Accept-CH"
            ]
        },
        ott_navigator: {
            name: "📱 OTT Navigator",
            description: "Compatibilidad con OTT Navigator y reproductores Android",
            headers: [
                "X-OTT-Navigator-Version", "X-Player-Type", "X-Hardware-Decode",
                "X-Tunneling-Enabled", "X-Audio-Track-Selection", "X-Subtitle-Track-Selection",
                "X-EPG-Sync", "X-Catchup-Support"
            ]
        },
        streaming_control: {
            name: "🎛️ Control de Streaming",
            description: "Timeouts, reintentos y control avanzado de conexión",
            headers: [
                "X-Bandwidth-Estimation", "X-Initial-Bitrate", "X-Retry-Count",
                "X-Retry-Delay-Ms", "X-Connection-Timeout-Ms", "X-Read-Timeout-Ms"
            ]
        },
        security: {
            name: "🔒 Seguridad & Anti-Block",
            description: "Headers de seguridad y evasión de bloqueos",
            headers: [
                "X-Country-Code"
            ]
        },

        // ═══════════════════════════════════════════════════════════════════
        // CATEGORÍAS DE CALIDAD VISUAL (5 categorías - 27 headers)
        // ═══════════════════════════════════════════════════════════════════
        hdr_color: {
            name: "🎨 HDR & Color",
            description: "Soporte HDR10, Dolby Vision, profundidad de color",
            headers: [
                "X-HDR-Support", "X-Color-Depth", "X-Color-Space",
                "X-Dynamic-Range", "X-HDR-Transfer-Function", "X-Color-Primaries",
                "X-Matrix-Coefficients", "X-Chroma-Subsampling",
                "X-HEVC-Tier", "X-HEVC-Level", "X-HEVC-Profile",
                "X-Video-Profile", "X-Rate-Control", "X-Entropy-Coding",
                "X-Compression-Level", "X-Pixel-Format", "X-Sharpen-Sigma"
            ]
        },
        resolution_advanced: {
            name: "📺 Resolución Avanzada",
            description: "Resolución máxima, bitrate, frame rates",
            headers: [
                "X-Max-Resolution", "X-Max-Bitrate", "X-Frame-Rates",
                "X-Aspect-Ratio", "X-Pixel-Aspect-Ratio"
            ]
        },
        audio_premium: {
            name: "🔊 Audio Premium",
            description: "Dolby Atmos, canales 7.1, audio espacial",
            headers: [
                "X-Dolby-Atmos", "X-Audio-Channels", "X-Audio-Sample-Rate",
                "X-Audio-Bit-Depth", "X-Spatial-Audio", "X-Audio-Passthrough"
            ]
        },
        parallel_download: {
            name: "⚡ Descarga Paralela",
            description: "Segmentos paralelos, prefetch, máximo ancho de banda",
            headers: [
                "X-Parallel-Segments", "X-Prefetch-Segments",
                "X-Segment-Preload", "X-Concurrent-Downloads"
            ]
        },
        anti_freeze: {
            name: "🛡️ Anti-Corte",
            description: "Reconexión automática, failover sin interrupciones",
            headers: [
                "X-Reconnect-On-Error", "X-Max-Reconnect-Attempts",
                "X-Reconnect-Delay-Ms", "X-Buffer-Underrun-Strategy",
                "X-Seamless-Failover"
            ]
        },

        // ═══════════════════════════════════════════════════════════════════
        // CATEGORÍA DE CONTROL ABR AVANZADO (1 categoría - 7 headers)
        // ═══════════════════════════════════════════════════════════════════
        abr_control: {
            name: "🧠 Control ABR Avanzado",
            description: "Estimación de ancho de banda, suavizado EWMA, detección de congestión",
            headers: [
                "X-Bandwidth-Preference", "X-BW-Estimation-Window", "X-BW-Confidence-Threshold",
                "X-BW-Smooth-Factor", "X-Packet-Loss-Monitor", "X-RTT-Monitoring",
                "X-Congestion-Detect"
            ]
        },

        // ═══════════════════════════════════════════════════════════════════
        // CATEGORÍAS OMEGA GOD-TIER (7 categorías - 85 headers)
        // ═══════════════════════════════════════════════════════════════════
        omega_ai_cortex: {
            name: "Cortex AI (L4)",
            description: "IA Super Resolution, Frame Interpolation y Denoising",
            headers: [
                "X-CORTEX-OMEGA-STATE", "X-APE-AI-SR-ENABLED", "X-APE-AI-SR-MODEL",
                "X-APE-AI-SR-SCALE", "X-APE-AI-FRAME-INTERPOLATION", "X-APE-AI-DENOISING",
                "X-APE-AI-DEBLOCKING", "X-APE-AI-SHARPENING", "X-APE-AI-ARTIFACT-REMOVAL",
                "X-APE-AI-COLOR-ENHANCEMENT", "X-APE-AI-HDR-UPCONVERT", "X-APE-AI-SCENE-DETECTION",
                "X-APE-AI-MOTION-ESTIMATION", "X-APE-AI-CONTENT-AWARE-ENCODING", "X-APE-AI-PERCEPTUAL-QUALITY"
            ]
        },
        omega_lcevc: {
            name: "LCEVC Payload",
            description: "Fase 4 LCEVC y Native SDK WebView Tunneling",
            headers: [
                "X-APE-LCEVC-ENABLED", "X-APE-LCEVC-PHASE", "X-APE-LCEVC-COMPUTE-PRECISION",
                "X-APE-LCEVC-UPSCALE-ALGORITHM", "X-APE-LCEVC-ROI-DYNAMIC", "X-APE-LCEVC-TRANSPORT",
                "X-APE-LCEVC-SDK-ENABLED", "X-APE-LCEVC-SDK-TARGET", "X-APE-LCEVC-SDK-WEB-INTEROP",
                "X-APE-LCEVC-SDK-DECODER"
            ]
        },
        omega_hardware: {
            name: "💻 OMEGA: Enclavamiento Hardware",
            description: "Directivas estrictas de secuestro de GPU y decodificador VVC/EVC",
            headers: [
                "X-APE-GPU-DECODE", "X-APE-GPU-RENDER", "X-APE-GPU-PIPELINE",
                "X-APE-GPU-PRECISION", "X-APE-GPU-MEMORY-POOL", "X-APE-GPU-ZERO-COPY",
                "X-APE-VVC-ENABLED", "X-APE-EVC-ENABLED", "X-APE-PLAYER-ENSLAVEMENT-PROTOCOL",
                "X-APE-PLAYER-ENSLAVEMENT-OVERRIDE-CODEC"
            ]
        },
        omega_resilience: {
            name: "🛡️ OMEGA: Resiliencia & Fallbacks",
            description: "Cadenas de supervivencia degradables Anti-Crash",
            headers: [
                "X-APE-RESILIENCE-L1-FORMAT", "X-APE-RESILIENCE-L2-FORMAT", "X-APE-RESILIENCE-L3-FORMAT",
                "X-APE-RESILIENCE-HTTP-ERROR-403", "X-APE-RESILIENCE-HTTP-ERROR-404", "X-APE-RESILIENCE-HTTP-ERROR-429",
                "X-APE-RESILIENCE-HTTP-ERROR-500", "X-APE-AV1-FALLBACK-ENABLED", "X-APE-AV1-FALLBACK-CHAIN",
                "X-APE-ISP-THROTTLE-ESCALATION-POLICY", "X-APE-ANTI-CUT-ENGINE", "X-APE-ANTI-CUT-DETECTION",
                "X-APE-ANTI-CUT-ISP-STRANGLE", "X-APE-RECONNECT-MAX", "X-APE-RECONNECT-SEAMLESS"
            ]
        },
        omega_stealth: {
            name: "👻 OMEGA: Evasión & Stealth",
            description: "Esquiva CDN, rotación IP, y DPI Bypass",
            headers: [
                "X-APE-IDENTITY-MORPH", "X-APE-IDENTITY-ROTATION-INTERVAL", "X-APE-EVASION-MODE",
                "X-APE-EVASION-DNS-OVER-HTTPS", "X-APE-EVASION-SNI-OBFUSCATION", "X-APE-EVASION-TLS-FINGERPRINT-RANDOMIZE",
                "X-APE-EVASION-GEO-PHANTOM", "X-APE-EVASION-DEEP-PACKET-INSPECTION-BYPASS", "X-APE-IP-ROTATION-ENABLED",
                "X-APE-IP-ROTATION-STRATEGY", "X-APE-STEALTH-UA", "X-APE-STEALTH-XFF",
                "X-APE-STEALTH-FINGERPRINT", "X-APE-SWARM-ENABLED", "X-APE-SWARM-PEERS"
            ]
        },
        omega_transport: {
            name: "🏎️ OMEGA: Transporte L7 CMAF",
            description: "Protocolos Ultra Low Latency CMAF y buffers predictivos",
            headers: [
                "X-APE-TRANSPORT-PROTOCOL", "X-APE-TRANSPORT-CHUNK-SIZE", "X-APE-TRANSPORT-FALLBACK-1",
                "X-APE-CACHE-STRATEGY", "X-APE-CACHE-SIZE", "X-APE-CACHE-PREFETCH",
                "X-APE-BUFFER-STRATEGY", "X-APE-BUFFER-PRELOAD-SEGMENTS", "X-APE-BUFFER-DYNAMIC-ADJUSTMENT",
                "X-APE-BUFFER-NEURAL-PREDICTION"
            ]
        },
        omega_qos: {
            name: "🎯 OMEGA: Telchemy QoS / QoE",
            description: "Diagnóstico perceptual TVQM en tiempo real",
            headers: [
                "X-APE-QOS-ENABLED", "X-APE-QOS-DSCP", "X-APE-QOS-PRIORITY",
                "X-APE-POLYMORPHIC-ENABLED", "X-APE-POLYMORPHIC-IDEMPOTENT", "X-TELCHEMY-TVQM",
                "X-TELCHEMY-TR101290", "X-TELCHEMY-IMPAIRMENT-GUARD", "X-TELCHEMY-BUFFER-POLICY",
                "X-TELCHEMY-GOP-POLICY"
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════
    // PERFILES DEFAULT P0-P5
    // ═══════════════════════════════════════════════════════════════════════
    const DEFAULT_PROFILES = {
        P0: {
            id: "P0",
            name: "ULTRA_EXTREME",
            level: 6,
            quality: "ULTRA",
            description: "ULTRA EXTREME - Máxima agresividad para canales críticos (49.8 Mbps)",
            color: "#dc2626",
            settings: {
                resolution: "7680x4320,3840x2160,2560x1440",
                buffer: 50000,
                buffer_min: 5000,
                buffer_max: 100000,
                network_cache: 60000,
                live_cache: 60000,
                file_cache: 15000,
                strategy: "ultra-aggressive,predictive_neural",
                bitrate: 42.9,
                t1: 55.8,
                t2: 68.6,
                playerBuffer: 50000,
                fps: "120,60,50",
                codec: "AV1,VVC,H265,H264,MPEG2",
                headersCount: 235,
                prefetch_segments: 500,
                prefetch_parallel: 250,
                prefetch_buffer_target: 600000,
                prefetch_min_bandwidth: 500000000,
                segment_duration: "1,2,4",
                bandwidth_guarantee: 500,
                reconnect_timeout_ms: "2,5,10",
                reconnect_max_attempts: "200,500,1000",
                reconnect_delay_ms: "0,50,100",
                hevc_tier: 'HIGH,MAIN',
                hevc_level: '6.2,6.1,6.0,5.1',
                hevc_profile: 'MAIN-12,MAIN-10-HDR,MAIN-10',
                color_space: 'BT2020,P3,BT709',
                chroma_subsampling: '4:4:4,4:2:2,4:2:0',
                transfer_function: 'SMPTE2084,HLG,BT1886',
                matrix_coefficients: 'BT2020NC,BT709',
                compression_level: "0,1",
                sharpen_sigma: "0.02,0.06,0.1",
                rate_control: 'VBR,ABR,CBR',
                entropy_coding: 'CABAC,CAVLC',
                video_profile: 'main12,main10,main',
                pixel_format: 'yuv444p12le,yuv420p10le,yuv420p'
            },
            vlcopt: {
                "network-caching": "60000,120000,200000",
                "clock-jitter": "0",
                "clock-synchro": "0",
                "live-caching": "60000,120000,200000",
                "file-caching": "15000,30000",
                "http-user-agent": "Mozilla/5.0 (APE-NAVIGATOR; ULTRA-8K-HEVC-MASTER) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 APE-Engine/13.1-P0"
            },
            kodiprop: {
                "inputstream.adaptive.manifest_type": "hls,dash",
                "inputstream.adaptive.stream_headers": "[ENCODED_HEADERS]"
            },
            enabledCategories: ["identity", "connection", "cache", "cors", "ape_core", "playback", "codecs", "cdn", "metadata", "extra", "ott_navigator", "streaming_control", "security", "hdr_color", "resolution_advanced", "audio_premium", "parallel_download", "anti_freeze", "abr_control", "omega_ai_cortex", "omega_lcevc", "omega_hardware", "omega_resilience", "omega_stealth", "omega_transport", "omega_qos"],
            headerOverrides: {
                "User-Agent": "Mozilla/5.0 (SMART-TV; Linux; Tizen 8.0) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/8.0 TV Safari/537.36,Mozilla/5.0 (Linux; Android 12; SHIELD Android TV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36,Mozilla/5.0 (Linux; Android 12; BRAVIA 4K GB) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                "Accept": "application/vnd.apple.mpegurl,audio/mpegurl,application/x-mpegurl,video/mp4,*/*",
                "Accept-Encoding": "gzip,br,deflate,identity",
                "Accept-Language": "es-CO,es-ES,es,en-US",
                "Sec-CH-UA": "\"Google Chrome\";v=\"125\",\"Chromium\";v=\"125\",\"Android WebView\";v=\"125\",\"Not.A/Brand\";v=\"24\"",
                "Sec-CH-UA-Mobile": "?0,?1,?0,?0",
                "Sec-CH-UA-Platform": "\"Android\",\"Windows\",\"Tizen\",\"Linux\"",
                "Sec-CH-UA-Full-Version-List": "\"Google Chrome\";v=\"125.0.0.0\",\"Chromium\";v=\"125.0.0.0\",\"Android WebView\";v=\"125.0.0.0\",\"Not.A/Brand\";v=\"24.0.0.0\"",
                "Sec-CH-UA-Arch": "arm,x86,x86_64,arm64",
                "Sec-CH-UA-Bitness": "32,64,64,32",
                "Sec-CH-UA-Model": "\"SHIELD Android TV\",\"BRAVIA\",\"AFTN\",\"\"",
                "Connection": "keep-alive,close",
                "Keep-Alive": "timeout=30, max=1000",
                "Sec-Fetch-Dest": "video,empty,document,media",
                "Sec-Fetch-Mode": "no-cors,cors,navigate,same-origin",
                "Sec-Fetch-Site": "same-origin,same-site,none,cross-site",
                "Sec-Fetch-User": "?1,?0",
                "DNT": "1,0",
                "Sec-GPC": "1,0",
                "Upgrade-Insecure-Requests": "1,0",
                "TE": "trailers,chunked,compress,deflate",
                "Cache-Control": "no-cache,max-age=0,no-store,must-revalidate",
                "Pragma": "no-cache,cache,no-cache,cache",
                "Range": "bytes=0-,bytes=1-,bytes=0-1048575,bytes=0-2097151",
                "If-None-Match": "*",
                "If-Modified-Since": "[HTTP_DATE]",
                "Origin": "https://iptv-ape.duckdns.org",
                "Referer": "https://iptv-ape.duckdns.org/",
                "X-Requested-With": "XMLHttpRequest,fetch,media-request,player",
                "X-App-Version": "APE_9.2_SAFE_COMPAT,APE_9.1_STABLE,APE_9.0_COMPAT,APE_DEFAULT",
                "X-Playback-Session-Id": "[CONFIG_SESSION_ID],[GENERATE_UUID],[TIMESTAMP],session-auto",
                "X-Device-Id": "[GENERATE_UUID],[CONFIG_DEVICE_ID],device-auto,device-default",
                "X-Stream-Type": "hls,dash,cmaf,progressive",
                "X-Quality-Preference": "codec-av1,profile-main-10,main,tier-high;codec-hevc,main-10,main,tier-high;codec-vp9,profile-2,profile-0;codec-h264,high,main",
                "Priority": "u=0, i",
                "X-Playback-Rate": "1.0,1.0,1.0,1.0",
                "X-Segment-Duration": "2,4,6,8",
                "X-Min-Buffer-Time": "4,6,8,10",
                "X-Max-Buffer-Time": "20,25,30,40",
                "X-Request-Priority": "low,normal,auto,idle",
                "X-Prefetch-Enabled": "true,adaptive,auto,false",
                "X-Video-Codecs": "av1,hevc,vp9,h264",
                "X-Audio-Codecs": "eac3,ac3,aac,opus,mp3,flac",
                "X-DRM-Support": "widevine,playready,clearkey,none",
                "X-CDN-Provider": "auto,origin,edge,any",
                "X-Failover-Enabled": "true,adaptive,auto,false",
                "X-Buffer-Size": "25000000",
                "X-Buffer-Target": "18750000",
                "X-Buffer-Min": "8750000",
                "X-Buffer-Max": "60000000",
                "X-Network-Caching": "25000000,20000000,15000000,10000000",
                "X-Live-Caching": "18750000,15000000,11250000,7500000",
                "X-File-Caching": "60000000,48000000,36000000,24000000",
                "X-Client-Timestamp": "[TIMESTAMP],[UNIX_MS],[UNIX_S],auto",
                "X-Request-Id": "[GENERATE_UUID],[CONFIG_REQUEST_ID],[TIMESTAMP],request-auto",
                "X-Device-Type": "smart-tv,android-tv,set-top-box,desktop",
                "X-Screen-Resolution": "7680x4320,3840x2160,2560x1440,1920x1080",
                "X-Network-Type": "wifi,ethernet,5g,4g",
                "Accept-Charset": "utf-8,iso-8859-1;q=0.9,utf-16;q=0.2,*;q=0.1",
                "X-Buffer-Strategy": "adaptive,stable,predictive,default",
                "Accept-CH": "DPR,Viewport-Width,Width,Downlink",
                "X-OTT-Navigator-Version": "1.7.0.0-safe,1.7.0.0-stable,1.6.9.0,default",
                "X-Player-Type": "exoplayer,vlc,media3,html5",
                "X-Hardware-Decode": "true,auto,false,default",
                "X-Tunneling-Enabled": "off,auto,false,disabled",
                "X-Audio-Track-Selection": "default,original,auto,first",
                "X-Subtitle-Track-Selection": "off,default,auto,forced",
                "X-EPG-Sync": "enabled,auto,incremental,default",
                "X-Catchup-Support": "flussonic,xc,stalker,none",
                "X-Bandwidth-Estimation": "adaptive,balanced,conservative,aggressive",
                "X-Initial-Bitrate": "80000000,60000000,40000000,20000000",
                "X-Retry-Count": "8,6,4,2",
                "X-Retry-Delay-Ms": "100,250,500,1000",
                "X-Connection-Timeout-Ms": "2500,4000,6000,8000",
                "X-Read-Timeout-Ms": "6000,9000,12000,15000",
                "X-Country-Code": "CO,US,ES,MX",
                "X-HDR-Support": "hdr10plus,hdr10,hlg,sdr",
                "X-Color-Depth": "10bit,12bit,8bit,auto",
                "X-Color-Space": "bt2020,bt709,srgb,bt601",
                "X-Dynamic-Range": "hdr10plus,hdr10,hlg,sdr",
                "X-HDR-Transfer-Function": "smpte-st-2084,arib-std-b67,bt1886,srgb",
                "X-Color-Primaries": "bt2020,bt709,display-p3,bt601",
                "X-Matrix-Coefficients": "bt2020nc,bt709,bt601,identity",
                "X-Chroma-Subsampling": "4:2:0,4:2:2,4:4:4,auto",
                "X-HEVC-Tier": "HIGH,MAIN,AUTO,COMPAT",
                "X-HEVC-Level": "6.1,6.0,5.1,5.0",
                "X-HEVC-Profile": "MAIN-10,MAIN,MAIN-STILL-PICTURE,AUTO",
                "X-Video-Profile": "main-10,main,high,baseline",
                "X-Rate-Control": "VBR,CBR,CRF,AUTO",
                "X-Entropy-Coding": "CABAC,CAVLC,AUTO,DEFAULT",
                "X-Compression-Level": "1,2,3,4",
                "X-Pixel-Format": "yuv420p10le,p010le,yuv420p,nv12",
                "X-Sharpen-Sigma": "0.05,0.03,0.02,0.00",
                "X-Max-Resolution": "7680x4320,3840x2160,2560x1440,1920x1080",
                "X-Max-Bitrate": "120000000,80000000,50000000,30000000",
                "X-Frame-Rates": "60,50,30,24",
                "X-Aspect-Ratio": "16:9,21:9,4:3,auto",
                "X-Pixel-Aspect-Ratio": "1:1,auto,4:3,16:15",
                "X-Dolby-Atmos": "auto,true,false,disabled",
                "X-Audio-Channels": "7.1,5.1,2.0,1.0",
                "X-Audio-Sample-Rate": "48000,96000,44100,32000",
                "X-Audio-Bit-Depth": "24bit,16bit,32bit,float",
                "X-Spatial-Audio": "auto,true,false,disabled",
                "X-Audio-Passthrough": "auto,true,false,disabled",
                "X-Parallel-Segments": "4,3,2,1",
                "X-Prefetch-Segments": "8,6,4,2",
                "X-Segment-Preload": "true,adaptive,auto,false",
                "X-Concurrent-Downloads": "4,3,2,1",
                "X-Reconnect-On-Error": "true,adaptive,immediate,false",
                "X-Max-Reconnect-Attempts": "40,20,10,5",
                "X-Reconnect-Delay-Ms": "100,250,500,1000",
                "X-Buffer-Underrun-Strategy": "aggressive-refill,fast-refill,stable-refill,rebuffer-safe",
                "X-Seamless-Failover": "true,adaptive,auto,false",
                "X-Bandwidth-Preference": "high,unlimited,balanced,auto",
                "X-BW-Estimation-Window": "8,10,12,15",
                "X-BW-Confidence-Threshold": "0.90,0.85,0.80,0.75",
                "X-BW-Smooth-Factor": "0.10,0.15,0.20,0.25",
                "X-Packet-Loss-Monitor": "enabled,adaptive,basic,disabled",
                "X-RTT-Monitoring": "enabled,adaptive,basic,disabled",
                "X-Congestion-Detect": "enabled,adaptive,basic,disabled",
                "X-CORTEX-OMEGA-STATE": "ACTIVE,STABLE,MONITORING,DEFAULT",
                "X-APE-AI-SR-ENABLED": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-AI-SR-MODEL": "REALESRGAN_X2PLUS,LANCZOS,FSRCNNX,BICUBIC",
                "X-APE-AI-SR-SCALE": "1,1.25,1.5,2",
                "X-APE-AI-FRAME-INTERPOLATION": "OFF,AUTO,FRAME_BLEND,MOTION_ADAPTIVE",
                "X-APE-AI-DENOISING": "NLMEANS,LOW,OFF,AUTO",
                "X-APE-AI-DEBLOCKING": "ADAPTIVE,LOW,OFF,AUTO",
                "X-APE-AI-SHARPENING": "ADAPTIVE,LOW,OFF,AUTO",
                "X-APE-AI-ARTIFACT-REMOVAL": "AUTO,ENABLED,LOW,OFF",
                "X-APE-AI-COLOR-ENHANCEMENT": "AUTO,ENABLED,LOW,OFF",
                "X-APE-AI-HDR-UPCONVERT": "AUTO,ENABLED,TONEMAP,OFF",
                "X-APE-AI-SCENE-DETECTION": "AUTO,ENABLED,BASIC,OFF",
                "X-APE-AI-MOTION-ESTIMATION": "AUTO,FRAME_DIFFERENCE,DISABLED,OFF",
                "X-APE-AI-CONTENT-AWARE-ENCODING": "AUTO,ENABLED,BASIC,OFF",
                "X-APE-AI-PERCEPTUAL-QUALITY": "VMAF_96,VMAF_94,SSIM_HIGH,PSNR_HIGH",
                "X-APE-LCEVC-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-LCEVC-PHASE": "1,2,3,4",
                "X-APE-LCEVC-COMPUTE-PRECISION": "AUTO,FP16,FP32,INT8",
                "X-APE-LCEVC-UPSCALE-ALGORITHM": "LANCZOS,BICUBIC,BILINEAR,AUTO",
                "X-APE-LCEVC-ROI-DYNAMIC": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-LCEVC-TRANSPORT": "CMAF_LAYER,FMP4,HLS,DASH",
                "X-APE-LCEVC-SDK-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-LCEVC-SDK-TARGET": "HTML5_NATIVE,ANDROID_NATIVE,TV_NATIVE,AUTO",
                "X-APE-LCEVC-SDK-WEB-INTEROP": "DISABLED,JS_BRIDGE,AUTO,OFF",
                "X-APE-LCEVC-SDK-DECODER": "AUTO,WASM+WEBGL,NATIVE,OFF",
                "X-APE-GPU-DECODE": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-GPU-RENDER": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-GPU-PIPELINE": "DECODE_TONEMAP_RENDER,DECODE_SCALE_RENDER,DECODE_RENDER,AUTO",
                "X-APE-GPU-PRECISION": "AUTO,FP16,FP32,INT8",
                "X-APE-GPU-MEMORY-POOL": "AUTO,VRAM_PREFERRED,SYSTEM_SHARED,DEFAULT",
                "X-APE-GPU-ZERO-COPY": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-VVC-ENABLED": "FALSE,AUTO,DISABLED,OFF",
                "X-APE-EVC-ENABLED": "FALSE,AUTO,DISABLED,OFF",
                "X-APE-PLAYER-ENSLAVEMENT-PROTOCOL": "STANDARD,SAFE,COMPATIBLE,DEFAULT",
                "X-APE-PLAYER-ENSLAVEMENT-OVERRIDE-CODEC": "FALSE,AUTO,TRUE,DEFAULT",
                "X-APE-RESILIENCE-L1-FORMAT": "CMAF,HLS_FMP4,DASH,HLS_TS",
                "X-APE-RESILIENCE-L2-FORMAT": "HLS_FMP4,CMAF,DASH,HLS_TS",
                "X-APE-RESILIENCE-L3-FORMAT": "DASH,HLS_FMP4,CMAF,HLS_TS",
                "X-APE-RESILIENCE-HTTP-ERROR-403": "STOP,REFRESH_MANIFEST,RETRY_BACKOFF,FAIL_SAFE",
                "X-APE-RESILIENCE-HTTP-ERROR-404": "REFRESH_PLAYLIST,RETRY_BACKOFF,ORIGIN_RETRY,STOP",
                "X-APE-RESILIENCE-HTTP-ERROR-429": "BACKOFF,RETRY_AFTER,LOWER_CONCURRENCY,STOP",
                "X-APE-RESILIENCE-HTTP-ERROR-500": "RETRY_BACKOFF,REFRESH_MANIFEST,RECONNECT,STOP",
                "X-APE-AV1-FALLBACK-ENABLED": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-AV1-FALLBACK-CHAIN": "AV1>HEVC>VP9>H264",
                "X-APE-ISP-THROTTLE-ESCALATION-POLICY": "ADAPTIVE_BACKOFF,REDUCE_BITRATE,EXTEND_BUFFER,DEFAULT",
                "X-APE-ANTI-CUT-ENGINE": "LOCAL_BUFFER_PROTECTION,SEAMLESS_RETRY,DISABLED,OFF",
                "X-APE-ANTI-CUT-DETECTION": "STALL_REBUFFER,SEGMENT_TIMEOUT,PLAYLIST_DRIFT,DISABLED",
                "X-APE-ANTI-CUT-ISP-STRANGLE": "NUCLEAR,AGGRESSIVE,MODERATE,PASSIVE",
                "X-APE-RECONNECT-MAX": "40,20,10,5",
                "X-APE-RECONNECT-SEAMLESS": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-IDENTITY-MORPH": "DISABLED,OFF,NONE,STATIC",
                "X-APE-IDENTITY-ROTATION-INTERVAL": "0,0,0,0",
                "X-APE-EVASION-MODE": "DISABLED,OFF,NONE,STANDARD",
                "X-APE-EVASION-DNS-OVER-HTTPS": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-SNI-OBFUSCATION": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-TLS-FINGERPRINT-RANDOMIZE": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-EVASION-GEO-PHANTOM": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-DEEP-PACKET-INSPECTION-BYPASS": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-IP-ROTATION-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-IP-ROTATION-STRATEGY": "NONE,DISABLED,OFF,DEFAULT",
                "X-APE-STEALTH-UA": "STATIC,COMPATIBLE,AUTO,DEFAULT",
                "X-APE-STEALTH-XFF": "OFF,DISABLED,STATIC,DEFAULT",
                "X-APE-STEALTH-FINGERPRINT": "STATIC,COMPATIBLE,AUTO,DEFAULT",
                "X-APE-SWARM-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-SWARM-PEERS": "0,0,0,0",
                "X-APE-TRANSPORT-PROTOCOL": "CMAF,HLS_FMP4,DASH,HLS_TS",
                "X-APE-TRANSPORT-CHUNK-SIZE": "500MS,1S,2S,4S",
                "X-APE-TRANSPORT-FALLBACK-1": "HLS_FMP4,CMAF,DASH,HLS_TS",
                "X-APE-CACHE-STRATEGY": "ADAPTIVE,SEGMENT_AWARE,PREDICTIVE,DEFAULT",
                "X-APE-CACHE-SIZE": "256MB,512MB,128MB,64MB",
                "X-APE-CACHE-PREFETCH": "ENABLED,AUTO,DISABLED,OFF",
                "X-APE-BUFFER-STRATEGY": "ADAPTIVE,STABLE,PREDICTIVE,DEFAULT",
                "X-APE-BUFFER-PRELOAD-SEGMENTS": "8,6,4,2",
                "X-APE-BUFFER-DYNAMIC-ADJUSTMENT": "ENABLED,AUTO,DISABLED,OFF",
                "X-APE-BUFFER-NEURAL-PREDICTION": "DISABLED,OFF,AUTO,FALSE",
                "X-APE-QOS-ENABLED": "AUTO,TRUE,FALSE,DISABLED",
                "X-APE-QOS-DSCP": "CS0,BE,AF21,AF31",
                "X-APE-QOS-PRIORITY": "0,1,2,3",
                "X-APE-POLYMORPHIC-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-POLYMORPHIC-IDEMPOTENT": "TRUE,AUTO,FALSE,DISABLED",
                "X-TELCHEMY-TVQM": "ENABLED,INTERVAL=1000,METRICS=VMAF:PSNR:SSIM,INTERVAL=2000,METRICS=SSIM:PSNR,AUTO,DISABLED",
                "X-TELCHEMY-TR101290": "ENABLED,PRIORITY_1=ALERT,PRIORITY_2=WARN,AUTO,DISABLED",
                "X-TELCHEMY-IMPAIRMENT-GUARD": "ENABLED,BLOCKINESS=DETECT,BLUR=DETECT,AUTO,DISABLED",
                "X-TELCHEMY-BUFFER-POLICY": "ADAPTIVE,MIN=25000000,STABLE,MIN=20000000,AUTO,DEFAULT",
                "X-TELCHEMY-GOP-POLICY": "DETECT,IDEAL=2000,TOLERANCE=500,DETECT,IDEAL=1000,TOLERANCE=250,AUTO,DISABLED",
                "X-APE-CODEC": "AV1,HEVC,VP9,H264",
                "X-APE-RESOLUTION": "7680x4320,3840x2160,2560x1440,1920x1080",
                "X-APE-FPS": "60,50,30,24",
                "X-APE-BITRATE": "80,60,40,26.4",
                "X-APE-TARGET-BITRATE": "80000,60000,40000,26400",
                "X-APE-THROUGHPUT-T1": "80,64,48,36",
                "X-APE-THROUGHPUT-T2": "100,80,60,45",
                "X-ExoPlayer-Buffer-Min": "60000000,48000000,36000000,24000000",
                "X-Manifest-Refresh": "60000,45000,30000,19800",
                "X-KODI-LIVE-DELAY": "20,15,10,1",
                "X-APE-STRATEGY": "adaptive-predictive,predictive,adaptive,stable",
                "X-APE-Prefetch-Segments": "8,6,4,2",
                "X-APE-Quality-Threshold": "0.95,0.92,0.90,0.88",
                "X-Tone-Mapping": "auto,hable,reinhard,off",
                "X-HDR-Output-Mode": "hdr,auto,tonemap,sdr",
                "X-Codec-Support": "av1,hevc,vp9,h264"
            }
        },

        P1: {
            id: "P1",
            name: "8K_SUPREME",
            level: 5,
            quality: "8K",
            description: "8K SUPREME - Flujo de ultra alta definición (159.3 Mbps)",
            color: "#ea580c",
            settings: {
                resolution: "3840x2160,2560x1440,1920x1080",
                buffer: 40000,
                buffer_min: 4000,
                buffer_max: 80000,
                network_cache: 50000,
                live_cache: 50000,
                file_cache: 12000,
                strategy: "ultra-aggressive,predictive_neural",
                bitrate: 42.9,
                t1: 55.8,
                t2: 68.6,
                playerBuffer: 40000,
                fps: "120,60,50",
                codec: "AV1,VVC,H265,H264",
                headersCount: 185,
                prefetch_segments: 400,
                prefetch_parallel: 200,
                prefetch_buffer_target: 500000,
                prefetch_min_bandwidth: 400000000,
                segment_duration: "2,4,6",
                bandwidth_guarantee: 400,
                reconnect_timeout_ms: "5,10,15",
                reconnect_max_attempts: "200,400,800",
                reconnect_delay_ms: "0,100,200",
                hevc_tier: 'HIGH,MAIN',
                hevc_level: '6.1,6.0,5.1,5.0',
                hevc_profile: 'MAIN-10-HDR,MAIN-10,MAIN',
                color_space: 'BT2020,P3,BT709',
                chroma_subsampling: '4:2:2,4:2:0',
                transfer_function: 'SMPTE2084,HLG,BT1886',
                matrix_coefficients: 'BT2020NC,BT709',
                compression_level: "1,2",
                sharpen_sigma: "0.03,0.06",
                rate_control: 'VBR,ABR,CBR',
                entropy_coding: 'CABAC,CAVLC',
                video_profile: 'main10,main',
                pixel_format: 'yuv420p10le,yuv420p'
            },
            vlcopt: {
                "network-caching": "50000,100000",
                "clock-jitter": "0",
                "clock-synchro": "0",
                "live-caching": "50000,100000",
                "file-caching": "12000,24000",
                "http-user-agent": "Mozilla/5.0 (APE-NAVIGATOR; ULTRA-8K-HEVC-MASTER) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 APE-Engine/13.1-P1"
            },
            kodiprop: {
                "inputstream.adaptive.manifest_type": "hls,dash",
                "inputstream.adaptive.stream_headers": "[ENCODED_HEADERS]"
            },
            enabledCategories: ["identity", "connection", "cache", "cors", "ape_core", "playback", "codecs", "cdn", "metadata", "extra", "ott_navigator", "streaming_control", "security", "hdr_color", "resolution_advanced", "audio_premium", "parallel_download", "anti_freeze", "abr_control", "omega_ai_cortex", "omega_lcevc", "omega_hardware", "omega_resilience", "omega_stealth", "omega_transport", "omega_qos"],
            headerOverrides: {
                "User-Agent": "Mozilla/5.0 (SMART-TV; Linux; Tizen 7.0) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/7.0 TV Safari/537.36,Mozilla/5.0 (Linux; Android 12; SHIELD Android TV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36,Mozilla/5.0 (Linux; Android 11; BRAVIA 4K VH2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                "Accept": "application/vnd.apple.mpegurl,audio/mpegurl,application/x-mpegurl,video/mp4,*/*",
                "Accept-Encoding": "gzip,br,deflate,identity",
                "Accept-Language": "es-CO,es-ES,es,en-US",
                "Sec-CH-UA": "\"Google Chrome\";v=\"125\",\"Chromium\";v=\"125\",\"Android WebView\";v=\"125\",\"Not.A/Brand\";v=\"24\"",
                "Sec-CH-UA-Mobile": "?0,?1,?0,?0",
                "Sec-CH-UA-Platform": "\"Android\",\"Windows\",\"Tizen\",\"Linux\"",
                "Sec-CH-UA-Full-Version-List": "\"Google Chrome\";v=\"125.0.0.0\",\"Chromium\";v=\"125.0.0.0\",\"Android WebView\";v=\"125.0.0.0\",\"Not.A/Brand\";v=\"24.0.0.0\"",
                "Sec-CH-UA-Arch": "arm,x86,x86_64,arm64",
                "Sec-CH-UA-Bitness": "32,64,64,32",
                "Sec-CH-UA-Model": "\"SHIELD Android TV\",\"BRAVIA\",\"AFTN\",\"\"",
                "Connection": "keep-alive,close",
                "Keep-Alive": "timeout=30, max=1000",
                "Sec-Fetch-Dest": "video,empty,document,media",
                "Sec-Fetch-Mode": "no-cors,cors,navigate,same-origin",
                "Sec-Fetch-Site": "same-origin,same-site,none,cross-site",
                "Sec-Fetch-User": "?1,?0",
                "DNT": "1,0",
                "Sec-GPC": "1,0",
                "Upgrade-Insecure-Requests": "1,0",
                "TE": "trailers,chunked,compress,deflate",
                "Cache-Control": "no-cache,max-age=0,no-store,must-revalidate",
                "Pragma": "no-cache,cache,no-cache,cache",
                "Range": "bytes=0-,bytes=1-,bytes=0-1048575,bytes=0-2097151",
                "If-None-Match": "*",
                "If-Modified-Since": "[HTTP_DATE]",
                "Origin": "https://iptv-ape.duckdns.org",
                "Referer": "https://iptv-ape.duckdns.org/",
                "X-Requested-With": "XMLHttpRequest,fetch,media-request,player",
                "X-App-Version": "APE_9.2_SAFE_COMPAT,APE_9.1_STABLE,APE_9.0_COMPAT,APE_DEFAULT",
                "X-Playback-Session-Id": "[CONFIG_SESSION_ID],[GENERATE_UUID],[TIMESTAMP],session-auto",
                "X-Device-Id": "[GENERATE_UUID],[CONFIG_DEVICE_ID],device-auto,device-default",
                "X-Stream-Type": "hls,dash,cmaf,progressive",
                "X-Quality-Preference": "codec-hevc,main-10,main,tier-high;codec-av1,main-10,main;codec-vp9,profile-2,profile-0;codec-h264,high,main",
                "Priority": "u=0, i",
                "X-Playback-Rate": "1.0,1.0,1.0,1.0",
                "X-Segment-Duration": "2,4,6,8",
                "X-Min-Buffer-Time": "4,6,8,10",
                "X-Max-Buffer-Time": "20,25,30,40",
                "X-Request-Priority": "low,normal,auto,idle",
                "X-Prefetch-Enabled": "true,adaptive,auto,false",
                "X-Video-Codecs": "hevc,av1,vp9,h264",
                "X-Audio-Codecs": "eac3,ac3,aac,opus,mp3,flac",
                "X-DRM-Support": "widevine,playready,clearkey,none",
                "X-CDN-Provider": "auto,origin,edge,any",
                "X-Failover-Enabled": "true,adaptive,auto,false",
                "X-Buffer-Size": "20000000",
                "X-Buffer-Target": "15000000",
                "X-Buffer-Min": "7000000",
                "X-Buffer-Max": "50000000",
                "X-Network-Caching": "20000000,16000000,12000000,8000000",
                "X-Live-Caching": "15000000,12000000,9000000,6000000",
                "X-File-Caching": "50000000,40000000,30000000,20000000",
                "X-Client-Timestamp": "[TIMESTAMP],[UNIX_MS],[UNIX_S],auto",
                "X-Request-Id": "[GENERATE_UUID],[CONFIG_REQUEST_ID],[TIMESTAMP],request-auto",
                "X-Device-Type": "smart-tv,android-tv,set-top-box,desktop",
                "X-Screen-Resolution": "3840x2160,2560x1440,1920x1080,1280x720",
                "X-Network-Type": "wifi,ethernet,5g,4g",
                "Accept-Charset": "utf-8,iso-8859-1;q=0.9,utf-16;q=0.2,*;q=0.1",
                "X-Buffer-Strategy": "adaptive,stable,predictive,default",
                "Accept-CH": "DPR,Viewport-Width,Width,Downlink",
                "X-OTT-Navigator-Version": "1.7.0.0-safe,1.7.0.0-stable,1.6.9.0,default",
                "X-Player-Type": "exoplayer,vlc,media3,html5",
                "X-Hardware-Decode": "true,auto,false,default",
                "X-Tunneling-Enabled": "off,auto,false,disabled",
                "X-Audio-Track-Selection": "default,original,auto,first",
                "X-Subtitle-Track-Selection": "off,default,auto,forced",
                "X-EPG-Sync": "enabled,auto,incremental,default",
                "X-Catchup-Support": "flussonic,xc,stalker,none",
                "X-Bandwidth-Estimation": "adaptive,balanced,conservative,aggressive",
                "X-Initial-Bitrate": "30000000,22500000,15000000,7500000",
                "X-Retry-Count": "8,6,4,2",
                "X-Retry-Delay-Ms": "100,250,500,1000",
                "X-Connection-Timeout-Ms": "2500,4000,6000,8000",
                "X-Read-Timeout-Ms": "6000,9000,12000,15000",
                "X-Country-Code": "CO,US,ES,MX",
                "X-HDR-Support": "hdr10,hlg,sdr,dolby-vision",
                "X-Color-Depth": "10bit,8bit,12bit,auto",
                "X-Color-Space": "bt2020,bt709,srgb,bt601",
                "X-Dynamic-Range": "hdr10,hlg,sdr,dolby-vision",
                "X-HDR-Transfer-Function": "smpte-st-2084,arib-std-b67,bt1886,srgb",
                "X-Color-Primaries": "bt2020,bt709,display-p3,bt601",
                "X-Matrix-Coefficients": "bt2020nc,bt709,bt601,identity",
                "X-Chroma-Subsampling": "4:2:0,4:2:2,4:4:4,auto",
                "X-HEVC-Tier": "HIGH,MAIN,AUTO,COMPAT",
                "X-HEVC-Level": "5.1,5.0,4.1,4.0",
                "X-HEVC-Profile": "MAIN-10,MAIN,MAIN-STILL-PICTURE,AUTO",
                "X-Video-Profile": "main-10,main,high,baseline",
                "X-Rate-Control": "VBR,CBR,CRF,AUTO",
                "X-Entropy-Coding": "CABAC,CAVLC,AUTO,DEFAULT",
                "X-Compression-Level": "1,2,3,4",
                "X-Pixel-Format": "yuv420p10le,p010le,yuv420p,nv12",
                "X-Sharpen-Sigma": "0.04,0.03,0.02,0.00",
                "X-Max-Resolution": "3840x2160,2560x1440,1920x1080,1280x720",
                "X-Max-Bitrate": "45000000,30000000,20000000,12000000",
                "X-Frame-Rates": "60,50,30,24",
                "X-Aspect-Ratio": "16:9,21:9,4:3,auto",
                "X-Pixel-Aspect-Ratio": "1:1,auto,4:3,16:15",
                "X-Dolby-Atmos": "auto,true,false,disabled",
                "X-Audio-Channels": "7.1,5.1,2.0,1.0",
                "X-Audio-Sample-Rate": "48000,96000,44100,32000",
                "X-Audio-Bit-Depth": "24bit,16bit,32bit,float",
                "X-Spatial-Audio": "auto,true,false,disabled",
                "X-Audio-Passthrough": "auto,true,false,disabled",
                "X-Parallel-Segments": "4,3,2,1",
                "X-Prefetch-Segments": "8,6,4,2",
                "X-Segment-Preload": "true,adaptive,auto,false",
                "X-Concurrent-Downloads": "4,3,2,1",
                "X-Reconnect-On-Error": "true,adaptive,immediate,false",
                "X-Max-Reconnect-Attempts": "40,20,10,5",
                "X-Reconnect-Delay-Ms": "100,250,500,1000",
                "X-Buffer-Underrun-Strategy": "aggressive-refill,fast-refill,stable-refill,rebuffer-safe",
                "X-Seamless-Failover": "true,adaptive,auto,false",
                "X-Bandwidth-Preference": "high,unlimited,balanced,auto",
                "X-BW-Estimation-Window": "8,10,12,15",
                "X-BW-Confidence-Threshold": "0.90,0.85,0.80,0.75",
                "X-BW-Smooth-Factor": "0.10,0.15,0.20,0.25",
                "X-Packet-Loss-Monitor": "enabled,adaptive,basic,disabled",
                "X-RTT-Monitoring": "enabled,adaptive,basic,disabled",
                "X-Congestion-Detect": "enabled,adaptive,basic,disabled",
                "X-CORTEX-OMEGA-STATE": "ACTIVE,STABLE,MONITORING,DEFAULT",
                "X-APE-AI-SR-ENABLED": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-AI-SR-MODEL": "REALESRGAN_X2PLUS,LANCZOS,FSRCNNX,BICUBIC",
                "X-APE-AI-SR-SCALE": "1,1.25,1.5,2",
                "X-APE-AI-FRAME-INTERPOLATION": "OFF,AUTO,FRAME_BLEND,MOTION_ADAPTIVE",
                "X-APE-AI-DENOISING": "NLMEANS,LOW,OFF,AUTO",
                "X-APE-AI-DEBLOCKING": "ADAPTIVE,LOW,OFF,AUTO",
                "X-APE-AI-SHARPENING": "ADAPTIVE,LOW,OFF,AUTO",
                "X-APE-AI-ARTIFACT-REMOVAL": "AUTO,ENABLED,LOW,OFF",
                "X-APE-AI-COLOR-ENHANCEMENT": "AUTO,ENABLED,LOW,OFF",
                "X-APE-AI-HDR-UPCONVERT": "AUTO,ENABLED,TONEMAP,OFF",
                "X-APE-AI-SCENE-DETECTION": "AUTO,ENABLED,BASIC,OFF",
                "X-APE-AI-MOTION-ESTIMATION": "AUTO,FRAME_DIFFERENCE,DISABLED,OFF",
                "X-APE-AI-CONTENT-AWARE-ENCODING": "AUTO,ENABLED,BASIC,OFF",
                "X-APE-AI-PERCEPTUAL-QUALITY": "VMAF_96,VMAF_94,SSIM_HIGH,PSNR_HIGH",
                "X-APE-LCEVC-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-LCEVC-PHASE": "1,2,3,4",
                "X-APE-LCEVC-COMPUTE-PRECISION": "AUTO,FP16,FP32,INT8",
                "X-APE-LCEVC-UPSCALE-ALGORITHM": "LANCZOS,BICUBIC,BILINEAR,AUTO",
                "X-APE-LCEVC-ROI-DYNAMIC": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-LCEVC-TRANSPORT": "CMAF_LAYER,FMP4,HLS,DASH",
                "X-APE-LCEVC-SDK-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-LCEVC-SDK-TARGET": "HTML5_NATIVE,ANDROID_NATIVE,TV_NATIVE,AUTO",
                "X-APE-LCEVC-SDK-WEB-INTEROP": "DISABLED,JS_BRIDGE,AUTO,OFF",
                "X-APE-LCEVC-SDK-DECODER": "AUTO,WASM+WEBGL,NATIVE,OFF",
                "X-APE-GPU-DECODE": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-GPU-RENDER": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-GPU-PIPELINE": "DECODE_TONEMAP_RENDER,DECODE_SCALE_RENDER,DECODE_RENDER,AUTO",
                "X-APE-GPU-PRECISION": "AUTO,FP16,FP32,INT8",
                "X-APE-GPU-MEMORY-POOL": "AUTO,VRAM_PREFERRED,SYSTEM_SHARED,DEFAULT",
                "X-APE-GPU-ZERO-COPY": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-VVC-ENABLED": "FALSE,AUTO,DISABLED,OFF",
                "X-APE-EVC-ENABLED": "FALSE,AUTO,DISABLED,OFF",
                "X-APE-PLAYER-ENSLAVEMENT-PROTOCOL": "STANDARD,SAFE,COMPATIBLE,DEFAULT",
                "X-APE-PLAYER-ENSLAVEMENT-OVERRIDE-CODEC": "FALSE,AUTO,TRUE,DEFAULT",
                "X-APE-RESILIENCE-L1-FORMAT": "CMAF,HLS_FMP4,DASH,HLS_TS",
                "X-APE-RESILIENCE-L2-FORMAT": "HLS_FMP4,CMAF,DASH,HLS_TS",
                "X-APE-RESILIENCE-L3-FORMAT": "DASH,HLS_FMP4,CMAF,HLS_TS",
                "X-APE-RESILIENCE-HTTP-ERROR-403": "STOP,REFRESH_MANIFEST,RETRY_BACKOFF,FAIL_SAFE",
                "X-APE-RESILIENCE-HTTP-ERROR-404": "REFRESH_PLAYLIST,RETRY_BACKOFF,ORIGIN_RETRY,STOP",
                "X-APE-RESILIENCE-HTTP-ERROR-429": "BACKOFF,RETRY_AFTER,LOWER_CONCURRENCY,STOP",
                "X-APE-RESILIENCE-HTTP-ERROR-500": "RETRY_BACKOFF,REFRESH_MANIFEST,RECONNECT,STOP",
                "X-APE-AV1-FALLBACK-ENABLED": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-AV1-FALLBACK-CHAIN": "HEVC>AV1>VP9>H264",
                "X-APE-ISP-THROTTLE-ESCALATION-POLICY": "ADAPTIVE_BACKOFF,REDUCE_BITRATE,EXTEND_BUFFER,DEFAULT",
                "X-APE-ANTI-CUT-ENGINE": "LOCAL_BUFFER_PROTECTION,SEAMLESS_RETRY,DISABLED,OFF",
                "X-APE-ANTI-CUT-DETECTION": "STALL_REBUFFER,SEGMENT_TIMEOUT,PLAYLIST_DRIFT,DISABLED",
                "X-APE-ANTI-CUT-ISP-STRANGLE": "NUCLEAR,AGGRESSIVE,MODERATE,PASSIVE",
                "X-APE-RECONNECT-MAX": "40,20,10,5",
                "X-APE-RECONNECT-SEAMLESS": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-IDENTITY-MORPH": "DISABLED,OFF,NONE,STATIC",
                "X-APE-IDENTITY-ROTATION-INTERVAL": "0,0,0,0",
                "X-APE-EVASION-MODE": "DISABLED,OFF,NONE,STANDARD",
                "X-APE-EVASION-DNS-OVER-HTTPS": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-SNI-OBFUSCATION": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-TLS-FINGERPRINT-RANDOMIZE": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-EVASION-GEO-PHANTOM": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-DEEP-PACKET-INSPECTION-BYPASS": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-IP-ROTATION-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-IP-ROTATION-STRATEGY": "NONE,DISABLED,OFF,DEFAULT",
                "X-APE-STEALTH-UA": "STATIC,COMPATIBLE,AUTO,DEFAULT",
                "X-APE-STEALTH-XFF": "OFF,DISABLED,STATIC,DEFAULT",
                "X-APE-STEALTH-FINGERPRINT": "STATIC,COMPATIBLE,AUTO,DEFAULT",
                "X-APE-SWARM-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-SWARM-PEERS": "0,0,0,0",
                "X-APE-TRANSPORT-PROTOCOL": "CMAF,HLS_FMP4,DASH,HLS_TS",
                "X-APE-TRANSPORT-CHUNK-SIZE": "500MS,1S,2S,4S",
                "X-APE-TRANSPORT-FALLBACK-1": "HLS_FMP4,CMAF,DASH,HLS_TS",
                "X-APE-CACHE-STRATEGY": "ADAPTIVE,SEGMENT_AWARE,PREDICTIVE,DEFAULT",
                "X-APE-CACHE-SIZE": "256MB,512MB,128MB,64MB",
                "X-APE-CACHE-PREFETCH": "ENABLED,AUTO,DISABLED,OFF",
                "X-APE-BUFFER-STRATEGY": "ADAPTIVE,STABLE,PREDICTIVE,DEFAULT",
                "X-APE-BUFFER-PRELOAD-SEGMENTS": "8,6,4,2",
                "X-APE-BUFFER-DYNAMIC-ADJUSTMENT": "ENABLED,AUTO,DISABLED,OFF",
                "X-APE-BUFFER-NEURAL-PREDICTION": "DISABLED,OFF,AUTO,FALSE",
                "X-APE-QOS-ENABLED": "AUTO,TRUE,FALSE,DISABLED",
                "X-APE-QOS-DSCP": "CS0,BE,AF21,AF31",
                "X-APE-QOS-PRIORITY": "0,1,2,3",
                "X-APE-POLYMORPHIC-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-POLYMORPHIC-IDEMPOTENT": "TRUE,AUTO,FALSE,DISABLED",
                "X-TELCHEMY-TVQM": "ENABLED,INTERVAL=1000,METRICS=VMAF:PSNR:SSIM,INTERVAL=2000,METRICS=SSIM:PSNR,AUTO,DISABLED",
                "X-TELCHEMY-TR101290": "ENABLED,PRIORITY_1=ALERT,PRIORITY_2=WARN,AUTO,DISABLED",
                "X-TELCHEMY-IMPAIRMENT-GUARD": "ENABLED,BLOCKINESS=DETECT,BLUR=DETECT,AUTO,DISABLED",
                "X-TELCHEMY-BUFFER-POLICY": "ADAPTIVE,MIN=20000000,STABLE,MIN=16000000,AUTO,DEFAULT",
                "X-TELCHEMY-GOP-POLICY": "DETECT,IDEAL=2000,TOLERANCE=500,DETECT,IDEAL=1000,TOLERANCE=250,AUTO,DISABLED",
                "X-APE-CODEC": "HEVC,AV1,VP9,H264",
                "X-APE-RESOLUTION": "3840x2160,2560x1440,1920x1080,1280x720",
                "X-APE-FPS": "60,50,30,24",
                "X-APE-BITRATE": "30,22.5,15,9.9",
                "X-APE-TARGET-BITRATE": "30000,22500,15000,9900",
                "X-APE-THROUGHPUT-T1": "30,24,18,13.5",
                "X-APE-THROUGHPUT-T2": "45,36,27,20.25",
                "X-ExoPlayer-Buffer-Min": "50000000,40000000,30000000,20000000",
                "X-Manifest-Refresh": "50000,37500,25000,16500",
                "X-KODI-LIVE-DELAY": "16,12,8,1",
                "X-APE-STRATEGY": "adaptive-stable,adaptive,stable,balanced",
                "X-APE-Prefetch-Segments": "8,6,4,2",
                "X-APE-Quality-Threshold": "0.95,0.92,0.90,0.88",
                "X-Tone-Mapping": "auto,hable,reinhard,off",
                "X-HDR-Output-Mode": "hdr,auto,tonemap,sdr",
                "X-Codec-Support": "hevc,av1,vp9,h264"
            }
        },

        P2: {
            id: "P2",
            name: "4K_EXTREME",
            level: 4,
            quality: "4K",
            description: "4K EXTREME - Optimizado para contenido 2160p (49.8 Mbps)",
            color: "#ca8a04",
            settings: {
                resolution: "3840x2160,1920x1080",
                buffer: 35000,
                buffer_min: 3500,
                buffer_max: 70000,
                network_cache: 45000,
                live_cache: 45000,
                file_cache: 10000,
                strategy: "ultra-aggressive,adaptive",
                bitrate: 13.4,
                t1: 17.4,
                t2: 21.4,
                playerBuffer: 35000,
                fps: "60,50,30",
                codec: "AV1,H265,H264",
                headersCount: 158,
                prefetch_segments: 350,
                prefetch_parallel: 180,
                prefetch_buffer_target: 450000,
                prefetch_min_bandwidth: 350000000,
                segment_duration: "2,4,6",
                bandwidth_guarantee: 350,
                reconnect_timeout_ms: "5,10,15",
                reconnect_max_attempts: "200,300,500",
                reconnect_delay_ms: "0,100,250",
                hevc_tier: 'HIGH,MAIN',
                hevc_level: '6.1,5.1,5.0,4.1',
                hevc_profile: 'MAIN-10-HDR,MAIN-10,MAIN',
                color_space: 'BT2020,P3,BT709',
                chroma_subsampling: '4:2:0',
                transfer_function: 'SMPTE2084,HLG,BT1886',
                matrix_coefficients: 'BT2020NC,BT709',
                compression_level: "1,2",
                sharpen_sigma: "0.03,0.06",
                rate_control: 'VBR,ABR,CBR',
                entropy_coding: 'CABAC,CAVLC',
                video_profile: 'main10,main',
                pixel_format: 'yuv420p10le,yuv420p'
            },
            vlcopt: {
                "network-caching": "45000,90000",
                "clock-jitter": "0",
                "clock-synchro": "0",
                "live-caching": "45000,90000",
                "file-caching": "10000,20000",
                "http-user-agent": "Mozilla/5.0 (APE-NAVIGATOR; ULTRA-8K-HEVC-MASTER) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 APE-Engine/13.1-P2"
            },
            kodiprop: {
                "inputstream.adaptive.manifest_type": "hls,dash",
                "inputstream.adaptive.stream_headers": "[ENCODED_HEADERS]"
            },
            enabledCategories: ["identity", "connection", "cache", "cors", "ape_core", "playback", "codecs", "cdn", "metadata", "extra", "ott_navigator", "streaming_control", "security", "hdr_color", "resolution_advanced", "audio_premium", "parallel_download", "anti_freeze", "abr_control", "omega_ai_cortex", "omega_lcevc", "omega_hardware", "omega_resilience", "omega_stealth", "omega_transport", "omega_qos"],
            headerOverrides: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 12; SHIELD Android TV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36,Mozilla/5.0 (SMART-TV; Linux; Tizen 8.0) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/8.0 TV Safari/537.36,Mozilla/5.0 (Linux; Android 11; BRAVIA 4K GB) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                "Accept": "application/vnd.apple.mpegurl,audio/mpegurl,application/x-mpegurl,video/mp4,*/*",
                "Accept-Encoding": "gzip,br,deflate,identity",
                "Accept-Language": "es-CO,es-ES,es,en-US",
                "Sec-CH-UA": "\"Google Chrome\";v=\"125\",\"Chromium\";v=\"125\",\"Android WebView\";v=\"125\",\"Not.A/Brand\";v=\"24\"",
                "Sec-CH-UA-Mobile": "?0,?1,?0,?0",
                "Sec-CH-UA-Platform": "\"Android\",\"Windows\",\"Tizen\",\"Linux\"",
                "Sec-CH-UA-Full-Version-List": "\"Google Chrome\";v=\"125.0.0.0\",\"Chromium\";v=\"125.0.0.0\",\"Android WebView\";v=\"125.0.0.0\",\"Not.A/Brand\";v=\"24.0.0.0\"",
                "Sec-CH-UA-Arch": "arm,x86,x86_64,arm64",
                "Sec-CH-UA-Bitness": "32,64,64,32",
                "Sec-CH-UA-Model": "\"SHIELD Android TV\",\"BRAVIA\",\"AFTN\",\"\"",
                "Connection": "keep-alive,close",
                "Keep-Alive": "timeout=30, max=1000",
                "Sec-Fetch-Dest": "video,empty,document,media",
                "Sec-Fetch-Mode": "no-cors,cors,navigate,same-origin",
                "Sec-Fetch-Site": "same-origin,same-site,none,cross-site",
                "Sec-Fetch-User": "?1,?0",
                "DNT": "1,0",
                "Sec-GPC": "1,0",
                "Upgrade-Insecure-Requests": "1,0",
                "TE": "trailers,chunked,compress,deflate",
                "Cache-Control": "no-cache,max-age=0,no-store,must-revalidate",
                "Pragma": "no-cache,cache,no-cache,cache",
                "Range": "bytes=0-,bytes=1-,bytes=0-1048575,bytes=0-2097151",
                "If-None-Match": "*",
                "If-Modified-Since": "[HTTP_DATE]",
                "Origin": "https://iptv-ape.duckdns.org",
                "Referer": "https://iptv-ape.duckdns.org/",
                "X-Requested-With": "XMLHttpRequest,fetch,media-request,player",
                "X-App-Version": "APE_9.2_SAFE_COMPAT,APE_9.1_STABLE,APE_9.0_COMPAT,APE_DEFAULT",
                "X-Playback-Session-Id": "[CONFIG_SESSION_ID],[GENERATE_UUID],[TIMESTAMP],session-auto",
                "X-Device-Id": "[GENERATE_UUID],[CONFIG_DEVICE_ID],device-auto,device-default",
                "X-Stream-Type": "hls,dash,cmaf,progressive",
                "X-Quality-Preference": "codec-hevc,main-10,main;codec-h264,high,main;codec-av1,main,main-10;codec-vp9,profile-0,profile-2",
                "Priority": "u=0, i",
                "X-Playback-Rate": "1.0,1.0,1.0,1.0",
                "X-Segment-Duration": "2,4,6,10",
                "X-Min-Buffer-Time": "4,6,8,12",
                "X-Max-Buffer-Time": "15,20,25,30",
                "X-Request-Priority": "normal,low,auto,idle",
                "X-Prefetch-Enabled": "true,adaptive,auto,false",
                "X-Video-Codecs": "hevc,h264,av1,vp9",
                "X-Audio-Codecs": "aac,ac3,eac3,opus,mp3,flac",
                "X-DRM-Support": "widevine,playready,clearkey,none",
                "X-CDN-Provider": "auto,origin,edge,any",
                "X-Failover-Enabled": "true,adaptive,auto,false",
                "X-Buffer-Size": "15000000",
                "X-Buffer-Target": "11250000",
                "X-Buffer-Min": "5250000",
                "X-Buffer-Max": "40000000",
                "X-Network-Caching": "15000000,12000000,9000000,6000000",
                "X-Live-Caching": "11250000,9000000,6750000,4500000",
                "X-File-Caching": "40000000,32000000,24000000,16000000",
                "X-Client-Timestamp": "[TIMESTAMP],[UNIX_MS],[UNIX_S],auto",
                "X-Request-Id": "[GENERATE_UUID],[CONFIG_REQUEST_ID],[TIMESTAMP],request-auto",
                "X-Device-Type": "smart-tv,android-tv,set-top-box,desktop",
                "X-Screen-Resolution": "1920x1080,1600x900,1280x720,854x480",
                "X-Network-Type": "wifi,ethernet,5g,4g",
                "Accept-Charset": "utf-8,iso-8859-1;q=0.9,utf-16;q=0.2,*;q=0.1",
                "X-Buffer-Strategy": "adaptive,stable,predictive,default",
                "Accept-CH": "DPR,Viewport-Width,Width,Downlink",
                "X-OTT-Navigator-Version": "1.7.0.0-safe,1.7.0.0-stable,1.6.9.0,default",
                "X-Player-Type": "exoplayer,vlc,media3,html5",
                "X-Hardware-Decode": "true,auto,false,default",
                "X-Tunneling-Enabled": "off,auto,false,disabled",
                "X-Audio-Track-Selection": "default,original,auto,first",
                "X-Subtitle-Track-Selection": "off,default,auto,forced",
                "X-EPG-Sync": "enabled,auto,incremental,default",
                "X-Catchup-Support": "flussonic,xc,stalker,none",
                "X-Bandwidth-Estimation": "adaptive,balanced,conservative,aggressive",
                "X-Initial-Bitrate": "10000000,7500000,5000000,2500000",
                "X-Retry-Count": "6,4,3,2",
                "X-Retry-Delay-Ms": "150,300,600,1200",
                "X-Connection-Timeout-Ms": "3000,5000,7000,9000",
                "X-Read-Timeout-Ms": "7000,10000,13000,16000",
                "X-Country-Code": "CO,US,ES,MX",
                "X-HDR-Support": "hlg,sdr,hdr10,auto",
                "X-Color-Depth": "10bit,8bit,auto,12bit",
                "X-Color-Space": "bt709,bt2020,srgb,bt601",
                "X-Dynamic-Range": "hlg,sdr,hdr10,auto",
                "X-HDR-Transfer-Function": "bt1886,arib-std-b67,srgb,gamma22",
                "X-Color-Primaries": "bt709,bt2020,display-p3,bt601",
                "X-Matrix-Coefficients": "bt709,bt2020nc,bt601,identity",
                "X-Chroma-Subsampling": "4:2:0,4:2:2,4:4:4,auto",
                "X-HEVC-Tier": "HIGH,MAIN,AUTO,COMPAT",
                "X-HEVC-Level": "4.1,4.0,5.0,3.1",
                "X-HEVC-Profile": "MAIN-10,MAIN,MAIN-STILL-PICTURE,AUTO",
                "X-Video-Profile": "main-10,high,main,baseline",
                "X-Rate-Control": "VBR,CBR,CRF,AUTO",
                "X-Entropy-Coding": "CABAC,CAVLC,AUTO,DEFAULT",
                "X-Compression-Level": "1,2,3,4",
                "X-Pixel-Format": "yuv420p10le,yuv420p,nv12,p010le",
                "X-Sharpen-Sigma": "0.04,0.03,0.02,0.00",
                "X-Max-Resolution": "1920x1080,1600x900,1280x720,854x480",
                "X-Max-Bitrate": "15000000,10000000,7000000,5000000",
                "X-Frame-Rates": "60,50,30,24",
                "X-Aspect-Ratio": "16:9,21:9,4:3,auto",
                "X-Pixel-Aspect-Ratio": "1:1,auto,4:3,16:15",
                "X-Dolby-Atmos": "auto,true,false,disabled",
                "X-Audio-Channels": "5.1,2.0,7.1,1.0",
                "X-Audio-Sample-Rate": "48000,44100,32000,22050",
                "X-Audio-Bit-Depth": "16bit,24bit,32bit,float",
                "X-Spatial-Audio": "auto,true,false,disabled",
                "X-Audio-Passthrough": "auto,true,false,disabled",
                "X-Parallel-Segments": "3,2,2,1",
                "X-Prefetch-Segments": "6,4,3,2",
                "X-Segment-Preload": "true,adaptive,auto,false",
                "X-Concurrent-Downloads": "3,2,2,1",
                "X-Reconnect-On-Error": "true,adaptive,immediate,false",
                "X-Max-Reconnect-Attempts": "40,20,10,5",
                "X-Reconnect-Delay-Ms": "100,250,500,1000",
                "X-Buffer-Underrun-Strategy": "aggressive-refill,fast-refill,stable-refill,rebuffer-safe",
                "X-Seamless-Failover": "true,adaptive,auto,false",
                "X-Bandwidth-Preference": "balanced,high,auto,conservative",
                "X-BW-Estimation-Window": "6,8,10,12",
                "X-BW-Confidence-Threshold": "0.85,0.80,0.75,0.70",
                "X-BW-Smooth-Factor": "0.15,0.20,0.25,0.30",
                "X-Packet-Loss-Monitor": "enabled,adaptive,basic,disabled",
                "X-RTT-Monitoring": "enabled,adaptive,basic,disabled",
                "X-Congestion-Detect": "enabled,adaptive,basic,disabled",
                "X-CORTEX-OMEGA-STATE": "ACTIVE,STABLE,MONITORING,DEFAULT",
                "X-APE-AI-SR-ENABLED": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-AI-SR-MODEL": "REALESRGAN_X2PLUS,LANCZOS,FSRCNNX,BICUBIC",
                "X-APE-AI-SR-SCALE": "1,1.25,1.5,2",
                "X-APE-AI-FRAME-INTERPOLATION": "OFF,AUTO,FRAME_BLEND,MOTION_ADAPTIVE",
                "X-APE-AI-DENOISING": "NLMEANS,LOW,OFF,AUTO",
                "X-APE-AI-DEBLOCKING": "ADAPTIVE,LOW,OFF,AUTO",
                "X-APE-AI-SHARPENING": "ADAPTIVE,LOW,OFF,AUTO",
                "X-APE-AI-ARTIFACT-REMOVAL": "AUTO,ENABLED,LOW,OFF",
                "X-APE-AI-COLOR-ENHANCEMENT": "AUTO,ENABLED,LOW,OFF",
                "X-APE-AI-HDR-UPCONVERT": "AUTO,ENABLED,TONEMAP,OFF",
                "X-APE-AI-SCENE-DETECTION": "AUTO,ENABLED,BASIC,OFF",
                "X-APE-AI-MOTION-ESTIMATION": "AUTO,FRAME_DIFFERENCE,DISABLED,OFF",
                "X-APE-AI-CONTENT-AWARE-ENCODING": "AUTO,ENABLED,BASIC,OFF",
                "X-APE-AI-PERCEPTUAL-QUALITY": "VMAF_94,VMAF_92,SSIM_HIGH,PSNR_HIGH",
                "X-APE-LCEVC-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-LCEVC-PHASE": "1,2,3,4",
                "X-APE-LCEVC-COMPUTE-PRECISION": "AUTO,FP16,FP32,INT8",
                "X-APE-LCEVC-UPSCALE-ALGORITHM": "LANCZOS,BICUBIC,BILINEAR,AUTO",
                "X-APE-LCEVC-ROI-DYNAMIC": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-LCEVC-TRANSPORT": "CMAF_LAYER,FMP4,HLS,DASH",
                "X-APE-LCEVC-SDK-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-LCEVC-SDK-TARGET": "HTML5_NATIVE,ANDROID_NATIVE,TV_NATIVE,AUTO",
                "X-APE-LCEVC-SDK-WEB-INTEROP": "DISABLED,JS_BRIDGE,AUTO,OFF",
                "X-APE-LCEVC-SDK-DECODER": "AUTO,WASM+WEBGL,NATIVE,OFF",
                "X-APE-GPU-DECODE": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-GPU-RENDER": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-GPU-PIPELINE": "DECODE_RENDER,DECODE_SCALE_RENDER,AUTO,SOFTWARE",
                "X-APE-GPU-PRECISION": "AUTO,FP16,FP32,INT8",
                "X-APE-GPU-MEMORY-POOL": "AUTO,VRAM_PREFERRED,SYSTEM_SHARED,DEFAULT",
                "X-APE-GPU-ZERO-COPY": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-VVC-ENABLED": "FALSE,AUTO,DISABLED,OFF",
                "X-APE-EVC-ENABLED": "FALSE,AUTO,DISABLED,OFF",
                "X-APE-PLAYER-ENSLAVEMENT-PROTOCOL": "STANDARD,SAFE,COMPATIBLE,DEFAULT",
                "X-APE-PLAYER-ENSLAVEMENT-OVERRIDE-CODEC": "FALSE,AUTO,TRUE,DEFAULT",
                "X-APE-RESILIENCE-L1-FORMAT": "HLS_FMP4,DASH,CMAF,HLS_TS",
                "X-APE-RESILIENCE-L2-FORMAT": "DASH,HLS_FMP4,CMAF,HLS_TS",
                "X-APE-RESILIENCE-L3-FORMAT": "HLS_TS,HLS_FMP4,DASH,PROGRESSIVE_MP4",
                "X-APE-RESILIENCE-HTTP-ERROR-403": "STOP,REFRESH_MANIFEST,RETRY_BACKOFF,FAIL_SAFE",
                "X-APE-RESILIENCE-HTTP-ERROR-404": "REFRESH_PLAYLIST,RETRY_BACKOFF,ORIGIN_RETRY,STOP",
                "X-APE-RESILIENCE-HTTP-ERROR-429": "BACKOFF,RETRY_AFTER,LOWER_CONCURRENCY,STOP",
                "X-APE-RESILIENCE-HTTP-ERROR-500": "RETRY_BACKOFF,REFRESH_MANIFEST,RECONNECT,STOP",
                "X-APE-AV1-FALLBACK-ENABLED": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-AV1-FALLBACK-CHAIN": "HEVC>H264>AV1>VP9",
                "X-APE-ISP-THROTTLE-ESCALATION-POLICY": "ADAPTIVE_BACKOFF,REDUCE_BITRATE,EXTEND_BUFFER,DEFAULT",
                "X-APE-ANTI-CUT-ENGINE": "LOCAL_BUFFER_PROTECTION,SEAMLESS_RETRY,DISABLED,OFF",
                "X-APE-ANTI-CUT-DETECTION": "STALL_REBUFFER,SEGMENT_TIMEOUT,PLAYLIST_DRIFT,DISABLED",
                "X-APE-ANTI-CUT-ISP-STRANGLE": "AGGRESSIVE,MODERATE,PASSIVE,MONITOR",
                "X-APE-RECONNECT-MAX": "40,20,10,5",
                "X-APE-RECONNECT-SEAMLESS": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-IDENTITY-MORPH": "DISABLED,OFF,NONE,STATIC",
                "X-APE-IDENTITY-ROTATION-INTERVAL": "0,0,0,0",
                "X-APE-EVASION-MODE": "DISABLED,OFF,NONE,STANDARD",
                "X-APE-EVASION-DNS-OVER-HTTPS": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-SNI-OBFUSCATION": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-TLS-FINGERPRINT-RANDOMIZE": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-EVASION-GEO-PHANTOM": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-DEEP-PACKET-INSPECTION-BYPASS": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-IP-ROTATION-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-IP-ROTATION-STRATEGY": "NONE,DISABLED,OFF,DEFAULT",
                "X-APE-STEALTH-UA": "STATIC,COMPATIBLE,AUTO,DEFAULT",
                "X-APE-STEALTH-XFF": "OFF,DISABLED,STATIC,DEFAULT",
                "X-APE-STEALTH-FINGERPRINT": "STATIC,COMPATIBLE,AUTO,DEFAULT",
                "X-APE-SWARM-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-SWARM-PEERS": "0,0,0,0",
                "X-APE-TRANSPORT-PROTOCOL": "HLS_FMP4,DASH,CMAF,HLS_TS",
                "X-APE-TRANSPORT-CHUNK-SIZE": "500MS,1S,2S,4S",
                "X-APE-TRANSPORT-FALLBACK-1": "DASH,HLS_FMP4,CMAF,HLS_TS",
                "X-APE-CACHE-STRATEGY": "ADAPTIVE,SEGMENT_AWARE,PREDICTIVE,DEFAULT",
                "X-APE-CACHE-SIZE": "256MB,512MB,128MB,64MB",
                "X-APE-CACHE-PREFETCH": "ENABLED,AUTO,DISABLED,OFF",
                "X-APE-BUFFER-STRATEGY": "ADAPTIVE,STABLE,PREDICTIVE,DEFAULT",
                "X-APE-BUFFER-PRELOAD-SEGMENTS": "6,4,3,2",
                "X-APE-BUFFER-DYNAMIC-ADJUSTMENT": "ENABLED,AUTO,DISABLED,OFF",
                "X-APE-BUFFER-NEURAL-PREDICTION": "DISABLED,OFF,AUTO,FALSE",
                "X-APE-QOS-ENABLED": "AUTO,TRUE,FALSE,DISABLED",
                "X-APE-QOS-DSCP": "CS0,BE,AF21,AF31",
                "X-APE-QOS-PRIORITY": "0,1,2,3",
                "X-APE-POLYMORPHIC-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-POLYMORPHIC-IDEMPOTENT": "TRUE,AUTO,FALSE,DISABLED",
                "X-TELCHEMY-TVQM": "ENABLED,INTERVAL=1000,METRICS=VMAF:PSNR:SSIM,INTERVAL=2000,METRICS=SSIM:PSNR,AUTO,DISABLED",
                "X-TELCHEMY-TR101290": "ENABLED,PRIORITY_1=ALERT,PRIORITY_2=WARN,AUTO,DISABLED",
                "X-TELCHEMY-IMPAIRMENT-GUARD": "ENABLED,BLOCKINESS=DETECT,BLUR=DETECT,AUTO,DISABLED",
                "X-TELCHEMY-BUFFER-POLICY": "ADAPTIVE,MIN=15000000,STABLE,MIN=12000000,AUTO,DEFAULT",
                "X-TELCHEMY-GOP-POLICY": "DETECT,IDEAL=2000,TOLERANCE=500,DETECT,IDEAL=1000,TOLERANCE=250,AUTO,DISABLED",
                "X-APE-CODEC": "HEVC,H264,AV1,VP9",
                "X-APE-RESOLUTION": "1920x1080,1600x900,1280x720,854x480",
                "X-APE-FPS": "60,50,30,24",
                "X-APE-BITRATE": "10,7.5,5,3.3",
                "X-APE-TARGET-BITRATE": "10000,7500,5000,3300",
                "X-APE-THROUGHPUT-T1": "10,8,6,4.5",
                "X-APE-THROUGHPUT-T2": "15,12,9,6.75",
                "X-ExoPlayer-Buffer-Min": "40000000,32000000,24000000,16000000",
                "X-Manifest-Refresh": "40000,30000,20000,13200",
                "X-KODI-LIVE-DELAY": "12,9,6,1",
                "X-APE-STRATEGY": "adaptive-balanced,balanced,adaptive,stable",
                "X-APE-Prefetch-Segments": "6,4,3,2",
                "X-APE-Quality-Threshold": "0.92,0.90,0.88,0.85",
                "X-Tone-Mapping": "auto,reinhard,hable,off",
                "X-HDR-Output-Mode": "auto,sdr,hdr,tonemap",
                "X-Codec-Support": "hevc,h264,av1,vp9"
            }
        },

        P3: {
            id: "P3",
            name: "FHD_ADVANCED",
            level: 3,
            quality: "FHD",
            description: "FHD ADVANCED - Estándar Full HD con headers balanceados (18.7 Mbps)",
            color: "#16a34a",
            settings: {
                resolution: "1920x1080,1280x720",
                buffer: 30000,
                buffer_min: 3000,
                buffer_max: 60000,
                network_cache: 40000,
                live_cache: 40000,
                file_cache: 8000,
                strategy: "ultra-aggressive,adaptive",
                bitrate: 3.7,
                t1: 4.8,
                t2: 6.0,
                playerBuffer: 30000,
                fps: "60,50,30,25",
                codec: "AV1,H265,H264",
                headersCount: 72,
                prefetch_segments: 300,
                prefetch_parallel: 150,
                prefetch_buffer_target: 400000,
                prefetch_min_bandwidth: 300000000,
                segment_duration: "2,4,6",
                bandwidth_guarantee: 300,
                reconnect_timeout_ms: "5,10,15",
                reconnect_max_attempts: "200,300",
                reconnect_delay_ms: "0,50,200",
                hevc_tier: 'HIGH,MAIN',
                hevc_level: '5.1,5.0,4.1,4.0,3.1',
                hevc_profile: 'MAIN-10,MAIN',
                color_space: 'BT709,BT601',
                chroma_subsampling: '4:2:0',
                transfer_function: 'BT1886,BT709',
                matrix_coefficients: 'BT709,BT601',
                compression_level: "1,2",
                sharpen_sigma: "0.03,0.05",
                rate_control: 'VBR,ABR,CBR',
                entropy_coding: 'CABAC,CAVLC',
                video_profile: 'main10,main',
                pixel_format: 'yuv420p10le,yuv420p'
            },
            vlcopt: {
                "network-caching": "40000,80000",
                "clock-jitter": "0",
                "clock-synchro": "0",
                "live-caching": "40000,80000",
                "file-caching": "8000,16000",
                "http-user-agent": "Mozilla/5.0 (APE-NAVIGATOR; ULTRA-8K-HEVC-MASTER) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 APE-Engine/13.1-P3"
            },
            kodiprop: {
                "inputstream.adaptive.manifest_type": "hls,dash",
                "inputstream.adaptive.stream_headers": "[ENCODED_HEADERS]"
            },
            enabledCategories: ["identity", "connection", "cache", "cors", "ape_core", "playback", "codecs", "cdn", "metadata", "extra", "ott_navigator", "streaming_control", "security", "hdr_color", "resolution_advanced", "audio_premium", "parallel_download", "anti_freeze", "abr_control", "omega_ai_cortex", "omega_lcevc", "omega_hardware", "omega_resilience", "omega_stealth", "omega_transport", "omega_qos"],
            headerOverrides: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 11; BRAVIA 4K GB) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36,Mozilla/5.0 (SMART-TV; Linux; Tizen 8.0) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/8.0 TV Safari/537.36,Mozilla/5.0 (Linux; Android 12; SHIELD Android TV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                "Accept": "application/vnd.apple.mpegurl,audio/mpegurl,application/x-mpegurl,video/mp4,*/*",
                "Accept-Encoding": "gzip,br,deflate,identity",
                "Accept-Language": "es-CO,es-ES,es,en-US",
                "Sec-CH-UA": "\"Google Chrome\";v=\"125\",\"Chromium\";v=\"125\",\"Android WebView\";v=\"125\",\"Not.A/Brand\";v=\"24\"",
                "Sec-CH-UA-Mobile": "?0,?1,?0,?0",
                "Sec-CH-UA-Platform": "\"Android\",\"Windows\",\"Tizen\",\"Linux\"",
                "Sec-CH-UA-Full-Version-List": "\"Google Chrome\";v=\"125.0.0.0\",\"Chromium\";v=\"125.0.0.0\",\"Android WebView\";v=\"125.0.0.0\",\"Not.A/Brand\";v=\"24.0.0.0\"",
                "Sec-CH-UA-Arch": "arm,x86,x86_64,arm64",
                "Sec-CH-UA-Bitness": "32,64,64,32",
                "Sec-CH-UA-Model": "\"SHIELD Android TV\",\"BRAVIA\",\"AFTN\",\"\"",
                "Connection": "keep-alive,close",
                "Keep-Alive": "timeout=30, max=1000",
                "Sec-Fetch-Dest": "video,empty,document,media",
                "Sec-Fetch-Mode": "no-cors,cors,navigate,same-origin",
                "Sec-Fetch-Site": "same-origin,same-site,none,cross-site",
                "Sec-Fetch-User": "?1,?0",
                "DNT": "1,0",
                "Sec-GPC": "1,0",
                "Upgrade-Insecure-Requests": "1,0",
                "TE": "trailers,chunked,compress,deflate",
                "Cache-Control": "no-cache,max-age=0,no-store,must-revalidate",
                "Pragma": "no-cache,cache,no-cache,cache",
                "Range": "bytes=0-,bytes=1-,bytes=0-1048575,bytes=0-2097151",
                "If-None-Match": "*",
                "If-Modified-Since": "[HTTP_DATE]",
                "Origin": "https://iptv-ape.duckdns.org",
                "Referer": "https://iptv-ape.duckdns.org/",
                "X-Requested-With": "XMLHttpRequest,fetch,media-request,player",
                "X-App-Version": "APE_9.2_SAFE_COMPAT,APE_9.1_STABLE,APE_9.0_COMPAT,APE_DEFAULT",
                "X-Playback-Session-Id": "[CONFIG_SESSION_ID],[GENERATE_UUID],[TIMESTAMP],session-auto",
                "X-Device-Id": "[GENERATE_UUID],[CONFIG_DEVICE_ID],device-auto,device-default",
                "X-Stream-Type": "hls,dash,cmaf,progressive",
                "X-Quality-Preference": "codec-h264,high,main,baseline;codec-hevc,main,main-10;codec-vp9,profile-0,profile-2;codec-av1,main,main-10",
                "Priority": "u=0, i",
                "X-Playback-Rate": "1.0,1.0,1.0,1.0",
                "X-Segment-Duration": "2,4,6,10",
                "X-Min-Buffer-Time": "4,6,8,12",
                "X-Max-Buffer-Time": "15,20,25,30",
                "X-Request-Priority": "normal,low,auto,idle",
                "X-Prefetch-Enabled": "true,adaptive,auto,false",
                "X-Video-Codecs": "h264,hevc,vp9,av1",
                "X-Audio-Codecs": "aac,ac3,eac3,mp3,opus,flac",
                "X-DRM-Support": "widevine,playready,clearkey,none",
                "X-CDN-Provider": "auto,origin,edge,any",
                "X-Failover-Enabled": "true,adaptive,auto,false",
                "X-Buffer-Size": "12000000",
                "X-Buffer-Target": "9000000",
                "X-Buffer-Min": "4200000",
                "X-Buffer-Max": "30000000",
                "X-Network-Caching": "12000000,9600000,7200000,4800000",
                "X-Live-Caching": "9000000,7200000,5400000,3600000",
                "X-File-Caching": "30000000,24000000,18000000,12000000",
                "X-Client-Timestamp": "[TIMESTAMP],[UNIX_MS],[UNIX_S],auto",
                "X-Request-Id": "[GENERATE_UUID],[CONFIG_REQUEST_ID],[TIMESTAMP],request-auto",
                "X-Device-Type": "smart-tv,android-tv,set-top-box,desktop",
                "X-Screen-Resolution": "1280x720,960x540,854x480,640x360",
                "X-Network-Type": "wifi,ethernet,5g,4g",
                "Accept-Charset": "utf-8,iso-8859-1;q=0.9,utf-16;q=0.2,*;q=0.1",
                "X-Buffer-Strategy": "adaptive,stable,predictive,default",
                "Accept-CH": "DPR,Viewport-Width,Width,Downlink",
                "X-OTT-Navigator-Version": "1.7.0.0-safe,1.7.0.0-stable,1.6.9.0,default",
                "X-Player-Type": "exoplayer,vlc,media3,html5",
                "X-Hardware-Decode": "true,auto,false,default",
                "X-Tunneling-Enabled": "off,auto,false,disabled",
                "X-Audio-Track-Selection": "default,original,auto,first",
                "X-Subtitle-Track-Selection": "off,default,auto,forced",
                "X-EPG-Sync": "enabled,auto,incremental,default",
                "X-Catchup-Support": "flussonic,xc,stalker,none",
                "X-Bandwidth-Estimation": "adaptive,balanced,conservative,aggressive",
                "X-Initial-Bitrate": "5000000,3750000,2500000,1250000",
                "X-Retry-Count": "6,4,3,2",
                "X-Retry-Delay-Ms": "150,300,600,1200",
                "X-Connection-Timeout-Ms": "3000,5000,7000,9000",
                "X-Read-Timeout-Ms": "7000,10000,13000,16000",
                "X-Country-Code": "CO,US,ES,MX",
                "X-HDR-Support": "sdr,hlg,auto,off",
                "X-Color-Depth": "8bit,10bit,auto,12bit",
                "X-Color-Space": "bt709,srgb,bt601,bt2020",
                "X-Dynamic-Range": "sdr,hlg,auto,off",
                "X-HDR-Transfer-Function": "bt1886,srgb,gamma22,arib-std-b67",
                "X-Color-Primaries": "bt709,srgb,bt601,bt2020",
                "X-Matrix-Coefficients": "bt709,bt601,identity,bt2020nc",
                "X-Chroma-Subsampling": "4:2:0,4:2:2,4:4:4,auto",
                "X-HEVC-Tier": "HIGH,MAIN,AUTO,COMPAT",
                "X-HEVC-Level": "4.0,3.1,4.1,3.0",
                "X-HEVC-Profile": "MAIN,MAIN-10,AUTO,BASELINE",
                "X-Video-Profile": "high,main,baseline,main-10",
                "X-Rate-Control": "VBR,CBR,CRF,AUTO",
                "X-Entropy-Coding": "CABAC,CAVLC,AUTO,DEFAULT",
                "X-Compression-Level": "1,2,3,4",
                "X-Pixel-Format": "yuv420p,nv12,yuv420p10le,p010le",
                "X-Sharpen-Sigma": "0.03,0.03,0.02,0.00",
                "X-Max-Resolution": "1280x720,960x540,854x480,640x360",
                "X-Max-Bitrate": "8000000,6000000,4000000,2500000",
                "X-Frame-Rates": "50,30,25,24",
                "X-Aspect-Ratio": "16:9,21:9,4:3,auto",
                "X-Pixel-Aspect-Ratio": "1:1,auto,4:3,16:15",
                "X-Dolby-Atmos": "auto,true,false,disabled",
                "X-Audio-Channels": "2.0,5.1,1.0,7.1",
                "X-Audio-Sample-Rate": "48000,44100,32000,22050",
                "X-Audio-Bit-Depth": "16bit,24bit,32bit,float",
                "X-Spatial-Audio": "auto,true,false,disabled",
                "X-Audio-Passthrough": "auto,true,false,disabled",
                "X-Parallel-Segments": "3,2,2,1",
                "X-Prefetch-Segments": "4,3,2,1",
                "X-Segment-Preload": "true,adaptive,auto,false",
                "X-Concurrent-Downloads": "3,2,2,1",
                "X-Reconnect-On-Error": "true,adaptive,immediate,false",
                "X-Max-Reconnect-Attempts": "40,20,10,5",
                "X-Reconnect-Delay-Ms": "100,250,500,1000",
                "X-Buffer-Underrun-Strategy": "aggressive-refill,fast-refill,stable-refill,rebuffer-safe",
                "X-Seamless-Failover": "true,adaptive,auto,false",
                "X-Bandwidth-Preference": "conservative,balanced,auto,low",
                "X-BW-Estimation-Window": "6,8,10,12",
                "X-BW-Confidence-Threshold": "0.85,0.80,0.75,0.70",
                "X-BW-Smooth-Factor": "0.15,0.20,0.25,0.30",
                "X-Packet-Loss-Monitor": "enabled,adaptive,basic,disabled",
                "X-RTT-Monitoring": "enabled,adaptive,basic,disabled",
                "X-Congestion-Detect": "enabled,adaptive,basic,disabled",
                "X-CORTEX-OMEGA-STATE": "ACTIVE,STABLE,MONITORING,DEFAULT",
                "X-APE-AI-SR-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-AI-SR-MODEL": "REALESRGAN_X2PLUS,LANCZOS,FSRCNNX,BICUBIC",
                "X-APE-AI-SR-SCALE": "1,1.5,2,auto",
                "X-APE-AI-FRAME-INTERPOLATION": "OFF,AUTO,FRAME_BLEND,MOTION_ADAPTIVE",
                "X-APE-AI-DENOISING": "NLMEANS,LOW,OFF,AUTO",
                "X-APE-AI-DEBLOCKING": "ADAPTIVE,LOW,OFF,AUTO",
                "X-APE-AI-SHARPENING": "ADAPTIVE,LOW,OFF,AUTO",
                "X-APE-AI-ARTIFACT-REMOVAL": "AUTO,ENABLED,LOW,OFF",
                "X-APE-AI-COLOR-ENHANCEMENT": "AUTO,ENABLED,LOW,OFF",
                "X-APE-AI-HDR-UPCONVERT": "OFF,AUTO,DISABLED,SDR",
                "X-APE-AI-SCENE-DETECTION": "AUTO,ENABLED,BASIC,OFF",
                "X-APE-AI-MOTION-ESTIMATION": "AUTO,FRAME_DIFFERENCE,DISABLED,OFF",
                "X-APE-AI-CONTENT-AWARE-ENCODING": "AUTO,ENABLED,BASIC,OFF",
                "X-APE-AI-PERCEPTUAL-QUALITY": "VMAF_92,VMAF_90,SSIM_GOOD,PSNR_GOOD",
                "X-APE-LCEVC-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-LCEVC-PHASE": "1,2,3,4",
                "X-APE-LCEVC-COMPUTE-PRECISION": "AUTO,FP16,FP32,INT8",
                "X-APE-LCEVC-UPSCALE-ALGORITHM": "LANCZOS,BICUBIC,BILINEAR,AUTO",
                "X-APE-LCEVC-ROI-DYNAMIC": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-LCEVC-TRANSPORT": "CMAF_LAYER,FMP4,HLS,DASH",
                "X-APE-LCEVC-SDK-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-LCEVC-SDK-TARGET": "HTML5_NATIVE,ANDROID_NATIVE,TV_NATIVE,AUTO",
                "X-APE-LCEVC-SDK-WEB-INTEROP": "DISABLED,JS_BRIDGE,AUTO,OFF",
                "X-APE-LCEVC-SDK-DECODER": "AUTO,WASM+WEBGL,NATIVE,OFF",
                "X-APE-GPU-DECODE": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-GPU-RENDER": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-GPU-PIPELINE": "DECODE_RENDER,DECODE_SCALE_RENDER,AUTO,SOFTWARE",
                "X-APE-GPU-PRECISION": "AUTO,FP16,FP32,INT8",
                "X-APE-GPU-MEMORY-POOL": "AUTO,VRAM_PREFERRED,SYSTEM_SHARED,DEFAULT",
                "X-APE-GPU-ZERO-COPY": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-VVC-ENABLED": "FALSE,AUTO,DISABLED,OFF",
                "X-APE-EVC-ENABLED": "FALSE,AUTO,DISABLED,OFF",
                "X-APE-PLAYER-ENSLAVEMENT-PROTOCOL": "STANDARD,SAFE,COMPATIBLE,DEFAULT",
                "X-APE-PLAYER-ENSLAVEMENT-OVERRIDE-CODEC": "FALSE,AUTO,TRUE,DEFAULT",
                "X-APE-RESILIENCE-L1-FORMAT": "HLS_TS,HLS_FMP4,DASH,PROGRESSIVE_MP4",
                "X-APE-RESILIENCE-L2-FORMAT": "HLS_FMP4,HLS_TS,DASH,PROGRESSIVE_MP4",
                "X-APE-RESILIENCE-L3-FORMAT": "PROGRESSIVE_MP4,HLS_TS,HLS_FMP4,DASH",
                "X-APE-RESILIENCE-HTTP-ERROR-403": "STOP,REFRESH_MANIFEST,RETRY_BACKOFF,FAIL_SAFE",
                "X-APE-RESILIENCE-HTTP-ERROR-404": "REFRESH_PLAYLIST,RETRY_BACKOFF,ORIGIN_RETRY,STOP",
                "X-APE-RESILIENCE-HTTP-ERROR-429": "BACKOFF,RETRY_AFTER,LOWER_CONCURRENCY,STOP",
                "X-APE-RESILIENCE-HTTP-ERROR-500": "RETRY_BACKOFF,REFRESH_MANIFEST,RECONNECT,STOP",
                "X-APE-AV1-FALLBACK-ENABLED": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-AV1-FALLBACK-CHAIN": "H264>HEVC>VP9>AV1",
                "X-APE-ISP-THROTTLE-ESCALATION-POLICY": "ADAPTIVE_BACKOFF,REDUCE_BITRATE,EXTEND_BUFFER,DEFAULT",
                "X-APE-ANTI-CUT-ENGINE": "LOCAL_BUFFER_PROTECTION,SEAMLESS_RETRY,DISABLED,OFF",
                "X-APE-ANTI-CUT-DETECTION": "STALL_REBUFFER,SEGMENT_TIMEOUT,PLAYLIST_DRIFT,DISABLED",
                "X-APE-ANTI-CUT-ISP-STRANGLE": "MODERATE,PASSIVE,MONITOR,OFF",
                "X-APE-RECONNECT-MAX": "40,20,10,5",
                "X-APE-RECONNECT-SEAMLESS": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-IDENTITY-MORPH": "DISABLED,OFF,NONE,STATIC",
                "X-APE-IDENTITY-ROTATION-INTERVAL": "0,0,0,0",
                "X-APE-EVASION-MODE": "DISABLED,OFF,NONE,STANDARD",
                "X-APE-EVASION-DNS-OVER-HTTPS": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-SNI-OBFUSCATION": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-TLS-FINGERPRINT-RANDOMIZE": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-EVASION-GEO-PHANTOM": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-DEEP-PACKET-INSPECTION-BYPASS": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-IP-ROTATION-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-IP-ROTATION-STRATEGY": "NONE,DISABLED,OFF,DEFAULT",
                "X-APE-STEALTH-UA": "STATIC,COMPATIBLE,AUTO,DEFAULT",
                "X-APE-STEALTH-XFF": "OFF,DISABLED,STATIC,DEFAULT",
                "X-APE-STEALTH-FINGERPRINT": "STATIC,COMPATIBLE,AUTO,DEFAULT",
                "X-APE-SWARM-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-SWARM-PEERS": "0,0,0,0",
                "X-APE-TRANSPORT-PROTOCOL": "HLS_TS,HLS_FMP4,DASH,PROGRESSIVE_MP4",
                "X-APE-TRANSPORT-CHUNK-SIZE": "500MS,1S,2S,4S",
                "X-APE-TRANSPORT-FALLBACK-1": "HLS_FMP4,HLS_TS,DASH,PROGRESSIVE_MP4",
                "X-APE-CACHE-STRATEGY": "ADAPTIVE,SEGMENT_AWARE,PREDICTIVE,DEFAULT",
                "X-APE-CACHE-SIZE": "256MB,512MB,128MB,64MB",
                "X-APE-CACHE-PREFETCH": "ENABLED,AUTO,DISABLED,OFF",
                "X-APE-BUFFER-STRATEGY": "ADAPTIVE,STABLE,PREDICTIVE,DEFAULT",
                "X-APE-BUFFER-PRELOAD-SEGMENTS": "4,3,2,1",
                "X-APE-BUFFER-DYNAMIC-ADJUSTMENT": "ENABLED,AUTO,DISABLED,OFF",
                "X-APE-BUFFER-NEURAL-PREDICTION": "DISABLED,OFF,AUTO,FALSE",
                "X-APE-QOS-ENABLED": "AUTO,TRUE,FALSE,DISABLED",
                "X-APE-QOS-DSCP": "CS0,BE,AF21,AF31",
                "X-APE-QOS-PRIORITY": "0,1,2,3",
                "X-APE-POLYMORPHIC-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-POLYMORPHIC-IDEMPOTENT": "TRUE,AUTO,FALSE,DISABLED",
                "X-TELCHEMY-TVQM": "ENABLED,INTERVAL=1000,METRICS=VMAF:PSNR:SSIM,INTERVAL=2000,METRICS=SSIM:PSNR,AUTO,DISABLED",
                "X-TELCHEMY-TR101290": "ENABLED,PRIORITY_1=ALERT,PRIORITY_2=WARN,AUTO,DISABLED",
                "X-TELCHEMY-IMPAIRMENT-GUARD": "ENABLED,BLOCKINESS=DETECT,BLUR=DETECT,AUTO,DISABLED",
                "X-TELCHEMY-BUFFER-POLICY": "ADAPTIVE,MIN=12000000,STABLE,MIN=9600000,AUTO,DEFAULT",
                "X-TELCHEMY-GOP-POLICY": "DETECT,IDEAL=2000,TOLERANCE=500,DETECT,IDEAL=1000,TOLERANCE=250,AUTO,DISABLED",
                "X-APE-CODEC": "H264,HEVC,VP9,AV1",
                "X-APE-RESOLUTION": "1280x720,960x540,854x480,640x360",
                "X-APE-FPS": "50,30,25,24",
                "X-APE-BITRATE": "5,3.75,2.5,1.65",
                "X-APE-TARGET-BITRATE": "5000,3750,2500,1650",
                "X-APE-THROUGHPUT-T1": "5,4,3,2.25",
                "X-APE-THROUGHPUT-T2": "8,6.4,4.8,3.6",
                "X-ExoPlayer-Buffer-Min": "30000000,24000000,18000000,12000000",
                "X-Manifest-Refresh": "30000,22500,15000,9900",
                "X-KODI-LIVE-DELAY": "9,7,4,1",
                "X-APE-STRATEGY": "balanced,adaptive,stable,conservative",
                "X-APE-Prefetch-Segments": "4,3,2,1",
                "X-APE-Quality-Threshold": "0.92,0.90,0.88,0.85",
                "X-Tone-Mapping": "auto,reinhard,off,hable",
                "X-HDR-Output-Mode": "auto,sdr,tonemap,off",
                "X-Codec-Support": "h264,hevc,vp9,av1"
            }
        },

        P4: {
            id: "P4",
            name: "HD_STABLE",
            level: 2,
            quality: "HD",
            description: "HD STABLE - Compatibilidad máxima para 720p (13.8 Mbps)",
            color: "#0891b2",
            settings: {
                resolution: "1280x720,854x480",
                buffer: 25000,
                buffer_min: 2500,
                buffer_max: 50000,
                network_cache: 35000,
                live_cache: 35000,
                file_cache: 7000,
                strategy: "ultra-aggressive,adaptive",
                bitrate: 2.8,
                t1: 3.6,
                t2: 4.5,
                playerBuffer: 25000,
                fps: "60,50,30,25",
                codec: "AV1,H265,H264,MPEG2",
                headersCount: 62,
                prefetch_segments: 250,
                prefetch_parallel: 120,
                prefetch_buffer_target: 350000,
                prefetch_min_bandwidth: 250000000,
                segment_duration: "2,4,6",
                bandwidth_guarantee: 250,
                reconnect_timeout_ms: "5,10,15",
                reconnect_max_attempts: "200,300",
                reconnect_delay_ms: "0,50,200",
                hevc_tier: 'MAIN',
                hevc_level: '5.0,4.1,4.0,3.1',
                hevc_profile: 'MAIN',
                color_space: 'BT709,BT601',
                chroma_subsampling: '4:2:0',
                transfer_function: 'BT1886,BT709',
                matrix_coefficients: 'BT709,BT601',
                compression_level: "1,2",
                sharpen_sigma: "0.05,0.06",
                rate_control: 'VBR,ABR,CBR',
                entropy_coding: 'CABAC,CAVLC',
                video_profile: 'main',
                pixel_format: 'yuv420p'
            },
            vlcopt: {
                "network-caching": "35000,70000",
                "clock-jitter": "0",
                "clock-synchro": "0",
                "live-caching": "35000,70000",
                "file-caching": "7000,15000",
                "http-user-agent": "Mozilla/5.0 (APE-NAVIGATOR; ULTRA-8K-HEVC-MASTER) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 APE-Engine/13.1-P4"
            },
            kodiprop: {
                "inputstream.adaptive.manifest_type": "hls,dash"
            },
            enabledCategories: ["identity", "connection", "cache", "cors", "ape_core", "playback", "codecs", "cdn", "metadata", "extra", "ott_navigator", "streaming_control", "security", "hdr_color", "resolution_advanced", "audio_premium", "parallel_download", "anti_freeze", "abr_control", "omega_lcevc", "omega_hardware", "omega_resilience", "omega_transport", "omega_qos"],
            headerOverrides: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; AFTN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36,Mozilla/5.0 (SMART-TV; Linux; Tizen 6.5) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/7.0 TV Safari/537.36,Mozilla/5.0 (Linux; Android 9; MiBOX4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                "Accept": "application/vnd.apple.mpegurl,audio/mpegurl,application/x-mpegurl,video/mp4,*/*",
                "Accept-Encoding": "gzip,br,deflate,identity",
                "Accept-Language": "es-CO,es-ES,es,en-US",
                "Sec-CH-UA": "\"Google Chrome\";v=\"125\",\"Chromium\";v=\"125\",\"Android WebView\";v=\"125\",\"Not.A/Brand\";v=\"24\"",
                "Sec-CH-UA-Mobile": "?0,?1,?0,?0",
                "Sec-CH-UA-Platform": "\"Android\",\"Windows\",\"Tizen\",\"Linux\"",
                "Sec-CH-UA-Full-Version-List": "\"Google Chrome\";v=\"125.0.0.0\",\"Chromium\";v=\"125.0.0.0\",\"Android WebView\";v=\"125.0.0.0\",\"Not.A/Brand\";v=\"24.0.0.0\"",
                "Sec-CH-UA-Arch": "arm,x86,x86_64,arm64",
                "Sec-CH-UA-Bitness": "32,64,64,32",
                "Sec-CH-UA-Model": "\"SHIELD Android TV\",\"BRAVIA\",\"AFTN\",\"\"",
                "Connection": "keep-alive,close",
                "Keep-Alive": "timeout=30, max=1000",
                "Sec-Fetch-Dest": "video,empty,document,media",
                "Sec-Fetch-Mode": "no-cors,cors,navigate,same-origin",
                "Sec-Fetch-Site": "same-origin,same-site,none,cross-site",
                "Sec-Fetch-User": "?1,?0",
                "DNT": "1,0",
                "Sec-GPC": "1,0",
                "Upgrade-Insecure-Requests": "1,0",
                "TE": "trailers,chunked,compress,deflate",
                "Cache-Control": "no-cache,max-age=0,no-store,must-revalidate",
                "Pragma": "no-cache,cache,no-cache,cache",
                "Range": "bytes=0-,bytes=1-,bytes=0-1048575,bytes=0-2097151",
                "If-None-Match": "*",
                "If-Modified-Since": "[HTTP_DATE]",
                "Origin": "https://iptv-ape.duckdns.org",
                "Referer": "https://iptv-ape.duckdns.org/",
                "X-Requested-With": "XMLHttpRequest,fetch,media-request,player",
                "X-App-Version": "APE_9.2_SAFE_COMPAT,APE_9.1_STABLE,APE_9.0_COMPAT,APE_DEFAULT",
                "X-Playback-Session-Id": "[CONFIG_SESSION_ID],[GENERATE_UUID],[TIMESTAMP],session-auto",
                "X-Device-Id": "[GENERATE_UUID],[CONFIG_DEVICE_ID],device-auto,device-default",
                "X-Stream-Type": "hls,dash,cmaf,progressive",
                "X-Quality-Preference": "codec-h264,main,baseline,high;codec-hevc,main,main-10;codec-mpeg2,main,simple;codec-vp9,profile-0,profile-2",
                "Priority": "u=0, i",
                "X-Playback-Rate": "1.0,1.0,1.0,1.0",
                "X-Segment-Duration": "4,6,8,10",
                "X-Min-Buffer-Time": "6,8,10,12",
                "X-Max-Buffer-Time": "12,16,20,24",
                "X-Request-Priority": "normal,auto,low,idle",
                "X-Prefetch-Enabled": "true,adaptive,auto,false",
                "X-Video-Codecs": "h264,hevc,mpeg2,vp9",
                "X-Audio-Codecs": "aac,mp3,ac3,opus,eac3,mp2",
                "X-DRM-Support": "widevine,playready,clearkey,none",
                "X-CDN-Provider": "auto,origin,edge,any",
                "X-Failover-Enabled": "true,adaptive,auto,false",
                "X-Buffer-Size": "10000000",
                "X-Buffer-Target": "7500000",
                "X-Buffer-Min": "3500000",
                "X-Buffer-Max": "22000000",
                "X-Network-Caching": "10000000,8000000,6000000,4000000",
                "X-Live-Caching": "7500000,6000000,4500000,3000000",
                "X-File-Caching": "22000000,17600000,13200000,8800000",
                "X-Client-Timestamp": "[TIMESTAMP],[UNIX_MS],[UNIX_S],auto",
                "X-Request-Id": "[GENERATE_UUID],[CONFIG_REQUEST_ID],[TIMESTAMP],request-auto",
                "X-Device-Type": "smart-tv,android-tv,set-top-box,desktop",
                "X-Screen-Resolution": "854x480,640x360,426x240,320x180",
                "X-Network-Type": "wifi,ethernet,5g,4g",
                "Accept-Charset": "utf-8,iso-8859-1;q=0.9,utf-16;q=0.2,*;q=0.1",
                "X-Buffer-Strategy": "adaptive,stable,predictive,default",
                "Accept-CH": "DPR,Viewport-Width,Width,Downlink",
                "X-OTT-Navigator-Version": "1.7.0.0-safe,1.7.0.0-stable,1.6.9.0,default",
                "X-Player-Type": "exoplayer,vlc,media3,html5",
                "X-Hardware-Decode": "true,auto,false,default",
                "X-Tunneling-Enabled": "off,auto,false,disabled",
                "X-Audio-Track-Selection": "default,original,auto,first",
                "X-Subtitle-Track-Selection": "off,default,auto,forced",
                "X-EPG-Sync": "enabled,auto,incremental,default",
                "X-Catchup-Support": "flussonic,xc,stalker,none",
                "X-Bandwidth-Estimation": "adaptive,balanced,conservative,aggressive",
                "X-Initial-Bitrate": "2500000,1875000,1250000,625000",
                "X-Retry-Count": "5,4,3,2",
                "X-Retry-Delay-Ms": "200,400,800,1500",
                "X-Connection-Timeout-Ms": "3500,6000,8000,10000",
                "X-Read-Timeout-Ms": "8000,11000,14000,18000",
                "X-Country-Code": "CO,US,ES,MX",
                "X-HDR-Support": "sdr,off,auto,hlg",
                "X-Color-Depth": "8bit,auto,10bit,12bit",
                "X-Color-Space": "bt601,bt709,srgb,bt2020",
                "X-Dynamic-Range": "sdr,off,auto,hlg",
                "X-HDR-Transfer-Function": "bt1886,gamma22,srgb,arib-std-b67",
                "X-Color-Primaries": "bt601,bt709,srgb,bt2020",
                "X-Matrix-Coefficients": "bt601,bt709,identity,bt2020nc",
                "X-Chroma-Subsampling": "4:2:0,4:2:2,4:4:4,auto",
                "X-HEVC-Tier": "HIGH,MAIN,AUTO,COMPAT",
                "X-HEVC-Level": "3.1,4.0,3.0,4.1",
                "X-HEVC-Profile": "MAIN,MAIN-10,AUTO,BASELINE",
                "X-Video-Profile": "main,baseline,high,main-10",
                "X-Rate-Control": "VBR,CBR,CRF,AUTO",
                "X-Entropy-Coding": "CABAC,CAVLC,AUTO,DEFAULT",
                "X-Compression-Level": "1,2,3,4",
                "X-Pixel-Format": "yuv420p,nv12,yuv420p10le,p010le",
                "X-Sharpen-Sigma": "0.02,0.03,0.02,0.00",
                "X-Max-Resolution": "854x480,640x360,426x240,320x180",
                "X-Max-Bitrate": "4000000,3000000,2000000,1200000",
                "X-Frame-Rates": "30,25,24,15",
                "X-Aspect-Ratio": "16:9,21:9,4:3,auto",
                "X-Pixel-Aspect-Ratio": "1:1,auto,4:3,16:15",
                "X-Dolby-Atmos": "auto,true,false,disabled",
                "X-Audio-Channels": "2.0,5.1,1.0,7.1",
                "X-Audio-Sample-Rate": "48000,44100,32000,22050",
                "X-Audio-Bit-Depth": "16bit,24bit,32bit,float",
                "X-Spatial-Audio": "auto,true,false,disabled",
                "X-Audio-Passthrough": "auto,true,false,disabled",
                "X-Parallel-Segments": "2,2,1,1",
                "X-Prefetch-Segments": "4,3,2,1",
                "X-Segment-Preload": "true,adaptive,auto,false",
                "X-Concurrent-Downloads": "2,2,1,1",
                "X-Reconnect-On-Error": "true,adaptive,immediate,false",
                "X-Max-Reconnect-Attempts": "40,20,10,5",
                "X-Reconnect-Delay-Ms": "100,250,500,1000",
                "X-Buffer-Underrun-Strategy": "aggressive-refill,fast-refill,stable-refill,rebuffer-safe",
                "X-Seamless-Failover": "true,adaptive,auto,false",
                "X-Bandwidth-Preference": "conservative,balanced,auto,low",
                "X-BW-Estimation-Window": "4,6,8,10",
                "X-BW-Confidence-Threshold": "0.80,0.75,0.70,0.65",
                "X-BW-Smooth-Factor": "0.20,0.25,0.30,0.35",
                "X-Packet-Loss-Monitor": "enabled,adaptive,basic,disabled",
                "X-RTT-Monitoring": "enabled,adaptive,basic,disabled",
                "X-Congestion-Detect": "enabled,adaptive,basic,disabled",
                "X-CORTEX-OMEGA-STATE": "ACTIVE,STABLE,MONITORING,DEFAULT",
                "X-APE-AI-SR-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-AI-SR-MODEL": "LANCZOS,BICUBIC,FSRCNNX,OFF",
                "X-APE-AI-SR-SCALE": "1,1.5,2,auto",
                "X-APE-AI-FRAME-INTERPOLATION": "OFF,AUTO,FRAME_BLEND,MOTION_ADAPTIVE",
                "X-APE-AI-DENOISING": "NLMEANS,LOW,OFF,AUTO",
                "X-APE-AI-DEBLOCKING": "ADAPTIVE,LOW,OFF,AUTO",
                "X-APE-AI-SHARPENING": "ADAPTIVE,LOW,OFF,AUTO",
                "X-APE-AI-ARTIFACT-REMOVAL": "AUTO,ENABLED,LOW,OFF",
                "X-APE-AI-COLOR-ENHANCEMENT": "AUTO,ENABLED,LOW,OFF",
                "X-APE-AI-HDR-UPCONVERT": "OFF,AUTO,DISABLED,SDR",
                "X-APE-AI-SCENE-DETECTION": "AUTO,ENABLED,BASIC,OFF",
                "X-APE-AI-MOTION-ESTIMATION": "AUTO,FRAME_DIFFERENCE,DISABLED,OFF",
                "X-APE-AI-CONTENT-AWARE-ENCODING": "AUTO,ENABLED,BASIC,OFF",
                "X-APE-AI-PERCEPTUAL-QUALITY": "VMAF_92,VMAF_90,SSIM_GOOD,PSNR_GOOD",
                "X-APE-LCEVC-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-LCEVC-PHASE": "1,2,3,4",
                "X-APE-LCEVC-COMPUTE-PRECISION": "AUTO,FP16,FP32,INT8",
                "X-APE-LCEVC-UPSCALE-ALGORITHM": "LANCZOS,BICUBIC,BILINEAR,AUTO",
                "X-APE-LCEVC-ROI-DYNAMIC": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-LCEVC-TRANSPORT": "CMAF_LAYER,FMP4,HLS,DASH",
                "X-APE-LCEVC-SDK-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-LCEVC-SDK-TARGET": "HTML5_NATIVE,ANDROID_NATIVE,TV_NATIVE,AUTO",
                "X-APE-LCEVC-SDK-WEB-INTEROP": "DISABLED,JS_BRIDGE,AUTO,OFF",
                "X-APE-LCEVC-SDK-DECODER": "AUTO,WASM+WEBGL,NATIVE,OFF",
                "X-APE-GPU-DECODE": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-GPU-RENDER": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-GPU-PIPELINE": "DECODE_RENDER,DECODE_SCALE_RENDER,AUTO,SOFTWARE",
                "X-APE-GPU-PRECISION": "AUTO,FP16,FP32,INT8",
                "X-APE-GPU-MEMORY-POOL": "AUTO,VRAM_PREFERRED,SYSTEM_SHARED,DEFAULT",
                "X-APE-GPU-ZERO-COPY": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-VVC-ENABLED": "FALSE,AUTO,DISABLED,OFF",
                "X-APE-EVC-ENABLED": "FALSE,AUTO,DISABLED,OFF",
                "X-APE-PLAYER-ENSLAVEMENT-PROTOCOL": "STANDARD,SAFE,COMPATIBLE,DEFAULT",
                "X-APE-PLAYER-ENSLAVEMENT-OVERRIDE-CODEC": "FALSE,AUTO,TRUE,DEFAULT",
                "X-APE-RESILIENCE-L1-FORMAT": "HLS_TS,HLS_FMP4,DASH,PROGRESSIVE_MP4",
                "X-APE-RESILIENCE-L2-FORMAT": "HLS_FMP4,HLS_TS,DASH,PROGRESSIVE_MP4",
                "X-APE-RESILIENCE-L3-FORMAT": "PROGRESSIVE_MP4,HLS_TS,HLS_FMP4,DASH",
                "X-APE-RESILIENCE-HTTP-ERROR-403": "STOP,REFRESH_MANIFEST,RETRY_BACKOFF,FAIL_SAFE",
                "X-APE-RESILIENCE-HTTP-ERROR-404": "REFRESH_PLAYLIST,RETRY_BACKOFF,ORIGIN_RETRY,STOP",
                "X-APE-RESILIENCE-HTTP-ERROR-429": "BACKOFF,RETRY_AFTER,LOWER_CONCURRENCY,STOP",
                "X-APE-RESILIENCE-HTTP-ERROR-500": "RETRY_BACKOFF,REFRESH_MANIFEST,RECONNECT,STOP",
                "X-APE-AV1-FALLBACK-ENABLED": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-AV1-FALLBACK-CHAIN": "H264>HEVC>MPEG2>VP9",
                "X-APE-ISP-THROTTLE-ESCALATION-POLICY": "ADAPTIVE_BACKOFF,REDUCE_BITRATE,EXTEND_BUFFER,DEFAULT",
                "X-APE-ANTI-CUT-ENGINE": "LOCAL_BUFFER_PROTECTION,SEAMLESS_RETRY,DISABLED,OFF",
                "X-APE-ANTI-CUT-DETECTION": "STALL_REBUFFER,SEGMENT_TIMEOUT,PLAYLIST_DRIFT,DISABLED",
                "X-APE-ANTI-CUT-ISP-STRANGLE": "PASSIVE,MONITOR,OFF,OFF",
                "X-APE-RECONNECT-MAX": "40,20,10,5",
                "X-APE-RECONNECT-SEAMLESS": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-IDENTITY-MORPH": "DISABLED,OFF,NONE,STATIC",
                "X-APE-IDENTITY-ROTATION-INTERVAL": "0,0,0,0",
                "X-APE-EVASION-MODE": "DISABLED,OFF,NONE,STANDARD",
                "X-APE-EVASION-DNS-OVER-HTTPS": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-SNI-OBFUSCATION": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-TLS-FINGERPRINT-RANDOMIZE": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-EVASION-GEO-PHANTOM": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-DEEP-PACKET-INSPECTION-BYPASS": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-IP-ROTATION-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-IP-ROTATION-STRATEGY": "NONE,DISABLED,OFF,DEFAULT",
                "X-APE-STEALTH-UA": "STATIC,COMPATIBLE,AUTO,DEFAULT",
                "X-APE-STEALTH-XFF": "OFF,DISABLED,STATIC,DEFAULT",
                "X-APE-STEALTH-FINGERPRINT": "STATIC,COMPATIBLE,AUTO,DEFAULT",
                "X-APE-SWARM-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-SWARM-PEERS": "0,0,0,0",
                "X-APE-TRANSPORT-PROTOCOL": "HLS_TS,HLS_FMP4,DASH,PROGRESSIVE_MP4",
                "X-APE-TRANSPORT-CHUNK-SIZE": "500MS,1S,2S,4S",
                "X-APE-TRANSPORT-FALLBACK-1": "HLS_FMP4,HLS_TS,DASH,PROGRESSIVE_MP4",
                "X-APE-CACHE-STRATEGY": "ADAPTIVE,SEGMENT_AWARE,PREDICTIVE,DEFAULT",
                "X-APE-CACHE-SIZE": "256MB,512MB,128MB,64MB",
                "X-APE-CACHE-PREFETCH": "ENABLED,AUTO,DISABLED,OFF",
                "X-APE-BUFFER-STRATEGY": "ADAPTIVE,STABLE,PREDICTIVE,DEFAULT",
                "X-APE-BUFFER-PRELOAD-SEGMENTS": "4,3,2,1",
                "X-APE-BUFFER-DYNAMIC-ADJUSTMENT": "ENABLED,AUTO,DISABLED,OFF",
                "X-APE-BUFFER-NEURAL-PREDICTION": "DISABLED,OFF,AUTO,FALSE",
                "X-APE-QOS-ENABLED": "AUTO,TRUE,FALSE,DISABLED",
                "X-APE-QOS-DSCP": "CS0,BE,AF21,AF31",
                "X-APE-QOS-PRIORITY": "0,1,2,3",
                "X-APE-POLYMORPHIC-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-POLYMORPHIC-IDEMPOTENT": "TRUE,AUTO,FALSE,DISABLED",
                "X-TELCHEMY-TVQM": "ENABLED,INTERVAL=1000,METRICS=VMAF:PSNR:SSIM,INTERVAL=2000,METRICS=SSIM:PSNR,AUTO,DISABLED",
                "X-TELCHEMY-TR101290": "ENABLED,PRIORITY_1=ALERT,PRIORITY_2=WARN,AUTO,DISABLED",
                "X-TELCHEMY-IMPAIRMENT-GUARD": "ENABLED,BLOCKINESS=DETECT,BLUR=DETECT,AUTO,DISABLED",
                "X-TELCHEMY-BUFFER-POLICY": "ADAPTIVE,MIN=10000000,STABLE,MIN=8000000,AUTO,DEFAULT",
                "X-TELCHEMY-GOP-POLICY": "DETECT,IDEAL=2000,TOLERANCE=500,DETECT,IDEAL=1000,TOLERANCE=250,AUTO,DISABLED",
                "X-APE-CODEC": "H264,HEVC,MPEG2,VP9",
                "X-APE-RESOLUTION": "854x480,640x360,426x240,320x180",
                "X-APE-FPS": "30,25,24,15",
                "X-APE-BITRATE": "2.5,1.88,1.25,0.83",
                "X-APE-TARGET-BITRATE": "2500,1875,1250,825",
                "X-APE-THROUGHPUT-T1": "2.5,2,1.5,1.12",
                "X-APE-THROUGHPUT-T2": "4,3.2,2.4,1.8",
                "X-ExoPlayer-Buffer-Min": "22000000,17600000,13200000,8800000",
                "X-Manifest-Refresh": "22000,16500,11000,7260",
                "X-KODI-LIVE-DELAY": "8,6,4,1",
                "X-APE-STRATEGY": "stable-conservative,conservative,stable,balanced",
                "X-APE-Prefetch-Segments": "4,3,2,1",
                "X-APE-Quality-Threshold": "0.90,0.88,0.85,0.80",
                "X-Tone-Mapping": "off,auto,reinhard,hable",
                "X-HDR-Output-Mode": "sdr,auto,off,tonemap",
                "X-Codec-Support": "h264,hevc,mpeg2,vp9"
            }
        },

        P5: {
            id: "P5",
            name: "SD_FAILSAFE",
            level: 1,
            quality: "SD",
            description: "SD FAILSAFE - Resiliencia extrema para conexiones lentas (7.4 Mbps)",
            color: "#6366f1",
            settings: {
                resolution: "854x480,640x360,426x240",
                buffer: 20000,
                buffer_min: 2000,
                buffer_max: 40000,
                network_cache: 30000,
                live_cache: 30000,
                file_cache: 5000,
                strategy: "ultra-aggressive,adaptive",
                bitrate: 1.5,
                t1: 2.0,
                t2: 2.4,
                playerBuffer: 20000,
                fps: "30,25,24",
                codec: "AV1,H265,H264,MPEG2",
                headersCount: 41,
                prefetch_segments: 200,
                prefetch_parallel: 100,
                prefetch_buffer_target: 300000,
                prefetch_min_bandwidth: 200000000,
                segment_duration: "2,4,6",
                bandwidth_guarantee: 200,
                reconnect_timeout_ms: "5,15,30",
                reconnect_max_attempts: "200,500,1000",
                reconnect_delay_ms: "0,200,500",
                hevc_tier: 'MAIN',
                hevc_level: '4.1,4.0,3.1,3.0',
                hevc_profile: 'MAIN',
                color_space: 'BT709,BT601',
                chroma_subsampling: '4:2:0',
                transfer_function: 'BT1886,BT709',
                matrix_coefficients: 'BT709,BT601',
                compression_level: "1,2",
                sharpen_sigma: "0.05,0.08",
                rate_control: 'VBR,ABR,CBR',
                entropy_coding: 'CABAC,CAVLC',
                video_profile: 'main',
                pixel_format: 'yuv420p'
            },
            vlcopt: {
                "network-caching": "30000,60000,90000",
                "clock-jitter": "0",
                "clock-synchro": "0",
                "live-caching": "30000,60000,90000",
                "file-caching": "5000,10000",
                "http-user-agent": "Mozilla/5.0 (APE-NAVIGATOR; ULTRA-8K-HEVC-MASTER) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 APE-Engine/13.1-P5"
            },
            kodiprop: {
                "inputstream.adaptive.manifest_type": "hls,dash"
            },
            enabledCategories: ["identity", "connection", "cache", "cors", "ape_core", "playback", "codecs", "cdn", "metadata", "extra", "ott_navigator", "streaming_control", "security", "hdr_color", "resolution_advanced", "audio_premium", "parallel_download", "anti_freeze", "abr_control"],
            headerOverrides: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; Roku Express) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36,Mozilla/5.0 (SMART-TV; Linux; Tizen 5.5) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/6.0 TV Safari/537.36,Mozilla/5.0 (Linux; Android 9; AFTMM) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
                "Accept": "application/vnd.apple.mpegurl,audio/mpegurl,application/x-mpegurl,video/mp4,*/*",
                "Accept-Encoding": "gzip,br,deflate,identity",
                "Accept-Language": "es-CO,es-ES,es,en-US",
                "Sec-CH-UA": "\"Google Chrome\";v=\"125\",\"Chromium\";v=\"125\",\"Android WebView\";v=\"125\",\"Not.A/Brand\";v=\"24\"",
                "Sec-CH-UA-Mobile": "?0,?1,?0,?0",
                "Sec-CH-UA-Platform": "\"Android\",\"Windows\",\"Tizen\",\"Linux\"",
                "Sec-CH-UA-Full-Version-List": "\"Google Chrome\";v=\"125.0.0.0\",\"Chromium\";v=\"125.0.0.0\",\"Android WebView\";v=\"125.0.0.0\",\"Not.A/Brand\";v=\"24.0.0.0\"",
                "Sec-CH-UA-Arch": "arm,x86,x86_64,arm64",
                "Sec-CH-UA-Bitness": "32,64,64,32",
                "Sec-CH-UA-Model": "\"SHIELD Android TV\",\"BRAVIA\",\"AFTN\",\"\"",
                "Connection": "keep-alive,close",
                "Keep-Alive": "timeout=30, max=1000",
                "Sec-Fetch-Dest": "video,empty,document,media",
                "Sec-Fetch-Mode": "no-cors,cors,navigate,same-origin",
                "Sec-Fetch-Site": "same-origin,same-site,none,cross-site",
                "Sec-Fetch-User": "?1,?0",
                "DNT": "1,0",
                "Sec-GPC": "1,0",
                "Upgrade-Insecure-Requests": "1,0",
                "TE": "trailers,chunked,compress,deflate",
                "Cache-Control": "no-cache,max-age=0,no-store,must-revalidate",
                "Pragma": "no-cache,cache,no-cache,cache",
                "Range": "bytes=0-,bytes=1-,bytes=0-1048575,bytes=0-2097151",
                "If-None-Match": "*",
                "If-Modified-Since": "[HTTP_DATE]",
                "Origin": "https://iptv-ape.duckdns.org",
                "Referer": "https://iptv-ape.duckdns.org/",
                "X-Requested-With": "XMLHttpRequest,fetch,media-request,player",
                "X-App-Version": "APE_9.2_SAFE_COMPAT,APE_9.1_STABLE,APE_9.0_COMPAT,APE_DEFAULT",
                "X-Playback-Session-Id": "[CONFIG_SESSION_ID],[GENERATE_UUID],[TIMESTAMP],session-auto",
                "X-Device-Id": "[GENERATE_UUID],[CONFIG_DEVICE_ID],device-auto,device-default",
                "X-Stream-Type": "hls,dash,cmaf,progressive",
                "X-Quality-Preference": "codec-h264,baseline,main,high;codec-mpeg2,main,simple;codec-hevc,main,main-10;codec-vp9,profile-0,profile-2",
                "Priority": "u=0, i",
                "X-Playback-Rate": "1.0,1.0,1.0,1.0",
                "X-Segment-Duration": "4,6,8,10",
                "X-Min-Buffer-Time": "6,8,10,12",
                "X-Max-Buffer-Time": "12,16,20,24",
                "X-Request-Priority": "normal,auto,low,idle",
                "X-Prefetch-Enabled": "true,adaptive,auto,false",
                "X-Video-Codecs": "h264-baseline,h264,mpeg2,hevc",
                "X-Audio-Codecs": "aac,mp3,ac3,mp2,opus,eac3",
                "X-DRM-Support": "widevine,playready,clearkey,none",
                "X-CDN-Provider": "auto,origin,edge,any",
                "X-Failover-Enabled": "true,adaptive,auto,false",
                "X-Buffer-Size": "8000000",
                "X-Buffer-Target": "6000000",
                "X-Buffer-Min": "3000000",
                "X-Buffer-Max": "16000000",
                "X-Network-Caching": "8000000,6400000,4800000,3200000",
                "X-Live-Caching": "6000000,4800000,3600000,2400000",
                "X-File-Caching": "15000000,12000000,9000000,6000000",
                "X-Client-Timestamp": "[TIMESTAMP],[UNIX_MS],[UNIX_S],auto",
                "X-Request-Id": "[GENERATE_UUID],[CONFIG_REQUEST_ID],[TIMESTAMP],request-auto",
                "X-Device-Type": "smart-tv,android-tv,set-top-box,desktop",
                "X-Screen-Resolution": "640x360,426x240,320x180,256x144",
                "X-Network-Type": "wifi,ethernet,5g,4g",
                "Accept-Charset": "utf-8,iso-8859-1;q=0.9,utf-16;q=0.2,*;q=0.1",
                "X-Buffer-Strategy": "adaptive,stable,predictive,default",
                "Accept-CH": "DPR,Viewport-Width,Width,Downlink",
                "X-OTT-Navigator-Version": "1.7.0.0-safe,1.7.0.0-stable,1.6.9.0,default",
                "X-Player-Type": "exoplayer,vlc,media3,html5",
                "X-Hardware-Decode": "true,auto,false,default",
                "X-Tunneling-Enabled": "off,auto,false,disabled",
                "X-Audio-Track-Selection": "default,original,auto,first",
                "X-Subtitle-Track-Selection": "off,default,auto,forced",
                "X-EPG-Sync": "enabled,auto,incremental,default",
                "X-Catchup-Support": "flussonic,xc,stalker,none",
                "X-Bandwidth-Estimation": "adaptive,balanced,conservative,aggressive",
                "X-Initial-Bitrate": "1500000,1125000,750000,375000",
                "X-Retry-Count": "5,4,3,2",
                "X-Retry-Delay-Ms": "200,400,800,1500",
                "X-Connection-Timeout-Ms": "3500,6000,8000,10000",
                "X-Read-Timeout-Ms": "8000,11000,14000,18000",
                "X-Country-Code": "CO,US,ES,MX",
                "X-HDR-Support": "sdr,off,auto,hlg",
                "X-Color-Depth": "8bit,auto,10bit,12bit",
                "X-Color-Space": "bt601,bt709,srgb,bt2020",
                "X-Dynamic-Range": "sdr,off,auto,hlg",
                "X-HDR-Transfer-Function": "bt1886,gamma22,srgb,arib-std-b67",
                "X-Color-Primaries": "bt601,bt709,srgb,bt2020",
                "X-Matrix-Coefficients": "bt601,bt709,identity,bt2020nc",
                "X-Chroma-Subsampling": "4:2:0,4:2:2,4:4:4,auto",
                "X-HEVC-Tier": "HIGH,MAIN,AUTO,COMPAT",
                "X-HEVC-Level": "3.0,3.1,4.0,4.1",
                "X-HEVC-Profile": "MAIN,AUTO,MAIN-10,BASELINE",
                "X-Video-Profile": "baseline,main,high,main-10",
                "X-Rate-Control": "VBR,CBR,CRF,AUTO",
                "X-Entropy-Coding": "CABAC,CAVLC,AUTO,DEFAULT",
                "X-Compression-Level": "1,2,3,4",
                "X-Pixel-Format": "yuv420p,nv12,yuv420p10le,p010le",
                "X-Sharpen-Sigma": "0.02,0.03,0.02,0.00",
                "X-Max-Resolution": "640x360,426x240,320x180,256x144",
                "X-Max-Bitrate": "2500000,1800000,1200000,800000",
                "X-Frame-Rates": "30,25,24,15",
                "X-Aspect-Ratio": "16:9,21:9,4:3,auto",
                "X-Pixel-Aspect-Ratio": "1:1,auto,4:3,16:15",
                "X-Dolby-Atmos": "auto,true,false,disabled",
                "X-Audio-Channels": "2.0,5.1,1.0,7.1",
                "X-Audio-Sample-Rate": "48000,44100,32000,22050",
                "X-Audio-Bit-Depth": "16bit,24bit,32bit,float",
                "X-Spatial-Audio": "auto,true,false,disabled",
                "X-Audio-Passthrough": "auto,true,false,disabled",
                "X-Parallel-Segments": "2,2,1,1",
                "X-Prefetch-Segments": "3,2,1,1",
                "X-Segment-Preload": "true,adaptive,auto,false",
                "X-Concurrent-Downloads": "2,2,1,1",
                "X-Reconnect-On-Error": "true,adaptive,immediate,false",
                "X-Max-Reconnect-Attempts": "40,20,10,5",
                "X-Reconnect-Delay-Ms": "100,250,500,1000",
                "X-Buffer-Underrun-Strategy": "aggressive-refill,fast-refill,stable-refill,rebuffer-safe",
                "X-Seamless-Failover": "true,adaptive,auto,false",
                "X-Bandwidth-Preference": "conservative,balanced,auto,low",
                "X-BW-Estimation-Window": "4,6,8,10",
                "X-BW-Confidence-Threshold": "0.80,0.75,0.70,0.65",
                "X-BW-Smooth-Factor": "0.20,0.25,0.30,0.35",
                "X-Packet-Loss-Monitor": "enabled,adaptive,basic,disabled",
                "X-RTT-Monitoring": "enabled,adaptive,basic,disabled",
                "X-Congestion-Detect": "enabled,adaptive,basic,disabled",
                "X-CORTEX-OMEGA-STATE": "ACTIVE,STABLE,MONITORING,DEFAULT",
                "X-APE-AI-SR-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-AI-SR-MODEL": "LANCZOS,BICUBIC,FSRCNNX,OFF",
                "X-APE-AI-SR-SCALE": "1,1.5,2,auto",
                "X-APE-AI-FRAME-INTERPOLATION": "OFF,AUTO,FRAME_BLEND,MOTION_ADAPTIVE",
                "X-APE-AI-DENOISING": "NLMEANS,LOW,OFF,AUTO",
                "X-APE-AI-DEBLOCKING": "ADAPTIVE,LOW,OFF,AUTO",
                "X-APE-AI-SHARPENING": "ADAPTIVE,LOW,OFF,AUTO",
                "X-APE-AI-ARTIFACT-REMOVAL": "AUTO,ENABLED,LOW,OFF",
                "X-APE-AI-COLOR-ENHANCEMENT": "AUTO,ENABLED,LOW,OFF",
                "X-APE-AI-HDR-UPCONVERT": "OFF,AUTO,DISABLED,SDR",
                "X-APE-AI-SCENE-DETECTION": "AUTO,ENABLED,BASIC,OFF",
                "X-APE-AI-MOTION-ESTIMATION": "AUTO,FRAME_DIFFERENCE,DISABLED,OFF",
                "X-APE-AI-CONTENT-AWARE-ENCODING": "AUTO,ENABLED,BASIC,OFF",
                "X-APE-AI-PERCEPTUAL-QUALITY": "VMAF_90,VMAF_88,SSIM_GOOD,PSNR_GOOD",
                "X-APE-LCEVC-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-LCEVC-PHASE": "1,2,3,4",
                "X-APE-LCEVC-COMPUTE-PRECISION": "AUTO,FP16,FP32,INT8",
                "X-APE-LCEVC-UPSCALE-ALGORITHM": "LANCZOS,BICUBIC,BILINEAR,AUTO",
                "X-APE-LCEVC-ROI-DYNAMIC": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-LCEVC-TRANSPORT": "CMAF_LAYER,FMP4,HLS,DASH",
                "X-APE-LCEVC-SDK-ENABLED": "AUTO,FALSE,TRUE,DISABLED",
                "X-APE-LCEVC-SDK-TARGET": "HTML5_NATIVE,ANDROID_NATIVE,TV_NATIVE,AUTO",
                "X-APE-LCEVC-SDK-WEB-INTEROP": "DISABLED,JS_BRIDGE,AUTO,OFF",
                "X-APE-LCEVC-SDK-DECODER": "AUTO,WASM+WEBGL,NATIVE,OFF",
                "X-APE-GPU-DECODE": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-GPU-RENDER": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-GPU-PIPELINE": "DECODE_RENDER,DECODE_SCALE_RENDER,AUTO,SOFTWARE",
                "X-APE-GPU-PRECISION": "AUTO,FP16,FP32,INT8",
                "X-APE-GPU-MEMORY-POOL": "AUTO,VRAM_PREFERRED,SYSTEM_SHARED,DEFAULT",
                "X-APE-GPU-ZERO-COPY": "AUTO,ENABLED,DISABLED,OFF",
                "X-APE-VVC-ENABLED": "FALSE,AUTO,DISABLED,OFF",
                "X-APE-EVC-ENABLED": "FALSE,AUTO,DISABLED,OFF",
                "X-APE-PLAYER-ENSLAVEMENT-PROTOCOL": "STANDARD,SAFE,COMPATIBLE,DEFAULT",
                "X-APE-PLAYER-ENSLAVEMENT-OVERRIDE-CODEC": "FALSE,AUTO,TRUE,DEFAULT",
                "X-APE-RESILIENCE-L1-FORMAT": "HLS_TS,HLS_FMP4,DASH,PROGRESSIVE_MP4",
                "X-APE-RESILIENCE-L2-FORMAT": "HLS_FMP4,HLS_TS,DASH,PROGRESSIVE_MP4",
                "X-APE-RESILIENCE-L3-FORMAT": "PROGRESSIVE_MP4,HLS_TS,HLS_FMP4,DASH",
                "X-APE-RESILIENCE-HTTP-ERROR-403": "STOP,REFRESH_MANIFEST,RETRY_BACKOFF,FAIL_SAFE",
                "X-APE-RESILIENCE-HTTP-ERROR-404": "REFRESH_PLAYLIST,RETRY_BACKOFF,ORIGIN_RETRY,STOP",
                "X-APE-RESILIENCE-HTTP-ERROR-429": "BACKOFF,RETRY_AFTER,LOWER_CONCURRENCY,STOP",
                "X-APE-RESILIENCE-HTTP-ERROR-500": "RETRY_BACKOFF,REFRESH_MANIFEST,RECONNECT,STOP",
                "X-APE-AV1-FALLBACK-ENABLED": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-AV1-FALLBACK-CHAIN": "H264>MPEG2>HEVC>VP9",
                "X-APE-ISP-THROTTLE-ESCALATION-POLICY": "ADAPTIVE_BACKOFF,REDUCE_BITRATE,EXTEND_BUFFER,DEFAULT",
                "X-APE-ANTI-CUT-ENGINE": "LOCAL_BUFFER_PROTECTION,SEAMLESS_RETRY,DISABLED,OFF",
                "X-APE-ANTI-CUT-DETECTION": "STALL_REBUFFER,SEGMENT_TIMEOUT,PLAYLIST_DRIFT,DISABLED",
                "X-APE-ANTI-CUT-ISP-STRANGLE": "MONITOR,OFF,OFF,OFF",
                "X-APE-RECONNECT-MAX": "40,20,10,5",
                "X-APE-RECONNECT-SEAMLESS": "TRUE,AUTO,FALSE,DISABLED",
                "X-APE-IDENTITY-MORPH": "DISABLED,OFF,NONE,STATIC",
                "X-APE-IDENTITY-ROTATION-INTERVAL": "0,0,0,0",
                "X-APE-EVASION-MODE": "DISABLED,OFF,NONE,STANDARD",
                "X-APE-EVASION-DNS-OVER-HTTPS": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-SNI-OBFUSCATION": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-TLS-FINGERPRINT-RANDOMIZE": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-EVASION-GEO-PHANTOM": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-EVASION-DEEP-PACKET-INSPECTION-BYPASS": "DISABLED,OFF,FALSE,AUTO",
                "X-APE-IP-ROTATION-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-IP-ROTATION-STRATEGY": "NONE,DISABLED,OFF,DEFAULT",
                "X-APE-STEALTH-UA": "STATIC,COMPATIBLE,AUTO,DEFAULT",
                "X-APE-STEALTH-XFF": "OFF,DISABLED,STATIC,DEFAULT",
                "X-APE-STEALTH-FINGERPRINT": "STATIC,COMPATIBLE,AUTO,DEFAULT",
                "X-APE-SWARM-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-SWARM-PEERS": "0,0,0,0",
                "X-APE-TRANSPORT-PROTOCOL": "HLS_TS,HLS_FMP4,DASH,PROGRESSIVE_MP4",
                "X-APE-TRANSPORT-CHUNK-SIZE": "500MS,1S,2S,4S",
                "X-APE-TRANSPORT-FALLBACK-1": "HLS_FMP4,HLS_TS,DASH,PROGRESSIVE_MP4",
                "X-APE-CACHE-STRATEGY": "ADAPTIVE,SEGMENT_AWARE,PREDICTIVE,DEFAULT",
                "X-APE-CACHE-SIZE": "256MB,512MB,128MB,64MB",
                "X-APE-CACHE-PREFETCH": "ENABLED,AUTO,DISABLED,OFF",
                "X-APE-BUFFER-STRATEGY": "ADAPTIVE,STABLE,PREDICTIVE,DEFAULT",
                "X-APE-BUFFER-PRELOAD-SEGMENTS": "3,2,1,1",
                "X-APE-BUFFER-DYNAMIC-ADJUSTMENT": "ENABLED,AUTO,DISABLED,OFF",
                "X-APE-BUFFER-NEURAL-PREDICTION": "DISABLED,OFF,AUTO,FALSE",
                "X-APE-QOS-ENABLED": "AUTO,TRUE,FALSE,DISABLED",
                "X-APE-QOS-DSCP": "CS0,BE,AF21,AF31",
                "X-APE-QOS-PRIORITY": "0,1,2,3",
                "X-APE-POLYMORPHIC-ENABLED": "FALSE,DISABLED,OFF,AUTO",
                "X-APE-POLYMORPHIC-IDEMPOTENT": "TRUE,AUTO,FALSE,DISABLED",
                "X-TELCHEMY-TVQM": "ENABLED,INTERVAL=1000,METRICS=VMAF:PSNR:SSIM,INTERVAL=2000,METRICS=SSIM:PSNR,AUTO,DISABLED",
                "X-TELCHEMY-TR101290": "ENABLED,PRIORITY_1=ALERT,PRIORITY_2=WARN,AUTO,DISABLED",
                "X-TELCHEMY-IMPAIRMENT-GUARD": "ENABLED,BLOCKINESS=DETECT,BLUR=DETECT,AUTO,DISABLED",
                "X-TELCHEMY-BUFFER-POLICY": "ADAPTIVE,MIN=8000000,STABLE,MIN=6400000,AUTO,DEFAULT",
                "X-TELCHEMY-GOP-POLICY": "DETECT,IDEAL=2000,TOLERANCE=500,DETECT,IDEAL=1000,TOLERANCE=250,AUTO,DISABLED",
                "X-APE-CODEC": "H264,MPEG2,HEVC,VP9",
                "X-APE-RESOLUTION": "640x360,426x240,320x180,256x144",
                "X-APE-FPS": "30,25,24,15",
                "X-APE-BITRATE": "1.5,1.12,0.75,0.49",
                "X-APE-TARGET-BITRATE": "1500,1125,750,495",
                "X-APE-THROUGHPUT-T1": "1.5,1.2,0.9,0.68",
                "X-APE-THROUGHPUT-T2": "2.5,2,1.5,1.12",
                "X-ExoPlayer-Buffer-Min": "15000000,12000000,9000000,6000000",
                "X-Manifest-Refresh": "15000,11250,7500,5000",
                "X-KODI-LIVE-DELAY": "6,4,3,1",
                "X-APE-STRATEGY": "conservative,stable,balanced,adaptive",
                "X-APE-Prefetch-Segments": "3,2,1,1",
                "X-APE-Quality-Threshold": "0.90,0.88,0.85,0.80",
                "X-Tone-Mapping": "off,auto,reinhard,hable",
                "X-HDR-Output-Mode": "sdr,off,auto,tonemap",
                "X-Codec-Support": "h264,mpeg2,hevc,vp9"
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════
    // VALORES DEFAULT DE HEADERS
    // ═══════════════════════════════════════════════════════════════════════
    const DEFAULT_HEADER_VALUES = {
        // Identity
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
        "Sec-CH-UA": '"Google Chrome";v="125", "Chromium";v="125"',
        "Sec-CH-UA-Mobile": "?0",
        "Sec-CH-UA-Platform": '"Windows"',
        "Sec-CH-UA-Full-Version-List": '"Google Chrome";v="125.0.6422.142"',
        "Sec-CH-UA-Arch": "x86",
        "Sec-CH-UA-Bitness": "64",
        "Sec-CH-UA-Model": '""',

        // Connection
        "Connection": "keep-alive",
        "Keep-Alive": "timeout=30, max=100",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-User": "?1",
        "DNT": "1",
        "Sec-GPC": "1",
        "Upgrade-Insecure-Requests": "1",
        "TE": "trailers",

        // Cache
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Range": "bytes=0-",
        "If-None-Match": "*",
        "If-Modified-Since": "[HTTP_DATE]",

        // Origin & Referer
        "Origin": "http://line.tivi-ott.net",
        "Referer": "http://line.tivi-ott.net/",
        "X-Requested-With": "XMLHttpRequest",

        // APE Core
        "X-App-Version": "APE_9.0_ULTIMATE",
        "X-Playback-Session-Id": "[CONFIG_SESSION_ID]",
        "X-Device-Id": "[GENERATE_UUID]",
        "X-Stream-Type": "hls",
        "X-Quality-Preference": "auto",

        // Playback
        "Priority": "u=1, i",
        "X-Playback-Rate": "1.0",
        "X-Segment-Duration": "6",
        "X-Min-Buffer-Time": "20",
        "X-Max-Buffer-Time": "60",
        "X-Request-Priority": "high",
        "X-Prefetch-Enabled": "true",

        // Codecs
        "X-Video-Codecs": "h264,hevc,vp9,av1",
        "X-Audio-Codecs": "aac,mp3,opus,ac3,eac3",
        "X-DRM-Support": "widevine,playready",

        // CDN
        "X-CDN-Provider": "auto",
        "X-Failover-Enabled": "true",
        "X-Buffer-Size": "8192",
        "X-Buffer-Target": "30000",
        "X-Buffer-Min": "3000",
        "X-Buffer-Max": "60000",
        "X-Network-Caching": "60000",
        "X-Live-Caching": "60000",
        "X-File-Caching": "30000",

        // Metadata
        "X-Client-Timestamp": "[TIMESTAMP]",
        "X-Request-Id": "[GENERATE_UUID]",
        "X-Device-Type": "smart-tv",
        "X-Screen-Resolution": "1920x1080",
        "X-Network-Type": "wifi",

        // Extra SUPREMO
        "Accept-Charset": "utf-8, iso-8859-1;q=0.5",
        "X-Buffer-Strategy": "adaptive",
        "Accept-CH": "DPR, Viewport-Width, Width, Device-Memory, RTT, Downlink, ECT",

        // OTT Navigator & Player Compatibility (8)
        "X-OTT-Navigator-Version": "1.7.0.0",
        "X-Player-Type": "exoplayer",
        "X-Hardware-Decode": "true",
        "X-Tunneling-Enabled": "off",
        "X-Audio-Track-Selection": "default",
        "X-Subtitle-Track-Selection": "off",
        "X-EPG-Sync": "enabled",
        "X-Catchup-Support": "flussonic",

        // Advanced Streaming Control (6)
        "X-Bandwidth-Estimation": "auto",
        "X-Initial-Bitrate": "highest",
        "X-Retry-Count": "3",
        "X-Retry-Delay-Ms": "1000",
        "X-Connection-Timeout-Ms": "15000",
        "X-Read-Timeout-Ms": "30000",

        "X-Country-Code": "US",

        // ═══════════════════════════════════════════════════════════════════
        // HEADERS DE CALIDAD VISUAL (27 headers)
        // ═══════════════════════════════════════════════════════════════════

        // HDR & Color (8)
        "X-HDR-Support": "hdr10,hdr10+,dolby-vision,hlg",
        "X-Color-Depth": "10bit,12bit",
        "X-Color-Space": "bt2020,p3,rec709",
        "X-Dynamic-Range": "hdr",
        "X-HDR-Transfer-Function": "pq,hlg",
        "X-Color-Primaries": "bt2020",
        "X-Matrix-Coefficients": "bt2020nc",
        "X-Chroma-Subsampling": "4:2:0,4:2:2,4:4:4",

        // HEVC/H.265 Optimization (8)
        "X-HEVC-Tier": "HIGH",
        "X-HEVC-Level": "5.1",
        "X-HEVC-Profile": "MAIN-10",
        "X-Video-Profile": "main10",
        "X-Rate-Control": "VBR",
        "X-Entropy-Coding": "CABAC",
        "X-Compression-Level": "1",
        "X-Sharpen-Sigma": "0.05",
        "X-Pixel-Format": "yuv420p10le",

        // Resolución Avanzada (5)
        "X-Max-Resolution": "7680x4320",
        "X-Max-Bitrate": "100000000",
        "X-Frame-Rates": "24,25,30,50,60,120",
        "X-Aspect-Ratio": "16:9,21:9",
        "X-Pixel-Aspect-Ratio": "1:1",

        // Audio Premium (6)
        "X-Dolby-Atmos": "true",
        "X-Audio-Channels": "7.1,5.1,2.0",
        "X-Audio-Sample-Rate": "48000,96000",
        "X-Audio-Bit-Depth": "24bit",
        "X-Spatial-Audio": "true",
        "X-Audio-Passthrough": "true",

        // Descarga Paralela (4)
        "X-Parallel-Segments": "4",
        "X-Prefetch-Segments": "3",
        "X-Segment-Preload": "true",
        "X-Concurrent-Downloads": "4",

        // Anti-Corte (5)
        "X-Reconnect-On-Error": "true",
        "X-Max-Reconnect-Attempts": "10",
        "X-Reconnect-Delay-Ms": "100",
        "X-Buffer-Underrun-Strategy": "rebuffer",
        "X-Seamless-Failover": "true",

        // ═══════════════════════════════════════════════════════════════════
        // HEADERS DE CONTROL ABR AVANZADO (7 headers)
        // ═══════════════════════════════════════════════════════════════════

        "X-Bandwidth-Preference": "unlimited",
        "X-BW-Estimation-Window": "10",
        "X-BW-Confidence-Threshold": "0.85",
        "X-BW-Smooth-Factor": "0.15",
        "X-Packet-Loss-Monitor": "enabled",
        "X-RTT-Monitoring": "enabled",
        "X-Congestion-Detect": "enabled",

        // ═══════════════════════════════════════════════════════════════════
        // OMEGA GOD-TIER DEFAULTS (85 HEADERS)
        // ═══════════════════════════════════════════════════════════════════
        // CORTEX AI
        "X-CORTEX-OMEGA-STATE": "ACTIVE_DOMINANT",
        "X-APE-AI-SR-ENABLED": "TRUE",
        "X-APE-AI-SR-MODEL": "REALESRGAN_X4PLUS",
        "X-APE-AI-SR-SCALE": "4",
        "X-APE-AI-DENOISING": "NLMEANS_HQDN3D_TEMPORAL",
        "X-APE-AI-DEBLOCKING": "ADAPTIVE_MAX",
        "X-APE-AI-SHARPENING": "UNSHARP_MASK_ADAPTIVE",
        "X-APE-AI-ARTIFACT-REMOVAL": "ENABLED",
        "X-APE-AI-COLOR-ENHANCEMENT": "ENABLED",
        "X-APE-AI-HDR-UPCONVERT": "ENABLED",
        "X-APE-AI-SCENE-DETECTION": "ENABLED",
        "X-APE-AI-MOTION-ESTIMATION": "OPTICAL_FLOW",
        "X-APE-AI-CONTENT-AWARE-ENCODING": "ENABLED",
        "X-APE-AI-PERCEPTUAL-QUALITY": "VMAF_98",
        
        // LCEVC & SDK
        "X-APE-LCEVC-ENABLED": "TRUE",
        "X-APE-LCEVC-PHASE": "4",
        "X-APE-LCEVC-COMPUTE-PRECISION": "FP32",
        "X-APE-LCEVC-UPSCALE-ALGORITHM": "LANCZOS4",
        "X-APE-LCEVC-ROI-DYNAMIC": "ENABLED",
        "X-APE-LCEVC-TRANSPORT": "CMAF_LAYER",
        "X-APE-LCEVC-SDK-ENABLED": "TRUE",
        "X-APE-LCEVC-SDK-TARGET": "HTML5_NATIVE",
        "X-APE-LCEVC-SDK-WEB-INTEROP": "BI_DIRECTIONAL_JS_TUNNEL",
        "X-APE-LCEVC-SDK-DECODER": "WASM+WEBGL",
        
        // HARDWARE
        "X-APE-GPU-DECODE": "ENABLED",
        "X-APE-GPU-RENDER": "ENABLED",
        "X-APE-GPU-PIPELINE": "DECODE_ITM_LCEVC_AI_SR_DENOISE_TONEMAP_RENDER",
        "X-APE-GPU-PRECISION": "FP32",
        "X-APE-GPU-MEMORY-POOL": "VRAM_ONLY",
        "X-APE-GPU-ZERO-COPY": "ENABLED",
        "X-APE-VVC-ENABLED": "TRUE",
        "X-APE-EVC-ENABLED": "TRUE",
        "X-APE-PLAYER-ENSLAVEMENT-PROTOCOL": "OMEGA_ABSOLUTE",
        "X-APE-PLAYER-ENSLAVEMENT-OVERRIDE-CODEC": "TRUE",
        
        // RESILIENCE
        "X-APE-RESILIENCE-L1-FORMAT": "CMAF",
        "X-APE-RESILIENCE-L2-FORMAT": "HLS_FMP4",
        "X-APE-RESILIENCE-L3-FORMAT": "HLS_FMP4",
        "X-APE-RESILIENCE-HTTP-ERROR-403": "MORPH_IDENTITY",
        "X-APE-RESILIENCE-HTTP-ERROR-404": "FALLBACK_ORIGIN",
        "X-APE-RESILIENCE-HTTP-ERROR-429": "SWARM_EVASION",
        "X-APE-RESILIENCE-HTTP-ERROR-500": "RECONNECT_SILENT",
        "X-APE-AV1-FALLBACK-ENABLED": "TRUE",
        "X-APE-AV1-FALLBACK-CHAIN": "AV1>HEVC>H264>MPEG2",
        "X-APE-ISP-THROTTLE-ESCALATION-POLICY": "NUCLEAR_ESCALATION_NEVER_DOWN",
        "X-APE-ANTI-CUT-ENGINE": "ENABLED",
        "X-APE-ANTI-CUT-DETECTION": "REAL_TIME",
        "X-APE-ANTI-CUT-ISP-STRANGLE": "NUCLEAR_10_LEVELS",
        "X-APE-RECONNECT-MAX": "UNLIMITED",
        "X-APE-RECONNECT-SEAMLESS": "TRUE",
        
        // STEALTH
        "X-APE-IDENTITY-MORPH": "ENABLED",
        "X-APE-IDENTITY-ROTATION-INTERVAL": "30",
        "X-APE-EVASION-MODE": "SWARM_PHANTOM_HYDRA_STEALTH",
        "X-APE-EVASION-DNS-OVER-HTTPS": "ENABLED",
        "X-APE-EVASION-SNI-OBFUSCATION": "ENABLED",
        "X-APE-EVASION-TLS-FINGERPRINT-RANDOMIZE": "TRUE",
        "X-APE-EVASION-GEO-PHANTOM": "ENABLED",
        "X-APE-EVASION-DEEP-PACKET-INSPECTION-BYPASS": "ENABLED",
        "X-APE-IP-ROTATION-ENABLED": "TRUE",
        "X-APE-IP-ROTATION-STRATEGY": "PER_REQUEST",
        "X-APE-STEALTH-UA": "RANDOMIZED",
        "X-APE-STEALTH-XFF": "DYNAMIC",
        "X-APE-STEALTH-FINGERPRINT": "MUTATING",
        "X-APE-SWARM-ENABLED": "TRUE",
        "X-APE-SWARM-PEERS": "20",
        
        // TRANSPORT
        "X-APE-TRANSPORT-PROTOCOL": "CMAF_UNIVERSAL",
        "X-APE-TRANSPORT-CHUNK-SIZE": "200MS",
        "X-APE-TRANSPORT-FALLBACK-1": "HLS_FMP4",
        "X-APE-CACHE-STRATEGY": "PREDICTIVE_NEURAL",
        "X-APE-CACHE-SIZE": "1GB",
        "X-APE-CACHE-PREFETCH": "ENABLED",
        "X-APE-BUFFER-STRATEGY": "ADAPTIVE_PREDICTIVE_NEURAL",
        "X-APE-BUFFER-PRELOAD-SEGMENTS": "10",
        "X-APE-BUFFER-DYNAMIC-ADJUSTMENT": "ENABLED",
        "X-APE-BUFFER-NEURAL-PREDICTION": "ENABLED",
        
        // QOS / TELCHEMY
        "X-APE-QOS-ENABLED": "TRUE",
        "X-APE-QOS-DSCP": "EF",
        "X-APE-QOS-PRIORITY": "7",
        "X-APE-POLYMORPHIC-ENABLED": "TRUE",
        "X-APE-POLYMORPHIC-IDEMPOTENT": "TRUE",
        "X-TELCHEMY-TVQM": "ENABLED,INTERVAL=1000,METRICS=VMAF:PSNR:SSIM",
        "X-TELCHEMY-TR101290": "ENABLED,PRIORITY_1=ALERT",
        "X-TELCHEMY-IMPAIRMENT-GUARD": "ENABLED,BLOCKINESS=DETECT,BLUR=DETECT",
        "X-TELCHEMY-BUFFER-POLICY": "ADAPTIVE,MIN=30000",
        "X-TELCHEMY-GOP-POLICY": "DETECT,IDEAL=2000,TOLERANCE=500"
    };

    const DEFAULT_MANIFEST = {
        version: "13.1.0-SUPREMO",
        jwtExpiration: "365_DAYS",
        multilayer: "EXTVLCOPT,KODIPROP,EXTHTTP,EXT-X-STREAM-INF,EXT-X-APE,EXT-X-START,JWT",
        matrixType: "65_HEADERS_BY_PERFIL"
    };

    // ═══════════════════════════════════════════════════════════════════════
    // HEADERS ESTRATÉGICOS - MODO MANUAL/DINÁMICO
    // ═══════════════════════════════════════════════════════════════════════
    // Por defecto: DYNAMIC (usa valores estratégicos del generador M3U8)
    // Si se cambia a MANUAL: usa el valor personalizado del Frontend
    const STRATEGIC_HEADERS_CONFIG = {
        'User-Agent': {
            mode: 'DYNAMIC',  // DYNAMIC = OTT Navigator/1.6.9.4 (evasión), MANUAL = valor custom
            dynamicValue: 'OTT Navigator/1.6.9.4 (Build 40936) AppleWebKit/606',
            manualValue: '',
            description: 'User-Agent para evasión de bloqueos ISP'
        },
        'X-Forwarded-For': {
            mode: 'DYNAMIC',  // DYNAMIC = detectar IP real, MANUAL = IP fija
            dynamicValue: '[AUTO_DETECT]',
            manualValue: '',
            description: 'IP para proxy/CDN bypass'
        },
        'X-Real-IP': {
            mode: 'DYNAMIC',  // DYNAMIC = detectar IP real, MANUAL = IP fija
            dynamicValue: '[AUTO_DETECT]',
            manualValue: '',
            description: 'IP real del cliente'
        },
        'Sec-CH-UA': {
            mode: 'DYNAMIC',  // DYNAMIC = generar dinámico, MANUAL = valor fijo
            dynamicValue: '[GENERATE]',
            manualValue: '',
            description: 'Client Hints User-Agent'
        }
    };

    const STRATEGIC_HEADERS_STORAGE_KEY = 'ape_strategic_headers_v9';

    // ═══════════════════════════════════════════════════════════════════════
    // CLASE PRINCIPAL
    // ═══════════════════════════════════════════════════════════════════════
    class APEProfilesConfig {
        constructor() {
            this.categories = HEADER_CATEGORIES;
            this.defaultHeaderValues = DEFAULT_HEADER_VALUES;
            this.profiles = this._load() || JSON.parse(JSON.stringify(DEFAULT_PROFILES));
            this.manifest = this._loadManifest() || JSON.parse(JSON.stringify(DEFAULT_MANIFEST));

            // 🔄 Auto-migration v12.0 ELITE: upgrade old multilayer to 7-layer strategy
            const CURRENT_MULTILAYER = DEFAULT_MANIFEST.multilayer;
            if (this.manifest.multilayer && this.manifest.multilayer !== CURRENT_MULTILAYER) {
                if (this.manifest.multilayer.includes('PIPE_HEADERS') || !this.manifest.multilayer.includes('EXT-X-STREAM-INF')) {
                    console.log(`🔄 [Migration] Multilayer upgraded: "${this.manifest.multilayer}" → "${CURRENT_MULTILAYER}"`);
                    this.manifest.multilayer = CURRENT_MULTILAYER;
                    try { localStorage.setItem(MANIFEST_STORAGE_KEY, JSON.stringify(this.manifest)); } catch (e) { }
                }
            }

            this.strategicHeaders = this._loadStrategicHeaders() || JSON.parse(JSON.stringify(STRATEGIC_HEADERS_CONFIG));
        }

        /**
         * Carga perfiles desde localStorage
         */
        _load() {
            try {
                const data = localStorage.getItem(STORAGE_KEY);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                console.error('⚠️ Error cargando perfiles, usando defaults:', e);
                return null;
            }
        }

        /**
         * Carga configuración del manifiesto desde localStorage
         */
        _loadManifest() {
            try {
                const data = localStorage.getItem(MANIFEST_STORAGE_KEY);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                console.error('⚠️ Error cargando configuración del manifiesto, usando defaults:', e);
                return null;
            }
        }

        /**
         * Carga headers estratégicos desde localStorage
         */
        _loadStrategicHeaders() {
            try {
                const data = localStorage.getItem(STRATEGIC_HEADERS_STORAGE_KEY);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                console.error('⚠️ Error cargando headers estratégicos, usando defaults:', e);
                return null;
            }
        }

        /**
         * Guarda perfiles, manifiesto y headers estratégicos en storage
         */
        save() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profiles));
            localStorage.setItem(MANIFEST_STORAGE_KEY, JSON.stringify(this.manifest));
            localStorage.setItem(STRATEGIC_HEADERS_STORAGE_KEY, JSON.stringify(this.strategicHeaders));
            console.log('💾 Perfiles APE v9.0, Manifiesto y Headers Estratégicos guardados');
        }

        /**
         * Obtiene la configuración de un header estratégico
         * @param {string} headerName - Nombre del header (ej: 'User-Agent')
         * @returns {Object} - {mode, dynamicValue, manualValue, description}
         */
        getStrategicHeader(headerName) {
            return this.strategicHeaders[headerName] || null;
        }

        /**
         * Obtiene el valor efectivo de un header estratégico (según su modo)
         * @param {string} headerName - Nombre del header
         * @returns {string} - Valor a usar (dinámico o manual según modo)
         */
        getStrategicHeaderEffectiveValue(headerName) {
            const config = this.strategicHeaders[headerName];
            if (!config) return null;
            return config.mode === 'MANUAL' ? config.manualValue : config.dynamicValue;
        }

        /**
         * Cambia el modo de un header estratégico (DYNAMIC/MANUAL)
         * @param {string} headerName - Nombre del header
         * @param {string} mode - 'DYNAMIC' o 'MANUAL'
         */
        setStrategicHeaderMode(headerName, mode) {
            if (this.strategicHeaders[headerName]) {
                this.strategicHeaders[headerName].mode = mode;
                this.save();
                console.log(`🔄 ${headerName}: modo cambiado a ${mode}`);
            }
        }

        /**
         * Establece el valor manual de un header estratégico
         * @param {string} headerName - Nombre del header  
         * @param {string} value - Valor manual personalizado
         */
        setStrategicHeaderManualValue(headerName, value) {
            if (this.strategicHeaders[headerName]) {
                this.strategicHeaders[headerName].manualValue = value;
                this.save();
                console.log(`✏️ ${headerName}: valor manual = "${value}"`);
            }
        }

        /**
         * Obtiene todos los headers estratégicos
         */
        getAllStrategicHeaders() {
            return this.strategicHeaders;
        }

        /**
         * Obtiene un perfil por ID
         */
        getProfile(profileId) {
            return this.profiles[profileId] || null;
        }

        /**
         * Obtiene todos los perfiles
         */
        getAllProfiles() {
            return this.profiles;
        }

        /**
         * Calcula el total de píxeles desde una cadena de resolución en crudo (ej: "3840x2160")
         * @param {string} resString
         * @returns {number}
         */
        _computeResolutionPixels(resString) {
            if (!resString) return 0;
            const parts = resString.toLowerCase().split('x');
            if (parts.length === 2) {
                const w = parseInt(parts[0], 10);
                const h = parseInt(parts[1], 10);
                if (!isNaN(w) && !isNaN(h)) return w * h;
            }
            return 0;
        }

        /**
         * 📊 OMEGA ABSOLUTE: Retorna los perfiles estrictamente ordenados matemáticamente
         * de mayor resolución (Top Tier) a menor resolución (Degradation Fallback)
         * El ID estático (P0, P1, P2) queda desacoplado del nivel de caída.
         */
        getDegradationHierarchy() {
            const profilesArray = Object.values(this.profiles);
            
            return profilesArray.sort((a, b) => {
                const resA = a.settings?.resolution || '';
                const resB = b.settings?.resolution || '';
                
                const pxA = this._computeResolutionPixels(resA);
                const pxB = this._computeResolutionPixels(resB);
                
                if (pxA === pxB) {
                    return a.id.localeCompare(b.id);
                }
                
                // Descendente: El de más pixeles se sirve primero
                return pxB - pxA;
            });
        }

        /**
         * Actualiza un perfil
         */
        updateProfile(profileId, data) {
            if (this.profiles[profileId]) {
                Object.assign(this.profiles[profileId], data);
                this.save();
                return true;
            }
            return false;
        }

        /**
         * Crea un nuevo perfil (custom)
         */
        createProfile(id, baseProfileId = 'P3') {
            if (this.profiles[id]) {
                console.warn(`Perfil ${id} ya existe`);
                return false;
            }
            const base = JSON.parse(JSON.stringify(this.profiles[baseProfileId] || DEFAULT_PROFILES.P3));
            base.id = id;
            base.name = `Custom ${id}`;
            base.isCustom = true;
            this.profiles[id] = base;
            this.save();
            return true;
        }

        /**
         * Obtiene la configuración del manifiesto
         */
        getManifestConfig() {
            return this.manifest;
        }

        /**
         * Actualiza la configuración del manifiesto
         */
        updateManifestConfig(updates) {
            this.manifest = { ...this.manifest, ...updates };
            this.save();
        }

        /**
         * Restaura la configuración del manifiesto a sus valores por defecto
         */
        resetManifestConfig() {
            this.manifest = JSON.parse(JSON.stringify(DEFAULT_MANIFEST));
            this.save();
        }

        /**
         * Elimina un perfil custom
         */
        deleteProfile(profileId) {
            if (DEFAULT_PROFILES[profileId]) {
                console.warn('No se pueden eliminar perfiles por defecto');
                return false;
            }
            if (this.profiles[profileId]) {
                delete this.profiles[profileId];
                this.save();
                return true;
            }
            return false;
        }

        /**
         * Duplica un perfil
         */
        duplicateProfile(sourceId, newId) {
            const source = this.profiles[sourceId];
            if (!source) return false;

            const copy = JSON.parse(JSON.stringify(source));
            copy.id = newId;
            copy.name = `${source.name} (Copy)`;
            copy.isCustom = true;
            this.profiles[newId] = copy;
            this.save();
            return true;
        }

        /**
         * Restaura un perfil a sus valores por defecto
         */
        resetProfile(profileId) {
            if (DEFAULT_PROFILES[profileId]) {
                this.profiles[profileId] = JSON.parse(JSON.stringify(DEFAULT_PROFILES[profileId]));
                this.save();
                return true;
            }
            return false;
        }

        /**
         * Restaura todos los perfiles por defecto
         */
        resetAll() {
            this.profiles = JSON.parse(JSON.stringify(DEFAULT_PROFILES));
            this.save();
            console.log('🔄 Todos los perfiles restaurados a default');
        }

        /**
         * Obtiene headers habilitados para un perfil
         */
        getEnabledHeaders(profileId) {
            const profile = this.profiles[profileId];
            if (!profile) return [];

            const headers = [];
            for (const catId of profile.enabledCategories || []) {
                const category = this.categories[catId];
                if (category) {
                    headers.push(...category.headers);
                }
            }
            return headers;
        }

        /**
         * Obtiene valor de un header (con override si existe)
         */
        getHeaderValue(profileId, headerName) {
            const profile = this.profiles[profileId];
            if (!profile) return this.defaultHeaderValues[headerName] || '';

            // Check override first
            if (profile.headerOverrides && profile.headerOverrides[headerName] !== undefined) {
                return profile.headerOverrides[headerName];
            }
            return this.defaultHeaderValues[headerName] || '';
        }

        /**
         * Establece override de valor para un header
         */
        setHeaderOverride(profileId, headerName, value) {
            const profile = this.profiles[profileId];
            if (!profile) return false;

            if (!profile.headerOverrides) {
                profile.headerOverrides = {};
            }
            profile.headerOverrides[headerName] = value;
            this.save();
            return true;
        }

        /**
         * Obtiene categorías
         */
        getCategories() {
            return this.categories;
        }

        /**
         * Cuenta headers activos
         */
        countActiveHeaders(profileId) {
            return this.getEnabledHeaders(profileId).length;
        }

        // ═══════════════════════════════════════════════════════════════════════
        // PREFETCH CONFIGURATION METHODS
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Obtiene configuración de prefetch para un perfil
         * @param {string} profileId - ID del perfil (P0-P5)
         * @returns {Object} Configuración de prefetch
         */
        getPrefetchConfig(profileId) {
            const profile = this.profiles[profileId];
            if (!profile) return this._getDefaultPrefetchConfig(profileId);

            // Si no tiene prefetch_config, retornar default
            if (!profile.prefetch_config) {
                return this._getDefaultPrefetchConfig(profileId);
            }

            return profile.prefetch_config;
        }

        /**
         * Obtiene configuración de prefetch por defecto según el perfil
         * @private
         */
        _getDefaultPrefetchConfig(profileId) {
            // Mapeo de estrategia default por perfil
            const defaultStrategyMap = {
                P0: 'ULTRA_AGRESIVO',
                P1: 'AGRESIVO',
                P2: 'AGRESIVO',
                P3: 'BALANCEADO',
                P4: 'BALANCEADO',
                P5: 'CONSERVADOR'
            };

            const strategy = defaultStrategyMap[profileId] || 'BALANCEADO';

            // Obtener valores del preset si está disponible
            if (window.PREFETCH_PRESETS && window.PREFETCH_PRESETS.get(strategy)) {
                const preset = window.PREFETCH_PRESETS.get(strategy);
                return {
                    strategy: strategy,
                    prefetch_segments: preset.prefetch_segments,
                    parallel_downloads: preset.parallel_downloads,
                    buffer_target_seconds: preset.buffer_target_seconds,
                    min_bandwidth_mbps: preset.min_bandwidth_mbps,
                    adaptive_enabled: preset.adaptive_enabled,
                    ai_prediction_enabled: preset.ai_prediction_enabled || false,
                    continuous_prefetch: preset.continuous_prefetch || true
                };
            }

            // Fallback hardcoded si PREFETCH_PRESETS no está cargado
            const defaults = {
                CONSERVADOR: { segments: 15, parallel: 6, buffer: 45, bw: 20 },
                BALANCEADO: { segments: 25, parallel: 10, buffer: 90, bw: 40 },
                AGRESIVO: { segments: 50, parallel: 20, buffer: 150, bw: 70 },
                ULTRA_AGRESIVO: { segments: 90, parallel: 40, buffer: 240, bw: 120 },
                ADAPTATIVO: { segments: 25, parallel: 10, buffer: 90, bw: 40 }
            };

            const d = defaults[strategy] || defaults.BALANCEADO;
            return {
                strategy: strategy,
                prefetch_segments: d.segments,
                parallel_downloads: d.parallel,
                buffer_target_seconds: d.buffer,
                min_bandwidth_mbps: d.bw,
                adaptive_enabled: true,
                ai_prediction_enabled: false,
                continuous_prefetch: true
            };
        }

        /**
         * Establece la estrategia de prefetch para un perfil
         * @param {string} profileId - ID del perfil
         * @param {string} strategyId - ID de la estrategia (CONSERVADOR, BALANCEADO, etc.)
         */
        setPrefetchStrategy(profileId, strategyId) {
            const profile = this.profiles[profileId];
            if (!profile) return false;

            // Obtener preset si está disponible
            let config;
            if (window.PREFETCH_PRESETS && window.PREFETCH_PRESETS.get(strategyId)) {
                const preset = window.PREFETCH_PRESETS.get(strategyId);
                config = {
                    strategy: strategyId,
                    prefetch_segments: preset.prefetch_segments,
                    parallel_downloads: preset.parallel_downloads,
                    buffer_target_seconds: preset.buffer_target_seconds,
                    min_bandwidth_mbps: preset.min_bandwidth_mbps,
                    adaptive_enabled: preset.adaptive_enabled,
                    ai_prediction_enabled: preset.ai_prediction_enabled || false,
                    continuous_prefetch: preset.continuous_prefetch || true
                };
            } else {
                // Fallback: solo cambiar la estrategia, mantener otros valores
                config = this.getPrefetchConfig(profileId);
                config.strategy = strategyId;
            }

            profile.prefetch_config = config;
            this.save();
            console.log(`⚡ Prefetch strategy set to ${strategyId} for ${profileId}`);
            return true;
        }

        /**
         * Actualiza un valor específico de prefetch para un perfil
         * @param {string} profileId - ID del perfil
         * @param {string} key - Clave del valor (prefetch_segments, parallel_downloads, etc.)
         * @param {*} value - Nuevo valor
         */
        updatePrefetchSetting(profileId, key, value) {
            const profile = this.profiles[profileId];
            if (!profile) return false;

            // Inicializar prefetch_config si no existe
            if (!profile.prefetch_config) {
                profile.prefetch_config = this._getDefaultPrefetchConfig(profileId);
            }

            // Actualizar el valor
            profile.prefetch_config[key] = value;
            this.save();
            console.log(`⚡ Prefetch ${key} set to ${value} for ${profileId}`);
            return true;
        }

        /**
         * Genera headers M3U8 para prefetch de un perfil
         * @param {string} profileId - ID del perfil
         * @returns {Array} Array de líneas de headers M3U8
         */
        getPrefetchHeaders(profileId) {
            const config = this.getPrefetchConfig(profileId);
            const headers = [];

            headers.push(`#EXT-X-APE-PREFETCH-STRATEGY:${config.strategy}`);
            headers.push(`#EXT-X-APE-PREFETCH-SEGMENTS:${config.prefetch_segments}`);
            headers.push(`#EXT-X-APE-PREFETCH-PARALLEL:${config.parallel_downloads}`);
            headers.push(`#EXT-X-APE-PREFETCH-BUFFER-TARGET:${config.buffer_target_seconds * 1000}`);
            headers.push(`#EXT-X-APE-PREFETCH-ADAPTIVE:${config.adaptive_enabled}`);
            headers.push(`#EXT-X-APE-PREFETCH-MIN-BANDWIDTH:${config.min_bandwidth_mbps * 1000000}`);

            if (config.ai_prediction_enabled) {
                headers.push(`#EXT-X-APE-PREFETCH-AI-ENABLED:true`);
            }

            return headers;
        }

        /**
         * Resetea configuración de prefetch a defaults para un perfil
         * @param {string} profileId - ID del perfil
         */
        resetPrefetchConfig(profileId) {
            const profile = this.profiles[profileId];
            if (!profile) return false;

            profile.prefetch_config = this._getDefaultPrefetchConfig(profileId);
            this.save();
            console.log(`⚡ Prefetch config reset for ${profileId}`);
            return true;
        }

        // ═══════════════════════════════════════════════════════════════════
        // MÉTODOS ABR CONTROL (NUEVOS)
        // ═══════════════════════════════════════════════════════════════════

        /**
         * Obtiene configuración ABR para un perfil
         * @param {string} profileId - ID del perfil (P0-P5)
         * @returns {Object} Configuración ABR
         */
        getABRConfig(profileId) {
            const profile = this.profiles[profileId];
            if (!profile) return this._getDefaultABRConfig();

            return {
                bandwidthPreference: this.getHeaderValue(profileId, 'X-Bandwidth-Preference'),
                estimationWindow: parseInt(this.getHeaderValue(profileId, 'X-BW-Estimation-Window')),
                confidenceThreshold: parseFloat(this.getHeaderValue(profileId, 'X-BW-Confidence-Threshold')),
                smoothFactor: parseFloat(this.getHeaderValue(profileId, 'X-BW-Smooth-Factor')),
                packetLossMonitor: this.getHeaderValue(profileId, 'X-Packet-Loss-Monitor') === 'enabled',
                rttMonitoring: this.getHeaderValue(profileId, 'X-RTT-Monitoring') === 'enabled',
                congestionDetect: this.getHeaderValue(profileId, 'X-Congestion-Detect') === 'enabled'
            };
        }

        /**
         * Configuración ABR por defecto
         * @private
         */
        _getDefaultABRConfig() {
            return {
                bandwidthPreference: 'unlimited',
                estimationWindow: 10,
                confidenceThreshold: 0.85,
                smoothFactor: 0.15,
                packetLossMonitor: true,
                rttMonitoring: true,
                congestionDetect: true
            };
        }

        /**
         * Actualiza configuración ABR para un perfil
         * @param {string} profileId - ID del perfil
         * @param {Object} config - Nueva configuración ABR
         */
        updateABRConfig(profileId, config) {
            const profile = this.profiles[profileId];
            if (!profile) return false;

            if (config.bandwidthPreference !== undefined) {
                this.setHeaderOverride(profileId, 'X-Bandwidth-Preference', config.bandwidthPreference);
            }
            if (config.estimationWindow !== undefined) {
                this.setHeaderOverride(profileId, 'X-BW-Estimation-Window', String(config.estimationWindow));
            }
            if (config.confidenceThreshold !== undefined) {
                this.setHeaderOverride(profileId, 'X-BW-Confidence-Threshold', String(config.confidenceThreshold));
            }
            if (config.smoothFactor !== undefined) {
                this.setHeaderOverride(profileId, 'X-BW-Smooth-Factor', String(config.smoothFactor));
            }
            if (config.packetLossMonitor !== undefined) {
                this.setHeaderOverride(profileId, 'X-Packet-Loss-Monitor', config.packetLossMonitor ? 'enabled' : 'disabled');
            }
            if (config.rttMonitoring !== undefined) {
                this.setHeaderOverride(profileId, 'X-RTT-Monitoring', config.rttMonitoring ? 'enabled' : 'disabled');
            }
            if (config.congestionDetect !== undefined) {
                this.setHeaderOverride(profileId, 'X-Congestion-Detect', config.congestionDetect ? 'enabled' : 'disabled');
            }

            console.log(`🧠 ABR Config updated for ${profileId}`);
            return true;
        }

        /**
         * Genera headers M3U8 para ABR Control de un perfil
         * @param {string} profileId - ID del perfil
         * @returns {Array} Array de líneas de headers M3U8
         */
        getABRHeaders(profileId) {
            const config = this.getABRConfig(profileId);
            const headers = [];

            headers.push(`#EXT-X-APE-ABR-BANDWIDTH-PREFERENCE:${config.bandwidthPreference}`);
            headers.push(`#EXT-X-APE-ABR-ESTIMATION-WINDOW:${config.estimationWindow}`);
            headers.push(`#EXT-X-APE-ABR-CONFIDENCE-THRESHOLD:${config.confidenceThreshold}`);
            headers.push(`#EXT-X-APE-ABR-SMOOTH-FACTOR:${config.smoothFactor}`);
            headers.push(`#EXT-X-APE-ABR-PACKET-LOSS-MONITOR:${config.packetLossMonitor ? 'enabled' : 'disabled'}`);
            headers.push(`#EXT-X-APE-ABR-RTT-MONITORING:${config.rttMonitoring ? 'enabled' : 'disabled'}`);
            headers.push(`#EXT-X-APE-ABR-CONGESTION-DETECT:${config.congestionDetect ? 'enabled' : 'disabled'}`);

            return headers;
        }

        // ═══════════════════════════════════════════════════════════════════════
        // 🌐 GENERACIÓN DE #EXTHTTP JSON (GLOBAL POR PERFIL)
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Genera objeto JSON con HTTP Headers habilitados para un perfil
         * Este objeto se usa para construir el tag #EXTHTTP: global en el M3U8
         * @param {string} profileId - ID del perfil (P0-P5)
         * @param {Object} options - Opciones adicionales
         * @param {Object} options.fingerprint - Datos de fingerprint de dispositivo
         * @param {string} options.userAgent - User-Agent override (de rotator)
         * @returns {Object} Objeto con headers HTTP clave-valor
         */
        getHTTPHeadersJSON(profileId, options = {}) {
            const profile = this.profiles[profileId];
            if (!profile) {
                console.warn(`⚠️ Perfil ${profileId} no encontrado, usando P3`);
                return this.getHTTPHeadersJSON('P3', options);
            }

            const headers = {};
            const enabledCats = profile.enabledCategories || Object.keys(this.categories);
            const now = new Date();

            // Recorrer categorías habilitadas
            for (const catId of enabledCats) {
                const category = this.categories[catId];
                if (!category) continue;

                for (const headerName of category.headers) {
                    let value = this.getHeaderValue(profileId, headerName);

                    // 🔄 Valores dinámicos especiales
                    if (value.includes('[TIMESTAMP]')) {
                        value = now.toISOString();
                    }
                    if (value.includes('[GENERATE_UUID]')) {
                        value = crypto.randomUUID ? crypto.randomUUID() :
                            'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                                const r = Math.random() * 16 | 0;
                                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                            });
                    }
                    if (value.includes('[HTTP_DATE]')) {
                        value = now.toUTCString();
                    }
                    if (value.includes('[CONFIG_SESSION_ID]')) {
                        value = `APE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                    }

                    // 🔄 Override de User-Agent desde options
                    if (headerName === 'User-Agent' && options.userAgent) {
                        value = options.userAgent;
                    }

                    // 🔄 Datos de fingerprint
                    if (options.fingerprint) {
                        if (headerName === 'X-Device-Id' && options.fingerprint.deviceId) {
                            value = options.fingerprint.deviceId;
                        }
                        if (headerName === 'X-Screen-Resolution' && options.fingerprint.screenResolution) {
                            value = options.fingerprint.screenResolution;
                        }
                        if (headerName === 'X-Device-Type' && options.fingerprint.deviceType) {
                            value = options.fingerprint.deviceType;
                        }
                    }

                    // 🔄 Valores dinámicos desde perfil (MAPEO COMPLETO 152 FALLBACKS)
                    if (headerName === 'X-Max-Resolution') value = profile.settings?.resolution || value;
                    if (headerName === 'X-Max-Bitrate' && profile.settings?.bitrate) value = String(profile.settings.bitrate * 1000000);
                    if (headerName === 'X-Frame-Rates') value = profile.settings?.fps || value;
                    if (headerName === 'X-Video-Codecs') value = profile.settings?.codec || value;
                    if (headerName === 'X-HEVC-Tier') value = profile.settings?.hevc_tier || value;
                    if (headerName === 'X-HEVC-Level') value = profile.settings?.hevc_level || value;
                    if (headerName === 'X-HEVC-Profile') value = profile.settings?.hevc_profile || value;
                    if (headerName === 'X-Color-Space') value = profile.settings?.color_space || value;
                    if (headerName === 'X-Chroma-Subsampling') value = profile.settings?.chroma_subsampling || value;
                    if (headerName === 'X-HDR-Transfer-Function') value = profile.settings?.transfer_function || value;
                    if (headerName === 'X-Matrix-Coefficients') value = profile.settings?.matrix_coefficients || value;
                    if (headerName === 'X-Compression-Level') value = profile.settings?.compression_level || value;
                    if (headerName === 'X-Sharpen-Sigma') value = profile.settings?.sharpen_sigma || value;
                    if (headerName === 'X-Rate-Control') value = profile.settings?.rate_control || value;
                    if (headerName === 'X-Entropy-Coding') value = profile.settings?.entropy_coding || value;
                    if (headerName === 'X-Video-Profile') value = profile.settings?.video_profile || value;
                    if (headerName === 'X-Pixel-Format') value = profile.settings?.pixel_format || value;

                    // Solo agregar si tiene valor
                    if (value && value.trim() !== '') {
                        headers[headerName] = value;
                    }
                }
            }

            console.log(`🌐 [EXTHTTP] Generando ${Object.keys(headers).length} headers para ${profileId}`);

            // 🛡️ PROXY-SAFE: Eliminar headers que causan 407/403
            // Sincronizado con PROXY_BANNED_HEADERS de m3u8-typed-arrays-ultimate.js
            const BANNED = new Set([
                'X-Tunneling-Enabled', 'Proxy-Authorization', 'Proxy-Authenticate',
                'Proxy-Connection', 'Proxy', 'Via', 'Forwarded',
                'X-Forwarded-For', 'X-Forwarded-Proto', 'X-Forwarded-Host', 'X-Real-IP',
                'Sec-CH-UA', 'Sec-CH-UA-Mobile', 'Sec-CH-UA-Platform',
                'Sec-CH-UA-Full-Version-List', 'Sec-CH-UA-Arch', 'Sec-CH-UA-Bitness', 'Sec-CH-UA-Model',
                'Sec-Fetch-Dest', 'Sec-Fetch-Mode', 'Sec-Fetch-Site', 'Sec-Fetch-User',
                'Sec-GPC', 'Upgrade-Insecure-Requests', 'TE',
                'X-Requested-With', 'Accept-Charset', 'Accept-CH', 'DNT', 'Pragma'
            ]);
            const BANNED_PREFIXES = ['Sec-CH-', 'Sec-Fetch-', 'X-Proxy-', 'Tunnel-', 'Upstream-Proxy-'];

            const clean = {};
            for (const [key, value] of Object.entries(headers)) {
                if (BANNED.has(key)) continue;
                if (BANNED_PREFIXES.some(p => key.startsWith(p))) continue;
                clean[key] = value;
            }

            console.log(`🛡️ [PROXY-SAFE] ${Object.keys(headers).length} → ${Object.keys(clean).length} headers (${Object.keys(headers).length - Object.keys(clean).length} eliminados)`);
            return clean;
        }

        /**
         * Genera la línea completa #EXTHTTP: para insertar en el M3U8
         * @param {string} profileId - ID del perfil
         * @param {Object} options - Opciones adicionales
         * @returns {string} Línea #EXTHTTP:{...json...}
         */
        getEXTHTTPLine(profileId, options = {}) {
            const headers = this.getHTTPHeadersJSON(profileId, options);
            return `#EXT-X-APE-HTTP-HEADERS:${JSON.stringify(headers)}`;
        }

        /**
         * Genera el bloque completo de #EXTHTTP con comentario
         * @param {string} profileId - ID del perfil
         * @param {Object} options - Opciones adicionales
         * @returns {string} Bloque con comentario y #EXTHTTP
         */
        getEXTHTTPBlock(profileId, options = {}) {
            const profile = this.profiles[profileId];
            const headers = this.getHTTPHeadersJSON(profileId, options);
            const headerCount = Object.keys(headers).length;

            const lines = [];
            lines.push('');
            lines.push('# ═══════════════════════════════════════════════════════════════════════════');
            lines.push(`# 🌐 GLOBAL HTTP HEADERS (Profile: ${profileId} - ${profile?.name || 'Unknown'})`);
            lines.push(`# 📊 Headers: ${headerCount} | Generated: ${new Date().toISOString()}`);
            lines.push('# ═══════════════════════════════════════════════════════════════════════════');
            lines.push(`#EXT-X-APE-HTTP-HEADERS:${JSON.stringify(headers)}`);
            lines.push('');

            return lines.join('\n');
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // EXPOSICIÓN GLOBAL
    // ═══════════════════════════════════════════════════════════════════════
    const instance = new APEProfilesConfig();
    window.APE_PROFILES_CONFIG = instance;

    console.log('%c🎚️ APE Profiles Config v9.0 EXTENDED Cargado', 'color: #10b981; font-weight: bold;');
    console.log(`   Perfiles: ${Object.keys(instance.profiles).length}`);
    console.log(`   Categorías: ${Object.keys(instance.categories).length}`);
    console.log(`   Headers Totales: 99 (65 originales + 27 calidad visual + 7 ABR control)`);

})();
