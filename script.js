const audio = new (window.AudioContext || window.webkitAudioContext)();
function sfx(f, t, d) {
    if (audio.state === 'suspended') audio.resume();
    const o = audio.createOscillator();
    const v = audio.createGain();
    o.type = t;
    o.frequency.setValueAtTime(f, audio.currentTime);
    v.gain.setValueAtTime(0.05, audio.currentTime);
    v.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + d);
    o.connect(v);
    v.connect(audio.destination);
    o.start();
    o.stop(audio.currentTime + d);
}

function resetGame() {
    // 1. Detener cualquier timer activo
    clearInterval(debateTimer);

    // 2. Resetear variables de estado del juego
    // - Actualizar el estado inicial del juego
    game = { list: [], imp: 0, cit: 0, word: null, votes: {}, ended: false, noHints: false };
    idx = 0;
    voterIdx = 0;

    // 3. Limpiar la UI de votación
    document.getElementById('voter-options').innerHTML = '';
    document.getElementById('end-roles-list').innerHTML = '';

    // 4. Volver a la pantalla de menú
    switchS('screen-menu');

    // 5. Opcional: Sonido de reset
    sfx(200, 'sine', 0.2);
}

// --- CONFIGURACIÓN DE PACKS ---
const packs = {

    argento: {
        icon: "🇦🇷",
        label: "Argento",
        words: [
            // Agrega estas 100 palabras al array 'words' de argento
            { w: "GARRÓN", h: "Situación amarga e inesperada" },
            { w: "MORFI", h: "El combustible del cuerpo" },
            { w: "CHAMUYO", h: "Habilidad con la palabra para convencer" },
            { w: "QUILOMBO", h: "Desorden de proporciones bíblicas" },
            { w: "GUITA", h: "Lo que falta a fin de mes" },
            { w: "BIRRA", h: "Líquido dorado de los viernes" },
            { w: "BONDI", h: "Tiene su propio número y recorrido" },
            { w: "PIBE", h: "Cualquier persona joven, sin importar el nombre" },
            { w: "BOLUDO", h: "Insulto y saludo fraternal a la vez" },
            { w: "TRUCO", h: "Se gana mintiendo con cartas" },
            { w: "MALAMBO", h: "Ritmo de botas contra el suelo" },
            { w: "CONURBANO", h: "El anillo que rodea a la capital" },
            { w: "LABURO", h: "Dignidad diaria por un sueldo" },
            { w: "MINA", h: "Sujeto femenino en el lenguaje del tango" },
            { w: "MANO DE DIOS", h: "Intervención divina en el estadio Azteca" },
            { w: "GARDEL", h: "Dicen que cada día canta mejor" },
            { w: "ALFAJOR", h: "Dos capas de masa y un corazón dulce" },
            { w: "TERERÉ", h: "Rito litoraleño bajo el sol" },
            { w: "LUNFARDO", h: "El idioma que nació en las cárceles y calles" },
            { w: "CHETO", h: "Aspirante a la alta alcurnia" },
            { w: "GRASA", h: "Falta absoluta de refinamiento" },
            { w: "COCODRILO", h: "Billetera difícil de abrir" },
            { w: "GORILA", h: "Animal político anti-populista" },
            { w: "PAMPAS", h: "Llanura donde el horizonte no termina" },
            { w: "PICADITO", h: "Amistad que se define con una pelota" },
            { w: "BOLICHE", h: "Luces, sudor y volumen al máximo" },
            { w: "CHORRO", h: "Amigo de lo ajeno" },
            { w: "YUTA", h: "El brazo armado del estado" },
            { w: "CHUPAMEDIAS", h: "Buscador de favores ajenos" },
            { w: "BAGARTO", h: "Belleza inexistente" },
            { w: "TUTUCA", h: "Maíz inflado y azucarado" },
            { w: "CHORI", h: "El alma de cualquier manifestación" },
            { w: "FERRO", h: "Club del oeste con mucha historia" },
            { w: "CORTADO", h: "Equilibrio entre grano y lácteo" },
            { w: "MEDIA LUNA", h: "Forma astronómica en la panadería" },
            { w: "CHAMAMÉ", h: "Sapucai y acordeón" },
            { w: "MILONGA", h: "Donde el abrazo se vuelve baile" },
            { w: "PORTEÑO", h: "Nacido bajo la sombra del puerto" },
            { w: "GAUCHO", h: "Figura solitaria del campo" },
            { w: "MATE COCIDO", h: "Infusión humilde y reconfortante" },
            { w: "TUPAC AMARU", h: "Rebelión antigua" },
            { w: "ESCARAPELA", h: "Distintivo en el pecho" },
            { w: "AVALANCHA", h: "Lo que pasa en el para-avalanchas" },
            { w: "BOMBILLA", h: "Canal metálico de la infusión" },
            { w: "POROTO", h: "No vale ni un..." },
            { w: "PIRUCHO", h: "Estado mental alterado" },
            { w: "GOMÍA", h: "El que está en las buenas y malas (al revés)" },
            { w: "FALOPA", h: "Algo de dudosa calidad o sustancia" },
            { w: "MINGA", h: "Negación rotunda" },
            { w: "MANCO", h: "El que no tiene habilidad manual" },
            { w: "PECHO FRÍO", h: "Falta de pasión en el momento clave" },
            { w: "BOROCOTÓ", h: "Ritmo de tambores en el nombre" },
            { w: "CANILLITA", h: "Repartidor de noticias impresas" },
            { w: "BIYUYA", h: "Papel moneda en lunfardo" },
            { w: "FACÓN", h: "Herramienta y defensa del gaucho" },
            { w: "PAYADA", h: "Duelo de rimas improvisadas" },
            { w: "QUILMES", h: "Cerveza y ciudad cervecera" },
            { w: "GRINGA", h: "Persona de campo de origen europeo" },
            { w: "COLECTIVERO", h: "Dueño de las calles en hora pico" },
            { w: "KIOSCO", h: "Templo de las golosinas" },
            { w: "REVIRE", h: "Cambio de humor repentino" },
            { w: "CHUCHERÍA", h: "Cosa de poco valor" },
            { w: "TILINGO", h: "Persona que habla sin sustento" },
            { w: "PUNGUISTA", h: "Habilidad manual para el robo rápido" },
            { w: "BARDERO", h: "Buscador de conflictos" },
            { w: "CHIRIPÁ", h: "Prenda rústica" },
            { w: "PULPERÍA", h: "Bar de antaño en el medio de la nada" },
            { w: "REBENQUE", h: "Látigo de cuero" },
            { w: "PASTAFROLA", h: "Reja dulce de membrillo o batata" },
            { w: "ROGEL", h: "Mil hojas de dulce de leche" },
            { w: "BALCARCE", h: "Postre con nombre de ciudad bonaerense" },
            { w: "SORRENTINOS", h: "Pasta redonda y contundente" },
            { w: "LOCRO", h: "Guiso patrio por excelencia" },
            { w: "CHIVITO", h: "Manjar de las sierras cordobesas" },
            { w: "VIZCACHA", h: "Habitante de cuevas en la pampa" },
            { w: "CARPINCHO", h: "Invasor diplomático de Nordelta" },
            { w: "HORNERO", h: "Arquitecto de barro en los postes" },
            { w: "CURANTO", h: "Comida bajo la tierra sureña" },
            { w: "CALAFATE", h: "El que come su fruto, vuelve" },
            { w: "NAHUEL HUAPI", h: "Gran espejo de agua del sur" },
            { w: "ACONCAGUA", h: "El techo de América" },
            { w: "QUEBRADA", h: "Colores en los cerros jujeños" },
            { w: "ESTEROS", h: "Agua estancada con mucha vida en Iberá" },
            { w: "TALAMPAYA", h: "Paredes rojas de tiempos remotos" },
            { w: "ISCHIGUALASTO", h: "Valle de la luna en San Juan" },
            { w: "BARILOCHE", h: "Destino de egresados y chocolate" },
            { w: "MAR DEL PLATA", h: "La feliz cada verano" },
            { w: "TIGRE", h: "Ríos y lanchas colectivas" },
            { w: "RECOLETA", h: "Barrio de palacios y cementerio famoso" },
            { w: "CAMINITO", h: "Pasaje de colores en La Boca" },
            { w: "CALLE CORRIENTES", h: "La que nunca duerme por el teatro" },
            { w: "FLORALIS GENÉRICA", h: "Escultura que se abre con el sol" },
            { w: "CASA ROSADA", h: "Donde reside el poder ejecutivo" },
            { w: "CABILDO", h: "Testigo de mayo de 1810" },
            { w: "FRAGATA SARMIENTO", h: "Barco escuela amarrado en madera" },
            { w: "PUERTO MADERO", h: "Grúas antiguas y edificios modernos" },
            { w: "CONGRESO", h: "Cúpula verde y leyes" },
            { w: "COLÓN", h: "Teatro con acústica perfecta" },
            { w: "MALVINAS", h: "Herida abierta en el Atlántico Sur" },
            { w: "BANDONEÓN", h: "El fuelle que llora en el tango" }
        ]
    },

    memes: {
        icon: "🎭",
        label: "Memes (Sin pistas)",
        words: [
            { w: "GIGACHAD", h: "" },
            { w: "NPC", h: "" },
            { w: "TILIN", h: "" },
            { w: "ETE SECH", h: "" },
            { w: "TUNG TUNG SAHUR", h: "" },
            { w: "EL PEPE", h: "" },
            { w: "YANFRI", h: "" },
            { w: "TROLLFACE", h: "" },
            { w: "AFRICAN LORE", h: "" },
            { w: "HOLA BANA SOY...", h: "" },
            { w: "POV ESTAS RE TRANQUI", h: "" },
            { w: "67", h: "" },
            { w: "AURA FARMING", h: "" },
            { w: "YO YA ESTUVE EN ESTOS JUEGOS", h: "" },
            { w: "RICK ROLL", h: "" },
            { w: "No puedo probarlo, dexter meme detective negro", h: "" },
            { w: "El niño del Oxxo", h: "" },
            { w: "es cine", h: "" },
            { w: "Hasbulla", h: "" },
            { w: ":v", h: "" },
            { w: "Cuando haces tus momos en video...", h: "" },
            { w: "Tengo miedo", h: "" },
            { w: "El pana miguel", h: "" },
            { w: "Loquendo", h: "" }
        ]
    },

    De_Pico: {
        icon: "📌",
        label: "Personajes De General Pico",
        words: [
            { w: "Tizi Pavarin", h: "" },
            { w: "Agus Casado", h: "" },
            { w: "Agustin Suarez", h: "" },
            { w: "Ema Tissonne", h: "" },
            { w: "Bautista Fernandez", h: "" },
            { w: "Valentin Drapanti", h: "" },
            { w: "Yahir Zapata", h: "" },
            { w: "Jose Etcheverry", h: "" },
            { w: "Franco Drapante", h: "" },
            { w: "Nahuel Schmidt (Dj NAHUE S)", h: "" },
            { w: "Matias Casado", h: "" },
            { w: "Ana Alegre", h: "" },
            { w: "Juli Storm", h: "" },
            { w: "Agustin Rossetto (Sugaplux)", h: "" },
            { w: "Benja Rojas", h: "" },
            { w: "Francisco Pansa", h: "" },
            { w: "Bauti Hayland", h: "" },
            { w: "Tania Hernandez", h: "" },
            { w: "Matute (Buenos Aires)", h: "" },
            { w: "Alvaro Becerra (Sobrino Yahir)", h: "" },
            { w: "El Rey Poppy", h: "" },
            { w: "Angie Zapata", h: "" },
        ]
    },

    juegos: {
        icon: "🎮",
        label: "Juegos",
        words: [
            // Agrega estas 100 palabras al array 'words' de juegos
            { w: "DARK SOULS", h: "La paciencia es la única forma de no morir" },
            { w: "ELDEN RING", h: "Sin luz y en busca del círculo" },
            { w: "BLOODBORNE", h: "Cacería bajo una luna de pesadilla" },
            { w: "BIOSHOCK", h: "Una utopía fallida bajo el océano" },
            { w: "FALLOUT", h: "Sobrevivir al invierno nuclear en un refugio" },
            { w: "RED DEAD REDEMPTION", h: "El ocaso de los forajidos a caballo" },
            { w: "THE WITCHER", h: "Un lobo blanco que caza monstruos por monedas" },
            { w: "GOD OF WAR", h: "De masacrar el Olimpo a cuidar a un niño" },
            { w: "METAL GEAR", h: "Espionaje táctico dentro de una caja" },
            { w: "RESIDENT EVIL", h: "Una mansión, un virus y una sombrilla" },
            { w: "SILENT HILL", h: "Niebla espesa y una radio que hace ruido" },
            { w: "DOOM", h: "Infierno, escopetas y metal industrial" },
            { w: "HALO", h: "Un anillo en el espacio y un casco verde" },
            { w: "STREET FIGHTER", h: "Hadouken en la cara del rival" },
            { w: "MORTAL KOMBAT", h: "Termina con él de forma sangrienta" },
            { w: "OVERWATCH", h: "Héroes que el mundo ya no quería" },
            { w: "APEX LEGENDS", h: "Battle royale con habilidades y saltos" },
            { w: "HOLLOW KNIGHT", h: "Un pequeño insecto en un reino de ruinas" },
            { w: "CELESTE", h: "Escalar una montaña para vencer la ansiedad" },
            { w: "UNDERTALE", h: "El juego donde nadie tiene por qué morir" },
            { w: "CUPHEAD", h: "Dibujos animados de los años 30 muy difíciles" },
            { w: "TERRARIA", h: "Mundo de bloques pero en dos dimensiones" },
            { w: "STARDEW VALLEY", h: "Heredar la granja del abuelo y plantar paz" },
            { w: "ANIMAL CROSSING", h: "Pagarle una hipoteca eterna a un mapache" },
            { w: "PACMAN", h: "Comer pastillas escapando de fantasmas" },
            { w: "TETRIS", h: "Encajar piezas que caen sin parar" },
            { w: "SPACE INVADERS", h: "Píxeles que bajan desde el cielo" },
            { w: "SONIC", h: "Un erizo que no sabe ir lento" },
            { w: "CRASH BANDICOOT", h: "Un marsupial rompiendo cajas" },
            { w: "SPYRO", h: "Un dragón pequeño buscando gemas" },
            { w: "SKYRIM", h: "Fus Ro Dah contra los dragones" },
            { w: "ASSASSINS CREED", h: "Saltos de fe en diferentes épocas" },
            { w: "FAR CRY", h: "Locura en una isla o región apartada" },
            { w: "WATCH DOGS", h: "Hackear la ciudad con un teléfono" },
            { w: "PORTAL", h: "El pastel es una mentira" },
            { w: "HALF LIFE", h: "Un científico con una palanca" },
            { w: "COUNTER STRIKE", h: "La bomba ha sido plantada" },
            { w: "LEAGUE OF LEGENDS", h: "Destruir el nexo rompiendo amistades" },
            { w: "DOTA 2", h: "El origen del género MOBA moderno" },
            { w: "VALORANT", h: "Táctica de disparos con poderes mágicos" },
            { w: "SIMCITY", h: "Ser alcalde y provocar desastres" },
            { w: "THE SIMS", h: "Quitar la escalera de la piscina" },
            { w: "SPORE", h: "De una célula a conquistar el espacio" },
            { w: "MINECRAFT", h: "Picar piedra y evitar al creeper" },
            { w: "ROBLOX", h: "Plataforma de juegos dentro de juegos" },
            { w: "FORTNITE", h: "Construir una torre en medio de un tiroteo" },
            { w: "PUBG", h: "Cien personas caen en paracaídas" },
            { w: "DAYZ", h: "Sobrevivir a zombis y a otros humanos" },
            { w: "RUST", h: "Empezar desnudo con una piedra en la mano" },
            { w: "ARK", h: "Dinosaurios y tecnología futurista" },
            { w: "SUBNAUTICA", h: "Terror en las profundidades de un planeta acuático" },
            { w: "OUTLAST", h: "Solo tienes una cámara y pilas" },
            { w: "AMNESIA", h: "No mires al monstruo o perderás la cordura" },
            { w: "FIVE NIGHTS AT FREDDYS", h: "Vigilar muñecos que se mueven de noche" },
            { w: "GENSHIN IMPACT", h: "Mundo abierto con personajes elementales" },
            { w: "PERSONA 5", h: "Estudiantes que roban corazones corruptos" },
            { w: "FINAL FANTASY", h: "Fantasía épica que nunca es la última" },
            { w: "KINGDOM HEARTS", h: "Disney mezclado con llaves espada" },
            { w: "DARKEST DUNGEON", h: "La locura acecha en cada pasillo" },
            { w: "SLAY THE SPIRE", h: "Cartas y reliquias en una torre infinita" },
            { w: "HADES", h: "Escapar del infierno muriendo una y otra vez" },
            { w: "DEAD CELLS", h: "Acción frenética en un castillo cambiante" },
            { w: "ENTER THE GUNGEON", h: "Un laberinto donde todo son balas" },
            { w: "RAINBOW SIX SIEGE", h: "Romper paredes con táctica policial" },
            { w: "BATTLEFIELD", h: "Guerra a gran escala con vehículos" },
            { w: "DESTINY", h: "Guardianes de la luz en el sistema solar" },
            { w: "WARFRAME", h: "Ninjas espaciales robóticos" },
            { w: "MONSTER HUNTER", h: "Cazar bestias gigantes para hacerte armaduras" },
            { w: "DEVIL MAY CRY", h: "Matar demonios con mucho estilo" },
            { w: "BAYONETTA", h: "Una bruja con pistolas en los tacones" },
            { w: "NEIER AUTOMATA", h: "Androides filosofando en un mundo post-humano" },
            { w: "STRAY", h: "Eres un gato en una ciudad de robots" },
            { w: "IT TAKES TWO", h: "Cooperación obligatoria para no divorciarse" },
            { w: "AMONG US", h: "Hay un impostor en la nave" },
            { w: "PHASMOPHOBIA", h: "Cazar fantasmas con herramientas reales" },
            { w: "LETHAL COMPANY", h: "Recoger chatarra para una empresa siniestra" },
            { w: "SEA OF THIEVES", h: "Vida pirata en un mar compartido" },
            { w: "FORZA HORIZON", h: "Festival de autos en mundo abierto" },
            { w: "GRAN TURISMO", h: "Simulador de conducción real" },
            { w: "NEED FOR SPEED", h: "Carreras callejeras y escapes policiales" },
            { w: "ROCKET LEAGUE", h: "Fútbol con autos propulsados" },
            { w: "GUITAR HERO", h: "Sentirse una estrella con una guitarra de plástico" },
            { w: "JUST DANCE", h: "Seguir el ritmo frente a la pantalla" },
            { w: "WII SPORTS", h: "Tenis y bolos en el salón de casa" },
            { w: "SUPER SMASH BROS", h: "Echar a los rivales del escenario" },
            { w: "ZELDA", h: "El héroe del tiempo que busca a la princesa" },
            { w: "MARIO KART", h: "La cáscara de banana que arruina amistades" },
            { w: "POKÉMON GO", h: "Caminar por la calle mirando el celular" },
            { w: "CANDY CRUSH", h: "Juntar caramelos en el colectivo" },
            { w: "CLASH OF CLANS", h: "Atacar aldeas y esperar tiempos de mejora" },
            { w: "PLANTS VS ZOMBIES", h: "Defender el jardín con girasoles" },
            { w: "ANGRY BIRDS", h: "Lanzar pájaros contra cerdos verdes" },
            { w: "FLAPPY BIRD", h: "Pasar entre tuberías con un pájaro torpe" },
            { w: "GEOMETRY DASH", h: "Saltar al ritmo de la música electrónica" },
            { w: "OSU", h: "Hacer click en círculos muy rápido" },
            { w: "WOLFENSTEIN", h: "Disparar a un régimen autoritario alternativo" },
            { w: "TOMB RAIDER", h: "Explorar tumbas con una arqueóloga" },
            { w: "UNCHARTED", h: "Buscador de tesoros con mucha mala suerte" },
            { w: "THE LAST OF US", h: "Un hongo que acabó con la civilización" },
            { w: "SOMA", h: "Terror existencial bajo el agua" }
        ]
    },

    paises: {
        icon: "🌍",
        label: "Países",
        words: [
            { w: "FINLANDIA", h: "La tierra de los mil lagos y el mejor sistema escolar" },
            { w: "MARRUECOS", h: "Donde el desierto se encuentra con el estrecho" },
            { w: "TAILANDIA", h: "Antiguo Reino de Siam" },
            { w: "EGIPTO", h: "El regalo del Nilo" },
            { w: "GRECIA", h: "Cuna de la democracia y los mitos" },
            { w: "ISLANDIA", h: "Donde el fuego de los volcanes toca el hielo" },
            { w: "SUDÁFRICA", h: "La nación arcoíris de Mandela" },
            { w: "NUEVA ZELANDA", h: "Tierra de kiwis y escenarios de la Tierra Media" },
            { w: "SUIZA", h: "Relojes, chocolate y neutralidad eterna" },
            { w: "VIETNAM", h: "Resiliencia en el sudeste asiático" },
            { w: "IRLANDA", h: "La isla esmeralda de los tréboles" },
            { w: "POLONIA", h: "Llanuras históricas entre gigantes europeos" },
            { w: "INDONESIA", h: "El archipiélago más grande del mundo" },
            { w: "UCRANIA", h: "El granero de Europa" },
            { w: "ARABIA SAUDITA", h: "Custodio de las ciudades sagradas del desierto" },
            { w: "PAÍSES BAJOS", h: "Luchando contra el mar con diques y molinos" },
            { w: "AUSTRIA", h: "Viena, valses y los Alpes orientales" },
            { w: "BÉLGICA", h: "Cómics, diamantes y la capital de la Unión" },
            { w: "FILIPINAS", h: "Siete mil islas con influencia hispana" },
            { w: "NIGERIA", h: "El gigante demográfico de África" },
            { w: "ETIOPÍA", h: "Tierra de origen del café y nunca colonizada" },
            { w: "MÓNACO", h: "Lujo, casinos y el segundo estado más pequeño" },
            { w: "SINGAPUR", h: "Ciudad-estado de orden extremo y modernidad" },
            { w: "MALASIA", h: "Torres gemelas y selvas milenarias" },
            { w: "CUBA", h: "Ron, tabaco y el tiempo detenido en el Caribe" },
            { w: "PANAMÁ", h: "El puente del mundo y el corazón del comercio" },
            { w: "COSTA RICA", h: "Pura vida sin ejército" },
            { w: "ISRAEL", h: "Tierra de contrastes religiosos y startups" },
            { w: "IRÁN", h: "La antigua Persia de los tapetes y la poesía" },
            { w: "PAKISTÁN", h: "El valle del Indo y picos nevados" },
            { w: "KENIA", h: "Cuna del safari y corredores de fondo" },
            { w: "NEPAL", h: "A la sombra de los picos más altos del mundo" },
            { w: "HUNGRÍA", h: "El país de los puentes sobre el Danubio" },
            { w: "RUMANIA", h: "Leyendas en los Cárpatos y castillos góticos" },
            { w: "REPUBLICA CHECA", h: "La ciudad de las cien torres" },
            { w: "BUTÁN", h: "Donde se mide el índice de felicidad" },
            { w: "MONGOLIA", h: "La tierra del eterno cielo azul" },
            { w: "CROACIA", h: "Mil islas en el mar Adriático" },
            { w: "SERBIA", h: "Cruce de caminos en los Balcanes" },
            { w: "ESLOVAQUIA", h: "Castillos en cada montaña" },
            { w: "JORDANIA", h: "Tesoros tallados en la roca rosa" },
            { w: "LÍBANO", h: "El cedro que resiste en el Mediterráneo" },
            { w: "MADAGASCAR", h: "Evolución única entre baobabs y lémures" },
            { w: "TANZANIA", h: "A los pies del Kilimanjaro" },
            { w: "ARGELIA", h: "El país más grande de África" },
            { w: "TÚNEZ", h: "Donde Cartago desafió a Roma" },
            { w: "GHANA", h: "La antigua costa de oro" },
            { w: "SENEGAL", h: "La hospitalidad Teranga" },
            { w: "NAMIBIA", h: "Donde las dunas rojas tocan el océano" },
            { w: "BOTSUANA", h: "El delta que no llega al mar" },
            { w: "ZIMBABUE", h: "Grandes ruinas de piedra y cataratas" },
            { w: "ARMENIA", h: "La primera nación cristiana bajo el Ararat" },
            { w: "GEORGIA", h: "Cuna del vino en el Cáucaso" },
            { w: "AZERBAIYN", h: "Tierra del fuego y petróleo" },
            { w: "KAZAJISTÁN", h: "La estepa más vasta de Asia Central" },
            { w: "UZBEKISTÁN", h: "Corazón de la Ruta de la Seda" },
            { w: "CAMBOYA", h: "Templos de piedra devorados por la selva" },
            { w: "LAOS", h: "El país del millón de elefantes" },
            { w: "BIRMANIA", h: "Tierra de las mil pagodas de oro" },
            { w: "SRI LANKA", h: "La lágrima de la India" },
            { w: "BANGLADÉS", h: "El delta de los ríos sagrados" },
            { w: "GUATEMALA", h: "Corazón del mundo maya" },
            { w: "HONDURAS", h: "Arqueología y arrecifes" },
            { w: "EL SALVADOR", h: "Tierra de volcanes y olas" },
            { w: "NICARAGUA", h: "Lagos y poetas" },
            { w: "ESTONIA", h: "El país más digital de Europa" },
            { w: "LETONIA", h: "Bosques y arquitectura Art Nouveau" },
            { w: "LITUANIA", h: "El último país pagano de Europa" },
            { w: "BIELORRUSIA", h: "Bosques primigenios de bisontes" },
            { w: "MOLDAVIA", h: "Bodegas subterráneas infinitas" },
            { w: "ALBANIA", h: "El búnker de Europa frente al mar" },
            { w: "MACEDONIA", h: "Tierra de Alejandro y lagos antiguos" },
            { w: "MONTENEGRO", h: "Fiordos en el sur de Europa" },
            { w: "LUXEMBURGO", h: "Un ducado de finanzas y fortalezas" },
            { w: "MALTA", h: "Caballeros y templos megalíticos" },
            { w: "CHIPRE", h: "La isla de Afrodita dividida" },
            { w: "JAMAICA", h: "Ritmo, reggae y velocidad" },
            { w: "HAITÍ", h: "La primera república negra libre" },
            { w: "BAHAMAS", h: "Aguas cristalinas y piratas" },
            { w: "ECUADOR", h: "Donde la línea divide el mundo" },
            { w: "VENEZUELA", h: "El salto de agua más alto del mundo" },
            { w: "SURINAM", h: "Rincón neerlandés en Sudamérica" },
            { w: "GUYANA", h: "Tierra de muchas aguas" },
            { w: "BOLIVIA", h: "El espejo de sal más grande" },
            { w: "PARAGUAY", h: "La isla rodeada de tierra" },
            { w: "FIJI", h: "Paraíso de coral en el Pacífico" },
            { w: "SAMOA", h: "Tradición tatuada en la piel" },
            { w: "TONGA", h: "El último reino del Pacífico" },
            { w: "PAPÚA NUEVA GUINEA", h: "Miles de lenguas en la selva" },
            { w: "AZERBAIYÁN", h: "Donde el gas brota de la tierra" },
            { w: "MALDIVAS", h: "Islas que apenas asoman del mar" },
            { w: "SEYCHELLES", h: "El jardín del Edén africano" },
            { w: "MAURICIO", h: "La isla del extinto Dodo" },
            { w: "CABO VERDE", h: "Música de morna en el Atlántico" },
            { w: "SUDÁN", h: "Más pirámides que en Egipto" },
            { w: "LIBIA", h: "El desierto más árido de África" },
            { w: "OMÁN", h: "Incienso y fortalezas de arena" },
            { w: "QATAR", h: "El ojo del mundo en el Golfo" },
            { w: "KUWAIT", h: "Riqueza petrolera bajo el sol ardiente" },
            { w: "BAHRÉIN", h: "La isla de las dos perlas" }
        ]
    },

    comidas: {
        icon: "🍔",
        label: "Comidas",
        words: [
            // Agrega estas 100 palabras al array 'words' de comidas
            { w: "CEVICHE", h: "Pescado marinado en pura acidez" },
            { w: "RATATOUILLE", h: "Guiso de hortalizas con nombre de roedor" },
            { w: "LASAÑA", h: "Pisos de pasta, carne y queso" },
            { w: "GUACAMOLE", h: "El oro verde triturado de México" },
            { w: "RAMEN", h: "Caldo profundo con fideos japoneses" },
            { w: "PAELLA", h: "Arroz con azafrán y frutos del mar" },
            { w: "CHURROS", h: "Masa frita estriada con azúcar" },
            { w: "RISOTTO", h: "Arroz italiano que busca la cremosidad extrema" },
            { w: "KEBAB", h: "Carne especiada que gira en un eje vertical" },
            { w: "FALAFEL", h: "Bolas fritas de garbanzo y especias" },
            { w: "HUMMUS", h: "Crema suave de garbanzos y tahini" },
            { w: "TIRAMISÚ", h: "Postre de café, bizcochos y mascarpone" },
            { w: "TRUFA", h: "El diamante negro que crece bajo tierra" },
            { w: "CAVIAR", h: "Huevas de esturión para paladares caros" },
            { w: "FOIE GRAS", h: "Hígado de pato u oca hipertrofiado" },
            { w: "GNOCCHI", h: "Pequeños bollos de papa y harina" },
            { w: "SOUFFLÉ", h: "Preparación de huevo que sube y puede bajar" },
            { w: "PROVOLONE", h: "Queso que se disfruta fundido al hierro" },
            { w: "CHIMICHURRI", h: "El condimento indispensable del asado" },
            { w: "BAKLAVA", h: "Capas de masa filo, nueces y mucha miel" },
            { w: "TACOS AL PASTOR", h: "Carne de cerdo con piña y tortilla" },
            { w: "BURRITO", h: "Todo envuelto en una gran tortilla de trigo" },
            { w: "QUESADILLA", h: "Doblada y con queso fundido" },
            { w: "POLLO FRITO", h: "Crujiente por fuera, tierno por dentro" },
            { w: "FISH AND CHIPS", h: "El clásico callejero del Reino Unido" },
            { w: "FONDUE", h: "Sumergir comida en queso o chocolate derretido" },
            { w: "QUICHE", h: "Tarta salada francesa con base de huevo" },
            { w: "CROQUETAS", h: "Bechamel empanada y frita" },
            { w: "GAZPACHO", h: "Sopa fría de tomate y hortalizas" },
            { w: "TORTILLA DE PAPA", h: "El dilema es si lleva cebolla o no" },
            { w: "PASTEL DE CABO", h: "Carne picada cubierta con puré" },
            { w: "EMPANADA GALLEGA", h: "Tarta rellena de atún y pimientos" },
            { w: "PULPO A LA GALLEGA", h: "Con pimentón y sobre madera" },
            { w: "BACALAO", h: "Pescado salado con mucha tradición" },
            { w: "CARPACCIO", h: "Láminas crudas muy finas con aliño" },
            { w: "TARTAR", h: "Carne o pescado crudo picado a cuchillo" },
            { w: "CEVICHE DE LENGUADO", h: "Elegancia marina en limón" },
            { w: "AREPAS", h: "Masa redonda de maíz rellena" },
            { w: "PABELLÓN CRIOLLO", h: "Arroz, caraotas, carne y tajadas" },
            { w: "FEIJOADA", h: "Guiso de frijoles negros muy potente" },
            { w: "PICAÑA", h: "Corte de carne brasileño muy preciado" },
            { w: "BIFE DE CHORIZO", h: "El corte estrella de la parrilla argentina" },
            { w: "MATAMBRE A LA PIZZA", h: "Carne con salsa y queso encima" },
            { w: "MOLLEJAS", h: "La achura más deseada con limón" },
            { w: "CHINCHULINES", h: "Intestinos bien crocantes" },
            { w: "MORCILLA", h: "Embutido oscuro de sangre y especias" },
            { w: "CHORIZO", h: "El protagonista del sandwich callejero" },
            { w: "PROVOLETA", h: "Disco de queso asado" },
            { w: "RAVIOLES", h: "Cuadrados de pasta rellenos" },
            { w: "FETTUCCINE", h: "Cintas largas de pasta fresca" },
            { w: "ÑOQUIS DE CALABAZA", h: "Versión dulce y naranja de la pasta" },
            { w: "CANELONES", h: "Tubos de pasta rellenos y gratinados" },
            { w: "SORRENTINOS", h: "Pasta redonda y de gran tamaño" },
            { w: "PUDÍN DE PAN", h: "Aprovechar lo que sobró en un postre" },
            { w: "ARROZ CON LECHE", h: "Clásico de la abuela con canela" },
            { w: "FLAN CON MIXTO", h: "Con crema y dulce de leche" },
            { w: "VIGILANTE", h: "Queso y dulce, nada más" },
            { w: "QUESO Y DULCE", h: "El postre del camionero" },
            { w: "DONAS", h: "Anillos fritos glaseados" },
            { w: "MUFFINS", h: "Magdalenas modernas con añadidos" },
            { w: "BROWNIE", h: "Cuadrado denso de chocolate" },
            { w: "CHEESECAKE", h: "Tarta de queso con frutos rojos" },
            { w: "LEMON PIE", h: "Equilibrio entre ácido y merengue dulce" },
            { w: "SELVA NEGRA", h: "Chocolate, crema y cerezas" },
            { w: "TIRAMISÚ", h: "Sabor a café y mascarpone" },
            { w: "PANETTONE", h: "Pan dulce navideño con frutas" },
            { w: "CHURRASCO", h: "Trozo de carne a la plancha" },
            { w: "MILANESA DE NÁPOLI", h: "Con jamón, salsa y queso" },
            { w: "SUPREMA", h: "Milanesa pero de ave" },
            { w: "PECHUGA", h: "La parte más magra del pollo" },
            { w: "NUGGETS", h: "Bocados de pollo procesado" },
            { w: "HOT DOG", h: "Salchicha en pan alargado" },
            { w: "PANCHOS", h: "Comida rápida infantil por excelencia" },
            { w: "NACHOS", h: "Triángulos de maíz para dipear" },
            { w: "BURRITOS", h: "Envuelto de harina" },
            { w: "ENCHILADAS", h: "Tortillas bañadas en salsa picante" },
            { w: "CHILI CON CARNE", h: "Frijoles y carne picante" },
            { w: "SOPA PARAGUAYA", h: "La única sopa que es sólida" },
            { w: "CHIPA", h: "Bolitas de almidón y mucho queso" },
            { w: "PASTELITOS", h: "Masa hojaldrada frita con dulce" },
            { w: "CHURROS RELLENOS", h: "Con dulce de leche por dentro" },
            { w: "BOLLOS", h: "Panecillos dulces o salados" },
            { w: "BAGUETTE", h: "Pan francés largo y crocante" },
            { w: "CIABATTA", h: "Pan italiano con mucha humedad" },
            { w: "SCONES", h: "Pequeños panes británicos para el té" },
            { w: "BAGELS", h: "Pan con agujero hervido antes de hornear" },
            { w: "PRETZELS", h: "Lazo de masa con sal gruesa" },
            { w: "PAN DE CAMPO", h: "Corteza dura y mucha miga" },
            { w: "PEBETE", h: "Pan suave y tierno para sándwich" },
            { w: "MIGA", h: "Sándwich finito de muchas capas" },
            { w: "BAGEL", h: "Pan circular con hueco" },
            { w: "POCHOCLOS", h: "Maíz que explota en el cine" },
            { w: "GARRAPIÑADA", h: "Maní con caramelo caliente" },
            { w: "ALMENDRAS", h: "Fruto seco ovalado" },
            { w: "NUECES", h: "Fruto seco con forma de cerebro" },
            { w: "CASTAÑAS", h: "Se comen asadas en invierno" },
            { w: "PISTACHOS", h: "Fruto seco verde y adictivo" },
            { w: "AVELLANAS", h: "Base de muchas cremas de chocolate" },
            { w: "CUSCÚS", h: "Sémola de trigo del norte de África" },
            { w: "QUINOA", h: "Pseudocereal andino muy nutritivo" }
        ]
    }
    ,
    peliculas: {
        icon: "🎬",
        label: "Películas",
        words: [
            { w: "TITANIC", h: "Final recordado" },
            { w: "AVATAR", h: "Mundo distinto" },
            { w: "STAR WARS", h: "Saga extensa" },
            { w: "HARRY POTTER", h: "Crecen con el tiempo" },
            { w: "EL SEÑOR DE LOS ANILLOS", h: "Viaje largo" },
            { w: "MATRIX", h: "Duda constante" },
            { w: "GLADIADOR", h: "Honor en juego" },
            { w: "FORREST GUMP", h: "Vida inesperada" },
            { w: "EL PADRINO", h: "Familia poderosa" },
            { w: "JURASSIC PARK", h: "Algo salió mal" },
            { w: "INCEPTION", h: "Capas mentales" },
            { w: "INTERSTELLAR", h: "Tiempo relativo" },
            { w: "AVENGERS", h: "Unión necesaria" },
            { w: "BATMAN", h: "Héroe oscuro" },
            { w: "SPIDERMAN", h: "Responsabilidad pesada" },
            { w: "TOY STORY", h: "Crecimiento emocional" },
            { w: "COCO", h: "Recuerdos vivos" },
            { w: "UP", h: "Viaje tardío" },
            { w: "EL REY LEÓN", h: "Ciclo vital" },
            { w: "ROCKY", h: "Superación" },
            { w: "TERMINATOR", h: "Futuro amenazante" },
            { w: "BACK TO THE FUTURE", h: "Cambiar consecuencias" },
            { w: "SCARFACE", h: "Ascenso peligroso" },
            { w: "PULP FICTION", h: "Historias cruzadas" },
            { w: "JAWS", h: "Amenaza constante" },
            { w: "JOKER", h: "Descenso mental" },
            { w: "MAD MAX", h: "Supervivencia extrema" },
            { w: "CREED", h: "Legado pesado" },
            { w: "SHAWSHANK REDEMPTION", h: "Esperanza firme" },
            { w: "FIGHT CLUB", h: "Identidad rota" },
            { w: "THE DARK KNIGHT", h: "Caos organizado" },
            { w: "LA LA LAND", h: "Sueños difíciles" },
            { w: "PARASITE", h: "Clases sociales" },
            { w: "WHIPLASH", h: "Exigencia extrema" },
            { w: "DUNE", h: "Destino inevitable" },
            { w: "NO COUNTRY FOR OLD MEN", h: "Violencia fría" },
            { w: "THE GODFATHER II", h: "Continuidad trágica" },
            { w: "AMERICAN PSYCHO", h: "Doble vida" },
            { w: "BLACK SWAN", h: "Perfección obsesiva" },
            { w: "THE TRUMAN SHOW", h: "Realidad falsa" },
            { w: "ET", h: "Amistad inesperada" },
            { w: "ALIEN", h: "Amenaza interna" },
            { w: "PREDATOR", h: "Cazador oculto" },
            { w: "KING KONG", h: "Fuerza incomprendida" },
            { w: "THE NOTEBOOK", h: "Amor persistente" },
            { w: "SEVEN", h: "Crimen metódico" },
            { w: "THE SILENCE OF THE LAMBS", h: "Mente peligrosa" },
            { w: "JURASSIC WORLD", h: "Control perdido" },
            { w: "IT", h: "Miedo recurrente" },
            { w: "THE EXORCIST", h: "Fe puesta a prueba" },
            { w: "THE SHINING", h: "Aislamiento extremo" },
            { w: "READY PLAYER ONE", h: "Mundo virtual" },
            { w: "WALL-E", h: "Soledad tecnológica" },
            { w: "RATATOUILLE", h: "Talento oculto" },
            { w: "MONSTERS INC", h: "Trabajo extraño" },
            { w: "THE HANGOVER", h: "Noche caótica" },
            { w: "THE WOLF OF WALL STREET", h: "Excesos" },
            { w: "CAST AWAY", h: "Soledad absoluta" },
            { w: "THE SOCIAL NETWORK", h: "Éxito conflictivo" },
            { w: "JOHN WICK", h: "Venganza imparable" },
            { w: "MISSION IMPOSSIBLE", h: "Riesgo constante" },
            { w: "FAST AND FURIOUS", h: "Velocidad extrema" },
            { w: "PIRATES OF THE CARIBBEAN", h: "Aventura impredecible" }
        ]
    }
    ,
    cantantes: {
        icon: "🎤",
        label: "Cantantes",
        words: [
            { w: "FREDDIE MERCURY", h: "Líder de Queen con un rango vocal de cuatro octavas" },
            { w: "MICHAEL JACKSON", h: "El artista que popularizó el Moonwalk" },
            { w: "MADONNA", h: "La ambición rubia que redefinió el pop" },
            { w: "ELVIS PRESLEY", h: "El movimiento de caderas más polémico de los 50" },
            { w: "DAVID BOWIE", h: "El hombre que cayó a la Tierra y se volvió Ziggy Stardust" },
            { w: "BOB MARLEY", h: "Llevó el mensaje del rastafarismo a todo el planeta" },
            { w: "KURT COBAIN", h: "La voz rasgada que lideró el movimiento Grunge" },
            { w: "AMY WINEHOUSE", h: "La diva del Soul con el peinado 'beehive'" },
            { w: "ADELE", h: "Británica conocida por nombrar sus discos con su edad" },
            { w: "LADY GAGA", h: "Stefani Germanotta, famosa por su excentricidad y talento" },
            { w: "BEYONCÉ", h: "Ex-Destiny's Child conocida como 'Queen Bey'" },
            { w: "RIHANNA", h: "La estrella de Barbados dueña de un imperio de cosméticos" },
            { w: "BRUNO MARS", h: "Multiinstrumentista con estilo retro y funk" },
            { w: "ED SHEERAN", h: "El trovador moderno que usa solo una guitarra y un pedal" },
            { w: "TAYLOR SWIFT", h: "Famosa por escribir sobre sus ex y regrabar sus discos" },
            { w: "BILLIE EILISH", h: "La artista más joven en ganar los cuatro grandes Grammy" },
            { w: "DUA LIPA", h: "La reina del Future Nostalgia" },
            { w: "HARRY STYLES", h: "De One Direction a ser un ícono de la moda y el rock" },
            { w: "ELTON JOHN", h: "El Rocket Man de los lentes extravagantes" },
            { w: "STEVIE WONDER", h: "Genio multiinstrumentista ciego de la Motown" },
            { w: "MICK JAGGER", h: "El vocalista con los labios más famosos del rock" },
            { w: "PAUL MCCARTNEY", h: "El Beatle que sigue llenando estadios con su bajo" },
            { w: "JOHN LENNON", h: "Activista de la paz asesinado en Nueva York" },
            { w: "BOB DYLAN", h: "El único cantautor con un Premio Nobel de Literatura" },
            { w: "BRUCE SPRINGSTEEN", h: "Apodado 'The Boss', representa a la clase obrera de EE.UU." },
            { w: "PRINCE", h: "El genio de Minneapolis que cambió su nombre por un símbolo" },
            { w: "FRANK SINATRA", h: "Apodado 'La Voz' y miembro del Rat Pack" },
            { w: "ARETHA FRANKLIN", h: "La indiscutible Reina del Soul" },
            { w: "WHITNEY HOUSTON", h: "La voz que inmortalizó el tema de 'El Guardaespaldas'" },
            { w: "CELINE DION", h: "La diva de Quebec famosa por el tema de Titanic" },
            { w: "SHAKIRA", h: "La colombiana que conquistó el mundo moviendo los pies" },
            { w: "ROSALÍA", h: "Mezcló el flamenco con el trap en 'El Mal Querer'" },
            { w: "BAD BUNNY", h: "El primer artista de habla hispana más escuchado en Spotify" },
            { w: "J BALVIN", h: "Llevó los colores del reggaetón a las pasarelas de moda" },
            { w: "KAROL G", h: "La 'Bichota' que domina el género urbano femenino" },
            { w: "LUIS MIGUEL", h: "El Sol de México, ídolo del bolero y la balada" },
            { w: "GUSTAVO CERATI", h: "Líder de Soda Stereo y leyenda del rock en español" },
            { w: "CHARLY GARCÍA", h: "El genio del bigote bicolor de Argentina" },
            { w: "FITO PÁEZ", h: "El rosarino que compuso 'El amor después del amor'" },
            { w: "SPINETTA", h: "Luis Alberto, el 'Flaco', poeta máximo del rock nacional" },
            { w: "CELIA CRUZ", h: "La Guarachera de Cuba que gritaba ¡Azúcar!" },
            { w: "RUBÉN BLADES", h: "El poeta de la salsa y autor de Pedro Navaja" },
            { w: "JUAN LUIS GUERRA", h: "Dominicano que hizo bailar al mundo con 4.40" },
            { w: "RICKY MARTIN", h: "El puertorriqueño que lideró el 'crossover' latino" },
            { w: "ENRIQUE IGLESIAS", h: "El rey del pop latino e hijo de una leyenda" },
            { w: "JULIO IGLESIAS", h: "El artista latino que más discos ha vendido en la historia" },
            { w: "RAPHAEL", h: "El niño de Linares con una gesticulación única al cantar" },
            { w: "JOAQUÍN SABINA", h: "El cantautor de la voz aguardentosa y el bombín" },
            { w: "JOAN MANUEL SERRAT", h: "El catalán que musicalizó a los poetas españoles" },
            { w: "ALEJANDRO SANZ", h: "El español del corazón partío" },
            { w: "MALUMA", h: "El Pretty Boy de Medellín" },
            { w: "OZUNA", h: "El Negrito de Ojos Claros con hits mundiales" },
            { w: "DADDY YANKEE", h: "El Big Boss, retirado recientemente del reggaetón" },
            { w: "DON OMAR", h: "El Rey del género urbano y rival histórico de Yankee" },
            { w: "ANUEL AA", h: "Pionero del trap real hasta la muerte" },
            { w: "RAUW ALEJANDRO", h: "Conocido por sus coreografías y estilo futurista" },
            { w: "CAMILO", h: "Voz dulce, ukelele y un bigote muy particular" },
            { w: "SEBASTIÁN YATRA", h: "Pasó del reggaetón a las baladas románticas con éxito" },
            { w: "TINI", h: "Martina Stoessel, de Disney a la música urbana" },
            { w: "LALI", h: "La diva del pop argentino que empezó en Casi Ángeles" },
            { w: "NATHY PELUSO", h: "Fusión de salsa, rap y jazz con mucha personalidad" },
            { w: "TRUENO", h: "Rapero de La Boca, campeón de Red Bull" },
            { w: "WOS", h: "Valentín Oliva, el pibe que saltó del freestyle a los estadios" },
            { w: "DUKI", h: "El máximo referente del trap nacido en El Quinto Escalón" },
            { w: "BIZARRAP", h: "Productor que no muestra su cara y graba en su cuarto" },
            { w: "MILEY CYRUS", h: "De Hannah Montana a ser una rockera rebelde" },
            { w: "JUSTIN BIEBER", h: "Descubierto en YouTube, se volvió la mayor estrella juvenil" },
            { w: "KATY PERRY", h: "Famosa por sus videoclips coloridos y hits veraniegos" },
            { w: "LANA DEL REY", h: "Elegancia melancólica con estética de los años 50" },
            { w: "THE WEEKND", h: "Abel Tesfaye, reinventor del R&B con estética de cine" },
            { w: "DRAKE", h: "El canadiense que domina las listas de rap y R&B" },
            { w: "EMINEM", h: "Slim Shady, el rapero blanco que cambió el género" },
            { w: "KANYE WEST", h: "Genio de la producción musical y figura muy polémica" },
            { w: "KENDRICK LAMAR", h: "Ganador del Pulitzer por sus letras de hip-hop" },
            { w: "POST MALONE", h: "Mezcla rock, country y rap con la cara tatuada" },
            { w: "DOJA CAT", h: "Rapera y cantante viral por su humor y estética" },
            { w: "SZA", h: "La voz líder del R&B contemporáneo" },
            { w: "TRAVIS SCOTT", h: "Famoso por sus shows energéticos y su estética 'Astroworld'" },
            { w: "CARDI B", h: "Rapera del Bronx con una personalidad explosiva" },
            { w: "NICKI MINAJ", h: "La Reina del Rap con múltiples alter egos" },
            { w: "JANIS JOPLIN", h: "La primera gran estrella femenina del rock blanco" },
            { w: "JIM MORRISON", h: "El Rey Lagarto y líder de The Doors" },
            { w: "JIMI HENDRIX", h: "El mejor guitarrista de la historia del rock" },
            { w: "CHUCK BERRY", h: "El padre del Rock and Roll y su paso del pato" },
            { w: "LITTLE RICHARD", h: "El arquitecto del Rock and Roll" },
            { w: "BILLY JOEL", h: "El Piano Man de Long Island" },
            { w: "BEE GEES", h: "Los reyes de la música Disco y las voces agudas" },
            { w: "ANNIE LENNOX", h: "Voz de Eurythmics con estética andrógina" },
            { w: "DOLLY PARTON", h: "La reina eterna de la música Country" },
            { w: "SHER", h: "La Diosa del Pop con una carrera de seis décadas" },
            { w: "TINA TURNER", h: "La Reina del Rock con una energía inagotable" },
            { w: "ROBBIE WILLIAMS", h: "De Take That a ser el solista más exitoso del Reino Unido" },
            { w: "GEORGE MICHAEL", h: "Voz privilegiada de Wham! y carrera solista icónica" },
            { w: "LUCIANO PAVAROTTI", h: "El tenor que llevó la ópera a las masas" },
            { w: "BJÖRK", h: "La artista islandesa más vanguardista del mundo" },
            { w: "ROSALÍA", h: "La Motomami" },
            { w: "CAMILO SESTO", h: "Voz prodigiosa de la balada española" },
            { w: "NINO BRAVO", h: "Cantó a 'Libre' antes de su trágico final" },
            { w: "SANDRO", h: "El Gitano argentino que volvía locas a sus 'nenas'" },
            { w: "PALITO ORTEGA", h: "El Rey de la música complaciente en los 60" }
        ]
    }
    ,
    canciones: {
        icon: "🎵",
        label: "Canciones",
        words: [
            { w: "BOHEMIAN RHAPSODY", h: "Seis minutos de ópera, rock y balada de Queen" },
            { w: "STAIRWAY TO HEAVEN", h: "El solo de guitarra más famoso de Led Zeppelin" },
            { w: "SMELLS LIKE TEEN SPIRIT", h: "El himno que definió a la Generación X" },
            { w: "BILLIE JEAN", h: "Inmortalizó el Moonwalk en el aniversario de Motown" },
            { w: "LIKE A VIRGIN", h: "El hit que generó escándalo en los MTV VMA de 1984" },
            { w: "HOTEL CALIFORNIA", h: "Misteriosa letra sobre un lugar del que nunca te vas" },
            { w: "WONDERWALL", h: "La canción de Oasis que suena en todas las fogatas" },
            { w: "YESTERDAY", h: "La canción con más versiones en la historia de la música" },
            { w: "SMOOTH CRIMINAL", h: "Canción sobre una tal Annie atacada en su casa" },
            { w: "THRILLER", h: "Tiene el video musical más influyente de la historia" },
            { w: "DESPACITO", h: "El fenómeno global de Luis Fonsi y Daddy Yankee" },
            { w: "HELLO", h: "El regreso triunfal de Adele tras años de silencio" },
            { w: "BLINDING LIGHTS", h: "Sintetizadores ochenteros en el mayor hit de 2020" },
            { w: "SHAPE OF YOU", h: "Ritmo tropical-pop que dominó las radios de Ed Sheeran" },
            { w: "BAD GUY", h: "Pop minimalista con un susurro final de 'duh'" },
            { w: "ROLLING IN THE DEEP", h: "El rugido de despecho de Adele" },
            { w: "UPTOWN FUNK", h: "Colaboración de Mark Ronson y Bruno Mars que suena a 1970" },
            { w: "STAYIN ALIVE", h: "El ritmo perfecto para hacer RCP y bailar disco" },
            { w: "PURPLE RAIN", h: "La balada definitiva de Prince bajo la lluvia" },
            { w: "WAKA WAKA", h: "Himno oficial del mundial de Sudáfrica 2010" },
            { w: "IMAGINE", h: "Utopía de paz escrita por John Lennon" },
            { w: "HAVE YOU EVER SEEN THE RAIN", h: "Clásico de Creedence sobre la lluvia en sol" },
            { w: "SWEET CHILD O MINE", h: "Famoso riff de Slash dedicado a una novia" },
            { w: "BACK IN BLACK", h: "El regreso de AC/DC tras la muerte de su cantante" },
            { w: "SULTANS OF SWING", h: "Limpio sonido de guitarra de Dire Straits" },
            { w: "LOSE YOURSELF", h: "Rap de Eminem sobre aprovechar la única oportunidad" },
            { w: "GODS PLAN", h: "Drake repartiendo dinero en el video" },
            { w: "FLOWERS", h: "Himno de amor propio de Miley Cyrus inspirado en Bruno Mars" },
            { w: "AS IT WAS", h: "Hit melancólico y bailable de Harry Styles" },
            { w: "VIVA LA VIDA", h: "Coldplay cantando sobre reyes caídos" },
            { w: "CREEP", h: "El éxito de Radiohead que la propia banda llegó a odiar" },
            { w: "WISH YOU WERE HERE", h: "Pink Floyd extrañando a Syd Barrett" },
            { w: "ANOTHER BRICK IN THE WALL", h: "Crítica al sistema educativo británico" },
            { w: "WE WILL ROCK YOU", h: "Pisotón, pisotón, aplauso" },
            { w: "LIVIN ON A PRAYER", h: "Jon Bon Jovi cantando sobre Tommy y Gina" },
            { w: "DANCING QUEEN", h: "El hit supremo de los suecos de ABBA" },
            { w: "GIRLS JUST WANT TO HAVE FUN", h: "Himno feminista ochentero de Cyndi Lauper" },
            { w: "TAKE ON ME", h: "Famosa por su video de dibujo animado y nota aguda" },
            { w: "EVERY BREATH YOU TAKE", h: "The Police en una canción que parece amor pero es acoso" },
            { w: "UNDER THE BRIDGE", h: "Confesión de Anthony Kiedis sobre su soledad en LA" },
            { w: "ZOMBIE", h: "Protesta de The Cranberries por el conflicto irlandés" },
            { w: "WONDERWALL", h: "Oasis y su muro de maravillas" },
            { w: "BITTER SWEET SYMPHONY", h: "Famosa por su sample de cuerdas y su video caminando" },
            { w: "SEVEN NATION ARMY", h: "El riff que se convirtió en cántico de estadio" },
            { w: "CLOCKS", h: "El piano circular más famoso de Coldplay" },
            { w: "HEY JUDE", h: "Beatles cantando para consolar al hijo de Lennon" },
            { w: "LET IT BE", h: "Palabras de sabiduría de la madre de Paul McCartney" },
            { w: "SPACE ODDITY", h: "La odisea del Mayor Tom en el espacio" },
            { w: "HEROES", h: "Podemos serlo por solo un día" },
            { w: "LUST FOR LIFE", h: "Energía pura de Iggy Pop" },
            { w: "BORN TO RUN", h: "La gran escapada de Bruce Springsteen" },
            { w: "LIKE A ROLLING STONE", h: "Dylan cambió la duración de los singles con esta" },
            { w: "RESPECT", h: "Aretha Franklin exigiendo lo que le corresponde" },
            { w: "I WILL ALWAYS LOVE YOU", h: "Escrita por Dolly Parton, inmortalizada por Whitney" },
            { w: "MY HEART WILL GO ON", h: "El barco se hunde pero la música sigue" },
            { w: "LA BAMBA", h: "Canción tradicional mexicana hecha rock por Ritchie Valens" },
            { w: "MACARENA", h: "El baile que todo el mundo sabe pero nadie admite" },
            { w: "GASOLINA", h: "La canción que internacionalizó el reggaetón" },
            { w: "HIPS DONT LIE", h: "Shakira y Wyclef Jean en la cima del mundo" },
            { w: "PROVINCIAS REBELDES", h: "Soda Stereo en la ciudad de la furia" },
            { w: "DE MÚSICA LIGERA", h: "Nada más queda, solo el final" },
            { w: "LA INGRATA", h: "Ska-rock mexicano de Café Tacvba" },
            { w: "RAYANDO EL SOL", h: "La desesperación de Maná" },
            { w: "AMOR PROHIBIDO", h: "Selena cantando sobre un amor de distintas clases" },
            { w: "MATADOR", h: "Los Fabulosos Cadillacs y su ritmo de murga" },
            { w: "JIJIJI", h: "El pogo más grande del mundo del Indio Solari" },
            { w: "FLACA", h: "Andrés Calamaro pidiendo que no le mientan" },
            { w: "PERSUANA AMERICANA", h: "Seducción a través de una ventana por Soda" },
            { w: "PROMESAS SOBRE EL BIDET", h: "Charly García y su genialidad en Piano Bar" },
            { w: "LAMENTO BOLIVIANO", h: "Borracho y loco de Enanitos Verdes" },
            { w: "TUSA", h: "Karol G y Nicki Minaj cantando al despecho" },
            { w: "BIZARRAP SESSION 53", h: "Shakira facturando tras su ruptura" },
            { w: "PROVENZA", h: "El verano de Karol G" },
            { w: "DAKITI", h: "Bad Bunny y Jhayco en un hit espacial" },
            { w: "HAWAII", h: "Maluma cantando a una ex que miente en Instagram" },
            { w: "DESPECHÁ", h: "Rosalía en modo mambo veraniego" },
            { w: "TODO DE TI", h: "Rauw Alejandro en modo roller disco" },
            { w: "TELEPATÍA", h: "Kali Uchis cantando sobre amor a distancia" },
            { w: "MONOTONÍA", h: "Shakira con el corazón en la mano" },
            { w: "PEPAS", h: "Farruko y su himno de fiesta electrónica-urbana" },
            { w: "LA BACHATA", h: "Manuel Turizo trayendo el género de vuelta" },
            { w: "UN SIGLO SIN TI", h: "Chayanne y su romanticismo extremo" },
            { w: "AZUL", h: "Cristian Castro en su punto más pop" },
            { w: "LA CAMISA NEGRA", h: "Juanes y su luto por un amor" },
            { w: "VALERIE", h: "Amy Winehouse haciendo un cover de The Zutons" },
            { w: "REHAB", h: "Dijeron que fuera, ella dijo No, No, No" },
            { w: "BAD ROMANCE", h: "Rah-rah-ah-ah-ah de Lady Gaga" },
            { w: "TOXIC", h: "El hit más afilado de Britney Spears" },
            { w: "UMBRELLA", h: "Rihanna bajo la lluvia de diamantes" },
            { w: "FIREWORK", h: "Katy Perry motivando a todos" },
            { w: "ROYALS", h: "Lorde criticando el lujo excesivo" },
            { w: "PUMPED UP KICKS", h: "Ritmo alegre para una letra muy oscura" },
            { w: "TAKE ME TO CHURCH", h: "Hozier y su crítica a las instituciones" },
            { w: "STRESSED OUT", h: "Twenty One Pilots extrañando la infancia" },
            { w: "HEAT WAVES", h: "Glass Animals dominando TikTok en 2021" },
            { w: "LEVITATING", h: "Dua Lipa flotando en la disco" },
            { w: "LOSE CONTROL", h: "Teddy Swims y su voz de trueno" },
            { w: "BELIEVER", h: "Imagine Dragons y el dolor como maestro" },
            { w: "STAY", h: "The Kid LAROI y Justin Bieber en un hit veloz" },
            { w: "LOVERS ROCK", h: "TV Girl y su sonido indie hipnótico" }
        ]
    }
    ,
    ciudades: {
        icon: "🏙️",
        label: "Ciudades",
        words: [
            { w: "PRAGA", h: "La ciudad de las cien torres sobre el río Moldava" },
            { w: "AMSTERDAM", h: "Canales en semicírculo y bicicletas" },
            { w: "VENECIA", h: "Una ciudad que flota sobre pilotes" },
            { w: "FLORENCIA", h: "Cuna del Renacimiento y los Medici" },
            { w: "ATENAS", h: "Donde el Partenón observa desde lo alto" },
            { w: "ESTAMBUL", h: "Un pie en Europa y otro en Asia" },
            { w: "JERUSALÉN", h: "Ciudad sagrada para tres religiones" },
            { w: "EL CAIRO", h: "A la sombra de las pirámides de Giza" },
            { w: "DUBÁI", h: "Rascacielos que tocan las nubes en el desierto" },
            { w: "SINGAPUR", h: "La ciudad jardín de alta tecnología" },
            { w: "TOKIO", h: "Neon, samuráis y el cruce más transitado" },
            { w: "SEÚL", h: "K-pop y palacios antiguos" },
            { w: "SÍDNEY", h: "Una ópera blanca frente al puerto" },
            { w: "RÍO DE JANEIRO", h: "Entre el Pan de Azúcar y el Cristo Redentor" },
            { w: "BUENOS AIRES", h: "La París de Sudamérica" },
            { w: "NUEVA YORK", h: "La gran manzana que nunca duerme" },
            { w: "LOS ÁNGELES", h: "Donde se fabrican los sueños de Hollywood" },
            { w: "LAS VEGAS", h: "Ciudad del pecado y luces infinitas" },
            { w: "CHICAGO", h: "La ciudad del viento y los mafiosos" },
            { w: "SAN FRANCISCO", h: "Cuestas empinadas y un puente rojo" },
            { w: "LONDRES", h: "Niebla, Big Ben y el Támesis" },
            { w: "PARÍS", h: "La ciudad de la luz y la Torre Eiffel" },
            { w: "ROMA", h: "La ciudad eterna de los siete colinas" },
            { w: "MADRID", h: "El corazón de la península" },
            { w: "BARCELONA", h: "Modernismo de Gaudí frente al mar" },
            { w: "BERLÍN", h: "Una ciudad dividida que volvió a nacer" },
            { w: "MÚNICH", h: "Cerveza, salchichas y el Oktoberfest" },
            { w: "VIENA", h: "Valses, ópera y elegancia imperial" },
            { w: "ZÚRICH", h: "El banco del mundo entre lagos" },
            { w: "MOSCÚ", h: "Cúpulas de colores en la Plaza Roja" },
            { w: "SAN PETERSBURGO", h: "La ventana a Europa del zar Pedro" },
            { w: "PEKÍN", h: "La ciudad prohibida de los emperadores" },
            { w: "SHANGHÁI", h: "El futuro de China frente al Bund" },
            { w: "HONG KONG", h: "Rascacielos entre montañas y mar" },
            { w: "BANGKOK", h: "Templos dorados y comida callejera" },
            { w: "BOMBAY", h: "El corazón de Bollywood" },
            { w: "NUEVA DELHI", h: "Caos y palacios de gobierno" },
            { w: "CIUDAD DEL CABO", h: "Donde se encuentran dos océanos" },
            { w: "CASABLANCA", h: "El puerto blanco del Magreb" },
            { w: "MARRAKECH", h: "La ciudad roja de los zocos" },
            { w: "MÉXICO DF", h: "Construida sobre un antiguo lago" },
            { w: "SANTIAGO", h: "Vigilada por la Cordillera de los Andes" },
            { w: "BOGOTÁ", h: "Veintiséis metros más cerca de las estrellas" },
            { w: "LIMA", h: "La ciudad de los reyes y la gastronomía" },
            { w: "SAO PAULO", h: "La selva de concreto más grande" },
            { w: "LISBOA", h: "Siete colinas sobre el Tajo" },
            { w: "EDIMBURGO", h: "Castillos y callejones medievales" },
            { w: "DUBLÍN", h: "Cerveza Guinness y literatura" },
            { w: "COPENHAGUE", h: "La sirenita y el diseño danés" },
            { w: "ESTOCOLMO", h: "La Venecia del Norte entre islas" },
            { w: "OSLO", h: "Diseño moderno y fiordos vikingos" },
            { w: "HELSINKI", h: "La hija del Báltico" },
            { w: "VARSOVIA", h: "Resurgida de sus cenizas" },
            { w: "BUDAPEST", h: "Dos ciudades separadas por el Danubio" },
            { w: "VALENCIA", h: "Tierra de las flores y las fallas" },
            { w: "SEVILLA", h: "Giralda, flamenco y azahar" },
            { w: "NÁPOLES", h: "A la sombra del Vesubio" },
            { w: "MILÁN", h: "La pasarela de la moda mundial" },
            { w: "GINEBRA", h: "Diplomacia y relojes de lujo" },
            { w: "BRUSELAS", h: "Papas fritas y el corazón europeo" },
            { w: "REIKIAVIK", h: "La capital más septentrional" },
            { w: "TORONTO", h: "La torre CN y diversidad absoluta" },
            { w: "VANCOUVER", h: "Montañas que tocan el Pacífico" },
            { w: "MONTREAL", h: "El encanto francés en Norteamérica" },
            { w: "MONTEVIDEO", h: "Tranquilidad frente al Río de la Plata" },
            { w: "QUITO", h: "El centro del mundo en los Andes" },
            { w: "LA PAZ", h: "La capital que toca el cielo" },
            { w: "ASUNCIÓN", h: "Madre de ciudades" },
            { w: "MEDELLÍN", h: "La ciudad de la eterna primavera" },
            { w: "CANCÚN", h: "Aguas turquesas y ruinas mayas" },
            { w: "MALLORCA", h: "La perla de las Baleares" },
            { w: "NIZA", h: "El azul de la Costa Azul" },
            { w: "MARSELLA", h: "El puerto más antiguo de Francia" },
            { w: "LYON", h: "Capital mundial de la seda y cocina" },
            { w: "OPORTO", h: "Vino y azulejos frente al Duero" },
            { w: "SEVILLA", h: "Donde el Guadalquivir se vuelve arte" },
            { w: "BILBAO", h: "Efecto titanio frente a la ría" },
            { w: "ANTWERP", h: "El mercado mundial de los diamantes" },
            { w: "BRUJAS", h: "El cuento de hadas medieval" },
            { w: "CRACOVIA", h: "Dragones y reyes en el Vístula" },
            { w: "BUCAREST", h: "El pequeño París del Este" },
            { w: "SOFÍA", h: "Historia bajo la montaña Vitosha" },
            { w: "BELGRADO", h: "La ciudad blanca de los Balcanes" },
            { w: "ZAGREB", h: "Cafés y museos de corazones rotos" },
            { w: "SARAJEVO", h: "Donde Oriente se encuentra con Occidente" },
            { w: "KIEV", h: "Cúpulas doradas sobre el Dniéper" },
            { w: "MASCATE", h: "Fortalezas entre montañas negras y mar" },
            { w: "TEL AVIV", h: "La ciudad blanca que nunca descansa" },
            { w: "AMÁN", h: "Siete colinas de piedra blanca" },
            { w: "BEIRUT", h: "La fénix del Mediterráneo" },
            { w: "TASHEKENT", h: "Modernidad soviética en Asia Central" },
            { w: "MANILA", h: "Intramuros y caos tropical" },
            { w: "HANOI", h: "Lagos, templos y café con huevo" },
            { w: "HO CHI MINH", h: "La antigua Saigón" },
            { w: "YAKARTA", h: "Metrópolis que se hunde en Java" },
            { w: "KUALA LUMPUR", h: "Acero, vidrio y selva tropical" },
            { w: "OSAKA", h: "La cocina de Japón" },
            { w: "KIOTO", h: "Diez mil santuarios y geishas" },
            { w: "HIROSHIMA", h: "Símbolo de paz eterna" },
            { w: "ADELAIDA", h: "La ciudad de las iglesias y festivales" }
        ]
    }
    ,
    apps: {
        icon: "📱",
        label: "Apps",
        words: [
            { w: "DISCORD", h: "Donde los gamers y comunidades se reúnen" },
            { w: "REDDIT", h: "La portada de internet y sus miles de foros" },
            { w: "DUOLINGO", h: "Un búho que te persigue para que estudies idiomas" },
            { w: "SHAZAM", h: "¿Cómo se llama esa canción que suena?" },
            { w: "PINTEREST", h: "Tableros de inspiración y estética" },
            { w: "LINKEDIN", h: "Tu currículum vivo y redes profesionales" },
            { w: "TINDER", h: "Desliza a la derecha para encontrar pareja" },
            { w: "BEANCE", h: "Escaparate para diseñadores y creativos" },
            { w: "STRAVA", h: "La red social para ciclistas y corredores" },
            { w: "WIKIPEDIA", h: "La enciclopedia libre del mundo" },
            { w: "TELEGRAM", h: "Mensajería con canales y mucha privacidad" },
            { w: "TIKTOK", h: "Vídeos verticales de 15 segundos a minutos" },
            { w: "SNAPCHAT", h: "Mensajes que desaparecen y filtros de cara" },
            { w: "TWITCH", h: "Streaming en vivo de juegos y más" },
            { w: "SPOTIFY", h: "Millones de canciones en tu bolsillo" },
            { w: "NETFLIX", h: "Películas y series por suscripción" },
            { w: "DISNEY PLUS", h: "Star Wars, Marvel y clásicos animados" },
            { w: "AMAZON PRIME", h: "Envíos rápidos y streaming de video" },
            { w: "YOUTUBE", h: "El buscador de vídeos más grande" },
            { w: "INSTAGRAM", h: "Fotos, filtros y ahora Reels" },
            { w: "FACEBOOK", h: "La red social que empezó en Harvard" },
            { w: "X", h: "Antes conocida como el pájaro azul" },
            { w: "THREADS", h: "La respuesta de Meta a Twitter" },
            { w: "WHATSAPP", h: "La app de mensajería más usada del mundo" },
            { w: "MESSENGER", h: "El chat de Facebook" },
            { w: "SIGNAL", h: "La opción de mensajería más segura" },
            { w: "WERE", h: "Videollamadas fáciles desde el navegador" },
            { w: "ZOOM", h: "Reuniones virtuales profesionales" },
            { w: "SLACK", h: "La comunicación interna de las empresas" },
            { w: "TRELLO", h: "Organización de tareas por tarjetas" },
            { w: "NOTION", h: "Espacio de trabajo todo en uno" },
            { w: "EVERNOTE", h: "Un elefante para no olvidar tus notas" },
            { w: "GOOGLE MAPS", h: "Para no perderte nunca" },
            { w: "WAZE", h: "Tráfico reportado por conductores en tiempo real" },
            { w: "UBER", h: "Pide un coche desde el celular" },
            { w: "CABIFY", h: "Transporte privado con conductor" },
            { w: "DIDi", h: "Competencia de transporte y delivery" },
            { w: "RAPPI", h: "El bigote que te trae la comida" },
            { w: "PEDIDOS YA", h: "Delivery líder en Latinoamérica" },
            { w: "GLOVO", h: "Repartidores con mochilas amarillas" },
            { w: "EBAY", h: "Subastas y compras por internet" },
            { w: "ALIEXPRESS", h: "Compras directas desde China" },
            { w: "MERCADO LIBRE", h: "El gigante del ecommerce en Latam" },
            { w: "AIRBNB", h: "Alquiler de casas por días" },
            { w: "BOOKING", h: "Reserva de hoteles en todo el mundo" },
            { w: "TRIPADVISOR", h: "Opiniones de viajeros sobre lugares" },
            { w: "SKYSCANNER", h: "Buscador de vuelos baratos" },
            { w: "CANVA", h: "Diseño gráfico para no diseñadores" },
            { w: "PICSART", h: "Editor de fotos con muchas herramientas" },
            { w: "CAPCUT", h: "Editor de vídeo para redes sociales" },
            { w: "LIGHTROOM", h: "Revelado digital de fotos profesional" },
            { w: "VSCO", h: "Filtros de película para fotos" },
            { w: "FACETUNE", h: "Retoque de rostros en selfies" },
            { w: "POKEMON GO", h: "Captura monstruos en el mundo real" },
            { w: "ROBLOX", h: "Universo virtual de juegos creados por usuarios" },
            { w: "MINECRAFT", h: "Construcción con bloques en versión móvil" },
            { w: "CLASH ROYALE", h: "Duelos de cartas en tiempo real" },
            { w: "CANDY CRUSH", h: "Rompecabezas de caramelos dulce" },
            { w: "AMONG US", h: "Encuentra al impostor en la nave" },
            { w: "GENSHIN IMPACT", h: "RPG de mundo abierto masivo" },
            { w: "DUOLINGO", h: "Aprende idiomas jugando" },
            { w: "COURSERA", h: "Cursos universitarios online" },
            { w: "UDEMY", h: "Plataforma de cursos de todo tipo" },
            { w: "KINDLE", h: "Lectura de libros electrónicos" },
            { w: "WATTPAD", h: "Lee y escribe historias gratis" },
            { w: "AUDIBLE", h: "Audiolibros en cualquier lugar" },
            { w: "CALM", h: "Meditación y sueño reparador" },
            { w: "HEADSPACE", h: "Guía para la meditación diaria" },
            { w: "MYFITNESSPAL", h: "Contador de calorías y ejercicio" },
            { w: "FLO", h: "Calendario de salud femenina" },
            { w: "STEPN", h: "Gana criptos por caminar con zapatillas NFT" },
            { w: "BINANCE", h: "Exchange de criptomonedas más grande" },
            { w: "COINBASE", h: "Compra y venta fácil de Bitcoin" },
            { w: "METAMASK", h: "Billetera para la Web3" },
            { w: "REVOLUT", h: "Banca digital global sin comisiones" },
            { w: "PAYPAL", h: "Pagos seguros en internet" },
            { w: "WISE", h: "Transferencias internacionales baratas" },
            { w: "WALMART", h: "Compras de supermercado" },
            { w: "COCA COLA", h: "Promociones y fidelidad de la marca roja" },
            { w: "ADOBE SCAN", h: "Escanea documentos con la cámara" },
            { w: "MICROSOFT TEAMS", h: "Colaboración de video y chat de trabajo" },
            { w: "OUTLOOK", h: "Gestión de correos de Microsoft" },
            { w: "GMAIL", h: "El correo electrónico de Google" },
            { w: "GOOGLE DRIVE", h: "Almacenamiento en la nube" },
            { w: "DROPBOX", h: "Caja azul para guardar archivos" },
            { w: "ICLOUD", h: "La nube de los dispositivos Apple" },
            { w: "SHAZAM", h: "Reconoce canciones" },
            { w: "SOUNDCLOUD", h: "Plataforma para artistas independientes" },
            { w: "TIDAL", h: "Música con alta fidelidad de sonido" },
            { w: "DEEZER", h: "Streaming de música con Flow" },
            { w: "WINDY", h: "Mapas detallados del viento y clima" },
            { w: "ACCUWEATHER", h: "Pronóstico del tiempo preciso" },
            { w: "TUMBLR", h: "Microblogging visual y comunidades" },
            { w: "QUORA", h: "Preguntas y respuestas de expertos" },
            { w: "MEDIUM", h: "Artículos de lectura profunda" },
            { w: "SUBSTACK", h: "Newsletters de tus autores favoritos" },
            { w: "BEHANCE", h: "Portfolio creativo" },
            { w: "DRIBBBLE", h: "Inspiración para diseñadores de interfaz" },
            { w: "GITHUB", h: "Donde reside el código del mundo" },
            { w: "STACK OVERFLOW", h: "Salvavidas para programadores" }
        ]
    }
    ,
    marcas: {
        icon: "🏷️",
        label: "Marcas",
        words: [
            { w: "ROLEX", h: "Precisión suiza que no necesita batería" },
            { w: "FERRARI", h: "Un caballo que corre sobre rojo pasión" },
            { w: "LEGO", h: "Pequeños ladrillos que construyen mundos" },
            { w: "NINTENDO", h: "Haciendo jugar al mundo desde Kioto" },
            { w: "DISNEY", h: "Donde los sueños tienen un ratón como guía" },
            { w: "STARBUCKS", h: "Sirena verde que vende experiencias en taza" },
            { w: "IKEA", h: "Muebles por armar con nombres extraños" },
            { w: "ZARA", h: "Moda rápida desde Galicia al mundo" },
            { w: "ROLEX", h: "El lujo del tiempo en la muñeca" },
            { w: "CHANEL", h: "El número 5 de la elegancia francesa" },
            { w: "GUCCI", h: "Lujo florentino con dos G entrelazadas" },
            { w: "LOUIS VUITTON", h: "Maletas con monogramas de estatus" },
            { w: "PRADA", h: "El diablo se viste con ella" },
            { w: "HERMÈS", h: "Nacida para la hípica, famosa por sus bolsos" },
            { w: "DIOR", h: "Revolucionó la silueta femenina en 1947" },
            { w: "VERSACE", h: "La medusa que hipnotiza en la moda" },
            { w: "ARMANI", h: "Elegancia sobria italiana" },
            { w: "DOLCE GABBANA", h: "Estilo siciliano en la pasarela" },
            { w: "BURBERRY", h: "Gabardinas con cuadros británicos" },
            { w: "TIFFANY", h: "Desayuno con diamantes y azul celeste" },
            { w: "CARTIER", h: "El joyero de los reyes" },
            { w: "RAY BAN", h: "Lentes para aviadores y estrellas de rock" },
            { w: "LEVIS", h: "Los pantalones que resistieron la fiebre del oro" },
            { w: "H&M", h: "Gigante sueco de la ropa accesible" },
            { w: "UNIQLO", h: "Básicos japoneses de alta tecnología" },
            { w: "PATAGONIA", h: "Ropa para salvar el planeta" },
            { w: "THE NORTH FACE", h: "Equipamiento para el lado más frío" },
            { w: "RED BULL", h: "Te da alas y patrocina lo extremo" },
            { w: "MONSTER", h: "Energía con garras verdes" },
            { w: "NESPRESSO", h: "¿What else? Capsulitas de café" },
            { w: "NUTELLA", h: "Crema de avellanas que es religión" },
            { w: "KINDEL", h: "El lector de libros de Amazon" },
            { w: "PLAYSTATION", h: "El símbolo de los botones azul, rojo, verde y rosa" },
            { w: "XBOX", h: "La consola verde de Microsoft" },
            { w: "CANON", h: "Lentes que capturan la realidad" },
            { w: "NIKON", h: "Óptica japonesa de alta precisión" },
            { w: "PANASONIC", h: "Electrónica desde Osaka al mundo" },
            { w: "SHARP", h: "Pioneros en pantallas de cristal líquido" },
            { w: "CASIO", h: "Relojes calculadores y pianos de iniciación" },
            { w: "SEIKO", h: "La precisión del cuarzo japonés" },
            { w: "SWATCH", h: "Relojes de plástico que salvaron a Suiza" },
            { w: "PORSCHE", h: "El 911 es su silueta eterna" },
            { w: "LAMBORGHINI", h: "Toros mecánicos con puertas de tijera" },
            { w: "ROLLS ROYCE", h: "El espíritu del éxtasis en el capó" },
            { w: "BENTLEY", h: "Lujo británico con motor potente" },
            { w: "ASTON MARTIN", h: "El auto preferido de 007" },
            { w: "VOLVO", h: "Seguridad sueca sobre ruedas" },
            { w: "VOLKSWAGEN", h: "El auto del pueblo nacido en Alemania" },
            { w: "HONDA", h: "Poder de los sueños en dos y cuatro ruedas" },
            { w: "SUBARU", h: "Tracción total y estrellas en el logo" },
            { w: "HYUNDAI", h: "El gigante coreano que desafió al mundo" },
            { w: "FORD", h: "Puso al mundo sobre ruedas con el Modelo T" },
            { w: "CHEVROLET", h: "El corazón de América en el asfalto" },
            { w: "VISA", h: "Aceptada en todas partes, excepto donde no" },
            { w: "PAYPAL", h: "La billetera de la web original" },
            { w: "MASTERCARD", h: "Hay cosas que el dinero no puede comprar" },
            { w: "FEDEX", h: "Entregas nocturnas con una flecha oculta" },
            { w: "DHL", h: "El amarillo y rojo que recorre el globo" },
            { w: "UPS", h: "El gigante marrón de la logística" },
            { w: "GILLETTE", h: "Lo mejor para el hombre" },
            { w: "COLGATE", h: "Sonrisa blanca recomendada por dentistas" },
            { w: "DOVE", h: "Belleza real en una barra de jabón" },
            { w: "PANTENE", h: "Brillo y salud para el cabello" },
            { w: "LOREAL", h: "Porque tú lo vales" },
            { w: "NIVEA", h: "La lata azul de crema de toda la vida" },
            { w: "LEGO", h: "Jugar bien es su nombre danés" },
            { w: "MATTEL", h: "Barbie y Hot Wheels bajo su techo" },
            { w: "HASBRO", h: "Monopoly y Transformers en su catálogo" },
            { w: "PIXAR", h: "La lamparita que revolucionó el cine" },
            { w: "MARVEL", h: "La casa de las ideas y los superhéroes" },
            { w: "DC COMICS", h: "Detectives y el hombre de acero" },
            { w: "NETFLIX", h: "Empezó enviando DVD por correo" },
            { w: "SPOTIFY", h: "La biblioteca musical sueca" },
            { w: "AIRBNB", h: "Tu casa en cualquier parte del mundo" },
            { w: "UBER", h: "El transporte privado en un click" },
            { w: "TELEGRAM", h: "El avión de papel de la mensajería" },
            { w: "WHATSAPP", h: "Casi dos mil millones de usuarios chateando" },
            { w: "TIKTOK", h: "Vídeos cortos desde China" },
            { w: "ZOOM", h: "La oficina virtual de la pandemia" },
            { w: "ADOBE", h: "Creatividad en PDF y Photoshop" },
            { w: "ORACLE", h: "Bases de datos que mueven empresas" },
            { w: "SAP", h: "Gestión empresarial desde Alemania" },
            { w: "IBM", h: "El gigante azul de la computación" },
            { w: "DELL", h: "Computadoras directas a tu casa" },
            { w: "HP", h: "Nacida en un garaje de Palo Alto" },
            { w: "LOGITECH", h: "Periféricos desde Suiza" },
            { w: "RAZER", h: "Para gamers, por gamers, con luces verdes" },
            { w: "SENNHEISER", h: "Sonido alemán de alta fidelidad" },
            { w: "BOSE", h: "Cancelación de ruido y sonido premium" },
            { w: "BEATS", h: "Los auriculares del Dr. Dre" },
            { w: "HARLEY DAVIDSON", h: "Rugido de libertad en la ruta" },
            { w: "NESCAFÉ", h: "Café instantáneo en todo el mundo" },
            { w: "HEINEKEN", h: "La estrella roja de Amsterdam" },
            { w: "CORONA", h: "Encuentra tu playa con limón" },
            { w: "SMIRNOFF", h: "El vodka más famoso del mundo" },
            { w: "BACARDÍ", h: "El murciélago del ron cubano" },
            { w: "JOHNNIE WALKER", h: "Sigue caminando" },
            { w: "CHIVAS REGAL", h: "Mezcla de lujo escocesa" },
            { w: "MOET CHANDON", h: "Burbujas francesas de celebración" },
            { w: "RED BULL", h: "Energía extrema en lata plateada" }
        ]
    }
    ,
    objetos: {
        icon: "🧰",
        label: "Objetos",
        words: [
            { w: "BRÚJULA", h: "Apunta al norte pero no es una flecha" },
            { w: "DIAPASÓN", h: "Una horquilla de acero para afinar el oído" },
            { w: "CLEPSYDRA", h: "Reloj que mide el tiempo con gotas de agua" },
            { w: "GRAMÓFONO", h: "El bisabuelo del reproductor de vinilos" },
            { w: "PERGAMINO", h: "Piel de animal lista para ser escrita" },
            { w: "ESTETOSCOPIO", h: "Permite escuchar el ritmo del corazón" },
            { w: "SEXTANTE", h: "Navegación antigua mirando las estrellas" },
            { w: "SOPLETE", h: "Llama concentrada para fundir metales" },
            { w: "YUNQUE", h: "Donde el herrero golpea el hierro candente" },
            { w: "ASTROLABIO", h: "Calculadora astronómica de los navegantes" },
            { w: "CALEIDOSCOPIO", h: "Tubo con espejos que crea simetrías mágicas" },
            { w: "ODÓMETRO", h: "Mide la distancia recorrida por un vehículo" },
            { w: "PÉNDULO", h: "Oscila de un lado a otro por la gravedad" },
            { w: "TELAR", h: "Máquina para entrelazar hilos y crear telas" },
            { w: "BRUÑIDOR", h: "Herramienta para dar brillo por fricción" },
            { w: "ESCALPELO", h: "El pincel de acero del cirujano" },
            { w: "MORTERO", h: "Para machacar especias o medicinas" },
            { w: "ARADO", h: "Abre surcos en la tierra antes de sembrar" },
            { w: "ODRE", h: "Bolsa de cuero para transportar vino" },
            { w: "SISMÓGRAFO", h: "Dibuja las vibraciones de la tierra" },
            { w: "BARÓMETRO", h: "Mide la presión de la atmósfera" },
            { w: "CATALEJO", h: "Telescopio extensible de pirata" },
            { w: "FUELLE", h: "Sopla aire para avivar el fuego" },
            { w: "QUILATE", h: "Unidad que mide la pureza del oro" },
            { w: "CLARABOYA", h: "Ventana en el techo que mira al cielo" },
            { w: "ESCARPÍN", h: "Calzado diminuto para recién nacidos" },
            { w: "ALAMBIQUE", h: "Aparato para destilar alcoholes" },
            { w: "DEDAL", h: "Armadura para el dedo del sastre" },
            { w: "RUBIK", h: "Cubo de colores que desafía la lógica" },
            { w: "TINTERO", h: "Depósito para la pluma del escriba" },
            { w: "GRILLO", h: "Grillete para los pies o insecto ruidoso" },
            { w: "HUSA", h: "Funda para guardar el sable" },
            { w: "INCENSARIO", h: "Esparce humo aromático en el templo" },
            { w: "JUBÓN", h: "Prenda rígida que cubría el torso antaño" },
            { w: "KIMONO", h: "Túnica tradicional de seda japonesa" },
            { w: "LAÚD", h: "Instrumento de cuerda con forma de pera" },
            { w: "MÁSTIL", h: "El palo que sostiene las velas del barco" },
            { w: "NAVAJA", h: "Cuchillo que se guarda en su propio mango" },
            { w: "ÑANDUTÍ", h: "Encaje paraguayo que parece tela de araña" },
            { w: "ORCO", h: "Criatura fantástica o nombre de una espada" },
            { w: "PALETA", h: "Donde el pintor mezcla sus colores" },
            { w: "QUitasol", h: "Sombrilla para protegerse del astro rey" },
            { w: "RELOJ DE ARENA", h: "Dos bulbos de vidrio y un flujo constante" },
            { w: "SIFÓN", h: "Envase a presión para el agua con gas" },
            { w: "TABLA DE SURF", h: "Madera o fibra para deslizarse en las olas" },
            { w: "UNIFORME", h: "Ropa que hace a todos iguales en el grupo" },
            { w: "VELETA", h: "Indica hacia dónde sopla el viento" },
            { w: "WOK", h: "Sartén profunda de la cocina asiática" },
            { w: "XILÓFONO", h: "Láminas de madera que suenan al golpearlas" },
            { w: "YOYÓ", h: "Disco que sube y baja por un cordel" },
            { w: "ZAPATO", h: "Protección de cuero para el pie" },
            { w: "ANCLA", h: "Evita que el barco sea llevado por la marea" },
            { w: "BOYARÍN", h: "Pequeña boya que marca una posición" },
            { w: "CINCEL", h: "Herramienta para tallar piedra o metal" },
            { w: "DAGA", h: "Espada corta de doble filo" },
            { w: "ESCUADRA", h: "Triángulo para trazar ángulos rectos" },
            { w: "FRASCO", h: "Recipiente de vidrio con tapa" },
            { w: "GANCHO", h: "Hierro curvado para colgar o sujetar" },
            { w: "HARPA", h: "Marco con cuerdas que se tocan con los dedos" },
            { w: "IMÁN", h: "Atrae metales hacia su cuerpo" },
            { w: "JAULA", h: "Prisión de barrotes para aves" },
            { w: "KILT", h: "Falda escocesa de cuadros" },
            { w: "LINTERNA", h: "Luz portátil que usa pilas" },
            { w: "MARTILLO", h: "Golpea clavos con su cabeza de acero" },
            { w: "NIVEL", h: "Burbuja que indica si algo está plano" },
            { w: "OLLA", h: "Recipiente para cocinar guisos" },
            { w: "PALA", h: "Herramienta para cavar o recoger tierra" },
            { w: "QUESERA", h: "Campana de vidrio para guardar lácteos" },
            { w: "RAQUETA", h: "Malla tensa para golpear pelotas" },
            { w: "SERRUCHO", h: "Hoja dentada para cortar madera" },
            { w: "TIJERAS", h: "Dos cuchillas que pivotan para cortar" },
            { w: "URNA", h: "Caja para depositar votos o cenizas" },
            { w: "VÁLVULA", h: "Controla el flujo de un líquido o gas" },
            { w: "WASHBOARD", h: "Tabla de lavar usada como instrumento" },
            { w: "YELMO", h: "Casco que protegía la cabeza del caballero" },
            { w: "ZÓCALO", h: "Banda inferior de las paredes" },
            { w: "ALICATES", h: "Pinzas de metal para sujetar o cortar cables" },
            { w: "BISTURÍ", h: "Cuchillo pequeño de gran filo médico" },
            { w: "CANDIL", h: "Lámpara de aceite con mecha" },
            { w: "DEDAL", h: "Protector de metal para costura" },
            { w: "EMBUDO", h: "Ancho arriba y estrecho abajo para trasvasar" },
            { w: "FUSIBLE", h: "Se corta para proteger un circuito eléctrico" },
            { w: "GATO", h: "Máquina para levantar un coche y cambiar la rueda" },
            { w: "HEBILLA", h: "Cierre metálico de un cinturón" },
            { w: "INCUBADORA", h: "Mantiene el calor para que la vida crezca" },
            { w: "JERINGA", h: "Tubo con émbolo para inyectar líquidos" },
            { w: "KAYAK", h: "Canoa cerrada de un solo tripulante" },
            { w: "LUPA", h: "Lente que agranda los objetos pequeños" },
            { w: "MALETA", h: "Cofre con asa para llevar ropa de viaje" },
            { w: "NAVAJA", h: "Cuchillo plegable" },
            { w: "OJERAS", h: "Círculos oscuros bajo los ojos o accesorio" },
            { w: "PARAGUAS", h: "Techo portátil para los días de lluvia" },
            { w: "QUITASOL", h: "Sombrilla" },
            { w: "RÁDAR", h: "Detecta objetos lejanos mediante ondas" },
            { w: "SABLE", h: "Espada curva de caballería" },
            { w: "TORNO", h: "Máquina giratoria para dar forma" },
            { w: "UÑETA", h: "Púa pequeña para tocar la guitarra" },
            { w: "VELA", h: "Cera con mecha o tela de barco" },
            { w: "WÁLTER", h: "Inodoro en algunos países (del inglés)" },
            { w: "YOYÓ", h: "Sube y baja" },
            { w: "ZARANDA", h: "Cedazo para separar granos" }
        ]
    }
    ,
    series: {
        icon: "📺",
        label: "Series",
        words: [
            { w: "THE WIRE", h: "Realismo crudo en las calles de Baltimore" },
            { w: "MAD MEN", h: "Publicistas, whisky y humo en los años 60" },
            { w: "THE OFFICE", h: "Falso documental sobre una papelera" },
            { w: "DARK", h: "Viajes en el tiempo y un ciclo que se repite" },
            { w: "SUCCESSION", h: "Peleas de poder en una familia de medios" },
            { w: "THE BEAR", h: "Estrés y alta cocina en una sandwichería" },
            { w: "FLEABAG", h: "Rompiendo la cuarta pared con humor ácido" },
            { w: "SHERLOCK", h: "El detective más famoso en el Londres moderno" },
            { w: "THE CROWN", h: "La historia de la monarquía británica actual" },
            { w: "NARCOS", h: "El ascenso y caída de los carteles de droga" },
            { w: "BLACK MIRROR", h: "El lado oscuro de la tecnología futura" },
            { w: "FRIENDS", h: "Seis amigos sentados en un sillón café" },
            { w: "LOST", h: "Un accidente aéreo y una isla con secretos" },
            { w: "THE SOPRANOS", h: "Un mafioso que va al psicólogo" },
            { w: "THE MANDALORIAN", h: "Un cazarrecompensas cuidando a un niño verde" },
            { w: "THE BOYS", h: "Superhéroes que no son lo que parecen" },
            { w: "STRANGER THINGS", h: "Niños en los 80 enfrentando un mundo paralelo" },
            { w: "BOJACK HORSEMAN", h: "Un caballo famoso lidiando con la depresión" },
            { w: "PEAKY BLINDERS", h: "Gánsteres ingleses con cuchillas en las gorras" },
            { w: "THE LAST OF US", h: "Atravesar el país en un apocalipsis de hongos" },
            { w: "SQUID GAME", h: "Juegos infantiles que terminan en tragedia" },
            { w: "BETTER CALL SAUL", h: "La transformación de un abogado estafador" },
            { w: "TWIN PEAKS", h: "¿Quién mató a Laura Palmer?" },
            { w: "THE X FILES", h: "La verdad está ahí fuera" },
            { w: "SEINFELD", h: "Una serie sobre nada" },
            { w: "HOUSE OF CARDS", h: "Política oscura en la Casa Blanca" },
            { w: "THE HANDMAIDS TALE", h: "Distopía donde las mujeres pierden sus derechos" },
            { w: "TED LASSO", h: "Optimismo puro en el fútbol inglés" },
            { w: "MR ROBOT", h: "Un hacker contra el sistema financiero" },
            { w: "VEEP", h: "Sátira política sobre la vicepresidencia" },
            { w: "ATLANTA", h: "Rap, surrealismo y vida cotidiana" },
            { w: "THE WITCHER", h: "Cazador de monstruos de pelo blanco" },
            { w: "CHERNOBYL", h: "El costo de las mentiras tras un desastre" },
            { w: "COBRA KAI", h: "Regresa la rivalidad de Karate Kid" },
            { w: "MANIFEST", h: "Un avión aterriza cinco años tarde" },
            { w: "YOU", h: "Un librero que se obsesiona demasiado" },
            { w: "THE WHITE LOTUS", h: "Vacaciones de lujo que salen mal" },
            { w: "SEVERANCE", h: "Dividir la memoria entre trabajo y vida" },
            { w: "ANDOR", h: "El nacimiento de una rebelión galáctica" },
            { w: "THE SANDMAN", h: "El señor de los sueños regresa" },
            { w: "OZARK", h: "Lavar dinero en el medio de Misuri" },
            { w: "BROOKLYN NINE NINE", h: "Comedia en una comisaría de Nueva York" },
            { w: "HOW I MET YOUR MOTHER", h: "Nueve temporadas para conocer a la madre" },
            { w: "GREYS ANATOMY", h: "Drama médico eterno en Seattle" },
            { w: "THE BIG BANG THEORY", h: "Científicos brillantes y cultura geek" },
            { w: "MODERN FAMILY", h: "Tres familias grabadas por un documental" },
            { w: "THE WALKING DEAD", h: "Zombis y la degradación humana" },
            { w: "DEXTER", h: "Un asesino en serie que mata criminales" },
            { w: "SHAMELESS", h: "Una familia caótica y sin filtro" },
            { w: "VIKINGS", h: "La saga de Ragnar Lothbrok" },
            { w: "ROME", h: "El fin de la república romana" },
            { w: "THE PACIFIC", h: "La guerra en las islas del océano" },
            { w: "BAND OF BROTHERS", h: "Soldados paracaidistas en la II Guerra Mundial" },
            { w: "LOST IN SPACE", h: "La familia Robinson perdida en el cosmos" },
            { w: "DOCTOR WHO", h: "Un viajero en el tiempo en una cabina azul" },
            { w: "DOWNTON ABBEY", h: "Aristocracia y servidumbre en Inglaterra" },
            { w: "BUFFY", h: "La cazavampiros de la secundaria" },
            { w: "SUPERNATURAL", h: "Dos hermanos cazando demonios" },
            { w: "THE FLASH", h: "El hombre más rápido del mundo" },
            { w: "ARROW", h: "Un náufrago con arco y flecha" },
            { w: "DAREDEVIL", h: "Justicia ciega en Hells Kitchen" },
            { w: "THE MARVELOUS MRS MAISEL", h: "Ama de casa que se vuelve comediante" },
            { w: "GLOW", h: "Mujeres en la lucha libre de los 80" },
            { w: "MINDHUNTER", h: "Entrevistar asesinos para entender sus mentes" },
            { w: "NARCOS MEXICO", h: "El nacimiento del cartel de Guadalajara" },
            { w: "ELITE", h: "Secretos y crímenes en una escuela rica" },
            { w: "LA CASA DE PAPEL", h: "Un atraco con máscaras de Dalí" },
            { w: "LUPIN", h: "Un ladrón de guante blanco en París" },
            { w: "THE WITCHER", h: "Geralt de Rivia" },
            { w: "OUTLANDER", h: "Viaje al pasado en Escocia" },
            { w: "YELLOWSTONE", h: "Poder y tierras en el oeste americano" },
            { w: "EUPHORIA", h: "Adolescencia, drogas y estilo visual" },
            { w: "THE UMBRELLA ACADEMY", h: "Hermanos con poderes y un apocalipsis" },
            { w: "LOCKE AND KEY", h: "Llaves mágicas en una casa misteriosa" },
            { w: "SWEET TOOTH", h: "Un niño ciervo en un mundo post-apocalíptico" },
            { w: "WATCHMEN", h: "Continuación del cómic en una realidad alterna" },
            { w: "THE NEVERS", h: "Mujeres con habilidades en el Londres victoriano" },
            { w: "FOUNDATION", h: "Basada en la obra espacial de Isaac Asimov" },
            { w: "INVASION", h: "Diferentes perspectivas de una llegada alienígena" },
            { w: "TED LASSO", h: "Creer es la clave" },
            { w: "HACKS", h: "Una leyenda de la comedia y una joven guionista" },
            { w: "RESERVATION DOGS", h: "Jóvenes indígenas en Oklahoma" },
            { w: "ONLY MURDERS IN THE BUILDING", h: "Podcast de crímenes y vecinos curiosos" },
            { w: "THE AFTERPARTY", h: "Un asesinato contado desde varios géneros" },
            { w: "DOOM PATROL", h: "Los héroes más extraños del mundo" },
            { w: "PEACEMAKER", h: "Paz a cualquier precio, incluso matando" },
            { w: "SMALLVILLE", h: "La juventud de Superman antes de volar" },
            { w: "LOST", h: "Humo negro y escotillas" },
            { w: "PRISON BREAK", h: "Escapar de la cárcel con un tatuaje-mapa" },
            { w: "HEROES", h: "Salva a la porrista, salva al mundo" },
            { w: "GOSSIP GIRL", h: "Secretos de la élite de Manhattan" },
            { w: "SKINS", h: "Juventud británica sin censura" },
            { w: "MISFITS", h: "Delincuentes juveniles con superpoderes" },
            { w: "YELLOWJACKETS", h: "Supervivencia y canibalismo tras un choque" },
            { w: "THE OLD MAN", h: "Un ex agente perseguido por su pasado" },
            { w: "REACHER", h: "Un gigante que imparte justicia militar" },
            { w: "THE TERMINAL LIST", h: "Venganza de un Navy SEAL" },
            { w: "OZARK", h: "Navarro y el lago de los Ozarks" },
            { w: "THE GOOD PLACE", h: "La vida después de la muerte y la ética" },
            { w: "COMMUNITY", h: "Estudiantes en una universidad comunitaria" },
            { w: "PARKS AND RECREATION", h: "Gobierno local y waffles" }
        ]
    }



};



