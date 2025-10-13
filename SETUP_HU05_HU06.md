# 🚀 Setup Guide: HU-05 (Revalidate) & HU-06 (Cloudinary Upload)

**Fecha de implementación:** 12 de Octubre, 2025  
**Branches creadas:**
- `feat/HU-05-revalidate` 
- `feat/HU-06-image-upload`

---

## 📋 Resumen de Funcionalidades Implementadas

### ✅ HU-05: On-Demand Revalidation (ISR)
Implementa revalidación bajo demanda para regenerar páginas estáticas cuando cambian los datos, sin necesidad de rebuild completo.

**Características:**
- ✅ Endpoint `/api/revalidate` protegido con JWT o token secreto
- ✅ Integración automática en CRUD de servicios (create/update/delete)
- ✅ Revalidación de `/servicios` y `/servicios/[slug]` en cada cambio
- ✅ Logs de revalidación para debugging
- ✅ Fallback a JWT auth si no hay REVALIDATE_SECRET

### ✅ HU-06: Cloudinary Image Upload
Permite subir imágenes directamente desde el panel admin a Cloudinary con preview en tiempo real.

**Características:**
- ✅ Endpoint `/api/admin/upload` protegido
- ✅ Upload directo a Cloudinary con optimizaciones automáticas
- ✅ File input en formulario admin con preview de imagen
- ✅ Validación de tipo de archivo (solo imágenes)
- ✅ Validación de tamaño (máximo 3MB)
- ✅ Transformaciones automáticas (resize, quality, format)
- ✅ Opción alternativa de ingresar URL manualmente
- ✅ `next.config.js` actualizado con `remotePatterns` para Cloudinary

---

## 🔐 Variables de Entorno Requeridas

### **Para HU-05 (Revalidate)**

```env
# .env.local o .env.production

# Secret token para proteger el endpoint de revalidación (REQUERIDO para producción)
REVALIDATE_SECRET="tu-secret-key-muy-segura-aqui"

# URL base de tu aplicación (opcional, default: http://localhost:3000)
NEXT_PUBLIC_BASE_URL="https://tu-app.vercel.app"
# O en local:
# NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

**Nota:** Si no defines `REVALIDATE_SECRET`, el endpoint usará autenticación JWT (token de admin). Se recomienda definir el secret en producción.

---

### **Para HU-06 (Cloudinary Upload)**

```env
# .env.local o .env.production

# Credenciales de Cloudinary (TODAS REQUERIDAS)
CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"
```

#### **¿Cómo obtener las credenciales de Cloudinary?**

1. **Crea una cuenta gratis en Cloudinary:**  
   👉 https://cloudinary.com/users/register/free

2. **Accede a tu Dashboard:**  
   👉 https://cloudinary.com/console

3. **Copia las credenciales:**
   - **Cloud Name:** Aparece en la parte superior del dashboard
   - **API Key:** Se muestra debajo del Cloud Name
   - **API Secret:** Haz clic en "Show" para revelar el secret

4. **Pégalas en tu `.env.local`**

---

## 📦 Archivos Creados/Modificados

### **HU-05 (Revalidate)**
```
✅ pages/api/revalidate.ts              (nuevo - endpoint de revalidación)
✅ pages/api/admin/services/index.ts    (modificado - integración con revalidate)
```

### **HU-06 (Cloudinary Upload)**
```
✅ pages/api/admin/upload.ts            (nuevo - endpoint de upload)
✅ pages/admin/index.tsx                (modificado - UI con file input y preview)
✅ next.config.js                       (modificado - remotePatterns para Cloudinary)
✅ package.json                         (modificado - deps: cloudinary, formidable)
```

---

## 🧪 Pruebas y Validación

### **Probar HU-05 (Revalidate)**

#### 1. **Sin REVALIDATE_SECRET (usando JWT admin):**
```bash
# 1. Iniciar sesión en /admin/login
# 2. Crear, editar o eliminar un servicio
# 3. Verificar en la consola del servidor los logs:
#    "Revalidated paths: ['/servicios', '/servicios/servicio-slug']"
# 4. Visitar la página pública y verificar que se actualizó
```

#### 2. **Con REVALIDATE_SECRET (producción):**
```bash
# Probar endpoint directamente con curl/Postman:
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidate-token: tu-secret-key-muy-segura-aqui" \
  -d '{"paths": ["/servicios", "/servicios/limpieza-dental"]}'

