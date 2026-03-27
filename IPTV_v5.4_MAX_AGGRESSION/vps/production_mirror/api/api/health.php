<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin');
if (['REQUEST_METHOD']==='OPTIONS'){http_response_code(204);exit;}
echo json_encode(['status'=>'ok','service'=>'IPTV-APE VPS','version'=>'6.2.0','ts'=>date('c')]);
