import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const sitemapPath = join(process.cwd(), 'dist', 'sitemap.xml');
    const sitemap = readFileSync(sitemapPath, 'utf8');
    
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new Response('Sitemap not found', { status: 404 });
  }
}