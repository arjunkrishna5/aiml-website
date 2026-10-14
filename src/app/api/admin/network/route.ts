import { NextResponse } from "next/server";
import os from "os";

export async function GET() {
  const interfaces = os.networkInterfaces();
  let localIp = "localhost";

  // Search for the primary non-internal IPv4 address
  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name];
    if (iface) {
      for (const alias of iface) {
        if (alias.family === "IPv4" && !alias.internal) {
          // Avoid virtual adapter subnets if possible
          if (!name.toLowerCase().includes("vethernet") && !name.toLowerCase().includes("virtual")) {
            localIp = alias.address;
            break;
          }
        }
      }
    }
    if (localIp !== "localhost") break;
  }

  return NextResponse.json({
    localIp,
    port: 3000,
    networkUrl: `http://${localIp}:3000`,
  });
}
