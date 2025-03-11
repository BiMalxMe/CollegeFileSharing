"use client";

import { motion } from "framer-motion";

export function AnimatedTitle() {
  const letters = "BiMalxMe".split("");

  return (
    <div className="flex">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut"
          }}
          className="text-xl font-bold"
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
} 