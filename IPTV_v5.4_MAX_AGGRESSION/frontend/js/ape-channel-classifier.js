/**
 * ═══════════════════════════════════════════════════════════════════════════════════════
 * 🧠 APE CHANNEL CLASSIFIER v1.0.0
 * Sistema de Clasificación Jerárquica Inteligente para Canales IPTV
 * ═══════════════════════════════════════════════════════════════════════════════════════
 * 
 * JERARQUÍA DE 3 NIVELES:
 *   Nivel 1: REGIÓN     → LATINO, EUROPE, USA, RESTO DEL MUNDO
 *   Nivel 2: CATEGORÍA  → DEPORTES, CINE, NOTICIAS, INFANTIL, etc.
 *   Nivel 3: CALIDAD    → ULTRA HD, FULL HD, SD
 * 
 * FORMATO FINAL: "🌎 LATINO · ⚽ DEPORTES · ULTRA HD"
 * 
 * @author APE Engine
 * @version 1.0.0
 * @date 2026-01-12
 * ═══════════════════════════════════════════════════════════════════════════════════════
 */

(function () {
    'use strict';

    const VERSION = '1.0.0';
    const REGION_EMOJI = '🌎'; // Mismo emoji para todas las regiones

    // ═══════════════════════════════════════════════════════════════════════════════════
    // 🔗 Iconos de Calidad Embebidos (Base64 para evitar problemas de red/SSL)
    // ═══════════════════════════════════════════════════════════════════════════════════
    const QUALITY_ICONS = {
        'ULTRA HD': 'icons/quality-ultra-hd.svg',
        'FULL HD': 'icons/quality-full-hd.svg',
        'SD': 'icons/quality-sd.svg'
    };

    // ═══════════════════════════════════════════════════════════════════════════════════
    // 🔤 PALABRAS CLAVE DE IDIOMA ESPAÑOL (Prioridad máxima para clasificar como LATINO)
    // Cualquier canal con estas palabras → LATINO automáticamente
    // ═══════════════════════════════════════════════════════════════════════════════════
    const SPANISH_LANGUAGE_KEYWORDS = [
        'EN ESPAÑOL', 'ESPAÑOL', 'SPANISH', 'LATINO', 'LATINA',
        'LATINOAMERICA', 'LATINOAMÉRICA', 'LATAM', 'HISPANO',
        'ESPAÑA', 'SPAIN', 'CASTELLANO', 'MEX', 'MEXICO', 'MÉXICO',
        'ARG', 'ARGENTINA', 'COL', 'COLOMBIA', 'CHILE', 'PERU', 'PERÚ',
        'SUDAMERICA', 'SUDAMÉRICA', 'CENTROAMERICA', 'CENTROAMÉRICA',
        'SUR', 'CARIBE', 'IBEROAMERICA', 'IBEROAMÉRICA',
        'DEPORTES', // ESPN DEPORTES, FOX DEPORTES → LATINO
        'UNIVERSO' // NBC UNIVERSO → LATINO
    ];

    // ═══════════════════════════════════════════════════════════════════════════════════
    // 🌎 NIVEL 1: PATRONES DE REGIÓN
    // ═══════════════════════════════════════════════════════════════════════════════════
    const REGION_PATTERNS = {

        LATINO: {
            name: 'LATINO',
            emoji: REGION_EMOJI,
            // Rutas de logo que indican región
            logo_paths: [
                '/ARGENTINA/', '/MEXICO/', '/COLOMBIA/', '/CHILE/', '/PERU/',
                '/VENEZUELA/', '/ECUADOR/', '/BOLIVIA/', '/URUGUAY/', '/PARAGUAY/',
                '/SPAIN/', '/ESPAÑA/', '/LATINO/', '/LAT/', '/LATAM/', '/SPANISH/',
                '/COSTA_RICA/', '/PANAMA/', '/GUATEMALA/', '/HONDURAS/', '/EL_SALVADOR/',
                '/NICARAGUA/', '/REPUBLICA_DOMINICANA/', '/PUERTO_RICO/', '/CUBA/',
                '/HISPANO/', '/TELEMUNDO/', '/UNIVISION/'
            ],
            // Canales conocidos
            channel_keywords: [
                // ═══ ARGENTINA ═══
                'TELEFE', 'TYC SPORTS', 'C5N', 'TN ARGENTINA', 'CANAL 13 ARG',
                'AMERICA TV ARG', 'TV PUBLICA ARG', 'FOX SPORTS ARG', 'CRONICA',
                'EL TRECE', 'TELEFÉ', 'DEPORTV', 'TYCSPORTS', 'TNT SPORTS ARG',

                // ═══ MEXICO ═══
                'TELEVISA', 'TV AZTECA', 'CANAL 5 MEX', 'IMAGEN TV', 'TUDN',
                'FOX SPORTS MEX', 'AZTECA 7', 'AZTECA UNO', 'LAS ESTRELLAS',
                'CANAL DE LAS ESTRELLAS', 'MULTIMEDIOS', 'ONCE TV', 'ADN 40',

                // ═══ COLOMBIA ═══
                'CARACOL', 'RCN', 'CANAL 1 COL', 'CITYTV', 'WIN SPORTS',
                'SEÑAL COLOMBIA', 'TELEANTIOQUIA', 'TELEPACIFICO', 'TELEPACÍFICO',

                // ═══ CHILE ═══
                'TVN CHILE', 'MEGA', 'CHV', 'CANAL 13 CHILE', 'ESPN CHILE',
                'CHILEVISION', 'CHILEVISIÓN', 'LA RED', 'TV+',

                // ═══ ESPAÑA ═══
                'LA 1', 'LA 2', 'ANTENA 3', 'TELECINCO', 'LA SEXTA', 'CUATRO',
                'MOVISTAR', 'MOVISTAR+', 'GOL', 'REAL MADRID TV', 'BARCA TV',
                'TV3', 'TELEMADRID', 'CANAL SUR', 'ETB', 'DAZN ESPAÑA',
                'LALIGA', 'LA LIGA',

                // ═══ USA LATINO (muy importante) ═══
                'UNIVISION', 'TELEMUNDO', 'GALAVISION', 'GALAVÍSION', 'ESTRELLA TV',
                'UNIMAS', 'UNIMÁS', 'AZTECA AMERICA', 'AZTECA AMÉRICA',
                'BANDAMAX', 'TELEHIT', 'ESPN DEPORTES', 'FOX DEPORTES',
                'NBC UNIVERSO', 'DISCOVERY EN ESPAÑOL', 'HISTORY EN ESPAÑOL',
                'CNN EN ESPAÑOL', 'BEIN EN ESPAÑOL', 'BEIN SPORTS EN ESPAÑOL',

                // ═══ CADENAS INTERNACIONALES CON VERSIÓN LATINO ═══
                'DAZN ESPAÑA', 'DAZN LATINO', 'DAZN EN ESPAÑOL',
                'BEIN SPORTS ESPAÑOL', 'BEIN EN ESPAÑOL', 'BEIN ESPAÑA',
                'DW ESPAÑOL', 'DW EN ESPAÑOL', 'DEUTSCHE WELLE ESPAÑOL',
                'EURONEWS ESPAÑOL', 'FRANCE 24 ESPAÑOL', 'RT EN ESPAÑOL',
                'NHK WORLD ESPAÑOL', 'TV5MONDE ESPAÑOL', 'BBC MUNDO',
                'VOA ESPAÑOL', 'CARTOON NETWORK LA', 'DISNEY CHANNEL LA',
                'NICK LA', 'NICKELODEON LA', 'HBO LATINO', 'HBO LA',
                'CINEMAX LATINO', 'FOX LA', 'FX LA', 'TNT LA', 'SPACE LA',
                'AXN LA', 'WARNER LA', 'SONY LA', 'PARAMOUNT LA'
            ],
            // Prefijos de país ISO
            prefixes: ['ES', 'MX', 'CO', 'CL', 'PE', 'VE', 'EC', 'BO', 'UY', 'PY', 'CR', 'PA', 'GT', 'HN', 'SV', 'NI', 'DO', 'PR', 'CU']
        },

        EUROPE: {
            name: 'EUROPE',
            emoji: REGION_EMOJI,
            logo_paths: [
                '/UK/', '/ENGLAND/', '/BRITISH/', '/GERMANY/', '/FRANCE/',
                '/ITALY/', '/PORTUGAL/', '/NETHERLANDS/', '/BELGIUM/',
                '/AUSTRIA/', '/SWITZERLAND/', '/POLAND/', '/SWEDEN/',
                '/NORWAY/', '/DENMARK/', '/FINLAND/', '/IRELAND/',
                '/GREECE/', '/CZECH/', '/HUNGARY/', '/SLOVAKIA/',
                '/SCOTLAND/', '/WALES/', '/PREMIER/'
            ],
            channel_keywords: [
                // ═══ UK ═══
                'BBC', 'ITV', 'CHANNEL 4', 'CHANNEL 5', 'SKY UK', 'SKY SPORTS UK',
                'BT SPORT', 'PREMIER LEAGUE', 'TNT SPORTS UK', 'SKY NEWS',
                'SKY ONE', 'SKY ATLANTIC', 'DAVE', 'E4', 'FILM4',

                // ═══ GERMANY ═══
                'ZDF', 'ARD', 'RTL', 'PRO7', 'SAT1', 'SKY GERMANY', 'SPORT1',
                'DAZN GERMANY', 'EUROSPORT GERMANY', 'KABEL', 'VOX',

                // ═══ FRANCE ═══
                'TF1', 'FRANCE 2', 'FRANCE 3', 'M6', 'CANAL+ FR', 'BEIN FR',
                'RMC SPORT', 'EUROSPORT FRANCE', 'ARTE', 'W9',

                // ═══ ITALY ═══
                'RAI', 'MEDIASET', 'SKY ITALIA', 'DAZN ITALIA', 'SPORTITALIA',
                'CANALE 5', 'ITALIA 1', 'RETE 4', 'LA7',

                // ═══ PORTUGAL ═══
                'RTP', 'SIC', 'TVI', 'SPORT TV', 'BENFICA TV', 'PORTO TV',
                'SPORTING TV', 'ELEVEN SPORTS PT',

                // ═══ OTROS EUROPA ═══
                'EURONEWS', 'EUROSPORT', 'TV5MONDE', 'ARTE'
            ],
            prefixes: ['UK', 'GB', 'DE', 'FR', 'IT', 'PT', 'NL', 'BE', 'AT', 'CH', 'PL', 'SE', 'NO', 'DK', 'FI', 'IE', 'GR', 'CZ', 'HU', 'SK']
        },

        USA: {
            name: 'USA',
            emoji: REGION_EMOJI,
            logo_paths: [
                '/USA/', '/UNITED_STATES/', '/US/', '/AMERICAN/'
            ],
            channel_keywords: [
                // ═══ DEPORTES EN INGLÉS ═══
                'ESPN', 'FOX SPORTS', 'NBC SPORTS', 'CBS SPORTS', 'NFL NETWORK',
                'NBA TV', 'MLB NETWORK', 'NHL NETWORK', 'BALLY SPORTS',
                'YES NETWORK', 'MSG', 'NESN', 'ROOT SPORTS',

                // ═══ NOTICIAS EN INGLÉS ═══
                'CNN', 'FOX NEWS', 'MSNBC', 'CNBC', 'ABC NEWS', 'CBS NEWS',
                'NBC NEWS', 'BLOOMBERG', 'CSPAN', 'NEWSMAX', 'OAN',

                // ═══ ENTRETENIMIENTO EN INGLÉS ═══
                'HBO', 'SHOWTIME', 'STARZ', 'AMC', 'FX', 'TNT', 'TBS',
                'USA NETWORK', 'SYFY', 'COMEDY CENTRAL', 'MTV', 'VH1',
                'BRAVO', 'E!', 'OXYGEN', 'LIFETIME', 'HALLMARK',

                // ═══ DOCUMENTALES ═══
                'DISCOVERY', 'HISTORY', 'A&E', 'NATIONAL GEOGRAPHIC',
                'ANIMAL PLANET', 'TLC', 'ID', 'FOOD NETWORK', 'HGTV',

                // ═══ INFANTIL EN INGLÉS ═══
                'NICKELODEON', 'CARTOON NETWORK', 'DISNEY CHANNEL',
                'DISNEY XD', 'DISNEY JUNIOR', 'NICK JR', 'PBS KIDS',

                // ═══ STREAMING ═══
                'PEACOCK', 'PARAMOUNT+', 'HULU', 'MAX'
            ],
            prefixes: ['US'],
            // EXCLUIR canales latinos de USA (van a LATINO)
            exclude_keywords: [
                'UNIVISION', 'TELEMUNDO', 'GALAVISION', 'UNIMAS', 'ESPAÑOL',
                'SPANISH', 'LATINO', 'DEPORTES', 'EN ESPAÑOL', 'UNIVERSO'
            ]
        },

        RESTO_DEL_MUNDO: {
            name: 'RESTO DEL MUNDO',
            emoji: REGION_EMOJI,
            logo_paths: [
                // ═══ ARABIC / MIDDLE EAST ═══
                '/ARABIA/', '/ARABIC/', '/MIDDLE_EAST/', '/QATAR/', '/SAUDI/',
                '/UAE/', '/DUBAI/', '/KUWAIT/', '/EGYPT/', '/LEBANON/',
                '/BAHRAIN/', '/OMAN/', '/JORDAN/', '/IRAQ/', '/SYRIA/',

                // ═══ TURKEY ═══
                '/TURKEY/', '/TURK/', '/TR/',

                // ═══ ASIA ═══
                '/INDIA/', '/PAKISTAN/', '/BANGLADESH/', '/SRI_LANKA/',
                '/CHINA/', '/JAPAN/', '/KOREA/', '/INDONESIA/', '/MALAYSIA/',
                '/THAILAND/', '/VIETNAM/', '/PHILIPPINES/', '/SINGAPORE/',
                '/HONG_KONG/', '/TAIWAN/',

                // ═══ AFRICA ═══
                '/AFRICA/', '/NIGERIA/', '/SOUTH_AFRICA/', '/KENYA/',
                '/GHANA/', '/CAMEROON/', '/SENEGAL/', '/MOROCCO/', '/ALGERIA/',
                '/TUNISIA/', '/EGYPT/',

                // ═══ BALKANS / EASTERN EUROPE ═══
                '/ALBANIA/', '/ROMANIA/', '/BULGARIA/', '/SERBIA/', '/CROATIA/',
                '/BOSNIA/', '/MACEDONIA/', '/MONTENEGRO/', '/KOSOVO/', '/SLOVENIA/',
                '/RUSSIA/', '/UKRAINE/', '/BELARUS/',

                // ═══ OTROS ═══
                '/IRAN/', '/ISRAEL/', '/AUSTRALIA/', '/NEW_ZEALAND/',
                '/CANADA/', '/BRAZIL/', '/BRASIL/'
            ],
            channel_keywords: [
                // ═══ ARABIC ═══
                'AL KASS', 'AL JAZEERA', 'MBC', 'BEIN AR', 'ROTANA',
                'AL ARABIYA', 'DUBAI TV', 'ABU DHABI', 'QATAR TV',
                'SAUDI TV', 'KUWAIT TV', 'OSN', 'SHAHID', 'LBC',
                'BEIN SPORTS AR', 'SSC', 'ALKASS',

                // ═══ TURKEY ═══
                'TRT', 'SHOW TV', 'ATV TURK', 'STAR TV TR', 'KANAL D',
                'BEIN SPORTS TURKEY', 'S SPORT', 'FOX TV TR', 'TV8',

                // ═══ ASIA ═══
                'STAR INDIA', 'ZEE', 'COLORS', 'SONY INDIA', 'SET ASIA',
                'NHK', 'FUJI TV', 'TV ASAHI', 'KBS', 'MBC KOREA', 'SBS',
                'CCTV', 'PHOENIX', 'TVB', 'ASTRO', 'GMA', 'ABS-CBN',

                // ═══ BALKANS ═══
                'TOP CHANNEL', 'VIZION PLUS', 'KLAN', 'RTK', 'RTSH',
                'PRO TV', 'ANTENA 1', 'KANAL D RO', 'BTV', 'NOVA BG',
                'PINK', 'RTS', 'HRT', 'RTRS',

                // ═══ RUSSIA ═══
                'MATCH TV', 'PERVIY KANAL', 'ROSSIYA', 'NTV',

                // ═══ BRAZIL / PORTUGUESE ═══
                'GLOBO', 'SBT', 'RECORD', 'BAND', 'SPORTV'
            ],
            prefixes: [
                'AR', 'TR', 'IN', 'PK', 'BD', 'CN', 'JP', 'KR', 'ID', 'MY',
                'TH', 'VN', 'PH', 'RU', 'AL', 'RO', 'BG', 'RS', 'HR', 'BA',
                'MK', 'ME', 'XK', 'SI', 'UA', 'BY', 'IR', 'IL', 'MA', 'DZ',
                'EG', 'SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'JO', 'IQ', 'SY',
                'LB', 'AU', 'NZ', 'CA', 'BR', 'NG', 'ZA', 'KE', 'GH'
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════════════
    // 📺 NIVEL 2: PATRONES DE CATEGORÍA
    // ═══════════════════════════════════════════════════════════════════════════════════
    const CATEGORY_PATTERNS = {
        DEPORTES: {
            name: 'DEPORTES',
            emoji: '⚽',
            keywords: [
                'SPORT', 'SPORTS', 'DEPORTES', 'DEPORTE', 'ESPN', 'BEIN',
                'FOX SPORTS', 'SKY SPORTS', 'DAZN', 'EUROSPORT', 'NBA',
                'NFL', 'NHL', 'MLB', 'FIFA', 'UEFA', 'FUTBOL', 'FÚTBOL',
                'FOOTBALL', 'SOCCER', 'TENNIS', 'TENIS', 'GOLF',
                'F1', 'FORMULA 1', 'FÓRMULA 1', 'MOTOGP', 'MOTO GP',
                'BOXING', 'BOXEO', 'UFC', 'MMA', 'WWE', 'WRESTLING', 'LUCHA',
                'RACING', 'CARRERAS', 'OLYMPICS', 'OLIMPICOS', 'OLÍMPICOS',
                'TYC', 'WIN SPORTS', 'TNT SPORTS', 'TUDN', 'GOLTV', 'GOL TV',
                'LALIGA', 'LA LIGA', 'PREMIER', 'CHAMPIONS', 'COPA',
                'WORLD CUP', 'MUNDIAL', 'LIGA MX', 'SERIE A', 'BUNDESLIGA',
                'LIGUE 1', 'EREDIVISIE', 'CRICKET', 'RUGBY', 'HOCKEY',
                'BASKETBALL', 'BALONCESTO', 'VOLLEYBALL', 'VOLEIBOL',
                'ATHLETIC', 'ATLETISMO', 'SWIMMING', 'NATACION', 'NATACIÓN',
                'CYCLING', 'CICLISMO', 'SKIING', 'ESQUÍ', 'SURFING', 'SURF'
            ]
        },
        CINE: {
            name: 'CINE',
            emoji: '🎬',
            keywords: [
                'MOVIE', 'MOVIES', 'CINE', 'CINEMA', 'FILM', 'FILMS', 'PELICULAS', 'PELÍCULAS',
                'HBO', 'SHOWTIME', 'STARZ', 'AMC', 'TCM', 'CINEMAX',
                'PARAMOUNT', 'UNIVERSAL', 'SONY MOVIES', 'FOX MOVIES',
                'ACTION', 'ACCION', 'ACCIÓN', 'COMEDY', 'COMEDIA',
                'DRAMA', 'THRILLER', 'HORROR', 'TERROR', 'SCI-FI', 'CIENCIA FICCION',
                'PREMIERE', 'ESTRENO', 'ESTRENOS', 'GOLDEN', 'CLASSIC', 'CLASICO', 'CLÁSICO',
                'HOLLYWOOD', 'BOLLYWOOD', 'INDIE', 'FESTIVAL',
                'FILMZONE', 'FILMBOX', 'CINECANAL', 'STUDIO', 'STUDIOS',
                'AKSION', 'THRILLER', 'KOMEDI', 'ROMANTICO', 'ROMÁNTICO'
            ]
        },
        NOTICIAS: {
            name: 'NOTICIAS',
            emoji: '📰',
            keywords: [
                'NEWS', 'NOTICIAS', 'CNN', 'FOX NEWS', 'MSNBC', 'BBC NEWS',
                'SKY NEWS', 'AL JAZEERA', 'EURONEWS', 'DW', 'FRANCE 24',
                'RT', 'NHK WORLD', 'CNBC', 'BLOOMBERG', 'C5N', 'TN',
                'CRONICA', 'CRÓNICA', '24 HORAS', 'NOTICIAS 24', 'INFO', 'N24',
                'HEADLINE', 'BREAKING', 'LIVE NEWS', 'MUNDO', 'WORLD NEWS',
                'BUSINESS', 'ECONOMIA', 'ECONOMÍA', 'FINANCE', 'FINANZAS',
                'POLITICS', 'POLITICA', 'POLÍTICA', 'WEATHER', 'TIEMPO', 'CLIMA',
                'ARTA NEWS', 'TODO NOTICIAS', 'CANAL N', 'NTN24', 'TELESUR'
            ]
        },
        INFANTIL: {
            name: 'INFANTIL',
            emoji: '👶',
            keywords: [
                'KIDS', 'CHILDREN', 'INFANTIL', 'NIÑOS', 'BABY', 'BEBE', 'BEBÉ',
                'JUNIOR', 'JR', 'CARTOON', 'NICK', 'NICKELODEON', 'DISNEY',
                'BOOMERANG', 'TOON', 'TOONS', 'PBS KIDS', 'CBEEBIES',
                'CLAN', 'BOING', 'DISCOVERY KIDS', 'NAT GEO KIDS',
                'SMILE', 'BABY TV', 'BABY FIRST', 'ANIMADO', 'ANIMATION',
                'PRESCHOOL', 'PREESCOLAR', 'SPROUT', 'TREEHOUSE',
                'NICK JR', 'DISNEY JR', 'DISNEY JUNIOR', 'CARTOONITO'
            ]
        },
        MUSICA: {
            name: 'MUSICA',
            emoji: '🎵',
            keywords: [
                'MUSIC', 'MUSICA', 'MÚSICA', 'MTV', 'VH1', 'HIT', 'HITS',
                'RADIO', 'CONCERT', 'CONCIERTO', 'CMT', 'TRACE', 'MEZZO',
                'CLUBBING', 'PARTY', 'FIESTA', 'DANCE', 'ROCK', 'POP',
                'JAZZ', 'CLASSIC', 'SOUL', 'HIP HOP', 'RAP', 'REGGAETON',
                'LATIN MUSIC', 'LATINA MUSICA', 'KARAOKE', 'LIVE MUSIC',
                'BANDAMAX', 'TELEHIT', 'RITMOSON', 'SONY MUSIC'
            ]
        },
        DOCUMENTALES: {
            name: 'DOCUMENTALES',
            emoji: '📚',
            keywords: [
                'DOCUMENTARY', 'DOCUMENTALES', 'DOCUMENTAL', 'DISCOVERY',
                'NATIONAL GEOGRAPHIC', 'NAT GEO', 'HISTORY', 'HISTORIA',
                'ANIMAL PLANET', 'SCIENCE', 'CIENCIA', 'PLANETA', 'PLANET',
                'NATURE', 'NATURALEZA', 'WILDLIFE', 'ODISEA', 'VIAJAR',
                'TRAVEL', 'ADVENTURE', 'AVENTURA', 'EXPLORER', 'EXPLORADOR',
                'INVESTIGACION', 'INVESTIGACIÓN', 'INVESTIGATION', 'ID',
                'CRIME', 'CRIMEN', 'MYSTERY', 'MISTERIO', 'SMITHSONIAN'
            ]
        },
        ENTRETENIMIENTO: {
            name: 'ENTRETENIMIENTO',
            emoji: '🎭',
            keywords: [
                'ENTERTAINMENT', 'ENTRETENIMIENTO', 'VARIETY', 'VARIEDAD',
                'REALITY', 'LIFESTYLE', 'ESTILO DE VIDA', 'FASHION', 'MODA',
                'FOOD', 'COMIDA', 'COCINA', 'COOKING', 'CHEF', 'GOURMET',
                'E!', 'TLC', 'LIFETIME', 'HALLMARK', 'BRAVO', 'SERIES',
                'DRAMA', 'TELENOVELA', 'NOVELA', 'SOAP', 'TALK SHOW',
                'LATE NIGHT', 'MORNING', 'MAGAZINE', 'DIZI', 'TRING',
                'HOME', 'HOGAR', 'GARDEN', 'JARDIN', 'JARDÍN', 'DIY',
                'HGTV', 'ANTV', 'AZTV'
            ]
        },
        RELIGION: {
            name: 'RELIGION',
            emoji: '⛪',
            keywords: [
                'RELIGION', 'RELIGIOUS', 'RELIGIOSO', 'CHRISTIAN', 'CRISTIANO',
                'CATHOLIC', 'CATOLICO', 'CATÓLICO', 'CHURCH', 'IGLESIA',
                'GOSPEL', 'EVANGELIO', 'EWTN', 'TBN', 'GOD TV', 'ENLACE',
                'FE', 'FAITH', 'BIBLIA', 'BIBLE', 'ISLAMIC', 'ISLAM',
                'QURAN', 'CORAN', 'CORÁN', 'JEWISH', 'JUDIO', 'JUDÍO',
                'DAYSTAR', 'SHALOM', 'ANGELUS', 'TELEPAZ'
            ]
        },
        ADULTOS: {
            name: 'ADULTOS',
            emoji: '🔞',
            keywords: [
                'ADULT', 'ADULTO', 'ADULTOS', 'XXX', '+18', '18+',
                'PLAYBOY', 'PENTHOUSE', 'HUSTLE', 'BRAZZERS', 'VIVID',
                'EROTIC', 'EROTICO', 'ERÓTICO', 'SEXY', 'HOT',
                'PASSION', 'PASION', 'PASIÓN', 'SPICE', 'LATE NIGHT'
            ]
        },
        GENERALISTA: {
            name: 'GENERALISTA',
            emoji: '📡',
            keywords: [] // Catch-all - si no coincide con ninguna otra
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════════════
    // 📺 NIVEL 3: PATRONES DE CALIDAD
    // ═══════════════════════════════════════════════════════════════════════════════════
    const QUALITY_PATTERNS = {
        'ULTRA HD': {
            label: 'ULTRA HD',
            keywords: ['8K', '4K', 'UHD', 'ULTRA HD', '2160P', '4320P', 'ULTRAHD'],
            priority: 1,
            icon: QUALITY_ICONS['ULTRA HD']
        },
        'FULL HD': {
            label: 'FULL HD',
            keywords: ['FHD', 'FULL HD', '1080P', '1080I', '720P', 'HD', 'FULLHD', 'HIGH DEF'],
            priority: 2,
            icon: QUALITY_ICONS['FULL HD']
        },
        'SD': {
            label: 'SD',
            keywords: ['SD', '480P', '480I', '576P', '576I', '360P', '240P', 'LQ', 'LOW'],
            priority: 3,
            icon: QUALITY_ICONS['SD']
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════════════
    // 🧠 CLASE PRINCIPAL DEL CLASIFICADOR
    // ═══════════════════════════════════════════════════════════════════════════════════
    class APEChannelClassifier {

        constructor() {
            this.version = VERSION;
            this.stats = {
                total_classified: 0,
                by_region: {},
                by_category: {},
                by_quality: {}
            };

            console.log(`%c🧠 APE Channel Classifier v${VERSION} - Cargado`, 'color: #10b981; font-weight: bold;');
        }

        /**
         * 🧠 CLASIFICADOR PRINCIPAL
         * @param {Object} channel - Objeto canal con name, logo, category_name, etc.
         * @returns {Object} Resultado de clasificación con región, categoría y calidad
         */
        classify(channel) {
            const name = (channel.name || channel.tvg_name || channel.title || '').toUpperCase();
            const logo = (channel.logo || channel.tvg_logo || channel.stream_icon || '').toUpperCase();
            const categoryName = (channel.category_name || channel.group || '').toUpperCase();

            const result = {
                region: this._detectRegion(name, logo, categoryName),
                category: this._detectCategory(name, categoryName),
                quality: this._detectQuality(name),
                original: {
                    name: channel.name || channel.tvg_name || channel.title,
                    logo: channel.logo || channel.tvg_logo || channel.stream_icon,
                    category: channel.category_name || channel.group
                }
            };

            // Generar group_title final
            result.group_title = this._generateGroupTitle(result);

            // Actualizar estadísticas
            this._updateStats(result);

            return result;
        }

        /**
         * 🌎 NIVEL 1: Detectar Región
         */
        _detectRegion(name, logo, categoryName) {
            // ══════════════════════════════════════════════════════════════════
            // PRIORIDAD MÁXIMA: Sufijos de idioma español
            // "DAZN EN ESPAÑOL", "beIN SPORTS ESPAÑOL", etc. → LATINO
            // ══════════════════════════════════════════════════════════════════
            if (SPANISH_LANGUAGE_KEYWORDS.some(kw => name.includes(kw))) {
                return {
                    group: 'LATINO',
                    emoji: REGION_EMOJI,
                    confidence: 'language_keyword',
                    matched: SPANISH_LANGUAGE_KEYWORDS.find(kw => name.includes(kw))
                };
            }

            // Verificar también en categoría del proveedor
            if (SPANISH_LANGUAGE_KEYWORDS.some(kw => categoryName.includes(kw))) {
                return {
                    group: 'LATINO',
                    emoji: REGION_EMOJI,
                    confidence: 'category_keyword',
                    matched: SPANISH_LANGUAGE_KEYWORDS.find(kw => categoryName.includes(kw))
                };
            }

            // ══════════════════════════════════════════════════════════════════
            // PRIORIDAD 2: Excluir USA Latino → va a LATINO, no USA
            // ══════════════════════════════════════════════════════════════════
            const usaExcludes = REGION_PATTERNS.USA.exclude_keywords || [];
            if (usaExcludes.some(kw => name.includes(kw))) {
                return {
                    group: 'LATINO',
                    emoji: REGION_EMOJI,
                    confidence: 'usa_latino_excluded',
                    matched: usaExcludes.find(kw => name.includes(kw))
                };
            }

            // ══════════════════════════════════════════════════════════════════
            // PRIORIDAD 3: Logo Path (muy confiable)
            // ══════════════════════════════════════════════════════════════════
            for (const [regionKey, config] of Object.entries(REGION_PATTERNS)) {
                if (config.logo_paths && config.logo_paths.some(p => logo.includes(p.toUpperCase()))) {
                    return {
                        group: config.name,
                        emoji: config.emoji,
                        confidence: 'logo_path',
                        matched: config.logo_paths.find(p => logo.includes(p.toUpperCase()))
                    };
                }
            }

            // ══════════════════════════════════════════════════════════════════
            // PRIORIDAD 4: Nombre de Canal Conocido
            // ══════════════════════════════════════════════════════════════════
            for (const [regionKey, config] of Object.entries(REGION_PATTERNS)) {
                if (config.channel_keywords && config.channel_keywords.some(kw => name.includes(kw))) {
                    return {
                        group: config.name,
                        emoji: config.emoji,
                        confidence: 'channel_name',
                        matched: config.channel_keywords.find(kw => name.includes(kw))
                    };
                }
            }

            // ══════════════════════════════════════════════════════════════════
            // PRIORIDAD 5: Prefijo de País (┃XX┃)
            // ══════════════════════════════════════════════════════════════════
            const prefixMatch = name.match(/[┃\|]([A-Z]{2})[┃\|]/);
            if (prefixMatch) {
                const prefix = prefixMatch[1];
                for (const [regionKey, config] of Object.entries(REGION_PATTERNS)) {
                    if (config.prefixes && config.prefixes.includes(prefix)) {
                        return {
                            group: config.name,
                            emoji: config.emoji,
                            confidence: 'prefix',
                            matched: prefix
                        };
                    }
                }
            }

            // ══════════════════════════════════════════════════════════════════
            // DEFAULT: Resto del Mundo
            // ══════════════════════════════════════════════════════════════════
            return {
                group: 'RESTO DEL MUNDO',
                emoji: REGION_EMOJI,
                confidence: 'default',
                matched: null
            };
        }

        /**
         * 🎬 NIVEL 2: Detectar Categoría
         */
        _detectCategory(name, categoryName) {
            // Combinar nombre y categoría para búsqueda
            const searchText = `${name} ${categoryName}`;

            for (const [catKey, config] of Object.entries(CATEGORY_PATTERNS)) {
                if (config.keywords.length > 0 && config.keywords.some(kw => searchText.includes(kw))) {
                    return {
                        category: config.name,
                        emoji: config.emoji,
                        confidence: 'keyword',
                        matched: config.keywords.find(kw => searchText.includes(kw))
                    };
                }
            }

            // Default: Generalista
            return {
                category: 'GENERALISTA',
                emoji: '📡',
                confidence: 'default',
                matched: null
            };
        }

        /**
         * 📺 NIVEL 3: Detectar Calidad
         */
        _detectQuality(name) {
            // Ordenar por prioridad (ULTRA HD primero)
            const qualities = Object.entries(QUALITY_PATTERNS)
                .sort((a, b) => a[1].priority - b[1].priority);

            for (const [qualityKey, config] of qualities) {
                if (config.keywords.some(kw => name.includes(kw))) {
                    return {
                        quality: config.label,
                        icon: config.icon,
                        confidence: 'keyword',
                        matched: config.keywords.find(kw => name.includes(kw))
                    };
                }
            }

            // Default: FULL HD (asumimos calidad media si no se detecta)
            return {
                quality: 'FULL HD',
                icon: QUALITY_ICONS['FULL HD'],
                confidence: 'default',
                matched: null
            };
        }

        /**
         * 📦 Generar group-title final
         */
        _generateGroupTitle(result) {
            // Formato: "🌎 LATINO · ⚽ DEPORTES · ULTRA HD"
            const parts = [
                `${result.region.emoji} ${result.region.group}`,
                `${result.category.emoji} ${result.category.category}`,
                result.quality.quality
            ];

            return parts.join(' · ');
        }

        /**
         * 📊 Actualizar estadísticas
         */
        _updateStats(result) {
            this.stats.total_classified++;

            // Por región
            const region = result.region.group;
            this.stats.by_region[region] = (this.stats.by_region[region] || 0) + 1;

            // Por categoría
            const category = result.category.category;
            this.stats.by_category[category] = (this.stats.by_category[category] || 0) + 1;

            // Por calidad
            const quality = result.quality.quality;
            this.stats.by_quality[quality] = (this.stats.by_quality[quality] || 0) + 1;
        }

        /**
         * 📊 Obtener estadísticas
         */
        getStats() {
            return this.stats;
        }

        /**
         * 🔄 Resetear estadísticas
         */
        resetStats() {
            this.stats = {
                total_classified: 0,
                by_region: {},
                by_category: {},
                by_quality: {}
            };
        }

        /**
         * 🔗 Obtener URL de icono de calidad
         */
        getQualityIcon(quality) {
            return QUALITY_ICONS[quality] || QUALITY_ICONS['FULL HD'];
        }

        /**
         * 📋 Obtener todas las URLs de iconos de calidad
         */
        getQualityIcons() {
            return { ...QUALITY_ICONS };
        }

        /**
         * ➕ Agregar nuevo patrón de región
         */
        addRegionPattern(regionName, type, value) {
            if (REGION_PATTERNS[regionName]) {
                if (type === 'logo_path' && !REGION_PATTERNS[regionName].logo_paths.includes(value)) {
                    REGION_PATTERNS[regionName].logo_paths.push(value);
                    console.log(`✅ Logo path agregado a ${regionName}: ${value}`);
                } else if (type === 'keyword' && !REGION_PATTERNS[regionName].channel_keywords.includes(value)) {
                    REGION_PATTERNS[regionName].channel_keywords.push(value);
                    console.log(`✅ Keyword agregado a ${regionName}: ${value}`);
                } else if (type === 'prefix' && !REGION_PATTERNS[regionName].prefixes.includes(value)) {
                    REGION_PATTERNS[regionName].prefixes.push(value);
                    console.log(`✅ Prefijo agregado a ${regionName}: ${value}`);
                }
            }
        }

        /**
         * ➕ Agregar nuevo patrón de categoría
         */
        addCategoryPattern(categoryName, keyword) {
            if (CATEGORY_PATTERNS[categoryName] && !CATEGORY_PATTERNS[categoryName].keywords.includes(keyword)) {
                CATEGORY_PATTERNS[categoryName].keywords.push(keyword);
                console.log(`✅ Keyword agregado a categoría ${categoryName}: ${keyword}`);
            }
        }

        /**
         * 🔍 Clasificar array de canales
         */
        classifyBatch(channels) {
            return channels.map(ch => this.classify(ch));
        }

        /**
         * 📊 Obtener resumen de clasificación para un batch
         */
        getBatchSummary(classifiedChannels) {
            const summary = {
                total: classifiedChannels.length,
                by_region: {},
                by_category: {},
                by_quality: {},
                groups: new Set()
            };

            classifiedChannels.forEach(ch => {
                // Regiones
                const r = ch.region.group;
                summary.by_region[r] = (summary.by_region[r] || 0) + 1;

                // Categorías
                const c = ch.category.category;
                summary.by_category[c] = (summary.by_category[c] || 0) + 1;

                // Calidades
                const q = ch.quality.quality;
                summary.by_quality[q] = (summary.by_quality[q] || 0) + 1;

                // Grupos únicos
                summary.groups.add(ch.group_title);
            });

            summary.unique_groups = summary.groups.size;
            summary.groups = Array.from(summary.groups).sort();

            return summary;
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // 🌐 EXPORTAR GLOBALMENTE
    // ═══════════════════════════════════════════════════════════════════════════════════

    // Crear instancia global
    window.APEChannelClassifier = new APEChannelClassifier();

    // Exportar clase para instancias adicionales si se necesitan
    window.APEChannelClassifierClass = APEChannelClassifier;

    // Exportar constantes para referencia
    window.APE_CLASSIFICATION_PATTERNS = {
        REGION_PATTERNS,
        CATEGORY_PATTERNS,
        QUALITY_PATTERNS,
        QUALITY_ICONS,
        SPANISH_LANGUAGE_KEYWORDS
    };

    console.log(`
╔═══════════════════════════════════════════════════════════════════════════════════╗
║ 🧠 APE CHANNEL CLASSIFIER v${VERSION} - CARGADO                                      ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║ ✅ Nivel 1: ${Object.keys(REGION_PATTERNS).length} Regiones configuradas                                         ║
║ ✅ Nivel 2: ${Object.keys(CATEGORY_PATTERNS).length} Categorías configuradas                                      ║
║ ✅ Nivel 3: ${Object.keys(QUALITY_PATTERNS).length} Calidades configuradas                                         ║
║ ✅ Iconos de calidad disponibles en VPS (DuckDNS)                                 ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║ Uso: APEChannelClassifier.classify({ name: '...', logo: '...', category_name: '...'})║
╚═══════════════════════════════════════════════════════════════════════════════════╝
    `);

})();
