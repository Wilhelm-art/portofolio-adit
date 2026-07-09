'use client';
import { motion, Variants, Transition } from 'motion/react';
import React from 'react';
import { cn } from '../../lib/utils';

export type TextEffectProps = {
  children: string;
  per?: 'word' | 'char' | 'line';
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: 'blur' | 'fade-in-up' | 'scale' | 'slide';
  delay?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  segmentWrapperClassName?: string;
};

const defaultStaggerTimes = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const presetVariants: Record<
  string,
  { container: Variants; item: Variants }
> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(12px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
  },
  'fade-in-up': {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
  },
};

const AnimationComponent: React.FC<{
  segment: string;
  variants: Variants;
  className?: string;
  segmentWrapperClassName?: string;
}> = React.memo(({ segment, variants, className, segmentWrapperClassName }) => {
  return (
    <motion.span
      variants={variants}
      className={cn('inline-block whitespace-pre', className)}
    >
      {segment}
    </motion.span>
  );
});

AnimationComponent.displayName = 'AnimationComponent';

export function TextEffect({
  children,
  per = 'word',
  as = 'p',
  variants,
  className,
  preset,
  delay = 0,
  trigger = true,
  onAnimationComplete,
  segmentWrapperClassName,
}: TextEffectProps) {
  let segments: string[] = [];

  if (per === 'line') {
    segments = children.split('\n');
  } else if (per === 'word') {
    segments = children.split(/(\s+)/);
  } else {
    segments = children.split('');
  }

  const MotionTag = motion[as as keyof typeof motion] as React.ElementType;
  const selectedVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants };
  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;
  const ariaLabel = per === 'line' ? undefined : children;

  const stagger = defaultStaggerTimes[per];

  const delayedContainerVariants: Variants = {
    hidden: containerVariants.hidden,
    visible: {
      ...containerVariants.visible,
      transition: {
        ...(containerVariants.visible as any)?.transition,
        staggerChildren:
          (containerVariants.visible as any)?.transition?.staggerChildren ||
          stagger,
        delayChildren: delay,
      },
    },
    exit: containerVariants.exit,
  };

  return (
    <MotionTag
      initial="hidden"
      animate={trigger ? 'visible' : 'hidden'}
      aria-label={ariaLabel}
      variants={delayedContainerVariants}
      className={cn('whitespace-pre-wrap', className)}
      onAnimationComplete={onAnimationComplete}
    >
      {segments.map((segment, index) => (
        <AnimationComponent
          key={`${per}-${index}-${segment}`}
          segment={segment}
          variants={itemVariants}
          segmentWrapperClassName={segmentWrapperClassName}
        />
      ))}
    </MotionTag>
  );
}