let players = JSON.parse(localStorage.getItem('papu-p')) || [];
let game = { list: [], imp: 0, cit: 0, word: null, votes: {} };
let idx = 0;
let voterIdx = 0;
let debateTimer = null;

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderPacks();
    renderTags();

    // Setup inputs
    document.getElementById('name-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addPlayer();
    });
});

function renderPacks() {
    const container = document.getElementById('packs-list');
    const saved = JSON.parse(localStorage.getItem('papu-packs')) || Object.keys(packs);

    container.innerHTML = Object.keys(packs).map(key => `
        <div class="menu-row">
            <div class="flex items-center gap-3">
                <span class="text-xl drop-shadow-lg">${packs[key].icon}</span>
                <span class="text-sm font-bold uppercase tracking-wide text-gray-200">${packs[key].label}</span>
            </div>
            <input type="checkbox" class="pack-checkbox pack-option" value="${key}" ${saved.includes(key) ? 'checked' : ''} onchange="savePacks()">
        </div>
    `).join('');
}

function savePacks() {
    const selected = Array.from(document.querySelectorAll('.pack-option:checked')).map(el => el.value);
    localStorage.setItem('papu-packs', JSON.stringify(selected));
    sfx(500, 'sine', 0.1);
}

function addPlayer() {
    const i = document.getElementById('name-input');
    const val = i.value.trim().toUpperCase();
    if (val && !players.includes(val)) {
        players.push(val);
        i.value = '';
        renderTags();
        sfx(600, 'sine', 0.1);
    }
}

