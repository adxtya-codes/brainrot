import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Custom minimal navigation styling
const swiperNavStyle = `
  .custom-swiper-nav {
    width: 40px;
    height: 40px;
    display: none;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.5);
    color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    transition: background 0.2s;
    cursor: pointer;
  }
  .swiper-button-prev.custom-swiper-nav {
    left: 12px;
  }
  .swiper-button-next.custom-swiper-nav {
    right: 12px;
  }
  @media (min-width: 768px) {
    .custom-swiper-nav { display: flex; }
  }
  .custom-swiper-nav:hover {
    background: rgba(0,0,0,0.8);
  }
  .custom-swiper-nav:after {
    font-size: 22px;
    font-weight: bold;
  }
`;

if (typeof window !== 'undefined' && !document.getElementById('custom-swiper-nav-style')) {
  const style = document.createElement('style');
  style.id = 'custom-swiper-nav-style';
  style.innerHTML = swiperNavStyle;
  document.head.appendChild(style);
}

import ZoomPanImage from './ZoomPanImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageSwiperProps {
  images: string[];
  name: string;
  enableZoom?: boolean;
}

const ProductImageSwiper: React.FC<ProductImageSwiperProps> = ({ images, name, enableZoom = true }) => {
  const [zoomed, setZoomed] = useState(false);
  const [current, setCurrent] = useState(0);

  if (!images.length) return null;

  // Main image area (click to zoom if enabled)
  // Swiper navigation refs
  const prevRef = React.useRef<HTMLDivElement | null>(null);
  const nextRef = React.useRef<HTMLDivElement | null>(null);

  const imageArea = (
    <div className="relative w-full h-full">
      {/* Navigation buttons - must be outside Swiper for refs to work */}
      <div
        ref={prevRef}
        className="custom-swiper-nav absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center"
        style={{ pointerEvents: 'auto' }}
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </div>
      <div
        ref={nextRef}
        className="custom-swiper-nav absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center"
        style={{ pointerEvents: 'auto' }}
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </div>
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={swiper => {
          // Fix for Swiper + React refs
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={swiper => setCurrent(swiper.activeIndex)}
        className="w-full h-full cursor-zoom-in"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={img + idx}>
            <img
              src={img}
              alt={`${name} image ${idx + 1}`}
              className="object-cover w-full h-full"
              style={{ aspectRatio: '1/1' }}
              loading="lazy"
              onClick={enableZoom ? () => setZoomed(true) : undefined}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  // Zoomed modal
  if (zoomed) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={() => setZoomed(false)}
      >
        <div
          className="relative max-w-3xl w-full h-full flex items-center justify-center"
          onClick={e => e.stopPropagation()}
        >
          <ZoomPanImage src={images[current]} alt={name + ' zoomed image ' + (current + 1)} />
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
