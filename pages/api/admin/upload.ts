// pages/api/admin/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { getTokenFromReq } from '../../../lib/auth';

export const config = {
  api: { bodyParser: false },
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Authentication: admin via JWT OR REVALIDATE_SECRET/UPLOAD_TOKEN in header
  const user = getTokenFromReq(req as any);
  const secretHeader = (req.headers['x-revalidate-token'] || req.headers['x-upload-token']) as string | undefined;
  
  if (!user && secretHeader !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Check if Cloudinary is configured
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('Cloudinary not configured. Please set CLOUDINARY_* env vars.');
    return res.status(500).json({ 
      error: 'Cloudinary not configured',
      message: 'Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.'
    });
  }

  const form = new IncomingForm({
    maxFileSize: 3 * 1024 * 1024, // 3MB
    keepExtensions: true,
  });

  form.parse(req as any, async (err, fields, files) => {
    if (err) {
      console.error('Formidable parse error:', err);
      return res.status(400).json({ error: 'File parse error', details: err.message });
    }

    // Get the uploaded file (expecting field name 'file')
    const fileField = files.file;
    if (!fileField) {
      return res.status(400).json({ error: 'File is required (field name: "file")' });
    }

    // Handle both single file and array of files
    const file: File = Array.isArray(fileField) ? fileField[0] : fileField;
    const filepath = file.filepath;

    try {
      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(filepath, {
        folder: 'odontologia/services',
        use_filename: true,
        unique_filename: true,
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 800, crop: 'limit' }, // Limit max dimensions
          { quality: 'auto:good' }, // Auto quality optimization
          { fetch_format: 'auto' } // Auto format (WebP when supported)
        ]
      });

      // Clean up temporary file
      try {
        fs.unlinkSync(filepath);
      } catch (cleanupError) {
        console.error('Error cleaning up temp file:', cleanupError);
      }

      console.log('Image uploaded successfully:', uploadResult.secure_url);

      return res.status(200).json({ 
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        size: uploadResult.bytes
      });
    } catch (uploadError: any) {
      console.error('Cloudinary upload error:', uploadError);
      
      // Clean up temp file even on error
      try {
        fs.unlinkSync(filepath);
      } catch (cleanupError) {
        // Ignore cleanup errors
      }

      return res.status(500).json({ 
        error: 'Upload failed',
        details: uploadError?.message || 'Unknown error',
        hint: 'Please check your Cloudinary credentials and configuration.'
      });
    }
  });
}