function renderTags() {
    document.getElementById('tags-container').innerHTML = players.map((p, i) => `
        <div class="bg-white/10 border border-white/20 pl-3 pr-2 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 animate-[fadeIn_0.3s]">
            ${p}
            <button onclick="removePlayer(${i})" class="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-500/80 transition-colors text-white">×</button>
        </div>
    `).join('');
    localStorage.setItem('papu-p', JSON.stringify(players));
}

function removePlayer(i) {
    players.splice(i, 1);
    renderTags();
    sfx(300, 'square', 0.1);
}

function startGame() {
    const ic = parseInt(document.getElementById('imp-count').value);
    const hasComplice = document.getElementById('complice-select').value === '1';
    // Leer si el modo sin pistas está activo antes de repartir roles
    game.noHints = document.getElementById('no-hints-toggle').checked;

    // Verificación de jugadores mínimos
    const minRequired = ic + (hasComplice ? 2 : 1);
    if (players.length < minRequired) return alert("¡Faltan jugadores para esta configuración!");

    const selectedPacks = Array.from(document.querySelectorAll('.pack-option:checked')).map(el => el.value);
    if (selectedPacks.length === 0) return alert("Seleccioná al menos un pack.");

    let allWords = [];
    selectedPacks.forEach(key => allWords = [...allWords, ...packs[key].words]);

    game.word = allWords[Math.floor(Math.random() * allWords.length)];
    game.list = players.map(n => ({ n, r: 'cit', alive: true }));

    // 1. Asignar Impostores
    let assignedImp = 0;
    while (assignedImp < ic) {
        let r = Math.floor(Math.random() * game.list.length);
        if (game.list[r].r === 'cit') {
            game.list[r].r = 'imp';
            assignedImp++;
        }
    }

    // 2. Asignar Papu Traidor (Cómplice)
    if (hasComplice) {
        let assignedComp = false;
        while (!assignedComp) {
            let r = Math.floor(Math.random() * game.list.length);
            if (game.list[r].r === 'cit') {
                game.list[r].r = 'comp';
                assignedComp = true;
            }
        }
    }

    game.imp = ic;
    game.cit = game.list.filter(x => x.r === 'cit').length;

    // Mezclar orden de turnos
    game.list.sort(() => Math.random() - 0.5);

    idx = 0;
    switchS('screen-roles');
    updateRoleUI();
}

