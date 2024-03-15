"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { BackIcon } from "@/components/common/backIcon";
import { Rules } from "@/components/rules";

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

enum Nums {
  zero,
  first,
  second,
}

export default function Pk() {
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
  //   const gradientStyle = {
  //     background:
  //       "linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
  //     width: "100%",
  //     height: "200px", // 举例设置高度
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   };
  const renderCenterContent = () => {
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
              // lineHeight: "2rem",
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
  const changeActivityStatus = (status: string) => {
    setActivityStatus(status);
  };

  const renderUserList = () => {
    return (
      <div className="ml-[1.5rem] mr-[1.5rem] mt-[2rem] h-auto">
        <div className="font-bold text-38 mb-[0.9375rem]">Most Popular</div>
        <div className="flex flex-wrap">
          {new Array(6).fill(0).map((_, index) => {
            return (
              <div
                key={index}
                style={{
                  marginLeft: index % 2 === 0 ? "0" : "20px",
                  // marginRight: "1.25rem",
                }}
                // [calc(50%-10px)] 28rem
                className="w-[calc(50%-10px)] bg-white h-[11.25rem] rounded-[1rem] pl-[1.25rem] pr-[1.25rem] p-[1rem] mb-[0.9375rem] border border-green-500"
              >
                <div className="flex">
                  <div className="bg-emerald-500 rounded-full w-[1.5rem] h-[1.5rem]"></div>
                  <div className="ml-[0.625rem]">Coinbase</div>
                </div>

                <div className="flex mt-[0.625rem]">
                  <div className="w-[5.25rem] h-[5.25rem] bg-emerald-500 rounded-[1rem] mr-[0.625rem]"></div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div
                      title="Coinbase has filed a formal request with the court to
                    compel the SEC to establish clear.Coinbase has
                    Coinbase has filed a formal request with the court to
                    compel the SEC to establish clear.Coinbase has"
                      className="flex-1 overflow-hidden overflow-ellipsis w-full mb-2"
                    >
                      Coinbase has filed a formal request with the court to
                      compel the SEC to establish clear.Coinbase has Coinbase
                      has filed a formal request with the court to compel the
                      SEC to establish clear.Coinbase has
                    </div>
                    <div className="text-emerald-400 cursor-pointer">
                      #Science #Science #Science #Science
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-[0.625rem] text-gray-300 text-[0.875rem]">
                  <div>11/13/2023 09:41</div>
                  <div className="flex">
                    <div className="flex items-center mr-[0.625rem]">
                      <svg
                        width="1.25rem"
                        height="1.25rem"
                        viewBox="0 0 32 32"
                        enable-background="new 0 0 32 32"
                        id="Editable-line"
                        version="1.1"
                        //   xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        // xlink="http://www.w3.org/1999/xlink"
                      >
                        <path
                          d="  M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z"
                          fill="none"
                          id="XMLID_10_"
                          stroke="rgba(205, 207, 208, 1)"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          fill="none"
                          id="XMLID_12_"
                          r="5"
                          stroke="rgba(205, 207, 208, 1)"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                        />
                      </svg>
                      <div className="ml-[0.3125rem]">99k+</div>
                    </div>
                    <div className="flex items-center mr-[0.625rem]">
                      <svg
                        width="1.25rem"
                        height="1.25rem"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.75 18.75H11.25L5.25 23.25V18.75H2.25C1.85218 18.75 1.47064 18.592 1.18934 18.3107C0.908035 18.0294 0.75 17.6478 0.75 17.25V2.25C0.75 1.85218 0.908035 1.47064 1.18934 1.18934C1.47064 0.908035 1.85218 0.75 2.25 0.75H21.75C22.1478 0.75 22.5294 0.908035 22.8107 1.18934C23.092 1.47064 23.25 1.85218 23.25 2.25V17.25C23.25 17.6478 23.092 18.0294 22.8107 18.3107C22.5294 18.592 22.1478 18.75 21.75 18.75Z"
                          stroke="rgba(205, 207, 208, 1)"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5 6H19"
                          stroke="rgba(205, 207, 208, 1)"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5 11H12"
                          stroke="rgba(205, 207, 208, 1)"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div className="ml-[0.3125rem]">50k+</div>
                    </div>
                    <div className="flex items-center mr-[0.625rem]">
                      <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="1.25rem"
                        height="1.25rem"
                        viewBox="0 0 37 32"
                        enable-background="new 0 0 37 32"
                        // xml:space="preserve"
                      >
                        <g>
                          <path
                            fill="rgba(205, 207, 208, 1)"
                            d="M33.582,2.483c-1.776-1.56-4.077-2.418-6.481-2.418c-2.767,0-5.49,1.134-7.472,3.112l-0.781,0.778
      c-0.188,0.188-0.508,0.188-0.697,0l-1.027-1.024C15.23,1.041,12.711,0,10.032,0C7.415,0,4.938,1,3.059,2.814
      c-1.87,1.805-2.911,4.287-2.933,6.988c-0.023,2.824,1.095,5.573,3.067,7.541l14.252,14.22C17.728,31.845,18.103,32,18.5,32
      s0.772-0.155,1.055-0.437L34.061,17.09c1.952-1.948,3.021-4.645,2.934-7.399C36.906,6.897,35.693,4.338,33.582,2.483z
       M33.355,16.382L18.849,30.855c-0.188,0.188-0.51,0.188-0.697,0L3.899,16.635c-1.784-1.779-2.794-4.267-2.773-6.824
      c0.02-2.431,0.953-4.66,2.627-6.277C5.445,1.9,7.675,1,10.032,1c2.413,0,4.681,0.938,6.387,2.64l1.026,1.024
      c0.565,0.564,1.545,0.564,2.11,0l0.78-0.778c1.796-1.792,4.263-2.82,6.766-2.82c2.161,0,4.228,0.77,5.821,2.169
      c1.902,1.67,2.993,3.974,3.073,6.488C36.075,12.238,35.138,14.603,33.355,16.382z"
                          />
                        </g>
                      </svg>
                      <div className="ml-[0.3125rem]">999</div>
                    </div>

                    <div className="flex items-center mr-[0.625rem]">
                      <svg
                        width="1.25rem"
                        height="1.25rem"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="48"
                          height="48"
                          fill="rgba(205, 207, 208, 1)"
                          fill-opacity="0.01"
                        />
                        <path
                          d="M26 6H42V22"
                          stroke="rgba(205, 207, 208, 1)"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M42 29.4737V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39V9C6 7.34315 7.34315 6 9 6L18 6"
                          stroke="rgba(205, 207, 208, 1)"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M25.8 22.2L41.1 6.89999"
                          stroke="rgba(205, 207, 208, 1)"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div className="ml-[0.3125rem]">1k+</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full box-border pl-[1.875rem]">
      <div className="bg-white rounded-[.9375rem] p-[1.875rem]">
        <BackIcon title="Trending" />
        <div
          className="bg-cover bg-no-repeat rounded-[1.5rem] h-full"
          style={{
            backgroundImage: "url('/pk.jpg')",
            backgroundPosition: "top right",
          }}
        >
          {/* <div className="w-full bg-gradient-to-b from-green-400 to-green-10 h-max rounded-[24px]"> */}
          <div className="h-[35rem]"></div>
          {renderCenterContent()}

          {renderUserList()}
        </div>
      </div>
    </div>
  );
}
