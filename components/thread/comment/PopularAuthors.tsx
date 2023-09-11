import FollowButton from "@/components/profile/follow";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

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

  const user = await currentUser();

  if (!user) return null;

  const getSelf = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return (
    <div className="w-[21.875rem] h-auto mt-[1.875rem] pb-[1.75rem] bg-white rounded-[.625rem]">
      <div className="flex items-center pt-[1.875rem] pl-[1.75rem]">
        <div className="text-lg font-bold">Popular Authors</div>
        <img src="/🦆 icon _arrow back_.svg" alt="" className="pl-[.375rem]" />
      </div>
      <div className="ml-[1.5625rem] mr-[1.6875rem] mt-[1.375rem] pt-[1.375rem]">
        {foo.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between mt-[1.25rem]"
          >
            <div className="flex">
              <img
                src={user.image}
                alt={user.username}
                className="w-[2.25rem] h-[2.25rem] rounded-full"
              />
              <h3 className="text-base font-bold pl-[.625rem]">
                {user.username}
              </h3>
            </div>
            <FollowButton
              id={getSelf!.id}
              followingId={user!.id}
              name={user!.username}
              isFollowing={
                user!.followedBy.filter((user) => user.id === getSelf!.id)
                  .length > 0
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
