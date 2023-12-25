import { ArrowLeft } from "lucide-react";
import { BannerInfo } from "@/components/mill/mill-detail/banner-info";
import Link from "next/link";
import { TribeTabs } from "@/components/mill/mill-detail/tribe-tabs";
import prisma from "@/lib/prisma";
import { ReactNode } from "react";
export default async function Layout({
  params,
  post,
}: {
  params: {
    id: string;
  };
  post: ReactNode;
}) {
  const { id } = params;
  const mill = await prisma.mill.findUnique({
    where: { id },
    include: {
      posts: {
        take: 100,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          posts: true,
          subscribers: true,
        },
      },
    },
  });

  if (!mill) return null;

  return (
    <div className="flex left-52 flex-col transition-all 2xl:left-72 right-8 box-border px-16 ml-6 rounded-[.9375rem] bg-white absolute top-[6.75rem] pb-10 ">
      <Link
        href="/mill"
        className="flex pt-10 pb-4 items-center gap-2 cursor-pointer"
      >
        <ArrowLeft />
        <div className="text-2xl font-[1.25rem]">{mill.name}</div>
      </Link>
      <BannerInfo mill={mill} />
      <div className="flex h-[90vh] gap-10 mt-8">
        <TribeTabs mill={mill} />
        {!!mill.posts.length && (
          <div className="flex-[2] border rounded-2xl mt-14">{post}</div>
        )}
      </div>
    </div>
  );
}
