import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  // Seed admin user
  const password = await bcrypt.hash('Admin123!', 10);
  await prisma.adminUser.upsert({
    where: { email: 'admin@clinica.com' },
    update: {},
    create: { 
      name: 'Admin', 
      email: 'admin@clinica.com', 
      password 
    }
  });
  console.log('✅ Admin user created: admin@clinica.com / Admin123!');

  // Seed services
  const existingServices = await prisma.service.count();
  if (existingServices === 0) {
    await prisma.service.createMany({
      data: [
      {
        title: "Limpieza dental",
        slug: "limpieza-dental",
        shortDesc: "Limpieza profesional",
        longDesc: "Limpieza completa con pulido y recomendaciones.",
        durationMin: 45,
        price: 80000,
        imageUrl: "/images/limpieza.jpg"
      },
      {
        title: "Blanqueamiento dental",
        slug: "blanqueamiento-dental",
        shortDesc: "Blanqueamiento estético",
        longDesc: "Tratamiento de blanqueamiento profesional en consultorio.",
        durationMin: 60,
        price: 200000,
        imageUrl: "/images/blanqueamiento.jpg"
      }
    ]
    });
    console.log('✅ Seed data created successfully');
  } else {
    console.log('✅ Services already exist, skipping seed');
  }
}

main()
  .catch(e => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => { 
    await prisma.$disconnect(); 
  });

