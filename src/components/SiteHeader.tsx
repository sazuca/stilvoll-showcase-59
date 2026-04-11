import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface SiteHeaderProps {
  onDelivery: () => void;
}

const SiteHeader = ({ onDelivery }: SiteHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Cardápio", id: "cardapio" },
    { label: "Bebidas", id: "bebidas" },
    { label: "Chefs", id: "chefs" },
    { label: "Reserva", id: "reserva" },
    { label: "Avaliações", id: "avaliacoes" },
    { label: "Contato", id: "contato" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-lg font-light tracking-[0.25em] text-foreground">
          STILVOLL
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={onDelivery}
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Pedir em Casa
          </button>
        </nav>

        <div className="flex md:hidden items-center gap-2">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background border-b border-border"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { onDelivery(); setMenuOpen(false); }}
              className="text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              Pedir em Casa
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default SiteHeader;
