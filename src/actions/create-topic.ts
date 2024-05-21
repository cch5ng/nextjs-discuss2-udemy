'use server';

import { revalidatePath } from 'next/cache';
import { Topic } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '@/db';
import { auth } from '@/auth';
import paths from '@/paths';

const createTopicSchema = z.object({
  name: z.string().min(3).regex(/^[a-z-0-9]+$/, {message: 'Must be lowercase letters or dashes without spaces'}),
  description: z.string().min(10),
})

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  }
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {

  //forced delay in order to test/demo the spinning loader on nextui button (form submit)
  //await new Promise(resolve => setTimeout(resolve, 2500))

  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description')
  })

  console.log('result', result);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    };
    //console.log('error', result.error.flatten().fieldErrors)
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this.'],
      }
    }
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description  
      }
    })
  } catch(err: unknown) {
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

  revalidatePath('/');
  //redirect throws error
  redirect(paths.topicShow(topic.slug))

}

/*
  const name = formData.get('name');
  const description = formData.get('description');

  //TODO form validation 
  console.log('name', name);
  console.log('description', description);
*/

/*

  if (result.success) {

*/