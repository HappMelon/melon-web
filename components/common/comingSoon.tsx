import Index from "@/components/layouts/AppLayout";

export default function ComingSoon() {
  return (
    <Index>
      <div className="flex flex-col items-center">
        <img className="w-[146px] h-[145px]" src="/comingSoon.png" alt="" />
        <div className="font-normal text-[2.5rem]">Coming Soon!</div>
      </div>
    </Index>
  );
}
