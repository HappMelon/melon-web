"use client";

import { Button } from "@/components/ui/button";
import Countdown from "@/components/thread/Countdown";

export default function ProposalCard({
  status,
  totalPrice = 0,
  inputPrice = 0,
  onBtnClick = () => {},
}: {
  status: "Unstarted" | "Ongoing" | "Finished";
  totalPrice: number;
  inputPrice?: number;
  onBtnClick?: () => void;
}) {
  return (
    <div className="w-full box-border px-[1.75rem] py-[1.5rem] bg-white border border-[#e6e6e6] rounded-[10px] shadow-[0_0_4px_0_rgba(0,0,0,0.15)]">
      {status === "Unstarted" && (
        <div
          className="mb-[1.875rem] px-[1.25rem] py-[1rem] rounded-[10px] border border-[#e6e6e6] shadow-[0_0_4px_0_rgba(0,0,0,0.15)] text-white text-sm font-bold leading-normal "
          style={{
            background:
              "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
          }}
        >
          Add Validation Staking, you will have the opportunity to get the
          Staked Validation 5% tokens reward !
        </div>
      )}

      <div className="text-lg text-black font-bold mb-[1.25rem]">
        Exposure Staking
      </div>

      <div className="mb-[1.25rem]">
        <div className="mb-[1.25rem]">
          <div className="mb-[.9375rem] text-[#9b9b9b] text-sm font-medium">
            Total price
          </div>

          <div>
            <span
              className="text-2xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
              }}
            >
              {totalPrice} FLR
            </span>
          </div>
        </div>

        {status !== "Finished" ? (
          <div>
            <div className="mb-[.9375rem] text-[#9b9b9b] text-sm font-medium">
              Ends in
            </div>

            <div className="flex items-center mb-[.3125rem]">
              <Countdown targetDate={new Date("2023-10-31T00:00:00")} />
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-[.9375rem] text-[#9b9b9b] text-sm font-medium">
              Ends in October 12, 2022 at 16:40 PM
            </div>
          </div>
        )}
      </div>

      {!!inputPrice && status === "Ongoing" && (
        <div className="my-[1.25rem] text-center py-[.9375rem] border rounded-[15px] border-[#f9d423]">
          <div>
            <span
              className="mb-[.3125rem] bg-clip-text text-transparent text-sm font-bold"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
              }}
            >
              Your Validation Staking price
            </span>
          </div>
          <div>
            <span
              className="bg-clip-text text-transparent font-bold text-2xl"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
              }}
            >
              {inputPrice} FLR
            </span>
          </div>
        </div>
      )}

      {status === "Unstarted" && (
        <Button
          className="w-full rounded-[40px] text-lg"
          style={{
            background:
              "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
          }}
          onClick={() => {
            onBtnClick();
          }}
        >
          Stake
        </Button>
      )}

      {/* {status === "Ongoing" && (
        <Button
          className="w-full rounded-[40px] text-lg"
          style={{
            background:
              "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
          }}
        >
          Cancel
        </Button>
      )} */}
    </div>
  );
}