function switchS(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    sfx(400, 'sine', 0.1);
}

function updateRoleUI() {
    document.getElementById('role-name').innerText = game.list[idx].n;
    document.getElementById('role-result').classList.add('hidden');
}

function revealRole() {
    const p = game.list[idx];
    const roleEl = document.getElementById('res-role');
    const wordEl = document.getElementById('res-word');
    const boxEl = document.getElementById('role-box');

    roleEl.style.animation = 'none';

    if (p.r === 'imp') {
        // --- IMPOSTOR ---
        roleEl.innerText = "PANCHO IMPOSTOR";
        roleEl.className = "text-7xl font-teko uppercase mb-6 leading-none text-[#ff3b3b] text-glow";

        const compañeros = game.list.filter(x => x.r === 'imp' && x !== p).map(x => x.n).join(', ');

        // LÓGICA MODO SIN PISTAS PARA EL IMPOSTOR
        let contenidoPista = "";
        if (game.noHints) {
            // Si el modo sin pistas está activo
            contenidoPista = `<span class="text-xl text-gray-400 font-bold block uppercase italic">¡Pistas desactivadas! <br> Descubrí de qué hablan</span>`;
        } else {
            // Si el modo normal está activo
            contenidoPista = `
                <span class="text-[10px] text-red-500 block font-black tracking-widest mb-1 uppercase">Pista para mentir:</span>
                <span class="text-3xl text-white font-black block uppercase">${game.word.h}</span>
            `;
        }

        wordEl.innerHTML = `
        <div class="text-center">
            ${contenidoPista}
            
            ${compañeros ? `
            <div class="mt-6 pt-4 border-t border-white/10">
                <span class="text-[10px] text-gray-500 block font-black tracking-widest mb-1 uppercase">Compañeros Impostores:</span>
                <span class="text-sm text-red-400 font-bold">${compañeros}</span>
            </div>` : ''}
        </div>
    `;
        boxEl.className = "bg-red-500/10 p-6 rounded-2xl w-full border border-red-500/20 mb-10";
    } else if (p.r === 'comp') {
        // VISTA DEL PAPU TRAIDOR
        roleEl.innerText = "PAPU TRAIDOR";
        roleEl.className = "text-7xl font-teko uppercase mb-6 leading-none text-orange-500 text-glow";

        const imps = game.list.filter(x => x.r === 'imp').map(x => x.n).join(', ');

        wordEl.innerHTML = `
            <div class="text-center">
                <p class="text-[10px] text-orange-400 font-black uppercase mb-2 tracking-widest">Debes proteger a:</p>
                <p class="text-3xl text-white font-bold mb-4 uppercase">${imps}</p>
                <div class="pt-4 border-t border-white/10">
                    <span class="text-[10px] text-gray-400 block font-black uppercase">Palabra Real:</span>
                    <span class="text-2xl text-white font-black uppercase">${game.word.w}</span>
                </div>
            </div>
        `;
        boxEl.className = "bg-orange-500/10 p-6 rounded-2xl w-full border border-orange-500/20 mb-10";

    } else {
        // VISTA DEL TRIPULANTE
        roleEl.innerText = "PAPU";
        roleEl.className = "text-7xl font-teko uppercase mb-6 leading-none text-[#38b6ff] text-glow";
        wordEl.innerHTML = `
            <div class="text-center">
                <span class="text-[10px] text-blue-400 block font-black tracking-widest mb-1 uppercase">Tu Palabra:</span>
                <span class="text-5xl text-white font-black block uppercase">${game.word.w}</span>
            </div>
        `;
        boxEl.className = "bg-blue-500/10 p-6 rounded-2xl w-full border border-blue-500/20 mb-10";
    }

    document.getElementById('role-result').classList.remove('hidden');
    setTimeout(() => { roleEl.style.animation = 'float 3s ease-in-out infinite'; }, 10);
}

