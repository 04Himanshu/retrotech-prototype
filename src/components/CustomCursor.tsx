import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorProps {
  cursorText?: string;
  cursorVariant?: 'default' | 'hover' | 'project' | 'drag';
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ 
  cursorText = '', 
  cursorVariant = 'default' 
}) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const isProject = cursorVariant === 'project';
  const isHover = cursorVariant === 'hover';
  const isDrag = cursorVariant === 'drag';

  return (
    <motion.div
      className="custom-cursor flex items-center justify-center text-center select-none"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      animate={{
        width: isProject ? 96 : isDrag ? 84 : isHover ? 48 : 12,
        height: isProject ? 96 : isDrag ? 84 : isHover ? 48 : 12,
        backgroundColor: isProject 
          ? '#171717' 
          : isDrag 
          ? '#353788' 
          : isHover 
          ? 'rgba(53, 55, 136, 0.12)' 
          : '#171717',
        border: isHover ? '1.5px solid #353788' : 'none',
      }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      {(isProject || isDrag || cursorText) && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="text-white text-[10px] font-bold tracking-widest uppercase pointer-events-none px-2"
        >
          {cursorText || (isProject ? 'VIEW' : 'DRAG')}
        </motion.span>
      )}
    </motion.div>
  );
};
