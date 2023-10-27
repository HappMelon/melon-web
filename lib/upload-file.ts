export const UploadFile = async (blob: Blob) => {
  const formData = new FormData();
  formData.append("file", blob);

  const response = await fetch(
    "https://ipfs-relay.crossbell.io/upload?gnfd=t",
    { method: "POST", body: formData },
  );
  return {
    key: (await response.json()).url,
  };
};

export const linktoipfs = (url: string) => {
  const ipfs = url.split("//")[1];
  return `https://ipfs.xlog.app/ipfs/${ipfs}`;
};
