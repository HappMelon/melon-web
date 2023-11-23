"use client";

export default function Address({ address }: { address: string }) {
  return (
    <div className="rounded-[3.125rem] bg-[#f8f8f8] px-[2.25rem] py-[.875rem]">
      <div className="flex items-center text-[#9B9B9B] text-lg">
        <p className="truncate w-[3.5rem]">{address}</p>
        <span>{address.slice(-4)}</span>
      </div>
    </div>
  );
}
