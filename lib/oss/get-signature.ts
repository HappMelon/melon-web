import OSS from "ali-oss";
import * as process from "process";

const store = new OSS({
  region: "oss-cn-beijing",
  accessKeyId: process.env.NEXT_PUBLIC_AliAccessKeyId || "",
  accessKeySecret: process.env.NEXT_PUBLIC_AliAccessSecret || "",
  bucket: "happymelon",
});

const prefix = "https://happymelon.oss-cn-beijing.aliyuncs.com/";
export const handleFileUpload = async (file: File) => {
  const name = "avatar/" + Date.now() + "-" + file.name;
  const res = await store.multipartUpload(name, file, {});
  return prefix + res.name;
};
