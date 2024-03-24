"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

const BackButton = () => {
  const router = useRouter();

  // 返回上一页的事件处理函数
  const goBack = () => {
    router.back();
  };
  return (
    <>
      <Button variant={"link"} className="hover:no-underline" onClick={goBack}>
        <ChevronLeftIcon className="w-8 h-8 text-[#404446]" />
        <p className="text-[#404446] font-bold">Invite Friends</p>
      </Button>
    </>
  );
};

export default BackButton;
