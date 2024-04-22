import * as React from "react";

export const Rules: React.FC = () => {
  return (
    <div className="w-auto bg-white h-[12.25rem] ml-[1.5rem] mr-[1.5rem] rounded-[1rem] p-[1rem] border border-green-500">
      <div className="flex items-center justify-center">
        <svg width="150" height="8" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(42, 201, 132, 1)" />
              <stop
                offset="100%"
                stopColor="rgba(42, 201, 132, 1)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <rect x="0" y="3" width="146" height="2" fill="url(#gradient)" />
          <polygon
            points="146,0 150,4 146,8 142,4"
            fill="rgba(42, 201, 132, 1)"
          />
        </svg>
        <p
          style={{
            color: "rgba(42, 201, 132, 1)",
          }}
          className="text-center ml-[8px] mr-[8px] text-[1.125rem]"
        >
          Rules
        </p>
        <svg width="150" height="8" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradientOne" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop
                offset="0%"
                stopColor="rgba(42, 201, 132, 1)"
                stopOpacity="0"
              />
              <stop offset="100%" stopColor="rgba(42, 201, 132, 1)" />
            </linearGradient>
          </defs>
          <rect x="4" y="3" width="146" height="2" fill="url(#gradientOne)" />
          <polygon points="4,0 8,4 4,8 0,4" fill="rgba(42, 201, 132, 1)" />
        </svg>
      </div>
      <p className="text-center h-7 text-[17px]">Old user forward share →</p>
      <p className="text-center h-7 text-[17px]">
        New user download registration and login page
      </p>
      <p className="text-center h-7 text-[17px]">
        browsing behavior for 1min →
      </p>
      <p className="text-center h-7 text-[17px]">
        System identification invitation relationship →
      </p>
      <p className="text-center h-7 text-[17px]">
        Offer invitation rewards to new and existing users
      </p>
    </div>
  );
};
