const fs = require('fs');

const filePath = 'C:\\Users\\HFRC\\Downloads\\APE_TYPED_ARRAYS_ULTIMATE_20260319 (7).m3u8';
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n').map(l => l.trim());

let stats = {
    totalChannels: 0,
    av1CountLcevc: 0,
    hevcCountLcevc: 0,
    otherCountLcevc: 0,
    totalTags: 0,
    overflowB64Count: 0,
    b64ValidCount: 0,
    b64InvalidCount: 0,
    b64KeysCounts: [],
    av1FallbackModulesCount: 0,
    audioExpandedCount: 0,
    temporalSRAICount: 0,
};

let currentChannelLines = [];
let inChannel = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    if (line.startsWith('#EXTINF:')) {
        if (currentChannelLines.length > 0) {
            analyzeChannel(currentChannelLines);
        }
        currentChannelLines = [line];
        inChannel = true;
    } else if (inChannel) {
        currentChannelLines.push(line);
    }
}
if (currentChannelLines.length > 0) analyzeChannel(currentChannelLines);

function analyzeChannel(channelLines) {
    stats.totalChannels++;
    stats.totalTags += channelLines.length;

    // Check LCEVC Base Codec
    const baseCodecTag = channelLines.find(l => l.startsWith('#EXT-X-APE-LCEVC-BASE-CODEC:'));
    if (baseCodecTag) {
        const val = baseCodecTag.split(':')[1];
        if (val === 'AV1') stats.av1CountLcevc++;
        else if (val === 'HEVC' || val === 'H265') stats.hevcCountLcevc++;
        else stats.otherCountLcevc++;
    }

    // Check Base64 Overflow
    const overflowTag = channelLines.find(l => l.startsWith('#EXT-X-APE-OVERFLOW-HEADERS:'));
    if (overflowTag) {
        stats.overflowB64Count++;
        const b64 = overflowTag.substring('#EXT-X-APE-OVERFLOW-HEADERS:'.length).trim();
        try {
            const decoded = Buffer.from(b64, 'base64').toString('utf8');
            const json = JSON.parse(decoded);
            const keys = Object.keys(json).length;
            stats.b64KeysCounts.push(keys);
            stats.b64ValidCount++;
        } catch (e) {
            stats.b64InvalidCount++;
            console.log(`[B64 ERROR] Channel ${stats.totalChannels}: ${e.message}`);
        }
    }

    // Features
    if (channelLines.some(l => l.startsWith('#EXT-X-APE-AV1-FALLBACK-ENABLED:true'))) stats.av1FallbackModulesCount++;
    if (channelLines.some(l => l.startsWith('#EXT-X-APE-AUDIO-ATMOS:true'))) stats.audioExpandedCount++;
    if (channelLines.some(l => l.startsWith('#EXT-X-APE-AI-TEMPORAL-SR:true'))) stats.temporalSRAICount++;
}

console.log('============================================');
console.log('=== AUDITORIA LISTA V18.2 (120/120 TEST) ===');
console.log('============================================');
console.log(`Total Canales: ${stats.totalChannels}`);
console.log(`Promedio Tags / Canal: ${(stats.totalTags / stats.totalChannels).toFixed(1)}`);
console.log(`\n-- MODULOS AVANZADOS --`);
console.log(`Fallback AV1 Inyectados: ${stats.av1FallbackModulesCount}`);
console.log(`Audio Expandido ATMs: ${stats.audioExpandedCount}`);
console.log(`AI Temporal SR: ${stats.temporalSRAICount}`);
console.log(`\n-- FIX 1: LCEVC BASE CODEC DINAMICO --`);
console.log(`Canales que dicen ser Base AV1: ${stats.av1CountLcevc}`);
console.log(`Canales que dicen ser Base HEVC: ${stats.hevcCountLcevc}`);
console.log(`Canales que dicen ser Base Otros: ${stats.otherCountLcevc}`);
console.log(`\n-- FIX 2: OVERFLOW B64 PAYLOAD UTF-8 --`);
console.log(`Tags de Overflow B64 generados: ${stats.overflowB64Count}`);
console.log(`Payloads B64 VÁLIDOS (Sin corromper): ${stats.b64ValidCount}`);
console.log(`Payloads B64 INVÁLIDOS (Corrompidos o truncados): ${stats.b64InvalidCount}`);

if (stats.b64ValidCount > 0) {
    const minKeys = Math.min(...stats.b64KeysCounts);
    const maxKeys = Math.max(...stats.b64KeysCounts);
    console.log(`Cantidad de Cabeceras Payload (Min-Max): ${minKeys} - ${maxKeys}`);
}

console.log('============================================');
