import type { Comment } from "@prisma/client";
import { cache } from 'react';
import { notFound } from "next/navigation";
import { db } from "@/db";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null};
};

export const fetchCommentsByPostId = cache((postId: string): Promise<CommentWithAuthor[]>  => {
  return db.comment.findMany({
    where: {postId},
    include: {
      user: {
        select: {name: true, image: true}
      }
    }
  });
  //QUESTION why you don't use async/await here
  //do you not need to handle error here? if nothing returned from db?
})
