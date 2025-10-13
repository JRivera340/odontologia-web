# 🚀 CONFIGURACIÓN DE CLOUDINARY (5 MINUTOS)

Esta guía te ayudará a configurar Cloudinary para que puedas **subir imágenes directamente** desde el panel admin sin necesidad de URLs.

---

## 📋 ¿QUÉ ES CLOUDINARY?

Cloudinary es un servicio **GRATIS** que te permite:
- ✅ Subir imágenes desde tu computadora
- ✅ Almacenarlas en la nube
- ✅ Optimizarlas automáticamente
- ✅ Servirlas rápido (CDN global)

**Plan gratuito incluye:** 25GB de almacenamiento y 25GB de tráfico mensual (más que suficiente para empezar)

---

## ⏱️ PASO 1: CREAR CUENTA EN CLOUDINARY (2 minutos)

### 1.1 - Ir al registro

Abre este enlace en tu navegador:
```
https://cloudinary.com/users/register_free
```

### 1.2 - Completar el formulario

- **Nombre:** Tu nombre
- **Email:** Tu email
- **Contraseña:** Crea una contraseña segura
- **Rol:** Selecciona "Developer" o "Business Owner"
- **¿Cómo lo usarás?:** Selecciona "Web Application"

### 1.3 - Verificar email

1. Ve a tu bandeja de entrada
2. Busca el email de Cloudinary
3. Haz clic en "Verify your email"

✅ **Listo!** Ya tienes tu cuenta creada.

---

## 🔑 PASO 2: OBTENER CREDENCIALES (1 minuto)

### 2.1 - Ir al Dashboard

Una vez verificado tu email, serás redirigido al Dashboard.

Si no, ve a:
```
https://console.cloudinary.com
```

### 2.2 - Ver credenciales

En la página principal del Dashboard verás un recuadro con:

```
┌─────────────────────────────────────┐
│ Product Environment Credentials     │
├─────────────────────────────────────┤
│ Cloud name:  dxxxx12345             │
│ API Key:     123456789012345        │
│ API Secret:  AbCdEfGhIj... [Show]  │
└─────────────────────────────────────┘
```

### 2.3 - Copiar valores

Haz clic en "Show" junto a "API Secret" para revelarlo.

**Copia estos 3 valores:**
1. **Cloud name** (ejemplo: `dxxxx12345`)
2. **API Key** (ejemplo: `123456789012345`)
3. **API Secret** (ejemplo: `AbCdEfGhIjKlMnOpQrStUvWxYz`)

⚠️ **IMPORTANTE:** Guárdalos temporalmente en un notepad, los necesitarás en el siguiente paso.

---

## 💻 PASO 3: CONFIGURAR EN EL PROYECTO (2 minutos)

### 3.1 - Abrir el proyecto

Abre tu proyecto en VS Code / Cursor.

### 3.2 - Crear archivo .env.local

En la **raíz del proyecto** (donde está `package.json`), crea un archivo llamado:
```
.env.local
```

### 3.3 - Copiar y pegar esta plantilla:

```env
# JWT Secret (para autenticación del admin)
JWT_SECRET=dev-secret-change-in-production

# WhatsApp
NEXT_PUBLIC_WHATSAPP_PHONE=+573113440504

# Revalidación on-demand (ISR)
REVALIDATE_SECRET=revalidate-secret-change-in-production
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# ========================================
# CLOUDINARY (Reemplaza con tus valores)
# ========================================
CLOUDINARY_CLOUD_NAME=TU_CLOUD_NAME_AQUI
CLOUDINARY_API_KEY=TU_API_KEY_AQUI
CLOUDINARY_API_SECRET=TU_API_SECRET_AQUI
```

### 3.4 - Reemplazar valores

Reemplaza:
- `TU_CLOUD_NAME_AQUI` → con tu Cloud name (del paso 2.3)
- `TU_API_KEY_AQUI` → con tu API Key (del paso 2.3)
- `TU_API_SECRET_AQUI` → con tu API Secret (del paso 2.3)

**Ejemplo de cómo debería quedar:**

```env
CLOUDINARY_CLOUD_NAME=dxxxx12345
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz
```

### 3.5 - Guardar el archivo

Guarda `.env.local` con `Ctrl+S` (Windows) o `Cmd+S` (Mac).

---

## 🔄 PASO 4: REINICIAR EL SERVIDOR

### 4.1 - Detener el servidor actual

En la terminal donde está corriendo `npm run dev`, presiona:
```
Ctrl + C
```

### 4.2 - Reiniciar

```bash
npm run dev
```

Espera a ver:
```
✓ Ready in 3.8s
```

✅ **¡Listo!** Cloudinary está configurado.

---

## 🧪 PASO 5: PROBAR QUE FUNCIONA

### 5.1 - Ir al admin

Abre en tu navegador:
```
http://localhost:3000/admin
```

