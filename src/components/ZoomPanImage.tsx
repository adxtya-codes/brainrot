import React, { useRef, useState } from "react";

interface ZoomPanImageProps {
  src: string;
  alt: string;
  zoom?: number; // zoom factor
}

const ZoomPanImage: React.FC<ZoomPanImageProps> = ({ src, alt, zoom = 2 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 }); // percent
  const [isTouch, setIsTouch] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  const handleTouchStart = () => setIsTouch(true);
  const handleTouchEnd = () => setIsTouch(false);

  // Center for touch devices
  const bgPos = isTouch ? "50% 50%" : `${pos.x}% ${pos.y}%`;

  return (
    <div
      ref={containerRef}
      className="w-full h-full max-h-[90vh] max-w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: "1/1", cursor: zoom ? "zoom-in" : "default" }}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${zoom * 100}% ${zoom * 100}%`,
          backgroundPosition: bgPos,
          width: "100%",
          height: "100%",
          transition: "background-position 0.1s"
        }}
        aria-label={alt}
        role="img"
      />
    </div>
  );
};

export default ZoomPanImage;
