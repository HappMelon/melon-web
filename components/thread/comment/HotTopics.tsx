import prisma from "@/lib/prisma";

export default async function HotTopics() {
  const topics = await prisma.tagsFrequencies.groupBy({
    by: ["tag"],
    orderBy: {
      _count: {
        tag: "desc",
      },
    },
    take: 10,
  });

  return (
    <div className="w-[21.875rem] h-[13.875rem] bg-white rounded-[.625rem]">
      <div className="flex items-center pt-[1.875rem] pl-[1.75rem]">
        <div className="text-lg font-bold">Hot Topics</div>
        <img src="/🦆 icon _arrow back_.svg" alt="" className="pl-[.375rem]" />
      </div>
      <div className="flex flex-wrap gap-4 max-w-full">
        {topics
          ? topics.map((tag, index) => {
              return (
                <div key={index} className="bg-white">
                  {Object.values(tag)}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
