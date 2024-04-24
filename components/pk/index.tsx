"use client";

import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";

import { CenterContent } from "./centerContent";
import { UserList } from "./userList";
import { CreateActivity, GetActivities } from "@/lib/actions/activityAction";
import { usePathname } from "next/navigation";

export const PkPage: React.FC<{
  user: any;
  posts: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>[];
}> = ({ user, posts }) => {
  const path = usePathname();

  const [activityConfig, setActivityConfig] =
    useState<Prisma.PopularGetPayload<{}>>();
  const [activityList, setActivityList] = useState(posts);

  const getActivity = async () => {
    const res = await GetActivities();

    if (res.length > 0) {
      setActivityConfig(res[0]);
    } else {
      (async () => {
        await CreateActivity({
          path,
        });
      })();
      getActivity();
    }
  };
  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div
      className="bg-cover bg-no-repeat rounded-[1.5rem] min-h-[106.25rem]"
      style={{
        backgroundImage: "url('/pk.jpg')",
        backgroundPosition: "top right",
        // overflowY: 'auto',
      }}
    >
      <div
        style={{
          height: "35rem",
          // height: '32%'
        }}
      />
      <CenterContent activityConfig={activityConfig} />
      <UserList user={user} activityList={activityList} />
    </div>
  );
};
