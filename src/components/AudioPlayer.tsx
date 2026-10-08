import React, { useState, useEffect } from "react";
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileText,
  X,
  Heart,
} from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
}

export default function AudioPlayer({ isPlaying, onTogglePlay, audioRef }: AudioPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, audioRef]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef?.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef?.current) {
      audioRef.current.volume = val;
    }
    if (val > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef?.current) audioRef.current.muted = false;
    }
  };

  return (
    <>
      {/* Floating Music Widget (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Main Floating Capsule */}
        <div
          className={`glass-pink rounded-full p-2 pr-4 transition-all duration-500 flex items-center gap-3.5 shadow-2xl border-2 border-pink-300/80 ${
            isMinimized ? "w-12 h-12 p-0 justify-center overflow-hidden" : ""
          }`}
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(255,235,242,0.92) 100%)",
          }}
        >
          {isMinimized ? (
            <button
              onClick={() => setIsMinimized(false)}
              className="w-full h-full flex items-center justify-center text-pink-600 hover:text-pink-700 transition"
              title="Buka pemutar musik"
            >
              <Music className={`w-5 h-5 ${isPlaying ? "animate-spin-slow" : ""}`} />
            </button>
          ) : (
            <>
              {/* Spinning Vinyl Record Icon (Click toggles Play/Pause) */}
              <div
                onClick={onTogglePlay}
                className="relative cursor-pointer group flex-shrink-0"
                title={isPlaying ? "Jeda Lagu" : "Putar Lagu"}
              >
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 ${
                    isPlaying ? "animate-spin-slow" : ""
                  }`}
                  style={{ border: "2px solid #FFA8BE" }}
                >
                  <div className="w-4 h-4 rounded-full bg-pink-400 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Play/Pause Overlay */}
                <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-white fill-current" />
                  ) : (
                    <Play className="w-4 h-4 text-white fill-current translate-x-0.5" />
                  )}
                </div>
              </div>

              {/* Song Information & Status */}
              <div
                onClick={onTogglePlay}
                className="flex flex-col text-left min-w-[130px] max-w-[180px] cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-pink-600">
                    {isPlaying ? "Memutar Lagu Asli" : "Musik Dijeda"}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-800 truncate font-display tracking-tight">
                  Married with Children
                </h4>
                <p className="text-[11px] text-pink-700/80 font-medium truncate">
                  Oasis • Definitely Maybe 🎸
                </p>
              </div>

              {/* Animated Audio Equalizer Bars */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-4 px-1">
                  <span className="w-1 bg-pink-500 rounded-full animate-[equalizerBar_1.2s_ease-in-out_infinite]" />
                  <span className="w-1 bg-pink-400 rounded-full animate-[equalizerBar_0.8s_ease-in-out_0.2s_infinite]" />
                  <span className="w-1 bg-pink-600 rounded-full animate-[equalizerBar_1.5s_ease-in-out_0.4s_infinite]" />
                  <span className="w-1 bg-pink-300 rounded-full animate-[equalizerBar_1.0s_ease-in-out_0.1s_infinite]" />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {/* Play / Pause Button */}
                <button
                  onClick={onTogglePlay}
                  className="p-1.5 rounded-full hover:bg-pink-100/80 text-pink-600 transition"
                  title={isPlaying ? "Jeda Musik" : "Putar Musik"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-pink-600" />
                  ) : (
                    <Play className="w-4 h-4 text-pink-600 fill-pink-600" />
                  )}
                </button>

                {/* Lyrics Button */}
                <button
                  onClick={() => setShowLyrics(true)}
                  className="p-1.5 rounded-full hover:bg-pink-100/80 text-pink-600 transition"
                  title="Lihat Lirik Lagu"
                >
                  <FileText className="w-4 h-4" />
                </button>

                {/* Mute/Unmute */}
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-full hover:bg-pink-100/80 text-pink-600 transition"
                  title={isMuted ? "Bunyikan" : "Bisukan"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Minimize */}
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition text-xs font-mono"
                  title="Sembunyikan"
                >
                  ✕
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Lyrics Modal ── */}
      {showLyrics && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-card-cute rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-cute-pop max-h-[85vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowLyrics(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-200">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xs font-semibold text-pink-600 tracking-wider uppercase">
                  Lirik Lagu • Oasis 🎶
                </span>
                <h3 className="text-xl font-bold font-display text-gray-800">
                  Married with Children
                </h3>
                <p className="text-xs text-gray-500">Definitely Maybe (1994)</p>
              </div>
            </div>

            {/* Note badge */}
            <div className="p-3.5 bg-pink-50/80 rounded-2xl border border-pink-200/70 mb-6 flex items-start gap-2.5">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-pink-800 leading-relaxed font-sans">
                Lagu asli Oasis diputar khusus untuk menemani harimu agar terasa santai, hangat, dan penuh kenangan manis! 🌸✨
              </p>
            </div>

            {/* Lyrics content */}
            <div className="space-y-4 font-letter text-base sm:text-lg text-gray-700 leading-relaxed text-center italic">
              <p>
                "There's no need for you to say you're sorry<br />
                Goodbye, I'm going home<br />
                I don't care no more so don't you worry<br />
                Goodbye, I'm going home..."
              </p>
              <div className="w-8 h-0.5 bg-pink-200 mx-auto" />
              <p>
                "I hate the way that even though you<br />
                Know you're wrong you say you're right<br />
                I hate the books you read and all your friends<br />
                Your music's shite, it keeps me up all night..."
              </p>
              <div className="w-8 h-0.5 bg-pink-200 mx-auto" />
              <p>
                "And your music's shite it keeps me up all night, up all night..."
              </p>
            </div>

            {/* Bottom button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowLyrics(false)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-sm shadow-md shadow-pink-300 hover:shadow-lg hover:scale-105 transition active:scale-95"
              >
                Tutup Lirik ♡
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