function nextPlayer() {
    idx++;
    if (idx < game.list.length) {
        updateRoleUI();
    } else {
        startDebate();
    }
}

function startDebate() {
    switchS('screen-debate');

    // 1. Lógica nueva: Elegir quién empieza (solo jugadores vivos)
    const vivos = game.list.filter(p => p.alive);
    const elegido = vivos[Math.floor(Math.random() * vivos.length)];
    const nameEl = document.getElementById('starter-name');
    if (nameEl) {
        nameEl.innerText = elegido.n;
    }

    // 2. Tu lógica original de tiempo (restaurada)
    let timeLeft = 300; // 5 minutos default
    const display = document.getElementById('debate-timer');
    const progress = document.getElementById('timer-progress');

    // Limpiamos cualquier clase de alerta previa
    display.classList.remove('text-red-500', 'animate-pulse');
    progress.style.stroke = 'var(--arg-blue)'; 

    clearInterval(debateTimer);
    debateTimer = setInterval(() => {
        timeLeft--;
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        display.innerText = `${m}:${s < 10 ? '0' + s : s}`;

        // Update circle (usando tu valor original de 628)
        const offset = 628 - (timeLeft / 300) * 628;
        progress.style.strokeDashoffset = offset;

        if (timeLeft <= 30) {
            display.classList.add('text-red-500');
            display.classList.add('animate-pulse');
            // Usamos var(--danger) si lo tenés definido, sino 'red'
            progress.style.stroke = '#ff3b3b'; 
        }

        if (timeLeft <= 0) {
            clearInterval(debateTimer);
            startSecretVote();
        }
    }, 1000);
}

