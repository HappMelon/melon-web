"use server";

import prisma from "@/lib/prisma";

// update Post views
export async function updateViews(id: string) {
  const views = await prisma.post.update({
    where: { id },
    data: { views: { increment: 1 } },
  });
  return views;
}

// update Post reposts
export async function reposts(id: string) {
  const reposts = await prisma.post.update({
    where: { id },
    data: { reposts: { increment: 1 } },
  });
  return reposts;
}
