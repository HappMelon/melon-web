"use client";
import React from "react";
import { toast } from "@/components/ui/use-toast";

const CopyButton = ({ value, des }: { value: string; des: string }) => {
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

  return <button onClick={copyInviteLink}>{des}</button>;
};

export default CopyButton;
