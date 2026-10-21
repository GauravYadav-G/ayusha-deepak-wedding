"use client";
import { useEffect, useRef, useState } from "react";
import { Music2, Pause } from "lucide-react";

export default function MusicToggle() {
  const songUrl = process.env.NEXT_PUBLIC_WEDDING_SONG_URL || "/artwork/din-shagna-da.mp3";
  const songTitle = process.env.NEXT_PUBLIC_WEDDING_SONG_TITLE || "Din Shagna Da";
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const hasUserPaused = useRef(false);

  useEffect(() => {
    const player = audio.current;
    if (!player) return;

    // Set little volume for gentle ambience
    player.volume = 0.15;

    const startPlayback = () => {
      if (hasUserPaused.current) return;
      if (player.paused) {
        player.volume = 0.15;
        const playPromise = player.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setPlaying(true);
              setError(false);
            })
            .catch(() => {
              // Browser autoplay policy might block sound until first interaction
              setPlaying(false);
            });
        }
      }
    };

    // 1. Attempt autoplay immediately when website loads at the envelope
    startPlayback();

    // 2. Fallback: Start immediately upon first user interaction (touch, click, scroll, keypress)
    const interactionEvents = ["pointerdown", "click", "touchstart", "scroll", "keydown"] as const;
    const handleFirstInteraction = () => {
      startPlayback();
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, handleFirstInteraction)
      );
    };

    interactionEvents.forEach((evt) =>
      window.addEventListener(evt, handleFirstInteraction, { passive: true, once: false })
    );

    // 3. Listen for envelope trigger or custom event
    const handleCustomPlay = () => startPlayback();
    window.addEventListener("wedding:play-music", handleCustomPlay);

    return () => {
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, handleFirstInteraction)
      );
      window.removeEventListener("wedding:play-music", handleCustomPlay);
    };
  }, []);

  const toggle = async () => {
    const player = audio.current;
    if (!player) return;
    if (!player.paused) {
      hasUserPaused.current = true;
      player.pause();
      return;
    }
    hasUserPaused.current = false;
    try {
      player.volume = 0.15; // Low, gentle background volume for pleasant ambience
      await player.play();
      setError(false);
    } catch {
      setError(true);
    }
  };

  return (
    <div className="music-dock">
      <audio
        ref={audio}
        src={songUrl}
        preload="auto"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${songTitle}` : `Play ${songTitle}`}
        title={songTitle}
        className="music-control"
      >
        {playing ? <Pause size={14} /> : <Music2 size={14} />}
        <span>{playing ? songTitle : "Play music"}</span>
        <span className={`music-bars ${playing ? "is-playing" : ""}`} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
      {error && <span className="music-error" role="status">Tap to try again</span>}
    </div>
  );
}
