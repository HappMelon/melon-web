"use client";

import Like from "@/components/thread/controls/like";
import NameLink from "@/components/thread/nameLink";
import { Color, timeSince } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function Item({
  data,
  comment = false,
  posts,
  noLink = false,
  parent = false,
}: {
  data: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>;
  comment?: boolean;
  posts?: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>[];
  noLink?: boolean;
  parent?: boolean;
}) {
  const router = useRouter();
  const likes = data.likes.map((like) => like.userId);
  const colors = Color();

  return (
    <div className="bg-[#F4F4F4] px-[1rem] py-[1.25rem] rounded-xl">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <div onClick={() => router.push(`/profile/${data.author.id}`)}>
            <Image
              width={30}
              height={30}
              src={data.author.image}
              className="rounded-[3.125rem]"
              alt={data.author.name + "'s profile image"}
            />
          </div>
          <div className="pl-[.625rem]">
            <NameLink username={data.author.name} name={data.author.username} />
          </div>
          <div className="pl-[.625rem] font-medium text-[.75rem] text-[#9B9B9B]">
            · {timeSince(data.createdAt)} ago
          </div>
        </div>
        <div className="flex items-center">
          <Like
            likes={likes}
            numPosts={posts ? posts.length : -1}
            post={data.id}
          />
          {/* show likes count */}
          <div className="pl-[.5rem] text-[#9B9B9B]">
            {data.likes.length > 0 ? <div>{data.likes.length}</div> : 0}
          </div>
        </div>
      </div>
      <div className="w-full">
        {/* link to post page */}
        <Link href={`/t/${data.id}`}>
          <div
            className={
              comment
                ? "text-base/relaxed pb-3 text-left"
                : "text-base/relaxed text-left"
            }
          >
            <h1 className="text-lg font-[550] my-2">{data.title}</h1>
            <ReactMarkdown className="overflow-ellipsis text-[#9B9B9B]">
              {data.text}
            </ReactMarkdown>
            {data.tags ? (
              <div className="flex flex-wrap gap-[.625rem] pt-[.625rem]">
                {data.tags.map((tag, index) => (
                  <Link
                    href={`/tag/${tag}`}
                    style={{
                      color: colors[index],
                      background: `${colors[index]}10`,
                    }}
                    key={tag}
                    className="bg-[#EAEAEA] rounded-[10px] px-2 py-1 text-sm"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            ) : (
              ""
            )}
            {/* show picture if not exists show the title like picture*/}
            {data.images.length > 0 ? (
              <img
                src={data.images[0]}
                alt=""
                className="w-[20rem] h-[20rem] object-cover !rounded-[1rem] mt-[1.25rem]"
              />
            ) : (
              <div className="relative max-w-[19rem] mx-auto h-[19rem] object-cover !rounded-[1rem] mt-[1.25rem] border flex justify-center items-center text-xl font-semibold">
                <div className="z-10 text-white p-3">{data.title}</div>
                <img
                  src="/item-bg.png"
                  className="w-full absolute top-0 left-0 z-0"
                  alt=""
                />
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
