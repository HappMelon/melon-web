"use client";

export default function HotTopics({ tags }: { tags: string[] }) {
  return (
    <div className="w-[274px] h-[240px] bg-white ml-[2.125rem] mt-[39px] rounded-[10px] p-4">
      Hot Topics
      <div className="flex flex-wrap gap-4 max-w-full">
        {tags
          ? tags.map((tag) => {
              console.log(tag);
              return (
                <div key={tag} className="bg-white">
                  {Object.values(tag)}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
