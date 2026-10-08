import React from "react";
import { Sparkles, Heart, ArrowDown, Gift, Music } from "lucide-react";
import FloatingElements from "./FloatingElements";
import { launchHeartConfetti } from "../utils/confetti";
import { musicSynth } from "../utils/audioSynth";

interface HeroSectionProps {
  onNext: () => void;
}

export default function HeroSection({ onNext }: HeroSectionProps) {
  const handleOpenSurprise = () => {
    musicSynth.playSparkle();
    launchHeartConfetti(0.5, 0.5);
    onNext();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FFF9FB] to-[#FFF0F5] px-4 py-16 sm:py-24">
      {/* Floating background balloons, hearts, sparkles */}
      <FloatingElements balloonCount={14} heartCount={12} sparkleCount={16} />

      {/* Radiant Glow Orb in the Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-r from-pink-300/25 via-rose-200/20 to-amber-200/20 blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Main Content Container - Clean, spacious and non-overlapping */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto w-full">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-300/70 text-pink-700 text-xs font-semibold uppercase tracking-widest shadow-sm mb-6 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>A Special 18th Celebration</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>

        {/* Poetic Subtitle */}
        <p className="font-letter italic text-lg sm:text-2xl text-pink-900/80 leading-relaxed max-w-md mx-auto mb-4 animate-fadeIn">
          "Untuk seseorang yang selalu membuat hari-hari biasa terasa jauh lebih istimewa dan penuh warna..."
        </p>

        {/* Delicate divider */}
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto my-3" />

        {/* Main Heading with clear spacing */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight my-4 animate-cute-pop">
          Happy 18th Birthday,
          <span className="text-pink-600 block mt-2 font-display italic">
            Keiko. 🌸
          </span>
        </h1>

        {/* Warm Description */}
        <p className="text-sm sm:text-base text-pink-800/80 font-sans font-medium leading-relaxed max-w-md mx-auto my-4 animate-fadeIn">
          Hari ini sepenuhnya milikmu. Biarkan sudut kecil di internet ini menjadi kado manis yang dibuat tulus khusus untuk merayakan kehadiranmu.
        </p>

        {/* Cute Soundtrack pill badge */}
        <div className="my-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200 text-xs font-medium text-pink-700 shadow-sm">
          <Music className="w-3.5 h-3.5 text-pink-500 animate-spin-slow" />
          <span>Playing: <strong>Married with Children — Oasis</strong></span>
        </div>

        {/* CTA Button with generous margin */}
        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={handleOpenSurprise}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-semibold text-sm sm:text-base shadow-xl shadow-pink-300/80 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2.5 cursor-pointer group active:scale-95 animate-fadeIn"
          >
            <Heart className="w-4 h-4 text-pink-200 fill-pink-200 group-hover:scale-125 transition-transform" />
            <span>Buka Kejutan Manismu ♡</span>
            <ArrowDown className="w-4 h-4 text-pink-200 group-hover:translate-y-1 transition-transform" />
          </button>
          
          <span className="text-[11px] text-pink-600/70 mt-3 font-sans">
            Sentuh tombol di atas untuk membuka surat rahasia 💌
          </span>
        </div>
      </div>
    </section>
  );
}
