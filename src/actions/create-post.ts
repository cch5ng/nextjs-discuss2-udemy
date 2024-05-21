'use server';

import { revalidatePath } from 'next/cache';
import { Post } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '@/db';
import { auth } from '@/auth';
import paths from '@/paths';

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
})

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  }
}


export async function createPost(
  slug: string, //passed in through bind
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content')
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      }
    }
  }

  const topic = await db.topic.findFirst({
    where: { slug }
  })

  if (!topic) {
    return {
      errors: {
        _form: ['The topic could not be found']
      }
    }
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id
      }
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong. Domo arigato mr roboto.']
        }
      }
    }
  }

  //TODO revalidate the Topic Show page (avoid caching the list of posts)
  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id))
}
