const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const services = [
  {
    title: "Limpieza Dental Profesional",
    slug: "limpieza-dental",
    shortDesc: "Profilaxis completa con ultrasonido y pulido dental",
    longDesc: "Procedimiento de higiene dental profunda que incluye eliminación de sarro, placa bacteriana y manchas superficiales. Utilizamos tecnología de ultrasonido para una limpieza más efectiva y cómoda.",
    durationMin: 45,
    price: 150000,
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80&auto=format&fit=crop",
    published: true
  },
  {
    title: "Blanqueamiento Dental LED",
    slug: "blanqueamiento-dental",
    shortDesc: "Tecnología LED de última generación para dientes más blancos",
    longDesc: "Tratamiento de blanqueamiento profesional con tecnología LED que permite obtener resultados visibles desde la primera sesión. Tus dientes pueden aclararse hasta 8 tonos de forma segura y efectiva.",
    durationMin: 60,
    price: 350000,
    imageUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80&auto=format&fit=crop",
    published: true
  },
  {
    title: "Ortodoncia Invisible",
    slug: "ortodoncia-invisible",
    shortDesc: "Alineadores transparentes personalizados sin brackets",
    longDesc: "Sistema de alineadores transparentes removibles que permiten corregir la posición de tus dientes de forma discreta. Tratamiento personalizado con tecnología 3D para resultados predecibles.",
    durationMin: 30,
    price: 2500000,
    imageUrl: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80&auto=format&fit=crop",
    published: true
  },
  {
    title: "Implantes Dentales",
    slug: "implantes-dentales",
    shortDesc: "Reemplazo permanente de dientes perdidos",
    longDesc: "Solución definitiva para reemplazar dientes perdidos mediante implantes de titanio biocompatible. Proceso que incluye planificación digital 3D, cirugía guiada y corona personalizada.",
    durationMin: 90,
    price: 3500000,
    imageUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80&auto=format&fit=crop",
    published: true
  },
  {
    title: "Diseño de Sonrisa Digital",
    slug: "diseno-sonrisa",
    shortDesc: "Transformación estética completa de tu sonrisa",
    longDesc: "Procedimiento integral que combina múltiples tratamientos para lograr la sonrisa de tus sueños. Incluye análisis digital, carillas, blanqueamiento y otros procedimientos estéticos según tus necesidades.",
    durationMin: 120,
    price: 5000000,
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80&auto=format&fit=crop",
    published: true
  },
  {
    title: "Resinas Estéticas",
    slug: "resinas-esteticas",
    shortDesc: "Restauraciones dentales del color natural del diente",
    longDesc: "Tratamiento de obturaciones con materiales estéticos que imitan perfectamente el color y textura de tus dientes naturales. Ideal para caries, fracturas o cambio de amalgamas antiguas.",
    durationMin: 40,
    price: 180000,
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80&auto=format&fit=crop",
    published: true
  },
  {
    title: "Endodoncia (Tratamiento de Conducto)",
    slug: "endodoncia",
    shortDesc: "Salvamos tu diente eliminando infecciones profundas",
    longDesc: "Procedimiento que permite salvar dientes con infecciones o daños profundos en la pulpa dental. Utilizamos tecnología de última generación y técnicas avanzadas para garantizar tu comodidad.",
    durationMin: 90,
    price: 450000,
    imageUrl: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=800&q=80&auto=format&fit=crop",
    published: true
  },
  {
    title: "Prótesis Dental Fija",
    slug: "protesis-fija",
    shortDesc: "Coronas y puentes de alta calidad estética",
    longDesc: "Restauraciones protésicas fijas que devuelven la función y estética a tus dientes. Trabajamos con materiales de última generación como zirconio y porcelana para resultados naturales y duraderos.",
    durationMin: 60,
    price: 1200000,
    imageUrl: "https://images.unsplash.com/photo-1626736985932-e4d27c70a0e6?w=800&q=80&auto=format&fit=crop",
    published: true
  },
  {
    title: "Cirugía de Terceros Molares",
    slug: "cirugia-cordales",
    shortDesc: "Extracción segura de muelas del juicio",
    longDesc: "Procedimiento quirúrgico para extraer cordales o muelas del juicio que causan problemas. Realizamos cirugías con anestesia local, sedación consciente y protocolo de recuperación para minimizar molestias.",
    durationMin: 60,
    price: 400000,
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80&auto=format&fit=crop",
    published: true
  },
  {
    title: "Periodoncia (Tratamiento de Encías)",
    slug: "periodoncia",
    shortDesc: "Salud de encías y prevención de enfermedades periodontales",
    longDesc: "Tratamiento especializado para enfermedades de las encías como gingivitis y periodontitis. Incluye limpieza profunda, curetajes y terapias avanzadas para preservar tus dientes.",
    durationMin: 75,
    price: 320000,
    imageUrl: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80&auto=format&fit=crop",
    published: true
  },
  {
    title: "Carillas de Porcelana",
    slug: "carillas-porcelana",
    shortDesc: "Láminas ultrafinas para una sonrisa perfecta",
    longDesc: "Carillas de porcelana de alta resistencia y naturalidad que cubren la superficie frontal de los dientes. Solución ideal para dientes manchados, desalineados o con forma irregular.",
    durationMin: 45,
    price: 1800000,
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80&auto=format&fit=crop",
    published: true
  },
  {
    title: "Brackets Metálicos",
    slug: "brackets-metalicos",
    shortDesc: "Ortodoncia tradicional efectiva y económica",
    longDesc: "Tratamiento de ortodoncia con brackets metálicos de alta calidad. Incluye consultas mensuales de ajuste, control digital del progreso y retención final. Solución probada y efectiva.",
    durationMin: 30,
    price: 1500000,
    imageUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80&auto=format&fit=crop",
    published: true
  }
];

async function main() {
  console.log('🌱 Iniciando seed de servicios...');
  
  for (const service of services) {
    try {
      // Usar upsert para evitar duplicados
      const result = await prisma.service.upsert({
        where: { slug: service.slug },
        update: service,
        create: service,
      });
      console.log(`✅ Servicio creado/actualizado: ${result.title}`);
    } catch (error) {
      console.error(`❌ Error con ${service.title}:`, error.message);
    }
  }
  
  console.log('✨ Seed completado!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

