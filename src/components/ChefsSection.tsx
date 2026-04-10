import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import chefKlaus from "@/assets/chef-klaus.jpg";
import chefElara from "@/assets/chef-elara.jpg";

const chefs = [
  {
    name: "Klaus Volk",
    title: "Küchenchef",
    image: chefKlaus,
    description:
      "Formado na Floresta Negra, Klaus une a tradição rigorosa com a precisão contemporânea. Especialista em técnicas de caça e fermentação milenar.",
  },
  {
    name: "Elara Fischer",
    title: "Chef Pâtissière & Innovation",
    image: chefElara,
    description:
      "Inovadora da gastronomia molecular em Berlim, Elara desconstrói os clássicos alemães para recriá-los em texturas surpreendentes.",
  },
];

const ChefCard = ({ chef, index }: { chef: typeof chefs[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-64 h-80 md:w-72 md:h-96 overflow-hidden mb-8 group">
        <img
          src={chef.image}
          alt={chef.name}
          loading="lazy"
          width={800}
          height={1024}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="text-xl font-light tracking-[0.15em] text-foreground mb-1">
        {chef.name}
      </h3>
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
        {chef.title}
      </p>
      <p className="text-sm font-light leading-relaxed text-muted-foreground max-w-xs">
        {chef.description}
      </p>
    </motion.div>
  );
};

const ChefsSection = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="chefs" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">
            Mestres da Cozinha
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] text-foreground">
            Nossos Chefs
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 justify-items-center">
          {chefs.map((chef, i) => (
            <ChefCard key={chef.name} chef={chef} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefsSection;
