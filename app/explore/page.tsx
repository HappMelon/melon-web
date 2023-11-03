import { TopicsAndAuthors } from "@/components/thread/comment/TopicsAndAuthors";
import HomePosts from "@/components/thread/homePosts";
import NoLoginTrade from "@/components/thread/noLoginTrade";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await currentUser();

  const defaultPosts = searchParams?.q
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
          OR: {
            title: {
              contains: searchParams.q as string,
            },
            text: {
              contains: searchParams.q as string,
              mode: "insensitive",
            },
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

  // Following
  const follows = user
    ? await prisma.user.findUnique({
        where: {
          id: user?.id,
        },
        include: {
          following: true,
        },
      })
    : null;

  const followPosts = searchParams?.q
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
          authorId: {
            in: follows?.following.map((follow) => follow.id),
          },
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
          authorId: {
            in: follows?.following.map((follow) => follow.id),
          },
          parent: null,
        },
      });

  return (
    <div className="flex gap-1 2xl:gap-2 box-border pl-[1.875rem] ">
      <div className="flex-1">
        {user ? (
          <HomePosts posts={defaultPosts} follows={followPosts}></HomePosts>
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
