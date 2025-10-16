'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Play, Pause, Volume2, VolumeX, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { theme, getGradientClass } from '@/lib/theme'

interface MusicPlayerProps {
    audioUrl?: string
    songTitle?: string
    artist?: string
    autoPlay?: boolean
}

export default function MusicPlayer({
                                        audioUrl = '/audio/wedding-song.mp3',
                                        songTitle = 'Perfect',
                                        artist = 'Ed Sheeran',
                                        autoPlay = false
                                    }: MusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [volume, setVolume] = useState(0.1)
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
                    className={`relative w-16 h-16 rounded-full ${getGradientClass('elegant')} shadow-2xl flex items-center justify-center overflow-hidden group`}
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
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-success-500 rounded-full border-2 border-white shadow-lg">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-full h-full bg-success-400 rounded-full"
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

                {/* Quick Play/Pause Mini Button */}
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onClick={togglePlay}
                    disabled={!isLoaded}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
                >
                    {isPlaying ? (
                        <Pause className="w-4 h-4 text-primary-600" fill="currentColor" />
                    ) : (
                        <Play className="w-4 h-4 text-primary-600 ml-0.5" fill="currentColor" />
                    )}
                </motion.button>
            </motion.div>

            {/* Expanded Player Panel - Desktop */}
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

                        {/* Expanded Panel */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                                x: -100,
                                y: 100
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: 0,
                                y: 0
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                                x: -100,
                                y: 100
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed bottom-28 left-6 lg:bottom-auto lg:top-1/2 lg:right-8 lg:left-auto lg:-translate-y-1/2 z-50"
                        >
                            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-primary-200/40 p-6 w-80 relative">
                                {/* Close button */}
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4 text-neutral-600" />
                                </button>

                                {/* Album art with rotating disc */}
                                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100">
                                    <motion.div
                                        animate={isPlaying ? { rotate: 360 } : {}}
                                        transition={{
                                            duration: 3,
                                            repeat: isPlaying ? Infinity : 0,
                                            ease: "linear"
                                        }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        {/* Vinyl record */}
                                        <div className={`w-full h-full rounded-full ${getGradientClass('elegant')} flex items-center justify-center relative`}>
                                            <div className="absolute inset-8 rounded-full border-8 border-white/30" />
                                            <div className="absolute inset-16 rounded-full border-4 border-white/20" />
                                            <div className="absolute inset-24 rounded-full bg-white/10" />
                                            <Music className="w-16 h-16 text-white relative z-10 drop-shadow-2xl" />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Song details */}
                                <div className="text-center mb-4">
                                    <h3 className="text-lg font-serif font-medium text-neutral-800 mb-1 truncate">
                                        {songTitle}
                                    </h3>
                                    <p className="text-sm text-neutral-500 truncate">
                                        {artist}
                                    </p>
                                </div>

                                {/* Progress bar */}
                                {isLoaded && (
                                    <div className="mb-6">
                                        <div className="relative h-2 bg-neutral-200 rounded-full overflow-hidden mb-2">
                                            <motion.div
                                                className={`absolute inset-y-0 left-0 ${getGradientClass('elegant')} rounded-full`}
                                                style={{ width: `${progress}%` }}
                                                transition={{ duration: 0.1 }}
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max={duration}
                                                value={currentTime}
                                                onChange={handleSeek}
                                                className="absolute inset-0 w-full opacity-0 cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-neutral-500">
                                            <span>{formatTime(currentTime)}</span>
                                            <span>{formatTime(duration)}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Controls */}
                                <div className="flex items-center justify-between mb-4">
                                    {/* Volume control */}
                                    <div className="flex items-center gap-2 flex-1">
                                        <button
                                            onClick={toggleMute}
                                            className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
                                        >
                                            {isMuted || volume === 0 ? (
                                                <VolumeX className="w-4 h-4 text-neutral-600" />
                                            ) : (
                                                <Volume2 className="w-4 h-4 text-neutral-600" />
                                            )}
                                        </button>
                                        <div className="flex-1 max-w-[100px]">
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={volume}
                                                onChange={handleVolumeChange}
                                                className="w-full h-1 bg-neutral-200 rounded-full appearance-none cursor-pointer"
                                                style={{
                                                    background: `linear-gradient(to right, #d946ef ${volume * 100}%, #e5e5e5 ${volume * 100}%)`
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Play/Pause button */}
                                    <button
                                        onClick={togglePlay}
                                        disabled={!isLoaded}
                                        className={`w-14 h-14 rounded-full ${getGradientClass('elegant')} hover:from-primary-600 hover:to-secondary-600 shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50`}
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-6 h-6 text-white" fill="white" />
                                        ) : (
                                            <Play className="w-6 h-6 text-white ml-1" fill="white" />
                                        )}
                                    </button>
                                </div>

                                {/* Audio wave visualization */}
                                {isPlaying && (
                                    <div className="flex items-center justify-center gap-1 h-12">
                                        {[...Array(24)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1 bg-gradient-to-t from-primary-400 via-secondary-400 to-accent-400 rounded-full"
                                                animate={{
                                                    height: ['8px', '32px', '8px']
                                                }}
                                                transition={{
                                                    duration: 0.8,
                                                    repeat: Infinity,
                                                    delay: i * 0.05,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}