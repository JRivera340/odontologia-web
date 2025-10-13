import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getTokenFromReq } from '../../../../lib/auth';

// --- On-demand revalidation helper (server-side)
async function triggerRevalidate(paths: string[]) {
  try {
    const secret = process.env.REVALIDATE_SECRET;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/revalidate`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(secret ? { 'x-revalidate-token': secret } : {})
      },
      body: JSON.stringify({ paths })
    });
    
    if (!response.ok) {
      console.error('Revalidate failed:', await response.text());
    } else {
      console.log('Revalidated paths:', paths);
    }
  } catch (e) {
    console.error('triggerRevalidate error:', e);
  }
}

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
    
    // Trigger revalidation for catalog and detail page
    await triggerRevalidate(['/servicios', `/servicios/${created.slug}`]);
    
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
    
    // Trigger revalidation for catalog and detail page
    await triggerRevalidate(['/servicios', `/servicios/${updated.slug}`]);
    
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
    
    // Trigger revalidation for catalog and detail page
    if (service) {
      await triggerRevalidate(['/servicios', `/servicios/${service.slug}`]);
    }
    
    return res.status(204).end();
  }

  res.setHeader('Allow', 'GET,POST,PUT,DELETE');
  res.status(405).end('Method Not Allowed');
}

