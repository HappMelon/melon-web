"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState, useTransition } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import TagSelect from "@/components/post/tags-select";
import { handleFileUpload } from "@/lib/oss/get-signature";
import { CreateMill, UpdateMill } from "@/lib/actions/mill-action";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Prisma } from "@prisma/client";

export function UpdateMillDialog({
  initMill,
}: {
  initMill?: Prisma.MillGetPayload<{}>;
}) {
  const initForm = initMill
    ? {
        avatar: initMill.image,
        name: initMill.name,
        bio: initMill.bio || "",
        cost: 0, // TODO
        topics: [],
      }
    : {
        avatar: "",
        name: "",
        bio: "",
        cost: 0,
        topics: [],
      };
  const [form, setForm] = useState<{
    topics: string[];
    avatar: string;
    name: string;
    bio: string;
    cost: number;
  }>(initForm);
  const { user } = useUser();
  const path = usePathname();
  const [isPending, startTransition] = useTransition();
  async function createOrUpdateMill() {
    if (!user) return;

    if (initMill) {
      await UpdateMill({
        avatar: form.avatar,
        bio: form.bio,
        name: form.name,
        cost: form.cost,
        path,
        id: initMill.id,
      });
    } else {
      await CreateMill({
        avatar: form.avatar,
        bio: form.bio,
        name: form.name,
        cost: form.cost,
        ownerId: user?.id,
        path,
      });
    }

    reset();
    toast({
      title: "Create Mill Success",
    });
  }

  function reset() {
    setForm(initForm);
    setOpen(false);
  }

  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div>
      <Dialog onOpenChange={() => setOpen(false)} open={open}>
        <div
          onClick={(e) => {
            setOpen(true);
          }}
          style={{
            background:
              "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
          }}
          className="bg-gray-500 cursor-pointer flex text-white font-semibold items-center px-4 min-w-[120px] justify-center rounded-full py-2"
        >
          {!initMill && <img src="/plus.svg" alt="" className="pr-[.375rem]" />}
          {initMill ? "Edit" : "Create"}
        </div>
        <DialogContent className="p-10 rounded-full">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="text-[32px] pb-[10px]">
                {initMill ? "Edit" : "Create"} Mill
              </div>
            </DialogTitle>
          </DialogHeader>

          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <div className="relative inline-flex mx-auto">
                  <div className="relative inline-flex">
                    {isPending && (
                      <Loader2 className="h-4 w-4 animate-spin text-neutral-600 mt-1rem absolute top-0 left-0" />
                    )}

                    <img
                      className="rounded-full w-[114px] h-[114px] object-cover"
                      alt="avatar1"
                      src={form.avatar || "/avatar-bg.svg"}
                    />

                    <div className="flex items-center justify-center w-10 absolute right-0 bottom-0">
                      <label htmlFor="dropzone-file">
                        <Image
                          quality={50}
                          className="cursor-pointer"
                          alt="avatar"
                          src="/upload-camera.png"
                          width={35}
                          height={35}
                        ></Image>
                        <input
                          accept="image/*"
                          onChange={async (e) => {
                            if (e.target.files) {
                              // setAvatarFile(e.target.files[0]);
                              handleFileUpload(e.target.files[0]).then((url) =>
                                setForm({ ...form, avatar: url }),
                              );
                            }
                          }}
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  id="name"
                  placeholder="Mill name"
                  className={
                    "bg-[#F8F8F8] border-1-[#BCBCBC] rounded-xl text-[#BCBCBC] transition-all"
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Topics</Label>
                <TagSelect
                  selected={form.topics.map((i) => {
                    return {
                      name: i,
                      id: i,
                    };
                  })}
                  onChange={(v) =>
                    setForm({ ...form, topics: v.map((i) => i.name) })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  id="bio"
                  placeholder="+ Write bio"
                  className={
                    "bg-[#F8F8F8] border-1-[#BCBCBC] rounded-xl text-[#BCBCBC] transition-all"
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Paid Mill</Label>
                <Input
                  value={form.cost}
                  onChange={(e) =>
                    setForm({ ...form, cost: parseFloat(e.target.value) })
                  }
                  id="bio"
                  type="number"
                  placeholder=""
                  className={
                    "bg-[#F8F8F8] border-1-[#BCBCBC] rounded-xl text-[#BCBCBC] transition-all"
                  }
                />
              </div>
            </div>
          </form>
          <div className="flex gap-4 my-6">
            <DialogClose className="w-full rounded-full bg-[#f4f4f4] font-semibold text-[#9B9B9B] text-[18px]">
              <Button
                onClick={reset}
                variant="secondary"
                className="w-full rounded-full bg-[#f4f4f4] font-semibold text-[#9B9B9B] text-[18px]"
                disabled={false}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              onClick={() => {
                startTransition(createOrUpdateMill);
              }}
              variant="secondary"
              className="w-full rounded-full text-[18px] bg-gradient-to-r from-[#F9D423] to-[#F83600] text-white"
              disabled={isPending || !form.name}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin text-neutral-600" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
