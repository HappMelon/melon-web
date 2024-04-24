"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Prisma } from "@prisma/client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Rules } from "../rules";
import { useToast } from "../ui/use-toast";
import { dateFormate } from "@/lib/utils";
import { ACTIVITYSTATUS, ACTIVITYSTATUS_COLOR } from ".";

const PKBACKGROUNDSTYLE = {
  width: "18.9375rem",
  height: "2rem",
  background: "linear-gradient(to right, transparent, white, transparent)",
  color: "rgba(42, 201, 132, 1)",
};

const host = typeof window !== "undefined" ? window.location.host : "";
const shareData = {
  url: "http://" + host + "/pk",
};

export const CenterContent: React.FC<{
  activityConfig?: Prisma.PopularGetPayload<{}>;
  activityStatus: string;
  setActivityStatus: Dispatch<SetStateAction<string>>;
}> = ({ activityConfig, activityStatus, setActivityStatus }) => {
  const { toast } = useToast();

  useEffect(() => {
    const nowDate = new Date().getTime();
    if (activityConfig) {
      if (activityConfig.endTime.getTime() <= nowDate) {
        setActivityStatus(ACTIVITYSTATUS.ENDED);
      } else if (
        activityConfig.startTime.getTime() <= nowDate &&
        activityConfig.endTime.getTime() >= nowDate
      ) {
        setActivityStatus(ACTIVITYSTATUS.ACTIVE);
      } else if (activityConfig.startTime.getTime() >= nowDate) {
        setActivityStatus(ACTIVITYSTATUS.NOSTART);
      }
    }
    return;
  }, [activityConfig, activityConfig?.endTime, activityConfig?.startTime]);

  const activity = useMemo(() => {
    const color =
      activityStatus === ACTIVITYSTATUS.ACTIVE
        ? ACTIVITYSTATUS_COLOR.Active
        : ACTIVITYSTATUS_COLOR.Ended;

    const text =
      activityStatus === ACTIVITYSTATUS.ACTIVE
        ? ACTIVITYSTATUS.ACTIVE
        : activityStatus === ACTIVITYSTATUS.ENDED
        ? ACTIVITYSTATUS.ENDED
        : ACTIVITYSTATUS.NOSTART;
    return [color, text];
  }, [activityStatus]);

  const renderTimeInterVal = () => (
    <>
      {dateFormate(activityConfig?.startTime || "", "month")}
      <span className="ml-[0.3rem] mr-[0.3rem]">-</span>
      {dateFormate(activityConfig?.endTime || "", "month")}
    </>
  );
  return (
    <>
      <div className="h-[6.5625rem] text-white flex items-center justify-center ml-[1.5rem] mr-[1.5rem] relative">
        <div className="absolute left-5">
          <span
            style={{
              fontWeight: 700,
            }}
          >
            Idea intake
          </span>
        </div>
        <img className="w-full h-full" src="/slider.png" alt="slider" />
        <div className="absolute right-5">
          <span
            style={{
              fontWeight: 700,
            }}
          >
            Announcement
          </span>
        </div>

        <span
          style={{
            color: "rgba(51, 126, 105, 1)",
          }}
          className="absolute left-5 top-[4.375rem]"
        >
          {renderTimeInterVal()}
        </span>
        <span
          style={{
            color: "rgba(51, 126, 105, 1)",
          }}
          className="absolute right-5 top-[4.375rem]"
        >
          {renderTimeInterVal()}
        </span>
      </div>
      {activityStatus !== ACTIVITYSTATUS.NOSTART ? (
        <div className="flex justify-center mt-[1rem] items-center mb-8 leading-8 text-[1rem]">
          <div
            style={{
              ...PKBACKGROUNDSTYLE,
              textAlign: "center",
            }}
            className="flex justify-center items-center"
          >
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="10"
                cy="12"
                r="3"
                fill="none"
                stroke={activity[0]}
                strokeWidth="10"
              />
              <circle
                cx="10"
                cy="12"
                r="1"
                fill="none"
                stroke="white"
                strokeWidth="10"
              />

              <line
                x1="10"
                y1="7"
                x2="10"
                y2="13"
                stroke={activity[0]}
                strokeWidth="2"
              />
              <line
                x1="5"
                y1="2"
                x2="15"
                y2="2"
                stroke={activity[0]}
                strokeWidth="2"
              />
            </svg>
            <span
              className="ml-[0.3rem]"
              style={{
                color: activity[0],
              }}
            >
              {activity[1]}
            </span>
          </div>
        </div>
      ) : null}

      <div className="flex justify-center items-center mb-[2rem]">
        {activityStatus === ACTIVITYSTATUS.ACTIVE ? (
          <Link href={`/post?activityId=${activityConfig?.id || ""}`}>
            <div
              className="rounded-[24rem] w-[10.1875rem] text-center h-[3rem] leading-[3rem] mr-4 cursor-pointer"
              style={{
                background: "rgba(42, 201, 132, 1)",
                color: "#fff",
                fontWeight: "500",
              }}
            >
              Attend
            </div>
          </Link>
        ) : (
          <div
            className="rounded-[24rem] w-[10.1875rem] text-center h-[3rem] leading-[3rem] mr-4 cursor-pointer"
            style={{
              background: "rgba(42, 201, 132, 1)",
              color: "#fff",
              fontWeight: "500",
            }}
            onClick={() => {
              const view = document.getElementById("userList");
              if (view) {
                view.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
          >
            View
          </div>
        )}
        <div
          style={{
            color: "rgba(42, 201, 132, 1)",
            fontWeight: "500",
          }}
          className="rounded-[24rem] w-[10.1875rem] text-center h-[3rem] leading-[3rem] bg-white cursor-pointer border border-green-500"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigator.clipboard.writeText(shareData.url);
            toast({
              title: "Copy success!",
            });
          }}
        >
          Share
        </div>
      </div>

      <Rules />
    </>
  );
};