function startSecretVote() {
    clearInterval(debateTimer);
    voterIdx = 0;
    game.votes = {};
    document.getElementById('vote-turn-view').classList.remove('hidden');
    document.getElementById('vote-summary-step').classList.add('hidden');
    switchS('screen-secret-vote');
    renderVoter();
}

function renderVoter() {
    const voter = game.list[voterIdx];
    if (!voter.alive) {
        skipVoter();
        return;
    }
    document.getElementById('voter-name').innerText = voter.n;
    document.getElementById('voter-options').innerHTML = game.list.map((p, i) =>
        p.alive && i !== voterIdx ?
            `<button onclick="submitVote(${i})" class="w-full p-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold transition-all uppercase text-sm flex justify-between items-center group">
            <span>${p.n}</span>
            <span class="opacity-0 group-hover:opacity-100 transition-opacity">VOTAR</span>
        </button>` : ''
    ).join('');
}

function submitVote(t) {
    const target = game.list[t];
    game.votes[target.n] = (game.votes[target.n] || 0) + 1;
    sfx(800, 'sine', 0.05);
    skipVoter();
}

function skipVoter() {
    voterIdx++;
    if (voterIdx < game.list.length) {
        renderVoter();
    } else {
        document.getElementById('vote-turn-view').classList.add('hidden');
        document.getElementById('vote-summary-step').classList.remove('hidden');
    }
}

