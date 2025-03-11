import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request: Request) {
  try {
    const { publicId, resourceType } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    // Delete the file from Cloudinary with the specified resource type
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType || 'image' // default to image if not specified
    });

    if (result.result === 'ok' || result.result === 'not found') {
      return NextResponse.json({ message: 'File deleted successfully' });
    } else {
      console.error('Cloudinary delete error:', result);
      return NextResponse.json(
        { error: 'Failed to delete file', details: result },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    return NextResponse.json(
      { error: 'Failed to delete file', details: error },
      { status: 500 }
    );
  }
} 