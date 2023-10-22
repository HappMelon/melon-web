"use client";

import Commit from "@/components/t/Commit";
import NoCommit from "@/components/t/noCommit";
import { Separator } from "@/components/ui/separator";
import { updateViews } from "@/lib/actions/index";
import { Color, timeSince } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import MoreMenu from "./moreMenu";
import NameLink from "./nameLink";
import Link from "next/link";
import { Avatar } from "@/components/avatar/avatar";
import dynamic from "next/dynamic";
// @ts-ignore
import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false },
);

export default function MainItem({
  data,
  comment = false,
  posts,
  avatar,
}: {
  avatar?: string;
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
  const colors = Color();
  updateViews(data.id);

  return (
    <div className="pt-[0.9375rem] flex flex-col px-[1.875rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar
            size={36}
            src={data.author.image}
            alt={data.author.name + "'s profile image"}
          ></Avatar>

          <div className="pl-[.8125rem]">
            <div className="font-[550] text-[1rem]">
              <NameLink id={data.author.id} username={data.author.name} />
            </div>
            <div className="font-[550] text-[.875rem] flex items-center">
              <div>@{data.author.username}</div>
              <div className="pl-[.5rem] font-medium text-[.75rem] text-[#9B9B9B]">
                · {timeSince(data.createdAt)} ago
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <MoreMenu
            name={data.author.name}
            id={data.id}
            author={data.author.id}
          />
        </div>
      </div>
      {/* content of note */}
      <div className="w-full pt-[1.6875rem]">
        <div className="text-[1.75rem] font-bold">{data.title}</div>
        {!!data.images.length && (
          <ImageGallery
            showPlayButton={false}
            items={data.images.map((i) => ({ original: i, thumbnail: i }))}
          />
        )}

        {/*{ <img src={} className='w-full py-2' alt=""/>}*/}
        <div data-color-mode="light">
          <MarkdownPreview
            className={"bg-white"}
            style={{ background: "white !important" }}
            source={data.text}
          />
        </div>

        {/* Tags */}
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
        <Separator className="mt-[1rem]" />
        <div className="pt-[2.25rem] h-[auto]">
          <div className="text-[1.25rem] font-bold">Comments</div>
          {data?.children ? "" : <NoCommit />}
        </div>
        {data?.children ? "" : <Separator />}
        <Commit avatar={avatar} data={data} />
      </div>
    </div>
  );
}
