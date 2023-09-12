"use server";

import prisma from "@/lib/prisma";
import { cleanup } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createNotes(
  title: string,
  text: string,
  tags: string[],
  images: string[],
  authorId: string,
  path: string,
) {
  await prisma.post.create({
    data: {
      title: title,
      text: cleanup(text),
      tags: tags,
      images: images,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });

  revalidatePath(path);
}

export async function updateTagsCount(tags: string[]) {
  for (let tag in tags) {
    // check exists
    console.log(tags[tag]);
    const tagExist = await prisma.tagsFrequencies.findUnique({
      where: {
        tag: tags[tag],
      },
    });
    // update
    console.log(tagExist);
    if (tagExist) {
      await prisma.tagsFrequencies.update({
        where: {
          tag: tags[tag],
        },
        data: {
          count: tagExist.count + 1,
        },
      });
    } else {
      await prisma.tagsFrequencies.create({
        data: {
          tag: tags[tag],
          count: 1,
        },
      });
    }
  }
}

export async function createThread(
  text: string,
  authorId: string,
  path: string,
) {
  await prisma.post.create({
    data: {
      text: cleanup(text),
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });

  revalidatePath(path);
}

export async function replyToThread(
  text: string,
  authorId: string,
  threadId: string,
  path: string,
) {
  await prisma.post.create({
    data: {
      text: cleanup(text),
      author: {
        connect: {
          id: authorId,
        },
      },
      parent: {
        connect: {
          id: threadId,
        },
      },
    },
  });

  revalidatePath(path);
}

export async function repostThread(
  id: string,
  reposterId: string,
  path: string,
) {
  await prisma.repost.create({
    data: {
      post: {
        connect: {
          id,
        },
      },
      reposter: {
        connect: {
          id: reposterId,
        },
      },
    },
  });

  revalidatePath(path);
}

export async function deleteThread(id: string, path: string) {
  // ! navigate back to home if on dedicated page for this thread & its deleted

  await prisma.post.update({
    where: {
      id,
    },
    data: {
      likes: {
        deleteMany: {},
      },
      children: {
        deleteMany: {},
      },
    },
    include: {
      likes: true,
    },
  });

  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath(path);
}

export async function likeThread(id: string, userId: string, path: string) {
  await prisma.likes.create({
    data: {
      post: {
        connect: {
          id,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  await prisma.post.update({
    where: {
      id,
    },
    data: {
      likes: {
        connect: {
          postId_userId: {
            postId: id,
            userId,
          },
        },
      },
    },
  });

  revalidatePath(path);
}

export async function unlikeThread(id: string, userId: string, path: string) {
  await prisma.likes.delete({
    where: {
      postId_userId: {
        postId: id,
        userId,
      },
    },
  });

  revalidatePath(path);
}
