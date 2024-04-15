"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getAppConfig,
  getPointsByUserId,
  updatePointsByUserId,
} from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { connectWallet, withdrawFlr } from "@/web3/action";
import { useToast } from "@/components/ui/use-toast";
const PointsCard = ({
  userId,
  isWeb3User,
}: {
  userId: string;
  isWeb3User: boolean;
}) => {
  const { toast } = useToast();
  const { signOut } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [points, setPoints] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [estimated, setEstimated] = useState(0);
  const [appConfig, setAppConfig] = useState({
    pointConvertFlrDefault: 0,
    pointConvertFlrPercentage: 0,
  });

  useEffect(() => {
    if (appConfig) {
      let t = Math.floor((points * appConfig.pointConvertFlrPercentage) / 100);
      if (t < appConfig.pointConvertFlrDefault) {
        t = appConfig.pointConvertFlrDefault;
      }
      setEstimated(t);
    }
  }, [points]);
  const ponitsChange = (value: number) => {
    setPoints(value);
  };
  useEffect(() => {
    getPointsByUserId(userId)
      .then((res) => {
        if (res) {
          setUserPoints(res.points);
        }
        return getAppConfig();
      })
      .then((c) => {
        if (c) {
          setAppConfig(c);
        }
      })
      .catch((e) => {
        console.error("can not find user");
      });
    initConnectWallet();
  }, []);

  const initConnectWallet = async () => {
    await connectWallet().then((res) => {
      console.log("======res======", res);
      // @ts-ignore
      setAccount(res.account);
      // @ts-ignore
      setSigner(res.signer);
    });
  };

  const withdrawFunction = () => {
    const handlePoint = points + estimated;
    if (handlePoint > userPoints) {
      toast({
        title: "Your points balance is insufficient",
      });
      return;
    }
    withdrawFlr(signer, account, points)
      .then(() => {
        toast({
          title: "Points redeemed successfully",
        });
        setOpenDialog(false);
        updatePointsByUserId(userId, handlePoint);
        setUserPoints(userPoints - handlePoint);
      })
      .catch((e) => {
        toast({
          title: "Points redemption failed",
        });
        console.error("withdrawFunction:", e);
      });
  };

  return (
    <div className="rounded-[1.25rem] min-w-[20rem] w-fit bg-[#f8f8f8] px-[1.625rem] py-[1.5rem] space-y-8">
      <div className="text-base font-bold">
        <span>Points</span>
      </div>
      <div className="flex items-center">
        <div className="grow text-[1.75rem] font-bold mr-[2.5rem]">
          <div>{userPoints}</div>
        </div>
        {isWeb3User ? (
          <Dialog
            open={openDialog}
            onOpenChange={() => {
              setOpenDialog(!openDialog);
              setPoints(0);
            }}
          >
            <DialogTrigger asChild>
              <Button
                className="min-w-[6rem] w-fit box-border rounded-[40px] text-lg"
                style={{
                  background:
                    "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
                }}
              >
                <span>Withdraw</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] px-8">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">
                  Withdraw
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <div className="grid grid-rows-2 items-center gap-0 ">
                  <Label htmlFor="points" className="text-left text-base">
                    Points
                  </Label>
                  <Input
                    type="number"
                    min={0}
                    defaultValue={0}
                    className="rounded-xl focus-visible:ring-slate-300"
                    onChange={(e) => ponitsChange(Number(e.target.value))}
                  />
                </div>
                <div className="grid grid-rows-2 items-center gap-0">
                  <Label htmlFor="flr" className="text-left text-base">
                    FLR
                  </Label>
                  <Input
                    readOnly
                    min={0}
                    value={points}
                    className="rounded-xl focus-visible:ring-slate-300 bg-slate-100"
                  />
                </div>
                <div className="text-sm text-[#979C9E] font-normal space-y-2 pt-4">
                  <p>
                    Balance:{" "}
                    <span className="text-[#F97D10]">{userPoints} Points</span>{" "}
                    (1 Ponints=1 FLR)
                  </p>
                  <p>Estimated fee: {estimated} Ponints</p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={withdrawFunction}
                  className="rounded-full w-full bg-gradient-to-r from-[#F9D423] to-[#F83600]"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="min-w-[6rem] w-fit box-border rounded-[40px] text-lg"
                style={{
                  background:
                    "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
                }}
              >
                <span>Withdraw</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-[1rem] text-[2rem] font-bold text-center">
                  Upgrade Account
                </DialogTitle>
              </DialogHeader>

              <div className="px-[1.625rem] mb-[1rem] font-semibold text-xl leading-normal">
                {`Email account can't  mint because a wallet is reguired to keep your assets`}
              </div>

              <div className="px-[1.625rem] mb-[1rem]">
                <Button
                  className="w-full rounded-[40px] text-lg"
                  style={{
                    background:
                      "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
                  }}
                  onClick={() => {
                    signOut();
                    redirect("/sign-in");
                  }}
                >
                  Confirm
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default PointsCard;
