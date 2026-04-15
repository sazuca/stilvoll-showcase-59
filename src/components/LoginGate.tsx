import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface LoginGateProps {
  onLogin: () => void;
}

const LoginGate = ({ onLogin }: LoginGateProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) onLogin();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-sm w-full"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extralight tracking-[0.3em] text-foreground mb-2">STILVOLL</h1>
          <div className="h-px bg-border w-16 mx-auto mb-4" />
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground">Privé</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" placeholder={t("login.email")} value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
          <input type="password" placeholder={t("login.password")} value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
          <button type="submit" className="w-full py-3 bg-foreground text-background text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity">
            {t("login.enter")}
          </button>
        </form>
        <p className="text-center text-[10px] text-muted-foreground mt-10 tracking-widest">{t("login.hint")}</p>
      </motion.div>
    </div>
  );
};

export default LoginGate;
