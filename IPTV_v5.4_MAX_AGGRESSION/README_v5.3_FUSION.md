# IPTV Navigator PRO v5.3 FUSION — Toolkit Definitivo

## Versión: v5.3-FUSION-VLC-COMPATIBLE
## Paradigma: PLAYER-ENSLAVEMENT-PROTOCOL-V5.3-FUSION

---

## ¿Qué es este toolkit?

Este es el toolkit IPTV Navigator PRO en su versión definitiva fusionada. Integra al 100%:

- **v5.1 ANTI-FREEZE**: Valores de buffer calibrados quirúrgicamente para 0 cortes y 0 freezes
- **v5.2 LCEVC INJECTED**: Arquitectura LCEVC MPEG-5 Part 2 completa (L-1/L-2/Transport/Parallelización)

La lista generada por el botón **🚀 TYPED ARRAYS ULTIMATE** es idempotente, reproducible en cualquier player del mundo, y nunca producirá freezes.

---

## Archivos clave modificados en v5.3

| Archivo | Cambios |
|---|---|
| `frontend/js/ape-v9/m3u8-typed-arrays-ultimate.js` | Motor v5.3: 10 parches anti-freeze + LCEVC 38 tags |
| `frontend/js/ape-v9/ape-profiles-config-v5.js` | Perfiles P0-P5 con valores calibrados anti-freeze |
| `frontend/vps/resolve_quality_v5.php` | Backend PHP v5.1 con 10 motores + LCEVC 3 fases |
| `APE_PEP_ULTIMATE_v5.3_FUSION.m3u8` | Lista fusionada: 9.293 canales, 77.4 MB |
| `scripts/generate_m3u8_v53_fusion.py` | Regenerador Python para futuras listas madre |

---

## Correcciones críticas aplicadas (anti-freeze)

| # | Parámetro | Antes | Ahora | Impacto |
|---|---|---|---|---|
| 1 | `clock-jitter` | `0` | **`1500`** | CRÍTICO — freeze de audio EAC3/HEVC |
| 2 | `clock-synchro` | `0` | **`1`** | CRÍTICO — desincronización A/V |
| 3 | `network-caching` | `60000` ms | **`15000`** ms | CRÍTICO — buffer imposible de llenar |
| 4 | `live-caching` | `60000` ms | **`15000`** ms | CRÍTICO |
| 5 | `file-caching` | `30000` ms | **`51000`** ms | Alto — VOD correcto |
| 6 | `X-Prefetch-Segments` | `500` | **`20`** | CRÍTICO — player no arrancaba |
| 7 | `X-Concurrent-Downloads` | `200` | **`8`** | Alto — saturación de red |
| 8 | `X-Compression-Level` | dinámico | **`0`** | Alto — latencia innecesaria |
| 9 | `sout-mux-caching` | `file/6` | **`live_cache`** | Medio |
| 10 | `X-Reconnect-Delay-Ms` | `0` | **`50-200`** | Alto — reconexión en bucle |

---

## Perfiles P0-P5 calibrados

| Perfil | Resolución | FPS | Bitrate | Buffer | LCEVC |
|---|---|---|---|---|---|
| P0 ULTRA_EXTREME | 7680×4320 | 60 | 80 Mbps | 15s/15s/51s | ACTIVE (AV1) |
| P1 4K_SUPREME | 3840×2160 | 60 | 25 Mbps | 15s/15s/51s | ACTIVE (HEVC) |
| P2 4K_EXTREME | 3840×2160 | 30 | 15 Mbps | 15s/15s/51s | SIGNAL_ONLY |
| P3 FHD_ADVANCED | 1920×1080 | 60 | 8 Mbps | 15s/15s/51s | SIGNAL_ONLY |
| P4 HD_STABLE | 1280×720 | 30 | 4.5 Mbps | 15s/15s/51s | DISABLED |
| P5 SD_FAILSAFE | 854×480 | 25 | 1.5 Mbps | 15s/15s/51s | DISABLED |

---

## Estructura de un canal en la lista generada

```
#EXTINF:-1 tvg-id="..." tvg-name="..." tvg-logo="..." group-title="..." ape-profile="P1",Canal Name
#EXTHTTP:{"User-Agent":"...","X-LCEVC-L1-Block":"4X4","X-LCEVC-L2-Block":"2X2",...}
#EXTVLCOPT:network-caching=15000
#EXTVLCOPT:live-caching=15000
#EXTVLCOPT:file-caching=51000
#EXTVLCOPT:clock-jitter=1500
#EXTVLCOPT:clock-synchro=1
[... 22 directivas EXTVLCOPT más ...]
#KODIPROP:inputstream.adaptive.buffer_duration=19
[... 37 directivas KODIPROP más ...]
#EXT-X-APE-LCEVC:ENABLED
#EXT-X-APE-LCEVC-STANDARD:MPEG-5-PART-2
#EXT-X-APE-LCEVC-L1-ENABLED:1
#EXT-X-APE-LCEVC-L1-TRANSFORM-BLOCK:4X4
#EXT-X-APE-LCEVC-L2-ENABLED:1
#EXT-X-APE-LCEVC-L2-TRANSFORM-BLOCK:2X2
#EXT-X-APE-LCEVC-TRANSPORT-PRIMARY:SEI_NAL
#EXT-X-APE-LCEVC-PARALLEL-THREADS:12
#EXT-X-APE-LCEVC-COMPAT:UNIVERSAL
#EXT-X-APE-LCEVC-GRACEFUL-DEGRADATION:BASE_CODEC_PASSTHROUGH
[... 28 tags APE más ...]
#EXT-X-STREAM-INF:BANDWIDTH=25000000,AVERAGE-BANDWIDTH=20000000,RESOLUTION=3840x2160,CODECS="hev1.2.4.L153.B0,mp4a.40.2",FRAME-RATE=60.000
http://line.tivi-ott.net/live/USER/PASS/STREAM_ID.m3u8
```

---

## Garantía de compatibilidad universal

`#EXT-X-APE-LCEVC-GRACEFUL-DEGRADATION:BASE_CODEC_PASSTHROUGH` y `lcevc_player_required: false` en todos los canales garantizan que cualquier player — desde OTT Navigator hasta un Smart TV de 2010 — reproduce el stream base sin interrupciones. LCEVC es aditivo, nunca disruptivo.

---

## Cómo usar el botón TYPED ARRAYS ULTIMATE

1. Abrir `frontend/index-v4.html` en el navegador
2. Conectar al servidor Xtream Codes en la pestaña **Conexión**
3. Seleccionar el perfil deseado en **Gestor de Perfiles APE v9.0**
4. Hacer clic en **🚀 TYPED ARRAYS ULTIMATE**
5. La lista generada tendrá exactamente la estructura de `APE_PEP_ULTIMATE_v5.3_FUSION.m3u8`

La lista es idempotente: presionar el botón N veces con los mismos canales produce siempre la misma lista.
