import React, { useState } from "react";
import { Heart, Sparkles, ArrowDown } from "lucide-react";
import { MemoryItem } from "../types";
import { musicSynth } from "../utils/audioSynth";
import { launchSparkleBurst } from "../utils/confetti";

interface MemoriesSectionProps {
  onNext: () => void;
}

const MEMORIES_DATA: MemoryItem[] = [
  {
    id: "1",
    num: "01",
    text: "Caramu membuat orang lain merasa nyaman hanya dengan menjadi dirimu sendiri.",
    sticker: "🌸",
    color: "#FFF0F5",
  },
  {
    id: "2",
    num: "02",
    text: "Obrolan-obrolan random kita yang entah kenapa selalu terasa hangat dan menyenangkan.",
    sticker: "💬",
    color: "#FDF2F8",
  },
  {
    id: "3",
    num: "03",
    text: "Tawamu yang menular dan selalu berhasil membuat suasana sekitar jadi ceria seketika.",
    sticker: "✨",
    color: "#FAF5FF",
  },
  {
    id: "4",
    num: "04",
    text: "Keberanianmu untuk selalu jadi diri sendiri tanpa perlu berpura-pura di hadapan siapapun.",
    sticker: "💖",
    color: "#FFF1F2",
  },
  {
    id: "5",
    num: "05",
    text: "Momen-momen kecil yang kita lalui bersama yang tanpa sadar jadi memori paling berharga.",
    sticker: "🎀",
    color: "#FDF4FF",
  },
  {
    id: "6",
    num: "06",
    text: "Senyum manismu yang selalu punya daya magis untuk mencerahkan hari yang melelahkan.",
    sticker: "🍓",
    color: "#FFF0F3",
  },
  {
    id: "7",
    num: "07",
    text: "Ketulusan hatimu saat mendengarkan cerita orang lain dengan penuh perhatian dan empati.",
    sticker: "🧸",
    color: "#FAF5FF",
  },
  {
    id: "8",
    num: "08",
    text: "Sikap jujur dan apa adanya yang sekarang ini sudah sangat langka dan berharga ditemukan.",
    sticker: "💎",
    color: "#FFF1F2",
  },
  {
    id: "9",
    num: "09",
    text: "Kebaikan hatimu yang selalu melihat sisi terbaik dari setiap orang sebelum menilainya.",
    sticker: "🌷",
    color: "#FFF0F5",
  },
  {
    id: "10",
    num: "10",
    text: "Kehadiranmu yang selalu ada, bahkan di hari-hari biasa yang terasa sepi dan membosankan.",
    sticker: "🌟",
    color: "#FDF2F8",
  },
  {
    id: "11",
    num: "11",
    text: "Inside jokes konyol yang cuma kita berdua yang mengerti artinya sampai bikin ngakak.",
    sticker: "🍭",
    color: "#FAF5FF",
  },
  {
    id: "12",
    num: "12",
    text: "Perhatian-perhatian kecil penuh kasih yang kamu berikan tanpa pamrih sedikitpun.",
    sticker: "💌",
    color: "#FFF1F2",
  },
  {
    id: "13",
    num: "13",
    text: "Selera musikmu yang keren dan hal-hal unik yang membuatmu jadi sosok yang begitu menarik.",
    sticker: "🎶",
    color: "#FDF4FF",
  },
  {
    id: "14",
    num: "14",
    text: "Setiap percakapan bersamamu yang selalu terasa seperti tempat pulang yang aman dan tenang.",
    sticker: "🕊️",
    color: "#FFF0F3",
  },
  {
    id: "15",
    num: "15",
    text: "Proses bertumbuhmu yang luar biasa menjadi sosok perempuan hebat yang sangat menginspirasi.",
    sticker: "🦋",
    color: "#FAF5FF",
  },
  {
    id: "16",
    num: "16",
    text: "Sosokmu yang selalu dirindukan dan selalu meninggalkan jejak kenangan manis di hati orang.",
    sticker: "🍰",
    color: "#FFF1F2",
  },
  {
    id: "17",
    num: "17",
    text: "Caramu yang lembut dan manis dalam membuat dunia di sekitarmu terasa jauh lebih baik.",
    sticker: "🧁",
    color: "#FFF0F5",
  },
  {
    id: "18",
    num: "18",
    text: "Kini usiamu genap 18 tahun — siap melangkah menyambut masa depan yang gemilang dan bersinar!",
    sticker: "👑",
    color: "#FDF2F8",
  },
];

export default function MemoriesSection({ onNext }: MemoriesSectionProps) {
  const [likedCards, setLikedCards] = useState<{ [key: string]: boolean }>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    musicSynth.playCutePop();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    launchSparkleBurst(rect.left / window.innerWidth, rect.top / window.innerHeight);

    setLikedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="relative px-4 sm:px-6 py-24 overflow-hidden bg-[#FFF9FA]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[800px] bg-gradient-to-tr from-pink-200/20 via-purple-100/20 to-pink-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold uppercase tracking-widest border border-pink-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Spesial Untuk Keiko</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight">
            18 Alasan Mengapa Kamu Begitu Spesial ♡
          </h2>

          <p className="mt-3 font-letter italic text-lg sm:text-xl text-pink-800/80 max-w-xl mx-auto">
            18 hal manis yang membuat dunia ini jauh lebih indah karena kehadiranmu di dalamnya.
          </p>

          <div className="w-16 h-1 bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300 mx-auto mt-6 rounded-full" />
        </div>

        {/* 18 Reason Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MEMORIES_DATA.map((m) => {
            const isLiked = likedCards[m.id];
            return (
              <div
                key={m.id}
                className="group relative rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-pink-200/70 flex flex-col justify-between"
                style={{
                  background: m.color,
                  boxShadow: "0 8px 24px rgba(244, 63, 110, 0.06)",
                }}
              >
                <div>
                  {/* Top Bar: Number & Sticker */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-sans text-xs font-bold tracking-widest text-pink-600 bg-white/80 px-2.5 py-1 rounded-full border border-pink-200 shadow-sm">
                      #{m.num}
                    </span>
                    <span className="text-2xl transform transition-transform group-hover:scale-125 group-hover:rotate-12">
                      {m.sticker}
                    </span>
                  </div>

                  {/* Card Content in Indonesian */}
                  <p className="font-letter italic text-lg sm:text-xl text-gray-800 leading-relaxed">
                    "{m.text}"
                  </p>
                </div>

                {/* Bottom Like / Heart Button */}
                <div className="mt-5 pt-3 border-t border-pink-200/50 flex items-center justify-between">
                  <span className="text-[11px] font-sans text-pink-400 font-medium">
                    {isLiked ? "Tersimpan di hati 💖" : "Sentuh untuk menyukai"}
                  </span>
                  <button
                    onClick={(e) => toggleLike(m.id, e)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isLiked
                        ? "bg-pink-500 text-white scale-110 shadow-md shadow-pink-300"
                        : "bg-white/80 text-pink-400 hover:text-pink-600 hover:bg-pink-100"
                    }`}
                    title="Suka alasan ini"
                  >
                    <Heart
                      className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue to Cake Section */}
        <div className="mt-16 flex flex-col items-center justify-center">
          <p className="font-letter italic text-base text-pink-800 mb-4">
            Sekarang, saatnya meniup lilin ulang tahunmu... ✨
          </p>
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-medium text-sm sm:text-base shadow-xl shadow-pink-300 hover:shadow-2xl hover:scale-105 transition active:scale-95 flex items-center gap-2"
          >
            <span>Tiup Lilin & Make A Wish 🎂</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
