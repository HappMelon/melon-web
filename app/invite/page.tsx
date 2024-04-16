import { Button } from "@/components/ui/button";
import React from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import LeaderBoard, { ShowData } from "@/components/invite/LeaderBoard";
import QRCode from "@/components/invite/QRCode";
import BackButton from "@/components/invite/BackButton";
import {
  createInviteCode,
  getUserNamesAndImages,
  inviteLeaderboards,
} from "@/lib/actions";

const page = async () => {
  const user = await currentUser();
  const webDomain = process.env.NEXT_PUBLIC_WEB_DOMAIN;
  if (!user) {
    redirect("/sign-in");
  }
  const getUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      inviteCode: true,
    },
  });

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

  let invateCode = getUser?.inviteCode?.code;
  if (!invateCode) {
    //给新用户分配邀请码，试错10次
    invateCode = await createInviteCode(getUser?.id || "");
  }

  const userData = {
    id: getUser?.id,
    username: getUser ? getUser.username : user.id.slice(5),
    name: getUser ? getUser.name : user.firstName ?? "",
    image: getUser ? getUser.image : user.imageUrl,
    invateCode: invateCode,
  };

  const invite_link = `${webDomain}/onboarding?invite=${userData.invateCode}`;

  const CopyButton = dynamic(() => import("@/components/invite/CopyButton"), {
    ssr: false,
  });

  //prisma不支持left join 也不建议
  interface UserInfo {
    name: string;
    image: string;
  }
  const showData: ShowData[] = new Array();
  const leaderBoards = await inviteLeaderboards();
  if (leaderBoards) {
    const userIds = new Array();
    leaderBoards.map((v: any) => {
      userIds.push(v.inviterId);
    });
    if (userIds.length > 0) {
      const userInfos = await getUserNamesAndImages(userIds);
      if (userInfos) {
        const userMap = userInfos.reduce(
          (map: Record<string, UserInfo>, obj) => {
            map[obj.id] = {
              name: obj.name,
              image: obj.image,
            };
            return map;
          },
          {},
        );
        leaderBoards.map((v, i) => {
          showData.push({
            index: i + 1,
            name: userMap[v.inviterId].name,
            avatar: userMap[v.inviterId].image,
            count: v._sum.inviterReward || 0,
            current: v.inviterId === user.id ? true : false,
          });
        });
      }
    }
  }

  return (
    <div className="bg-white w-auto ml-7 rounded-[.9375rem] px-2 pb-8">
      {/* 返回上个页面 */}
      <div className="flex items-center justify-start pt-8 pb-6">
        <BackButton />
      </div>
      {/* 主体 */}
      <div className="ml-4 mr-4 ">
        <div className="flex justify-center items-center flex-col w-full rounded-[.9375rem] bg-gradient-to-b from-[#00DB63] from-0% via-green-200 via-50% to-white to-80% px-7">
          <div className="flex w-full justify-center items-center flex-col -mb-32">
            {/* 主题标语 */}
            <div className="w-full relative md:mt-16 mt-8">
              <Image
                src="/invite_title.png"
                alt="invite_title"
                width={444}
                height={139.29}
                className="absolute left-1/2 top-0 -translate-x-1/2"
              />
              <div className="w-full flex justify-center items-center">
                <Image
                  src="/invite_vetor.png"
                  alt="invite_vetor"
                  width={375}
                  height={427}
                  className="mt-5"
                />
              </div>
            </div>

            <div className="bg-white w-full md:-translate-y-32 -translate-y-28 rounded-[.9375rem] pt-5 flex justify-center items-center flex-col">
              {/* 金币装饰 */}
              <div className="w-full -mt-12">
                <div className="w-1/2 flex md:justify-center justify-start pl-4">
                  <Image
                    src="/invite_gold.png"
                    alt="invite_gold"
                    width={50}
                    height={45}
                  />
                </div>
              </div>
              {/* 头像 */}
              <div className="rounded-full overflow-hidden bg-white border-[3px] -mt-14">
                <Image
                  src={userData.image}
                  alt={"user.image"}
                  height={64}
                  width={64}
                />
              </div>
              {/* 名称 */}
              <p className="font-bold h-4">{userData.name}</p>
              {/* 二维码 */}
              <QRCode
                inviteLink={invite_link}
                userName={userData.name}
                userImage={userData.image}
              ></QRCode>
              {/* 二维码提示 */}
              <p className="font-normal h-[18px] mb-8">Long-press save</p>
            </div>
          </div>

          {/* 规则 */}
          <div className="mt-6 w-full border-[#2AC984] border-[1px] bg-white rounded-[.9375rem] flex flex-col justify-center items-center p-6 gap-1">
            <Image
              src={"/invite_rules.png"}
              alt="invite_rules"
              width={285}
              height={20}
              className="max-md:hidden"
            />
            <div className="md:hidden w-full flex justify-start -ml-12 text-white  text-center items-center">
              <p className="w-[73px] h-[26px] rounded-r-xl bg-[#2AC984]">
                Rules
              </p>
            </div>
            <div className="w-84 text-[#333333] font-normal text-base flex flex-col max-md:items-start items-center justify-center gap-1">
              <p>Old user forward share →</p>
              <p>New user download registration and login page</p>
              <p>browsing behavior for 1min →</p>
              <p>System identification invitation relationship →</p>
              <p>Offer invitation rewards to new and existing users</p>
            </div>
          </div>

          {/* 拷贝链接 */}
          <div className="w-full bg-white mt-6 flex flex-col justify-between gap-4 md:flex-row">
            <Input
              type="text"
              readOnly
              value={invite_link}
              className="bg-[#F2F4F5] w-full rounded-full h-12"
            />
            <CopyButton
              value={invite_link}
              des="Copy Invite Link"
              className="bg-[#2AC984] w-[234px] h-12 rounded-full max-md:w-full"
            />
          </div>
        </div>

        {/* leaderboard */}
        <div className="bg-white flex justify-center items-center flex-col mt-8 gap-12">
          <Image
            src={"/invite_leaderboard.png"}
            alt="invite_leaderboard"
            width={357}
            height={22}
          />
          <LeaderBoard data={showData} />
        </div>
      </div>
    </div>
  );
};

export default page;
