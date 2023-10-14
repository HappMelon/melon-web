import Commit from "@/components/t/Commit";
import NoCommit from "@/components/t/noCommit";
import { Separator } from "@/components/ui/separator";
import { updateViews } from "@/lib/actions/index";
import { Color, timeSince } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import MoreMenu from "./moreMenu";
import NameLink from "./nameLink";
import Link from "next/link";

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

  console.log(data);
  updateViews(data.id);

  return (
    <div className="pt-[0.9375rem] flex flex-col px-[1.875rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-neutral-600 overflow-hidden">
            <Image
              src={data.author.image}
              height={42}
              width={42}
              className=""
              alt={data.author.name + "'s profile image"}
            />
          </div>
          <div className="pl-[.8125rem]">
            <div className="font-[550] text-[1rem]">
              <NameLink
                username={data.author.username}
                name={data.author.name}
              />
            </div>
            <div className="font-[550] text-[.875rem] flex items-center">
              <div> {data.author.username}</div>
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
        <div
          className="pt-[1.4375rem]"
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></div>
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
