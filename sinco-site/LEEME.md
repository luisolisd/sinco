# SINCO — Sitio web estático premium

Sitio 100% estático (HTML + CSS + JS puro). **Sin npm, sin build.** Listo para subir.

## Ver en local
- Doble clic en `index.html`, o
- Está corriendo en `http://localhost:8765/` mientras dure esta sesión.

## Publicar
- **Netlify / Cloudflare Pages:** arrastra la carpeta `sinco-site` completa. El archivo `_headers` ya configura el caché.
- **Vercel:** crea el proyecto apuntando a esta carpeta como raíz (sin framework / "Other"). Sirve los archivos tal cual.
- **Hostinger / Apache:** sube el contenido por File Manager o FTP. El `.htaccess` ya gestiona el caché.

## Editar contenido
- **Textos, servicios, proyectos, contacto:** todo está en `index.html` (hardcodeado, se ve aunque falle el JS).
- **Formulario:** envía a Formspree (`https://formspree.io/f/mgobkjkj`). Cambia ese ID en `index.html` si usas otra cuenta.
- **Imágenes:** en `assets/img/` (WebP). Los originales quedan en `assets/photos/source/`.
- **Al cambiar CSS o JS:** sube el número `?v=20260614` en `index.html` (p. ej. a la fecha del día) para evitar caché viejo.

## Estructura
```
sinco-site/
├── index.html          ← contenido + estructura
├── styles.css          ← diseño (paleta cream/teal/navy, rejilla blueprint)
├── main.js             ← interacciones (IIFE, sin módulos)
├── .htaccess           ← caché para Apache/Hostinger
├── _headers            ← caché para Netlify/Cloudflare
├── lib/                ← gsap + ScrollTrigger (locales)
└── assets/
    ├── img/            ← imágenes WebP optimizadas
    └── photos/source/  ← originales (puedes borrarlos para un deploy más ligero)
```

`tools/` y `assets/photos/source/` no son necesarios en producción.
