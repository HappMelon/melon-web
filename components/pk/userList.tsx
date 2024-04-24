"use client";

import Link from "next/link";
import { Prisma } from "@prisma/client";
import { Avatar } from "@/components/avatar/avatar";
import NameLink from "@/components/thread/nameLink";
import { dateFormate } from "@/lib/utils";
import { IconList } from "./iconLIst";
import { useState } from "react";

export const UserList: React.FC<{
  user: any;
  activityList: Prisma.PostGetPayload<{
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
}> = ({ user, activityList }) => {
  console.log("activityList", activityList);

  const [more, setMore] = useState(false);
  return (
    <div className="ml-[1.5rem] mr-[1.5rem] mt-[2rem] h-auto">
      <div id="userList" className="font-bold text-38 mb-[0.9375rem]">
        Most Popular
      </div>
      <div className="flex flex-wrap">
        {(() => {
          if (activityList?.length > 0) {
            return activityList
              .slice(0, more ? activityList.length : 6)
              .map((data, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      marginLeft: index % 2 === 0 ? "0" : "20px",
                      // marginRight: "1.25rem",
                    }}
                    // [calc(50%-10px)] 28rem
                    className="w-[calc(50%-10px)] bg-white h-[11.25rem] rounded-[1rem] pl-[1.25rem] pr-[1.25rem] p-[1rem] mb-[0.9375rem] border border-green-500 relative"
                  >
                    <Link key={index} href={`/t/${data.id}`}>
                      <div className="flex">
                        <Avatar
                          className="rounded-full w-[1.5rem] h-[1.5rem]"
                          src={data.author.image}
                          alt={data.author.name + "'s profile image"}
                        ></Avatar>
                        <div className="ml-[0.625rem]">
                          <NameLink
                            id={data.author.id}
                            username={data.author.name}
                          />
                        </div>
                      </div>

                      <div className="flex mt-[0.625rem]">
                        <div className="w-[5.25rem] h-[5.25rem] rounded-[1rem] mr-[0.625rem]">
                          {data.images.length > 0 ? (
                            <img
                              src={data.images[0]}
                              className="w-full h-full"
                            ></img>
                          ) : (
                            <img
                              src="/item-bg.png"
                              className="w-full h-full"
                            ></img>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div
                            title={data.title}
                            className="flex-1 overflow-hidden overflow-ellipsis w-full mb-2"
                          >
                            {data.title}
                          </div>
                          <div className="text-emerald-400 cursor-pointer">
                            {data.tags.map((tag) => {
                              return (
                                <span
                                  key={tag}
                                  className="mr-[0.3125rem] text-[0.75rem]"
                                >{`#${tag}`}</span>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-[0.625rem] text-gray-300 text-[0.875rem]">
                        <div className="text-[0.75rem]">
                          {dateFormate(data.createdAt)}
                        </div>
                        <IconList data={data}></IconList>
                      </div>
                    </Link>

                    {index <= 2 ? (
                      <div
                        style={{
                          borderRadius: "1rem 0 0 1rem",
                        }}
                        className="h-[1.875rem] w-[3.75rem] absolute right-0 top-[1rem] bg-[#62c68a] flex justify-center items-center"
                      >
                        {index + 1}
                      </div>
                    ) : null}
                  </div>
                );
              });
          }
          return "Looks like there isn't any posts from your following users~";
        })()}
      </div>
      <div
        className="text-center cursor-pointer"
        onClick={() => {
          setMore(!more);
        }}
      >
        {more ? "pack up" : "read more"}
      </div>
    </div>
  );
};
