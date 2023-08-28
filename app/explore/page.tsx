import HotTopics from "@/components/thread/comment/HotTopics";
import PopularAuthors from "@/components/thread/comment/PopularAuthors";
import HomePosts from "@/components/thread/homePosts";
import prisma from "@/lib/prisma";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const posts = searchParams?.q
    ? await prisma.post.findMany({
        take: 20,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
          children: {
            include: {
              author: true,
            },
          },
          parent: true,
          likes: true,
        },
        where: {
          text: {
            contains: searchParams.q as string,
            mode: "insensitive",
          },
        },
      })
    : await prisma.post.findMany({
        take: 20,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
          children: {
            include: {
              author: true,
            },
          },
          parent: true,
          likes: true,
        },
        where: {
          parent: null,
        },
      });

  return (
    <div className="flex">
      <HomePosts posts={posts}></HomePosts>
      <div className="flex flex-col">
        <HotTopics></HotTopics>
        <PopularAuthors></PopularAuthors>
      </div>
    </div>
  );
}
