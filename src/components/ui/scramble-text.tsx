"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface ScrambleTextProps {
  words: string[];
  className?: string;
  /** how long a resolved word stays before cycling to the next */
  holdMs?: number;
}

/** Decode/scramble text effect: cycles through `words`, scrambling random
 *  characters before each word resolves. Mirrors the original hero animation. */
export function ScrambleText({ words, className = "", holdMs = 2800 }: ScrambleTextProps) {
  const [text, setText] = useState(words[0] ?? "");

  useEffect(() => {
    if (!words.length) return;
    let wordIndex = 0;
    let iteration = 0;
    let scramble: ReturnType<typeof setInterval>;

    const start = (target: string) => {
      iteration = 0;
      clearInterval(scramble);
      scramble = setInterval(() => {
        setText(
          target
            .split("")
            .map((char, i) =>
              i < iteration - 2 ? target[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
            )
            .join("")
        );
        iteration += 1 / 3;
        if (iteration > target.length) {
          clearInterval(scramble);
          setText(target);
        }
      }, 30);
    };

    start(words[0]);
    const cycle = setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      start(words[wordIndex]);
    }, holdMs);

    return () => {
      clearInterval(scramble);
      clearInterval(cycle);
    };
  }, [words, holdMs]);

  return <span className={className}>{text}</span>;
}