function triggerResultTension() {
    const ov = document.getElementById('loading-overlay');
    ov.classList.remove('opacity-0', 'pointer-events-none');

    setTimeout(() => {
        ov.classList.add('opacity-0', 'pointer-events-none');
        processRes();
    }, 2500);
}

function processRes() {
    const sorted = Object.keys(game.votes).sort((a, b) => game.votes[b] - game.votes[a]);
    if (sorted.length === 0) return startSecretVote();

    const winnerName = sorted[0];
    const p = game.list.find(x => x.n === winnerName);

    if (sorted.length > 1 && game.votes[sorted[0]] === game.votes[sorted[1]]) {
        showKill("EMPATE", "Nadie fue expulsado", "#ffffff");
        setTimeout(() => closeKillOverlay(), 2500);
        return;
    }

    p.alive = false;

    let message = "";
    let color = "";

    if (p.r === 'imp') {
        game.imp--;
        message = "ERA EL IMPOSTOR";
        color = "#22c55e"; // Verde éxito
    } else if (p.r === 'comp') {
        message = "ERA EL CÓMPLICE";
        color = "#f97316"; // Naranja traidor
    } else {
        game.cit--;
        message = "NO ERA EL IMPOSTOR";
        color = "#ef4444"; // Rojo fallo
    }

    showKill(winnerName, message, color);

    // Condiciones de victoria
    // Conditions of victory
    setTimeout(() => {
        if (game.imp === 0) finish(true); // Ganan Tripulantes
        else if (game.imp >= game.cit) finish(false); // Ganan Impostores
    }, 2000);
}

