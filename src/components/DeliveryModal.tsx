import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Check } from "lucide-react";
import { toast } from "sonner";

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeliveryModal = ({ isOpen, onClose }: DeliveryModalProps) => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ rua: "", numero: "", bairro: "", cidade: "", cep: "" });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!name || !phone) { toast.error("Preencha nome e telefone."); return; }
      setStep(2);
    } else {
      if (!address.rua || !address.numero || !address.cidade) { toast.error("Preencha o endereço completo."); return; }
      setStep(3);
      setTimeout(() => {
        toast.success("Pedido realizado com sucesso!");
      }, 500);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep(1); setAddress({ rua: "", numero: "", bairro: "", cidade: "", cep: "" }); setName(""); setPhone(""); }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-6" onClick={handleClose}>
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.97 }}
            className="bg-background max-w-md w-full p-10 md:p-14 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={handleClose} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors">
              <X className="w-4 h-4 text-foreground" />
            </button>

            <div className="text-center mb-8">
              <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-2">Stilvoll</p>
              <h3 className="text-2xl font-extralight tracking-[0.1em] text-foreground">Pedir em Casa</h3>
              <div className="flex justify-center gap-2 mt-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`w-8 h-0.5 transition-colors ${step >= s ? "bg-foreground" : "bg-border"}`} />
                ))}
              </div>
            </div>

            {step === 3 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-light text-foreground mb-2">Pedido Confirmado!</h4>
                <p className="text-sm text-muted-foreground">Entrega estimada em 45-60 minutos.</p>
                <button onClick={handleClose} className="mt-6 px-6 py-3 bg-foreground text-background text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity">
                  Fechar
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {step === 1 ? (
                  <>
                    <input type="text" placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
                    <input type="tel" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
                  </>
                ) : (
                  <>
                    <input type="text" placeholder="Rua" value={address.rua} onChange={(e) => setAddress({ ...address, rua: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Número" value={address.numero} onChange={(e) => setAddress({ ...address, numero: e.target.value })}
                        className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
                      <input type="text" placeholder="Bairro" value={address.bairro} onChange={(e) => setAddress({ ...address, bairro: e.target.value })}
                        className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Cidade" value={address.cidade} onChange={(e) => setAddress({ ...address, cidade: e.target.value })}
                        className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
                      <input type="text" placeholder="CEP" value={address.cep} onChange={(e) => setAddress({ ...address, cep: e.target.value })}
                        className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
                    </div>
                  </>
                )}
                <button type="submit" className="w-full py-3 bg-foreground text-background text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity">
                  {step === 1 ? "Próximo" : "Confirmar Pedido"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeliveryModal;
