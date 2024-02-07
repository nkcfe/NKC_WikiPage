import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const categories = await prisma.post.findMany({
      select: {
        category: true,
      },
    });
    const categorySet = new Set(
      categories.map((category) => category.category),
    );
    return NextResponse.json(Array.from(categorySet));
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
