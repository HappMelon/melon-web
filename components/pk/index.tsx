"use client";

import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";

import { CenterContent } from "./centerContent";
import { UserList } from "./userList";
import { CreateActivity, GetActivities } from "@/lib/actions/activityAction";
import { usePathname } from "next/navigation";

export const ACTIVITYSTATUS = {
  ACTIVE: "Active",
  ENDED: "Ended",
  NOSTART: "NOSTART",
};

export const ACTIVITYSTATUS_COLOR = {
  [ACTIVITYSTATUS.ACTIVE]: "rgba(42, 201, 132, 1)",
  [ACTIVITYSTATUS.ENDED]: "rgba(151, 156, 158, 1)",
};

export const PkPage: React.FC<{
  user: any;
  popular: Prisma.PopularGetPayload<{
    include: {
      post: {
        include: {
          author: true;
          parent: true;
          likes: true;
          children: {
            include: {
              author: true;
            };
          };
        };
      };
    };
  }>[];
}> = ({ user, popular }) => {
  const path = usePathname();

  const [activityStatus, setActivityStatus] = useState<string>(
    ACTIVITYSTATUS.NOSTART,
  );
  const [activityConfig, setActivityConfig] =
    useState<Prisma.PopularGetPayload<{}>>();

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
      <CenterContent
        activityStatus={activityStatus}
        setActivityStatus={setActivityStatus}
        activityConfig={activityConfig}
      />
      <UserList activityStatus={activityStatus} user={user} popular={popular} />
    </div>
  );
};
