import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const fileExt = path.extname(file.name);
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${fileExt}`;
    
    // Relative path for URL and Absolute path for writing
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, fileName);

    // Ensure directory exists (just in case)
    await mkdir(uploadDir, { recursive: true });

    // Write file
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/${fileName}`;
    return NextResponse.json({ publicUrl });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
