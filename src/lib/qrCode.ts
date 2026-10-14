import QRCode from "qrcode";

export async function generateQRCodeDataUrl(
  text: string,
  options?: {
    width?: number;
    darkColor?: string;
    lightColor?: string;
  }
): Promise<string> {
  const width = options?.width || 360;
  const dark = options?.darkColor || "#0C0D12";
  const light = options?.lightColor || "#FFFFFF";

  try {
    return await QRCode.toDataURL(text, {
      width,
      margin: 2,
      errorCorrectionLevel: "H",
      color: {
        dark,
        light,
      },
    });
  } catch (error) {
    console.error("Failed to generate QR code data URL:", error);
    return "";
  }
}
