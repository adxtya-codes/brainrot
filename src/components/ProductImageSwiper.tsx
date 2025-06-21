import React, { useState } from 'react';
import ZoomPanImage from './ZoomPanImage';

interface ProductImageSwiperProps {
  images: string[];
  name: string;
  enableZoom?: boolean;
}

const ProductImageSwiper: React.FC<ProductImageSwiperProps> = ({ images, name, enableZoom = true }) => {
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) return null;

  // Preload all images
  React.useEffect(() => {
    images.forEach((img) => {
      const preloadImg = new window.Image();
      preloadImg.src = img;
    });
  }, [images]);

  // Main image area (click to zoom if enabled)
  const imageArea = (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-zoom-in"
      onClick={enableZoom ? () => setZoomed(true) : undefined}
    >
      <img
        src={images[current]}
        alt={name + ' image ' + (current + 1)}
        className="object-cover w-full h-full transition-transform duration-300"
        style={{ aspectRatio: '1/1' }}
      />
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 z-10 hover:bg-black/80"
            aria-label="Previous image"
          >
            {'<'}
          </button>
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 z-10 hover:bg-black/80"
            aria-label="Next image"
          >
            {'>'}
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`inline-block w-2 h-2 rounded-full ${idx === current ? 'bg-white' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );

  // Zoomed modal
  if (zoomed) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={() => setZoomed(false)}
      >
        <div className="relative max-w-3xl w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
          <ZoomPanImage src={images[current]} alt={name + ' zoomed image ' + (current + 1)} />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 z-10 hover:bg-black/80"
                aria-label="Previous image"
              >
                {'<'}
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 z-10 hover:bg-black/80"
                aria-label="Next image"
              >
                {'>'}
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`inline-block w-2 h-2 rounded-full ${idx === current ? 'bg-white' : 'bg-gray-400'}`}
                  />
                ))}
              </div>
            </>
          )}
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute top-4 right-4 bg-white/80 text-black rounded-full px-3 py-1 z-20 hover:bg-white"
            aria-label="Close zoom"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return imageArea;
};

export default ProductImageSwiper;
