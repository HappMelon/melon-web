"use client";

import { Button } from "../ui/button";

export default function SelfShare({
  name,
  username,
}: {
  name: string;
  username: string;
}) {
  const host = typeof window !== "undefined" ? window.location.host : "";
  console.log("host:", host);
  const shareData = {
    title: "Threads",
    text: "Link to " + name + "'s post on Threads",
    url: "http://" + host + "/" + username,
  };

  return (
    <Button
      onClick={() => navigator.share(shareData)}
      variant="outline"
      className="w-full"
    >
      Share Profile
    </Button>
  );
}
