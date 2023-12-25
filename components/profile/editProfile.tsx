"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import { Prisma } from "@prisma/client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { AlertCircle, Loader2 } from "lucide-react";
import { editProfile } from "@/lib/actions";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import { handleFileUpload } from "@/lib/oss/get-signature";

export function EditProfileModal({
  data,
}: {
  data: Prisma.UserGetPayload<{
    include: {
      followedBy: true;
    };
  }>;
}) {
  const clerk = useClerk();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(data.name);
  const [avatar, setAvatar] = useState(data.image);
  const [isAvatarLoading, setAvatarLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bio, setBio] = useState(data.bio);

  const [clicked, setClicked] = useState(false);

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const pathname = usePathname();

  useEffect(() => {
    if (clicked && !isPending) {
      setOpen(false);
      setClicked(false);
      toast({
        title: "Updated user data",
      });
    }
  }, [isPending]);

  async function updateInfo() {
    if (avatarFile) {
      await clerk.user?.setProfileImage({ file: avatarFile }).catch((e) => {
        console.log(e, "error");
      });
    }

    await editProfile(name, bio, data.id, pathname, avatar);
  }

  return (
    <>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="w-fit cursor-pointer rounded-[2.5rem] border border-white/60 bg-white/30 py-[.5rem] px-[1.5rem] text-base"
      >
        Edit Profile
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-10 rounded-full">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="text-[32px] pb-[10px]">Edit Profile</div>
            </DialogTitle>
          </DialogHeader>

          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <div className="relative inline-flex mx-auto">
                  <div className="relative inline-flex">
                    {isAvatarLoading && (
                      <Loader2 className="h-4 w-4 animate-spin text-neutral-600 mt-1rem absolute top-0 left-0" />
                    )}

                    <img
                      className="rounded-full w-[114px] h-[114px] object-cover"
                      alt="avatar1"
                      src={avatar}
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
                          onChange={(e) => {
                            if (e.target.files) {
                              setAvatarFile(e.target.files[0]);
                              setAvatarLoading(true);
                              handleFileUpload(e.target.files[0]).then(
                                (res) => {
                                  console.log(res);
                                  res && setAvatar(res);
                                  setAvatarLoading(false);
                                },
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Name displayed on your profile"
                  className={
                    "bg-[#F8F8F8] border-1-[#BCBCBC] rounded-xl text-[#BCBCBC] transition-all"
                  }
                />
                {name.length === 0 ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Your name cannot be
                    empty.
                  </div>
                ) : name.length > 16 ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Your name is too
                    long.
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  id="bio"
                  placeholder="+ Write bio"
                  className={
                    "bg-[#F8F8F8] border-1-[#BCBCBC] rounded-xl text-[#BCBCBC] transition-all"
                  }
                />
                {name.length > 100 ? (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Your bio is too
                    long.
                  </div>
                ) : null}
              </div>
            </div>
          </form>
          <div className="flex gap-4 my-6">
            <Button
              onClick={() => {
                setBio(data.bio);
                setName(data.name);
                setAvatar(data.image);
                setOpen(false);
              }}
              variant="secondary"
              className="w-full rounded-full bg-[#f4f4f4] font-semibold text-[#9B9B9B] text-[18px]"
              disabled={
                name.length === 0 || name.length > 16 || bio.length > 100
              }
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
                if (isPending || isAvatarLoading) return;
                startTransition(() => updateInfo());
                setClicked(true);
              }}
              variant="secondary"
              className="w-full rounded-full text-[18px] bg-gradient-to-r from-[#F9D423] to-[#F83600] text-white"
              disabled={
                name.length === 0 || name.length > 16 || bio.length > 100
              }
            >
              {isPending || isAvatarLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-neutral-600" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
