"use client";

import { Button } from "@/components/ui/button";
import { createNotes } from "@/lib/actions";
import { UploadFile } from "@/lib/upload-file";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "../ui/use-toast";

export default function Q({
  create,
}: {
  create: { id: string; name: string; image: string };
}) {
  const [value, setValue] = useState("");
  const [fileList, setFileList] = useState<string[]>([]);
  const [src, setSrc] = useState("");
  const [isPending, startTransition] = useTransition();
  const [clicked, setClicked] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (clicked && !isPending) {
      setValue("");
      setClicked(false);
      toast({
        title: "Note created",
      });
    }
  }, [isPending]);

  function onChange(value: string) {
    setValue(value);

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

    const img = value.match(/<img.*?(?:>|\/>)/gi);

    // upload the latest image in the queue
    if (img && img.length > fileList.length) {
      console.log("fileList", fileList);

      const lastImg = img.slice(-1)[0];
      const src = lastImg.match(/src=['"]?([^'"]*)['"]?/i)![1];

      if (!fileList.includes(src)) {
        const file = fetch(src)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], `${lastImg}`, {
              type: `image/${lastImg.match(/image\/(\w+)/i)![1]}`,
            });
            return handleFileUpload(file);
          })
          .then((newSrc) => {
            setFileList([...fileList, src]);
            const newValue = value.replace(
              lastImg,
              lastImg.replace(/src=['"]?([^'"]*)['"]?/i, `src="${newSrc}"`),
            );
            setValue(newValue);
          })
          .catch((e) => console.error("Can't upload file", e));
      }
    }
  }

  // https://juejin.cn/post/7195124289501134905
  // TODO: React Quill like not support add Title Edit
  const modules = {
    toolbar: [
      "bold",
      "italic",
      "underline",
      { header: 1 },
      { header: 2 },
      "blockquote",
      "code-block",
      "code",
      "link",
      { list: "ordered" },
      { list: "bullet" },
      "image",
    ],
  };

  return (
    <div className="h-[50vh] ml-[2.5rem]">
      <div className="flex justify-end mb-1 gap-1">
        <Button
          onClick={() => {
            // TODO 图片根据 ipfs 地址存储
            startTransition(() => createNotes(value, create.id, pathname));
            setClicked(true);
          }}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-neutral-600" />
          ) : (
            "Post"
          )}
        </Button>
      </div>
      <ReactQuill
        placeholder="Compose here..."
        className="h-full"
        modules={modules}
        value={value}
        onChange={onChange}
      ></ReactQuill>
    </div>
  );
}
