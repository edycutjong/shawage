"use client";

import { useState, useEffect } from "react";

interface ScrambleTextProps {
  text: string;
  trigger: boolean;
  duration?: number;
  className?: string;
  onComplete?: () => void;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?-=[]\\;',./";

export function ScrambleText({
  text,
  trigger,
  duration = 1000,
  className = "",
  onComplete,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(trigger ? "" : text);

  useEffect(() => {
    if (!trigger) {
      const timer = setTimeout(() => setDisplayText(text), 0);
      return () => clearTimeout(timer);
    }

    const start = Date.now();
    let frameId: number;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - start) / duration);
      
      let newText = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          newText += " ";
        } else if (progress > i / text.length) {
          // If past this character's reveal threshold, show the real character
          // Randomize whether to show it early sometimes for a glitchy effect
          if (Math.random() < progress) {
            newText += text[i];
          } else {
             newText += chars[Math.floor(Math.random() * chars.length)];
          }
        } else {
          // Otherwise, show a random character
          newText += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(newText);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        if (onComplete) onComplete();
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [trigger, text, duration, onComplete]);

  return <span className={className}>{displayText}</span>;
}
