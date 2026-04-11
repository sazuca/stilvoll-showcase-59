import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin } from "lucide-react";

const units = [
  { name: "Stilvoll Mitte", address: "Unter den Linden, 42", tag: "Principal", lat: 52.5163, lng: 13.3777 },
  { name: "Stilvoll Charlottenburg", address: "Kurfürstendamm, 188", tag: "", lat: 52.5046, lng: 13.3291 },
  { name: "Stilvoll Friedrichshain", address: "Karl-Marx-Allee, 76", tag: "", lat: 52.5159, lng: 13.4319 },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const unit = units[active];

  return (
    <section id="contato" className="py-32 px-6 bg-elevated">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">Encontre-nos</p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] text-foreground">Nossas Unidades em Berlim</h2>
        </motion.div>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {units.map((u, i) => (
            <button key={u.name} onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-3 text-xs tracking-[0.1em] uppercase border transition-all duration-300 ${active === i ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/30 text-foreground"}`}>
              <MapPin className="w-3 h-3" />
              {u.name}
              {u.tag && <span className="text-[9px] ml-1 opacity-60">({u.tag})</span>}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Endereço</p>
              <p className="text-sm font-light text-foreground">{unit.address}</p>
              <p className="text-sm font-light text-foreground">Berlim, Alemanha</p>
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
              <p className="text-sm font-light text-foreground">Segunda a Sexta: 18h às 00h</p>
              <p className="text-sm font-light text-foreground">Sábados e Domingos: 19h às 23h</p>
            </div>
          </div>

          <div className="w-full h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
            <iframe
              key={active}
              title={`Localização ${unit.name}`}
              src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4000!2d${unit.lng}!3d${unit.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sde!4v1`}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
