#!/bin/bash
# Quick channel diagnosis script
SEARCH="$1"
echo "=== SEARCHING: $SEARCH ==="
LINE=$(grep -n "$SEARCH" /tmp/ape_list.m3u8 | head -1 | cut -d: -f1)
echo "LINE=$LINE"

URL=$(awk "NR>=$LINE && /^http/{print; exit}" /tmp/ape_list.m3u8)
SRV=$(echo "$URL" | grep -oP 'srv=[^&]+' | sed 's/srv=//;s/%3D/=/g')
CH=$(echo "$URL" | grep -oP 'ch=[^&]+' | sed 's/ch=//')
echo "CH=$CH"

echo "=== DECODE SRV ==="
echo "$SRV" | base64 -d 2>/dev/null; echo

echo "=== RESOLVE OUTPUT ==="
RESOLVE=$(curl -sk "https://localhost/resolve_quality.php?ch=${CH}&p=P2&sid=${CH}&srv=${SRV}")
echo "$RESOLVE" | head -30

echo "=== STREAM URL ==="
STREAM=$(echo "$RESOLVE" | tail -1)
echo "$STREAM"

echo "=== TEST UPSTREAM ==="
timeout 5 curl -sv "$STREAM" 2>&1 | head -15
