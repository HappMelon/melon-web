"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateMillDialog } from "@/components/mill/update-mill-dialog";
import { Prisma } from "@prisma/client";
import { ReactNode } from "react";

export function MillTabs({
  mills,
  children,
}: {
  children: ReactNode;
  mills: Prisma.MillGetPayload<{
    include: {
      _count: {
        select: {
          posts: true;
          subscribers: true;
        };
      };
    };
  }>[];
}) {
  return (
    <div className="px-14">
      <Tabs defaultValue="most">
        <div className="flex items-center justify-between">
          <TabsList className="flex justify-start gap-[1.5rem] mt-[1.0625rem] bg-white">
            <TabsTrigger value="most" className="!bg-[#F8F8F8] rounded-md">
              Most Popular
            </TabsTrigger>
            <TabsTrigger value="nearby" className="!bg-[#F8F8F8] rounded-md">
              Nearby
            </TabsTrigger>
            <TabsTrigger value="premium" className="!bg-[#F8F8F8] rounded-md">
              Premium
            </TabsTrigger>
          </TabsList>
          <UpdateMillDialog />
        </div>
        {children}
      </Tabs>
    </div>
  );
}
