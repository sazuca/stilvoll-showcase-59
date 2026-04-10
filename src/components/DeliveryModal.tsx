import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { featuredDishes, accordionDishes, type DishType } from "./MenuGrid";
import { drinkCategories, type DrinkItem } from "./DrinksSection";

interface CartItem {
  name: string;
  price: number;
  qty: number;
  type: "prato" | "bebida";
}

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const allDishes: DishType[] = [...featuredDishes, ...accordionDishes];
const allDrinks: DrinkItem[] = drinkCategories.flatMap(c => c.items);

const DeliveryModal = ({ isOpen, onClose }: DeliveryModalProps) => {
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [address, setAddress] = useState({ rua: "", numero: "", bairro: "", cidade: "", cep: "" });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const addToCart = (itemName: string, price: number, type: "prato" | "bebida") => {
    setCart(prev => ({
      ...prev,
      [itemName]: { name: itemName, price, qty: (prev[itemName]?.qty || 0) + 1, type }
    }));
  };

  const removeFromCart = (itemName: string) => {
    setCart(prev => {
      const c = { ...prev };
      if (c[itemName] && c[itemName].qty > 1) {
        c[itemName] = { ...c[itemName], qty: c[itemName].qty - 1 };
      } else {
        delete c[itemName];
      }
      return c;
    });
  };

  const cartItems = Object.values(cart);
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const handleNext = () => {
    if (step === 1) {
      if (cartItems.length === 0) { toast.error("Adicione pelo menos um item ao pedido."); return; }
      setStep(2);
    } else if (step === 2) {
      if (!name || !phone) { toast.error("Preencha nome e telefone."); return; }
      setStep(3);
    } else if (step === 3) {
      if (!address.rua || !address.numero || !address.cidade) { toast.error("Preencha o endereço completo."); return; }
      setStep(4);
      setTimeout(() => toast.success("Pedido realizado com sucesso!"), 500);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep(1); setCart({}); setAddress({ rua: "", numero: "", bairro: "", cidade: "", cep: "" }); setName(""); setPhone(""); }, 300);
  };

  const ItemRow = ({ itemName, price, type }: { itemName: string; price: number; type: "prato" | "bebida" }) => {
    const qty = cart[itemName]?.qty || 0;
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-foreground font-light flex-1 truncate mr-3">{itemName}</span>
        <span className="text-xs text-muted-foreground mr-3">€{price}</span>
        <div className="flex items-center gap-2">
          {qty > 0 && (
            <>
              <button onClick={() => removeFromCart(itemName)} className="w-6 h-6 flex items-center justify-center border border-border rounded-full hover:border-foreground transition-colors">
                <Minus className="w-3 h-3" />
              </button>
              <motion.span key={qty} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="text-sm w-4 text-center font-medium">{qty}</motion.span>
            </>
          )}
          <button onClick={() => addToCart(itemName, price, type)} className="w-6 h-6 flex items-center justify-center border border-border rounded-full hover:border-foreground transition-colors">
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4" onClick={handleClose}>
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.97 }}
            className="bg-background max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 md:p-10 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={handleClose} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors">
              <X className="w-4 h-4 text-foreground" />
            </button>

            <div className="text-center mb-6">
              <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-2">Stilvoll</p>
              <h3 className="text-2xl font-extralight tracking-[0.1em] text-foreground">Pedir em Casa</h3>
              <div className="flex justify-center gap-2 mt-4">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={`w-6 h-0.5 transition-colors ${step >= s ? "bg-foreground" : "bg-border"}`} />
                ))}
              </div>
            </div>

            {step === 4 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-light text-foreground mb-2">Pedido Confirmado!</h4>
                <p className="text-sm text-muted-foreground mb-1">Total: €{total.toFixed(0)}</p>
                <p className="text-sm text-muted-foreground">Entrega estimada em 45-60 minutos.</p>
                <button onClick={handleClose} className="mt-6 px-6 py-3 bg-foreground text-background text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity">Fechar</button>
              </motion.div>
            ) : step === 1 ? (
              <div className="space-y-6">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Pratos</p>
                  {allDishes.map(d => <ItemRow key={d.name} itemName={d.name} price={d.priceNum} type="prato" />)}
                </div>
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Bebidas</p>
                  {allDrinks.map(d => <ItemRow key={d.name} itemName={d.name} price={d.priceNum} type="bebida" />)}
                </div>
                {cartItems.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2"><ShoppingBag className="w-3 h-3" /> {cartItems.reduce((s,i)=>s+i.qty,0)} itens</span>
                      <span className="text-sm font-medium text-foreground">Total: €{total.toFixed(0)}</span>
                    </div>
                  </motion.div>
                )}
                <button onClick={handleNext} className="w-full py-3 bg-foreground text-background text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity">
                  Próximo
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-5">
                {step === 2 ? (
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
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-muted-foreground">{cartItems.reduce((s,i)=>s+i.qty,0)} itens</span>
                    <span className="font-medium text-foreground">Total: €{total.toFixed(0)}</span>
                  </div>
                </div>
                <button type="submit" className="w-full py-3 bg-foreground text-background text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity">
                  {step === 2 ? "Próximo" : "Confirmar Pedido"}
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
