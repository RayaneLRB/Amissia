/**
 * Compress and resize an image file to a base64 JPEG string.
 * Uses Canvas API to resize and re-encode.
 *
 * - Max dimension: 900px (keeps aspect ratio)
 * - Output: JPEG at 0.72 quality
 * - Typical output: 60–150 KB even for a 10+ MP phone photo
 */
export function compressImage(file: File, maxDim = 900, quality = 0.72): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const blobUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(blobUrl);

      // Validate image loaded correctly
      if (!img.naturalWidth || !img.naturalHeight) {
        reject(new Error('Image invalide ou format non supporté'));
        return;
      }

      let { naturalWidth: width, naturalHeight: height } = img;

      // Scale down if bigger than maxDim
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context unavailable'));
        return;
      }

      // Fill white background first (in case of PNG with transparency)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Draw the image
      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL('image/jpeg', quality);

      // Validate output
      if (!dataUrl || dataUrl === 'data:,' || dataUrl.length < 200) {
        reject(new Error('La compression a produit une image vide'));
        return;
      }

      resolve(dataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(blobUrl);
      reject(new Error('Impossible de charger l\'image. Format non supporté.'));
    };

    img.src = blobUrl;
  });
}
