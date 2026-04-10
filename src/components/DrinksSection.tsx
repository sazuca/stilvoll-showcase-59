import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Wine, Droplets, GlassWater, CupSoda } from "lucide-react";

const categories = [
  {
    name: "Vinhos",
    icon: Wine,
    items: [
      { name: "Château Margaux 2015", desc: "Bordeaux, França — Corpo intenso, taninos sedosos", price: "€320" },
      { name: "Riesling Spätlese Prüm", desc: "Mosel, Alemanha — Doçura equilibrada, acidez mineral", price: "€85" },
      { name: "Barolo Giacomo Conterno", desc: "Piemonte, Itália — Elegância terrosa, notas de rosa", price: "€240" },
      { name: "Dom Pérignon 2012", desc: "Champagne, França — Efervescência precisa, complexidade", price: "€450" },
    ],
  },
  {
    name: "Águas Premium",
    icon: Droplets,
    items: [
      { name: "Acqua Panna", desc: "Toscana — Mineral suave, pura elegância", price: "€12" },
      { name: "San Pellegrino", desc: "Alpes Italianos — Gaseificação natural e fina", price: "€12" },
      { name: "Voss Still", desc: "Noruega — Ultra-pureza artesiana", price: "€14" },
    ],
  },
  {
    name: "Sucos Artesanais",
    icon: GlassWater,
    items: [
      { name: "Maçã Verde & Gengibre", desc: "Prensado a frio, orgânico", price: "€16" },
      { name: "Cenoura & Laranja Sanguínea", desc: "Vitaminas naturais, sem adição de açúcar", price: "€16" },
      { name: "Beterraba & Framboesa", desc: "Antioxidantes, sabor terroso-adocicado", price: "€18" },
    ],
  },
  {
    name: "Refrigerantes",
    icon: CupSoda,
    items: [
      { name: "Fritz-Kola", desc: "Hamburgo — Cola artesanal alemã", price: "€8" },
      { name: "Bionade Erva-cidreira", desc: "Fermentação natural, refrescância orgânica", price: "€8" },
      { name: "Fever-Tree Tônica", desc: "Premium Indian tonic para paladares exigentes", price: "€10" },
    ],
  },
];

const DrinksSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="bebidas" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">Carta de Bebidas</p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] text-foreground">Seleção Exclusiva</h2>
        </motion.div>

        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 border-b-2 ${
                  activeTab === i ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {categories[activeTab].items.map((item) => (
            <div key={item.name} className="flex items-start justify-between py-5 border-b border-border group">
              <div>
                <h4 className="text-sm font-medium tracking-[0.05em] text-foreground group-hover:text-muted-foreground transition-colors">{item.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 font-light">{item.desc}</p>
              </div>
              <span className="text-sm font-light text-foreground ml-6 whitespace-nowrap">{item.price}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DrinksSection;
