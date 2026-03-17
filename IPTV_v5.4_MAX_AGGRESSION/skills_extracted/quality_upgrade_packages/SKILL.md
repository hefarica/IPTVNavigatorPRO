---
name: M3U8 Quality Upgrade Packages (A-J) — 100% Tag Reference
description: Complete reference for ALL APE tags and EXTHTTP fields across 10 quality upgrade packages. Use this to verify and maintain 100% tag coverage in the M3U8 generator.
---

# M3U8 Quality Upgrade Packages — 100% Tag Reference

> **RULE**: Every tag listed here MUST exist in `m3u8-typed-arrays-ultimate.js` inside `build_ape_block()`.
> Every EXTHTTP field MUST exist inside `build_exthttp()`.
> If ANY tag is missing, the upgrade is INCOMPLETE.

## Architecture

- **APE tags** go in `build_ape_block(cfg, profile, index)` → returns `[...]` array
- **EXTHTTP fields** go in `build_exthttp(cfg, profile, index, sessionId, reqId)` → returns `#EXTHTTP:{...}`
- **Insert point for new APE tags**: AFTER `#EXT-X-APE-LCEVC-GRACEFUL-DEGRADATION:BASE_CODEC_PASSTHROUGH`
- **Insert point for new EXTHTTP**: AFTER `"X-Prefetch-Enabled": "true,adaptive,auto"`
- **GOLDEN RULE**: ONLY ADD, never modify/delete existing code

---

## Package A — CMAF Chunked Transfer v2 (22 tags)

### APE Tags (22)
```
#EXT-X-APE-CMAF-CHUNK-DURATION:${cfg.cmaf_chunk_duration || '1.0'}
#EXT-X-APE-CMAF-CHUNK-TYPE:CMAF_CHUNK
#EXT-X-APE-CMAF-INGEST-PROTOCOL:CMAF-INGEST-V2
#EXT-X-APE-CMAF-COMMON-ENCRYPTION:CBCS
#EXT-X-APE-CMAF-TRACK-TYPE:VIDEO+AUDIO+SUBTITLE
#EXT-X-APE-CMAF-SEGMENT-ALIGNMENT:true
#EXT-X-APE-CMAF-INDEPENDENT-SEGMENTS:true
#EXT-X-APE-CMAF-LOW-LATENCY:true
#EXT-X-APE-CMAF-PART-HOLD-BACK:3.0
#EXT-X-APE-CMAF-CAN-BLOCK-RELOAD:YES
#EXT-X-APE-CMAF-CAN-SKIP-UNTIL:36.0
#EXT-X-APE-CMAF-RENDITION-REPORTS:true
#EXT-X-APE-CMAF-PART-TARGET:${cfg.cmaf_chunk_duration || '1.0'}
#EXT-X-APE-CMAF-SERVER-CONTROL:CAN-BLOCK-RELOAD=YES,HOLD-BACK=6.0
#EXT-X-APE-CMAF-PLAYLIST-TYPE:LIVE
#EXT-X-APE-CMAF-TARGET-DURATION:${Math.ceil((cfg.buffer_live || 30000) / 1000)}
#EXT-X-APE-CMAF-MEDIA-SEQUENCE:dynamic
#EXT-X-APE-CMAF-DISCONTINUITY-SEQUENCE:auto
#EXT-X-APE-CMAF-PROGRAM-DATE-TIME:${new Date().toISOString()}
#EXT-X-APE-CMAF-DATERANGE-ENABLED:true
#EXT-X-APE-CMAF-SKIP-BOUNDARY:6.0
#EXT-X-APE-CMAF-DELTA-PLAYLIST:true
```

### EXTHTTP Fields (5)
```
"X-CMAF-Part-Target": cfg.cmaf_chunk_duration || "1.0"
"X-CMAF-Server-Control": "CAN-BLOCK-RELOAD=YES"
"X-CMAF-Playlist-Type": "LIVE"
"X-CMAF-Delta-Playlist": "true"
"X-CMAF-Program-Date-Time": new Date().toISOString()
```

