"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { createNotes, updateTagsCount } from "@/lib/actions";
import { UploadFile } from "@/lib/upload-file";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false },
);

export default function Q({
  create,
}: {
  create: { id: string; name: string; image: string };
}) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [uploadImg, setUploadImg] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const [Tags, setTags] = useState([]);

  function clearState() {
    setTitle("");
    setValue("");
    setTags([]);
  }

  const linktoipfs = (url: string) => {
    const ipfs = url.split("//")[1];
    return `https://ipfs.xlog.app/ipfs/${ipfs}`;
  };

  const handleFileUpload = (file: File) => {
    return UploadFile(file)
      .then((res) => {
        return linktoipfs(res.key);
      })
      .catch((e) => console.error("Can't upload file", e));
  };

  return (
    <div className="h-[auto] ml-[2.5rem] bg-white mt-[2.25rem] border-#EAEAEA rounded-[1rem] w-[calc(100vw-23rem)]">
      <div className="pt-[1.875rem] pl-[1.875rem] text-[32px] font-[750]">
        Create a post
      </div>
      <div className="h-[auto]  p-[1.625rem]">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Type a title..."
          className="bg-[#F8F8F8] color-[#9B9B9B] rounded-sm px-[16px] py-[12px] w-full outline-none"
        ></input>
        <MarkdownEditor
          value={value}
          onChange={setValue as unknown as (value: string) => void}
          className="!bg-[#F8F8F8] color-[#9B9B9B] mt-0"
          height="28rem"
          visible
          toolbars={["bold", "italic", "underline", "header", "olist", "ulist"]}
          placeholder={"Compose here..."}
        />
      </div>
      <div className="flex pl-[1.875rem] gap-[.6875rem]">
        <Popover>
          <PopoverTrigger>
            <div className="px-[1.125rem] py-[1.3125rem] bg-[#F5F5F5] rounded-[.3125rem]">
              <img className="w-10 h-10" src="/icon_tag.png" alt="" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[21.25rem] h-[17.5rem] ml-[16.75rem] mb-[17px]">
            <TagsInput
              value={Tags}
              onChange={(tags) => setTags(tags as never[])}
              name="tags"
            />
          </PopoverContent>
        </Popover>
        <div className="px-[1.125rem] py-[1.3125rem] bg-[#F5F5F5] rounded-[.3125rem]">
          <Label htmlFor="picture" className="w-full h-full cursor-pointer">
            <img className="w-10 h-10" src="/icon_camara.png" alt="" />
          </Label>
          <Input
            onChange={(e) => {
              console.log(e);
              if (e.target.files) {
                handleFileUpload(e.target.files[0]).then((res) => {
                  console.log(res);
                  setUploadImg([...uploadImg, res as string]);
                  console.log(uploadImg);
                });
              }
            }}
            id="picture"
            type="file"
            placeholder=""
            className="hidden"
          ></Input>
        </div>
        <div className="px-[1.125rem] py-[1.3125rem] bg-[#F5F5F5] rounded-[.3125rem] cursor-pointer">
          <img
            className="w-10 h-10"
            src="/icon_video.png"
            alt=""
            onClick={() => {
              toast({
                title: "video upload coming soon!",
              });
            }}
          />
        </div>
      </div>
      <div className="flex justify-end gap-[13px] pb-[67px] pr-[52px]">
        <Button
          className="px-[1.375rem] py-[.5rem] rounded-[2.5rem] bg-[#F4F4F4] text-[#9B9B9B] font-medium text-[1.25rem] hover:bg-[#EAEAEA]"
          onClick={() => {
            clearState();
            toast({
              title: "Cancel Post.",
            });
          }}
        >
          Cancel
        </Button>
        <Button
          className="px-[1.375rem] py-[.5rem] rounded-[2.5rem] font-medium text-[1.25rem]"
          style={{
            background:
              "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
          }}
          onClick={() => {
            startTransition(async () => {
              await createNotes(
                title,
                value,
                Tags,
                uploadImg,
                create.id,
                pathname,
              );
              clearState();
              toast({
                title: "Publish Post.",
              });
            });
            startTransition(() => updateTagsCount([...Tags]));
          }}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-neutral-600 mt-1rem" />
          ) : (
            "Publish"
          )}
        </Button>
      </div>
      <div className="flex gap-[1.25rem] ml-[1.875rem] pb-[16rem]">
        {uploadImg.map((img, index) => (
          <div key={index} className="relative">
            <img src={img} alt="" className="max-w-[265px] h-[160px]" />
            <div
              className="absolute top-0 right-0 flex items-center justify-center rounded-full cursor-pointer rounded-[50%] mt-[.5625rem] mr-[.5rem] px-[.5rem] py-[.375rem]"
              style={{
                background: "rgba(217, 217, 217, 0.30)",
              }}
              onClick={() => {
                const newImg = uploadImg.filter((item, i) => i !== index);
                setUploadImg(newImg);
              }}
            >
              <img src="/delete.svg" alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
