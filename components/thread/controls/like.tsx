"use client";

import { likeThread, unlikeThread } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function Like({
  post,
  numPosts,
  likes,
}: {
  post: string;
  numPosts?: number;
  likes: string[];
}) {
  const [liked, setLiked] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (user) {
      if (likes.includes(user.id)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [user, numPosts]);

  const handleLike = () => {
    const wasLiked = liked;
    setLiked(!liked);
    if (user) {
      if (!wasLiked) {
        startTransition(() => likeThread(post, user.id, pathname));
      } else {
        startTransition(() => unlikeThread(post, user.id, pathname));
      }
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleLike();
      }}
    >
      <img
        src={liked ? "/liked.svg" : "/like.svg"}
        alt=""
        className="w-[1.8125rem] h-[1.8125rem]"
      />
    </button>
  );
}
