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
              <p className="text-sm font-light text-foreground">Vila Germânica, Curitiba — PR</p>
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
              title="Localização Stilvoll"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.5!2d-49.2733!3d-25.4284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI1JzQyLjIiUyA0OcKwMTYnMjMuOSJX!5e0!3m2!1spt-BR!2sbr!4v1"
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
