"use client";
import React, { useRef, useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Scan } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../ui/button"; // 确保路径正确
import { toast, useToast } from "../ui/use-toast";
import Image from "next/image";

// 图片加载函数，用Promise封装以便使用async/await
const loadImage = (
  src: string,
  crossOrigin?: string,
): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
    if (crossOrigin) image.crossOrigin = crossOrigin;
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

// 画圆形图像函数的类型定义
type DrawRoundedImageFunction = (
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  x: number,
  y: number,
  width: number,
  height: number,
) => void;

// 画圆形图像
const drawRoundedImage: DrawRoundedImageFunction = (
  ctx,
  image,
  x,
  y,
  width,
  height,
) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + width / 2, y + height / 2, width / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(image, x, y, width, height);
  ctx.restore();
};

// 下载图片函数的类型定义
type DownloadImageFunction = (
  imageUrl: string,
  imageName: string,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
) => void;

// 下载图片
const downloadImage: DownloadImageFunction = (
  imageUrl,
  imageName,
  setOpenDialog,
) => {
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = imageName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setOpenDialog(false);
  toast({
    title: "Successfully download the QR code",
  });
};

// 对话框组件的属性类型定义
interface DialogDemoProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string;
}

// 对话框组件
const QRDialog: React.FC<DialogDemoProps> = ({
  openDialog,
  setOpenDialog,
  imageUrl,
}) => (
  <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
    <Dialog.Portal>
      <Dialog.Overlay
        onClick={() => setOpenDialog(false)}
        className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0"
      />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px]  p-[25px]  focus:outline-none">
        <div className="flex flex-col items-center gap-4">
          <Image src={imageUrl} width={343} height={507} alt="QR Code" />
          <Button
            className="bg-[#2AC984] w-full rounded-full h-12 border-[#2AC984]"
            onClick={() => downloadImage(imageUrl, "invite.png", setOpenDialog)}
          >
            Save
          </Button>
        </div>
        <Dialog.Close className="absolute top-0 right-0" />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

// 主组件的属性类型定义
interface QRCodeProps {
  inviteLink: string;
  userName: string;
  userImage: string;
}

// QRCode 组件
const QRCode: React.FC<QRCodeProps> = ({ inviteLink, userName, userImage }) => {
  const [imageUrl, setImageUrl] = useState("/avatar-bg.svg");
  const [dialogOpen, setDialogOpen] = useState(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  // 生成并设置QR图像
  const makeQRImage = async () => {
    const originalCanvas = qrCodeRef.current?.querySelector("canvas");
    if (originalCanvas) {
      const newCanvas = document.createElement("canvas");
      const ctx = newCanvas.getContext("2d");
      newCanvas.width = 344;
      newCanvas.height = 507;

      try {
        const background = await loadImage("/invite_download.png");
        const avatarImage = await loadImage(userImage, "anonymous");
        const qrCodeImage = await loadImage(
          originalCanvas.toDataURL("image/png"),
        );
        if (ctx) {
          ctx.drawImage(background, 0, 0, newCanvas.width, newCanvas.height);
          drawRoundedImage(
            ctx,
            avatarImage,
            newCanvas.width / 2 - 88 / 2 + 0.5,
            0.5,
            88,
            88,
          );
          ctx.font = "700 24px 'Avenir LT Std'";
          ctx.fillStyle = "#202325";
          ctx.textAlign = "center";
          ctx.fillText(userName, newCanvas.width / 2, 130);
          ctx.drawImage(
            qrCodeImage,
            (newCanvas.width - 148) / 2,
            (newCanvas.height - 148) / 2 + 45,
            148,
            148,
          );

          setImageUrl(newCanvas.toDataURL("image/png"));
        } else {
          toast({
            title: "unload CanvasRenderingContext2D",
          });
        }
      } catch (e) {
        toast({
          title: "load image failed",
        });
      }
    }
  };

  //触碰和鼠标事件
  const handleInteractionStart = () => {
    makeQRImage();
    setDialogOpen(true);
  };

  return (
    <div
      ref={qrCodeRef}
      onTouchStart={handleInteractionStart}
      onMouseUp={handleInteractionStart}
    >
      <div className="relative w-60 h-60">
        <Scan size={240} color="#2AC984" strokeWidth={0.4} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <QRCodeCanvas value={inviteLink} level="H" />
        </div>
      </div>

      <QRDialog
        openDialog={dialogOpen}
        setOpenDialog={setDialogOpen}
        imageUrl={imageUrl}
      />
    </div>
  );
};

export default QRCode;
