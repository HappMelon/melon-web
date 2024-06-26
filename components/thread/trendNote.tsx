"use client";

import { Prisma } from "@prisma/client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import Item from ".";

export default function TrendNote({
  posts,
  column = 3,
}: {
  column?: number;
  posts: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>[];
}) {
  const [items, setItems] = useState(posts);
  const { ref, inView } = useInView();
  const gridStyle = column === 3 ? "grid-cols-3" : "grid-cols-4";

  return (
    <div className="bg-white rounded-[15px] w-full h-full">
      <div
        className={"grid gap-[2.25rem] px-[25px] py-[36px] w-full " + gridStyle}
      >
        {items.map((item, i) => {
          if (i === items.length - 1)
            return (
              <div key={item.id} ref={ref}>
                <Item posts={items} data={item} />
              </div>
            );
          return (
            <div key={item.id}>
              <Item posts={items} data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
