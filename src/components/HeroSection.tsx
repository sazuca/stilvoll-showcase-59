import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero.jpg";

const GermanyFlag = () => (
  <span className="inline-flex items-center align-middle mx-2" style={{ height: "1em", width: "1.4em" }}>
    <svg viewBox="0 0 5 3" className="w-full h-full rounded-sm shadow-sm">
      <rect width="5" height="1" y="0" fill="#000" />
      <rect width="5" height="1" y="1" fill="#D00" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  </span>
);

const HeroSection = () => {
  const { scrollY } = useScroll();

  const titleScale = useTransform(scrollY, [0, 300], [1, 0.28]);
  const titleY = useTransform(scrollY, [0, 300], [0, -window.innerHeight * 0.42 + 32]);
  const titleX = useTransform(scrollY, [0, 300], [0, -window.innerWidth * 0.35]);
  const titleOpacity = useTransform(scrollY, [250, 300], [1, 0]);

  return (
    <section className="relative h-screen overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img src={heroImage} alt="Interior do restaurante Stilvoll" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-foreground/50" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="text-background/60 text-xs tracking-[0.5em] uppercase mb-6 flex items-center justify-center">
          Berlim <GermanyFlag /> Desde 1987
        </motion.p>

        <motion.h1
          style={{ scale: titleScale, y: titleY, x: titleX, opacity: titleOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-8xl font-extralight tracking-[0.2em] text-background mb-6 will-change-transform"
        >
          STILVOLL
        </motion.h1>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}
          className="h-px bg-background/30 w-24 mb-6" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }}
          className="text-background/70 text-sm md:text-base font-light tracking-widest max-w-md">
          Onde a tradição alemã encontra a elegância contemporânea
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.4 }}
          onClick={() => document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-12 px-8 py-3 border border-background/30 text-background text-xs tracking-[0.3em] uppercase hover:bg-background/10 transition-colors duration-500"
        >
          Descobrir
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
