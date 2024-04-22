"use client";

import Like from "@/components/thread/controls/like";
import NameLink from "@/components/thread/nameLink";
import { Color, timeSince } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/avatar/avatar";
import markdownToTxt from "markdown-to-txt";

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

  console.log("data.images", data.images);

  return (
    <div className="bg-[#F4F4F4] px-[1rem] py-[1.25rem] rounded-xl min-w-[13rem]">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center flex-wrap">
          <div onClick={() => router.push(`/profile/${data.author.id}`)}>
            <Avatar
              src={data.author.image}
              alt={data.author.name + "'s profile image"}
            ></Avatar>
          </div>
          <div className="pl-[.625rem]">
            <NameLink id={data.author.id} username={data.author.name} />
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
            <h1 className="text-lg font-[550] my-2 line-clamp-1">
              {data.title}
            </h1>

            <div className="line-clamp-1 text-[#9B9B9B]">
              {markdownToTxt(data.text.slice(0, 30))}
            </div>

            {data.images.length > 0 ? (
              <img
                src={data.images[0]}
                alt=""
                className="w-[20rem] aspect-square max-h-[20rem] object-cover !rounded-[1rem] mt-[1.25rem]"
              />
            ) : (
              <div className="relative w-full mx-auto max-h-[20rem]  object-cover !rounded-[1rem] mt-[1.25rem] border flex justify-center items-center text-xl font-semibold">
                <div className="z-10 text-white flex line-clamp-2 h-full justify-center items-center p-3 w-full aspect-square">
                  {data.title}
                </div>
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
