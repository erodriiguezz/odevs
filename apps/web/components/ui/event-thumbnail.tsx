"use client";

import { useState } from "react";
import Image from "next/image";
import { ALLOWED_IMAGE_HOSTS } from "@/lib/data/allowed-image-hosts";

interface EventThumbnailProps {
  src: string;
  isSideThumbnail: boolean;
}

function isAllowedImageHost(url: string): boolean {
  try {
    return ALLOWED_IMAGE_HOSTS.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

/**
 * next/image throws for hosts outside next.config.ts's remotePatterns, which
 * would otherwise take down the whole card. Skip unlisted hosts up front,
 * and hide the thumbnail if it fails to load for any other reason (404, etc).
 */
export function EventThumbnail({ src, isSideThumbnail }: EventThumbnailProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !isAllowedImageHost(src)) return null;

  return (
    <div
      className={
        isSideThumbnail
          ? "relative hidden shrink-0 overflow-hidden rounded-xl bg-surface sm:order-last sm:block sm:aspect-video sm:w-28 md:w-36"
          : "relative aspect-video w-full shrink-0 overflow-hidden bg-surface"
      }
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes={
          isSideThumbnail
            ? "(min-width: 768px) 144px, 112px"
            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        }
        onError={() => setFailed(true)}
      />
    </div>
  );
}
