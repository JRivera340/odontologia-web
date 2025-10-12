# Pull Request - HU-02

## URL para crear PR:
https://github.com/JRivera340/odontologia-web/compare/develop...feat/HU-02-catalogo?expand=1

## Detalles del PR:

**Base branch:** `develop`  
**Compare branch:** `feat/HU-02-catalogo`

**Título:**
```
[ODON-2] Service detail (SSG) & image optimizations
```

**Descripción:**
```markdown
## Descripción

Closes ODON-2 (HU-02)

Implementación de página de detalle de servicios con Static Site Generation (SSG) y optimizaciones de imágenes.

## Cambios realizados

- ✅ **pages/servicios/[slug].tsx** - Página dinámica con SSG usando getStaticPaths y getStaticProps
- ✅ **lib/prisma.ts** - Singleton de Prisma Client para evitar múltiples instancias
- ✅ **lib/buildWhatsAppUrl.ts** - Utilidad para generar URLs de WhatsApp con mensaje pre-formateado
- ✅ **components/ServiceCard.tsx** - Migrado de `<img>` a `next/image` para optimización automática
- ✅ **next.config.js** - Configuración de dominios de imágenes permitidos
- ✅ Corrección de Links en Next.js 13+ (removido `<a>` child)

## Funcionalidades

### Página de detalle de servicio
- Renderizado estático con revalidación cada 1 hora
- Imagen optimizada con next/image
- Botón "Contactar por WhatsApp" que abre chat con mensaje pre-formateado
- Información completa: título, descripción larga, duración, precio

### Optimizaciones
- Imágenes optimizadas automáticamente por Next.js
- SSG para mejor performance y SEO
- Fallback 'blocking' para nuevos servicios

## Issue / HU

Closes ODON-2 (HU-02) — Service detail (SSG) & image optimizations

## Tipo de cambio

- [x] Nueva funcionalidad (feature)
- [ ] Corrección de bug (bugfix)
- [ ] Refactorización
- [ ] Documentación
- [ ] Configuración / DevOps

## Checklist

- [x] El código sigue las convenciones del proyecto
- [x] He realizado una auto-revisión del código
- [x] He comentado el código en áreas complejas
- [x] He actualizado la documentación si es necesario
- [x] Mis cambios no generan nuevos warnings
- [x] He probado la funcionalidad en local
- [x] He ejecutado `npm run build` sin errores
- [x] npm run build OK ✅
- [x] Dev server muestra /servicios y /servicios/limpieza-dental ✅
- [x] Botón WhatsApp abre enlace correcto ✅

## Tests realizados

### URLs verificadas (Status 200 OK):
- ✅ http://localhost:3000 (Landing)
- ✅ http://localhost:3000/servicios (Catálogo)
- ✅ http://localhost:3000/servicios/limpieza-dental (Detalle)
- ✅ http://localhost:3000/servicios/blanqueamiento-dental (Detalle)

### Build output:
```
Route (pages)                                Size  First Load JS  Revalidate
├ ● /servicios                            1.08 kB         105 kB
└ ● /servicios/[slug] (448 ms)            1.32 kB         105 kB          1h
    ├ /servicios/blanqueamiento-dental
    └ /servicios/limpieza-dental
```

## Screenshots / Videos

- Catálogo con imágenes optimizadas: http://localhost:3000/servicios
- Detalle de servicio con botón WhatsApp: http://localhost:3000/servicios/limpieza-dental

## Notas adicionales

- Las imágenes ahora usan `next/image` con optimización automática
- El botón de WhatsApp genera un mensaje con formato:
  ```
  Hola, estoy interesad@ en estos servicios:
  - Limpieza dental — $80000
  Total estimado: $80000
  Tiempo total estimado: 0h 45min
  ```
- SSG genera las páginas en build time para mejor performance
- Revalidación ISR cada 1 hora para contenido actualizado
```