---

## Package B — fMP4 Enhancement Tracks v2 (24 tags)

### APE Tags (24)
```
#EXT-X-APE-FMP4-VIDEO-TRACK:${cfg.codec || 'HEVC'}+LCEVC
#EXT-X-APE-FMP4-AUDIO-TRACK:AAC-LC+EAC3+AC4
#EXT-X-APE-FMP4-SUBTITLE-TRACK:TTML+WebVTT
#EXT-X-APE-FMP4-METADATA-TRACK:ID3+SCTE35
#EXT-X-APE-FMP4-THUMBNAIL-TRACK:JPEG+WebP
#EXT-X-APE-FMP4-LCEVC-TRACK:MPEG5-P2-SEI
#EXT-X-APE-FMP4-HDR-METADATA-TRACK:HDR10+
#EXT-X-APE-FMP4-DOLBY-VISION-TRACK:RPU
#EXT-X-APE-FMP4-SAMPLE-ENTRY:hvc1+dvh1
#EXT-X-APE-FMP4-BRAND:iso6+cmfc+dash
#EXT-X-APE-FMP4-FRAGMENT-DURATION:${cfg.fmp4_fragment_ms || '2000'}
#EXT-X-APE-FMP4-SIDX-BOX:true
#EXT-X-APE-FMP4-SAIO-SAIZ:true
#EXT-X-APE-FMP4-PRFT-BOX:true
#EXT-X-APE-FMP4-EDIT-LIST:true
#EXT-X-APE-FMP4-CTTS-BOX:true
#EXT-X-APE-FMP4-SGPD-BOX:true
#EXT-X-APE-FMP4-SBGP-BOX:true
#EXT-X-APE-FMP4-EMSG-BOX:true
#EXT-X-APE-FMP4-PSSH-BOX:true
#EXT-X-APE-FMP4-TENC-BOX:true
#EXT-X-APE-FMP4-SENC-BOX:true
#EXT-X-APE-FMP4-TRACK-ENCRYPTION:CBCS
#EXT-X-APE-FMP4-COMMON-MEDIA-CLIENT-DATA:true
```

### EXTHTTP Fields (4)
```
"X-FMP4-Edit-List": "true"
"X-FMP4-EMSG-Box": "true"
"X-FMP4-PSSH-Box": "true"
"X-FMP4-Client-Data": "true"
```

---

## Package C — LCEVC v2 Phase 3 (22 tags: 7 Phase-3 core + 15 encoding)

### APE Tags — Phase 3 Core (7) ⚠️ THESE WERE MISSING BEFORE
```
#EXT-X-APE-LCEVC-PHASE-3-ENABLED:true
#EXT-X-APE-LCEVC-NEURAL-UPSCALE:ESRGAN-4x
#EXT-X-APE-LCEVC-GRAIN-SYNTHESIS:true
#EXT-X-APE-LCEVC-SPATIAL-DITHERING:true
#EXT-X-APE-LCEVC-L1-MOTION-COMPENSATION:true
#EXT-X-APE-LCEVC-L2-CHROMA-ENHANCEMENT:true
#EXT-X-APE-LCEVC-L2-DETAIL-ENHANCEMENT:true
```

