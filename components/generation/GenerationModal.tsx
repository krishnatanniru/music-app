'use client';

// components/generation/GenerationModal.tsx
import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useGenerationStore } from '@/lib/store/generation-store';
import { StepItem } from './StepItem';
import { AudioPlayer } from './AudioPlayer';
import type { GenerationStep, GenerationProgress } from '@/lib/types';
import styles from './Generation.module.css';

const ORDERED_STEPS: GenerationStep[] = [
  'queued',
  'generating-lyrics',
  'generating-music',
  'synthesizing-voice',
  'mixing',
  'mastering',
  'finalizing',
];

const POLL_INTERVAL_MS = 2000;

export function GenerationModal() {
  const {
    isModalOpen,
    jobId,
    progress,
    isComplete,
    error,
    setProgress,
    markComplete,
    setError,
    closeModal,
    markCancelled,
  } = useGenerationStore();

  // Polling logic
  const poll = useCallback(async () => {
    if (!jobId) return;
    try {
      const res = await fetch(`/api/generation/status?jobId=${jobId}`);
      if (!res.ok) {
        const { error: err } = await res.json();
        setError(err ?? 'Generation failed');
        return;
      }
      const data: GenerationProgress & { audioUrl?: string } = await res.json();
      setProgress(data);
      if (data.completedAt) {
        markComplete();
      }
    } catch {
      setError('Failed to fetch generation status. Please try again.');
    }
  }, [jobId, setProgress, markComplete, setError]);

  useEffect(() => {
    if (!isModalOpen || !jobId || isComplete) return;
    const id = setInterval(poll, POLL_INTERVAL_MS);
    poll(); // immediate first call
    return () => clearInterval(id);
  }, [isModalOpen, jobId, isComplete, poll]);

  // Cancel handler
  const handleCancel = async () => {
    if (!jobId) return;
    try {
      await fetch('/api/generation/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId }),
      });
    } finally {
      markCancelled();
    }
  };

  const currentStepIndex = progress?.stepIndex ?? 0;
  const overallProgress = progress?.progress ?? 0;
  const message = progress?.message ?? 'Preparing your song...';
  // The audioUrl is part of the raw response but typed separately
  const audioUrl = (progress as (GenerationProgress & { audioUrl?: string }) | null)?.audioUrl ?? null;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Song generation progress"
          >
            {/* Header */}
            <div className={styles.header}>
              <h2 className={styles.title}>
                {isComplete ? '✨ Song Ready!' : 'Generating Your Song'}
              </h2>
              <p className={styles.subtitle}>
                {isComplete
                  ? 'Your track has been generated. Enjoy!'
                  : 'Sit back while EchoVerse AI crafts your music.'}
              </p>
            </div>

            {/* Overall progress bar */}
            {!isComplete && (
              <>
                <div className={styles.overallTrack}>
                  <motion.div
                    className={styles.overallFill}
                    style={{ width: `${overallProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className={styles.overallLabel}>
                  <span>Overall progress</span>
                  <span>{overallProgress}%</span>
                </div>
              </>
            )}

            {/* Steps */}
            <div className={styles.stepsList}>
              {ORDERED_STEPS.map((step, i) => (
                <StepItem
                  key={step}
                  step={step}
                  index={i}
                  currentIndex={currentStepIndex}
                />
              ))}
            </div>

            {/* Status message */}
            {!isComplete && !error && (
              <p className={styles.statusMessage}>{message}</p>
            )}

            {/* Error state */}
            {error && (
              <div className={styles.errorBox}>
                <XCircle className="inline w-4 h-4 mr-1" />
                {error}
              </div>
            )}

            {/* Success + audio player */}
            {isComplete && (
              <AnimatePresence>
                <div className={styles.successBadge}>
                  <CheckCircle2 className="w-4 h-4" />
                  Generation Complete
                </div>
                {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
              </AnimatePresence>
            )}

            {/* Cancel / Close button */}
            {!isComplete && !error ? (
              <button
                className={styles.cancelBtn}
                onClick={handleCancel}
                aria-label="Cancel generation"
              >
                Cancel
              </button>
            ) : (
              <button
                className={styles.cancelBtn}
                onClick={closeModal}
                aria-label="Close dialog"
                style={{ marginTop: '1rem' }}
              >
                Close
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
