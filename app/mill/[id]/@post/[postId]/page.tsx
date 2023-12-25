import MainItem from "@/components/thread/main";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export default async function page({
  params,
}: {
  params: { id: string; postId: string };
}) {
  const { postId } = params;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      children: {
        include: {
          author: true,
          children: true,
          parent: true,
          likes: true,
        },
      },
      parent: true,
      likes: true,
    },
  });
  const user = await currentUser();
  if (!post) return null;
  return (
    <div>
      <MainItem avatar={user?.imageUrl} data={post} />
    </div>
  );
}
