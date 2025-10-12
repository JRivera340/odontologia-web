# Pull Request - HU-03: Carrito de Interés + WhatsApp

## URL para crear PR:
https://github.com/JRivera340/odontologia-web/compare/develop...feat/HU-03-cart?expand=1

## Detalles del PR:

**Base branch:** `develop`  
**Compare branch:** `feat/HU-03-cart`

**Título:**
```
[ODON-3] Carrito de interés + WhatsApp múltiple
```

**Descripción:**
```markdown
## Descripción

Closes ODON-3 (HU-03)

Implementación de carrito de compras (selección de servicios) con integración a WhatsApp para contacto con múltiples servicios seleccionados.

## Cambios realizados

### Context y Estado
- ✅ **context/CartContext.tsx** - Context de React con localStorage para persistencia
- ✅ **pages/_app.tsx** - Envuelto con CartProvider

### Componentes
- ✅ **components/MiniCart.tsx** - Mini carrito con resumen y botón WhatsApp
- ✅ **components/Header.tsx** - Actualizado con contador de carrito
- ✅ **components/ServiceCard.tsx** - Añadido botón "Agregar al carrito"

### Páginas
- ✅ **pages/carrito.tsx** - Página completa del carrito con resumen y acciones
- ✅ **pages/servicios/[slug].tsx** - Página de detalle con botón agregar al carrito

### Utilidades
- ✅ **lib/prisma.ts** - Singleton de Prisma Client
- ✅ **lib/buildWhatsAppUrl.ts** - Generador de URLs de WhatsApp con mensaje formateado

## Funcionalidades

### Carrito de Compras
- Agregar servicios al carrito desde tarjetas o página de detalle
- Ver resumen del carrito en el header (badge con contador)
- Página dedicada `/carrito` con lista completa
- Eliminar servicios individuales
- Limpiar todo el carrito
- Persistencia en localStorage

### Integración WhatsApp
- Botón para contactar por WhatsApp con servicios seleccionados
- Mensaje pre-formateado con:
  - Lista de servicios seleccionados
  - Precio de cada servicio
  - Total estimado
  - Tiempo total estimado
- Funciona desde MiniCart, página de carrito y página de detalle

## Tipo de cambio

- [x] Nueva funcionalidad (feature)
- [ ] Corrección de bug (bugfix)
- [ ] Refactorización
- [ ] Documentación
- [ ] Configuración / DevOps

## Checklist

- [x] El código sigue las convenciones del proyecto
- [x] He realizado una auto-revisión del código
- [x] TypeScript sin errores
- [x] ESLint sin errores
- [x] Build exitoso
- [x] Funcionalidad probada en local
- [x] Persistencia del carrito funciona
- [x] WhatsApp abre con mensaje correcto

## Tests realizados

### Funcionalidad del carrito:
- ✅ Agregar servicio desde tarjeta
- ✅ Agregar servicio desde página de detalle
- ✅ Ver contador en header
- ✅ Ver resumen en MiniCart
- ✅ Navegar a página /carrito
- ✅ Eliminar servicio individual
- ✅ Limpiar todo el carrito
- ✅ Persistencia después de recargar página

### Integración WhatsApp:
- ✅ Mensaje formateado correctamente
- ✅ Total calculado correctamente
- ✅ Tiempo total calculado correctamente
- ✅ URL de WhatsApp válida
- ✅ Abre en nueva ventana

## Build Output

```
Route (pages)                                Size  First Load JS
├ ○ /carrito                              1.84 kB         106 kB
├ ● /servicios                            1.33 kB         106 kB
└ ● /servicios/[slug]                     1.58 kB         106 kB
```

## Ejemplo de mensaje WhatsApp generado

```
Hola, estoy interesad@ en estos servicios:
- Limpieza dental — $80000
- Blanqueamiento dental — $200000
Total estimado: $280000
Tiempo total estimado: 1h 45min
```

## Screenshots / Videos

- Carrito en header con badge: http://localhost:3000
- Página de carrito: http://localhost:3000/carrito
- Botón agregar en tarjeta: http://localhost:3000/servicios
- Botón agregar en detalle: http://localhost:3000/servicios/limpieza-dental

## Notas adicionales

- El carrito usa localStorage para persistencia entre sesiones
- El número de WhatsApp se puede configurar con `NEXT_PUBLIC_WHATSAPP_PHONE`
- Los servicios duplicados no se agregan dos veces
- El carrito se mantiene sincronizado en todas las páginas gracias al Context

## Dependencias agregadas

- Ninguna nueva (usa dependencias existentes)
```

