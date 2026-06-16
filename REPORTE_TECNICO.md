# Reporte Técnico — Monstruosos Colmillos

> **Proyecto:** Monstruosos Colmillos  
> **Autora:** Frida Metztli (Lupo)  
> **Fecha de reporte:** Junio 2026  
> **Estado:** En desarrollo activo

---

## 1. Descripción General

**Monstruosos Colmillos** es un sitio web temático dedicado al horror clásico, con foco en vampiros y hombres lobo desde una perspectiva cultural, cinematográfica y folclórica. El proyecto está orientado a la comunidad hispanohablante y busca consolidarse como un espacio editorial y de comunidad en torno al horror.

---

## 2. Tecnologías Actuales

### 2.1 HTML5

| Atributo | Detalle |
|---|---|
| **Versión** | HTML5 |
| **Rol** | Estructura semántica del sitio |

**Justificación:**  
Se utilizan etiquetas semánticas como `<section>`, `<nav>`, `<figure>` y `<a>` para construir un documento estructurado y accesible. El uso de secciones identificadas con `id` (`#hero`, `#home`, `#about`, `#movies`, `#more`) permite la navegación interna mediante anclas y facilita la integración con futuras animaciones basadas en scroll.

---

### 2.2 CSS3

| Atributo | Detalle |
|---|---|
| **Versión** | CSS3 |
| **Archivos** | `style.css`, `styleVW.css`, `styleCarousel.css` |
| **Rol** | Presentación visual, animaciones y layout |

**Características técnicas empleadas:**

- **CSS Custom Properties (`--var`):** Usadas en el carrusel 3D para parametrizar el número de tarjetas (`--n`), índice individual (`--i`), ancho (`--w`) y ángulo base (`--ba`). Permiten un sistema de carrusel completamente configurable desde el HTML.
- **3D Transforms:** `rotateY`, `translateZ`, `transform-style: preserve-3d` y `perspective` para construir el carrusel cilíndrico de películas, generando profundidad sin librerías externas.
- **`@keyframes`:** Animación `ry` para el modo auto-spin del carrusel.
- **Flexbox:** Usado en navbar, secciones de contenido (`about-me`) y la sección de tarjetas (`werewolf-sec`) para distribución responsiva.
- **`backdrop-filter: blur`:** Aplicado a la navbar sticky para lograr el efecto glassmorphism sin sacrificar legibilidad sobre el fondo oscuro.
- **`mask` con gradiente:** Aplicado al carrusel para difuminar los extremos laterales, simulando profundidad de campo.
- **`aspect-ratio`:** Proporciones fijas (7:10) en las tarjetas del carrusel, asegurando consistencia visual independientemente del viewport.
- **Media Queries:** Límite de ancho máximo (`max-width: 2049px`) para compatibilidad con pantallas ultrawide.
- **Google Fonts API:** Tipografía `Fruktur` para reforzar la estética gótica/horror del proyecto.

**Justificación:**  
La separación en tres archivos CSS responde a responsabilidades distintas: estilos globales, variantes de tarjetas interactivas y estilos del carrusel. Esto facilita el mantenimiento y la escalabilidad futura.

---

### 2.3 JavaScript (Vanilla ES6+)

| Atributo | Detalle |
|---|---|
| **Versión** | ECMAScript 2015+ |
| **Archivos** | `script.js`, `moon-favicon.js`, script inline en `movieCarousel.html` |
| **Rol** | Animaciones, interactividad y lógica de UI |

**Módulos funcionales:**

#### `moon-favicon.js` — Favicon dinámico lunar
Calcula la fase lunar actual en tiempo real usando:
- Una fecha de luna nueva de referencia conocida (6 enero 2000, 18:14 UTC)
- El período sinódico lunar (29.53059 días)
- La **Canvas API** del navegador para renderizar el emoji de la fase correspondiente (`🌑🌒🌓🌔🌕🌖🌗🌘`) en un canvas de 64×64px
- Conversión a `dataURL` para inyectarlo como `<link rel="icon">`

Esto genera un favicon único que cambia cada ~3.7 días, coherente con la temática del sitio.

#### `script.js` — Animaciones de paralaje en hero
Controla las animaciones de entrada/salida de capas del hero mediante **GSAP + ScrollTrigger** (ver sección 2.4).

#### Script inline del carrusel — Control de rotación
Gestiona dos modos de interacción del carrusel 3D:
- **Modo auto:** animación CSS `auto-spin` activa.
- **Modo scroll:** captura el evento `wheel` y transforma el `deltaY` en grados de rotación `rotateY`. Utiliza `DOMMatrix` y `getComputedStyle` para leer el ángulo de transformación en tiempo real al cambiar de modo, evitando saltos visuales.

