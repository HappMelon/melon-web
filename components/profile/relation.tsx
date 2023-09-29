"use client";

import { Prisma } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowButton from "@/components/profile/follow";

export async function Relation({
  curUser,
  following,
  followedBy,
}: {
  curUser: Prisma.UserGetPayload<{
    include: {
      posts: true;
      likes: true;
      following: true;
      followedBy: true;
    };
  }> | null;
  following:
    | ({
        id: string;
        username: string;
        name: string;
        image: string;
        bio: string;
        onboarded: boolean;
      } & {})[]
    | undefined;
  followedBy:
    | ({
        id: string;
        username: string;
        name: string;
        image: string;
        bio: string;
        onboarded: boolean;
      } & {})[]
    | undefined;
}) {
  return (
    <div className="shrink-0 w-[22.5rem]">
      <Tabs defaultValue="Following">
        <TabsList className="flex justify-start gap-[1.5rem] mb-[1.875rem] mt-[1.0625rem] bg-white">
          <TabsTrigger value="Following" className="!bg-[#F8F8F8]">
            Following
          </TabsTrigger>
          <TabsTrigger value="Subscribers" className="!bg-[#F8F8F8]">
            Subscribers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Following">
          {!!following && following.length > 0 ? (
            <div>
              {following.map((user) => (
                <div
                  key={user!.id}
                  className="flex box-border rounded-lg shadow-[0_0_15px_2px_rgba(0,0,0,0.1)] px-[1.5625rem] py-[1.25rem] bg-white items-center justify-between mt-[1.5rem] mb-[0.9375rem]"
                >
                  <div className="flex">
                    <img
                      src={user.image}
                      alt={user.username}
                      className="w-[1.75rem] h-[1.75rem] rounded-full"
                    />
                    <h3 className="text-base font-bold pl-[.625rem]">
                      {user.username}
                    </h3>
                  </div>
                  <FollowButton
                    id={user!.id}
                    followingId={user!.id}
                    name={user!.username}
                    isFollowing={
                      curUser!.following.filter((u) => u.id === user!.id)
                        .length > 0
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>Not following anyone</div>
          )}
        </TabsContent>

        <TabsContent value="Subscribers">
          {!!followedBy && followedBy.length > 0 ? (
            <div>
              {followedBy.map((user) => (
                <div
                  key={user!.id}
                  className="flex box-border rounded-lg shadow-[0_0_15px_2px_rgba(0,0,0,0.1)] px-[1.5625rem] py-[1.25rem] bg-white items-center justify-between mt-[1.5rem] mb-[0.9375rem]"
                >
                  <div className="flex">
                    <img
                      src={user.image}
                      alt={user.username}
                      className="w-[1.75rem] h-[1.75rem] rounded-full"
                    />
                    <h3 className="text-base font-bold pl-[.625rem]">
                      {user.username}
                    </h3>
                  </div>
                  <FollowButton
                    id={user!.id}
                    followingId={user!.id}
                    name={user!.username}
                    isFollowing={
                      curUser!.followedBy.filter((u) => u.id === user!.id)
                        .length > 0
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>Not followedBy anyone</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
