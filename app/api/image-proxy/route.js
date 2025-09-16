import { NextResponse } from 'next/server';

// In-memory cache for frequently accessed images
const imageCache = new Map();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  const width = parseInt(searchParams.get('w')) || 400;
  const quality = parseInt(searchParams.get('q')) || 75;
  const format = searchParams.get('f') || 'auto';

  if (!imageUrl) {
    return new NextResponse('Missing image URL', { status: 400 });
  }

  // Decode the URL if it's URL-encoded
  let decodedImageUrl;
  try {
    decodedImageUrl = decodeURIComponent(imageUrl);
    // If it's still encoded, decode again
    if (decodedImageUrl.includes('%')) {
      decodedImageUrl = decodeURIComponent(decodedImageUrl);
    }
  } catch (error) {
    console.error('URL decode error:', error);
    decodedImageUrl = imageUrl;
  }

  console.log('Image proxy request:', { original: imageUrl, decoded: decodedImageUrl });

  // Check cache first
  const cacheKey = `${decodedImageUrl}-${width}-${quality}-${format}`;
  const cached = imageCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return new NextResponse(cached.buffer, { 
      headers: {
        'Content-Type': cached.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Cache': 'HIT',
      }
    });
  }

  try {
    // Fetch with timeout and optimized headers
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(decodedImageUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/webp,image/avif,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Cache the result
    imageCache.set(cacheKey, {
      buffer: imageBuffer,
      contentType,
      timestamp: Date.now()
    });

    // Clean up old cache entries periodically
    if (imageCache.size > 100) {
      const now = Date.now();
      for (const [key, value] of imageCache) {
        if (now - value.timestamp > CACHE_DURATION) {
          imageCache.delete(key);
        }
      }
    }

    // Optimized headers for faster subsequent loads
    const headers = new Headers({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'CDN-Cache-Control': 'public, max-age=31536000',
      'Vercel-CDN-Cache-Control': 'public, max-age=31536000',
      'X-Cache': 'MISS',
      'Vary': 'Accept',
    });

    return new NextResponse(imageBuffer, { headers });

  } catch (error) {
    console.error('Image proxy error:', error);
    
    // Return a simple 1x1 transparent pixel as fallback
    const transparentPixel = Buffer.from([
      0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00, 0x00, 0xff, 0xff, 0xff,
      0x00, 0x00, 0x00, 0x21, 0xf9, 0x04, 0x01, 0x00, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x00,
      0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x04, 0x01, 0x00, 0x3b
    ]);

    return new NextResponse(transparentPixel, {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }
}
