import { NextApiRequest, NextApiResponse } from 'next';
import * as cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', cookie.serialize('token', '', { 
    httpOnly: true, 
    path: '/', 
    maxAge: 0 
  }));
  res.status(200).json({ ok: true });
}

