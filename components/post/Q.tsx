"use client";

import { Button } from "@/components/ui/button";
import { createNotes } from "@/lib/actions";
import { UploadFile } from "@/lib/upload-file";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Q({
  create,
}: {
  create: { id: string; name: string; image: string };
}) {
  const [value, setValue] = useState("");
  const [fileList, setFileList] = useState<string[]>([]);
  const [src, setSrc] = useState("");
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onChange(value: string) {
    setValue(value);

    const linktoipfs = (url: string) => {
      const ipfs = url.split("//")[1];
      return `https://ipfs.xlog.app/ipfs/${ipfs}`;
    };

    const handleFileUpload = (file: File) => {
      UploadFile(file)
        .then((res) => {
          const newValue = value.replace(
            /src=['"]([^'"]*)['"]/g,
            `src="${linktoipfs(res.key)}"`,
          );
          setValue(newValue);
        })
        .catch((e) => console.error("Can't upload file", e));
    };

    const img = value.match(/<img.*?(?:>|\/>)/gi);

    // upload the latest image in the queue
    if (img && img.length > fileList.length) {
      console.log("fileList", fileList);

      const src = img![fileList.length].match(/src=['"]?([^'"]*)['"]?/i)![1];

      if (!fileList.includes(src)) {
        setSrc(src);
        const file = fetch(src)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], `${img![2]}`, {
              type: `image/${img![1]}`,
            });
            handleFileUpload(file);
          })
          .then((res) => {
            setFileList([...fileList, src]);
          })
          .finally(() => {
            console.log("finally");
          });
      }
    }
  }

  useEffect(() => {}, []);

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
    <div>
      <div className="flex justify-end mb-1 gap-1">
        <Button>Save as Draft</Button>
        <Button
          onClick={() => {
            // TODO 图片根据 ipfs 地址存储
            startTransition(() => createNotes(value, create.id, pathname));
          }}
        >
          Publish
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
