import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PiggyLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <Image
        src="/piggy.png"
        alt="Piggy"
        width={60}
        height={60}
        className="rounded-full"
      />
    </motion.div>
  );
}
