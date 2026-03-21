const fs = require('fs');
const content = fs.readFileSync('frontend/js/ape-v9/m3u8-typed-arrays-ultimate.js', 'utf8');

// Simple eval to load the global functions
try {
    eval(content);
    console.log("Syntax OK. Functions loaded successfully.");
} catch(e) {
    console.error("Syntax Error in script:", e);
    process.exit(1);
}
