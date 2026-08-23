import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Heaven Craft",
    description:
      "Civil construction, interior design, and exterior architecture in Hassan, Karnataka.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b0d",
    theme_color: "#0a0b0d",
    icons: [
      {
        src: "/media/brand/logo.png",
        sizes: "412x398",
        type: "image/png",
      },
    ],
  };
}
