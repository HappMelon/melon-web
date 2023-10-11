import prisma from "@/lib/prisma";
import { Color } from "@/lib/utils";
import Link from "next/link";

export default async function HotTopics() {
  const topics = await prisma.tagsFrequencies.groupBy({
    by: ["tag"],
    orderBy: {
      _count: {
        tag: "desc",
      },
    },
    take: 12,
  });

  const colors = Color();

  return (
    <div className="w-[21.875rem] h-auto bg-white rounded-[.625rem]">
      <div className="flex items-center pt-[1.875rem] pl-[1.75rem]">
        <div className="text-lg font-bold">Hot Topics</div>
        <img src="/🦆 icon _arrow back_.svg" alt="" className="pl-[.375rem]" />
      </div>
      <div className="flex flex-wrap gap-4 max-w-full tex pt-[1.25rem] px-[1.75rem] pb-[1.5625rem]">
        {topics && colors
          ? topics.map((tag, index) => {
              const color = colors[index];
              const colorClass = `px-[.625rem] py-[.25rem] rounded-[.3125rem] cursor-pointer`;
              return (
                colors[index] && (
                  <Link
                    href={`/tag/${Object.values(tag)}`}
                    key={index}
                    className={colorClass}
                    style={{
                      color: color,
                      background: `${color}10`,
                    }}
                  >
                    #{Object.values(tag)}
                  </Link>
                )
              );
            })
          : ""}
      </div>
    </div>
  );
}
