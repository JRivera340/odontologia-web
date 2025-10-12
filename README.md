# Consultorio Odontológico - Web

Aplicación web para gestión de servicios odontológicos con catálogo público y panel administrativo.

## Stack Tecnológico

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de datos**: SQLite con Prisma ORM
- **Autenticación**: JWT + bcryptjs

## Scripts Disponibles

```bash
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción
npm run start            # Servidor de producción
npm run lint             # Ejecutar ESLint
npm run prisma:migrate   # Ejecutar migraciones de Prisma
npm run prisma:generate  # Generar Prisma Client
```

## Estructura de Ramas

- `main`: Producción
- `develop`: Desarrollo e integración
- `feat/*`: Features individuales (HU)

## Convención de Commits

```
ODON-<número>: <descripción breve>
```

Ejemplos:
- `ODON-1: add landing page skeleton`
- `ODON-2: implement services catalog`

## Cómo Contribuir

1. Crear branch desde `develop`: `git checkout -b feat/HU-XX-descripcion`
2. Hacer commits siguiendo la convención
3. Push y crear PR hacia `develop`
4. Esperar revisión y aprobación
5. Merge a `develop`

## Variables de Entorno

Crear archivo `.env.local`:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="tu-secret-key"
NEXT_PUBLIC_WHATSAPP_NUMBER="573001234567"
```

## Primeros Pasos

```bash
# Instalar dependencias
npm install

# Ejecutar migraciones
npm run prisma:migrate

# Iniciar servidor de desarrollo
npm run dev
```

Visitar [http://localhost:3000](http://localhost:3000)

