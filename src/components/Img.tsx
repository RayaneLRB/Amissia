import { useState, useEffect, useRef, type ImgHTMLAttributes } from 'react';

/**
 * Drop-in <img> replacement that converts base64 data URLs
 * to short Blob URLs for reliable rendering.
 *
 * Browsers can choke on 200KB+ data URL strings in src attributes,
 * especially inside complex CSS (overflow-hidden, object-cover, aspect-ratio).
 * Blob URLs are short (blob:http://...) and always render correctly.
 */

function dataURLtoBlob(dataUrl: string): Blob | null {
  try {
    const [header, base64] = dataUrl.split(',');
    if (!header || !base64) return null;
    const mimeMatch = header.match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
  } catch {
    return null;
  }
}

export default function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { src, ...rest } = props;
  const [displaySrc, setDisplaySrc] = useState<string>('');
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // Revoke previous blob URL
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    if (!src) {
      setDisplaySrc('');
      return;
    }

    if (src.startsWith('data:')) {
      const blob = dataURLtoBlob(src);
      if (blob) {
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        setDisplaySrc(url);
      } else {
        // Fallback: use data URL directly if conversion fails
        setDisplaySrc(src);
      }
    } else {
      setDisplaySrc(src);
    }

    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [src]);

  if (!displaySrc) return null;

  return <img {...rest} src={displaySrc} />;
}
