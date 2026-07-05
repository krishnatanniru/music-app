// components/voice/AddVoiceModal.tsx
"use client"

import { useState, useRef, useEffect } from 'react'
import { X, Mic, Upload, Check } from 'lucide-react'
import { useVoiceStore } from '@/lib/store/voiceStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function AddVoiceModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<'record' | 'upload'>('record')
  const [recording, setRecording] = useState<boolean>(false)
  const [blob, setBlob] = useState<Blob | null>(null)
  const [name, setName] = useState<string>('')
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const addVoice = useVoiceStore(state => state.addVoice)

  // Cleanup object URLs when component unmounts or blob changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert('Media Devices API not supported')
      return
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder
    chunksRef.current = []
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }
    mediaRecorder.onstop = () => {
      const recordedBlob = new Blob(chunksRef.current, { type: 'audio/wav' })
      setBlob(recordedBlob)
      const url = URL.createObjectURL(recordedBlob)
      setPreviewUrl(url)
      setRecording(false)
    }
    mediaRecorder.start()
    setRecording(true)
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    // Stop all tracks to release microphone
    mediaRecorderRef.current?.stream.getTracks().forEach(t => t.stop())
  }

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'audio/wav') {
        alert('Only WAV files are accepted')
        return
      }
      setBlob(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleConfirm = async () => {
    if (!blob) return
    const fileName = `${name || 'voice'}_${Date.now()}.wav`
    const wavFile = new File([blob], fileName, { type: 'audio/wav' })
    await addVoice(wavFile, name || 'Untitled Voice')
    // Reset state & close
    setBlob(null)
    setName('')
    setPreviewUrl('')
    onClose()
  }

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-bg-card rounded-xl p-6 w-full max-w-lg glass-card"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Add Voice Profile</h2>
            <button onClick={onClose} className="p-1 text-white/60 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mode selector */}
          <div className="flex mb-4 space-x-2">
            <button
              className={`flex-1 py-2 rounded ${mode === 'record' ? 'bg-purple-600 text-white' : 'bg-white/10 text-white'} transition`}
              onClick={() => setMode('record')}
            >
              <Mic className="inline-block mr-1 h-4 w-4" /> Record
            </button>
            <button
              className={`flex-1 py-2 rounded ${mode === 'upload' ? 'bg-purple-600 text-white' : 'bg-white/10 text-white'} transition`}
              onClick={() => setMode('upload')}
            >
              <Upload className="inline-block mr-1 h-4 w-4" /> Upload
            </button>
          </div>

          {/* Content based on mode */}
          {mode === 'record' && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                {recording ? (
                  <button
                    onClick={stopRecording}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  >
                    Stop
                  </button>
                ) : (
                  <button
                    onClick={startRecording}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                  >
                    Start Recording
                  </button>
                )}
              </div>

              {blob && (
                <div className="text-center">
                  <audio controls src={previewUrl} className="w-full" />
                </div>
              )}
            </div>
          )}

          {mode === 'upload' && (
            <div className="space-y-4">
              <input
                type="file"
                accept="audio/wav"
                onChange={handleUploadFile}
                className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
              />
              {blob && (
                <div className="text-center">
                  <audio controls src={previewUrl} className="w-full" />
                </div>
              )}
            </div>
          )}

          {/* Name input – always shown after a file/recording is ready */}
          {blob && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-white mb-1">Voice Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="My Voice"
                className="w-full rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          {/* Confirm button */}
          {blob && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleConfirm}
                className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
              >
                <Check className="h-4 w-4" /> Confirm
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
