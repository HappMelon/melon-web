"use client";
import React, { createContext, useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Sidebar } from "./Nav";
import {
  getAppConfig,
  getCurrentUser,
  getInvitation,
  getInvitationByInvitee,
  updateInvitation,
  updateUserPoints,
} from "@/lib/actions";
import { InvateStatus } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";

export const AnviteContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

export default function Index({ children }: { children: React.ReactNode }) {
  const [inviteChange, setInviteChange] = useState<boolean>(false);
  // 对新用户1分钟活动判断
  const defaultUserBehaviorQueue = Array(6).fill({ start: 0, end: 0, val: 0 });
  const defaultLatestBehavior = { start: 0, end: 0, val: 0 };
  const events = useRef(["click", "touchstart", "keyup", "wheel"]);
  const userBehaviorQueue = useRef(defaultUserBehaviorQueue);
  const latestBehavior = useRef(defaultLatestBehavior);
  function onUserAction() {
    console.log(`click ${inviteChange}`);
    const currentTime = Math.floor(Date.now() / 1000);
    if (
      currentTime >= latestBehavior.current.start &&
      currentTime <= latestBehavior.current.end
    ) {
      return;
    }

    // 计算新的时间段
    let newStartTimestamp, newEndTimestamp;
    if (
      latestBehavior.current.start === 0 &&
      latestBehavior.current.end === 0
    ) {
      // 第一次点击
      newStartTimestamp = currentTime;
      newEndTimestamp = currentTime + 9;
    } else if (currentTime - latestBehavior.current.end > 10) {
      // 中断超过10秒后的点击
      userBehaviorQueue.current.fill({ start: 0, end: 0, val: 0 }); // 清除所有
      newStartTimestamp = currentTime;
      newEndTimestamp = currentTime + 9;
    } else {
      // 10秒之内的新点击
      newStartTimestamp = latestBehavior.current.end + 1;
      newEndTimestamp = newStartTimestamp + 9;
    }

    userBehaviorQueue.current.shift();
    latestBehavior.current = {
      start: newStartTimestamp,
      end: newEndTimestamp,
      val: 1,
    };
    userBehaviorQueue.current.push({ ...latestBehavior.current });

    // 保存到 localStorage
    localStorage.setItem(
      "userBehaviorQueue",
      JSON.stringify(userBehaviorQueue.current),
    );
    localStorage.setItem(
      "latestBehavior",
      JSON.stringify(latestBehavior.current),
    );
    // 检查数组中所有元素的值的和
    const sum = userBehaviorQueue.current.reduce(
      (a: any, b: { val: any }) => a + b.val,
      0,
    );
    if (sum === 6) {
      // 如果和为12，说明用户在过去的一分钟内一直处于活跃状态。
      events.current.map((e) => {
        window.removeEventListener(e, onUserAction);
      });
      const invitationId = localStorage.getItem("invitationId");
      localStorage.removeItem("userBehaviorQueue");
      localStorage.removeItem("latestBehavior");
      localStorage.removeItem("invitationId");
      if (invitationId) {
        getInvitation(invitationId)
          .then((c) => {
            if (!c) {
              throw new Error("No points order found");
            }
            return updateUserPoints(
              c.inviterId,
              c.inviterReward,
              c.inviteeId,
              c.inviteeReward,
            );
          })
          .then(() => updateInvitation(invitationId, InvateStatus.Completed))
          .then(() => {
            toast({ title: "Complete the Invitation Reward" });
          })
          .catch((e) => {
            // 错误处理
            toast({ title: "Failed the Invitation Reward" });
          });
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getCurrentUser();
      if (userId) {
        const invitation = await getInvitationByInvitee(userId);
        if (invitation) {
          userBehaviorQueue.current = JSON.parse(
            localStorage.getItem("userBehaviorQueue") ||
              JSON.stringify(defaultUserBehaviorQueue),
          );
          latestBehavior.current = JSON.parse(
            localStorage.getItem("latestBehavior") ||
              JSON.stringify(defaultLatestBehavior),
          );
          localStorage.setItem("invitationId", invitation.id);
          // 新用户存在邀请记录并且是未完成的
          events.current.map((e) => {
            window.addEventListener(e, onUserAction);
          });
        }
      }
    };

    fetchData();
    return () => {
      events.current.map((e) => {
        window.removeEventListener(e, onUserAction);
      });
    };
  }, [inviteChange]);
  return (
    <AnviteContext.Provider value={setInviteChange}>
      <div className="w-auto h-full">
        <Header />
        <div className="pt-[6.75rem] relative h-[100vh]">
          <Sidebar
            className={`bg-white transition-all w-[12rem] 2xl:w-[14.8125rem] fixed left-[1.5rem] 2xl:left-[2.6875rem] top-[6.75rem] bottom-[5rem] h-auto rounded-[.9375rem]`}
          />
          <div className="pl-[12.5rem] pr-[1rem] 2xl:pl-[17.5rem] 2xl:pr-[2.6875rem] h-full">
            {children}
          </div>
        </div>
      </div>
    </AnviteContext.Provider>
  );
}
