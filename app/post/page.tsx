"use client";

import Index from "@/components/layouts/AppLayout";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Q() {
  const [value, setValue] = useState("");

  // https://juejin.cn/post/7195124289501134905
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote", ""],
      [{ header: [1, 2, false] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
    ],
  };

  return <ReactQuill theme="snow" modules={modules} value={value}></ReactQuill>;
}

export default function Page() {
  return (
    <Index>
      <Q />
    </Index>
  );
}
