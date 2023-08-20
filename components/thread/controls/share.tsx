"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Link, Send, Share } from "lucide-react";

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
        <Send className="w-[18px] h-[18px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigator.clipboard.writeText(shareData.url);
            toast({
              title: "Copied to clipboard",
            });
          }}
        >
          <Link className="mr-2 h-4 w-4" />
          Copy Link
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
        >
          <Share className="mr-2 h-4 w-4" />
          Share Twitter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
