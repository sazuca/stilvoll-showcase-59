import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setLoggedIn(true);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setLoggedIn(false);
      setEmail("");
      setPassword("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80 backdrop-blur-sm p-6"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-background max-w-md w-full p-10 md:p-14 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-overlay rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>

            {loggedIn ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">
                  Stilvoll Privé
                </p>
                <h3 className="text-2xl font-extralight tracking-[0.1em] text-foreground mb-4">
                  Willkommen, Mitglied
                </h3>
                <p className="text-sm text-muted-foreground font-light">
                  Ihr exklusiver Zugang wurde bestätigt.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-3">
                    Stilvoll
                  </p>
                  <h3 className="text-2xl font-extralight tracking-[0.1em] text-foreground">
                    Privé
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="E-Mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Passwort"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase hover:opacity-90 transition-opacity"
                  >
                    Eintreten
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
