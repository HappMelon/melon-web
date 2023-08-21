import Index from "@/components/layouts/AppLayout";

export default function ComingSoon({ modelname }: { modelname: string }) {
  return (
    <Index>
      {/* TODO */}
      {/* Comeing soon */}
      <div className="flex flex-col items-center">
        <div className="text-[16px] font-medium mt-[27px] mb-[13px] text-center">
          Coming soon
        </div>
        <img
          className="w-[145px] h-[105px]"
          src="https://ipfs.xlog.app/ipfs/bafkreiehjdts654n2gnovkwrcm6yhwbqntacezr4xu6p6nqvhncusz65ci"
          alt=""
        />
        <div className="m-0 text-[14px] font-normal text-[#49454F] text-center max-w-[252px]">
          Illustration The {modelname} will be released soon, thank you for your
          patience.
        </div>
      </div>
    </Index>
  );
}
