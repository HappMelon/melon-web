"use client";

import { Prisma } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Relation() {
  return (
    <div className="shrink-0 w-[22.5rem]">
      <Tabs defaultValue="Following">
        <TabsList className="flex justify-start gap-[1.5rem] mb-[1.875rem] mt-[1.0625rem] ml-[1.9375rem] bg-white">
          <TabsTrigger value="Following" className="!bg-[#F8F8F8]">
            Following
          </TabsTrigger>
          <TabsTrigger value="Subscribers" className="!bg-[#F8F8F8]">
            Subscribers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Following">
          <div>Following</div>
        </TabsContent>

        <TabsContent value="Subscribers">
          <div>Subscribers</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