### APE Tags — Encoding Parameters (15)
```
#EXT-X-APE-LCEVC-RATE-CONTROL:CRF+VBR
#EXT-X-APE-LCEVC-PSYCHO-VISUAL:true
#EXT-X-APE-LCEVC-AQ-MODE:VARIANCE
#EXT-X-APE-LCEVC-LOOKAHEAD:${cfg.lcevc_lookahead || 60}
#EXT-X-APE-LCEVC-B-FRAMES:${cfg.lcevc_bframes || 8}
#EXT-X-APE-LCEVC-REF-FRAMES:${cfg.lcevc_refframes || 16}
#EXT-X-APE-LCEVC-SUBPEL-REFINE:7
#EXT-X-APE-LCEVC-ME-RANGE:24
#EXT-X-APE-LCEVC-TRELLIS:2
#EXT-X-APE-LCEVC-DEBLOCK-ALPHA:${cfg.lcevc_deblock_alpha || -2}
#EXT-X-APE-LCEVC-DEBLOCK-BETA:${cfg.lcevc_deblock_beta || -2}
#EXT-X-APE-LCEVC-SAR:${cfg.resolution || '3840x2160'}
#EXT-X-APE-LCEVC-COLORMATRIX:${cfg.color_space || 'BT.2020'}
#EXT-X-APE-LCEVC-TRANSFER:${cfg.transfer_function || 'SMPTE-ST-2084'}
#EXT-X-APE-LCEVC-PRIMARIES:${cfg.color_primaries || 'BT.2020'}
```

### EXTHTTP Fields (5)
```
"X-LCEVC-Rate-Control": "CRF+VBR"
"X-LCEVC-Psycho-Visual": "true"
"X-LCEVC-B-Frames": cfg.lcevc_bframes || "8"
"X-LCEVC-Ref-Frames": cfg.lcevc_refframes || "16"
"X-LCEVC-Lookahead": cfg.lcevc_lookahead || "60"
```

---

## Package D — AI Super Resolution (22 tags)

### APE Tags (22)
```
#EXT-X-APE-AI-SR-MODEL:ESRGAN-4x+RealESRGAN
#EXT-X-APE-AI-SR-SCALE:${cfg.ai_sr_scale || '2x'}
#EXT-X-APE-AI-SR-INFERENCE:EDGE+CLOUD
#EXT-X-APE-AI-SR-FALLBACK:BICUBIC
#EXT-X-APE-AI-TEMPORAL-SR:true
#EXT-X-APE-AI-DENOISING:true
#EXT-X-APE-AI-DEBLOCKING:true
#EXT-X-APE-AI-ARTIFACT-REMOVAL:true
#EXT-X-APE-AI-FRAME-INTERPOLATION:true
#EXT-X-APE-AI-COLOR-ENHANCEMENT:true
#EXT-X-APE-AI-SHARPENING:ADAPTIVE
#EXT-X-APE-AI-HDR-UPCONVERT:SDR_TO_HDR10
#EXT-X-APE-AI-VMAF-TARGET:${cfg.vmaf_target || '95'}
#EXT-X-APE-AI-CONTENT-AWARE-ENCODING:true
#EXT-X-APE-AI-PERCEPTUAL-QUALITY:SSIM+VMAF
#EXT-X-APE-AI-SR-PRECISION:FP16
#EXT-X-APE-AI-SR-BATCH-SIZE:1
#EXT-X-APE-AI-SR-TILE-SIZE:256
#EXT-X-APE-AI-SR-OVERLAP:32
#EXT-X-APE-AI-MOTION-ESTIMATION:OPTICAL-FLOW
#EXT-X-APE-AI-SCENE-DETECTION:true
#EXT-X-APE-AI-CONTENT-TYPE:${cfg.group || 'GENERAL'}
```

### EXTHTTP Fields (4)
```
"X-AI-SR-Precision": "FP16"
"X-AI-SR-Tile-Size": "256"
"X-AI-Motion-Estimation": "OPTICAL-FLOW"
"X-AI-Content-Type": cfg.group || "GENERAL"
```

---

## Package E — VVC / H.266 (12 tags)

### APE Tags (12)
```
#EXT-X-APE-VVC-ENABLED:true
#EXT-X-APE-VVC-PROFILE:MAIN_10
#EXT-X-APE-VVC-LEVEL:${cfg.vvc_level || '5.1'}
#EXT-X-APE-VVC-TIER:MAIN
#EXT-X-APE-VVC-FALLBACK:HEVC
#EXT-X-APE-VVC-EFFICIENCY:+50%_vs_HEVC
#EXT-X-APE-VVC-TOOLSET:FULL
#EXT-X-APE-VVC-SUBPICTURES:true
#EXT-X-APE-VVC-WRAP-AROUND:true
#EXT-X-APE-VVC-LMCS:true
#EXT-X-APE-VVC-AFFINE-ME:true
#EXT-X-APE-VVC-BDOF:true
```

