import React from 'react';
import type { VoiceTrainingStatus } from '@/lib/types';

interface TrainingProgressProps {
  status: VoiceTrainingStatus;
  progress: number;
}

export default function TrainingProgress({ status, progress }: TrainingProgressProps) {
  return (
    <div className="w-full mt-4">
      <div className="flex justify-between text-xs mb-1 text-text-secondary">
        <span>{status}</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-bg-secondary h-2 rounded-full overflow-hidden">
        <div 
          className="bg-accent-blue h-full transition-all duration-300"
          style={{ width: \`\${progress}%\` }}
        />
      </div>
    </div>
  );
}
