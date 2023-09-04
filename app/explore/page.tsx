import HotTopics from "@/components/thread/comment/HotTopics";
import PopularAuthors from "@/components/thread/comment/PopularAuthors";
import HomePosts from "@/components/thread/homePosts";
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

  // follows
  const follows = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    include: {
      following: true,
    },
  });

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

  const topics = await prisma.tagsFrequencies.groupBy({
    by: ["tag"],
    orderBy: {
      _count: {
        tag: "desc",
      },
    },
    take: 10,
  });

  // 查询所有 user 中 follow 最多的 10 个
  const foo = await prisma.user.findMany({
    take: 10,
    orderBy: {
      followedBy: {
        _count: "desc",
      },
    },
    include: {
      followedBy: true,
    },
  });

  return (
    <div className="flex">
      <HomePosts posts={defaultPosts} follows={followPosts}></HomePosts>
      <div className="flex flex-col">
        <HotTopics tags={topics as unknown as string[]}></HotTopics>
        <PopularAuthors foo={foo}></PopularAuthors>
      </div>
    </div>
  );
}
