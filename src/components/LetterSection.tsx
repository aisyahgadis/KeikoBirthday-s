import React, { useState } from "react";
import { Sparkles, Heart, MailOpen, ArrowDown } from "lucide-react";
import { launchHeartConfetti } from "../utils/confetti";
import { musicSynth } from "../utils/audioSynth";

interface LetterSectionProps {
  onNext: () => void;
}

type EnvelopeState = "closed" | "opening" | "open";

export default function LetterSection({ onNext }: LetterSectionProps) {
  const [envState, setEnvState] = useState<EnvelopeState>("closed");
  const [showLetter, setShowLetter] = useState(false);

  const handleOpenEnvelope = () => {
    if (envState !== "closed") return;
    musicSynth.playSparkle();
    launchHeartConfetti(0.5, 0.4);
    setEnvState("opening");
    setTimeout(() => {
      setEnvState("open");
      setTimeout(() => {
        setShowLetter(true);
      }, 300);
    }, 600);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background Soft Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5F7] via-[#FFF9FB] to-[#FFF0F5] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* Intro text before envelope opens */}
      {!showLetter && (
        <div className="text-center mb-10 z-10 animate-fadeIn">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/90 text-pink-700 text-xs font-semibold uppercase tracking-widest border border-pink-200 mb-3">
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
            <span>Pesan Rahasia</span>
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-800">
            Ada sesuatu yang ingin kusampaikan padamu...
          </h2>
          <p className="font-letter italic text-base text-pink-800/80 mt-1">
            Sentuh amplop berstempel di bawah ini untuk membukanya ♡
          </p>
        </div>
      )}

      {/* ── Envelope View ── */}
      {!showLetter && (
        <div className="relative z-10 select-none animate-cute-pop flex flex-col items-center">
          <div
            onClick={handleOpenEnvelope}
            className={`relative w-[340px] sm:w-[400px] h-[230px] sm:h-[260px] rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-105 shadow-2xl ${
              envState === "closed" ? "animate-[envelopeBounce_3s_ease-in-out_infinite]" : ""
            }`}
            style={{
              background: "linear-gradient(145deg, #FFF0F5 0%, #FFE4EC 100%)",
              border: "2px solid #FFA8BE",
            }}
          >
            {/* Envelope Folds Pattern */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                boxShadow: "inset 0 0 20px rgba(244,63,110,0.1)",
              }}
            >
              {/* Left triangle */}
              <div
                className="absolute inset-0 bg-pink-100/60"
                style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }}
              />
              {/* Right triangle */}
              <div
                className="absolute inset-0 bg-pink-100/40"
                style={{ clipPath: "polygon(100% 0, 50% 50%, 100% 100%)" }}
              />
              {/* Bottom fold */}
              <div
                className="absolute bottom-0 inset-x-0 h-3/5 bg-pink-200/40"
                style={{ clipPath: "polygon(0 25%, 50% 100%, 100% 25%, 100% 100%, 0 100%)" }}
              />
            </div>

            {/* Flap */}
            <div
              className="absolute top-0 inset-x-0 h-3/5"
              style={{
                perspective: "800px",
                zIndex: 20,
              }}
            >
              <div
                className="w-full h-full transition-transform duration-500"
                style={{
                  transformOrigin: "top center",
                  transform:
                    envState === "opening"
                      ? "rotateX(-90deg)"
                      : envState === "open"
                      ? "rotateX(-180deg)"
                      : "rotateX(0deg)",
                  clipPath: "polygon(0 0, 50% 75%, 100% 0)",
                  background: "linear-gradient(175deg, #FFE6EC 0%, #FFD1DC 100%)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                }}
              />
            </div>

            {/* Heart Wax Seal */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center shadow-xl border-2 border-pink-100 transition-opacity duration-300 z-30 ${
                envState !== "closed" ? "opacity-0 scale-75" : "opacity-100"
              }`}
              style={{
                background: "radial-gradient(circle at 35% 35%, #F43F6E 0%, #BE1249 100%)",
              }}
            >
              <span className="font-display italic text-white text-xl font-bold">
                K
              </span>
            </div>
          </div>

          {/* Click hint */}
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-pink-600/80">
            ✨ Klik untuk membuka surat ✨
          </p>
        </div>
      )}

      {/* ── Unfolded Letter View ── */}
      {showLetter && (
        <div className="relative z-10 w-full max-w-2xl animate-cute-pop">
          {/* Main Paper Card */}
          <div
            className="rounded-3xl p-6 sm:p-10 relative shadow-2xl border-2 border-pink-200/80"
            style={{
              background: "linear-gradient(160deg, #FFFFFF 0%, #FFFDF9 60%, #FFF6F8 100%)",
              boxShadow: "0 20px 50px rgba(244, 63, 110, 0.12), 0 2px 10px rgba(255, 182, 193, 0.2)",
            }}
          >
            {/* Top decorative ribbon accent */}
            <div className="absolute top-0 inset-x-0 h-2 rounded-t-3xl bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300" />

            {/* Stamp & date in top-right */}
            <div className="flex items-center justify-between border-b border-pink-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-sm font-bold">
                  💌
                </span>
                <span className="text-xs font-semibold text-pink-700 tracking-wider uppercase font-sans">
                  Sepucuk Surat untuk Keiko
                </span>
              </div>
              <div className="text-xs text-pink-500 font-letter italic">
                Special 18th Edition ♡
              </div>
            </div>

            {/* Letter Body in Indonesian with poetic warmth */}
            <div className="font-letter text-lg sm:text-xl text-gray-800 leading-relaxed space-y-4">
              <p className="font-bold text-pink-700 text-xl sm:text-2xl font-display not-italic">
                Dear Keiko,
              </p>

              <p>
                Selamat ulang tahun yang ke-18 ya! 🎉🌸
              </p>

              <p>
                Aku ingin kamu tahu betapa berharga dan istimewanya dirimu — bukan hanya hari ini saat kita semua merayakanmu, tetapi juga di setiap momen-momen kecil yang mungkin sering terlewatkan.
              </p>

              <p>
                Di lembaran baru usiamu yang ke-18 ini, semoga langkahmu selalu dipeluk oleh kebaikan. Semoga ada lebih banyak alasan untuk tersenyum manis, lebih banyak tempat seru untuk dijelajahi, lebih banyak tawa lepas yang tulus, dan saat-saat di mana kamu menatap sekelilingmu lalu merasa:{" "}
                <em className="text-pink-600 font-bold">
                  "Wah, hidup ini ternyata begitu indah dan menyenangkan." ✨
                </em>
              </p>

              <p>
                Terima kasih sudah menjadi sosok yang selalu membawa rasa nyaman, keceriaan, dan kehangatan bagi orang-orang di sekitarmu.
              </p>

              <p>
                Kamu pantas mendapatkan tahun yang penuh dengan kebahagiaan tak terduga, dikelilingi orang-orang yang tulus menyayangimu, dan menyaksikan mimpi-mimpimu perlahan menjadi nyata.
              </p>

              <p className="border-l-2 border-pink-300 pl-4 my-4 italic text-pink-900 bg-pink-50/50 py-2 rounded-r-xl">
                "Welcome to 18! Selamat bertumbuh, mencoba hal-hal baru tanpa ragu, dan terus menjadi sosok yang selalu kami banggakan."
              </p>

              <p>
                Apapun yang terjadi nanti di masa depan, selalu ingat ini baik-baik ya:
              </p>

              <div className="py-2 space-y-1 font-semibold text-pink-700 not-italic text-center text-base sm:text-lg">
                <p>🌸 You are deeply loved,</p>
                <p>💖 You are appreciated,</p>
                <p>✨ And you are truly worth celebrating every single day.</p>
              </div>

              <p className="pt-2">
                Happy 18th Birthday, Keiko. Semoga kejutan kecil ini berhasil membuat harimu tersenyum lebar! ♡
              </p>

              <div className="pt-4 text-right">
                <p className="font-handwriting text-2xl sm:text-3xl text-pink-600">
                  — With lots of love & hugs 🎀
                </p>
              </div>
            </div>

            {/* Next Button */}
            <div className="mt-8 pt-6 border-t border-pink-100 flex justify-center">
              <button
                onClick={onNext}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-sm sm:text-base shadow-lg shadow-pink-200 hover:shadow-xl hover:scale-105 transition active:scale-95 flex items-center gap-2"
              >
                <span>Lihat 18 Hal Spesial Tentangmu</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
