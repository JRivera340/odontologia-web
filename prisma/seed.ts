import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
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
}

main()
  .catch(e => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => { 
    await prisma.$disconnect(); 
  });

