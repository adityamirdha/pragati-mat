import React, { useState, useEffect } from "react";
import { cyberAudio } from "../utils/cinematicAudio";

export default function ScrambleText({ text, delay = 0, onComplete }) {
  const [displayText, setDisplayText] = useState("");
  const chars = "01XZ#%&*<>[]/=";

  useEffect(() => {
    let timeoutId;
    let intervalId;
    let iteration = 0;

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        const scrambled = text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        setDisplayText(scrambled);

        // Play chirp sound on iteration steps
        if (Math.random() > 0.4) {
          cyberAudio.playTypeChirp();
        }

        if (iteration >= text.length) {
          clearInterval(intervalId);
          if (onComplete) onComplete();
        }

        iteration += 0.5;
      }, 40);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, onComplete]);

  return <span>{displayText}</span>;
}