import confetti from "canvas-confetti";

export function launchHeartConfetti(x = 0.5, y = 0.6) {
  // Pastel pink, rose, gold, cream palette
  const colors = ["#FF7597", "#FFB3C6", "#FFC2D1", "#FFE5EC", "#FBBF24", "#E0C3FC"];

  // Custom heart shape
  const heartShape = confetti.shapeFromPath({
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  });

  confetti({
    particleCount: 40,
    spread: 60,
    origin: { x, y },
    colors,
    shapes: [heartShape, "circle"],
    scalar: 1.2,
    ticks: 180,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 25,
  });
}

export function launchGrandCelebration() {
  const duration = 4.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ["#FF5E89", "#FFA3B7", "#FFCCD6", "#FDE68A", "#E9D5FF", "#A7F3D0", "#FFFFFF"];

  const heartShape = confetti.shapeFromPath({
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  });

  const starShape = confetti.shapeFromPath({
    path: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  });

  const interval: number = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Left cannon
    confetti({
      particleCount: Math.floor(particleCount),
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
      shapes: [heartShape, starShape, "circle"],
      scalar: 1.3,
    });

    // Right cannon
    confetti({
      particleCount: Math.floor(particleCount),
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
      shapes: [heartShape, starShape, "circle"],
      scalar: 1.3,
    });
  }, 220);
}

export function launchSparkleBurst(x: number, y: number) {
  confetti({
    particleCount: 25,
    spread: 360,
    startVelocity: 15,
    origin: { x, y },
    colors: ["#FBBF24", "#FDE68A", "#FF8DA1", "#FFF"],
    ticks: 90,
    gravity: 0.6,
    scalar: 0.9,
  });
}
