import React, { useState } from "react";
import { Sparkles, Heart, Send, Star, Gift, ArrowRight } from "lucide-react";
import BirthdayCake3D from "./BirthdayCake3D";
import { musicSynth } from "../utils/audioSynth";
import { launchGrandCelebration, launchSparkleBurst } from "../utils/confetti";

interface CakeSectionProps {
  onFinal: () => void;
}

export default function CakeSection({ onFinal }: CakeSectionProps) {
  const [userWish, setUserWish] = useState("");
  const [wishSent, setWishSent] = useState(false);
  const [lanternFloating, setLanternFloating] = useState(false);

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userWish.trim()) return;

    musicSynth.playSparkle();
    setWishSent(true);
    setLanternFloating(true);
    launchSparkleBurst(0.5, 0.4);

    setTimeout(() => {
      setLanternFloating(false);
    }, 4000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24 overflow-hidden bg-gradient-to-b from-[#FFF0F5] via-[#FFF9FB] to-[#FFE8EF]">
      {/* Glow Backdrops */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-300/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />

      {/* Floating Sky Lantern (When wish submitted) */}
      {lanternFloating && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="animate-[heartFloatUp_4s_ease-out_forwards] flex flex-col items-center">
            <div className="w-16 h-20 rounded-2xl bg-gradient-to-t from-amber-400 via-amber-300 to-yellow-100 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.8)] border border-amber-200">
              <span className="text-xl">✨</span>
            </div>
            <span className="mt-2 text-xs font-bold text-amber-600 bg-white/90 px-3 py-1 rounded-full shadow">
              Permohonan sedang menuju bintang... 🌟
            </span>
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto w-full">
        {/* Section Header */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold uppercase tracking-widest border border-pink-200 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Momen Tiup Lilin & Permohonan</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight leading-tight">
          Make a wish, <em className="text-pink-600 font-display not-italic">Keiko. 🌸</em>
        </h2>

        <p className="mt-3 font-letter italic text-lg sm:text-xl text-pink-900/80 max-w-lg mb-8">
          Tutup matamu sejenak, panjatkan harapan terbaikmu, lalu tiup semua lilinnya! Usia 18 tahun sangat cocok dan bersinar untukmu ✨
        </p>

        {/* ── WOW 3D Aesthetic Birthday Cake ── */}
        <div className="w-full my-4">
          <BirthdayCake3D scale={1.15} onAllCandlesBlown={() => {}} />
        </div>

        {/* ── Interactive Wish Box ── */}
        <div className="mt-12 w-full max-w-lg glass-card-cute rounded-3xl p-6 sm:p-8 shadow-xl border border-pink-200/80">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h3 className="font-display font-bold text-lg text-gray-800">
              Kirim Harapanmu ke Bintang 🌟
            </h3>
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>

          <p className="text-xs text-pink-800/80 font-sans mb-4">
            Tuliskan sebuah impian atau harapan rahasiamu di usia 18 ini:
          </p>

          {!wishSent ? (
            <form onSubmit={handleSendWish} className="flex flex-col gap-3">
              <textarea
                value={userWish}
                onChange={(e) => setUserWish(e.target.value)}
                placeholder="Contoh: Semoga di usia 18 ini selalu bahagia, sehat, dan impianku terwujud..."
                rows={3}
                className="w-full p-3.5 rounded-2xl bg-white/80 border border-pink-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 placeholder:text-gray-400 resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-medium text-sm shadow-md shadow-pink-200 hover:shadow-lg hover:scale-[1.02] transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Lepaskan Permohonan ke Langit 🚀✨</span>
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-center animate-cute-pop">
              <span className="text-2xl">✨💫✨</span>
              <p className="font-letter italic text-base text-pink-900 font-semibold mt-1">
                "Permohonanmu telah diterbangkan ke langit bintang. Semoga semesta mengabulkannya dengan cara paling indah! ♡"
              </p>
              <button
                onClick={() => setWishSent(false)}
                className="mt-3 text-xs text-pink-600 underline font-sans hover:text-pink-800"
              >
                Tulis harapan lain
              </button>
            </div>
          )}
        </div>

        {/* Grand Finale Button */}
        <div className="mt-14">
          <button
            onClick={onFinal}
            className="px-8 py-3.5 rounded-full bg-white text-pink-700 border-2 border-pink-300 font-semibold text-sm sm:text-base shadow-lg shadow-pink-100 hover:bg-pink-50 hover:scale-105 transition active:scale-95 flex items-center gap-2.5 group"
          >
            <span>Buka Penutup Kejutan Terakhir</span>
            <Gift className="w-5 h-5 text-pink-500 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
