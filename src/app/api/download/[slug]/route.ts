import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'src', 'driveMap.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const driveMap = JSON.parse(fileContent);
  const fileId = driveMap[params.slug];
  if (!fileId) {
    return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 404 });
  }
  // Redireciona para o link real do Google Drive
  return NextResponse.redirect(
    `https://drive.usercontent.google.com/download?id=${fileId}&export=download`
  );
} 