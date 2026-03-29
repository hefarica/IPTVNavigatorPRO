---
description: MANDATORY rule - Always read Profile Manager runtime values when generating M3U8 lists
---

# Skill: Profile Sync Rule (Mandatory M3U8 Generation)

## 🚨 MANDATORY RULE — NEVER GENERATE WITHOUT PROFILE VALUES

When generating or modifying M3U8 lists, you MUST ALWAYS:

### 1. Read the Active Profile Values

Before writing ANY M3U8 directive, read the current profile from:

```
Primary:   window.APE_PROFILES_CONFIG.getProfile(profileId)
Secondary: window.ProfileManagerV9.activeProfileId
Fallback:  PROFILES[profileId] (hardcoded in generator)
```

### 2. Required Fields to Extract (NEVER skip these)

From `profile.settings`:

| Field | What it feeds | Example P2 |
|-------|--------------|------------|
| `resolution` | `#EXT-X-APE-RESOLUTION`, EXTHTTP `X-APE-RESOLUTION` | `3840x2160` |
| `codec` | `#EXT-X-APE-CODEC`, codec_primary | `AV1` |
| `fps` | `#EXT-X-APE-FRAME-RATE` | `120` |
| `bitrate` (Mbps) | `#EXT-X-APE-BITRATE`, bandwidth calculations | `26.9` |
| `buffer` (ms) | Buffer C1/C2, network_cache, live_cache | `15000` |
| `playerBuffer` (ms) | file_cache, player_buffer | `51000` |
| `t1` | `#EXT-X-APE-ISP-BW-MIN-TARGET`, EXTHTTP | `35` |
| `t2` | `#EXT-X-APE-ISP-BW-OPT-TARGET`, EXTHTTP | `43` |
| `strategy` | `#EXT-X-APE-PREFETCH-STRATEGY` | `ultra-aggressive` |
| `headersCount` | `#EXT-X-APE-DNA-FIELDS` | `144` |

From `getPrefetchConfig(profileId)`:

| Field | What it feeds | Example P2 |
|-------|--------------|------------|
| `segments` | `#EXT-X-APE-PREFETCH-SEGMENTS-PRELOAD` | `90` |
| `parallelDownloads` | `#EXT-X-APE-PREFETCH-PARALLEL-DOWNLOADS` | `40` |
| `bufferTarget` (s) | `#EXT-X-APE-PREFETCH-BUFFER-TARGET` | `81` |
| `minBandwidth` (Mbps) | `#EXT-X-APE-PREFETCH-BW-MIN` | `81` |

### 3. Computed Metrics (MUST be calculated and emitted)

These are derived from the profile values above and MUST appear in every generated list:

| Metric | Formula | Directive |
|--------|---------|-----------|
| Buffer Total | `C1 + C2 + playerBuffer` | `#EXT-X-APE-BUFFER-TOTAL-C1C2C3` |
| Jitter Max | `playerBuffer × 0.8` | `#EXT-X-APE-JITTER-MAX-SUPPORTED` |
| Headroom % | `(T2 / bitrate) × 100` | `#EXT-X-APE-HEADROOM` |
| Risk Score | From headroom thresholds | `#EXT-X-APE-RISK-SCORE` |
| Streaming Health | From risk score | `#EXT-X-APE-STREAMING-HEALTH` |
| Stall Rate Target | From headroom thresholds | `#EXT-X-APE-STALL-RATE-TARGET` |
| RAM Estimate | `(bufferTotal/1000) × bitrate / 8` | `#EXT-X-APE-RAM-REAL-PURE` |
| Overhead | `playerBuffer - (C1/5)` | `#EXT-X-APE-OVERHEAD-SECURITY` |
| BW Peak/Avg | `minBW × 1.2 / bitrate` | `#EXT-X-APE-BW-PEAK-AVG` |
| Burst Factor | `bwPeak / bwAvg` | `#EXT-X-APE-BURST-FACTOR` |
| Fill Time | `(segments × segDur) / parallel × ratio` | `#EXT-X-APE-PREFETCH-FILL-TIME` |

### 4. Where Values MUST Appear

Each profile field must appear in ALL 3 layers:

1. **`#EXT-X-APE-*` per-channel tags** — via `build_qos_performance_tags(cfg, profile)`
2. **`#EXTHTTP` headers** — via the QoS block in `build_exthttp()`
3. **Resolver URL `ctx` payload** — via OPTION B compact payload (already includes profile, resolution, bandwidth, HDR, codec)

### 5. The Dynamic Bridge Guarantee

The `getProfileConfig()` function (L781+) implements the **Dynamic Bridge v2.0**:

```
Priority 1: APE_PROFILES_CONFIG.getProfile(id) → Profile Manager UI values
Priority 2: APE_PROFILE_BRIDGE (legacy)
Priority 3: PROFILES hardcoded (safe fallback)
```

**NEVER bypass this bridge.** NEVER read directly from PROFILES hardcoded. Always call `getProfileConfig(profileId)` which handles the priority chain.

### 6. Verification Checklist

After generating ANY M3U8, verify:

- [ ] `#EXT-X-APE-STREAMING-HEALTH` present per channel
- [ ] `#EXT-X-APE-RISK-SCORE` present per channel
- [ ] `#EXT-X-APE-ISP-BW-MIN-TARGET` matches Profile Manager T1
- [ ] `#EXT-X-APE-ISP-BW-OPT-TARGET` matches Profile Manager T2
- [ ] `#EXT-X-APE-PREFETCH-SEGMENTS-PRELOAD` matches Profile Manager prefetch
- [ ] `#EXT-X-APE-BUFFER-TOTAL-C1C2C3` = C1 + C2 + playerBuffer
- [ ] Console shows `🔗 [BRIDGE v2.0]` (not `📦 [FALLBACK]`)
- [ ] EXTHTTP contains `X-APE-ISP-BW-Min-Target` and `X-APE-ISP-BW-Opt-Target`
