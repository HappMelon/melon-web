"use client";

import { useRouter } from "next/navigation";

export default function NotSigninFollowButton() {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer flex rounded-[2.5rem] px-[.875rem] text-white"
      onClick={() => {
        router.push("/sign-in");
      }}
    >
      Follow
    </div>
  );
}
