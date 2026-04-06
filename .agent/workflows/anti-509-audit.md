---
description: Audit the VPS for any process, cron, or code that could consume IPTV provider connections and cause 509 errors
---

# AUTONOMOUS AUDIT BATTLE-WORKFLOW: ANTI-509 & SERVER DE-CLOAK

Este workflow instruye a la Inteligencia Artificial a verificar la letalidad de la configuración VPS y a purgar cualquier elemento (logs excesivos, cron jobs zombis o sondeos en segundo plano) que puedan traicionar nuestra posición a los competidores, o peor, disparar la limitación de consumo de conexiones (Error 509 del proveedor).

## PASO 1: Destrucción de Sondas Phantom (Anti-Probe 509)
- **Objetivo:** Garantizar el cumplimiento del "Zero-Probe". El VPS APE NUNCA debe tocar al proveedor M3U8 a menos que el reproductor inicie un stream en vivo.
- **Acción (IA):** Debes auditar exhaustivamente código en PHP (especialmente cronjobs o sondas tipo Health Engine/Guardian) para asegurarte de que **ninguno** lanza requests paralelos masivos sin supervisión humana a las IPs fuente para descargar Metadata (EPG o listados fantasma).

## PASO 2: Supresión LOLBins y Post-Exploit Hooks en PHP
- **Objetivo:** Si un competidor logró Inyección, asfixiar su post-explotación.
- **Acción (IA):** Verificar las configuraciones `disable_functions` en el servidor si se permite (`php.ini`). Asegurarse visual o teóricamente de que el código no hace uso masivo innecesario de la triada fatal: `system()`, `exec()`, `passthru()`. Si los usa, asegurar que escapa 100% de los parámetros con `escapeshellarg()`.

## PASO 3: Blindaje Forense (Anti-WireShark Server Side)
- **Objetivo:** La competencia intentará medir tiempos de respuesta y cabeceras exactas.
- **Acción (IA):** Auditar que el script `resolve...` o `guardian.php` expulsen un error confuso tipo L7 (`HTTP 405 Method Not Allowed`, o un HTML simple `It works!`) a cualquier Agente Usuario no aprobado, o petición fallida, o petición vacía sin parámetros con la máxima eficiencia sin invocar el backend C-core de procesamiento.
