// Web Audio API Synthesizer for Oasis - Married With Children & Interactive SFX

class OasisMusicSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private masterGain: GainNode | null = null;
  private volume: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Frequencies for notes
  private readonly NOTE_FREQ: { [key: string]: number } = {
    // Octave 2
    E2: 82.41, G2: 98.0, Gsharp2: 103.83, A2: 110.0, B2: 123.47,
    // Octave 3
    C3: 130.81, Csharp3: 138.59, D3: 146.83, Dsharp3: 155.56, E3: 164.81,
    F3: 174.61, Fsharp3: 185.0, G3: 196.0, Gsharp3: 207.65, A3: 220.0,
    Asharp3: 233.08, B3: 246.94,
    // Octave 4
    C4: 261.63, Csharp4: 277.18, D4: 293.66, Dsharp4: 311.13, E4: 329.63,
    F4: 349.23, Fsharp4: 369.99, G4: 392.0, Gsharp4: 415.3, A4: 440.0,
    Asharp4: 466.16, B4: 493.88,
    // Octave 5
    C5: 523.25, Csharp5: 554.37, D5: 587.33, Dsharp5: 622.25, E5: 659.25,
    Fsharp5: 739.99, Gsharp5: 830.61, A5: 880.0,
  };

  // Play a warm plucked acoustic guitar note
  private playPluck(note: string, time: number, duration: number = 1.2, velocity: number = 0.6) {
    if (!this.ctx || !this.masterGain) return;
    const freq = this.NOTE_FREQ[note];
    if (!freq) return;

    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm guitar waveform
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, time);

    oscHarmonic.type = "sine";
    oscHarmonic.frequency.setValueAtTime(freq * 2, time);

    // Warm acoustic resonant filter
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(freq * 5, time);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.5, time + duration * 0.7);

    // Envelope
    const attack = 0.008;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(velocity * 0.45, time + attack);
    gain.gain.exponentialRampToValueAtTime(velocity * 0.15, time + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.00001, time + duration);

    osc.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    oscHarmonic.start(time);
    osc.stop(time + duration);
    oscHarmonic.stop(time + duration);
  }

  // Play a dreamy bell/chime note (for melody highlights)
  private playBell(note: string, time: number, duration: number = 1.5, velocity: number = 0.3) {
    if (!this.ctx || !this.masterGain) return;
    const freq = this.NOTE_FREQ[note];
    if (!freq) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(velocity * 0.35, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.00001, time + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Married With Children - Acoustic Chord Arpeggios & Melody Loop
  // Tempo: 84 BPM -> beatDuration = 60/84 = ~0.714s, 16th note = ~0.178s
  private stepSequence() {
    if (!this.isPlaying || !this.ctx) return;

    const stepTime = 0.18; // ~84 BPM sixteenth note
    const now = this.ctx.currentTime + 0.05;

    // Structure: 4 beats per bar, 16 sixteenths per bar
    // Progression:
    // Bar 1: E major
    // Bar 2: G# major
    // Bar 3: C# minor
    // Bar 4: A major
    // Bar 5: C major
    // Bar 6: B7
    // Bar 7: E major
    // Bar 8: E / Turnaround

    const bar = Math.floor(this.currentStep / 16) % 8;
    const subStep = this.currentStep % 16;

    // Arpeggio patterns for each chord
    let bass = "E2";
    let chordNotes = ["E3", "Gsharp3", "B3", "E4"];
    let melodyNote: string | null = null;

    if (bar === 0) { // E
      bass = "E2";
      chordNotes = ["E3", "Gsharp3", "B3", "E4"];
      if (subStep === 0) melodyNote = "Gsharp4";
      if (subStep === 4) melodyNote = "Gsharp4";
      if (subStep === 8) melodyNote = "Fsharp4";
      if (subStep === 12) melodyNote = "E4";
    } else if (bar === 1) { // G#
      bass = "Gsharp2";
      chordNotes = ["Dsharp3", "Gsharp3", "C4", "Dsharp4"];
      if (subStep === 0) melodyNote = "Gsharp4";
      if (subStep === 4) melodyNote = "Fsharp4";
      if (subStep === 8) melodyNote = "E4";
      if (subStep === 12) melodyNote = "Dsharp4";
    } else if (bar === 2) { // C#m
      bass = "Csharp3";
      chordNotes = ["Gsharp3", "Csharp4", "E4", "Gsharp4"];
      if (subStep === 0) melodyNote = "E4";
      if (subStep === 6) melodyNote = "Dsharp4";
      if (subStep === 10) melodyNote = "Csharp4";
      if (subStep === 14) melodyNote = "B3";
    } else if (bar === 3) { // A
      bass = "A2";
      chordNotes = ["E3", "A3", "Csharp4", "E4"];
      if (subStep === 0) melodyNote = "Csharp4";
      if (subStep === 4) melodyNote = "E4";
      if (subStep === 8) melodyNote = "Csharp4";
      if (subStep === 12) melodyNote = "B3";
    } else if (bar === 4) { // C
      bass = "C3";
      chordNotes = ["G3", "C4", "E4", "G4"];
      if (subStep === 0) melodyNote = "E4";
      if (subStep === 6) melodyNote = "D4";
      if (subStep === 10) melodyNote = "C4";
    } else if (bar === 5) { // B7
      bass = "B2";
      chordNotes = ["Fsharp3", "A3", "Dsharp4", "Fsharp4"];
      if (subStep === 0) melodyNote = "Dsharp4";
      if (subStep === 6) melodyNote = "Fsharp4";
      if (subStep === 12) melodyNote = "Dsharp4";
    } else if (bar === 6) { // E
      bass = "E2";
      chordNotes = ["E3", "Gsharp3", "B3", "E4"];
      if (subStep === 0) melodyNote = "Gsharp4";
      if (subStep === 6) melodyNote = "B4";
      if (subStep === 10) melodyNote = "Gsharp4";
    } else if (bar === 7) { // E / Turnaround
      bass = "E2";
      chordNotes = ["E3", "Gsharp3", "B3", "E4"];
      if (subStep === 0) melodyNote = "E4";
      if (subStep === 8) melodyNote = "Fsharp4";
    }

    // Pluck rhythm
    if (subStep === 0) {
      this.playPluck(bass, now, 1.8, 0.7);
    }
    if (subStep % 2 === 0) {
      const noteIdx = (subStep / 2) % chordNotes.length;
      this.playPluck(chordNotes[noteIdx], now, 0.8, 0.45);
    }
    if (subStep === 6 || subStep === 14) {
      this.playPluck(chordNotes[chordNotes.length - 1], now, 0.6, 0.35);
    }

    // Pluck sweet melody bells
    if (melodyNote) {
      this.playBell(melodyNote, now, 1.4, 0.5);
      this.playPluck(melodyNote, now, 1.0, 0.3);
    }

    this.currentStep = (this.currentStep + 1) % 128;

    this.timerId = window.setTimeout(() => {
      this.stepSequence();
    }, stepTime * 1000);
  }

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.stepSequence();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // --- Sound Effects ---

  // Sparkle / Chime SFX
  public playSparkle() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = ["C5", "E5", "Gsharp5", "B5", "E5"];
    notes.forEach((n, idx) => {
      if (this.NOTE_FREQ[n]) {
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(this.NOTE_FREQ[n] || 880, now + idx * 0.06);
        g.gain.setValueAtTime(0.0001, now + idx * 0.06);
        g.gain.linearRampToValueAtTime(0.18, now + idx * 0.06 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.00001, now + idx * 0.06 + 0.4);
        osc.connect(g);
        g.connect(this.ctx!.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.45);
      }
    });
  }

  // Candle blow puff SFX (soft filtered white noise)
  public playCandleBlow() {
    this.initContext();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(250, this.ctx.currentTime + 0.3);
    filter.Q.setValueAtTime(3, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.32);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    noise.stop(this.ctx.currentTime + 0.35);
  }

  // Confetti celebration fanfare
  public playCelebrationFanfare() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const chords = [
      ["E4", "Gsharp4", "B4"],
      ["Gsharp4", "C5", "Dsharp5"],
      ["A4", "Csharp5", "E5"],
      ["B4", "Dsharp5", "Fsharp5"],
      ["E5", "Gsharp5", "B5"],
    ];

    chords.forEach((chord, i) => {
      const time = now + i * 0.12;
      chord.forEach((n) => {
        const freq = this.NOTE_FREQ[n];
        if (!freq) return;
        const osc = this.ctx!.createOscillator();
        const g = this.ctx!.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, time);
        g.gain.setValueAtTime(0.001, time);
        g.gain.linearRampToValueAtTime(0.18, time + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, time + 0.6);
        osc.connect(g);
        g.connect(this.ctx!.destination);
        osc.start(time);
        osc.stop(time + 0.65);
      });
    });
  }

  // Cute pop / heart tap
  public playCutePop() {
    this.initContext();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = "sine";
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }
}

export const musicSynth = new OasisMusicSynth();
