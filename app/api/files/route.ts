import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession();
  
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const files = await prisma.file.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    });
    return NextResponse.json(files);
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession();
  
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { title, url } = await req.json();
    const file = await prisma.file.create({
      data: {
        title,
        url,
        userId: (session.user as any).id
      }
    });
    return NextResponse.json(file);
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
}