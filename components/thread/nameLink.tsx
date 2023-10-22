"use client";

import { useRouter } from "next/navigation";

export default function NameLink({
  username,
  id,
}: {
  id: string;
  username: string;
}) {
  const router = useRouter();

  return (
    <div
      className="font-semibold cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/profile/${id}`);
      }}
    >
      {username}
    </div>
  );
}
