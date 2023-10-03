import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { BackIcon } from "@/components/profile/backIcon";
import { BannerInfo } from "@/components/profile/bannerInfo";
import { Content } from "@/components/profile/content";
import { Relation } from "@/components/profile/relation";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const curUser = await currentUser();
  if (!curUser) {
    redirect("/sign-up");
  }

  const isCurUser = curUser?.id === params.id;

  const userProfile = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      posts: true,
      likes: true,
      following: true,
      followedBy: true,
    },
  });
  let curUserProfile = userProfile;

  if (!isCurUser) {
    curUserProfile = await prisma.user.findUnique({
      where: {
        id: curUser?.id,
      },
      include: {
        posts: true,
        likes: true,
        following: true,
        followedBy: true,
      },
    });
  }

  const userLikes = userProfile?.likes;
  const userFollowing = userProfile?.following;
  const userFollowedBy = userProfile?.followedBy;

  const posts = await prisma.post.findMany({
    where: {
      authorId: userProfile?.id,
      parent: null,
    },
    include: {
      author: true,
      children: {
        include: {
          author: true,
        },
      },
      parent: true,
      likes: true,
    },
  });

  const userLikePosts = userLikes
    ? await prisma.post.findMany({
        where: {
          id: {
            in: userLikes.map((like) => like.postId),
          },
        },
        include: {
          author: true,
          children: {
            include: {
              author: true,
            },
          },
          parent: true,
          likes: true,
        },
      })
    : [];

  console.log("========getUSER", userProfile);

  return (
    <div className="w-full box-border pl-[1.875rem]">
      <div className="bg-white rounded-[.9375rem] p-[1.875rem]">
        <BackIcon />
        {userProfile && <BannerInfo user={userProfile} isCurUser={isCurUser} />}

        {userProfile && (
          <div className="flex mt-[3.125rem]">
            <Content posts={posts} likePosts={userLikePosts} />
            {/* <Relation curUser={curUserProfile} following={userFollowing} /> */}
            <Relation
              curUser={curUserProfile}
              following={userFollowing}
              followedBy={userFollowedBy}
            />
          </div>
        )}
      </div>
    </div>
  );
}
