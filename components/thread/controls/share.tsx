"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { reposts } from "@/lib/actions";

export default function ShareButton({
  post,
  name,
}: {
  post: string;
  name: string;
}) {
  const { toast } = useToast();

  const host = typeof window !== "undefined" ? window.location.host : "";
  const shareData = {
    title: "Threads",
    text: "Link to " + name + "'s post on Threads",
    url: "http://" + host + "/t/" + post,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img src="/reposts.svg" alt="" onClick={() => reposts(post)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="top"
        className="px-[1.5625rem] py-[1.5625rem]"
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigator.clipboard.writeText(shareData.url);
            toast({
              title: "Copied to clipboard",
            });
          }}
          className="cursor-pointer"
        >
          <img src="/Vector.svg" alt="" />
          <div className="ml-[1rem] font-bold text-[1.125rem]">Copy link</div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(
              `https://twitter.com/intent/tweet?url=${
                shareData.url
              }&text=${encodeURIComponent(shareData.text)}&via=flaredapp`,
            );
          }}
          className="cursor-pointer"
        >
          <img src="/🦆 icon _Twitter_.svg" alt="" />
          <div className="ml-[1rem] font-bold text-[1.125rem]">
            Share to Twitter
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
