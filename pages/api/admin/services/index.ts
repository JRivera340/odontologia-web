import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getTokenFromReq } from '../../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getTokenFromReq(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(services);
  }

  if (req.method === 'POST') {
    const { title, slug, shortDesc, longDesc, durationMin, price, imageUrl, published } = req.body;
    
    if (!title || !slug || !shortDesc || !durationMin || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    try {
      const created = await prisma.service.create({ 
        data: {
          title,
          slug,
          shortDesc,
          longDesc: longDesc || null,
          durationMin: Number(durationMin),
          price: Number(price),
          imageUrl: imageUrl || null,
          published: published !== undefined ? published : true
        }
      });
      
      console.log('✅ Service created:', created.title);
      return res.status(201).json(created);
    } catch (error) {
      console.error('Error creating service:', error);
      return res.status(500).json({ error: 'Failed to create service' });
    }
  }

  if (req.method === 'PUT') {
    const { id, ...rest } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: 'ID required' });
    }
    
    try {
      const updated = await prisma.service.update({ 
        where: { id: Number(id) }, 
        data: {
          ...rest,
          durationMin: rest.durationMin ? Number(rest.durationMin) : undefined,
          price: rest.price ? Number(rest.price) : undefined
        }
      });
      
      console.log('✅ Service updated:', updated.title);
      return res.status(200).json(updated);
    } catch (error) {
      console.error('Error updating service:', error);
      return res.status(500).json({ error: 'Failed to update service' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'ID required' });
    }
    
    try {
      const service = await prisma.service.findUnique({ where: { id: Number(id) } });
      
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      await prisma.service.delete({ where: { id: Number(id) } });
      
      console.log('✅ Service deleted:', service.title);
      return res.status(204).end();
    } catch (error) {
      console.error('Error deleting service:', error);
      return res.status(500).json({ error: 'Failed to delete service' });
    }
  }

  res.setHeader('Allow', 'GET,POST,PUT,DELETE');
  res.status(405).end('Method Not Allowed');
}

// ✅ NOTA SOBRE REVALIDACIÓN
// 
// ¿Por qué eliminé res.revalidate()?
// - Ahora usamos SSR (getServerSideProps) en lugar de SSG (getStaticProps)
// - Con SSR, cada request consulta la base de datos directamente
// - NO se necesita revalidación porque no hay caché estático
// - Los cambios se ven INMEDIATAMENTE en el sitio público
//
// Ventajas de esta arquitectura:
// 1. ✅ Más simple (menos código, menos complejidad)
// 2. ✅ Más robusta (funciona en dev y producción sin configuración)
// 3. ✅ Más predecible (no hay problemas de caché desincronizado)
// 4. ✅ Suficientemente rápida para un catálogo de servicios odontológicos
//
// Si en el futuro necesitas optimización extrema:
// - Vercel/Netlify cachean automáticamente las respuestas SSR en CDN
// - Puedes agregar Redis para caché de base de datos
// - Pero para 90% de proyectos, SSR es la mejor solución
