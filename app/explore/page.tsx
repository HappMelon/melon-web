import Index from "@/components/layouts/AppLayout";
import HomePosts from "@/components/thread/homePosts";
import prisma from "@/lib/prisma";

export default async function Page() {
  const posts = await prisma.post.findMany({
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
    <Index>
      <HomePosts posts={posts} />
    </Index>
  );
}
