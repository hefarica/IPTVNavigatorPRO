---
name: Triple File Sync — Visual Quality Pipeline
description: MANDATORY rule — Any visual quality change MUST be applied to ALL 3 resolver files simultaneously
---

# Triple File Sync — Visual Quality Pipeline

## ⚠️ CRITICAL RULE

**ANY change to visual quality, HDR, EXTVLCOPT, KODIPROP, or EXTHTTP directives MUST be applied to ALL 3 files simultaneously.**

Failure to sync all 3 files results in inconsistent quality across different player paths.

## The 3 Files (ALWAYS update together)

### 1. `resolve_quality.php` — Primary Resolver
- **VPS Path:** `/var/www/html/resolve_quality.php`
- **Local Path:** `backend/resolve_quality.php`
- **Purpose:** Full pipeline with CMAF resilience integration, AI engine, bandwidth metrics
- **Contains:** 165+ EXTVLCOPT, 24+ KODIPROP, 213+ EXTHTTP

### 2. `resolve.php` — Legacy/Alternate Resolver
- **VPS Path:** `/var/www/html/resolve.php`
- **Local Path:** `backend/resolve.php`
- **Purpose:** Gold Standard Dual Runtime Resolver (v16.1.0)
- **Contains:** Mirror of resolve_quality.php EXTVLCOPT sections

### 3. `ai_super_resolution_engine.php` — AI Visual Engine
- **VPS Path:** `/var/www/html/cmaf_engine/modules/ai_super_resolution_engine.php`
- **Local Path:** `backend/cmaf_engine/modules/ai_super_resolution_engine.php`
- **Purpose:** Polymorphic AI enhancement, bandwidth-reactive metrics, 4K NUCLEAR mode

## Sections That MUST Be Identical

| Section | resolve_quality.php | resolve.php |
|:---|:---|:---|
| Section 4B: HDR/SDR | ✅ Always Active | ✅ Always Active |
| Section 5: Post-Process | ✅ Removed (AI handles) | ✅ Removed (AI handles) |
| Tone Mapping | ✅ Reinhard 5000 nits | ✅ Reinhard 5000 nits |
| Deband/Dither | ✅ fruit/auto | ✅ fruit/auto |
| Video Filter Chain | `adjust:sharpen:deinterlace` | `adjust:sharpen:deinterlace` |

## Deployment Checklist

```bash
# 1. Deploy ALL 3 files
scp backend/resolve_quality.php root@178.156.147.234:/var/www/html/resolve_quality.php
scp backend/resolve.php root@178.156.147.234:/var/www/html/resolve.php
scp backend/cmaf_engine/modules/ai_super_resolution_engine.php root@178.156.147.234:/var/www/html/cmaf_engine/modules/ai_super_resolution_engine.php

# 2. Verify syntax on ALL 3
ssh root@178.156.147.234 "php -l /var/www/html/resolve_quality.php; php -l /var/www/html/resolve.php; php -l /var/www/html/cmaf_engine/modules/ai_super_resolution_engine.php"

# 3. Verify output
ssh root@178.156.147.234 "curl -sk 'https://localhost/resolve_quality.php?ch=1198&p=P2&sid=1198&srv=...' | tr ',' '\n' | grep -c EXTVLCOPT"
```

## When This Skill Applies

- Adding/modifying EXTVLCOPT directives
- Adding/modifying KODIPROP directives
- Changing HDR/SDR behavior
- Modifying Section 4B, 5, or any visual quality section
- Adding new tone-mapping, color, deband, or dithering options
- Changing AI engine enhancement logic
- Modifying bandwidth-reactive metrics
