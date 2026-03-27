<?php
// Wrapper to test resolve_quality.php with full error reporting
ini_set('display_errors', '1');
error_reporting(E_ALL);

// Simulate GET params
$_GET['ch'] = '1312008';
$_GET['p'] = 'auto';
$_GET['mode'] = 'adaptive';
$_SERVER['REQUEST_METHOD'] = 'GET';
$_SERVER['HTTP_USER_AGENT'] = 'Mozilla/5.0 (Linux; Android 11; AFTKM) AppleWebKit/537.36';
$_SERVER['QUERY_STRING'] = 'ch=1312008&p=auto&mode=adaptive';

try {
    ob_start();
    include __DIR__ . '/resolve_quality.php';
    $output = ob_get_clean();
    echo $output;
} catch (\Throwable $e) {
    echo "CAUGHT: " . $e->getMessage() . "\n";
    echo "FILE: " . $e->getFile() . ":" . $e->getLine() . "\n";
    echo "TRACE:\n" . $e->getTraceAsString() . "\n";
}
