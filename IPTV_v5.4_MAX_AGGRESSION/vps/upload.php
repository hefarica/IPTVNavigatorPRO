<?php

/**
 * ═══════════════════════════════════════════════════════════════════════
 * 🚀 UPLOAD.PHP - APE ULTIMATE v4.0 (BULLETPROOF EDITION)
 * ═══════════════════════════════════════════════════════════════════════
 * 🛡️ Anti-500 Error | Anti-Timeouts | RAW Binary Stream Support
 * Capacidad: M3U8 y ZIP hasta 500MB (limitado sólo por NGINX).
 * 📝 Este script soporta FormData normal (FILES) O envíos crudos binarios.
 */

// 1. HEADERS CORS INFALIBLES (Sin wildcards conflictivas si NGINX las pone)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET, HEAD");
header("Access-Control-Allow-Headers: Content-Type, Content-Length, X-Requested-With, X-File-Name");
header("Access-Control-Max-Age: 86400"); // Cache de options

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// 2. CONFIGURACIÓN DEL ENTORNO PHP PARA EVITAR TIMEOUTS EN ZIP GRANDES
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);
set_time_limit(3600); // 1 hora máximo
ini_set('memory_limit', '512M');

// 3. TARGET DIRECTORY REGLAS
$TARGET_DIR = '/var/www/lists/';
if (!is_dir($TARGET_DIR)) {
    mkdir($TARGET_DIR, 0755, true);
} // Asegurar de todos modos.

$response = [
    'success' => false,
    'exists' => false,
    'error' => '',
    'filename' => '',
    'method' => ''
];

try {
    // -------------------------------------------------------------
    // Procesamiento Común
    // -------------------------------------------------------------
    $uploadedFilePath = "";

    // MÉTODO 1: RAW BINARY UPLOAD (Evita Error 500 por parseo multipart)
    if (isset($_SERVER['HTTP_X_FILE_NAME'])) {
        $filename = basename($_SERVER['HTTP_X_FILE_NAME']);
        $targetFile = $TARGET_DIR . $filename;
        $input = fopen('php://input', 'rb');
        $output = fopen($targetFile, 'wb');
        if ($input && $output) {
            $bytes = stream_copy_to_stream($input, $output);
            fclose($input);
            fclose($output);
            if ($bytes > 0) {
                $uploadedFilePath = $targetFile;
                $response['method'] = "RAW_PHPINPUT";
                $response['size'] = $bytes;
            }
        }
    }

    // MÉTODO 2: CLÁSICO FORM-DATA (multipart/form-data)
    if (empty($uploadedFilePath) && isset($_FILES['file'])) {
        $file = $_FILES['file'];
        if ($file['error'] !== UPLOAD_ERR_OK) {
            throw new Exception("Error de subida PHP: " . $file['error']);
        }
        $filename = basename($file['name']);
        if (empty($filename)) {
            $filename = "payload_" . time() . ".zip"; // Fallback name
        }
        $targetFile = $TARGET_DIR . $filename;
        if (move_uploaded_file($file['tmp_name'], $targetFile)) {
            $uploadedFilePath = $targetFile;
            $response['method'] = "FORM_DATA";
            $response['size'] = filesize($targetFile);
        } else {
            throw new Exception("Fallo en move_uploaded_file. Verifica permisos chmod de /lists/.");
        }
    }

    if (empty($uploadedFilePath)) {
        throw new Exception("No payload received. \$_FILES vacio y php://input sin cabecera X-File-Name.");
    }

    // -------------------------------------------------------------
    // DESPLIEGUE ATÓMICO: Extracción in-situ de ZIP
    // -------------------------------------------------------------
    $isZip = (strtolower(pathinfo($uploadedFilePath, PATHINFO_EXTENSION)) === 'zip');
    $finalFilename = basename($uploadedFilePath);

    if ($isZip && class_exists('ZipArchive')) {
        $zip = new ZipArchive;
        if ($zip->open($uploadedFilePath) === TRUE) {
            $masterM3u8 = null;
            $htmlDir = '/var/www/html/';

            // Recorrer y distribuir quirúrgicamente
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $name = $zip->getNameIndex($i);

                if (preg_match('/\.json$/i', $name)) {
                    // Los mapas de canales van al document root para que PHP los lea
                    $zip->extractTo($htmlDir, array($name));
                } else if (preg_match('/\.mpd$/i', $name)) {
                    // Las listas DASH estáticas
                    if (!$masterM3u8) $masterM3u8 = $name; // Si es MPD, asume que es master a menos que haya un m3u8
                    $zip->extractTo($TARGET_DIR, array($name));
                } else if (preg_match('/\.m3u8$/i', $name) || preg_match('/\.m3u$/i', $name)) {
                    // Los M3U8
                    $masterM3u8 = $name; // Se asume que el master principal es .m3u8 o .m3u
                    $zip->extractTo($TARGET_DIR, array($name));
                } else {
                    // Cualquier otro asset
                    $zip->extractTo($TARGET_DIR, array($name));
                }
            }
            $zip->close();

            // Eliminar el archivo postal/ZIP una vez que se extrajo de manera atómica
            unlink($uploadedFilePath);

            if ($masterM3u8) {
                $finalFilename = $masterM3u8;
                $response['extracted_zip'] = true;
            }
        } else {
            throw new Exception("El archivo es un ZIP pero no pudo abrirse/extraerse.");
        }
    }

    $response['success'] = true;
    $response['exists'] = true;
    $response['filename'] = $finalFilename;

    // AUTO-GZIP: Compress .m3u8 and replace original with placeholder
    if (preg_match('/\.m3u8$/i', $finalFilename)) {
        $fullPath = $TARGET_DIR . $finalFilename;
        $gzPath = $fullPath . '.gz';
        exec('gzip -9 -f -k ' . escapeshellarg($fullPath) . ' 2>&1', $gzOut, $gzCode);
        if ($gzCode === 0 && file_exists($gzPath)) {
            file_put_contents($fullPath, "#EXTM3U\n");
            $response['gzip'] = true;
            $response['gz_size'] = filesize($gzPath);
            $response['gz_savings'] = round((1 - filesize($gzPath) / max($response['size'] ?? 1, 1)) * 100) . '%';
        }
    }

    http_response_code(200);
    echo json_encode($response);
} catch (Exception $e) {
    http_response_code(500);
    $response['error'] = $e->getMessage();
    echo json_encode($response);
}
