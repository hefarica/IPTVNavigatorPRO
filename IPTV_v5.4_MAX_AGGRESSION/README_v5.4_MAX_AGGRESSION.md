# IPTV Navigator PRO v5.4 MAX AGGRESSION NUCLEAR
## Toolkit Completo — Player Enslavement Protocol (PEP)

**Versión:** 5.4.0-MAX-AGGRESSION-NUCLEAR  
**Motor JS:** 16.4.0-MAX-AGGRESSION-NUCLEAR  
**Fecha:** 2026-03-16  
**Canales:** 9.293 | **Headers por canal:** 200+ | **Tags LCEVC:** 30 (3 fases)

---

## El botón 🚀 TYPED ARRAYS ULTIMATE

Al presionar el botón en el Frontend, el motor `m3u8-typed-arrays-ultimate.js` v16.4.0 genera **idempotentemente** la lista con esta estructura por canal:

```
#EXTINF  →  #EXTHTTP (200+ headers)  →  #EXTVLCOPT ×22  →  #KODIPROP ×38
→  #EXT-X-APE-* ×60+  →  #EXT-X-APE-LCEVC-* ×30  →  #EXT-X-STREAM-INF  →  URL
```

La estructura es **invariante**: presionar el botón N veces produce siempre la misma lista.

---

## Inteligencia de Dispositivo — DEVICE_TIER

El motor detecta automáticamente el hardware del cliente y asigna el nivel ISP inicial:

| DEVICE_TIER | Dispositivos | Nivel ISP Inicial |
|---|---|---|
| 4 (NUCLEAR) | Nvidia Shield, Apple TV 4K, PC ≥8GB RAM | NUCLEAR |
| 3 (BRUTAL) | PC ≥4GB RAM, Android TV premium | BRUTAL |
| 2 (SAVAGE) | Smart TV mid-range, Chromecast Ultra | SAVAGE |
| 1 (EXTREME) | FireTV Stick, Raspberry Pi, ≤1GB RAM | EXTREME |

---

## Los 5 Niveles ISP Escalantes (NUNCA BAJAN)

| Nivel | Nombre | TCP Window | Streams Paralelos | Burst | Estrategia |
|---|---|---|---|---|---|
| 1 | EXTREME | 4 MB | 4 | 1.5x/30s | MAX_CONTRACT |
| 2 | ULTRA | 8 MB | 8 | 2x/60s | MAX_CONTRACT_PLUS_20PCT |
| 3 | SAVAGE | 16 MB | 16 | 3x/∞ | SATURATE_LINK |
| 4 | BRUTAL | 32 MB | 32 | 5x/∞ | EXCEED_CONTRACT |
| 5 | NUCLEAR | **64 MB** | **64** | **10x/∞** | **ABSOLUTE_MAX** |

**Escalación automática** ante: throttle detectado, packet-loss >0.1%, RTT >150ms.

---

## Perfiles P0-P5 (Anti-Freeze Calibrado)

| Perfil | Resolución | FPS | Bitrate | network-caching | clock-jitter | clock-synchro |
|---|---|---|---|---|---|---|
| P0 | 7680×4320 | 120 | 80 Mbps | 15000 ms | 1500 | 1 |
| P1 | 3840×2160 | 60 | 25 Mbps | 15000 ms | 1500 | 1 |
| P2 | 3840×2160 | 30 | 15 Mbps | 15000 ms | 1500 | 1 |
| P3 | 1920×1080 | 60 | 8 Mbps | 15000 ms | 1500 | 1 |
| P4 | 1280×720 | 30 | 4.5 Mbps | 15000 ms | 1500 | 1 |
| P5 | 854×480 | 25 | 1.5 Mbps | 15000 ms | 1500 | 1 |

**Valores críticos anti-freeze** (idénticos en todos los perfiles):
- `clock-jitter=1500` — evita descarte de frames EAC3/HEVC
- `clock-synchro=1` — sincronización A/V en streams 50fps
- `network-caching=15000` — buffer alcanzable a 2975 kb/s
- `X-Compression-Level=0` — sin latencia adicional en streams ya comprimidos
- `reconnect_max_attempts=300` — máxima resiliencia ante fallos transitorios

---

## LCEVC MPEG-5 Part 2 (3 Fases Completas)

| Fase | Tags | Descripción |
|---|---|---|
| L-1 Base Layer | `#EXT-X-APE-LCEVC-L1-*` (×8) | Codec base, resolución, bitrate, block size |
| L-2 Enhancement | `#EXT-X-APE-LCEVC-L2-*` (×8) | Capa de mejora, factor de escala, calidad |
| Transport | `#EXT-X-APE-LCEVC-TRANSPORT-*` (×6) | SEI_NAL, WebM, MPEG-TS PID |
| Parallel | `#EXT-X-APE-LCEVC-PARALLEL-*` (×4) | Threads, HW acceleration |
| Graceful | `#EXT-X-APE-LCEVC-GRACEFUL-*` (×4) | Degradación a base codec si no hay soporte |

`lcevc_player_required: false` — cualquier player reproduce el stream base sin LCEVC.

---

## Archivos del Toolkit

| Archivo | Descripción |
|---|---|
| `frontend/js/ape-v9/m3u8-typed-arrays-ultimate.js` | Motor JS v16.4.0-MAX-AGGRESSION-NUCLEAR |
| `frontend/js/ape-v9/ape-profiles-config-v5.js` | Perfiles P0-P5 v5.4.0 |
| `frontend/index-v4.html` | Frontend completo |
| `APE_PEP_ULTIMATE_v5.4_MAX_AGGRESSION.m3u8` | Lista M3U8 de referencia (9.293 canales) |
| `APE_PEP_ULTIMATE_v5.3_FUSION.m3u8` | Lista M3U8 anterior (referencia) |
| `generate_m3u8_v54_max_aggression.py` | Regenerador Python de la lista |
| `vps/resolve_quality_v5.php` | Backend PHP v5.1 con 10 motores |
| `backend/` | Motores PHP: CMAF, LCEVC, APE, Telchemy |

---

## Compatibilidad Universal

La lista es reproducible en **cualquier player del mundo** gracias a:
1. Estructura `#EXTINF → #EXT-X-STREAM-INF → URL` respetada (VLC, Kodi, TiviMate)
2. `lcevc_player_required: false` (LCEVC es aditivo, nunca disruptivo)
3. Cadena de degradación de 7 niveles (CMAF+HEVC/AV1 → HTTP redirect)
4. `X-ISP-Never-Downgrade: true` (los niveles ISP solo escalan hacia arriba)
