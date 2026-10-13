import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  href?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  strength = 0.35,
  href,
  onMouseEnter,
  onMouseLeave,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnterInternal = () => {
    if (buttonRef.current) {
      rectRef.current = buttonRef.current.getBoundingClientRect();
    }
    onMouseEnter?.();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const rect = rectRef.current || buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeaveInternal = () => {
    rectRef.current = null;
    setPosition({ x: 0, y: 0 });
    onMouseLeave?.();
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnterInternal}
      onMouseLeave={handleMouseLeaveInternal}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 180, mass: 0.2 }}
      className={`inline-block ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block text-inherit no-underline">
        {content}
      </a>
    );
  }

  return content;
};
