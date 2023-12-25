import OSS from "ali-oss";
import { linktoipfs, UploadFile } from "@/lib/upload-file";
const store = new OSS({
  region: "oss-cn-beijing",
  accessKeyId: "<Your accessKeyId>",
  accessKeySecret: "<Your accessKeySecret>",
  bucket: "happymelon",
});

const signature = store.signatureUrl("test.jpg", { expires: 3600 });

export const handleFileUpload = (file: File) => {
  return store.multipartUpload("happymelon", file, {}).then((r) => {
    console.log(r);
  });

  // return UploadFile(file)
  //   .then((res) => {
  //     return linktoipfs(res.key);
  //   })
  //   .catch((e) => console.error("Can't upload file", e));
};
