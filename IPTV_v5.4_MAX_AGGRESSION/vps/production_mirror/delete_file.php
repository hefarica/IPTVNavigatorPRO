<?php
/**
 * ============================================
 * 🗑️ IPTV Navigator PRO - Delete File
 * ============================================
 * Endpoint: POST /delete_file.php
 * Body: filename=<filename>
 * Returns: { ok: bool, size_freed_mb: float }
 * ============================================
 */

// CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed, use POST']);
    exit;
}

$filename = isset($_POST['filename']) ? basename($_POST['filename']) : '';

if (empty($filename)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'No filename provided']);
    exit;
}

// Security: only allow m3u8/m3u files
$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
if (!in_array($ext, ['m3u8', 'm3u', 'json', 'mpd', 'zip'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Only .m3u8, m3u, json, mpd, zip files can be deleted']);
    exit;
}

// Search in known directories
$searchDirs = ['/var/www/lists/', '/var/www/html/lists/', '/var/www/iptv-ape/lists/'];
$found = false;
$filePath = '';

foreach ($searchDirs as $dir) {
    $candidate = $dir . $filename;
    if (file_exists($candidate) && is_file($candidate)) {
        $filePath = $candidate;
        $found = true;
        break;
    }
}

if (!$found) {
    http_response_code(404);
    echo json_encode(['ok' => false, 'error' => 'File not found', 'filename' => $filename]);
    exit;
}

$size = filesize($filePath);
$sizeMB = round($size / 1024 / 1024, 1);

if (!unlink($filePath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to delete file', 'filename' => $filename]);
    exit;
}

// ═══ CASCADE CLEANUP: Delete associated channel_map and cache files ═══
$cascadeDeleted = [];
$baseName = pathinfo($filename, PATHINFO_FILENAME);

// 1. Delete channels_map.json (mirrors the M3U8 list)
foreach ($searchDirs as $dir) {
    $mapFile = $dir . $baseName . '.channels_map.json';
    if (file_exists($mapFile)) {
        @unlink($mapFile);
        $cascadeDeleted[] = basename($mapFile);
    }
}
// Also check /var/www/html/ root for channel maps
$rootMap = '/var/www/html/' . $baseName . '.channels_map.json';
if (file_exists($rootMap)) {
    @unlink($rootMap);
    $cascadeDeleted[] = basename($rootMap);
}

// 2. Purge PHP file cache entries for this list (deterministic by prefix)
$cacheDir = '/var/cache/iptv-ape/';
if (is_dir($cacheDir)) {
    $cachePattern = $cacheDir . 'resolve_' . $baseName . '_*.cache';
    $cacheFiles = glob($cachePattern);
    foreach ($cacheFiles as $cf) {
        @unlink($cf);
        $cascadeDeleted[] = basename($cf);
    }
}

// 3. Purge Nginx fastcgi_cache (nuclear but safe)
@exec('rm -rf /var/cache/nginx/resolver/* 2>/dev/null');

echo json_encode([
    'ok' => true,
    'filename' => $filename,
    'size_freed' => $size,
    'size_freed_mb' => $sizeMB,
    'cascade_deleted' => $cascadeDeleted,
    'message' => "Deleted {$filename} ({$sizeMB} MB freed)" . (count($cascadeDeleted) > 0 ? " + " . count($cascadeDeleted) . " mirror(s)" : "")
]);
