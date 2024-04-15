"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronsDown, ChevronsRight, ChevronsUp } from "lucide-react";
export type ShowData = {
  index: number;
  name?: string;
  avatar?: string;
  count?: number;
  current?: boolean;
};
const defaultShowData: ShowData = {
  index: 0,
  name: "",
  avatar: "",
  count: 0,
  current: false,
};

const getTopThree = (
  data: ShowData[],
): {
  firstData: ShowData;
  secondData: ShowData;
  thirdData: ShowData;
  otherData: ShowData[];
} => {
  const firstData = data.length > 0 ? data[0] : { ...defaultShowData };
  const secondData = data.length > 1 ? data[1] : { ...defaultShowData };
  const thirdData = data.length > 2 ? data[2] : { ...defaultShowData };
  const otherData = data.length > 3 ? data.slice(3) : [];
  return { firstData, secondData, thirdData, otherData };
};
const LeaderBoard = ({ data }: { data: ShowData[] }) => {
  const { firstData, secondData, thirdData, otherData } = getTopThree(data);
  const lMore = 7;
  const mMore = 17;
  const [showNum, setShowNum] = useState<number>(lMore);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* 榜单 */}
      {data.length > 0 ? (
        <>
          <div className="flex flex-col items-center justify-center w-full">
            {/* 第一名 */}
            <div>
              <div className="relative w-full flex justify-center">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <Image
                    src={"/invite_crown.png"}
                    alt="invite_crown"
                    width={32}
                    height={32}
                  />
                </div>

                <div className="rounded-full overflow-hidden border-[#2AC984] border-[3px] bg-[#2AC984]">
                  <Image
                    src={firstData.avatar || ""}
                    alt={"user.avatar"}
                    height={84}
                    width={84}
                  />
                </div>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#2AC984] rounded-full w-7 h-7 flex justify-center items-center">
                  <p className="font-bold text-xl">{firstData.index}</p>
                </div>
              </div>
              <div className="mt-4 w-full flex justify-center">
                <p className="text-[#2AC984] font-bold text-sm">
                  {firstData.current ? "You" : firstData.name}
                </p>
              </div>
              <div className="mt-2 w-full flex justify-center items-center flex-row gap-2">
                <div className="size-4">
                  <Image
                    src={"/invite_token.png"}
                    alt="invite_token"
                    width={16}
                    height={16}
                  />
                </div>
                <p className="text-black font-bold text-xl">
                  {firstData.count}
                </p>
              </div>
            </div>
            {/* 第2、3名 */}
            <div className="max-md:w-80 w-96 flex flex-row justify-between -translate-y-32">
              {/* 第2 名 */}
              <div>
                <div className="relative">
                  <div className="rounded-full overflow-hidden border-[#2AC984] bg-[#2AC984] border-[3px]">
                    <Image
                      src={secondData.avatar || ""}
                      alt={"user.avatar"}
                      height={74}
                      width={74}
                    />
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#2AC984] rounded-full w-7 h-7 flex justify-center items-center">
                    <p className="font-bold text-xl">{secondData.index}</p>
                  </div>
                </div>
                <div className="mt-4 w-full flex justify-center">
                  <p className="text-[#2AC984] font-bold text-sm">
                    {secondData.current ? "You" : secondData.name}
                  </p>
                </div>
                <div className="mt-2 w-full flex justify-center items-center flex-row gap-2">
                  <div className="size-4">
                    <Image
                      src={"/invite_token.png"}
                      alt="invite_token"
                      width={16}
                      height={16}
                    />
                  </div>
                  <p className="text-black font-bold text-xl">
                    {secondData.count}
                  </p>
                </div>
              </div>
              {/* 第 3名 */}
              <div>
                <div className="relative flex justify-center items-center">
                  <div className="rounded-full overflow-hidden border-[#2AC984] bg-[#2AC984] border-[3px]">
                    <Image
                      src={thirdData.avatar || ""}
                      alt={"user.avatar"}
                      height={74}
                      width={74}
                    />
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#2AC984] rounded-full w-7 h-7 flex justify-center items-center">
                    <p className="font-bold text-xl">{thirdData.index}</p>
                  </div>
                </div>
                <div className="mt-4 w-full flex justify-center">
                  <p className="text-[#2AC984] font-bold text-sm">
                    {thirdData.current ? "You" : thirdData.name}
                  </p>
                </div>
                <div className="mt-2 w-full flex justify-center items-center flex-row gap-2">
                  <div className="size-4">
                    <Image
                      src={"/invite_token.png"}
                      alt="invite_token"
                      width={16}
                      height={16}
                    />
                  </div>
                  <p className="text-black font-bold text-xl">
                    {thirdData.count}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 榜单列表 */}
          <div className="flex flex-col justify-center items-center gap-2 w-full -mt-20 mb-8">
            {otherData.length > 0 ? (
              otherData.slice(0, showNum).map((item) => (
                <div
                  key={item.index}
                  className={`border-[#E3E5E5] border-[1px] rounded-xl w-full h-12 flex flex-row items-center justify-between px-4 md:gap-6 md:px-16  ${item.current ? "bg-[#2AC984] text-white" : "bg-white text-[#979C9E]"}`}
                >
                  <p className="font-normal text-sm w-6">{item.index}</p>
                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-row justify-start items-center flex-1">
                      <div className="flex flex-row justify-center items-center gap-4">
                        <Image
                          src={item.avatar || ""}
                          alt="user-avatar"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <p className="font-bold text-sm">
                          {item.current ? "You" : item.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-end items-center font-normal text-sm gap-2">
                      <p className="">{item.count}</p>
                      <p className="">Points</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
            {/* 多展示10行 */}
            <div className="w-full flex justify-center items-center mt-5 font-normal text-sm text-[#2AC984]">
              {otherData.length > 0 ? (
                <div
                  onClick={() => setShowNum(showNum === lMore ? mMore : lMore)}
                  className="cursor-pointer"
                >
                  {showNum === lMore ? (
                    <div className="flex flex-col justify-center items-center">
                      <ChevronsDown
                        size={20}
                        color="#2AC984"
                        strokeWidth={0.5}
                        absoluteStrokeWidth
                      />
                      <p>read more</p>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center">
                      <ChevronsUp
                        size={20}
                        color="#2AC984"
                        strokeWidth={0.5}
                        absoluteStrokeWidth
                      />
                      <p>read less</p>
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center mt-20 mb-36 gap-2">
          <Image
            src={"/invite_no.png"}
            alt="invite_no"
            width={132}
            height={79}
          />
          <p className="text-[#AAAAAA] font-normal text-sm">
            Looks like there isn&apos;t any users~
          </p>
        </div>
      )}
    </div>
  );
};
export default LeaderBoard;
