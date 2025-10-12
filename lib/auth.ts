// lib/auth.ts
import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

const SECRET = process.env.JWT_SECRET || 'dev-secret';

export function getTokenFromReq(req: NextApiRequest) {
  const raw = req.headers.cookie;
  if (!raw) return null;
  const match = raw.split(';').map(p => p.trim()).find(p => p.startsWith('token='));
  if (!match) return null;
  const token = match.split('=')[1];
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return null;
  }
}

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

