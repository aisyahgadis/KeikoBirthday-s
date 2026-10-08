import React, { useState, useEffect, useRef } from "react";
import WelcomeModal from "./components/WelcomeModal";
import AudioPlayer from "./components/AudioPlayer";
import HeroSection from "./components/HeroSection";
import LetterSection from "./components/LetterSection";
import MemoriesSection from "./components/MemoriesSection";
import CakeSection from "./components/CakeSection";
import FinalOverlay from "./components/FinalOverlay";
import { musicSynth } from "./utils/audioSynth";

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [section, setSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const memoriesRef = useRef<HTMLDivElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);

  // Start music & experience
  const handleStartExperience = () => {
    setHasStarted(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.85;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Audio play error, falling back to synth:", err);
          musicSynth.play();
          setIsPlaying(true);
        });
    } else {
      musicSynth.play();
      setIsPlaying(true);
    }
  };

  // Toggle music on/off
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      musicSynth.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          musicSynth.play();
          setIsPlaying(true);
        });
    }
  };

  // Smooth scroll to section
  const advanceToSection = (sectionIndex: number) => {
    setSection(sectionIndex);
    setTimeout(() => {
      if (sectionIndex === 1 && letterRef.current) {
        letterRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (sectionIndex === 2 && memoriesRef.current) {
        memoriesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (sectionIndex === 3 && cakeRef.current) {
        cakeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  };

  return (
    <div className="relative min-h-screen bg-[#FFF8FA] text-[#4A1224] selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden font-sans">
      {/* Background Audio Element with Real Oasis Studio Track */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/music/married-with-children.mp3" type="audio/mpeg" />
        <source src="/music/married-with-children.m4a" type="audio/mp4" />
        <source src="/music/married-with-children.aac" type="audio/aac" />
        <source src="/music/married-with-children.webm" type="audio/webm" />
      </audio>

      {/* 1. Welcome Modal on initial load */}
      {!hasStarted && <WelcomeModal onStart={handleStartExperience} />}

      {/* 2. Floating Cute Music Player Widget (Oasis - Married with Children) */}
      {hasStarted && (
        <AudioPlayer
          isPlaying={isPlaying}
          onTogglePlay={toggleMusic}
          audioRef={audioRef}
        />
      )}

      {/* 3. Hero Section (Clean & Spacious) */}
      <HeroSection onNext={() => advanceToSection(1)} />

      {/* 4. Letter Section */}
      {section >= 1 && (
        <div ref={letterRef} className="animate-fadeIn">
          <LetterSection onNext={() => advanceToSection(2)} />
        </div>
      )}

      {/* 5. 18 Reasons / Memories Section */}
      {section >= 2 && (
        <div ref={memoriesRef} className="animate-fadeIn">
          <MemoriesSection onNext={() => advanceToSection(3)} />
        </div>
      )}

      {/* 6. Cake & Make a Wish Section */}
      {section >= 3 && (
        <div ref={cakeRef} className="animate-fadeIn">
          <CakeSection onFinal={() => setShowFinal(true)} />
        </div>
      )}

      {/* 7. Final Grand Celebration Overlay */}
      <FinalOverlay show={showFinal} onClose={() => setShowFinal(false)} />
    </div>
  );
}
