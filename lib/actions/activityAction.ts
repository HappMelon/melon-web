"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function CreateActivity(params: { path: string }) {
  const { path } = params;
  const activity = prisma.popular.create({
    data: {
      name: "测试活动",
      startTime: new Date("2024.2.30"),
      endTime: new Date("2024.3.30"),
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

export async function AttendActividy(params: { path: string }) {
  const { path } = params;
}

export async function GetAttends() {
  const activity = await prisma.popular.findMany();
  return activity;
}
