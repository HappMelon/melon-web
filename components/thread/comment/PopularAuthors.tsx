import FollowButton from "@/components/profile/follow";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import NotSigninFollowButton from "../FollowButton";

export default async function PopularAuthors() {
  const foo = await prisma.user.findMany({
    take: 10,
    orderBy: {
      followedBy: {
        _count: "desc",
      },
    },
    include: {
      followedBy: true,
    },
  });

  const u = await currentUser();

  const getSelf = u
    ? await prisma.user.findUnique({
        where: {
          id: u!.id,
        },
      })
    : null;

  return (
    <div className="w-full h-auto mt-[1.875rem] pb-[1.75rem] bg-white rounded-[.625rem] px-2 2xl:px-6">
      <div className="flex items-center justify-center pt-[2rem]">
        <div className="text-lg font-bold">Popular Authors</div>
        <img src="/🦆 icon _arrow back_.svg" alt="" className="pl-[.375rem]" />
      </div>
      <div className="">
        {foo.map((user) => {
          if (getSelf?.id === user.id) return null;

          return (
            <div
              key={user.id}
              className="flex items-center justify-between mt-[1.5rem]"
            >
              <div className="flex">
                <Link
                  className="w-[1.75rem] mr-1 2xl:mr-2"
                  href={`/profile/${user.id}`}
                >
                  <img
                    src={user.image}
                    alt={user.username}
                    className="w-[1.75rem] h-[1.75rem] rounded-full cursor-pointer"
                  />
                </Link>
                <h3 className="text-base font-bold">
                  {user.username.length > 9
                    ? user.username.substring(0, 6) + "..."
                    : user.username}
                </h3>
              </div>
              {u && getSelf ? (
                <FollowButton
                  enableScaleSize
                  id={getSelf!.id}
                  followingId={user!.id}
                  name={user!.username}
                  isFollowing={user.followedBy.some(
                    (user) => user.id === getSelf!.id,
                  )}
                />
              ) : (
                <NotSigninFollowButton />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
