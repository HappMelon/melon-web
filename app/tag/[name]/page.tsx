import { redirect } from "next/navigation";
import { BackIcon } from "@/components/common/backIcon";
import TrendNote from "@/components/thread/trendNote";
import prisma from "@/lib/prisma";

export default async function ProfilePage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = params;
  if (!name) {
    redirect("/");
  }
  const tag = decodeURI(name);

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
      tags: {
        hasSome: [tag],
      },
    },
  });

  return (
    <div className="w-full pl-[1.875rem]">
      <div className="bg-white rounded-[.9375rem] p-[1.875rem]">
        <BackIcon title={tag} />
        <TrendNote posts={posts}></TrendNote>
      </div>
    </div>
  );
}
