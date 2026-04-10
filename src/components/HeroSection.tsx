import { motion } from "framer-motion";
import heroImage from "@/assets/hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, delay: 2.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Stilvoll restaurant interior"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-primary/50" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="text-primary-foreground/60 text-xs tracking-[0.5em] uppercase mb-6"
        >
          Berlin · Seit 1987
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="text-5xl md:text-8xl font-extralight tracking-[0.2em] text-primary-foreground mb-6"
        >
          STILVOLL
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 3.2, ease: "easeInOut" }}
          className="h-px bg-primary-foreground/30 w-24 mb-6"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.4 }}
          className="text-primary-foreground/70 text-sm md:text-base font-light tracking-widest max-w-md"
        >
          Wo deutsche Tradition auf zeitgenössische Eleganz trifft
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.8 }}
          onClick={() => document.getElementById("menü")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-12 px-8 py-3 border border-primary-foreground/30 text-primary-foreground text-xs tracking-[0.3em] uppercase hover:bg-primary-foreground/10 transition-colors duration-500"
        >
          Entdecken
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
