import React from 'react';

interface AddVoiceModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddVoiceModal({ open, onClose }: AddVoiceModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-bg-card p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Voice Profile</h2>
        <p className="text-text-secondary mb-6">Upload or record your voice to clone it.</p>
        <button 
          onClick={onClose}
          className="w-full bg-accent-blue text-white py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
