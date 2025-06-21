import React, { useRef, useState } from "react";

interface ZoomPanImageProps {
  src: string;
  alt: string;
  zoom?: number; // zoom factor
}

const ZoomPanImage: React.FC<ZoomPanImageProps> = ({ src, alt, zoom = 2 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 }); // percent
  const [isTouchZoom, setIsTouchZoom] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchDist, setTouchDist] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Mouse move for desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchZoom) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      setIsTouchZoom(true);
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      setTouchDist(Math.sqrt(dx * dx + dy * dy));
    } else if (e.touches.length === 1) {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isTouchZoom && e.touches.length === 2 && touchDist) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.sqrt(dx * dx + dy * dy);
      let newZoom = zoomLevel * (newDist / touchDist);
      newZoom = Math.max(1, Math.min(newZoom, zoom));
      setZoomLevel(newZoom);
      setTouchDist(newDist);
    } else if (e.touches.length === 1 && touchStart) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
      const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
      setPos({ x, y });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsTouchZoom(false);
    setTouchStart(null);
    setTouchDist(null);
    setZoomLevel(1);
  };

  // Double tap to zoom in/out
  let lastTap = 0;
  const handleDoubleTap = (e: React.TouchEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      setZoomLevel(zoomLevel === 1 ? zoom : 1);
    }
    lastTap = now;
  };

  const bgPos = `${pos.x}% ${pos.y}%`;

  return (
    <div
      ref={containerRef}
      className="w-full h-full max-h-[90vh] max-w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: "1/1", touchAction: 'none', cursor: zoomLevel > 1 ? 'move' : 'zoom-in' }}
      onMouseMove={handleMouseMove}
      onTouchStart={e => { handleTouchStart(e); handleDoubleTap(e); }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${zoomLevel * 100}% ${zoomLevel * 100}%`,
          backgroundPosition: bgPos,
          width: "100%",
          height: "100%",
          transition: "background-position 0.1s, background-size 0.2s"
        }}
        aria-label={alt}
        role="img"
      />
    </div>
  );
};

export default ZoomPanImage;
