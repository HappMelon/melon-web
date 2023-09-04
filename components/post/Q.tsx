"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { createNotes, updateTagsCount } from "@/lib/actions";
import { Loader2, Tag } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";

import dynamic from "next/dynamic";
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
  const [isPending, startTransition] = useTransition();
  const [clicked, setClicked] = useState(false);
  const pathname = usePathname();
  const [Tags, setTags] = useState([]);

  function clearState() {
    setTitle("");
    setValue("");
    setTags([]);
  }

  useEffect(() => {
    if (clicked) {
      clearState();
      toast({
        title: "created",
      });
      setClicked(false);
    }
  }, [clicked]);

  return (
    <div className="h-[auto] ml-[2.5rem] bg-white mt-[2.25rem] border-#EAEAEA rounded-[1rem]">
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
          className="!bg-[#F8F8F8] color-[#9B9B9B] mt-1"
          height="500px"
          visible
          toolbars={["bold", "italic", "underline", "header", "olist", "ulist"]}
          placeholder={"Compose here..."}
        />
      </div>
      <div className="flex pl-[1.875rem] gap-[4px]">
        <Popover>
          <Button>
            <PopoverTrigger>Tags</PopoverTrigger>
          </Button>
          <PopoverContent className="w-[21.25rem] h-[17.5rem] ml-[16.75rem] mb-[17px]">
            <TagsInput
              value={Tags}
              onChange={(tags) => setTags(tags as never[])}
              name="tags"
            />
          </PopoverContent>
        </Popover>
        <Button>Audio</Button>
        <Button>Video</Button>
      </div>
      <div className="flex justify-end gap-[13px] pb-[67px] pr-[52px]">
        <Button
          onClick={() => {
            clearState();
            toast({
              title: "cancel created",
            });
          }}
        >
          cancel
        </Button>
        <Button
          onClick={() => {
            console.log(Tags);
            startTransition(() =>
              createNotes(title, value, Tags, create.id, pathname),
            );
            startTransition(() => updateTagsCount([...Tags]));
            setClicked(true);
          }}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-neutral-600 mt-1rem" />
          ) : (
            "Publish"
          )}
        </Button>
      </div>
    </div>
  );
}
