"use client";
import { useRouter } from "next/navigation";

export function BackIcon({ title }: { title: string }) {
  const router = useRouter();

  function handleGoBack() {
    router.back();
  }

  return (
    <div className="flex items-center mt-[.25rem] mb-[1.5625rem]">
      <svg
        className="cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="12"
        viewBox="0 0 17 12"
        fill="none"
        onClick={handleGoBack}
      >
        <path
          d="M0.00053402 5.97842C0.000534043 5.53001 0.342066 5.23108 0.854366 5.23108L15.8952 5.23108C16.4075 5.23108 16.749 5.53001 16.749 5.97842C16.749 6.42682 16.4075 6.72575 15.8952 6.72575L0.854366 6.72575C0.342066 6.72575 0.000533998 6.42682 0.00053402 5.97842Z"
          fill="black"
        />
        <path
          d="M7.6949e-05 5.9787C7.69602e-05 5.7545 0.0854599 5.60503 0.256226 5.45556L6.23306 0.224201C6.57459 -0.0747338 7.08689 -0.0747337 7.42842 0.224201C7.76995 0.523136 7.76995 0.971539 7.42842 1.27047L2.04927 5.9787L7.42842 10.6869C7.76995 10.9859 7.76995 11.4343 7.42842 11.7332C7.08689 12.0321 6.57459 12.0321 6.23305 11.7332L0.256226 6.50183C0.0854599 6.35237 7.69378e-05 6.2029 7.6949e-05 5.9787Z"
          fill="black"
        />
      </svg>

      <span className="mx-[1.328rem] text-xl font-[750]">{title}</span>
    </div>
  );
}
