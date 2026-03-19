const fs = require('fs');
const lines = fs.readFileSync('C:/Users/HFRC/Downloads/APE_TYPED_ARRAYS_ULTIMATE_20260319 (6).m3u8', 'utf8').split('\n');
let overflow = '';
for (let l of lines) {
    if (l.startsWith('#EXT-X-APE-OVERFLOW-HEADERS:')) {
        overflow = l.split(':')[1];
        break;
    }
}
if (overflow) {
    const jsonStr = Buffer.from(overflow, 'base64').toString('utf8');
    console.log("FIRST OVERFLOW JSON DECODED");
    console.log("ISP Segmentation Pipeline present:", jsonStr.includes('X-ISP-Segment-Pipeline'));
    console.log("ISP Throttle Level present:", jsonStr.includes('X-ISP-Throttle-Level'));
    console.log("Keys found:", Object.keys(JSON.parse(jsonStr)).length);
} else {
    console.log("NO OVERFLOW FOUND ANYWHERE");
}
