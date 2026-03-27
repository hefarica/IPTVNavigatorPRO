---
name: Never Cap Resolution — Force Maximum Quality Always
description: Mandatory rule to NEVER inject resolution caps. Always force highest available resolution, maximum bitrate, and aggressive sharpening. Applies to resolve.php, resolve_quality.php, and any VLC option generator.
---

# Never Cap Resolution — Force Maximum Quality Always

## RULE: Zero Resolution Caps

**NEVER** inject tiered resolution fallback chains like:
```
❌ preferred-resolution=480
❌ adaptive-maxheight=480
❌ adaptive-maxheight=720
❌ adaptive-maxheight=1080
```

The player reads the **FIRST** `preferred-resolution` value and caps there. This causes ALL channels to play at 480p regardless of their actual quality.

## MANDATORY Directives

Always inject these EXACT directives:
```
✅ preferred-resolution=-1        (-1 = ALWAYS highest available)
✅ adaptive-maxwidth=3840          (4K width)
✅ adaptive-maxheight=2160         (4K height)
✅ adaptive-logic=highest          (always select highest bitrate variant)
✅ adaptive-minbw=5000000          (reject anything below 5Mbps)
```

## MANDATORY Image Quality VLC Options
```
✅ sharpen-sigma=0.06              (aggressive edge sharpening)
✅ contrast=1.08                   (pop without overdoing it)
✅ saturation=1.12                 (richer colors)
✅ gamma=0.96                      (brighter midtones)
✅ swscale-mode=9                  (Lanczos — premium upscaler)
✅ postproc-q=6                    (maximum post-processing)
✅ deinterlace-mode=bwdif          (best deinterlace)
```

## MANDATORY Codec Quality (No Shortcuts)
```
✅ avcodec-fast=0                  (quality over speed)
✅ avcodec-skiploopfilter=0        (never skip deblocking)
✅ avcodec-hurry-up=0              (never rush decode)
✅ avcodec-skip-frame=0            (never drop frames)
✅ avcodec-skip-idct=0             (full transform decode)
✅ avcodec-dr=1                    (direct rendering)
```

## MANDATORY Cache Refresh
```
✅ Cache-Control: max-age=3        (player re-fetches every 3 seconds)
✅ X-APE-Refresh-Interval: 3       (custom header for monitoring)
```

## Files That Must Follow This Rule
- `resolve_quality.php` — Primary resolver (VPS)
- `resolve.php` — Legacy resolver (VPS)
- `resilience_integration_shim.php` — Shim layer
- `ai_super_resolution_engine.php` — AI orchestrator
- `m3u8-typed-arrays-ultimate.js` — Client-side M3U8 generator

## How to Audit
```bash
# On VPS: Check for ANY resolution cap below 2160
grep -rn 'maxheight=480\|maxheight=720\|preferred-resolution=480\|preferred-resolution=720' /var/www/html/*.php

# Must return ZERO results. If any found, it's a critical bug.
```
