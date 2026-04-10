const SiteFooter = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-sm font-light tracking-[0.25em] text-foreground mb-2">
              STILVOLL
            </p>
            <p className="text-xs text-muted-foreground font-light">
              Unter den Linden 42, 10117 Berlin
            </p>
          </div>
          <div className="flex items-center gap-8">
            <a href="tel:+493012345678" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              +49 30 1234 5678
            </a>
            <a href="mailto:reservierung@stilvoll.de" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              reservierung@stilvoll.de
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            © 2025 Stilvoll. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