### EXTHTTP Fields (3)
```
"X-VVC-Toolset": "FULL"
"X-VVC-Subpictures": "true"
"X-VVC-LMCS": "true"
```

---

## Package F — EVC / MPEG-5 P1 (8 tags)

### APE Tags (8)
```
#EXT-X-APE-EVC-ENABLED:true
#EXT-X-APE-EVC-PROFILE:BASELINE
#EXT-X-APE-EVC-FALLBACK:H264
#EXT-X-APE-EVC-ROYALTY-FREE:true
#EXT-X-APE-EVC-LEVEL:${cfg.evc_level || '5.1'}
#EXT-X-APE-EVC-TOOLSET:MAIN
#EXT-X-APE-EVC-ADAPTIVE-LOOP-FILTER:true
#EXT-X-APE-EVC-CHROMA-QP-OFFSET:true
```

### EXTHTTP Fields (2)
```
"X-EVC-Level": cfg.evc_level || "5.1"
"X-EVC-Toolset": "MAIN"
```

---

## Package G — HDR Advanced (42 tags)

### APE Tags (42)
```
#EXT-X-APE-HDR-CHAIN:${hdr_support || 'dolby-vision,hdr10+,hdr10,hlg,sdr'}
#EXT-X-APE-HDR-COLOR-SPACE:${cfg.color_space || 'BT.2020,BT.709'}
#EXT-X-APE-HDR-TRANSFER-FUNCTION:${cfg.transfer_function || 'SMPTE-ST-2084,ARIB-STD-B67,BT.709'}
#EXT-X-APE-HDR-COLOR-PRIMARIES:${cfg.color_primaries || 'BT.2020'}
#EXT-X-APE-HDR-MATRIX-COEFFICIENTS:${cfg.matrix_coefficients || 'BT.2020nc'}
#EXT-X-APE-HDR-MAX-CLL:${cfg.max_cll || '4000,400'}
#EXT-X-APE-HDR-MAX-FALL:${cfg.max_fall || '1200'}
#EXT-X-APE-HDR-BIT-DEPTH:${cfg.color_depth || 10}bit
#EXT-X-APE-HDR-DOLBY-VISION-PROFILE:${cfg.dv_profile || '8.1'}
#EXT-X-APE-HDR-DOLBY-VISION-LEVEL:${cfg.dv_level || '6'}
#EXT-X-APE-HDR-SDR-FALLBACK:enabled
#EXT-X-APE-HDR-TONE-MAPPING:auto
#EXT-X-APE-HDR-GRACEFUL-DEGRADATION:SDR_PASSTHROUGH
#EXT-X-APE-HDR-STATIC-METADATA:enabled
#EXT-X-APE-HDR-DYNAMIC-METADATA:HDR10+,DV-RPU
#EXT-X-APE-HDR-PEAK-LUMINANCE:${cfg.peak_luminance || '4000'}nits
#EXT-X-APE-HDR-MIN-LUMINANCE:0.001nits
#EXT-X-APE-HDR-GAMUT:DCI-P3,BT.2020
#EXT-X-APE-HDR-10PLUS-VERSION:2.0
#EXT-X-APE-HDR-10PLUS-APPLICATION:4
#EXT-X-APE-HDR-DCI-P3-COVERAGE:99.8
#EXT-X-APE-HDR-BT2020-COVERAGE:97.5
#EXT-X-APE-HDR-DOLBY-VISION-CROSS-COMPAT:true
#EXT-X-APE-HDR-HLG-COMPAT:true
#EXT-X-APE-HDR-ST2094-10:true
#EXT-X-APE-HDR-ST2094-20:true
#EXT-X-APE-HDR-ST2094-30:true
#EXT-X-APE-HDR-ST2094-40:true
#EXT-X-APE-HDR-METADATA-INSERT-MODE:SEI
#EXT-X-APE-HDR-METADATA-PASS-THROUGH:true
#EXT-X-APE-HDR-OUTPUT-MODE:auto
#EXT-X-APE-HDR-DISPLAY-METADATA-SYNC:true
#EXT-X-APE-HDR-MASTERING-DISPLAY:G(0.265,0.690)B(0.150,0.060)R(0.680,0.320)WP(0.3127,0.3290)L(10000,0.001)
#EXT-X-APE-HDR-CONTENT-LIGHT-LEVEL:${cfg.max_cll || '4000,400'}
#EXT-X-APE-HDR-AMBIENT-VIEWING-ENV:DIM
#EXT-X-APE-HDR-REFERENCE-WHITE:203nits
#EXT-X-APE-HDR-SCENE-LUMINANCE:true
#EXT-X-APE-HDR-EXTENDED-RANGE:true
#EXT-X-APE-HDR-VIVID-ENABLED:true
#EXT-X-APE-HDR-SLHDR2:true
#EXT-X-APE-HDR-TECHNICOLOR:true
#EXT-X-APE-HDR-FILMMAKER-MODE:true
```

