import { getCategorySlug } from '@/app/utils/helpers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Extract category from query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const selectedCategory = getCategorySlug(category);

    // Try local API first, then fallback to external API
    let url = process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/deals?category=${selectedCategory}` : `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/deals?category=${selectedCategory}`;
    
    let response;
    try {
      response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${process.env.PROTEIN_API_TOKEN}`
        },
        timeout: 5000 // 5 second timeout
      });
    } catch (localError) {
      console.error('Local API request failed:', localError);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch deals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deals', details: error.message },
      { status: 500 }
    );
  }
}