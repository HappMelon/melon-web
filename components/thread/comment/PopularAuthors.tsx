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
    <div className="w-[21.875rem] h-auto mt-[1.875rem] pb-[1.75rem] bg-white rounded-[.625rem]">
      <div className="flex items-center pt-[2rem] pl-[1.75rem]">
        <div className="text-lg font-bold">Popular Authors</div>
        <img src="/🦆 icon _arrow back_.svg" alt="" className="pl-[.375rem]" />
      </div>
      <div className="ml-[1.75rem] mr-[1.75rem]">
        {foo.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between mt-[1.5rem]"
          >
            <div className="flex">
              <Link href={`/profile/${user.id}`}>
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-[1.75rem] h-[1.75rem] rounded-full cursor-pointer"
                />
              </Link>
              <h3 className="text-base font-bold pl-[.625rem]">
                {user.username}
              </h3>
            </div>
            {u && getSelf ? (
              <>
                {user.id !== getSelf.id && (
                  <FollowButton
                    id={getSelf!.id}
                    followingId={user!.id}
                    name={user!.username}
                    isFollowing={user.followedBy.some(
                      (user) => user.id === getSelf!.id,
                    )}
                  />
                )}
              </>
            ) : (
              <NotSigninFollowButton />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
