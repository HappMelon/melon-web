import Image from "next/image";
import Link from "next/link";
import { Color } from "@/lib/utils";

const tags = ["coinbase", "crypto"];
const colors = Color();

export async function HotCard() {
  return (
    <div className="rounded-xl cursor-pointer bg-[#f8f8f8] inline-flex flex-col px-[1.9rem] py-[0.5rem]">
      <div className="pt-[0.94rem] flex gap-3 shrink-0 items-center">
        <div className="relative w-7 h-7 rounded-full overflow-hidden">
          <Image fill alt="image" src="/item-bg.png"></Image>
        </div>
        <div className="text-black text-sm font-normal">@oliviaaaaoh_</div>
        <div className="text-black text-opacity-40 text-xs font-normal">
          2 days ago
        </div>
      </div>
      <div className="w-96 h-24 pt-2 text-black text-lg font-semibold font-['Avenir LT Std'] leading-7">
        Coinbase has filed a formal request with the court to compel the SEC to
        establish clear rules for all digital assets.
      </div>

      <div className="flex flex-wrap gap-[.625rem] py-[.625rem] relative right-1">
        {tags.map((tag, index) => (
          <Link
            href={`/tag/${tag}`}
            style={{
              color: colors[index],
              background: `${colors[index]}10`,
            }}
            key={tag}
            className="bg-[#EAEAEA] rounded-[10px] px-2 py-1 text-sm"
          >
            #{tag}
          </Link>
        ))}
      </div>

      <div className="flex justify-between pb-2">
        <div className="flex gap-3 items-center">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden">
            <Image fill src="/item-bg.png" alt={""}></Image>
          </div>
          <div className="w-40 h-8 flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-black text-base font-normal font-['PingFang HK']">
              Coinbase
            </div>
            <div className="justify-start items-center gap-2 flex">
              <Image
                src="/message.svg"
                alt=""
                width={13}
                height={13}
                className="shrink-0"
              ></Image>
              <div className="text-black text-xs font-normal shrink-0 font-['PingFang HK']">
                1k participation
              </div>
              <Image
                src="/people.png"
                alt={""}
                width={16}
                height={11}
                className="shrink-0"
              ></Image>
              <div className="text-black text-xs font-normal font-['PingFang HK']">
                329
              </div>
            </div>
          </div>
        </div>

        {/*<MillFollowButton isFollowing={isFollowing} millId={mill.id}  />*/}
      </div>
    </div>
  );
}
