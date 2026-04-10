import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";

const tables = [
  { id: "janela", label: "Janela", desc: "Vista panorâmica" },
  { id: "jardim", label: "Jardim", desc: "Ao ar livre" },
  { id: "privativo", label: "Privativo", desc: "Sala exclusiva" },
  { id: "balcao", label: "Balcão do Chef", desc: "Experiência imersiva" },
  { id: "salao", label: "Salão Principal", desc: "Ambiente clássico" },
];

const ReservationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedTable, setSelectedTable] = useState("");
  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [payment, setPayment] = useState("local");
  const [name, setName] = useState("");

  const availableHours = useMemo(() => {
    if (!date) return [];
    const d = new Date(date + "T00:00:00");
    const day = d.getDay(); // 0=Sun, 6=Sat
    const isWeekend = day === 0 || day === 6;
    const startHour = isWeekend ? 19 : 18;
    const endHour = isWeekend ? 23 : 24;
    const hours: string[] = [];
    for (let h = startHour; h < endHour; h++) {
      const hh = h.toString().padStart(2, "0");
      hours.push(`${hh}:00`);
      hours.push(`${hh}:30`);
    }
    return hours;
  }, [date]);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable || !date || !time || !name) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    toast.success(`Reserva confirmada para ${name}! Mesa: ${tables.find(t => t.id === selectedTable)?.label}, ${guests} pessoa(s), ${date} às ${time}.`);
  };

  return (
    <section id="reserva" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">Reserve Sua Experiência</p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.1em] text-foreground">Reserva</h2>
          <p className="text-xs text-muted-foreground mt-4 font-light">Seg–Sex: 18h às 00h &nbsp;|&nbsp; Sáb–Dom: 19h às 23h</p>
        </motion.div>

        <form onSubmit={handleReserve} className="max-w-2xl mx-auto space-y-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Posição da Mesa</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {tables.map((table) => (
                <button type="button" key={table.id} onClick={() => setSelectedTable(table.id)}
                  className={`p-4 border text-left transition-all duration-300 ${selectedTable === table.id ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/30"}`}>
                  <p className="text-sm font-medium">{table.label}</p>
                  <p className={`text-xs mt-1 ${selectedTable === table.id ? "text-background/60" : "text-muted-foreground"}`}>{table.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
            <select value={guests} onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground focus:outline-none focus:border-foreground transition-colors">
              {[1,2,3,4,5,6,7,8,10,12].map(n => <option key={n} value={n}>{n} {n === 1 ? "pessoa" : "pessoas"}</option>)}
            </select>
            <input type="date" value={date} onChange={(e) => { setDate(e.target.value); setTime(""); }}
              className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground focus:outline-none focus:border-foreground transition-colors" />
            <select value={time} onChange={(e) => setTime(e.target.value)} disabled={!date}
              className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground focus:outline-none focus:border-foreground transition-colors disabled:opacity-40">
              <option value="">{date ? "Selecione o horário" : "Selecione a data primeiro"}</option>
              {availableHours.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Forma de Pagamento</p>
            <div className="flex gap-4">
              {[{ id: "local", label: "No Local" }, { id: "online", label: "Online" }].map((opt) => (
                <button type="button" key={opt.id} onClick={() => setPayment(opt.id)}
                  className={`flex items-center gap-2 px-6 py-3 border text-xs tracking-[0.15em] uppercase transition-all duration-300 ${payment === opt.id ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/30 text-foreground"}`}>
                  {payment === opt.id && <Check className="w-3 h-3" />}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button type="submit"
            className="w-full py-4 bg-foreground text-background text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity">
            Confirmar Reserva
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReservationSection;
