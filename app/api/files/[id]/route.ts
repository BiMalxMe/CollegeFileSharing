import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await prisma.file.deleteMany({
      where: {
        id: params.id,
        userId: (session.user as any).id
      }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
}