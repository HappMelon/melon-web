import { HotTopics } from "@/components/mill/hot-topics";
import { MillTabs } from "@/components/mill/mill-tabs";
import prisma from "@/lib/prisma";
import { TabsContent } from "@/components/ui/tabs";
import { TribeCard } from "@/components/mill/mill-tab-comp/tribe-card";
export default async function Page() {
  const isHot = false;
  const mills = await prisma.mill.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    include: {
      _count: {
        select: {
          posts: true,
          subscribers: true,
        },
      },
      posts: {
        take: 1,
      },
    },
  });

  return (
    <div className="flex left-52 flex-col transition-all 2xl:left-72 right-8 box-border pl-16 ml-6 rounded-[.9375rem] bg-white absolute top-[6.75rem] pb-10 h-full pt-6">
      {isHot && <HotTopics />}
      <MillTabs mills={mills}>
        <div className="pl-1 pt-2">
          <TabsContent value="most" className="grid-cols-2 grid gap-4">
            {mills.map((mill, i) => (
              <TribeCard key={i} data={mill} />
            ))}
          </TabsContent>
        </div>
      </MillTabs>
    </div>
  );
}