function showKill(n, s, c) {
    const t = document.getElementById('kill-title');
    const st = document.getElementById('kill-subtitle');
    const ov = document.getElementById('kill-overlay');

    t.innerText = n;
    t.style.color = c;
    t.style.textShadow = `0 0 30px ${c}`;

    st.innerText = s;

    ov.style.opacity = '1';
    ov.classList.remove('pointer-events-none');
    sfx(100, 'sawtooth', 0.5);
}

function closeKillOverlay() {
    if (game.ended) return; // Stop if game over

    const ov = document.getElementById('kill-overlay');
    ov.style.opacity = '0';
    ov.classList.add('pointer-events-none');

    // If game not ended in processRes, continue
    if (game.imp > 0 && (game.imp < game.cit)) {
        startDebate();
    }
}

function finish(crewWin) {
    game.ended = true;
    document.getElementById('kill-overlay').style.opacity = '0';
    document.getElementById('kill-overlay').classList.add('pointer-events-none');

    setTimeout(() => {
        const title = document.getElementById('end-title');
        const screen = document.getElementById('screen-end');

        if (crewWin) {
            title.innerHTML = "VICTORIA<br><span class='text-4xl text-blue-300 tracking-widest'>LOS PAPUS GANAN</span>";
            title.className = "font-teko text-7xl md:text-9xl mb-6 leading-none text-[#38b6ff] text-glow";
            screen.style.background = "linear-gradient(to bottom, rgba(56, 182, 255, 0.2), transparent)";
        } else {
            title.innerHTML = "DERROTA<br><span class='text-4xl text-red-500 tracking-widest'>IMPOSTORES DOMINAN</span>";
            title.className = "font-teko text-7xl md:text-9xl mb-6 leading-none text-[#ff3b3b] danger-glow animate-pulse";
            screen.style.background = "linear-gradient(to bottom, rgba(255, 59, 59, 0.2), transparent)";
        }

        document.getElementById('end-roles-list').innerHTML = game.list.map(p => `
            <div class="p-4 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center mb-2">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${p.alive ? 'bg-white/20' : 'bg-red-500/20 text-red-500'}">
                        ${!p.alive ? '💀' : p.n.charAt(0)}
                    </span>
                    <span class="${!p.alive ? 'line-through text-gray-500' : ''} font-bold">${p.n}</span>
                </div>
                <span class="text-[10px] font-black uppercase px-2 py-1 rounded ${p.r === 'imp' ? 'bg-red-500/20 text-red-500' : (p.r === 'comp' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500')}">
                    ${p.r}
                </span>
            </div>
        `).join('');

        switchS('screen-end');
        sfx(crewWin ? 600 : 150, 'square', 0.8);
    }, 500);
}
