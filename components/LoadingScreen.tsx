"use client";

import { motion } from "framer-motion";

export default function LoadingScreen({ progress }: { progress: number }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      <div className="relative w-64 h-[2px] bg-white/10 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-xs font-medium tracking-[0.2em] text-white/40 uppercase"
      >
        Loading Experience {Math.round(progress)}%
      </motion.p>
    </motion.div>
  );
}
