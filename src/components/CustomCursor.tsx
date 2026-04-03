import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isTextHovering, setIsTextHovering] = useState(false);

  // Motion values for the cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring settings for smooth trailing effect
  const springConfig = { stiffness: 150, damping: 25 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Even smoother spring for the larger circle
  const slowSpringConfig = { stiffness: 80, damping: 19 };
  const cursorXSlowSpring = useSpring(cursorX, slowSpringConfig);
  const cursorYSlowSpring = useSpring(cursorY, slowSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for text elements for spotlight effect (Exclude Navbar)
      const isNavbar = !!target.closest('nav');
      const isHoverable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer');

      const isText =
        !isHoverable && !isNavbar && (
          ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI'].includes(target.tagName) ||
          target.closest('h1, h2, h3, h4, h5, h6, p, span, li')
        );

      setIsTextHovering(!!isText);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Spotlight Effect (Large circle for text hover) */}
      <motion.div
        className="fixed top-0 left-0 w-[150px] h-[150px] bg-white rounded-full pointer-events-none z-[9997] mix-blend-difference"
        style={{
          translateX: cursorXSlowSpring,
          translateY: cursorYSlowSpring,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: isTextHovering ? 1 : 0,
          opacity: isTextHovering ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 150, damping: 20 },
          opacity: { duration: 0.2 }
        }}
      />

      {/* Small Dot Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#00A78E] rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: isTextHovering ? 0.5 : 1,
          opacity: isTextHovering ? 0 : 1,
        }}
      />

      {/* Larger Trailing Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-[#00A78E]/40 rounded-full pointer-events-none z-[9998]"
        style={{
          translateX: cursorXSlowSpring,
          translateY: cursorYSlowSpring,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: isTextHovering ? 0 : 1,
          opacity: isTextHovering ? 0 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;
