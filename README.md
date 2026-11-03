# Falcon Beats — página web

Página oficial de Falcon Beats con navegación en este orden: Inicio, Mi Música, Lanzamientos, Compra Beats, Estudio, Sobre mí y Contacto. La portada presenta el mensaje «La música se crea. Las carreras se construyen. Ejecuta tu visión con metas claras», con un reproductor compacto de Spotify y accesos para presentar proyectos y escuchar producciones. La portada alterna el arte del halcón dorado y las ondas con un retrato de Falcon; la biografía usa ese retrato como imagen principal con bordes difuminados. Las miniaturas de YouTube usan versiones HD cuando están disponibles y los retratos de artistas se limitan a su resolución original. El diseño se adapta a pantallas móviles. Lanzamientos presenta «Látigo» primero, seguido de una selección de videos de YouTube y los créditos de artistas. También incluye un recorrido fotográfico del estudio y un catálogo de beats con licencias. El visualizador de audio reacciona al audio local y aparece debajo del reproductor de Spotify.

> Los navegadores pueden bloquear el audio automático. En ese caso, el visitante debe iniciar la reproducción desde Spotify. El reproductor integrado ofrece controles limitados; el enlace «Volumen y cambio de canciones en Spotify» abre el perfil en Spotify para acceder a los controles completos.

## Estructura

```
falcon-beats/
├── index.html        → estructura de la página (textos, secciones)
├── css/styles.css    → colores, fondo, tipografías y diseño
├── js/app.js         → lanzamientos, beats, licencias y reproductor
├── img/              → logos, fotos, fondo del hero con halcón y firma artística
└── audio/            → aquí van tus MP3 (vistas previas de beats)
```

## Abrirla en Visual Studio Code

1. Descomprime el zip y en VS Code ve a **Archivo → Abrir carpeta…** y elige `falcon-beats`.
2. Instala la extensión **Live Server** (VS Code te la sugiere al abrir la carpeta).
3. Clic derecho sobre `index.html` → **Open with Live Server**. Se abre en el navegador y se recarga sola cada vez que guardas.

> Usa Live Server y no abras el archivo con doble clic: el video de YouTube da «Error 153» cuando la página se abre como archivo local.

## Lo que más vas a editar (todo en `js/app.js`, al inicio)

- `WHATSAPP` → tu número con indicativo, solo dígitos. Ej.: `"573001234567"`.
- `RELEASES` → tus lanzamientos y sus enlaces (YouTube, Spotify, TikTok).
- `LICENSES` → nombres, precios en COP y lo que incluye cada licencia. `price: null` = a negociar.
- `BEATS` → tus beats en venta. Copia tu MP3 en `audio/` y agrega una línea así. `category` y `mood` son opcionales; alimentan los filtros del marketplace:

```js
{title:"Nombre del beat", bpm:95, key:"Do menor", genre:"Afrobeat", category:"Urbano", mood:"Oscuro", src:"audio/nombre-del-beat.mp3"},
```

En **Compra Beats** puedes filtrar por categoría, rango de BPM, mood y género, buscar por texto y ordenar por título o BPM.

En **Compra Beats**, la sección de licencias compara BASIC, EXTENDED, UNLIMITED y EXCLUSIVE. Los nombres, precios y condiciones de cada licencia se editan en `LICENSES`.

## Formulario de clientes y colaboraciones

La sección **Contacto** incluye un formulario conectado a Netlify Forms. Para guardar envíos, publica la carpeta en Netlify y habilita **Forms** en la configuración del sitio. Luego podrás consultar los contactos en el panel de Netlify, en **Forms → contactos**, y exportarlos como CSV. El formulario no almacena envíos cuando se abre localmente o desde Live Server.

## Colores

En `css/styles.css`, al inicio (`:root`): `--gold` es el dorado de la marca y `--night` el fondo.

## Publicarla gratis

1. Entra a **app.netlify.com/drop**.
2. Arrastra la carpeta `falcon-beats` completa.
3. Te da un enlace `https://….netlify.app`. Desde la configuración del sitio puedes cambiar el nombre o conectar tu dominio.
