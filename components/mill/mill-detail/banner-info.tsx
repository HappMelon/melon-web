import { GroupIcon } from "@/components/icon/group-icon";
import { ForumIcon } from "@/components/icon/forum-icon";
import { ReplayIcon } from "@/components/icon/replay-icon";
import { MillFollowButton } from "../mill-follow-button";
import { Prisma } from "@prisma/client";
import { nFormatter, timeSince } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { getFollowingMills } from "@/lib/actions";
import { UpdateMillDialog } from "@/components/mill/update-mill-dialog";

export async function BannerInfo({
  mill,
}: {
  mill: Prisma.MillGetPayload<{
    include: {
      _count: {
        select: {
          posts: true;
          subscribers: true;
        };
      };
    };
  }>;
}) {
  const user = await currentUser();
  const mills = await getFollowingMills(mill.id);
  const isFollowing = !!mills.length;
  const isOwner = mill.ownerId === user?.id;

  return (
    <div className="relative">
      <img
        src="/mill-bg.png"
        className="w-full rounded-2xl object-cover h-52 absolute left-0 top-0"
        alt=""
      />
      <div className="h-52 relative pt-10 flex justify-between w-full px-10">
        <div className="w-full left-0 justify-between items-start gap-6 inline-flex">
          <img className="w-28 h-28 rounded-2xl" src="/mill-bg.png" />
          <div className="flex-col w-full justify-start items-start gap-3 inline-flex">
            <div className="flex w-full justify-between ">
              <div className="text-white text-xl font-medium font-['PingFang SC'] leading-7">
                {mill.name}
              </div>
              {user && isOwner ? (
                <UpdateMillDialog initMill={mill} />
              ) : (
                <MillFollowButton isFollowing={isFollowing} millId={mill.id} />
              )}
            </div>

            <div className="self-stretch justify-start items-start inline-flex">
              <div className="justify-start items-start gap-2.5 flex">
                <div className="text-slate-100 text-sm font-normal font-['PingFang SC'] line-clamp-3  max-w-[400px] leading-tight">
                  {mill.bio}
                </div>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className=" pt-5 left-0 top-[2px] justify-start items-center gap-4 inline-flex">
                {mill.topics.slice(0, 3).map((i) => (
                  <div
                    key={i}
                    className="text-white text-sm font-medium font-['PingFang SC'] leading-tight"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="pt-6  top-0  justify-end items-center gap-4 inline-flex">
                <div className="justify-start items-center gap-1 flex">
                  <GroupIcon fill="#FEFBFF" />
                  <div className="text-white text-sm font-medium font-['PingFang SC'] leading-tight">
                    {mill._count.subscribers}
                  </div>
                </div>
                <div className="justify-start items-center gap-1 flex">
                  <ForumIcon fill="#FEFBFF" />
                  <div className="text-white text-sm font-medium font-['PingFang SC'] leading-tight">
                    {nFormatter(mill._count.posts, 1)}
                  </div>
                </div>
                <div className="justify-start items-center gap-1 flex">
                  <ReplayIcon fill="#FEFBFF" />
                  <div className="text-white text-sm font-medium font-['PingFang SC'] leading-tight">
                    {timeSince(mill.createdAt)} ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
