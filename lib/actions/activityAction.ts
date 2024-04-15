"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";

export async function CreateActivity(params: {
  name: string;
  bio: string;
  ownerId: string;
  path: string;
  avatar: string;
  cost: number;
  topics: string[];
}) {
  const { name, bio, topics, ownerId, path, cost, avatar } = params;
  const mill = prisma.popular.create({
    data: {
      name,
      bio,
      image: "",
      //   topics,
      //   owner: {
      //     connect: {
      //       id: ownerId,
      //     },
      //   },
      //   cost,
      //   image: avatar,
    },
  });
  revalidatePath(path);
  return mill;
}

export async function UpdateActivity(params: {
  id: string;
  name: string;
  bio: string;
  path: string;
  avatar: string;
  cost: number;
  topics: string[];
}) {
  const { name, bio, topics, path, cost, avatar, id } = params;
  await prisma.popular.update({
    where: {
      id,
    },
    data: {
      topics,
      name,
      bio,
      cost,
      image: avatar,
    },
  });
  revalidatePath(path);
}

export async function followActivity(
  userId: string,
  followingId: string,
  path: string,
) {
  await prisma.millSubscriptions.create({
    data: {
      userId,
      millId: followingId,
    },
  });
  revalidatePath(path);
}

export async function unFollowActivity(
  userId: string,
  millId: string,
  path: string,
) {
  await prisma.millSubscriptions.delete({
    where: {
      millId_userId: {
        userId,
        millId: millId,
      },
    },
  });
  revalidatePath(path);
}

export async function getFollowingActivitys(millId?: string) {
  const user = await currentUser();
  if (!user) return [];

  if (millId) {
    const mill = await prisma.millSubscriptions.findUnique({
      where: {
        millId_userId: {
          millId,
          userId: user.id,
        },
      },
    });
    if (!mill) return [];
    return [mill];
  } else {
    return await prisma.millSubscriptions.findMany({
      where: {
        userId: user.id,
      },
    });
  }
}