# Respuesta esperada:
# {"revalidated": true, "paths": [...], "timestamp": "2025-10-12T..."}
```

---

### **Probar HU-06 (Cloudinary Upload)**

#### 1. **Verificar configuración:**
```bash
# Asegúrate de que las variables de entorno estén definidas
npm run dev
# Revisa la consola; si Cloudinary NO está configurado, verás un error al intentar subir
```

#### 2. **Subir una imagen:**
```
1. Iniciar sesión en http://localhost:3000/admin/login
2. Hacer clic en "+ Nuevo Servicio" o "Editar" un servicio existente
3. En el formulario, buscar la sección "Imagen del servicio"
4. Hacer clic en "Choose File" (o "Elegir archivo")
5. Seleccionar una imagen (JPG, PNG, WebP, etc.)
6. Ver el mensaje "Subiendo..." y luego el preview de la imagen
7. La URL de Cloudinary se autocompleta en el campo imageUrl
8. Guardar el servicio
```

#### 3. **Verificar upload exitoso:**
```bash
# En la consola del servidor deberías ver:
# "Image uploaded successfully: https://res.cloudinary.com/..."

# Verificar en Cloudinary Dashboard:
# https://cloudinary.com/console/media_library
# Buscar en la carpeta: odontologia/services/
```

#### 4. **Probar endpoint directamente (cURL):**
```bash
# Requiere JWT token de admin
curl -X POST http://localhost:3000/api/admin/upload \
  -H "Cookie: token=TU_JWT_TOKEN" \
  -F "file=@/path/to/image.jpg"

