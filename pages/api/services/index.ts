import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const services = await prisma.service.findMany({ where: { published: true } });
      res.status(200).json(services);
    } catch (e) {
      console.error('Error fetching services:', e);
      // Fallback mock data
      res.status(200).json([
        { 
          id: 1, 
          title: 'Limpieza dental', 
          slug: 'limpieza-dental', 
          shortDesc: 'Limpieza profesional', 
          durationMin: 45, 
          price: 80000, 
          imageUrl: '/images/limpieza.jpg' 
        }
      ]);
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}

