"use client";

import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Item from ".";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ExploreDefaultFistPicShowData } from "@/lib/utils";
import Image from "next/image";
export default function HomePosts({
  posts,
  follows,
  column = 3,
  searchQuery = "",
}: {
  column?: number;
  searchQuery?: string;
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
  follows: Prisma.PostGetPayload<{
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
  const [noMore, setNoMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    setNoMore(false);
    setItems(posts);
  }, [posts]);

  // loading more
  useEffect(() => {
    const loadMore = async () => {
      const morePosts = await fetch(
        `/api/loadMore?cursor=${items[items.length - 1].id}&q=${searchQuery}`,
        {
          method: "GET",
        },
      ).then((res) => res.json());
      setNoMore(!morePosts.hasMore);
      setItems([...items, ...morePosts.data]);
      setLoading(false);
    };

    if (inView && !noMore && !loading) {
      setLoading(true);
      loadMore();
      console.log("LOADING MORE");
    }
  }, [inView, items, loading, noMore, searchQuery]);

  useEffect(() => {
    setItems(posts);
  }, [posts]);

  // loadMore

  return (
    <div className="rounded-[15px] w-full">
      <div
        className={`grid grid-cols-${column} gap-[2.25rem] rounded-[15px] pt-10 px-[25px] bg-white`}
      >
        <div className="bg-[#F4F4F4] rounded-xl min-w-[13rem]">
          <Carousel className="w-full h-full">
            <CarouselContent className="w-full h-full ml-0">
              {ExploreDefaultFistPicShowData.map((i, index) => (
                <CarouselItem
                  key={index}
                  className="pl-0 w-full h-full opacity-70"
                >
                  <a href={i.redirect} className="">
                    <Image
                      src={i.path}
                      alt={i.alt}
                      width={358}
                      height={546}
                      className="w-full h-full"
                    />
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="w-9 h-9 left-2 z-10 bg-gradient-to-b from-[#F9D423] to-[#FF6B00]" />
            <CarouselNext className="w-9 h-9 right-2 z-10 bg-gradient-to-b from-[#F9D423] to-[#FF6B00]" />
          </Carousel>
        </div>
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
