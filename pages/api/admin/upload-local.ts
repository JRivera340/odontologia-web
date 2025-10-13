// pages/api/admin/upload-local.ts
// HYBRID UPLOAD: Uses Cloudinary if configured, falls back to local storage
import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { getTokenFromReq } from '../../../lib/auth';

export const config = {
  api: { bodyParser: false },
};

// Check if Cloudinary is configured
const isCloudinaryConfigured = () => {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

// Configure Cloudinary if available
if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('✅ Cloudinary configured - using cloud storage');
} else {
  console.log('⚠️ Cloudinary not configured - using local storage (not recommended for production)');
}

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

    const uploadedFile = Array.isArray(file) ? file[0] : file;
    const filepath = uploadedFile.filepath;

    try {
      // STRATEGY: Use Cloudinary if configured, otherwise local storage
      if (isCloudinaryConfigured()) {
        // PRODUCTION: Upload to Cloudinary (scalable)
        console.log('📤 Uploading to Cloudinary...');
        const uploadResult = await cloudinary.uploader.upload(filepath, {
          folder: 'odontologia/services',
          use_filename: true,
          unique_filename: true,
          resource_type: 'image',
        });
        
        // Clean up temp file
        try { fs.unlinkSync(filepath); } catch (e) { /* ignore */ }
        
        console.log('✅ Uploaded to Cloudinary:', uploadResult.secure_url);
        return res.status(200).json({ 
          url: uploadResult.secure_url,
          storage: 'cloudinary'
        });
      } else {
        // DEVELOPMENT: Save locally (simple, no config needed)
        console.log('📁 Saving to local storage...');
        const originalFilename = uploadedFile.originalFilename || 'image';
        const timestamp = Date.now();
        const newFilename = `${timestamp}-${originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const newPath = path.join(uploadDir, newFilename);

        // Move file to final location
        fs.renameSync(filepath, newPath);

        const publicUrl = `/uploads/${newFilename}`;
        console.log('✅ Saved locally:', publicUrl);
        return res.status(200).json({ 
          url: publicUrl,
          storage: 'local'
        });
      }
    } catch (e) {
      console.error('Upload error:', e);
      // Clean up temp file on error
      try { fs.unlinkSync(filepath); } catch (cleanupErr) { /* ignore */ }
      return res.status(500).json({ error: 'Upload failed' });
    }
  });
}

