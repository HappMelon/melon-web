"use client";

import Index from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { UploadFile } from "@/lib/upload-file";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Q() {
  const [value, setValue] = useState("");
  const [fileList, setFileList] = useState<string[]>([]);

  function onChange(value: string) {
    const handleFileUpload = (file: File) => {
      UploadFile(file)
        .then((res) => {
          console.log("res", res);
        })
        .catch((e) => console.error("Can't upload file", e));
    };

    setValue(value);

    const img = value.match(/<img.*?(?:>|\/>)/gi);

    // upload the latest image in the queue
    if (img && fileList.length) {
      const src = img[fileList.length].match(/src=['"]?([^'"]*)['"]?/i)![1];

      if (!fileList.includes(src)) {
        const file = fetch(src)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], `${img[2]}`, {
              type: `image/${img[1]}`,
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
        <Button>Publish</Button>
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

export default function Page() {
  return (
    <Index>
      <Q />
    </Index>
  );
}
