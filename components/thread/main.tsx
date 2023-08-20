import Image from "next/image";

import { Prisma } from "@prisma/client";
import Controls from "./controls";
import MoreMenu from "./moreMenu";
import NameLink from "./nameLink";

export default function MainItem({
  data,
  comment = false,
  posts,
}: {
  data: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
          children: true;
          parent: true;
          likes: true;
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
      children: true;
      parent: true;
      likes: true;
    };
  }>[];
}) {
  return (
    <div className="px-3 py-4 space-y-3 flex flex-col border-b font-light">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-neutral-600 overflow-hidden">
            <Image
              src={data.author.image}
              height={32}
              width={32}
              className=""
              alt={data.author.name + "'s profile image"}
            />
          </div>
          <NameLink username={data.author.username} name={data.author.name} />
        </div>
        <div className="flex items-center space-x-2">
          {/* <Timestamp time={data.createdAt} /> */}
          <MoreMenu
            name={data.author.name}
            id={data.id}
            author={data.author.id}
          />
        </div>
      </div>
      <div className="w-full">
        <div
          className="text-base/relaxed text-left mb-1"
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></div>
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
              {data.likes.length} {data.likes.length === 1 ? "like" : "likes"}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
