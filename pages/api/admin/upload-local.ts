// pages/api/admin/upload-local.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { getTokenFromReq } from '../../../lib/auth';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Auth: admin via JWT
  const user = getTokenFromReq(req as any);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 3 * 1024 * 1024, // 3MB
  });

  form.parse(req as any, async (err, fields, files) => {
    if (err) {
      console.error('formidable error', err);
      return res.status(400).json({ error: 'File parse error' });
    }

    const file = files.file;
    if (!file) return res.status(400).json({ error: 'File is required' });

    try {
      const uploadedFile = Array.isArray(file) ? file[0] : file;
      const oldPath = uploadedFile.filepath;
      const originalFilename = uploadedFile.originalFilename || 'image';
      const ext = path.extname(originalFilename);
      const timestamp = Date.now();
      const newFilename = `${timestamp}-${originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const newPath = path.join(uploadDir, newFilename);

      // Move file to final location
      fs.renameSync(oldPath, newPath);

      const publicUrl = `/uploads/${newFilename}`;
      return res.status(200).json({ url: publicUrl });
    } catch (e) {
      console.error('File upload error', e);
      return res.status(500).json({ error: 'Upload failed' });
    }
  });
}