---

### 2.4 GSAP (GreenSock Animation Platform)

| Atributo | Detalle |
|---|---|
| **Versión** | GSAP 3 + ScrollTrigger plugin |
| **Integración** | CDN (referenciada en `index.html`) |
| **Rol** | Paralaje de capas en la sección hero |

**Implementación actual:**  
Cuatro animaciones scroll-driven controlan el movimiento independiente de cada capa del hero (`#img`, `#wolf`, `#castle`, `#bats`), creando un efecto parallax multicapa que profundiza la experiencia de entrada al sitio.

**Justificación:**  
GSAP es la librería de animación más optimizada del ecosistema web. Su plugin `ScrollTrigger` abstrae completamente la lógica de `IntersectionObserver` y los cálculos de progreso de scroll, con soporte nativo para `scrub` (suavizado). Alternativas como CSS `animation-timeline` aún tienen soporte limitado en navegadores, haciendo de GSAP la opción más confiable para este uso.

---

### 2.5 Canvas API (Web API nativa)

Utilizada exclusivamente en `moon-favicon.js` para renderizar el emoji lunar como imagen rasterizada. No requiere ninguna dependencia externa.

---

## 3. Tecnologías Planificadas

### 3.1 Git + GitHub

**Propósito:** Control de versiones distribuido y repositorio remoto.

**Justificación:**  
Esencial para el historial de cambios, trabajo colaborativo y despliegue continuo. Se recomienda establecer una estrategia de ramas desde el inicio:

```
main          → producción estable
develop       → integración de features
feature/*     → desarrollo de funcionalidades individuales
hotfix/*      → correcciones urgentes en producción
```

**Archivos a incluir en `.gitignore`:**
```
node_modules/
.env
.env.local
firebase-config.js   # si contiene credenciales
dist/
.DS_Store
```

---

### 3.2 Firebase + Firestore

**Propósito:** Backend-as-a-Service para autenticación, base de datos en tiempo real y hosting.

| Servicio Firebase | Uso previsto |
|---|---|
| **Firebase Hosting** | Despliegue del sitio estático con CDN global |
| **Cloud Firestore** | Base de datos NoSQL para contenido dinámico (reseñas, artículos, comentarios) |
| **Firebase Authentication** | Sistema de login para futuras funciones de comunidad |
| **Firebase Storage** | Almacenamiento de imágenes y recursos multimedia |

**Justificación:**  
Firebase elimina la necesidad de mantener un servidor propio, reduciendo la complejidad operacional. Firestore es ideal para datos con estructura variable (artículos, entradas de blog, perfiles) y escala automáticamente. Su SDK JavaScript permite integración directa sin backend intermedio, lo que acelera el desarrollo.

**Consideración de seguridad:**  
Las credenciales de Firebase (`apiKey`, `projectId`, etc.) **nunca deben commitearse** al repositorio. Deben manejarse mediante variables de entorno o un módulo de configuración excluido del `.gitignore`.

---

### 3.3 APIs Externas

APIs de terceros previstas para enriquecer el contenido:

| API | Uso previsto | Autenticación |
|---|---|---|
| **The Movie Database (TMDB)** | Datos de películas de horror: sinopsis, posters, calificaciones, trailers | API Key |
| **Open Library / Google Books** | Información de libros de horror y folklore | Pública / API Key |

**Consideración de seguridad:**  
Las API Keys **no deben exponerse en el frontend**. Se recomienda usar un proxy intermediario (Firebase Cloud Functions o un endpoint serverless) para realizar las llamadas a APIs que requieran clave privada.

---

### 3.4 Secciones y páginas futuras

| Sección / Página | Descripción |
|---|---|
| Vampiros | Enciclopedia de mitología vampírica por cultura |
| Hombres Lobo | Mitología licantrópica, folklore y cine |
| Películas (expansión) | Integración con TMDB para fichas dinámicas |
| Blog / Artículos | Entradas editoriales gestionadas desde Firestore |
| Comunidad | Foro o sistema de comentarios con autenticación |
| Newsletter / Contacto | Formulario con integración a Firestore o EmailJS |

---

## 4. Estructura de Carpetas

### 4.1 Estructura Actual

```
proyecto/
├── index.html
├── moon-favicon.js
├── script.js
├── style.css
├── img/
│   ├── bg.jpg
│   ├── bats.png
│   ├── castle.png
│   ├── wolf.png
│   ├── img.png
│   ├── aboutMe.png
│   ├── movie-horror2.jpg
│   └── 1.jpg ... 12.png
└── pages/
    ├── movieCarousel.html
    └── styles/
        ├── styleCarousel.css
        └── styleVW.css
```

