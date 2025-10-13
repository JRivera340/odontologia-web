# 📸 GUÍA: Cómo Agregar Imágenes a los Servicios

---

## 🎯 OPCIONES PARA IMÁGENES

Tienes **3 opciones** para agregar imágenes a tus servicios:

### ✅ **Opción 1: Unsplash (RECOMENDADO - Gratis)**

**Ventajas:**
- ✅ Gratis y legal
- ✅ Imágenes de alta calidad
- ✅ No requiere configuración
- ✅ Funciona inmediatamente

**Pasos:**

1. **Ve a:** https://unsplash.com

2. **Busca una imagen:**
   - Ejemplo: "dental clinic"
   - Ejemplo: "dentist"
   - Ejemplo: "teeth cleaning"

3. **Haz clic derecho en la imagen → "Copiar dirección de imagen"**

4. **Modifica la URL para optimización:**
   ```
   URL original:
   https://images.unsplash.com/photo-1606811841689-23dfddce3e95

   URL optimizada (añade parámetros):
   https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop
   ```

5. **Pega esa URL en el campo "Imagen del servicio"** en el admin

---

### ✅ **Opción 2: Imgur (Simple y Rápido)**

**Ventajas:**
- ✅ Gratis
- ✅ No requiere cuenta
- ✅ Sube tu propia imagen

**Pasos:**

1. **Ve a:** https://imgur.com

2. **Haz clic en "New post"**

3. **Sube tu imagen** (arrastra o selecciona)

4. **Haz clic derecho en la imagen subida → "Copiar dirección de imagen"**

5. **Pega esa URL en el admin**

---

### ✅ **Opción 3: Cloudinary (Profesional, requiere configuración)**

**Ventajas:**
- ✅ Optimización automática
- ✅ Transformaciones on-the-fly
- ✅ CDN global
- ✅ Integración con el botón "Subir archivo"

**Desventajas:**
- ⚠️ Requiere configuración
- ⚠️ Requiere crear cuenta

**Pasos:**

#### 1️⃣ **Crear cuenta en Cloudinary:**

1. Ve a: https://cloudinary.com/users/register_free
2. Crea una cuenta gratuita
3. Verifica tu email

#### 2️⃣ **Obtener credenciales:**

1. Ve al Dashboard: https://cloudinary.com/console
2. Copia estos 3 valores:
   - **Cloud name:** (ejemplo: `dxxxx`)
   - **API Key:** (ejemplo: `123456789012345`)
   - **API Secret:** (ejemplo: `abcdefghijklmnopqrstuvwxyz`)

#### 3️⃣ **Configurar en el proyecto:**

Crea (o edita) el archivo `.env.local` en la raíz del proyecto:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=tu-cloud-name-aqui
CLOUDINARY_API_KEY=tu-api-key-aqui
CLOUDINARY_API_SECRET=tu-api-secret-aqui
```

#### 4️⃣ **Reiniciar el servidor:**

```bash
# Detener el servidor (Ctrl+C)
# Reiniciar
npm run dev
```

#### 5️⃣ **Usar el botón "Subir archivo":**

Ahora en el admin, el botón de subir archivo funcionará correctamente.

---

## 🧪 CÓMO PROBAR QUE FUNCIONA

### **Test 1: Crear servicio con imagen de Unsplash**

1. **Login al admin:** http://localhost:3000/admin
   - Email: `admin@clinica.com`
   - Password: `Admin123!`

2. **Haz clic en "+ Nuevo Servicio"**

3. **Completa el formulario:**
   - **Título:** "Ortodoncia"
   - **Slug:** "ortodoncia"
   - **Descripción corta:** "Corrección de dientes"
   - **Descripción larga:** "Tratamiento de ortodoncia con brackets"
   - **Duración:** 120
   - **Precio:** 2500000
   - **Imagen URL:** `https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&h=300&fit=crop`
   - **Publicado:** ✅ Checked

4. **Verifica la vista previa:**
   - Debería aparecer una imagen de ortodoncia debajo del campo URL

5. **Haz clic en "Guardar"**

6. **Ve al perfil público:** http://localhost:3000/servicios
   - ✅ Debe aparecer "Ortodoncia" con su imagen

---

### **Test 2: Editar servicio y cambiar imagen**

1. **En el admin:** http://localhost:3000/admin

2. **Haz clic en "Editar"** en cualquier servicio

3. **Cambia la URL de la imagen:**
   ```
   https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop
   ```

4. **Verifica que aparezca la vista previa**

5. **Haz clic en "Guardar"**

6. **Ve al perfil público y refresca**
   - ✅ La imagen debe haber cambiado

---

## ❌ PROBLEMAS COMUNES

### **Problema 1: "Imagen del servicio" aparece pero no se ve la imagen**

**Causa:** La URL de la imagen es inválida o la imagen no es pública

**Solución:**
1. Verifica que la URL comience con `https://`
2. Pega la URL en una nueva pestaña del navegador
3. Si no se abre la imagen, la URL es incorrecta
4. Usa Unsplash o Imgur para obtener URLs válidas

