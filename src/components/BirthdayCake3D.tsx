import React, { useState } from "react";
import { Sparkles, Wind, Flame, Cake, RefreshCw, Heart, Utensils } from "lucide-react";
import { launchGrandCelebration, launchHeartConfetti, launchSparkleBurst } from "../utils/confetti";
import { musicSynth } from "../utils/audioSynth";
import { CakeFlavor } from "../types";

interface BirthdayCake3DProps {
  onAllCandlesBlown?: () => void;
  scale?: number;
}

const CANDLE_COLORS = [
  "#FF7597", "#FFA8BE", "#FFCCD8", "#FBBF24", "#FDE68A",
  "#E0C3FC", "#C084FC", "#F472B6", "#FB7185", "#FDA4AF",
  "#FF9EAA", "#38BDF8", "#FCD34D", "#F43F5E", "#E879F9",
  "#FDA4AF", "#FDE047", "#FF6B8B",
];

export default function BirthdayCake3D({
  onAllCandlesBlown,
  scale = 1,
}: BirthdayCake3DProps) {
  // 18 candles state
  const [candles, setCandles] = useState<boolean[]>(Array(18).fill(true));
  const [flavor, setFlavor] = useState<CakeFlavor>("strawberry");
  const [isSliced, setIsSliced] = useState(false);
  const [blowingAll, setBlowingAll] = useState(false);
  const [showCelebrationBadge, setShowCelebrationBadge] = useState(false);

  const litCount = candles.filter(Boolean).length;
  const allBlown = litCount === 0;

  // Blow single candle
  const blowCandle = (index: number) => {
    if (!candles[index]) return;
    musicSynth.playCandleBlow();
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    // If this was the last candle
    if (newCandles.filter(Boolean).length === 0) {
      handleAllBlown();
    }
  };

  // Blow all candles at once
  const blowAllCandles = () => {
    if (allBlown) return;
    setBlowingAll(true);
    musicSynth.playCandleBlow();

    setTimeout(() => {
      setCandles(Array(18).fill(false));
      setBlowingAll(false);
      handleAllBlown();
    }, 450);
  };

  // Relight all candles
  const relightCandles = () => {
    musicSynth.playSparkle();
    setCandles(Array(18).fill(true));
    setShowCelebrationBadge(false);
    setIsSliced(false);
  };

  // Trigger celebration when all candles are blown
  const handleAllBlown = () => {
    setShowCelebrationBadge(true);
    musicSynth.playCelebrationFanfare();
    launchGrandCelebration();
    if (onAllCandlesBlown) {
      onAllCandlesBlown();
    }
  };

  // Cut the cake
  const handleCutCake = () => {
    musicSynth.playCutePop();
    setIsSliced(true);
    launchHeartConfetti(0.5, 0.5);
  };

  // Cake color themes based on flavor
  const themeColors = {
    strawberry: {
      tier1: "url(#pinkGradient)",
      tier2: "url(#strawberryGradient)",
      tier3: "url(#creamGradient)",
      frosting: "#FFF5F7",
      drips: "#FF7597",
      accent: "#FF4D79",
    },
    lavender: {
      tier1: "url(#lavenderGradient)",
      tier2: "url(#softPurpleGradient)",
      tier3: "url(#creamGradient)",
      frosting: "#FAF5FF",
      drips: "#C084FC",
      accent: "#A855F7",
    },
    chocolate: {
      tier1: "url(#chocoGradient)",
      tier2: "url(#rubyGradient)",
      tier3: "url(#creamGradient)",
      frosting: "#FEF2F2",
      drips: "#991B1B",
      accent: "#E11D48",
    },
    matcha: {
      tier1: "url(#matchaGradient)",
      tier2: "url(#pastelGreenGradient)",
      tier3: "url(#creamGradient)",
      frosting: "#F0FDF4",
      drips: "#86EFAC",
      accent: "#22C55E",
    },
  }[flavor];

  // Coordinates for 18 candles (10 on top tier, 8 on middle tier)
  const topTierCandles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    cx: 88 + i * 11.5,
    cy: 85,
    color: CANDLE_COLORS[i],
    delay: (i * 0.12).toFixed(2),
  }));

  const midTierCandles = Array.from({ length: 8 }, (_, i) => ({
    id: 10 + i,
    cx: 58 + i * 23.5,
    cy: 145,
    color: CANDLE_COLORS[10 + i],
    delay: ((i + 1) * 0.15).toFixed(2),
  }));

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      {/* Celebration Banner when all candles blown */}
      {showCelebrationBadge && (
        <div className="mb-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-display text-sm sm:text-base font-semibold shadow-xl shadow-pink-300 animate-bounce flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
          <span>✨ Permohonanmu terkabul! Happy 18th Keiko! 💖</span>
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
        </div>
      )}

      {/* Main SVG Cake Illustration (Grand Multi-Tier Aesthetic) */}
      <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
        <svg
          viewBox="0 0 320 330"
          style={{
            width: `min(${Math.round(380 * scale)}px, calc(100vw - 36px))`,
            height: "auto",
            overflow: "visible",
          }}
          className="filter drop-shadow-2xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE4E9" />
              <stop offset="50%" stopColor="#FFCCD6" />
              <stop offset="100%" stopColor="#FFA3B7" />
            </linearGradient>

            <linearGradient id="strawberryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF0F3" />
              <stop offset="50%" stopColor="#FFE0E6" />
              <stop offset="100%" stopColor="#FFB3C6" />
            </linearGradient>

            <linearGradient id="creamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FFF7F9" />
              <stop offset="100%" stopColor="#FFEBF0" />
            </linearGradient>

            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            <linearGradient id="lavenderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF5FF" />
              <stop offset="50%" stopColor="#E9D5FF" />
              <stop offset="100%" stopColor="#D8B4FE" />
            </linearGradient>

            <linearGradient id="softPurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3E8FF" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>

            <linearGradient id="chocoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7F1D1D" />
              <stop offset="100%" stopColor="#450A0A" />
            </linearGradient>

            <linearGradient id="rubyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE4E6" />
              <stop offset="100%" stopColor="#FDA4AF" />
            </linearGradient>

            <linearGradient id="matchaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DCFCE7" />
              <stop offset="100%" stopColor="#86EFAC" />
            </linearGradient>

            <linearGradient id="pastelGreenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="100%" stopColor="#BBF7D0" />
            </linearGradient>

            <radialGradient id="plateGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE4E9" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#FFF0F5" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ── 1. Crystal / Gold Pedestal Stand ── */}
          <g>
            {/* Ambient soft glow */}
            <ellipse cx="160" cy="305" rx="140" ry="18" fill="url(#plateGlow)" />
            {/* Stand Base */}
            <ellipse cx="160" cy="305" rx="125" ry="16" fill="#F8FAFC" stroke="#FFA8BE" strokeWidth="2" />
            <ellipse cx="160" cy="303" rx="118" ry="13" fill="#FFFFFF" />
            {/* Pedestal stem */}
            <path d="M140 292 C140 278 148 274 150 268 L170 268 C172 274 180 278 180 292 Z" fill="#FFE4E9" stroke="#FFA8BE" strokeWidth="1.5" />
            {/* Main Cake Platter */}
            <ellipse cx="160" cy="270" rx="138" ry="18" fill="#FFFFFF" stroke="#FFA8BE" strokeWidth="2.5" />
            <ellipse cx="160" cy="268" rx="134" ry="16" fill="url(#pinkGradient)" opacity="0.3" />
            {/* Pearls around platter rim */}
            {Array.from({ length: 22 }, (_, i) => {
              const angle = (i / 22) * Math.PI * 2;
              const px = 160 + Math.cos(angle) * 132;
              const py = 269 + Math.sin(angle) * 15;
              return <circle key={`pearl-${i}`} cx={px} cy={py} r="2.5" fill="#FFFFFF" stroke="#FFCCD6" strokeWidth="0.8" />;
            })}
          </g>

          {/* ── 2. Tier 1 (Base Bottom Tier) ── */}
          <g>
            {/* Cake Body */}
            <rect x="35" y="210" width="250" height="60" rx="14" fill={themeColors.tier1} stroke="#FFA8BE" strokeWidth="2" />
            {/* Bottom frosting border */}
            <path
              d="M35 264 Q45 272 55 264 Q65 272 75 264 Q85 272 95 264 Q105 272 115 264 Q125 272 135 264 Q145 272 155 264 Q165 272 175 264 Q185 272 195 264 Q205 272 215 264 Q225 272 235 264 Q245 272 255 264 Q265 272 275 264 Q285 272 285 264"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Ribbon & bows decoration */}
            <line x1="38" y1="238" x2="282" y2="238" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="6,4" opacity="0.85" />
            {/* Little pink ribbon bows on base */}
            {[70, 160, 250].map((bx, i) => (
              <g key={`bow-${i}`} transform={`translate(${bx}, 238)`}>
                <circle cx="0" cy="0" r="3.5" fill="#FF4D79" />
                <path d="M-8 -5 C-4 -1 0 0 -8 5 Z" fill="#FF7597" />
                <path d="M8 -5 C4 -1 0 0 8 5 Z" fill="#FF7597" />
              </g>
            ))}
            {/* Gold "18" badge in the center */}
            <circle cx="160" cy="238" r="13" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="2" />
            <text x="160" y="243" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontSize="13" fontWeight="bold" fill="#F43F6E">
              18
            </text>
          </g>

          {/* ── 3. Tier 2 (Middle Tier) ── */}
          <g>
            {/* Tier 2 Body */}
            <rect x="55" y="150" width="210" height="64" rx="12" fill={themeColors.tier2} stroke="#FFA8BE" strokeWidth="1.8" />
            {/* Whipped Frosting Drips */}
            <path
              d="M55 150 C65 168 75 168 85 150 C95 174 105 174 115 150 C125 164 135 164 145 150 C155 178 165 178 175 150 C185 166 195 166 205 150 C215 176 225 176 235 150 C245 162 255 162 265 150"
              fill={themeColors.frosting}
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            {/* Top frosting rosettes */}
            <rect x="55" y="146" width="210" height="12" rx="6" fill="#FFFFFF" />
            {/* Cute French Macarons on the side */}
            <ellipse cx="66" cy="208" rx="8" ry="5" fill="#FDA4AF" stroke="#E11D48" strokeWidth="0.8" />
            <ellipse cx="254" cy="208" rx="8" ry="5" fill="#FDA4AF" stroke="#E11D48" strokeWidth="0.8" />
            {/* Sugar Sakura blossoms 🌸 */}
            {[105, 160, 215].map((fx, i) => (
              <g key={`flower-${i}`} transform={`translate(${fx}, 184)`}>
                <circle cx="0" cy="0" r="2" fill="#FBBF24" />
                <circle cx="-4" cy="-2" r="3.5" fill="#FFE4E9" opacity="0.9" />
                <circle cx="4" cy="-2" r="3.5" fill="#FFE4E9" opacity="0.9" />
                <circle cx="0" cy="-5" r="3.5" fill="#FFE4E9" opacity="0.9" />
                <circle cx="-3" cy="3" r="3.5" fill="#FFE4E9" opacity="0.9" />
                <circle cx="3" cy="3" r="3.5" fill="#FFE4E9" opacity="0.9" />
              </g>
            ))}
          </g>

          {/* ── 4. Tier 3 (Top Tier) ── */}
          <g>
            {/* Tier 3 Body */}
            <rect x="85" y="90" width="150" height="62" rx="10" fill={themeColors.tier3} stroke="#FFA8BE" strokeWidth="1.8" />
            {/* Cream Drips */}
            <path
              d="M85 90 C93 104 101 104 109 90 C117 110 125 110 133 90 C141 102 149 102 157 90 C165 112 173 112 181 90 C189 105 197 105 205 90 C213 110 221 110 229 90 L235 90"
              fill="#FFFFFF"
            />
            <rect x="85" y="86" width="150" height="12" rx="6" fill="#FFFFFF" />
            {/* Fresh Ruby Strawberries on Top 🍓 */}
            {[100, 130, 160, 190, 220].map((sx, i) => (
              <g key={`strawberry-${i}`} transform={`translate(${sx}, 83)`}>
                {/* Strawberry Body */}
                <path d="M-6 0 C-8 8 0 13 0 13 C0 13 8 8 6 0 Z" fill="#E11D48" stroke="#9F1239" strokeWidth="0.7" />
                {/* Strawberry seeds */}
                <circle cx="-2" cy="4" r="0.6" fill="#FDE68A" />
                <circle cx="2" cy="5" r="0.6" fill="#FDE68A" />
                <circle cx="0" cy="8" r="0.6" fill="#FDE68A" />
                {/* Green leaves */}
                <path d="M-7 -2 C-3 0 0 -1 0 0 C0 -1 3 0 7 -2 C4 -4 0 -3 -7 -2 Z" fill="#22C55E" />
                {/* Whipped Cream peak beside strawberry */}
                <circle cx="6" cy="4" r="3.5" fill="#FFFFFF" opacity="0.9" />
              </g>
            ))}
          </g>

          {/* ── 5. Golden Cake Topper ("Happy 18th ✨ Keiko") ── */}
          <g transform="translate(160, 48)">
            {/* Support sticks */}
            <line x1="-30" y1="20" x2="-30" y2="40" stroke="#F59E0B" strokeWidth="1.5" />
            <line x1="30" y1="20" x2="30" y2="40" stroke="#F59E0B" strokeWidth="1.5" />
            {/* Heart Topper Banner */}
            <rect x="-65" y="0" width="130" height="24" rx="12" fill="#FFFFFF" stroke="url(#goldGradient)" strokeWidth="2" className="filter drop-shadow" />
            <text
              x="0"
              y="16"
              textAnchor="middle"
              fontFamily="Playfair Display, Georgia, serif"
              fontSize="11"
              fontWeight="bold"
              fill="#BE1249"
              fontStyle="italic"
            >
              ♡ Happy 18th Keiko ♡
            </text>
          </g>

          {/* ── 6. 18 Interactive Glowing Candles ── */}
          {/* Top Tier 10 Candles */}
          {topTierCandles.map((c, i) => {
            const isLit = candles[c.id];
            return (
              <g
                key={`candle-top-${c.id}`}
                onClick={() => blowCandle(c.id)}
                className="cursor-pointer transition-opacity hover:opacity-80"
              >
                {/* Candle Stick */}
                <rect
                  x={c.cx - 2.5}
                  y={c.cy - 18}
                  width="5"
                  height="18"
                  rx="2.5"
                  fill={c.color}
                  stroke="#FFFFFF"
                  strokeWidth="0.6"
                />
                {/* Candle Wick */}
                <line x1={c.cx} y1={c.cy - 18} x2={c.cx} y2={c.cy - 21} stroke="#4A1224" strokeWidth="0.8" />

                {/* Animated Candle Flame */}
                {isLit ? (
                  <g
                    className="animate-flame"
                    style={{
                      transformOrigin: `${c.cx}px ${c.cy - 21}px`,
                      animationDelay: `${c.delay}s`,
                    }}
                  >
                    {/* Outer Glow */}
                    <ellipse cx={c.cx} cy={c.cy - 28} rx="6" ry="8" fill="#FBBF24" opacity="0.3" filter="url(#softGlow)" />
                    {/* Main Flame */}
                    <path
                      d={`M${c.cx - 3.5} ${c.cy - 22} Q${c.cx} ${c.cy - 34} ${c.cx} ${c.cy - 34} Q${c.cx} ${c.cy - 34} ${c.cx + 3.5} ${c.cy - 22} Q${c.cx} ${c.cy - 20} ${c.cx - 3.5} ${c.cy - 22} Z`}
                      fill="#F59E0B"
                    />
                    {/* Inner Core Flame */}
                    <path
                      d={`M${c.cx - 1.8} ${c.cy - 22} Q${c.cx} ${c.cy - 30} ${c.cx} ${c.cy - 30} Q${c.cx} ${c.cy - 30} ${c.cx + 1.8} ${c.cy - 22} Z`}
                      fill="#FDE68A"
                    />
                    {/* Blue base spark */}
                    <circle cx={c.cx} cy={c.cy - 21.5} r="1" fill="#60A5FA" />
                  </g>
                ) : (
                  /* Animated Smoke Puff when blown out */
                  <g className="animate-[smokePuff_1.5s_ease-out_forwards]">
                    <circle cx={c.cx} cy={c.cy - 25} r="3" fill="#9CA3AF" opacity="0.6" />
                    <circle cx={c.cx + 2} cy={c.cy - 32} r="4.5" fill="#D1D5DB" opacity="0.4" />
                    <circle cx={c.cx - 1} cy={c.cy - 39} r="6" fill="#E5E7EB" opacity="0.2" />
                  </g>
                )}
              </g>
            );
          })}

          {/* Middle Tier 8 Candles */}
          {midTierCandles.map((c, i) => {
            const isLit = candles[c.id];
            return (
              <g
                key={`candle-mid-${c.id}`}
                onClick={() => blowCandle(c.id)}
                className="cursor-pointer transition-opacity hover:opacity-80"
              >
                <rect
                  x={c.cx - 2.5}
                  y={c.cy - 18}
                  width="5"
                  height="18"
                  rx="2.5"
                  fill={c.color}
                  stroke="#FFFFFF"
                  strokeWidth="0.6"
                />
                <line x1={c.cx} y1={c.cy - 18} x2={c.cx} y2={c.cy - 21} stroke="#4A1224" strokeWidth="0.8" />

                {isLit ? (
                  <g
                    className="animate-flame"
                    style={{
                      transformOrigin: `${c.cx}px ${c.cy - 21}px`,
                      animationDelay: `${c.delay}s`,
                    }}
                  >
                    <ellipse cx={c.cx} cy={c.cy - 28} rx="6" ry="8" fill="#FBBF24" opacity="0.3" filter="url(#softGlow)" />
                    <path
                      d={`M${c.cx - 3.5} ${c.cy - 22} Q${c.cx} ${c.cy - 34} ${c.cx} ${c.cy - 34} Q${c.cx} ${c.cy - 34} ${c.cx + 3.5} ${c.cy - 22} Q${c.cx} ${c.cy - 20} ${c.cx - 3.5} ${c.cy - 22} Z`}
                      fill="#F59E0B"
                    />
                    <path
                      d={`M${c.cx - 1.8} ${c.cy - 22} Q${c.cx} ${c.cy - 30} ${c.cx} ${c.cy - 30} Q${c.cx} ${c.cy - 30} ${c.cx + 1.8} ${c.cy - 22} Z`}
                      fill="#FDE68A"
                    />
                    <circle cx={c.cx} cy={c.cy - 21.5} r="1" fill="#60A5FA" />
                  </g>
                ) : (
                  <g className="animate-[smokePuff_1.5s_ease-out_forwards]">
                    <circle cx={c.cx} cy={c.cy - 25} r="3" fill="#9CA3AF" opacity="0.6" />
                    <circle cx={c.cx + 2} cy={c.cy - 32} r="4.5" fill="#D1D5DB" opacity="0.4" />
                  </g>
                )}
              </g>
            );
          })}

          {/* ── 7. Cake Slice Reveal (if sliced) ── */}
          {isSliced && (
            <g transform="translate(245, 175) rotate(15)" className="animate-cute-pop">
              <path d="M0 0 L45 25 L35 60 L-10 35 Z" fill="#FFE4E9" stroke="#E11D48" strokeWidth="1.5" />
              <line x1="15" y1="10" x2="10" y2="45" stroke="#FFFFFF" strokeWidth="3" />
              <circle cx="20" cy="25" r="4" fill="#E11D48" />
              <text x="25" y="45" fontSize="16">🍰</text>
            </g>
          )}
        </svg>
      </div>

      {/* Interactive Controls & Status */}
      <div className="mt-6 flex flex-col items-center gap-3.5 w-full max-w-md px-4">
        {/* Candle Count Pill */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-300 text-xs font-semibold text-pink-700 shadow-sm">
          <Flame className={`w-3.5 h-3.5 ${litCount > 0 ? "text-amber-500 fill-amber-500 animate-pulse" : "text-gray-400"}`} />
          <span>
            {litCount > 0
              ? `${litCount} dari 18 lilin masih menyala (Klik lilin untuk meniup!)`
              : "Semua 18 lilin sudah ditiup! 🎉✨"}
          </span>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {/* Blow all candles button */}
          {litCount > 0 && (
            <button
              onClick={blowAllCandles}
              disabled={blowingAll}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-pink-300 hover:shadow-lg hover:scale-105 transition active:scale-95 flex items-center gap-2"
            >
              <Wind className="w-4 h-4" />
              <span>Tiup Semua Lilin 🎂💨</span>
            </button>
          )}

          {/* Relight button */}
          {litCount < 18 && (
            <button
              onClick={relightCandles}
              className="px-4 py-2.5 rounded-full bg-white text-pink-600 border border-pink-300 font-medium text-xs sm:text-sm shadow-sm hover:bg-pink-50 hover:scale-105 transition active:scale-95 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Nyalakan Lagi 🔥</span>
            </button>
          )}

          {/* Slice cake button */}
          {!isSliced && (
            <button
              onClick={handleCutCake}
              className="px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-amber-200 hover:shadow-lg hover:scale-105 transition active:scale-95 flex items-center gap-1.5"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Potong Kue 🍰</span>
            </button>
          )}
        </div>

        {/* Flavor switchers */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-pink-200/60 text-[11px] text-pink-800 font-medium">
          <span className="text-gray-500">Rasa Kue:</span>
          <button
            onClick={() => setFlavor("strawberry")}
            className={`px-2.5 py-1 rounded-full transition ${flavor === "strawberry" ? "bg-pink-500 text-white font-bold" : "bg-pink-100 text-pink-700 hover:bg-pink-200"}`}
          >
            🍓 Strawberry Shortcake
          </button>
          <button
            onClick={() => setFlavor("lavender")}
            className={`px-2.5 py-1 rounded-full transition ${flavor === "lavender" ? "bg-purple-500 text-white font-bold" : "bg-purple-100 text-purple-700 hover:bg-purple-200"}`}
          >
            🌸 Lavender Berry
          </button>
          <button
            onClick={() => setFlavor("chocolate")}
            className={`px-2.5 py-1 rounded-full transition ${flavor === "chocolate" ? "bg-rose-900 text-white font-bold" : "bg-rose-100 text-rose-800 hover:bg-rose-200"}`}
          >
            🍫 Red Velvet
          </button>
        </div>
      </div>
    </div>
  );
}