# Respuesta esperada:
# {
#   "url": "https://res.cloudinary.com/...",
#   "publicId": "odontologia/services/...",
#   "width": 1200,
#   "height": 800,
#   "format": "jpg",
#   "size": 245678
# }
```

---

## 🎯 Casos de Uso

### **HU-05: ¿Cuándo se revalida automáticamente?**

| Acción en Admin Panel | Paths Revalidados |
|----------------------|-------------------|
| Crear servicio nuevo | `/servicios`, `/servicios/nuevo-slug` |
| Editar servicio existente | `/servicios`, `/servicios/servicio-slug` |
| Eliminar servicio | `/servicios`, `/servicios/servicio-slug` |

**Resultado:** Los visitantes ven los cambios inmediatamente sin esperar al próximo build.

---

### **HU-06: Flujos de Upload**

#### **Flujo 1: Upload desde el panel admin (RECOMENDADO)**
```
Admin → Formulario → File Input → Cloudinary → URL auto-completada → Guardar
```

#### **Flujo 2: Ingresar URL manualmente**
```
Admin → Formulario → "O ingresa URL manualmente" → Paste URL → Guardar
```

**Ventajas del Flujo 1:**
- ✅ Imágenes hospedadas en Cloudinary (CDN global rápido)
- ✅ Optimizaciones automáticas (resize, quality, WebP)
- ✅ Sin preocupaciones por bandwidth del servidor
- ✅ Preview inmediato antes de guardar

---

## ⚙️ Configuración Avanzada

### **Ajustar límites de upload (HU-06)**

En `pages/api/admin/upload.ts`:
```typescript
const form = new IncomingForm({
  maxFileSize: 5 * 1024 * 1024, // Cambiar a 5MB
  keepExtensions: true,
});
```

### **Cambiar transformaciones de Cloudinary**

En `pages/api/admin/upload.ts`:
```typescript
const uploadResult = await cloudinary.uploader.upload(filepath, {
  folder: 'odontologia/services',
  transformation: [
    { width: 1600, height: 1200, crop: 'limit' }, // Tamaño máximo
    { quality: 'auto:best' }, // Mejor calidad
    { fetch_format: 'auto' }
  ]
});
```

### **Agregar más paths a revalidar (HU-05)**

En `pages/api/admin/services/index.ts`:
```typescript
// Después de crear un servicio:
await triggerRevalidate([
  '/servicios',
  `/servicios/${created.slug}`,
  '/', // Revalidar homepage también
  '/api/services' // Si usas API route caching
]);
```

---

## 🚨 Troubleshooting

### **HU-05: Revalidate no funciona**

**Síntoma:** Los cambios no se reflejan en el sitio público.

**Soluciones:**
1. **Verificar logs del servidor:**
   ```
   "Revalidated paths: [...]" ✅
   "Revalidate failed: ..." ❌
   ```

2. **Verificar que NEXT_PUBLIC_BASE_URL apunta a tu dominio correcto:**
   ```env
   # ❌ MAL (en producción)
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   
   # ✅ BIEN
   NEXT_PUBLIC_BASE_URL="https://tu-app.vercel.app"
   ```

3. **En Vercel/Netlify, asegúrate de que las variables de entorno estén definidas.**

4. **Si usas ISR + CDN, puede haber cache adicional del CDN.**

---

### **HU-06: Upload falla con error 500**

**Síntoma:** "Upload failed" o error 500 al subir imagen.

**Soluciones:**
1. **Verificar credenciales de Cloudinary:**
   ```bash
   # En la consola del servidor:
   "Cloudinary not configured. Please set CLOUDINARY_* env vars."
   ```
   👉 Revisar `.env.local` y reiniciar el servidor.

2. **Verificar que el archivo es una imagen válida:**
   - Formatos soportados: JPG, PNG, GIF, WebP, SVG
   - Tamaño máximo: 3MB (ajustable)

3. **Ver logs de Cloudinary:**
   - Dashboard → Settings → Error Logs
   - Verificar cuota (el plan gratuito tiene límites)

4. **CORS o Network Issues:**
   - Si usas proxy/firewall, asegurar que permite uploads a `api.cloudinary.com`

---

### **HU-06: Preview no se muestra**

**Síntoma:** Upload exitoso pero no hay preview.

**Soluciones:**
1. **Verificar `next.config.js` incluye Cloudinary en `remotePatterns`:**
   ```javascript
   remotePatterns: [
     {
       protocol: 'https',
       hostname: 'res.cloudinary.com',
       pathname: '/**',
     },
   ]
   ```

2. **Reiniciar servidor después de cambiar `next.config.js`.**

3. **Verificar consola del navegador para errores de CORS/CSP.**

---

## 📊 Límites y Consideraciones

### **Cloudinary Free Tier:**
- ✅ 25 GB de storage
- ✅ 25 GB de bandwidth mensual
- ✅ Transformaciones ilimitadas

**Si excedes los límites:** Cloudinary bloqueará uploads. Upgrade a plan pagado o usar otro servicio (AWS S3, Vercel Blob, etc.).

### **Revalidate Limits (Vercel):**
- En Vercel Hobby Plan: ~100 revalidaciones/hora
- En Vercel Pro/Enterprise: límites más altos

**Si excedes:** Revalidate fallará silenciosamente. Considerar batch revalidations o usar Vercel Cache Tags.

---

## 🎉 PRs Listos para Revisión

**HU-05 (Revalidate):**  
👉 https://github.com/JRivera340/odontologia-web/pull/new/feat/HU-05-revalidate

**HU-06 (Cloudinary Upload):**  
👉 https://github.com/JRivera340/odontologia-web/pull/new/feat/HU-06-image-upload

---

## ✅ Checklist de Deployment

### **Antes de mergear a `develop`:**
- [ ] Definir `REVALIDATE_SECRET` en `.env.local`
- [ ] Definir credenciales de Cloudinary en `.env.local`
- [ ] Probar upload de imagen desde admin
- [ ] Probar revalidación creando/editando servicios
- [ ] Verificar que no hay errores en consola

### **Antes de deployment a producción:**
- [ ] Definir todas las env vars en Vercel/Netlify Dashboard
- [ ] Actualizar `NEXT_PUBLIC_BASE_URL` al dominio de producción
- [ ] Probar upload en staging/preview deployment
- [ ] Verificar límites de Cloudinary (plan free vs paid)
- [ ] Configurar monitoring de Cloudinary usage

---

## 📚 Documentación Adicional

- **Next.js ISR & Revalidate:**  
  https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration

- **Cloudinary Upload API:**  
  https://cloudinary.com/documentation/upload_images

- **Formidable (File Parsing):**  
  https://github.com/node-formidable/formidable

---

**🎊 ¡Implementación completada exitosamente!**

*Última actualización: 12 de Octubre, 2025*

