'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Play, Pause, Music2 as Music, X, Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { theme, getBgColor, hexToRgba } from '@/lib/theme'
interface MusicPlayerProps {
    audioUrl?: string
    songTitle?: string
    artist?: string
    albumCover?: string
    autoPlay?: boolean
}

export default function MusicPlayer({
                                        audioUrl = 'https://photos.rever.cyou/pub-img/like_it_was_meant_to_be.mp3',
                                        songTitle = 'Like It Was Meant To be',
                                        artist = 'Vira Talisa',
                                        albumCover = 'https://photos.rever.cyou/pub-img/vira-talisa.jpeg',
                                        autoPlay = false
                                    }: MusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [volume, setVolume] = useState(0.3)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const handleLoadedMetadata = () => {
            setDuration(audio.duration)
            setIsLoaded(true)
            if (autoPlay) {
                audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
            }
        }

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime)
        }

        const handleEnded = () => {
            setIsPlaying(false)
            setCurrentTime(0)
        }

        audio.addEventListener('loadedmetadata', handleLoadedMetadata)
        audio.addEventListener('timeupdate', handleTimeUpdate)
        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
            audio.removeEventListener('timeupdate', handleTimeUpdate)
            audio.removeEventListener('ended', handleEnded)
        }
    }, [autoPlay])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume
        }
    }, [volume, isMuted])

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
        }
    }

    const toggleMute = () => {
        setIsMuted(!isMuted)
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
        if (newVolume > 0 && isMuted) {
            setIsMuted(false)
        }
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current
        if (!audio) return

        const newTime = parseFloat(e.target.value)
        audio.currentTime = newTime
        setCurrentTime(newTime)
    }

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00'
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0

    return (
      <>
          {/* Hidden audio element */}
          <audio ref={audioRef} src={audioUrl} preload="metadata" loop />

          {/* Floating Disc Widget - Bottom Left */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-6 z-50"
          >
              {/* Main Disc Button */}
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center overflow-hidden group"
                style={{
                    background: `linear-gradient(to bottom right, ${theme.colors.primary[600]}, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]})`
                }}
              >
                  {/* Rotating disc background when playing */}
                  <motion.div
                    animate={isPlaying ? { rotate: 360 } : {}}
                    transition={{
                        duration: 3,
                        repeat: isPlaying ? Infinity : 0,
                        ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10"
                  />

                  {/* Vinyl record effect */}
                  <div className="absolute inset-2 rounded-full border-4 border-white/30" />
                  <div className="absolute inset-4 rounded-full border-2 border-white/20" />
                  <div className="absolute inset-6 rounded-full bg-white/10" />

                  {/* Music icon */}
                  <Music className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />

                  {/* Playing indicator dots */}
                  {isPlaying && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: theme.colors.success[500] }}>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-full h-full rounded-full"
                          style={{ backgroundColor: theme.colors.success[400] }}
                        />
                    </div>
                  )}

                  {/* Ripple effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white"
                    initial={{ opacity: 0, scale: 1 }}
                    whileHover={{ opacity: [0, 0.5, 0], scale: [1, 1.2, 1.4] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
              </motion.button>

              {/* Quick Play/Pause Mini Button - Hidden when expanded */}
              {!isExpanded && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={togglePlay}
                  disabled={!isLoaded}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
                >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" fill="currentColor" style={{ color: theme.colors.primary[600] }} />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" fill="currentColor" style={{ color: theme.colors.primary[600] }} />
                    )}
                </motion.button>
              )}
          </motion.div>

          {/* Expanded Player Panel - Compact */}
          <AnimatePresence>
              {isExpanded && (
                <>
                    {/* Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsExpanded(false)}
                      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    />

                    {/* Expanded Panel - Compact */}
                    <motion.div
                      initial={{
                          opacity: 0,
                          scale: 0.8,
                          x: -20
                      }}
                      animate={{
                          opacity: 1,
                          scale: 1,
                          x: 0
                      }}
                      exit={{
                          opacity: 0,
                          scale: 0.8,
                          x: -20
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="fixed bottom-24 left-6 sm:left-24 sm:bottom-6 z-50 max-w-[calc(100vw-3rem)]"
                    >
                        <div className="rounded-2xl shadow-2xl p-2 sm:p-4 w-56 sm:w-80 relative border overflow-hidden" style={{ ...getBgColor(theme.colors.primary[700], 0.3), backdropFilter: 'blur(12px)', borderColor: hexToRgba(theme.colors.secondary[500], 0.3) }}>
                            {/* Subtle overlay */}
                            <div className="absolute inset-0" style={getBgColor(theme.colors.secondary[500], 0.05)}></div>
                            
                            {/* Close button - positioned relative to panel */}
                            <button
                              onClick={(e) => {
                                  e.stopPropagation();
                                  setIsExpanded(false);
                              }}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-colors z-20"
                              style={{
                                  color: theme.colors.neutral[500] || '#ffffff',
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hexToRgba(theme.colors.neutral[100], 0.2)}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <X className="w-3 h-3" />
                            </button>
                            
                            {/* Content wrapper with relative positioning */}
                            <div className="relative z-10">

                            {/* Compact layout with album art and controls side by side */}
                            <div className="flex items-center gap-1.5 sm:gap-4">
                                {/* Album Cover */}
                                <div className="relative w-10 h-10 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
                                    {/* Album cover image */}
                                    <Image 
                                        src={albumCover} 
                                        alt={`${songTitle} by ${artist}`}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                    />
                                </div>

                                {/* Song details and controls */}
                                <div className="flex-1 min-w-0">
                                        {/* Song details */}
                                        <div className="mb-0.5 sm:mb-2">
                                            <h3 className="text-[10px] sm:text-sm font-medium truncate text-white leading-tight">
                                                {songTitle}
                                            </h3>
                                            <p className="text-[9px] sm:text-xs truncate text-white/70">
                                                {artist}
                                            </p>
                                        </div>

                                    {/* Progress bar */}
                                    {isLoaded && (
                                      <div className="mb-0.5 sm:mb-2">
                                          <div className="relative h-0.5 sm:h-1.5 rounded-full overflow-hidden mb-0.5 sm:mb-1" style={{ backgroundColor: theme.colors.neutral[200] }}>
                                              <motion.div
                                                className="absolute inset-y-0 left-0 rounded-full"
                                                style={{
                                                    width: `${progress}%`,
                                                    background: `linear-gradient(to right, ${theme.colors.primary[600]}, ${theme.colors.secondary[500]})`
                                                }}
                                                transition={{ duration: 0.1 }}
                                              />
                                              <input
                                                type="range"
                                                min="0"
                                                max={duration}
                                                value={currentTime}
                                                onChange={handleSeek}
                                                className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                                              />
                                          </div>
                                          <div className="flex items-center justify-between text-[8px] sm:text-xs text-white/60">
                                              <span>{formatTime(currentTime)}</span>
                                              <span>{formatTime(duration)}</span>
                                          </div>
                                      </div>
                                    )}

                                    {/* Controls */}
                                    <div className="flex items-center gap-1.5 sm:gap-3">
                                        {/* Play/Pause button */}
                                        <button
                                          onClick={togglePlay}
                                          disabled={!isLoaded}
                                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full shadow transition-all duration-300 flex items-center justify-center disabled:opacity-50 flex-shrink-0"
                                          style={{
                                              background: `linear-gradient(to bottom right, ${theme.colors.primary[600]}, ${theme.colors.secondary[500]})`
                                          }}
                                        >
                                            {isPlaying ? (
                                              <Pause className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" fill="white" />
                                            ) : (
                                              <Play className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white ml-0.5" fill="white" />
                                            )}
                                        </button>

                                        {/* Volume control */}
                                        <div className="flex items-center gap-0.5 sm:gap-2 flex-1">
                                            <button
                                              onClick={toggleMute}
                                              className="w-4 h-4 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors flex-shrink-0 text-white/70"
                                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hexToRgba(theme.colors.neutral[100], 0.2)}
                                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                {isMuted || volume === 0 ? (
                                                  <VolumeX className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                                                ) : (
                                                  <Volume2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                                                )}
                                            </button>
                                            <div className="flex-1">
                                                <input
                                                  type="range"
                                                  min="0"
                                                  max="1"
                                                  step="0.01"
                                                  value={volume}
                                                  onChange={handleVolumeChange}
                                                  className="w-full h-2 sm:h-1 rounded-full appearance-none cursor-pointer outline-none volume-slider"
                                                  style={{
                                                      background: `linear-gradient(to right, ${theme.colors.primary[500]} ${volume * 100}%, ${theme.colors.neutral[200]} ${volume * 100}%)`
                                                  }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </motion.div>
                </>
              )}
          </AnimatePresence>
      </>
    )
}