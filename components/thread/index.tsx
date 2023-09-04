"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Controls from "./controls";
import MoreMenu from "./moreMenu";
import NameLink from "./nameLink";
import Others from "./others";

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
  const mainClass = parent
    ? "px-3 pt-4 space-x-2 flex font-light"
    : comment
    ? `space-x-2 flex font-light ${noLink ? "pointer-events-none" : ""}`
    : `px-3 py-4 space-x-2 flex border-b font-light w-[auto] bg-[#F8F8F8] rounded-[10px]  ${
        noLink ? "pointer-events-none" : ""
      }`;

  const router = useRouter();

  console.log("data:", data);

  return (
    <>
      <div className={mainClass}>
        <div className="flex flex-col items-center justify-between">
          <div
            className="w-8 h-8 mt-1 rounded-full bg-neutral-600 overflow-hidden cursor-pointer"
            onClick={() => router.push(`/${data.author.username}`)}
          >
            <Image
              src={data.author.image}
              height={32}
              width={32}
              className=""
              alt={data.author.name + "'s profile image"}
            />
          </div>
          {comment || parent ? null : <Others others={data.children} />}
        </div>
        <div className="w-full space-y-1">
          <div className="w-full flex items-center justify-between">
            <NameLink username={data.author.username} name={data.author.name} />

            {comment ? null : (
              <div className="flex items-center space-x-2">
                <MoreMenu
                  name={data.author.name}
                  id={data.id}
                  author={data.author.id}
                />
              </div>
            )}
          </div>
          <Link href={`/t/${data.id}`}>
            <div
              className={
                comment
                  ? "text-base/relaxed pb-3 text-left"
                  : "text-base/relaxed text-left"
              }
            >
              <div>{data.title}</div>
              <div dangerouslySetInnerHTML={{ __html: data.text }} />
              {data.tags ? (
                <div className="flex flex-wrap gap-1">
                  {data.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-[#EAEAEA] rounded-[10px] px-2 py-1 text-sm"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          </Link>
          {comment ? null : (
            <>
              <Controls numPosts={posts ? posts.length : -1} data={data} />
              <div className="flex text-neutral-600 items-center space-x-2">
                {data.children.length > 0 ? (
                  <div>
                    {data.children.length}{" "}
                    {data.children.length === 1 ? "reply" : "replies"}
                  </div>
                ) : null}
                {data.children.length > 0 && data.likes.length > 0 ? (
                  <div className="w-1 h-1 rounded-full bg-neutral-600" />
                ) : null}
                {data.likes.length > 0 ? (
                  <div>
                    {data.likes.length}{" "}
                    {data.likes.length === 1 ? "like" : "likes"}
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
