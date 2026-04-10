import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Star, X, ChevronDown } from "lucide-react";

import dishSauerbraten from "@/assets/dish-sauerbraten.jpg";
import dishSchnitzel from "@/assets/dish-schnitzel.jpg";
import dishBlackforest from "@/assets/dish-blackforest.jpg";
import dishRouladen from "@/assets/dish-rouladen.jpg";
import dishPretzel from "@/assets/dish-pretzel.jpg";
import dishSpargel from "@/assets/dish-spargel.jpg";

const featuredDishes = [
  { name: "Sauerbraten Noir", price: "€48", rating: 4.9, image: dishSauerbraten, description: "Marinado por 7 dias em vinagre balsâmico e especiarias da Floresta Negra, servido sobre purê de repolho roxo e jus concentrado.", chef: "Klaus Volk" },
  { name: "Schnitzel Contemporain", price: "€42", rating: 4.8, image: dishSchnitzel, description: "Vitela premium empanada à mão, espuma de limão siciliano, microgreens orgânicos e azeite de trufa branca.", chef: "Klaus Volk" },
  { name: "Spargel Royale", price: "€38", rating: 4.9, image: dishSpargel, description: "Aspargos brancos da temporada com hollandaise espumante, flores comestíveis e ervilhas frescas do jardim.", chef: "Elara Fischer" },
  { name: "Rouladen Klassik", price: "€45", rating: 4.7, image: dishRouladen, description: "Roulade de carne bovina recheada com mostarda, pickle e bacon, acompanhada de Kartoffelknödel e molho demi-glace.", chef: "Klaus Volk" },
  { name: "Brezel Trüffel", price: "€22", rating: 4.8, image: dishPretzel, description: "Pretzel artesanal com manteiga de trufa negra do Périgord e cristais de flor de sal da Bretanha.", chef: "Elara Fischer" },
  { name: "Schwarzwald Deconstructed", price: "€28", rating: 5.0, image: dishBlackforest, description: "Floresta Negra reimaginada: bolo de chocolate 70%, gel de cereja griotte, shards de chocolate e quenelle de creme fresco.", chef: "Elara Fischer" },
];

const accordionDishes = [
  { name: "Kartoffelsuppe Imperial", price: "€26", rating: 4.7, image: dishSauerbraten, description: "Sopa aveludada de batata com trufa branca, creme fraîche e cebolinha caramelizada. Uma tradição reinventada.", chef: "Hans Müller" },
  { name: "Käsespätzle Deluxe", price: "€34", rating: 4.8, image: dishSchnitzel, description: "Spätzle artesanal com trio de queijos alpinos, cebola roxa crocante e redução de cerveja escura.", chef: "Sofia Wagner" },
  { name: "Forelle Blau Moderniste", price: "€52", rating: 4.9, image: dishSpargel, description: "Truta do rio preparada na técnica clássica blau, com legumes baby, molho de manteiga marrom e amêndoas torradas.", chef: "Hans Müller" },
  { name: "Zwiebelkuchen Noir", price: "€18", rating: 4.6, image: dishPretzel, description: "Torta rústica de cebola caramelizada com bacon defumado, noz-moscada e massa folhada artesanal.", chef: "Sofia Wagner" },
  { name: "Eisbein Confit", price: "€56", rating: 4.9, image: dishRouladen, description: "Joelho de porco confitado por 12 horas, purê de ervilha, chucrute refinado e mostarda de grãos inteiros.", chef: "Klaus Volk" },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star key={star} className={`w-3 h-3 ${star <= Math.round(rating) ? "fill-foreground text-foreground" : "text-border"}`} />
    ))}
    <span className="text-xs text-muted-foreground ml-1">{rating}</span>
  </div>
);

interface DishType { name: string; price: string; rating: number; image: string; description: string; chef: string; }

const DishCard = ({ dish, index, onClick }: { dish: DishType; index: number; onClick: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: index * 0.1 }} onClick={onClick} className="cursor-pointer group">
      <div className="overflow-hidden mb-4 aspect-square">
        <img src={dish.image} alt={dish.name} loading="lazy" width={800} height={800} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium tracking-[0.1em] text-foreground">{dish.name}</h3>
          <span className="text-sm font-light text-muted-foreground">{dish.price}</span>
        </div>
        <StarRating rating={dish.rating} />
      </div>
    </motion.div>
  );
};

const DishDetail = ({ dish, onClose }: { dish: DishType; onClose: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-6" onClick={onClose}>
    <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.97 }}
      transition={{ duration: 0.4 }} className="bg-background max-w-2xl w-full overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 hover:bg-muted rounded-full transition-colors">
        <X className="w-5 h-5 text-foreground" />
      </button>
      <div className="aspect-video overflow-hidden"><img src={dish.image} alt={dish.name} className="w-full h-full object-cover" /></div>
      <div className="p-8 md:p-12">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">por {dish.chef}</p>
        <h3 className="text-2xl md:text-3xl font-extralight tracking-[0.1em] text-foreground mb-2">{dish.name}</h3>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-lg font-light text-foreground">{dish.price}</span>
          <StarRating rating={dish.rating} />
        </div>
        <p className="text-sm font-light leading-relaxed text-muted-foreground">{dish.description}</p>
      </div>
    </motion.div>
  </motion.div>
);

const AccordionDish = ({ dish }: { dish: DishType }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <div className="flex items-center gap-4">
          <h4 className="text-sm font-medium tracking-[0.1em] text-foreground group-hover:text-muted-foreground transition-colors">{dish.name}</h4>
          <StarRating rating={dish.rating} />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-light text-muted-foreground">{dish.price}</span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden">
            <div className="pb-6 flex gap-6">
              <img src={dish.image} alt={dish.name} className="w-32 h-32 object-cover flex-shrink-0" loading="lazy" width={128} height={128} />
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">por {dish.chef}</p>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">{dish.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MenuGrid = () => {
  const [selectedDish, setSelectedDish] = useState<DishType | null>(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <>
      <section id="cardapio" className="py-32 px-6 bg-elevated">
        <div className="max-w-6xl mx-auto">
          <motion.div ref={titleRef} initial={{ opacity: 0, y: 40 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
            <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">Clássicos Elevados</p>
            <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] text-foreground">Nosso Cardápio</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {featuredDishes.map((dish, i) => (
              <DishCard key={dish.name} dish={dish} index={i} onClick={() => setSelectedDish(dish)} />
            ))}
          </div>

          <div className="mt-20">
            <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-8 text-center">Mais Criações</p>
            <div className="max-w-3xl mx-auto">
              {accordionDishes.map((dish) => (
                <AccordionDish key={dish.name} dish={dish} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedDish && <DishDetail dish={selectedDish} onClose={() => setSelectedDish(null)} />}
      </AnimatePresence>
    </>
  );
};

export default MenuGrid;
