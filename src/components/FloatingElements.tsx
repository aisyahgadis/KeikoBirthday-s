import React from "react";

interface FloatingElementsProps {
  balloonCount?: number;
  heartCount?: number;
  sparkleCount?: number;
}

const BALLOON_COLORS = [
  "#FFB6C1", // Light Pink
  "#FFC0CB", // Pink
  "#FFD1DC", // Pastel Pink
  "#E0C3FC", // Lavender
  "#FDE2E4", // Soft Blush
  "#FBCFE8", // Pink 200
  "#FDE68A", // Soft Gold
];

export default function FloatingElements({
  balloonCount = 14,
  heartCount = 12,
  sparkleCount = 16,
}: FloatingElementsProps) {
  // Generate stable random balloons
  const balloons = Array.from({ length: balloonCount }, (_, i) => ({
    id: i,
    left: `${(i * 7.5 + (i % 3) * 5) % 94 + 3}%`,
    color: BALLOON_COLORS[i % BALLOON_COLORS.length],
    size: 0.75 + ((i * 7) % 6) * 0.08,
    duration: 18 + ((i * 11) % 12),
    delay: -((i * 4.5) % 20),
    sway: (i % 2 === 0 ? 1 : -1) * (12 + (i % 8)),
  }));

  // Floating hearts
  const hearts = Array.from({ length: heartCount }, (_, i) => ({
    id: i,
    left: `${(i * 8.8 + 4) % 92 + 4}%`,
    duration: 12 + ((i * 9) % 10),
    delay: -((i * 3.7) % 15),
    size: 14 + (i % 4) * 6,
    color: i % 2 === 0 ? "#FF7597" : "#FFA8BE",
  }));

  // Sparkles
  const sparkles = Array.from({ length: sparkleCount }, (_, i) => ({
    id: i,
    left: `${(i * 6.3 + 2) % 96}%`,
    top: `${(i * 8.1 + 5) % 90}%`,
    delay: (i * 0.35) % 4,
    size: 10 + (i % 3) * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Pastel Balloons */}
      {balloons.map((b) => (
        <div
          key={`balloon-${b.id}`}
          className="absolute select-none"
          style={{
            left: b.left,
            bottom: "-120px",
            animation: `heartFloatUp ${b.duration}s linear ${b.delay}s infinite`,
            transform: `scale(${b.size})`,
          }}
        >
          <svg
            width="54"
            height="100"
            viewBox="0 0 54 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-md"
          >
            {/* Balloon Body */}
            <defs>
              <radialGradient id={`balloon-grad-${b.id}`} cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="40%" stopColor={b.color} stopOpacity="0.95" />
                <stop offset="100%" stopColor={b.color} stopOpacity="0.8" />
              </radialGradient>
            </defs>
            <ellipse
              cx="27"
              cy="34"
              rx="23"
              ry="29"
              fill={`url(#balloon-grad-${b.id})`}
            />
            {/* Gloss highlight */}
            <ellipse cx="18" cy="22" rx="7" ry="11" fill="white" opacity="0.45" />
            <ellipse cx="34" cy="16" rx="3.5" ry="4.5" fill="white" opacity="0.25" />
            {/* Knot */}
            <path
              d="M23 63 L27 67 L31 63 Z"
              fill={b.color}
              opacity="0.9"
            />
            {/* Ribbon String */}
            <path
              d="M27 67 Q22 75 30 82 Q23 90 27 98"
              stroke={b.color}
              strokeWidth="1.2"
              fill="none"
              opacity="0.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}

      {/* Floating Pastel Hearts */}
      {hearts.map((h) => (
        <div
          key={`heart-${h.id}`}
          className="absolute"
          style={{
            left: h.left,
            bottom: "-60px",
            animation: `heartFloatUp ${h.duration}s ease-in ${h.delay}s infinite`,
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color}
            opacity="0.65"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Twinkling Star Sparkles */}
      {sparkles.map((s) => (
        <div
          key={`sparkle-${s.id}`}
          className="absolute"
          style={{
            left: s.left,
            top: s.top,
            animation: `sparkleSpin ${2 + s.delay}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
              fill="#FBBF24"
              opacity="0.8"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
