// pages/api/revalidate.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromReq } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const SECRET = process.env.REVALIDATE_SECRET;
  const headerToken = req.headers['x-revalidate-token'];

  // Auth: either JWT admin token OR x-revalidate-token header matching REVALIDATE_SECRET
  if (SECRET) {
    if (!headerToken || headerToken !== SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    // Fallback: check JWT admin token
    const user = getTokenFromReq(req as any);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { paths } = req.body;
    if (!paths || !Array.isArray(paths) || paths.length === 0) {
      return res.status(400).json({ error: 'paths required (array of strings)' });
    }
    
    // Revalidate each path
    await Promise.all(paths.map((p: string) => res.revalidate(p)));
    
    return res.status(200).json({ 
      revalidated: true, 
      paths: paths,
      timestamp: new Date().toISOString() 
    });
  } catch (err: any) {
    console.error('Revalidate error:', err);
    return res.status(500).json({ 
      error: 'Error revalidating paths',
      details: err?.message || 'Unknown error'
    });
  }
}

