"use client";

import AppWrapper from "@/components/app-wrapper";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "lucide-react";

const transition = (delay?: number) => ({
  duration: 0.4,
  ease: [0, 0.71, 0.2, 1.01],
  scale: {
    type: "spring",
    damping: 5,
    stiffness: 100,
    restDelta: 0.001,
  },
  delay,
});

export default function Home() {
  return (
    <section className="flex justify-center items-center h-full">
      <AppWrapper>
        <div className="font-bold flex flex-col gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: 1,
                y: [10, -3, 0],
              }}
              transition={transition()}
              className="text-[2rem] md:text-[2.5rem]"
            >
              Hi there{" "}
              <motion.span
                className="inline-block"
                animate={{
                  rotate: [0, 25, 15, 25, 0],
                  transition: { repeat: Infinity, repeatDelay: 1.3, delay: 1.8 },
                }}
              >
                &#128075;&#127996;
              </motion.span>
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: 1,
                y: [10, -3, 0],
              }}
              transition={transition(0.5)}
              className="text-[2rem] md:text-[2.5rem]"
            >
              I&apos;m{" "}
              <span className="relative before:right-0 before:bottom-1 before:content-[''] before:block before:absolute before:w-[50%] before:h-3 before:bg-primary-blue-300 dark:before:bg-primary-blue-500">
                <motion.span className="relative text-primary">Mujiburrohman</motion.span>
              </span>
            </motion.h1>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: [10, -3, 0],
            }}
            transition={transition(1)}
            className="font-normal text-sm md:text-lg"
          >
            A self-taught Frontend Developer who is currently focusing and diving into the world of React.js, Next.js, and other related technologies.
          </motion.h1>
        </div>
        <div className="absolute flex bottom-0 py-4 justify-center md:justify-between">
          <p className="text-sm">&copy; Mujiburrohman {new Date().getFullYear()}</p>
        </div>
      </AppWrapper>
    </section>
  );
}
