"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";

export async function CreateMill(params: {
  name: string;
  bio: string;
  ownerId: string;
  path: string;
  avatar: string;
  cost: number;
  topics: string[];
}) {
  const { name, bio, topics, ownerId, path, cost, avatar } = params;
  const mill = prisma.mill.create({
    data: {
      name,
      bio,
      topics,
      owner: {
        connect: {
          id: ownerId,
        },
      },
      cost,
      image: avatar,
    },
  });
  revalidatePath(path);
  return mill;
}

export async function UpdateMill(params: {
  id: string;
  name: string;
  bio: string;
  path: string;
  avatar: string;
  cost: number;
  topics: string[];
}) {
  const { name, bio, topics, path, cost, avatar, id } = params;
  await prisma.mill.update({
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

export async function followMill(
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

export async function unFollowMill(
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

export async function getFollowingMills(millId?: string) {
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
