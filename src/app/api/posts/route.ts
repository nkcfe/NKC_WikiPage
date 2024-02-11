import { NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const id = searchParams.get('id');
  const category = searchParams.get('category') as string;
  const yearString = searchParams.get('year');
  const monthString = searchParams.get('month');

  const whereClause: any = {
    category:
      category && category === '모든 주제' ? {} : { contains: category },
  };

  if (yearString && yearString !== '모든 연도') {
    whereClause.createdAt = {
      gte: new Date(`${yearString}-01-01`),
      lt: new Date(`${parseInt(yearString) + 1}-01-01`),
    };
  }

  if (monthString && monthString !== '모든 달') {
    const month = parseInt(monthString);
    whereClause.createdAt = {
      gte: new Date(`${yearString}-${month}-01`),
      lt: new Date(`${yearString}-${month + 1}-01`),
    };
  }

  if (page) {
    const count = await prisma.post.count({ where: whereClause });
    const skipPage = parseInt(page) - 1;
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      where: whereClause,
      skip: skipPage * Number(limit),
    });

    return NextResponse.json(
      {
        page: parseInt(page),
        data: posts,
        totalPage: Math.ceil(count / Number(limit)),
      },
      { status: 200 },
    );
  } else {
    const posts = await prisma.post.findMany({
      orderBy: { id: 'desc' },
      where: { id: id ? Number(id) : {} },
    });

    const allTitles = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
      },
    });

    const linkedPosts = posts.map((post) => {
      const linkedContent = allTitles.reduce((content, title) => {
        return content.replace(
          new RegExp(title.title, 'g'),
          `<a href="/posts/${title.id}">${title.title}</a>`,
        );
      }, post.content);

      return { ...post, content: linkedContent };
    });

    return NextResponse.json(id ? linkedPosts[0] : linkedPosts, {
      status: 200,
    });
  }
}

export async function POST(req: Request) {
  const { title, content, category } = await req.json();

  const result = await prisma.post.create({
    data: { title: title, content: content, category: category },
  });

  return NextResponse.json(result, { status: 200 });
}

export async function PUT(req: Request) {
  const { title, content, category, id } = await req.json();

  const result = await prisma.post.update({
    where: { id: Number(id) },
    data: { title: title, content: content, category: category },
  });

  return NextResponse.json(result, { status: 200 });
}
