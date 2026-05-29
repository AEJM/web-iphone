"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

export default function IPhoneScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const totalFrames = 50;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0-1) to frame index (0-49)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = () => {
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        // Zero padding for frame numbers: 001, 002, ...
        const frameNumber = i.toString().padStart(3, "0");
        img.src = `/img/ezgif-frame-${frameNumber}.jpg`;
        img.onload = () => {
          loadedCount++;
          setLoadProgress((loadedCount / totalFrames) * 100);
          if (loadedCount === totalFrames) {
            setImages(loadedImages);
            setIsLoading(false);
          }
        };
        loadedImages[i - 1] = img;
      }
    };

    preloadImages();
  }, []);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(Math.floor(frameIndex.get()));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  const renderFrame = (index: number) => {
    if (canvasRef.current && images[index]) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const img = images[index];
        const canvas = canvasRef.current;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate contain fit
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (canvasRatio > imgRatio) {
          drawHeight = canvas.height;
          drawWidth = drawHeight * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = canvas.width;
          drawHeight = drawWidth / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }
        
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    }
  };

  // Update frame on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderFrame(Math.floor(latest));
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      {isLoading && <LoadingScreen progress={loadProgress} />}
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none"
        />
        
        {/* Scroll Content Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <Section progress={scrollYProgress} threshold={[0, 0.15]}>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white/90 text-center text-glow">
              iPhone 17 Pro Max
            </h1>
            <p className="mt-4 text-xl text-white/40 text-center tracking-wide">
              Titanium. Reimagined.
            </p>
          </Section>

          <Section progress={scrollYProgress} threshold={[0.25, 0.45]} align="left">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white/90 mb-4">
              Structural Innovation.
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-md leading-relaxed">
              Every internal component is exposed and optimized. A masterclass in technical transparency.
            </p>
          </Section>

          <Section progress={scrollYProgress} threshold={[0.55, 0.75]} align="right">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white/90 mb-4">
              Absolute Power.
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-md leading-relaxed">
              Peek inside the new A19 Pro chip, powering experiences that were once impossible.
            </p>
          </Section>

          <Section progress={scrollYProgress} threshold={[0.85, 1.0]}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 text-center mb-8">
              The Future is Whole.
            </h1>
            <button className="pointer-events-auto px-12 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-white/90 transition-all transform hover:scale-105">
              Buy Now
            </button>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ 
  children, 
  progress, 
  threshold, 
  align = "center" 
}: { 
  children: React.ReactNode; 
  progress: any; 
  threshold: [number, number];
  align?: "left" | "right" | "center";
}) {
  const opacity = useTransform(progress, [threshold[0], threshold[0] + 0.05, threshold[1] - 0.05, threshold[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [threshold[0], threshold[1]], [50, -50]);

  const alignmentClasses = {
    left: "items-start px-8 md:px-24",
    right: "items-end px-8 md:px-24 text-right",
    center: "items-center px-4 text-center"
  };

  return (
    <motion.div 
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center ${alignmentClasses[align]}`}
    >
      {children}
    </motion.div>
  );
}
