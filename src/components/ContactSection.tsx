import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contato" className="py-32 px-6 bg-elevated">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">Encontre-nos</p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] text-foreground">Localização</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Endereço</p>
              <p className="text-sm font-light text-foreground">Allee der Sterne, nº 1010</p>
              <p className="text-sm font-light text-foreground">Vila Germânica</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Telefone</p>
              <a href="tel:+493012345678" className="text-sm font-light text-foreground hover:text-muted-foreground transition-colors">+49 30 1234 5678</a>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">E-mail</p>
              <a href="mailto:reservas@stilvoll.de" className="text-sm font-light text-foreground hover:text-muted-foreground transition-colors">reservas@stilvoll.de</a>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Horário</p>
              <p className="text-sm font-light text-foreground">Ter – Dom: 18h00 – 23h00</p>
              <p className="text-sm font-light text-muted-foreground">Segunda: Fechado</p>
            </div>
          </div>

          <div className="w-full h-80 md:h-96 overflow-hidden border border-border">
            <iframe
              title="Localização Stilvoll"
              src="https://www.openstreetmap.org/export/embed.html?bbox=13.35%2C52.50%2C13.42%2C52.53&layer=mapnik&marker=52.515%2C13.385"
              className="w-full h-full border-0 grayscale contrast-125"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
