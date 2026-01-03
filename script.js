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
    game = { list: [], imp: 0, cit: 0, word: null, votes: {}, ended: false };
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
            { w: "MATE", h: "Se comparte" },
            { w: "MESSI", h: "Reconocido en todo el mundo" },
            { w: "FERNET", h: "Sabor intenso" },
            { w: "ASADO", h: "Excusa para juntarse" },
            { w: "BOCA", h: "Pasión colectiva" },
            { w: "RIVER", h: "De puerto madero" },
            { w: "EMPANADA", h: "Cada uno la hace distinto" },
            { w: "OBELISCO", h: "Lugar simbólico" },
            { w: "BANDERA", h: "Identidad nacional" },
            { w: "CHORIPÁN", h: "Clásico callejero" },
            { w: "DULCE DE LECHE", h: "Difícil resistirse" },
            { w: "MILANESA", h: "Nunca falla" },
            { w: "CANCHA", h: "Se vive con emoción" },
            { w: "BARRIO", h: "Sentido de pertenencia" },
            { w: "COLECTIVO", h: "Parte de la rutina" },
            { w: "SUBTE", h: "Viaje subterráneo" },
            { w: "PLAZA", h: "Punto de encuentro" },
            { w: "CAFÉ", h: "Charla larga" },
            { w: "FACTURAS", h: "Acompañan desayunos" },
            { w: "DOMINGO", h: "Ritmo distinto" },
            { w: "COSTANERA", h: "Cerca del agua" },
            { w: "TRIBUNA", h: "Se hace escuchar" },
            { w: "PEÑA", h: "Ambiente festivo" },
            { w: "SIERRA", h: "Escapada natural" },
            { w: "FÚTBOL", h: "Tema infinito" },
            { w: "PARQUE", h: "Respiro urbano" },
            { w: "HELADERÍA", h: "Visita frecuente" },
            { w: "PANADERÍA", h: "Olor familiar" },
            { w: "ESQUINA", h: "Cruce cotidiano" },
            { w: "VEREDA", h: "Siempre transitada" }
        ]
    },

    memes: {
        icon: "🎭",
        label: "Memes",
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

    internet: {
        icon: "🌐",
        label: "Internet",
        words: [
            { w: "WIFI", h: "Invisible pero necesario" },
            { w: "GOOGLE", h: "Primera opción" },
            { w: "YOUTUBE", h: "Horas sin darte cuenta" },
            { w: "TIKTOK", h: "Contenido rápido" },
            { w: "INSTAGRAM", h: "Mostrar lo mejor" },
            { w: "TWITTER", h: "Opiniones intensas" },
            { w: "DISCORD", h: "Comunicación constante" },
            { w: "STREAM", h: "En tiempo real" },
            { w: "VIRAL", h: "Se expande rápido" },
            { w: "HASHTAG", h: "Agrupa contenido" },
            { w: "CLICKBAIT", h: "Promete más de lo que da" },
            { w: "MEME", h: "Humor compartido" },
            { w: "ALGORITMO", h: "Decide por vos" },
            { w: "SERVIDOR", h: "Siempre encendido" },
            { w: "NUBE", h: "No está en tu compu" },
            { w: "FORO", h: "Opiniones acumuladas" },
            { w: "SPAM", h: "No lo pediste" },
            { w: "CACHE", h: "Memoria temporal" },
            { w: "LINK", h: "Puerta a otra cosa" },
            { w: "COOKIE", h: "Te recuerda" },
            { w: "PERFIL", h: "Identidad digital" },
            { w: "LOGIN", h: "Paso obligatorio" },
            { w: "FEED", h: "Nunca termina" },
            { w: "STORY", h: "Dura poco" },
            { w: "LIKE", h: "Aprobación rápida" },
            { w: "BAN", h: "Castigo virtual" },
            { w: "BOT", h: "No es humano" },
            { w: "EMOJI", h: "Expresión rápida" },
            { w: "UPLOAD", h: "Subir algo" }
        ]
    },

    juegos: {
        icon: "🎮",
        label: "Juegos",
        words: [
            { w: "MINECRAFT", h: "Libertad total" },
            { w: "ROBLOX", h: "Creado por usuarios" },
            { w: "FORTNITE", h: "Cambios constantes" },
            { w: "GTA", h: "Caos controlado" },
            { w: "AMONG US", h: "Desconfianza constante" },
            { w: "FIFA", h: "Siempre el mismo objetivo" },
            { w: "CALL OF DUTY", h: "Acción directa" },
            { w: "COUNTER STRIKE", h: "Precisión y reflejos" },
            { w: "LEAGUE OF LEGENDS", h: "Trabajo en equipo" },
            { w: "VALORANT", h: "Habilidades especiales" },
            { w: "CLASH ROYALE", h: "Estrategia rápida" },
            { w: "BRAWL STARS", h: "Partidas cortas" },
            { w: "POKÉMON", h: "Coleccionar y mejorar" },
            { w: "ZELDA", h: "Aventura clásica" },
            { w: "MARIO", h: "Icono histórico" },
            { w: "DOTA", h: "Curva difícil" },
            { w: "HALO", h: "Ciencia ficción" },
            { w: "THE SIMS", h: "Vida alternativa" },
            { w: "ARK", h: "Supervivencia" },
            { w: "TETRIS", h: "Nunca envejece" },
            { w: "FALLOUT", h: "Mundo postapocalíptico" },
            { w: "SKYRIM", h: "Exploración libre" },
            { w: "MORTAL KOMBAT", h: "Combate brutal" },
            { w: "STREET FIGHTER", h: "Duelo clásico" },
            { w: "FREE FIRE", h: "Popular en celulares" },
            { w: "GEOMETRY DASH", h: "Ritmo y precisión" },
            { w: "OSU", h: "Reflejos musicales" },
            { w: "PORTAL", h: "Pensar distinto" },
            { w: "LEFT 4 DEAD", h: "Cooperación constante" }
        ]
    },

    paises: {
        icon: "🌍",
        label: "Países",
        words: [
            { w: "ARGENTINA", h: "Cultura intensa" },
            { w: "BRASIL", h: "Alegría constante" },
            { w: "JAPÓN", h: "Tradición y tecnología" },
            { w: "FRANCIA", h: "Influencia cultural" },
            { w: "ITALIA", h: "Historia milenaria" },
            { w: "ESPAÑA", h: "Idioma compartido" },
            { w: "ALEMANIA", h: "Organización" },
            { w: "EEUU", h: "Impacto global" },
            { w: "MÉXICO", h: "Identidad fuerte" },
            { w: "CANADÁ", h: "Gran extensión" },
            { w: "CHINA", h: "Escala enorme" },
            { w: "RUSIA", h: "Clima extremo" },
            { w: "AUSTRALIA", h: "Fauna particular" },
            { w: "INGLATERRA", h: "Historia influyente" },
            { w: "SUECIA", h: "Estilo minimalista" },
            { w: "NORUEGA", h: "Paisajes fríos" },
            { w: "CHILE", h: "Forma alargada" },
            { w: "PERÚ", h: "Herencia ancestral" },
            { w: "COLOMBIA", h: "Diversidad cultural" },
            { w: "URUGUAY", h: "Escala pequeña" },
            { w: "BOLIVIA", h: "Altura notable" },
            { w: "PARAGUAY", h: "Corazón continental" },
            { w: "INDIA", h: "Población enorme" },
            { w: "COREA DEL SUR", h: "Tecnología avanzada" },
            { w: "PORTUGAL", h: "Tradición marítima" },
            { w: "SUIZA", h: "Neutralidad" },
            { w: "AUSTRIA", h: "Historia europea" },
            { w: "EGIPTO", h: "Antigüedad" },
            { w: "TURQUÍA", h: "Cruce cultural" },
            { w: "GRECIA", h: "Base histórica" }
        ]
    },

    comidas: {
        icon: "🍔",
        label: "Comidas",
        words: [
            { w: "PIZZA", h: "Versiones infinitas" },
            { w: "HAMBURGUESA", h: "Personalizable" },
            { w: "SUSHI", h: "Gusto particular" },
            { w: "MILANESA", h: "Clásico casero" },
            { w: "TACOS", h: "Comer con la mano" },
            { w: "HELADO", h: "Difícil elegir sabor" },
            { w: "PASTA", h: "Base simple" },
            { w: "EMPAREDADO", h: "Rápido y práctico" },
            { w: "ENSALADA", h: "Depende del acompañamiento" },
            { w: "PAPAS FRITAS", h: "Acompañan todo" },
            { w: "SOPA", h: "Ideal para el frío" },
            { w: "ARROZ", h: "Base universal" },
            { w: "POLLO", h: "Muy versátil" },
            { w: "PESCADO", h: "No a todos les gusta" },
            { w: "TORTA", h: "Momento especial" },
            { w: "GALLETITAS", h: "Tentación diaria" },
            { w: "PAN", h: "Nunca falta" },
            { w: "QUESO", h: "Muchos tipos" },
            { w: "HUEVO", h: "Infinitas formas" },
            { w: "CHOCOLATE", h: "Placer simple" },
            { w: "YOGUR", h: "Consumo rápido" },
            { w: "CEREAL", h: "Desayuno típico" },
            { w: "SANDWICH", h: "Solución rápida" },
            { w: "EMPANADO", h: "Crujiente" },
            { w: "PURÉ", h: "Textura suave" },
            { w: "GUISO", h: "Comida rendidora" },
            { w: "TARTA", h: "Relleno variable" },
            { w: "PANQUEQUE", h: "Dulce o salado" },
            { w: "FLAN", h: "Postre clásico" },
            { w: "BUDÍN", h: "Para acompañar mate" }
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
            { w: "MICHAEL JACKSON", h: "Impacto global" },
            { w: "MADONNA", h: "Reinvención constante" },
            { w: "SHAKIRA", h: "Movimiento característico" },
            { w: "BAD BUNNY", h: "Actualidad absoluta" },
            { w: "TAYLOR SWIFT", h: "Relatos personales" },
            { w: "JUSTIN BIEBER", h: "Carrera temprana" },
            { w: "EMINEM", h: "Letras intensas" },
            { w: "RIHANNA", h: "Versatilidad" },
            { w: "BRUNO MARS", h: "Estilo retro" },
            { w: "DUA LIPA", h: "Sonido moderno" },
            { w: "ADELE", h: "Voz poderosa" },
            { w: "QUEEN", h: "Presencia escénica" },
            { w: "THE WEEKND", h: "Ambiente nocturno" },
            { w: "ARJONA", h: "Narrativa extensa" },
            { w: "CERATI", h: "Influencia regional" },
            { w: "SPINETTA", h: "Poética compleja" },
            { w: "KAROL G", h: "Popularidad actual" },
            { w: "ROSALÍA", h: "Fusión cultural" },
            { w: "DADDY YANKEE", h: "Pionero" },
            { w: "MILEY CYRUS", h: "Evolución artística" },
            { w: "ED SHEERAN", h: "Formato simple" },
            { w: "LANA DEL REY", h: "Melancolía" },
            { w: "KANYE WEST", h: "Controversia" },
            { w: "BILLIE EILISH", h: "Estilo íntimo" },
            { w: "LUIS MIGUEL", h: "Clásico vigente" },
            { w: "ABBA", h: "Éxito duradero" },
            { w: "U2", h: "Mensaje social" },
            { w: "COLDPLAY", h: "Sonido emotivo" },
            { w: "OASIS", h: "Actitud rebelde" },
            { w: "METALLICA", h: "Sonido pesado" }
        ]
    }
    ,
    canciones: {
        icon: "🎵",
        label: "Canciones",
        words: [
            { w: "DESPACITO", h: "Éxito global" },
            { w: "BILLIE JEAN", h: "Ritmo inconfundible" },
            { w: "BOHEMIAN RHAPSODY", h: "Estructura inusual" },
            { w: "SHAPE OF YOU", h: "Presencia constante" },
            { w: "THRILLER", h: "Clásico eterno" },
            { w: "SMELLS LIKE TEEN SPIRIT", h: "Cambio generacional" },
            { w: "HAPPY", h: "Buen ánimo" },
            { w: "SEE YOU AGAIN", h: "Despedida emotiva" },
            { w: "BLINDING LIGHTS", h: "Sonido retro" },
            { w: "IMAGINE", h: "Mensaje pacífico" },
            { w: "HEY JUDE", h: "Coro largo" },
            { w: "STAYIN ALIVE", h: "Energía constante" },
            { w: "WAKA WAKA", h: "Evento mundial" },
            { w: "GANGNAM STYLE", h: "Fenómeno viral" },
            { w: "ROAR", h: "Empoderamiento" },
            { w: "BELIEVER", h: "Fuerza interna" },
            { w: "SWEET CHILD O MINE", h: "Intro reconocible" },
            { w: "HOTEL CALIFORNIA", h: "Ambigüedad" },
            { w: "VIVA LA VIDA", h: "Cambio de roles" },
            { w: "WE WILL ROCK YOU", h: "Participación colectiva" },
            { w: "HIPS DONT LIE", h: "Movimiento" },
            { w: "BAD GUY", h: "Actitud distinta" },
            { w: "DON'T STOP BELIEVIN'", h: "Esperanza" },
            { w: "LOSE YOURSELF", h: "Momento único" },
            { w: "RADIOACTIVE", h: "Impacto sonoro" },
            { w: "TUSA", h: "Despecho moderno" },
            { w: "CALIFORNICATION", h: "Crítica cultural" },
            { w: "ZOMBIE", h: "Mensaje fuerte" },
            { w: "FIX YOU", h: "Consuelo" },
            { w: "STEREO HEARTS", h: "Sonido amigable" }
        ]
    }
    ,
    ciudades: {
        icon: "🏙️",
        label: "Ciudades",
        words: [
            { w: "NUEVA YORK", h: "Nunca duerme" },
            { w: "PARÍS", h: "Romanticismo" },
            { w: "LONDRES", h: "Historia viva" },
            { w: "TOKIO", h: "Contrastes" },
            { w: "ROMA", h: "Antigüedad" },
            { w: "MADRID", h: "Centro cultural" },
            { w: "BARCELONA", h: "Arte urbano" },
            { w: "LOS ÁNGELES", h: "Sueños grandes" },
            { w: "DUBÁI", h: "Lujo extremo" },
            { w: "BERLÍN", h: "Pasado fuerte" },
            { w: "MOSCÚ", h: "Imponente" },
            { w: "SÍDNEY", h: "Costa icónica" },
            { w: "RIO DE JANEIRO", h: "Celebración" },
            { w: "BUENOS AIRES", h: "Identidad marcada" },
            { w: "MIAMI", h: "Clima cálido" },
            { w: "LAS VEGAS", h: "Excesos" },
            { w: "AMSTERDAM", h: "Estilo distinto" },
            { w: "VENECIA", h: "Canales" },
            { w: "PRAGA", h: "Arquitectura" },
            { w: "ESTAMBUL", h: "Cruce cultural" },
            { w: "ATENAS", h: "Base histórica" },
            { w: "SEÚL", h: "Modernidad" },
            { w: "MÉXICO DF", h: "Escala enorme" },
            { w: "SANTIAGO", h: "Cordillera cercana" },
            { w: "MONTEVIDEO", h: "Ritmo tranquilo" },
            { w: "LIMA", h: "Tradición" },
            { w: "BOGOTÁ", h: "Altura" },
            { w: "LISBOA", h: "Colinas" },
            { w: "VIENA", h: "Elegancia" },
            { w: "BRUSELAS", h: "Centro político" }
        ]
    }
    ,
    apps: {
        icon: "📱",
        label: "Apps",
        words: [
            { w: "WHATSAPP", h: "Mensajes constantes" },
            { w: "INSTAGRAM", h: "Imagen cuidada" },
            { w: "TIKTOK", h: "Consumo rápido" },
            { w: "SPOTIFY", h: "Escuchar sin parar" },
            { w: "YOUTUBE", h: "Contenido infinito" },
            { w: "NETFLIX", h: "Maratones" },
            { w: "TWITTER", h: "Opiniones breves" },
            { w: "DISCORD", h: "Comunicación grupal" },
            { w: "FACEBOOK", h: "Todo en uno" },
            { w: "GOOGLE MAPS", h: "Orientación" },
            { w: "UBER", h: "Viajes rápidos" },
            { w: "TINDER", h: "Primer contacto" },
            { w: "SNAPCHAT", h: "Momentáneo" },
            { w: "TELEGRAM", h: "Mensajes seguros" },
            { w: "PAYPAL", h: "Transferencias" },
            { w: "AMAZON", h: "Compra fácil" },
            { w: "MERCADO LIBRE", h: "Variedad" },
            { w: "GOOGLE DRIVE", h: "Archivos compartidos" },
            { w: "GMAIL", h: "Bandeja llena" },
            { w: "ZOOM", h: "Reuniones virtuales" },
            { w: "MEET", h: "Videollamadas" },
            { w: "CANVA", h: "Diseño rápido" },
            { w: "CAPCUT", h: "Edición simple" },
            { w: "DUOLINGO", h: "Aprendizaje diario" },
            { w: "WAZE", h: "Rutas alternativas" },
            { w: "SHOPEE", h: "Precios bajos" },
            { w: "ALIEXPRESS", h: "Entrega lenta" },
            { w: "DROPBOX", h: "Respaldo" },
            { w: "OUTLOOK", h: "Correo formal" },
            { w: "NOTION", h: "Organización total" }
        ]
    }
    ,
    marcas: {
        icon: "🏷️",
        label: "Marcas",
        words: [
            { w: "APPLE", h: "Diseño limpio" },
            { w: "SAMSUNG", h: "Tecnología variada" },
            { w: "NIKE", h: "Movimiento" },
            { w: "ADIDAS", h: "Estilo deportivo" },
            { w: "COCA COLA", h: "Presencia histórica" },
            { w: "PEPSI", h: "Competencia directa" },
            { w: "MCDONALDS", h: "Rápido" },
            { w: "BURGER KING", h: "Personalización" },
            { w: "NETFLIX", h: "Entretenimiento" },
            { w: "AMAZON", h: "Todo en uno" },
            { w: "GOOGLE", h: "Búsqueda constante" },
            { w: "MICROSOFT", h: "Herramientas" },
            { w: "SONY", h: "Entretenimiento" },
            { w: "LG", h: "Electrodomésticos" },
            { w: "INTEL", h: "Procesamiento" },
            { w: "AMD", h: "Competencia técnica" },
            { w: "TESLA", h: "Futuro" },
            { w: "BMW", h: "Lujo" },
            { w: "MERCEDES", h: "Elegancia" },
            { w: "AUDI", h: "Diseño moderno" },
            { w: "TOYOTA", h: "Fiabilidad" },
            { w: "HONDA", h: "Durabilidad" },
            { w: "PUMA", h: "Deporte urbano" },
            { w: "REEBOK", h: "Clásico" },
            { w: "XIAOMI", h: "Relación precio" },
            { w: "HUAWEI", h: "Innovación" },
            { w: "SHELL", h: "Energía" },
            { w: "YPF", h: "Presencia local" },
            { w: "VISA", h: "Pagos" },
            { w: "MASTERCARD", h: "Transacciones" }
        ]
    }
    ,
    objetos: {
        icon: "🧰",
        label: "Objetos",
        words: [
            { w: "CELULAR", h: "Uso constante" },
            { w: "LLAVES", h: "Fácil perder" },
            { w: "MOCHILA", h: "Transporte personal" },
            { w: "CARTERA", h: "Esencial" },
            { w: "BOTELLA", h: "Hidratación" },
            { w: "VASO", h: "Uso diario" },
            { w: "PLATO", h: "Mesa básica" },
            { w: "CUBIERTOS", h: "Comer mejor" },
            { w: "SILLA", h: "Descanso" },
            { w: "MESA", h: "Centro del hogar" },
            { w: "CONTROL REMOTO", h: "Comodidad" },
            { w: "TELEVISOR", h: "Entretenimiento" },
            { w: "LÁMPARA", h: "Iluminación" },
            { w: "RELOJ", h: "Medir tiempo" },
            { w: "CUADERNO", h: "Anotar ideas" },
            { w: "LÁPIZ", h: "Escribir" },
            { w: "BOLÍGRAFO", h: "Siempre a mano" },
            { w: "TIJERAS", h: "Cortar" },
            { w: "CINTA", h: "Unir cosas" },
            { w: "CARGADOR", h: "Energía extra" },
            { w: "AURICULARES", h: "Aislamiento" },
            { w: "ZAPATILLAS", h: "Movimiento" },
            { w: "CAMPERA", h: "Abrigo" },
            { w: "GORRA", h: "Protección" },
            { w: "PARAGUAS", h: "Clima impredecible" },
            { w: "PEINE", h: "Orden" },
            { w: "CEPILLO DE DIENTES", h: "Rutina" },
            { w: "TOALLA", h: "Secar" },
            { w: "ESPEJO", h: "Reflejo" },
            { w: "BASURERO", h: "Desechos" },
            { w: "ESCOBA", h: "Limpieza" },
            { w: "TRAPO", h: "Secar" },
            { w: "DETERGENTE", h: "Higiene" },
            { w: "ESPONJA", h: "Fregar" },
            { w: "PERCHA", h: "Ordenar ropa" },
            { w: "CAJÓN", h: "Guardar" },
            { w: "ALMOHADA", h: "Descanso" },
            { w: "MANTA", h: "Abrigo suave" },
            { w: "SÁBANA", h: "Cama" },
            { w: "VENTILADOR", h: "Aire" },
            { w: "ESTUFA", h: "Calor" },
            { w: "HELADERA", h: "Conservación" },
            { w: "MICROONDAS", h: "Rapidez" },
            { w: "HORNO", h: "Cocción" },
            { w: "LICUADORA", h: "Mezclar" },
            { w: "CAFETERA", h: "Rutina matinal" },
            { w: "TERMO", h: "Temperatura" },
            { w: "BOLSA", h: "Transporte liviano" },
            { w: "CUCHILLO", h: "Cortar preciso" },
            { w: "TENEDOR", h: "Pinchar" },
            { w: "CUCHARA", h: "Servir" },
            { w: "REGLA", h: "Medir" },
            { w: "CALCULADORA", h: "Números" },
            { w: "IMPRESORA", h: "Papel" },
            { w: "USB", h: "Datos" },
            { w: "MOUSE", h: "Movimiento fino" },
            { w: "TECLADO", h: "Escritura digital" },
            { w: "MONITOR", h: "Pantalla grande" },
            { w: "SOPORTE", h: "Sostener" },
            { w: "EXTENSIÓN", h: "Alcance" },
            { w: "ENCHUFE", h: "Conexión" },
            { w: "FOCO", h: "Luz directa" },
            { w: "CANDADO", h: "Seguridad" }
        ]
    }
    ,
    series: {
        icon: "📺",
        label: "Series",
        words: [
            { w: "BREAKING BAD", h: "Transformación" },
            { w: "GAME OF THRONES", h: "Poder inestable" },
            { w: "STRANGER THINGS", h: "Misterio" },
            { w: "THE WALKING DEAD", h: "Supervivencia" },
            { w: "LA CASA DE PAPEL", h: "Plan complejo" },
            { w: "FRIENDS", h: "Grupo cercano" },
            { w: "THE OFFICE", h: "Rutina laboral" },
            { w: "LOST", h: "Aislamiento" },
            { w: "DARK", h: "Tiempo confuso" },
            { w: "PEAKY BLINDERS", h: "Ambición" },
            { w: "VIKINGS", h: "Conquista" },
            { w: "NARCOS", h: "Ascenso criminal" },
            { w: "THE BOYS", h: "Héroes imperfectos" },
            { w: "BETTER CALL SAUL", h: "Decisiones grises" },
            { w: "BLACK MIRROR", h: "Futuro incómodo" },
            { w: "THE SIMPSONS", h: "Crítica social" },
            { w: "SOUTH PARK", h: "Humor ácido" },
            { w: "RICK AND MORTY", h: "Caos científico" },
            { w: "HOW I MET YOUR MOTHER", h: "Historia larga" },
            { w: "THE BIG BANG THEORY", h: "Amistad nerd" },
            { w: "THE MANDALORIAN", h: "Viaje solitario" },
            { w: "LUCIFER", h: "Moral ambigua" },
            { w: "YOU", h: "Obsesión" },
            { w: "SEX EDUCATION", h: "Aprender creciendo" },
            { w: "EUPHORIA", h: "Juventud intensa" },
            { w: "HOUSE OF THE DRAGON", h: "Conflicto familiar" },
            { w: "THE CROWN", h: "Realeza" },
            { w: "CHERNOBYL", h: "Tragedia real" },
            { w: "THE LAST OF US", h: "Vínculo fuerte" },
            { w: "MR ROBOT", h: "Identidad digital" }
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
        // --- IMPOSTOR: Solo ve la pista y otros impostores ---
        roleEl.innerText = "PANCHO IMPOSTOR";
        roleEl.className = "text-7xl font-teko uppercase mb-6 leading-none text-[#ff3b3b] text-glow";

        const compañeros = game.list.filter(x => x.r === 'imp' && x !== p).map(x => x.n).join(', ');

        wordEl.innerHTML = `
        <div class="text-center">
            <span class="text-[10px] text-red-500 block font-black tracking-widest mb-1 uppercase">Pista para mentir:</span>
            <span class="text-3xl text-white font-black block uppercase">${game.word.h}</span>
            
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
    let timeLeft = 300; // 5 minutos default
    const display = document.getElementById('debate-timer');
    const progress = document.getElementById('timer-progress');

    clearInterval(debateTimer);
    debateTimer = setInterval(() => {
        timeLeft--;
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        display.innerText = `${m}:${s < 10 ? '0' + s : s}`;

        // Update circle (628 is circumference)
        const offset = 628 - (timeLeft / 300) * 628;
        progress.style.strokeDashoffset = offset;

        if (timeLeft <= 30) {
            display.classList.add('text-red-500');
            display.classList.add('animate-pulse');
            progress.style.stroke = 'var(--danger)';
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
