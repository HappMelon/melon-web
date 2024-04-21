"use client";
import React, { createContext, useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Sidebar } from "./Nav";
import {
  getInvitation,
  getInvitationByInvitee,
  updateInvitation,
  updateUserPoints,
} from "@/lib/actions";
import { InvateStatus } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";

export const AnviteContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

export default function Index({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [inviteChange, setInviteChange] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  // 对新用户1分钟活动判断
  const events = useRef(["click", "touchstart", "keyup", "wheel"]);

  function onUserAction() {
    events.current.map((e) => {
      window.removeEventListener(e, onUserAction);
    });
    setInviteChange(true);
  }

  function updateInvitationFunc() {
    const invitationId = localStorage.getItem("invitationId");
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

  function clearInvitationFunc() {
    if (timer) {
      clearInterval(timer);
    }
    localStorage.removeItem("currentCount");
    localStorage.removeItem("timerStatus");
    localStorage.removeItem("invitationId");
  }

  useEffect(() => {
    if (!user) {
      clearInvitationFunc();
      return;
    }
    const fetchData = async () => {
      const userId = user?.id;
      if (userId) {
        const invitation = await getInvitationByInvitee(userId);
        if (invitation) {
          localStorage.setItem("invitationId", invitation.id);
          localStorage.setItem("currentCount", "0");
          localStorage.setItem("timerStatus", "false");
          events.current.map((e) => {
            window.addEventListener(e, onUserAction);
          });
        }
      }
    };
    fetchData();
    return () => {
      clearInvitationFunc();
    };
  }, [user]);
  useEffect(() => {
    let currentCount = localStorage.getItem("currentCount");
    let timerStatus = localStorage.getItem("timerStatus");
    if (!currentCount || !timerStatus) return;
    if (timerStatus === "false" && Number(currentCount) < 60) {
      const timer = setInterval(() => {
        // 每次更新前获取最新的 currentCount
        const count = localStorage.getItem("currentCount");
        // 当 currentCount 大于或等于 60 时，清除定时器并使 timerStatus 为 false
        if (Number(count) >= 60) {
          localStorage.setItem("timerStatus", "false");
          updateInvitationFunc();
          localStorage.removeItem("currentCount");
          localStorage.removeItem("timerStatus");
          clearInterval(timer);
        } else {
          // 否则，增加 currentCount 的值
          localStorage.setItem("currentCount", String(Number(count) + 1));
          localStorage.setItem("timerStatus", "true");
        }
      }, 1000);
      setTimer(timer);
    }
    return () => {
      clearInvitationFunc();
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
