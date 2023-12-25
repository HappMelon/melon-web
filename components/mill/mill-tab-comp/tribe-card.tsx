import Image from "next/image";
import { MillFollowButton } from "@/components/mill/mill-follow-button";
import Link from "next/link";
import { ReplayIcon } from "@/components/icon/replay-icon";
import { ForumIcon } from "@/components/icon/forum-icon";
import { GroupIcon } from "@/components/icon/group-icon";
import { Prisma } from "@prisma/client";
import { timeSince } from "@/lib/utils";
import { getFollowingMills } from "@/lib/actions";
import { currentUser } from "@clerk/nextjs";
import { UpdateMillDialog } from "@/components/mill/update-mill-dialog";
export async function TribeCard({
  data,
}: {
  data: Prisma.MillGetPayload<{
    include: {
      _count: {
        select: {
          posts: true;
          subscribers: true;
        };
      };
      posts: {
        take: 1;
      };
    };
  }>;
}) {
  const followings = await getFollowingMills(data.id);
  const user = await currentUser();
  return (
    <>
      <Link
        href={`/mill/${data.id}${
          data.posts.length ? "/" + data.posts[0].id : ""
        }`}
        className="flex h-[7.5rem] cursor-pointer bg-[#F8F8F8] rounded-r-xl items-center"
      >
        <div className="relative rounded-r-xl bg-white h-full aspect-square shrink-0">
          <Image alt="" className="rounded-xl" fill src="/item-bg.png"></Image>
        </div>

        <div className="flex py-3 flex-col relative pl-4 flex-1">
          <div className="flex gap-3 items-center pb-0.5">
            <div className="text-[1.375rem] line-clamp-1 ">
              {data.name || " "}{" "}
            </div>
            <div className="gap-2 justify-start items-start inline-flex">
              {data.topics.slice(0, 3).map((topic, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded-sm text-zinc-600 bg-[#F0F0FA] text-xs font-medium font-['PingFang SC'] shrink-0 leading-none"
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>
          <div className="text-sm pb-1 text-[#8F909A] line-clamp-2">
            {data.bio || "No bio"}
          </div>

          <div className="flex justify-between pr-2">
            <div className="py-1 flex items-center gap-3 text-[#5D5E67]">
              <div className="flex items-center gap-1">
                <GroupIcon fill="#5D5E67" />
                <div className="text-zinc-600 text-xs font-medium font-['PingFang SC'] leading-none">
                  {data._count.subscribers}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <ForumIcon fill="#5D5E67" />
                <div className="text-zinc-600 text-xs font-medium font-['PingFang SC'] leading-none">
                  {data._count.posts}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <ReplayIcon fill="#5D5E67" />
                <div className="text-zinc-600 text-xs font-medium font-['PingFang SC'] leading-none">
                  {timeSince(data.createdAt)} ago
                </div>
              </div>
            </div>
            <div>
              {user?.id === data.ownerId ? (
                <UpdateMillDialog initMill={data} />
              ) : (
                <MillFollowButton
                  isFollowing={!!followings.length}
                  millId={data.id}
                />
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
