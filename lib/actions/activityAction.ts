"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function CreateActivity(params: { path: string }) {
  const { path } = params;
  const activity = prisma.popular.create({
    data: {
      name: "糗事大爆炸",

      startTime: new Date("2024.4.10"),
      endTime: new Date("2024.5.10"),

      // startTime: new Date("2024.2.30"),
      // endTime: new Date("2024.3.30"),

      // startTime: new Date("2024.11.20"),
      // endTime: new Date("2024.11.30"),
    },
  });
  revalidatePath(path);
  return activity;
}

export async function GetActivities() {
  const activity = await prisma.popular.findMany();
  return activity;
}
export async function GetActivity(id: string, skip = 0) {
  const activity = await prisma.popular.findUnique({
    where: {
      id,
    },
    include: {
      post: {
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: 6,
        include: {
          author: true,
          parent: true,
          likes: true,
          children: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  });
  return activity;
}

export async function AttendActividy(params: { path: string }) {
  const { path } = params;
}

export async function GetAttends() {
  const activity = await prisma.popular.findMany();
  return activity;
}