Login:
- Email: `admin@clinica.com`
- Password: `Admin123!`

### 5.2 - Crear un nuevo servicio

1. Haz clic en **"+ Nuevo Servicio"**

2. Completa los campos:
   - **Título:** "Test de Imagen"
   - **Slug:** "test-imagen"
   - **Descripción corta:** "Prueba de subida"
   - **Duración:** 30
   - **Precio:** 50000

3. **En la sección de imagen:**
   - Haz clic en **"⚠️ Subir archivo (requiere configurar Cloudinary)"**
   - Verás el botón de "Seleccionar archivo"

4. **Haz clic en "Seleccionar archivo"**
   - Elige una imagen de tu computadora (PNG, JPG, cualquier formato)
   - Espera unos segundos

5. **Verás la vista previa** de la imagen subida ✅

6. **Haz clic en "Guardar"**

### 5.3 - Verificar en perfil público

1. Abre:
   ```
   http://localhost:3000/servicios
   ```

2. Busca "Test de Imagen"

3. **¡Deberías ver tu imagen!** ✅

---

## ✅ CHECKLIST DE VERIFICACIÓN

Marca cada item cuando lo completes:

- [ ] Cuenta de Cloudinary creada
- [ ] Email verificado
- [ ] Cloud name copiado
- [ ] API Key copiado
- [ ] API Secret copiado
- [ ] Archivo `.env.local` creado
- [ ] Valores pegados en `.env.local`
- [ ] Servidor reiniciado
- [ ] Subida de imagen probada
- [ ] Imagen visible en perfil público

---

## 🎨 AHORA EL FLUJO ES MUY SIMPLE:

```
1. Usuario abre panel admin
   ↓
2. Clic en "+ Nuevo Servicio"
   ↓
3. Completa formulario
   ↓
4. Clic en "Subir archivo"
   ↓
5. Selecciona imagen de su PC
   ↓
6. Ve vista previa inmediatamente
   ↓
7. Guarda servicio
   ↓
8. Imagen aparece en perfil público ✅
```

**¡Sin necesidad de buscar URLs externas!**

---

## ❌ PROBLEMAS COMUNES

### Problema 1: "Cloudinary not configured"

**Causa:** Las variables de entorno no se cargaron correctamente.

**Solución:**
1. Verifica que el archivo se llame exactamente `.env.local` (con el punto al inicio)
2. Verifica que esté en la raíz del proyecto (mismo nivel que `package.json`)
3. Reinicia el servidor (`Ctrl+C` y luego `npm run dev`)
4. Si usas VS Code, reinicia el editor completamente

---

### Problema 2: "Upload failed" o error 500

**Causa:** Las credenciales son incorrectas.

**Solución:**
1. Ve a https://console.cloudinary.com
2. Verifica que copiaste los valores correctamente
3. NO debe haber espacios antes/después de los valores
4. NO debe haber comillas alrededor de los valores
5. Reinicia el servidor

---

### Problema 3: La imagen no se ve en público

**Causa:** El dominio de Cloudinary no está en `next.config.js`

**Solución:**
Ya está configurado por defecto, pero verifica que `next.config.js` tenga:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
  ],
}
```

---

## 📞 NECESITAS AYUDA?

### Revisa los logs del servidor

En la terminal donde corre `npm run dev`, deberías ver:

**✅ Si funciona:**
```
POST /api/admin/upload 200 in 1234ms
```

**❌ Si NO funciona:**
```
POST /api/admin/upload 500 in 398ms
Cloudinary not configured. Please set CLOUDINARY_* env vars.
```

---

## 🎯 RESUMEN RÁPIDO

1. **Crear cuenta:** https://cloudinary.com/users/register_free
2. **Copiar credenciales:** Dashboard → Cloud name, API Key, API Secret
3. **Crear `.env.local`** en raíz del proyecto
4. **Pegar valores** en formato:
   ```
   CLOUDINARY_CLOUD_NAME=xxx
   CLOUDINARY_API_KEY=xxx
   CLOUDINARY_API_SECRET=xxx
   ```
5. **Reiniciar servidor:** `Ctrl+C` → `npm run dev`
6. **Probar subida** en admin

---

## 🎊 UNA VEZ CONFIGURADO

Ya **NUNCA** tendrás que:
- ❌ Buscar URLs de imágenes en internet
- ❌ Subir a servicios externos
- ❌ Copiar y pegar enlaces

**Solo:**
- ✅ Clic en "Subir archivo"
- ✅ Seleccionar imagen
- ✅ ¡Listo!

---

**Tiempo total:** ~5 minutos  
**Costo:** $0 (plan gratuito)  
**Dificultad:** ⭐⭐☆☆☆ (Fácil)

---

**¿Tuviste algún problema?** Revisa la sección "Problemas Comunes" arriba o verifica los logs del servidor.

