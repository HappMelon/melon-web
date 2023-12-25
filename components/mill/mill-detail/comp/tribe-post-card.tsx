"use client";

import Image from "next/image";
import { Color } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";

const colors = Color();
const tags = ["coinbase", "crypto"];

export function TribePostCard({
  data,
}: {
  data: Prisma.PostGetPayload<{
    include: {
      author: {
        select: {
          id: true;
          username: true;
          image: true;
        };
      };
    };
  }>;
}) {
  const router = useRouter();
  const params = useParams();

  return (
    <Link
      href={`${data.id}`}
      className={`${
        params.postId !== data.id ? "bg-[#F1F2F2]" : "bg-[#FEE14033]"
      } flex rounded-2xl px-[1.8rem] cursor-pointer py-[1.5rem] relative`}
    >
      <div className="w-[90%] absolute h-36 bg-white bg-opacity-60 rounded-lg blur-lg" />
      <div className="z-[2] relative">
        <div className="flex gap-2 items-center">
          <Image
            src={data.author.image}
            width={24}
            height={24}
            alt={""}
            className={"rounded-full shrink-0"}
          ></Image>
          <div className="text-[0.875rem]">{data.author.username}</div>
          <div className="text-[#00000099] text-[0.75rem]">2 days ago</div>
        </div>
        <div className="font-semibold leading-7 line-clamp-4 my-1">
          {data.title}
        </div>
        {data.tags.map((tag, index) => (
          <div
            onClick={() => router.push(`/tag/${tag}`)}
            style={{
              color: colors[index],
              background: `${colors[index]}10`,
            }}
            key={tag}
            className="bg-[#EAEAEA] rounded-[10px] px-2 py-1 text-sm mr-2 inline-block"
          >
            #{tag}
          </div>
        ))}
      </div>
    </Link>
  );
}
