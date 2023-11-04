import { TopicsAndAuthors } from "@/components/thread/comment/TopicsAndAuthors";
import HomePosts from "@/components/thread/homePosts";
import NoLoginTrade from "@/components/thread/noLoginTrade";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

const TAKE_NUM = 10;

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await currentUser();
  const defaultPosts =
    searchParams?.q && typeof searchParams.q === "string"
      ? await prisma.post.findMany({
          take: TAKE_NUM + 1,
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
            OR: [
              {
                title: {
                  contains: searchParams.q,
                  mode: "default",
                },
              },
              {
                text: {
                  contains: searchParams.q,
                  mode: "insensitive",
                },
              },
            ],
          },
        })
      : await prisma.post.findMany({
          take: TAKE_NUM + 1,
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
    <div className="flex gap-1 2xl:gap-2 box-border pl-[1.875rem] ">
      <div className="flex-1">
        {user ? (
          <HomePosts
            searchQuery={searchParams?.q as string}
            posts={defaultPosts.slice(0, TAKE_NUM)}
            follows={defaultPosts}
          />
        ) : (
          <NoLoginTrade posts={defaultPosts}></NoLoginTrade>
        )}
      </div>
      <div className="relative pl-2 w-[16rem] pb-4 2xl:w-[25rem] text-center flex flex-col">
        <div className=" top-[5rem]">
          <TopicsAndAuthors />
        </div>
      </div>
    </div>
  );
}
