import prisma from "@/lib/prisma";
import { Color } from "@/lib/utils";

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

  const colors = Color();

  return (
    <div className="w-[21.875rem] h-auto bg-white rounded-[.625rem]">
      <div className="flex items-center pt-[1.875rem] pl-[1.75rem]">
        <div className="text-lg font-bold">Hot Topics</div>
        <img src="/🦆 icon _arrow back_.svg" alt="" className="pl-[.375rem]" />
      </div>
      <div className="flex flex-wrap gap-4 max-w-full tex pt-[1.25rem] pl-[1.75rem] pb-[1.5625rem]">
        {topics && colors
          ? topics.map((tag, index) => {
              const colorClass = `${colors[index]} bg-[#9B9B9B] px-[.625rem] py-[.25rem] rounded-[.3125rem] cursor-pointer`;
              console.log(colorClass);
              return (
                colors[index] && (
                  <div key={index} className={colorClass}>
                    #{Object.values(tag)}
                  </div>
                )
              );
            })
          : ""}
      </div>
    </div>
  );
}
