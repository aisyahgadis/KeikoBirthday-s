import React, { useEffect } from "react";
import { Sparkles, Heart, RotateCcw, X } from "lucide-react";
import FloatingElements from "./FloatingElements";
import { launchGrandCelebration } from "../utils/confetti";
import { musicSynth } from "../utils/audioSynth";

interface FinalOverlayProps {
  show: boolean;
  onClose: () => void;
}

export default function FinalOverlay({ show, onClose }: FinalOverlayProps) {
  useEffect(() => {
    if (show) {
      musicSynth.playCelebrationFanfare();
      launchGrandCelebration();
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F5] to-[#FFE4EC] flex flex-col items-center justify-center p-6 overflow-hidden animate-fadeIn">
      {/* Floating background balloons & sparkles */}
      <FloatingElements balloonCount={18} heartCount={16} sparkleCount={20} />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/80 text-pink-600 hover:bg-pink-100 transition shadow-md"
        title="Tutup"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Glass Celebration Card */}
      <div className="relative z-10 max-w-xl w-full text-center glass-card-cute rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-pink-300 animate-cute-pop">
        {/* Top Gold Ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-pink-400" />
          <Sparkles className="w-6 h-6 text-amber-500 animate-spin-slow" />
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-pink-400" />
        </div>

        {/* Poetic Closing Quote */}
        <p className="font-letter italic text-xl sm:text-2xl lg:text-3xl text-gray-800 leading-relaxed mb-6">
          "Apapun yang akan dibawa oleh lembaran tahun ini, semoga selalu membawamu semakin dekat dengan kehidupan indah yang kamu impikan."
        </p>

        {/* Divider */}
        <div className="w-16 h-1 bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300 mx-auto mb-6 rounded-full" />

        {/* Main Name Heading */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          Selamat Ulang Tahun,{" "}
          <em className="text-pink-600 font-display not-italic block mt-1">
            Keiko Veldin! 💕
          </em>
        </h2>

        <p className="font-letter italic text-xl text-pink-700 mt-4">
          Here's to 18 wonderful years of you. ♡
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              musicSynth.playSparkle();
              launchGrandCelebration();
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-sm shadow-lg shadow-pink-300 hover:shadow-xl hover:scale-105 transition active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Rayakan Lagi! 🎉</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-white text-pink-700 border border-pink-300 font-medium text-sm shadow hover:bg-pink-50 hover:scale-105 transition active:scale-95 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Kembali ke Awal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
