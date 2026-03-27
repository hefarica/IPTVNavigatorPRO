---
name: Channel 405/Error Debugging Protocol
description: Fast protocol to diagnose why a specific IPTV channel returns 405, connection reset, or any stream error. Eliminates wasted search time.
---

# Channel 405/Error Debugging Protocol

## Step 1: Find Channel in M3U8 (< 30 seconds)

The M3U8 list is gzipped on the VPS. Always decompress first, then use `sed` to extract clean names:

```bash
# Decompress list to /tmp for fast searching
zcat /var/www/html/lists/APE_TYPED_ARRAYS_ULTIMATE_*.m3u8.gz > /tmp/ape_list.m3u8

# CRITICAL: Use sed to strip long lines and show ONLY channel names
# This avoids grep truncation on 400+ char lines
grep -c 'EUROSPORT 1 4K' /tmp/ape_list.m3u8
grep -n 'EUROSPORT 1 4K' /tmp/ape_list.m3u8 | sed 's/.*tvg-name=/NAME=/' | sed 's/ tvg-logo.*//'
```

**WHY THIS MATTERS**: M3U8 lines are 300-800 chars long. Plain `grep` shows truncated output where the channel name (at the END of the line) gets cut off. Always use `sed` to extract just the name.

## Step 2: Extract the Resolve URL

```bash
# Get the line number of the channel
LINE=$(grep -n 'CHANNEL_NAME_HERE' /tmp/ape_list.m3u8 | head -1 | cut -d: -f1)

# Extract the http URL that follows the EXTINF block
awk "NR>=$LINE && /^http/{print; exit}" /tmp/ape_list.m3u8 > /tmp/channel_url.txt

# Extract srv token
grep -oP 'srv=[^&]+' /tmp/channel_url.txt

# Decode srv token (base64: host|user|pass)
echo 'TOKEN_HERE' | base64 -d
```

## Step 3: Test the Pipeline

```bash
# 1. Test resolve_quality.php with srv token
curl -sk 'https://localhost/resolve_quality.php?ch=CHANNEL_ID&p=P2&sid=CHANNEL_ID&srv=SRV_TOKEN' | head -10

# 2. Extract the final upstream URL
STREAM_URL=$(curl -sk 'https://localhost/resolve_quality.php?ch=CHANNEL_ID&p=P2&sid=CHANNEL_ID&srv=SRV_TOKEN' | tail -1)

# 3. Test upstream directly
curl -sv "$STREAM_URL" 2>&1 | head -20
```

## Step 4: Diagnose

| HTTP Code | Meaning | Fix |
|:---:|:---|:---|
| 200 | Stream works | Player issue, not server |
| 000 | Connection reset | Provider blocked channel/IP |
| 301 | HTTP→HTTPS redirect | Player doesn't follow redirects |
| 403 | Auth rejected | Credentials expired/wrong |
| 404 | Channel removed | Provider dropped the channel |
| 405 | Method not allowed | Provider rejects GET or HEAD |
| Fallback | No srv token | M3U8 list missing credentials |

## Error 405 Specific Root Causes

1. **"405 Stream not reachable"** in OTT Navigator = upstream connection reset/refused
2. Provider server returns TCP RST = channel disabled on their end
3. Missing `srv` token = resolve returns `http://fallback-unavailable/...` → player shows 405
4. HTTP→HTTPS redirect without player support → 405

## Quick One-Liner Diagnosis

```bash
# Full diagnosis in one command:
CH="124098" SRV="bGluZS50aXZpLW90dC5uZXR8..." && \
  echo "=== RESOLVE ===" && \
  curl -sk "https://localhost/resolve_quality.php?ch=$CH&p=P2&sid=$CH&srv=$SRV" | tail -1 && \
  echo "=== UPSTREAM ===" && \
  timeout 5 curl -sv $(curl -sk "https://localhost/resolve_quality.php?ch=$CH&p=P2&sid=$CH&srv=$SRV" | tail -1) 2>&1 | head -15
```
