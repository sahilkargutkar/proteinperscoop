import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Try external API first
    let url = process.env.NODE_ENV === 'development' ? `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/deals/categories` : `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/deals/categories`;

    let response;
    try {
      response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${process.env.PROTEIN_API_TOKEN}`
        },
        timeout: 5000 // 5 second timeout
      });
    } catch (externalError) {
      console.log('External API failed, trying local API...', externalError);
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