---

### **Problema 2: El upload de archivo falla con error 500**

**Causa:** Cloudinary no está configurado

**Solución:**
1. **Opción A (rápida):** Usa URLs directas (Unsplash/Imgur)
2. **Opción B (profesional):** Configura Cloudinary (ver arriba)

---

### **Problema 3: La imagen se ve en admin pero NO en público**

**Causa:** El dominio de la imagen no está permitido en `next.config.js`

**Solución:**
1. Abre `next.config.js`
2. Busca `images.remotePatterns`
3. Añade el dominio:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
    {
      protocol: 'https',
      hostname: 'i.imgur.com', // ← AÑADIR si usas Imgur
    },
  ],
}
```

4. Reinicia el servidor: `npm run dev`

---

## 📋 URLS DE IMÁGENES DE EJEMPLO (Listas para usar)

Copia y pega estas URLs directamente:

### **Limpieza Dental:**
```
https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop
```

### **Blanqueamiento:**
```
https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop
```

### **Ortodoncia:**
```
https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&h=300&fit=crop
```

### **Implantes:**
```
https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400&h=300&fit=crop
```

### **Consulta General:**
```
https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=300&fit=crop
```

---

## 🎨 MEJORES PRÁCTICAS

### ✅ **DO (Haz esto):**

1. ✅ Usa imágenes de Unsplash (gratuitas y legales)
2. ✅ Añade parámetros de optimización: `?w=400&h=300&fit=crop`
3. ✅ Verifica la vista previa antes de guardar
4. ✅ Usa imágenes relacionadas con el servicio

### ❌ **DON'T (No hagas esto):**

1. ❌ No uses imágenes locales (`/public/images/...`) sin subirlas al servidor
2. ❌ No uses URLs de Google Images (problemas de copyright)
3. ❌ No uses imágenes muy pesadas (>1MB)
4. ❌ No uses URLs que requieran autenticación

---

## 🚀 FLUJO RECOMENDADO

```
1. Busca imagen en Unsplash
   ↓
2. Copia URL de la imagen
   ↓
3. Añade parámetros: ?w=400&h=300&fit=crop
   ↓
4. Pega en campo "Imagen del servicio" en admin
   ↓
5. Verifica vista previa
   ↓
6. Guarda servicio
   ↓
7. Verifica en perfil público (refresca)
```

---

## 📊 COMPARACIÓN DE OPCIONES

| Opción | Gratis | Requiere Config | Calidad | Velocidad | Recomendado |
|--------|--------|-----------------|---------|-----------|-------------|
| **Unsplash** | ✅ Sí | ❌ No | ⭐⭐⭐⭐⭐ | 🚀 Rápido | ✅ **SÍ** |
| **Imgur** | ✅ Sí | ❌ No | ⭐⭐⭐⭐ | 🚀 Rápido | ✅ Sí |
| **Cloudinary** | ⚠️ Freemium | ⚠️ Sí | ⭐⭐⭐⭐⭐ | 🚀🚀 Muy rápido | ✅ Para producción |

---

## 🎯 RESUMEN RÁPIDO

### **Para empezar rápido (5 minutos):**

1. Ve a: https://unsplash.com
2. Busca: "dental"
3. Copia URL de una imagen
4. Añade: `?w=400&h=300&fit=crop`
5. Pega en admin
6. ¡Listo! ✅

---

## 📞 SOPORTE

Si tienes problemas:

1. Verifica que la URL de la imagen funcione en una pestaña nueva
2. Revisa los logs del servidor (consola donde corre `npm run dev`)
3. Asegúrate de que el dominio esté en `next.config.js`
4. Si usas Cloudinary, verifica las variables de entorno en `.env.local`

---

**Última actualización:** 13 de Octubre, 2024

