'use client';
import { motion, useAnimation, useInView, Variants } from 'motion/react';
import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

type InViewProps = {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  margin?: string;
  viewOptions?: {
    once?: boolean;
    margin?: string;
    amount?: 'some' | 'all' | number;
  };
};

const defaultVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function InView({
  children,
  variants = defaultVariants,
  className,
  viewOptions = { once: true, margin: '-50px' },
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, viewOptions);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!viewOptions.once) {
      controls.start('hidden');
    }
  }, [isInView, controls, viewOptions.once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}