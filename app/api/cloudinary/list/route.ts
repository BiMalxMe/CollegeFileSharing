import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // Get resources of different types
    const [imageResults, videoResults, rawResults] = await Promise.all([
      cloudinary.api.resources({
        type: 'upload',
        max_results: 500,
        resource_type: 'image'
      }),
      cloudinary.api.resources({
        type: 'upload',
        max_results: 500,
        resource_type: 'video'
      }),
      cloudinary.api.resources({
        type: 'upload',
        max_results: 500,
        resource_type: 'raw'
      })
    ]);

    // Combine all resources
    const allResources = {
      resources: [
        ...imageResults.resources,
        ...videoResults.resources,
        ...rawResults.resources
      ]
    };

    return NextResponse.json(allResources);
  } catch (error) {
    console.error('Error fetching files from Cloudinary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files', details: error },
      { status: 500 }
    );
  }
} 