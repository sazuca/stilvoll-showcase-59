import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Send } from "lucide-react";
import { toast } from "sonner";

import review1 from "@/assets/review-1.jpg";
import review2 from "@/assets/review-2.jpg";
import review3 from "@/assets/review-3.jpg";

const testimonials = [
  { name: "Marlene Hoffmann", photo: review1, rating: 5, text: "Experiência gastronômica impecável. Cada prato é uma obra de arte que honra a tradição alemã com uma visão contemporânea. O atendimento é digno de estrela Michelin." },
  { name: "Thomas Richter", photo: review2, rating: 5, text: "O melhor Wiener Schnitzel de Berlim, sem dúvida. A atenção aos detalhes é extraordinária — desde a apresentação até o último garfo. Voltarei todas as semanas." },
  { name: "Anna Bergmann", photo: review3, rating: 5, text: "O Balcão do Chef foi uma revelação. Ver o Klaus Volk trabalhar de perto é como assistir a uma performance artística. Cada sabor conta uma história." },
];

const StarInput = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <div className="flex gap-1">
    {[1,2,3,4,5].map(s => (
      <button key={s} type="button" onClick={() => onChange(s)} className="p-0.5">
        <Star className={`w-5 h-5 transition-colors ${s <= value ? "fill-foreground text-foreground" : "text-border hover:text-muted-foreground"}`} />
      </button>
    ))}
  </div>
);

const ReviewsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment) { toast.error("Selecione uma nota e escreva seu comentário."); return; }
    toast.success("Obrigado por sua avaliação!");
    setRating(0); setComment(""); setUserName("");
  };

  return (
    <section id="avaliacoes" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">O Que Dizem Nossos Clientes</p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] text-foreground">Avaliações</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 border border-border hover:border-foreground/20 transition-colors">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= t.rating ? "fill-foreground text-foreground" : "text-border"}`} />)}
              </div>
              <p className="text-sm font-light leading-relaxed text-foreground mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" width={40} height={40} />
                <p className="text-xs tracking-[0.1em] text-muted-foreground">{t.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-lg mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 text-center">Deixe Sua Avaliação</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center"><StarInput value={rating} onChange={setRating} /></div>
            <input type="text" placeholder="Seu nome (opcional)" value={userName} onChange={e => setUserName(e.target.value)}
              className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
            <textarea placeholder="Conte sobre sua experiência..." value={comment} onChange={e => setComment(e.target.value)} rows={3}
              className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none" />
            <button type="submit" className="w-full py-4 bg-foreground text-background text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Send className="w-3 h-3" /> Enviar Avaliação
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