**Problemas identificados:**
- Los archivos JS y CSS del root están mezclados con `index.html`, sin separación por tipo de recurso.
- Los estilos de páginas internas están en `pages/styles/` pero los estilos globales están en el root, generando inconsistencia en la jerarquía.
- No existe separación entre componentes reutilizables y estilos específicos de página.
- Las imágenes no están categorizadas (hero, portraits, movies, etc.).
- No hay estructura para el futuro código de Firebase ni para módulos JS.

---

### 4.2 Estructura Recomendada (Buenas Prácticas)

```
monstruosos-colmillos/
│
├── index.html                        # Punto de entrada principal
├── .gitignore
├── README.md
│
├── assets/                           # Recursos estáticos
│   └── img/
│       ├── hero/                     # Capas del parallax hero
│       │   ├── bg.jpg
│       │   ├── bats.png
│       │   ├── castle.png
│       │   ├── wolf.png
│       │   └── img.png
│       ├── about/
│       │   └── aboutMe.png
│       └── movies/
│           ├── movie-horror2.jpg
│           └── covers/               # Portadas del carrusel
│               ├── 1.jpg
│               └── ...
│
├── css/                              # Todos los estilos
│   ├── main.css                      # Estilos globales (reset, tipografía, variables)
│   └── components/                   # Estilos por componente
│       ├── hero.css
│       ├── navbar.css
│       ├── sections.css
│       ├── cards.css                 # Tarjetas hover (styleVW)
│       └── carousel.css              # Carrusel 3D
│
├── js/                               # Todos los scripts
│   ├── main.js                       # Punto de entrada JS (inicialización)
│   ├── animations.js                 # Lógica GSAP / parallax
│   ├── moon-favicon.js               # Favicon lunar
│   ├── carousel.js                   # Lógica del carrusel extraída del inline
│   └── services/                     # Módulos de servicios externos
│       ├── firebase.js               # Configuración e inicialización Firebase
│       ├── firestore.js              # Operaciones CRUD con Firestore
│       └── tmdb.js                   # Llamadas a la API de películas
│
└── pages/                            # Páginas secundarias
    ├── movies.html
    ├── vampires.html
    ├── werewolves.html
    └── blog/
        ├── index.html                # Listado de artículos
        └── article.html              # Plantilla de artículo individual
```

**Beneficios de esta estructura:**
- **Separación de responsabilidades:** cada tipo de recurso tiene su directorio propio.
- **Escalabilidad:** agregar nuevas páginas o componentes no requiere reorganizar lo existente.
- **Mantenibilidad:** los estilos por componente permiten modificar una parte del sitio sin riesgo de romper otra.
- **Preparada para Firebase:** el directorio `js/services/` centraliza toda la lógica de backend, aislando las credenciales y facilitando futuras migraciones.
- **Compatible con Git:** estructura clara que facilita los code reviews y el trabajo en ramas.

---

## 5. Resumen de Stack Tecnológico

| Capa | Tecnología | Estado |
|---|---|---|
| Marcado | HTML5 | ✅ Implementado |
| Estilos | CSS3 (Custom Properties, 3D Transforms, Flexbox) | ✅ Implementado |
| Animaciones | GSAP 3 + ScrollTrigger | ✅ Implementado |
| Interactividad | JavaScript ES6+ (Vanilla) | ✅ Implementado |
| Favicon dinámico | Canvas API + Cálculo lunar | ✅ Implementado |
| Tipografía | Google Fonts (Fruktur) | ✅ Implementado |
| Control de versiones | Git + GitHub | 🔜 Planificado |
| Base de datos | Firebase Firestore | 🔜 Planificado |
| Autenticación | Firebase Authentication | 🔜 Planificado |
| Hosting | Firebase Hosting | 🔜 Planificado |
| APIs externas | TMDB / Open Library | 🔜 Planificado |

---

## 6. Consideraciones de Seguridad

- Las credenciales de Firebase y API Keys de terceros **no deben incluirse en el código fuente del repositorio**.
- Se recomienda usar variables de entorno o un archivo `.env` excluido del control de versiones.
- Para APIs con clave privada, usar **Firebase Cloud Functions** como proxy para evitar exponer la clave en el cliente.
- Configurar las **reglas de seguridad de Firestore** desde el primer despliegue, siguiendo el principio de mínimo privilegio.
- Validar y sanitizar todo input del usuario antes de escribir en Firestore para prevenir inyección de datos.

---

*Reporte generado en Junio 2026 — Proyecto en desarrollo activo.*
