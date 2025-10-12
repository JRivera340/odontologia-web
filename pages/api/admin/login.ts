import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../lib/auth';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = signToken({ sub: admin.id, email: admin.email });
  res.setHeader('Set-Cookie', cookie.serialize('token', token, { 
    httpOnly: true, 
    path: '/', 
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax'
  }));
  
  return res.status(200).json({ ok: true, user: { id: admin.id, name: admin.name, email: admin.email } });
}