### EXTHTTP Fields (5)
```
"X-HDR-Mastering-Display": "G(0.265,0.690)B(0.150,0.060)R(0.680,0.320)WP(0.3127,0.3290)L(10000,0.001)"
"X-HDR-Reference-White": "203nits"
"X-HDR-Vivid": "true"
"X-HDR-Filmmaker-Mode": "true"
"X-HDR-Extended-Range": "true"
```

---

## Package H — Audio Advanced (16 tags)

### APE Tags (16)
```
#EXT-X-APE-AUDIO-CODEC:EAC3+AC4+AAC-LC
#EXT-X-APE-AUDIO-ATMOS:true
#EXT-X-APE-AUDIO-SPATIAL:DOLBY-ATMOS+DTS-X
#EXT-X-APE-AUDIO-CHANNELS:${cfg.audio_channels || '7.1.4'}
#EXT-X-APE-AUDIO-SAMPLE-RATE:48000
#EXT-X-APE-AUDIO-BIT-DEPTH:24bit
#EXT-X-APE-AUDIO-LOUDNESS:-23LUFS
#EXT-X-APE-AUDIO-DYNAMIC-RANGE:20dB
#EXT-X-APE-AUDIO-BITRATE:${cfg.audio_bitrate || '640'}kbps
#EXT-X-APE-AUDIO-OBJECTS:${cfg.audio_objects || '128'}
#EXT-X-APE-AUDIO-BEDS:${cfg.audio_beds || '10'}
#EXT-X-APE-AUDIO-DIALNORM:-27
#EXT-X-APE-AUDIO-COMPR-MODE:RF
#EXT-X-APE-AUDIO-DRC-PROFILE:FILM-STANDARD
#EXT-X-APE-AUDIO-DOWNMIX:LtRt+LoRo
#EXT-X-APE-AUDIO-TRUEHD:true
```

### EXTHTTP Fields (4)
```
"X-Audio-Bitrate": cfg.audio_bitrate || "640kbps"
"X-Audio-Objects": cfg.audio_objects || "128"
"X-Audio-TrueHD": "true"
"X-Audio-DRC-Profile": "FILM-STANDARD"
```

---

## Package I — Trick Play + Thumbnails (14 tags)

