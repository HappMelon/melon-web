"use client";

import { useRouter } from "next/navigation";

export default function NotSigninFollowButton() {
  const router = useRouter();
  return (
    <div
      style={{
        background: "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
      }}
      className="cursor-pointer flex rounded-[2.5rem] px-[.875rem] py-[.5rem] text-white "
      onClick={() => {
        router.push("/sign-in");
      }}
    >
      <img src="/🦆 icon _plus_.svg" alt="" className="pr-[.375rem]" />
      Follow
    </div>
  );
}
