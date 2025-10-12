# Pull Request - HU-04: Panel Admin con Autenticación y CRUD

## URL para crear PR:
https://github.com/JRivera340/odontologia-web/compare/develop...feat/HU-04-admin?expand=1

## Detalles del PR:

**Base branch:** `develop`  
**Compare branch:** `feat/HU-04-admin`

**Título:**
```
[ODON-4] Admin auth & services CRUD
```

**Descripción:**
```markdown
## Descripción

Closes ODON-4 (HU-04)

Implementación completa de panel administrativo con autenticación JWT y CRUD de servicios.

## Cambios realizados

### Autenticación
- ✅ **lib/auth.ts** - Helper para JWT (sign, verify, extract from cookies)
- ✅ **pages/api/admin/login.ts** - Endpoint de login con JWT en httpOnly cookie
- ✅ **pages/api/admin/logout.ts** - Endpoint de logout
- ✅ **pages/admin/login.tsx** - Página de login con formulario

### CRUD de Servicios
- ✅ **pages/api/admin/services/index.ts** - Endpoints protegidos:
  - GET: Listar todos los servicios
  - POST: Crear nuevo servicio
  - PUT: Actualizar servicio existente
  - DELETE: Eliminar servicio

### Panel Administrativo
- ✅ **pages/admin/index.tsx** - Panel completo con:
  - Tabla de servicios
  - Formulario de creación/edición
  - Botones de acción (editar, eliminar)
  - Protección server-side con getServerSideProps
  - Logout

### Seed Data
- ✅ **prisma/seed.ts** - Actualizado para crear usuario admin
  - Email: admin@clinica.com
  - Password: Admin123!

### Utilidades
- ✅ **lib/prisma.ts** - Singleton de Prisma Client

## Funcionalidades

### Autenticación
- Login con email y contraseña
- JWT almacenado en httpOnly cookie (seguro contra XSS)
- Expiración de 7 días
- Logout que limpia la cookie
- Protección server-side de rutas admin
- Redirección automática a login si no autenticado

### Panel Administrativo
- Vista de tabla con todos los servicios
- Indicadores de estado (Publicado/Borrador)
- Formulario modal para crear/editar
- Validación de campos requeridos
- Confirmación antes de eliminar
- Interfaz responsive
- Recarga automática después de cambios

### CRUD Completo
- **Crear**: Formulario con todos los campos
- **Leer**: Lista paginable con información clave
- **Actualizar**: Edición inline con formulario pre-poblado
- **Eliminar**: Con confirmación de seguridad

## Tipo de cambio

- [x] Nueva funcionalidad (feature)
- [ ] Corrección de bug (bugfix)
- [ ] Refactorización
- [ ] Documentación
- [x] Configuración / DevOps

## Checklist

- [x] El código sigue las convenciones del proyecto
- [x] He realizado una auto-revisión del código
- [x] TypeScript sin errores
- [x] ESLint sin errores (solo 1 warning menor)
- [x] Build exitoso
- [x] Funcionalidad probada en local
- [x] Autenticación funciona correctamente
- [x] CRUD completo funciona
- [x] Protección de rutas funciona

## Tests realizados

### Autenticación:
- ✅ Login con credenciales correctas
- ✅ Login con credenciales incorrectas (error)
- ✅ Cookie se establece correctamente
- ✅ Redirección después de login exitoso
- ✅ Acceso a /admin sin autenticación (redirige a login)
- ✅ Logout limpia cookie y redirige

### CRUD:
- ✅ Listar servicios existentes
- ✅ Crear nuevo servicio
- ✅ Editar servicio existente
- ✅ Eliminar servicio con confirmación
- ✅ Validación de campos requeridos
- ✅ Actualización automática de lista

### Seguridad:
- ✅ Endpoints protegidos requieren autenticación
- ✅ JWT inválido rechazado
- ✅ Cookie httpOnly no accesible desde JavaScript
- ✅ Server-side validation en getServerSideProps

## API Endpoints

### Públicos
- `GET /api/services` - Lista servicios publicados

### Protegidos (requieren autenticación)
- `POST /api/admin/login` - Login
- `GET /api/admin/logout` - Logout
- `GET /api/admin/services` - Listar todos los servicios
- `POST /api/admin/services` - Crear servicio
- `PUT /api/admin/services` - Actualizar servicio
- `DELETE /api/admin/services?id={id}` - Eliminar servicio

## Build Output

```
Route (pages)                                Size  First Load JS
├ ƒ /admin                                3.18 kB        99.9 kB
├ ○ /admin/login                          2.35 kB        99.1 kB
├ ƒ /api/admin/login                          0 B        96.7 kB
├ ƒ /api/admin/logout                         0 B        96.7 kB
├ ƒ /api/admin/services                       0 B        96.7 kB
```

## Credenciales de Admin

```
Email: admin@clinica.com
Password: Admin123!
```

⚠️ **IMPORTANTE**: Cambiar la contraseña en producción

## Variables de Entorno

### Requeridas:
- `JWT_SECRET` - Secret para firmar JWT (default: 'dev-secret')

### Opcionales:
- `DATABASE_URL` - URL de conexión a base de datos

## Screenshots / Videos

- Login page: http://localhost:3000/admin/login
- Admin panel: http://localhost:3000/admin
- Create form: Botón "+ Nuevo Servicio"
- Edit form: Botón "Editar" en cada servicio

## Notas adicionales

### Seguridad
- JWT almacenado en httpOnly cookie (protección XSS)
- Validación server-side en todas las rutas admin
- Passwords hasheados con bcrypt (10 rounds)
- Cookie con sameSite: 'lax'

### Mejoras futuras sugeridas
- [ ] Rate limiting en login
- [ ] CSRF protection
- [ ] Password reset functionality
- [ ] 2FA authentication
- [ ] Audit logs
- [ ] Role-based access control
- [ ] Session management
- [ ] Password strength requirements

### Instrucciones para el cliente
1. **Cambiar contraseña**: Login y (TODO: agregar UI de cambio de contraseña)
2. **Agregar servicios**: Usar botón "+ Nuevo Servicio" en panel admin
3. **Editar servicios**: Click en "Editar" en la tabla
4. **Eliminar servicios**: Click en "Eliminar" (con confirmación)
5. **Publicar/Despublicar**: Usar checkbox "Publicado" en formulario

## Dependencias agregadas

- `bcryptjs` - Hashing de contraseñas
- `jsonwebtoken` - Generación y verificación de JWT
- `cookie` - Parsing y serialización de cookies
- `@types/bcryptjs` - Tipos TypeScript
- `@types/jsonwebtoken` - Tipos TypeScript
- `@types/cookie` - Tipos TypeScript
```