### APE Tags (14)
```
#EXT-X-APE-TRICK-PLAY-ENABLED:true
#EXT-X-APE-THUMBNAIL-TRACK:WebP+JPEG
#EXT-X-APE-THUMBNAIL-INTERVAL:10s
#EXT-X-APE-THUMBNAIL-RESOLUTION:320x180
#EXT-X-APE-FAST-FORWARD-CODEC:HEVC-I-FRAME
#EXT-X-APE-SEEK-PRECISION:IFRAME
#EXT-X-APE-THUMBNAIL-FORMAT:WebP+JPEG+AVIF
#EXT-X-APE-THUMBNAIL-COLS:10
#EXT-X-APE-THUMBNAIL-ROWS:10
#EXT-X-APE-THUMBNAIL-BANDWIDTH:200000
#EXT-X-APE-TRICK-PLAY-RATES:2,4,8,16,32
#EXT-X-APE-TRICK-PLAY-IFRAME-ONLY:true
#EXT-X-APE-SEEK-MODE:IFRAME+KEYFRAME
#EXT-X-APE-CHAPTER-MARKERS:true
```

### EXTHTTP Fields (3)
```
"X-Thumbnail-Format": "WebP+JPEG+AVIF"
"X-Trick-Play-Rates": "2,4,8,16,32"
"X-Chapter-Markers": "true"
```

---

## Package J — SCTE-35 Broadcast (10 tags)

### APE Tags (10)
```
#EXT-X-APE-SCTE35-ENABLED:true
#EXT-X-APE-SCTE35-FORMAT:BINARY+BASE64
#EXT-X-APE-SCTE35-SIGNAL:CUE-IN+CUE-OUT
#EXT-X-APE-SCTE35-PID:0x0086
#EXT-X-APE-SCTE35-DURATION-HINT:30s
#EXT-X-APE-SCTE35-SEGMENTATION-TYPE:PROGRAM_START
#EXT-X-APE-SCTE35-UPID-TYPE:URI
#EXT-X-APE-SCTE35-AVAIL-NUM:1
#EXT-X-APE-SCTE35-AVAILS-EXPECTED:1
#EXT-X-APE-SCTE35-BLACKOUT-OVERRIDE:true
```

### EXTHTTP Fields (3)
```
"X-SCTE35-PID": "0x0086"
"X-SCTE35-Segmentation-Type": "PROGRAM_START"
"X-SCTE35-Blackout-Override": "true"
```

---

## Critical Profile Values (EXTHTTP hardcoded)

These MUST be hardcoded, NOT from cfg:

| Field | Value | Reason |
|-------|-------|--------|
| `X-HEVC-Profile` | `MAIN-12,MAIN-10,MAIN` | Full HEVC profile chain |
| `X-Video-Profile` | `main-12,main-10,main` | Lowercase mirror |
| `X-FPS` | `String(fps)` | Was MISSING before fix |

## Per-Profile ISP Overrides (at end of build_exthttp)

```javascript
P0: { 'X-ISP-Segment-Pipeline':'64' }
P1: { 'X-ISP-Segment-Pipeline':'4'  }
P2: { 'X-ISP-Segment-Pipeline':'16' }
P3: { 'X-ISP-Segment-Pipeline':'8'  }  // Was showing 32 before fix
P4: { 'X-ISP-Segment-Pipeline':'4'  }
P5: { 'X-ISP-Segment-Pipeline':'4'  }
```

## Activations (must be ENABLED)

| Tag | Required Value |
|-----|---------------|
| `#EXT-X-APE-AI-SR-ENABLED` | `true` (was `false`) |
| `#EXT-X-APE-DOLBY-VISION` | `ENABLED-PROFILE-8.1-LEVEL-6` (was `DISABLED`) |

---

## Verification Checklist

After ANY modification to the generator, verify:

1. `node --check m3u8-typed-arrays-ultimate.js` → exit 0
2. Total APE tags ≥ 300 per channel
3. CMAF ≥ 22, FMP4 ≥ 24, LCEVC ≥ 50, AI ≥ 22
4. VVC ≥ 12, EVC ≥ 8, HDR ≥ 42, Audio ≥ 16
5. Trick/Thumb ≥ 14, SCTE35 ≥ 10
6. EXTHTTP fields ≥ 235
7. AI-SR = true, Dolby Vision = ENABLED
8. X-HEVC-Profile = MAIN-12,MAIN-10,MAIN
9. X-FPS present
10. X-ISP-Segment-Pipeline = 8 for P3
