"use client";

export default function ProposalResult({
  type,
  title,
  content,
}: {
  type: "good" | "bad";
  title: string;
  content: string;
}) {
  return (
    <div
      className="w-full box-border px-[1.75rem] py-[1.5rem] border border-[#f9d423] rounded-[10px] shadow-[0_0_4px_0_rgba(0,0,0,0.15)]"
      style={{
        background:
          "linear-gradient(100deg, rgba(249, 212, 35, 0.03) -12.68%, rgba(248, 54, 0, 0.03) 147.82%)",
      }}
    >
      <div className="flex">
        <div className="mr-[1.25rem]">
          {type === "bad" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
            >
              <path
                d="M19.8509 11.8857C21.0042 10.7274 22.9057 10.7016 24.0898 11.8294C24.1124 11.8465 24.1302 11.8687 24.148 11.8857C24.7196 12.486 25.0247 13.2766 24.9984 14.0893C24.9984 14.8352 23.8095 20.4012 23.4446 24.4527H20.6172C20.2788 20.4012 19.0052 14.8352 19.0052 14.0893C18.9831 13.2738 19.2855 12.484 19.8509 11.8857ZM24.121 31.1769C22.9321 32.2744 21.0663 32.2744 19.8778 31.1769C18.7067 30.0362 18.7067 28.1836 19.8821 27.047C21.0533 25.9062 22.9542 25.9062 24.121 27.0516C25.2922 28.1882 25.2922 30.0362 24.121 31.1769Z"
                fill="url(#paint0_linear_1020_7671)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1020_7671"
                  x1="19"
                  y1="-6.73529"
                  x2="30.3031"
                  y2="-6.16462"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9D423" />
                  <stop offset="1" stop-color="#F83600" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
            >
              <path
                d="M0 5.5C0 4.04131 0.579463 2.64236 1.61091 1.61091C2.64236 0.579463 4.04131 0 5.5 0L38.5 0C39.9587 0 41.3576 0.579463 42.3891 1.61091C43.4205 2.64236 44 4.04131 44 5.5V38.5C44 39.9587 43.4205 41.3576 42.3891 42.3891C41.3576 43.4205 39.9587 44 38.5 44H5.5C4.04131 44 2.64236 43.4205 1.61091 42.3891C0.579463 41.3576 0 39.9587 0 38.5V5.5Z"
                fill="url(#paint0_linear_1500_6220)"
                fill-opacity="0.1"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1500_6220"
                  x1="2.22536e-07"
                  y1="-37.1597"
                  x2="80.5841"
                  y2="-22.9199"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F9D423" />
                  <stop offset="1" stop-color="#F83600" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>

        <div>
          <div className="text-base font-bold leading-[1.375rem] mb-[.625rem]">
            {title}
          </div>
          <div className="text-sm font-medium leading-normal text-[#9b9b9b]">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
