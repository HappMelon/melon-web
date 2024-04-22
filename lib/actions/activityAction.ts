"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function CreateActivity(params: { path: string }) {
  const { path } = params;
  const activity = prisma.popular.create({
    data: {
      name: "测试活动",
      startTime: new Date("2024.11.20"),
      endTime: new Date("2024.11.30"),
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
  // const user = await currentUser();

  // console.log("user", user);

  // prisma.popularList.create({
  //   data: {
  //     id: 1,
  //     name: " 牛总",
  //     createdAt: new Date(),
  //     message:
  //       "Coinbase has filed a formal request with the court to compel the SEC to establish clear.Coinbase has Coinbase has filed a formal request with the court to compel the SEC to establish clear.Coinbase has",
  //     views: 1000,
  //     comments: 999,
  //     collections: 100,
  //     shares: 20,
  //     // tagList: ["牛逼", "782", "属实牛逼"],
  //     // tagList: {
  //     //   create: {
  //     //     data: [
  //     //       {
  //     //         id: 1,
  //     //         text: "牛逼",
  //     //       },
  //     //       {
  //     //         id: 1,
  //     //         text: "782",
  //     //       },
  //     //       {
  //     //         id: 1,
  //     //         text: "属实牛逼",
  //     //       },
  //     //     ],
  //     //   },
  //     // }
  //     // tagList: {
  //     //   creatMany: {
  //     //     data: [
  //     //       {
  //     //         id: 1,
  //     //         name: '牛总',
  //     //         createdAt: '2023',
  //     //       },
  //     //     ],
  //     //   },
  //     // }
  //   },
  // });

  // revalidatePath(path);
}

export async function GetAttends() {
  const activity = await prisma.popular.findMany();
  return activity;
}
