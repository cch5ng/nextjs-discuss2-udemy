import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostWithData = (
  Post & {
    topic: { slug: string };
    user: { name: string | null };
    _count: { comments: number }
  }
)

//alt way to automate type def
//type PostWithData = Awaited<ReturnType<typeof fetchPostsByTopicSlug >>[number]

export async function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  const posts = await db.post.findMany({
    where: {
      topic: { slug }
    },
    include: {
      topic: { select: { slug: true} },
      user: { select: { name: true}},
      _count: { select: {comments: true}}
    }
  })

  return posts;
}

export async function fetchPostsBySearchTerm(term: string): Promise<PostWithData[]> {
  const topics = await db.post.findMany({
    where: {
      OR: [
        {title: {contains: term}},
        {content: {contains: term}}
      ]
    },
    include: {
      topic: { select: { slug: true} },
      user: { select: { name: true}},
      _count: { select: {comments: true}}
    }
  })

  return topics;
}

export async function fetchTopPosts(): Promise<PostWithData[]> {
  const posts = await db.post.findMany({
    orderBy: [
      {comments: {
        _count: 'desc',
      }
      }
    ],
    include: {
      topic: { select: { slug: true} },
      user: { select: { name: true}},
      _count: { select: {comments: true}}
    },
    take: 5
  })

  return posts;
}
