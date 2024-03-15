"use client";

import { useMemo, useState } from "react";
import { Rules } from "../rules";

const ACTIVITYSTATUS = {
  ACTIVE: "Active",
  ENDED: "Ended",
};

const ACTIVITYSTATUS_COLOR = {
  [ACTIVITYSTATUS.ACTIVE]: "rgba(42, 201, 132, 1)",
  [ACTIVITYSTATUS.ENDED]: "rgba(151, 156, 158, 1)",
};

const PKBACKGROUNDSTYLE = {
  width: "18.9375rem",
  height: "2rem",
  background: "linear-gradient(to right, transparent, white, transparent)",
  color: "rgba(42, 201, 132, 1)",
};

export const CenterContent = () => {
  const [activityStatus, setActivityStatus] = useState<string>(
    ACTIVITYSTATUS.ACTIVE,
  );

  const activityStatusColor = useMemo(
    () =>
      activityStatus === ACTIVITYSTATUS["ACTIVE"]
        ? ACTIVITYSTATUS_COLOR["Active"]
        : ACTIVITYSTATUS_COLOR["Ended"],
    [activityStatus],
  );
  const activityStatusText = useMemo(
    () =>
      activityStatus === ACTIVITYSTATUS["ACTIVE"]
        ? ACTIVITYSTATUS["ACTIVE"]
        : ACTIVITYSTATUS["ENDED"],
    [activityStatus],
  );
  const changeActivityStatus = (status: string) => {
    setActivityStatus(status);
  };
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
          10/10 - 14/11
        </span>
        <span
          style={{
            color: "rgba(51, 126, 105, 1)",
          }}
          className="absolute right-5 top-[4.375rem]"
        >
          10/10 - 14/11
        </span>
      </div>
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
              stroke={activityStatusColor}
              stroke-width="10"
            />
            <circle
              cx="10"
              cy="12"
              r="1"
              fill="none"
              stroke="white"
              stroke-width="10"
            />

            <line
              x1="10"
              y1="7"
              x2="10"
              y2="13"
              stroke={activityStatusColor}
              stroke-width="2"
            />
            <line
              x1="5"
              y1="2"
              x2="15"
              y2="2"
              stroke={activityStatusColor}
              stroke-width="2"
            />
          </svg>
          <span
            className="ml-[0.3rem]"
            style={{
              color: activityStatusColor,
            }}
          >
            {activityStatusText}
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center mb-[2rem]">
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
        <div
          style={{
            color: "rgba(42, 201, 132, 1)",
            fontWeight: "500",
          }}
          className="rounded-[24rem] w-[10.1875rem] text-center h-[3rem] leading-[3rem] bg-white cursor-pointer border border-green-500"
        >
          Share
        </div>
      </div>

      <Rules />
    </>
  );
};
