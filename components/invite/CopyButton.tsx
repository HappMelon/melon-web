"use client";
import React from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";

const CopyButton = ({
  value,
  des,
  className,
}: {
  value: string;
  des: string;
  className?: string;
}) => {
  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "Copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copied to clipboard failed",
      });
    }
  };

  return (
    <Button onClick={copyInviteLink} className={className}>
      {des}
    </Button>
  );
};

export default CopyButton;
