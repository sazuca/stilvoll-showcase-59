import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, X } from "lucide-react";
import unitMitteFacade from "@/assets/unit-mitte-facade.jpg";
import unitCharlottenburgFacade from "@/assets/unit-charlottenburg-facade.jpg";
import unitFriedrichshainFacade from "@/assets/unit-friedrichshain-facade.jpg";

const units = [
  { name: "Stilvoll Mitte", address: "Unter den Linden, 42", tag: "Principal", lat: 52.5163, lng: 13.3777, image: unitMitteFacade },
  { name: "Stilvoll Charlottenburg", address: "Kurfürstendamm, 188", tag: "", lat: 52.5046, lng: 13.3291, image: unitCharlottenburgFacade },
  { name: "Stilvoll Friedrichshain", address: "Karl-Marx-Allee, 76", tag: "", lat: 52.5159, lng: 13.4319, image: unitFriedrichshainFacade },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const [popup, setPopup] = useState<number | null>(null);
  const unit = units[active];

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5000!2d${unit.lng}!3d${unit.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sde!4v1`;

  const pinPositions = [
    { left: "52%", top: "42%" },
    { left: "28%", top: "52%" },
    { left: "72%", top: "46%" },
  ];

  return (
    <section id="contato" className="py-32 px-6 bg-elevated">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">Encontre-nos</p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] text-foreground">Nossas Unidades em Berlim</h2>
        </motion.div>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {units.map((u, i) => (
            <button key={u.name} onClick={() => { setActive(i); setPopup(null); }}
              className={`flex items-center gap-2 px-5 py-3 text-xs tracking-[0.1em] uppercase border transition-all duration-300 ${active === i ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/30 text-foreground"}`}>
              <MapPin className="w-3 h-3" />
              {u.name}
              {u.tag && <span className="text-[9px] ml-1 opacity-60">({u.tag})</span>}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Address info with animation */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }}>
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Unidade</p>
                  <p className="text-lg font-light tracking-wide text-foreground">{unit.name}</p>
                  {unit.tag && <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{unit.tag}</span>}
                </div>
                <div className="mt-6">
                  <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Endereço</p>
                  <p className="text-sm font-light text-foreground">{unit.address}</p>
                  <p className="text-sm font-light text-foreground">Berlim, Alemanha</p>
                </div>
              </motion.div>
            </AnimatePresence>
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

          {/* Map with dynamic center */}
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-lg shadow-lg relative">
            <AnimatePresence mode="wait">
              <motion.iframe
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                title={`Localização ${unit.name}`}
                src={mapSrc}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </AnimatePresence>
            {/* Custom pins overlay */}
            {units.map((u, i) => (
              <div key={u.name} className="absolute" style={{ left: pinPositions[i].left, top: pinPositions[i].top, transform: "translate(-50%, -100%)" }}>
                <button
                  onClick={() => { setActive(i); setPopup(popup === i ? null : i); }}
                  className="group flex flex-col items-center"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${active === i ? "bg-foreground scale-110" : "bg-foreground/80 hover:bg-foreground hover:scale-105"}`}>
                    <MapPin className="w-4 h-4 text-background" />
                  </div>
                  <div className={`w-2 h-2 rotate-45 -mt-1.5 transition-colors ${active === i ? "bg-foreground" : "bg-foreground/80"}`} />
                </button>

                <AnimatePresence>
                  {popup === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-background border border-border rounded-lg shadow-xl p-2 min-w-[180px] z-10"
                    >
                      <button onClick={() => setPopup(null)} className="absolute top-1 right-1 p-0.5 hover:bg-muted rounded-full">
                        <X className="w-3 h-3 text-muted-foreground" />
                      </button>
                      <img src={u.image} alt={u.name} className="w-full h-20 object-cover rounded mb-2" />
                      <p className="text-xs font-medium text-foreground">{u.name}</p>
                      <p className="text-[10px] text-muted-foreground">{u.address}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
