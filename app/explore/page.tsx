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
    <div className="flex w-full box-border pl-[1.875rem] h-[100%]">
      {/* 根据用户是否登陆显示不一样的Trade页面 */}
      {user ? (
        <>
          <HomePosts posts={defaultPosts} follows={followPosts}></HomePosts>
        </>
      ) : (
        <>
          <NoLoginTrade posts={defaultPosts}></NoLoginTrade>
        </>
      )}
      <TopicsAndAuthors />
    </div>
  );
}
