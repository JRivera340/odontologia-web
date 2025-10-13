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
    
    // Trigger on-demand revalidation
    try {
      await res.revalidate('/servicios');
      await res.revalidate(`/servicios/${created.slug}`);
      console.log('✅ Revalidated:', '/servicios', `/servicios/${created.slug}`);
    } catch (err) {
      console.error('❌ Revalidation failed:', err);
    }
    
    return res.status(201).json(created);
  }

  if (req.method === 'PUT') {
    const { id, ...rest } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: 'ID required' });
    }
    
    const updated = await prisma.service.update({ 
      where: { id: Number(id) }, 
      data: {
        ...rest,
        durationMin: rest.durationMin ? Number(rest.durationMin) : undefined,
        price: rest.price ? Number(rest.price) : undefined
      }
    });
    
    // Trigger on-demand revalidation
    try {
      await res.revalidate('/servicios');
      await res.revalidate(`/servicios/${updated.slug}`);
      console.log('✅ Revalidated:', '/servicios', `/servicios/${updated.slug}`);
    } catch (err) {
      console.error('❌ Revalidation failed:', err);
    }
    
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'ID required' });
    }
    
    // Get service before deleting to access its slug
    const service = await prisma.service.findUnique({ where: { id: Number(id) } });
    
    await prisma.service.delete({ where: { id: Number(id) } });
    
    // Trigger on-demand revalidation
    if (service) {
      try {
        await res.revalidate('/servicios');
        await res.revalidate(`/servicios/${service.slug}`);
        console.log('✅ Revalidated after delete:', '/servicios', `/servicios/${service.slug}`);
      } catch (err) {
        console.error('❌ Revalidation failed:', err);
      }
    }
    
    return res.status(204).end();
  }

  res.setHeader('Allow', 'GET,POST,PUT,DELETE');
  res.status(405).end('Method Not Allowed');
}

