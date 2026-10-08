import React from "react";
import { Sparkles, Music, Heart, Gift } from "lucide-react";
import { launchHeartConfetti } from "../utils/confetti";
import { musicSynth } from "../utils/audioSynth";

interface WelcomeModalProps {
  onStart: () => void;
}

export default function WelcomeModal({ onStart }: WelcomeModalProps) {
  const handleOpen = () => {
    musicSynth.playSparkle();
    launchHeartConfetti(0.5, 0.5);
    onStart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-pink-950/40 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      {/* Glow Orbs */}
      <div className="absolute w-96 h-96 rounded-full bg-pink-400/20 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute w-80 h-80 rounded-full bg-amber-300/20 blur-3xl pointer-events-none -bottom-10" />

      {/* Main Cute Modal Card */}
      <div
        className="relative max-w-md w-full glass-card-cute rounded-3xl p-8 text-center shadow-2xl border-2 border-pink-300/80 animate-cute-pop"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(255,240,246,0.94) 100%)",
        }}
      >
        {/* Ribbon on Top */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-400 flex items-center justify-center shadow-lg shadow-pink-300 border-2 border-white">
            <Gift className="w-7 h-7 text-white animate-bounce" />
          </div>
        </div>

        {/* Header Tag */}
        <div className="mt-4 mb-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold uppercase tracking-widest border border-pink-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Special Birthday Delivery</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>

        {/* Main Title */}
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight leading-snug">
          Hai, <em className="text-pink-600 not-italic font-display">Keiko! 🌸</em>
        </h2>

        {/* Subtitle / Description */}
        <p className="mt-3 text-sm text-pink-900/80 leading-relaxed font-sans font-medium">
          Ada sebuah kado kejutan, surat rahasia, dan lagu asli{" "}
          <span className="font-bold text-pink-700">"Married with Children — Oasis" 🎸</span>{" "}
          yang sudah disiapkan untuk menemani hari ulang tahunmu yang ke-18 ✨
        </p>

        {/* Animated envelope / music illustration */}
        <div className="my-5 p-4 rounded-2xl bg-white/70 border border-pink-200/80 flex items-center justify-center gap-3 shadow-inner">
          <span className="text-2xl animate-bounce">💌</span>
          <span className="text-xs text-gray-700 font-letter italic text-base">
            "Hari ini adalah tentangmu dan senyuman indahmu..."
          </span>
          <span className="text-2xl animate-pulse">🎀</span>
        </div>

        {/* Big Start Button */}
        <button
          onClick={handleOpen}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-semibold text-sm sm:text-base shadow-xl shadow-pink-300 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
        >
          <Music className="w-4 h-4 text-pink-200 group-hover:animate-spin" />
          <span>Buka Surprise & Putar Musik ♡</span>
          <Heart className="w-4 h-4 text-pink-200 fill-pink-200 group-hover:scale-125 transition" />
        </button>

        {/* Footer Hint */}
        <p className="mt-4 text-[11px] text-pink-700/60 font-sans">
          💡 Pastikan volume suaramu aktif untuk mendengarkan lagunya
        </p>
      </div>
    </div>
  );
}
