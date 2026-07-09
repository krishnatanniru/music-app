'use client';

// components/generation/StepItem.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import type { GenerationStep } from '@/lib/types';
import styles from './Generation.module.css';

const STEP_LABELS: Record<GenerationStep, string> = {
  queued: 'Queued',
  'generating-lyrics': 'Generating Lyrics',
  'generating-music': 'Composing Music',
  'synthesizing-voice': 'Synthesizing Voice',
  mixing: 'Mixing Tracks',
  mastering: 'Mastering Audio',
  finalizing: 'Finalizing',
};

interface StepItemProps {
  step: GenerationStep;
  index: number;
  currentIndex: number;
}

export function StepItem({ step, index, currentIndex }: StepItemProps) {
  const isDone = index < currentIndex;
  const isActive = index === currentIndex;
  const isPending = index > currentIndex;

  return (
    <motion.div
      className={`${styles.stepItem} ${isActive ? styles.stepActive : ''} ${isDone ? styles.stepDone : ''} ${isPending ? styles.stepPending : ''}`}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Icon */}
      <div className={styles.stepIcon}>
        <AnimatePresence mode="wait">
          {isDone ? (
            <motion.div
              key="done"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Check className={styles.checkIcon} />
            </motion.div>
          ) : isActive ? (
            <motion.div
              key="active"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Loader2 className={styles.spinnerIcon} />
            </motion.div>
          ) : (
            <motion.div
              key="pending"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <span className={styles.stepNumber}>{index + 1}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Label */}
      <div className={styles.stepContent}>
        <span className={styles.stepLabel}>{STEP_LABELS[step]}</span>
        {isActive && (
          <motion.div
            className={styles.stepProgressBar}
            initial={{ width: '0%' }}
            animate={{ width: '60%' }}
            transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          />
        )}
      </div>
    </motion.div>
  );
}
