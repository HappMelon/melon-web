"use client";

import Link from "next/link";
import { Prisma } from "@prisma/client";
import { Avatar } from "@/components/avatar/avatar";
import NameLink from "@/components/thread/nameLink";
import { dateFormate } from "@/lib/utils";
import { IconList } from "./iconLIst";
import { useState } from "react";
import { ACTIVITYSTATUS } from ".";

export const UserList: React.FC<{
  user: any;
  popular?: Prisma.PopularGetPayload<{
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
  }>;
  activityStatus: string;
  getMore: () => void;
  isMore: boolean;
}> = ({ user, activityStatus, popular, getMore, isMore }) => {
  return (
    <div className="ml-[1.5rem] mr-[1.5rem] mt-[2rem] h-auto">
      <div id="userList" className="font-bold text-38 mb-[0.9375rem]">
        Most Popular
      </div>
      <div className="flex flex-wrap">
        {(() => {
          if (popular && popular?.post?.length > 0) {
            return popular.post.map((data, index) => {
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
                          {data.tags.map((tag: any) => {
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

                  {activityStatus === ACTIVITYSTATUS.ENDED && index <= 2 ? (
                    <div
                      style={{
                        borderRadius: "1rem 0 0 1rem",
                      }}
                      className="h-[1.875rem] w-[3.75rem] absolute right-0 top-[1rem] bg-[#62c68a] flex justify-center items-center"
                    >
                      {icons(index)}
                    </div>
                  ) : null}
                </div>
              );
            });
          }
          return "Looks like there isn't any posts from your following users~";
        })()}
      </div>

      {
        <div
          className="text-center cursor-pointer"
          onClick={() => {
            // setMore(!more);
            isMore ? getMore() : null;
          }}
        >
          {isMore ? "read more" : "no any more"}
        </div>
      }
    </div>
  );
};

enum RANKING {
  FIRST,
  SECOND,
  THIRD,
}

const icons = (index: number) => {
  return {
    [RANKING.FIRST]: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.125 13.75V15.5"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.9585 18.334H14.2918V17.5007C14.2918 16.584 13.5418 15.834 12.6252 15.834H7.62516C6.7085 15.834 5.9585 16.584 5.9585 17.5007V18.334V18.334Z"
          stroke="white"
          stroke-miterlimit="10"
        />
        <path
          d="M5.125 18.334H15.125"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.99984 13.3327C6.77484 13.3327 4.1665 10.7243 4.1665 7.49935V4.99935C4.1665 3.15768 5.65817 1.66602 7.49984 1.66602H12.4998C14.3415 1.66602 15.8332 3.15768 15.8332 4.99935V7.49935C15.8332 10.7243 13.2248 13.3327 9.99984 13.3327Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.55853 9.70833C3.93353 9.50833 3.38353 9.14167 2.9502 8.70833C2.2002 7.875 1.7002 6.875 1.7002 5.70833C1.7002 4.54167 2.61686 3.625 3.78353 3.625H4.3252C4.15853 4.00833 4.0752 4.43333 4.0752 4.875V7.375C4.0752 8.20833 4.2502 8.99167 4.55853 9.70833Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.4419 9.70833C16.0669 9.50833 16.6169 9.14167 17.0502 8.70833C17.8002 7.875 18.3002 6.875 18.3002 5.70833C18.3002 4.54167 17.3836 3.625 16.2169 3.625H15.6752C15.8419 4.00833 15.9252 4.43333 15.9252 4.875V7.375C15.9252 8.20833 15.7502 8.99167 15.4419 9.70833Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.68 11V5.3L8.35 6.53L7.65 5.7L9.79 3.92H10.88V11H9.68Z"
          fill="white"
        />
      </svg>
    ),
    [RANKING.SECOND]: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.125 13.75V15.5"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.95825 18.334H14.2916V17.5007C14.2916 16.584 13.5416 15.834 12.6249 15.834H7.62492C6.70825 15.834 5.95825 16.584 5.95825 17.5007V18.334V18.334Z"
          stroke="white"
          stroke-miterlimit="10"
        />
        <path
          d="M5.125 18.334H15.125"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.0001 13.3327C6.77508 13.3327 4.16675 10.7243 4.16675 7.49935V4.99935C4.16675 3.15768 5.65841 1.66602 7.50008 1.66602H12.5001C14.3417 1.66602 15.8334 3.15768 15.8334 4.99935V7.49935C15.8334 10.7243 13.2251 13.3327 10.0001 13.3327Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.55828 9.70833C3.93328 9.50833 3.38328 9.14167 2.94995 8.70833C2.19995 7.875 1.69995 6.875 1.69995 5.70833C1.69995 4.54167 2.61662 3.625 3.78328 3.625H4.32495C4.15828 4.00833 4.07495 4.43333 4.07495 4.875V7.375C4.07495 8.20833 4.24995 8.99167 4.55828 9.70833Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.4417 9.70833C16.0667 9.50833 16.6166 9.14167 17.05 8.70833C17.8 7.875 18.3 6.875 18.3 5.70833C18.3 4.54167 17.3833 3.625 16.2166 3.625H15.675C15.8416 4.00833 15.925 4.43333 15.925 4.875V7.375C15.925 8.20833 15.75 8.99167 15.4417 9.70833Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.59 11V9.73L10.34 7.07C10.67 6.75 11.07 6.36 11.07 5.87C11.07 5.29 10.59 4.94 10.04 4.94C9.45 4.94 9.03 5.32 8.95 5.9L7.69 5.8C7.81 4.49 8.76 3.8 10.04 3.8C11.31 3.8 12.33 4.45 12.33 5.81C12.33 6.7 11.87 7.31 11.24 7.89L9.05 9.92H12.33V11H7.59Z"
          fill="white"
        />
      </svg>
    ),
    [RANKING.THIRD]: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.125 13.75V15.5"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.9585 18.334H14.2918V17.5007C14.2918 16.584 13.5418 15.834 12.6252 15.834H7.62516C6.7085 15.834 5.9585 16.584 5.9585 17.5007V18.334V18.334Z"
          stroke="white"
          stroke-miterlimit="10"
        />
        <path
          d="M5.125 18.334H15.125"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.99984 13.3327C6.77484 13.3327 4.1665 10.7243 4.1665 7.49935V4.99935C4.1665 3.15768 5.65817 1.66602 7.49984 1.66602H12.4998C14.3415 1.66602 15.8332 3.15768 15.8332 4.99935V7.49935C15.8332 10.7243 13.2248 13.3327 9.99984 13.3327Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.55853 9.70833C3.93353 9.50833 3.38353 9.14167 2.9502 8.70833C2.2002 7.875 1.7002 6.875 1.7002 5.70833C1.7002 4.54167 2.61686 3.625 3.78353 3.625H4.3252C4.15853 4.00833 4.0752 4.43333 4.0752 4.875V7.375C4.0752 8.20833 4.2502 8.99167 4.55853 9.70833Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.4419 9.70833C16.0669 9.50833 16.6169 9.14167 17.0502 8.70833C17.8002 7.875 18.3002 6.875 18.3002 5.70833C18.3002 4.54167 17.3836 3.625 16.2169 3.625H15.6752C15.8419 4.00833 15.9252 4.43333 15.9252 4.875V7.375C15.9252 8.20833 15.7502 8.99167 15.4419 9.70833Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.22 7.85V6.77H9.53C10.22 6.77 10.91 6.67 10.91 5.81C10.91 5.27 10.49 4.88 9.9 4.88C9.42 4.88 9.01 5.17 8.84 5.66L7.57 5.32C7.88 4.27 8.8 3.8 9.84 3.8C11.06 3.8 12.11 4.44 12.11 5.69C12.11 6.45 11.65 7.1 10.9 7.29V7.31C11.8 7.44 12.28 8.16 12.28 9.03C12.28 10.38 11.15 11.12 9.89 11.12C8.73 11.12 7.77 10.64 7.46 9.46L8.74 9.12C8.89 9.7 9.25 10.04 9.89 10.04C10.53 10.04 11.08 9.59 11.08 8.93C11.08 8.01 10.24 7.85 9.51 7.85H9.22Z"
          fill="white"
        />
      </svg>
    ),
  }[index];
};
