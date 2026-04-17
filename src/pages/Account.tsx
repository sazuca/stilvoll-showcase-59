import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { CalendarCheck2, Package, ArrowLeft, Clock, MapPin, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useOrders, useReservations } from "@/hooks/useStilvollStore";
import type { OrderStatus } from "@/lib/userStore";

const statusLabel = (status: OrderStatus, t: (k: string) => string) => {
  switch (status) {
    case "pending": return t("account.status.pending");
    case "preparing": return t("account.status.preparing");
    case "out_for_delivery": return t("account.status.outForDelivery");
    case "delivered": return t("account.status.delivered");
    case "cancelled": return t("account.status.cancelled");
  }
};

const statusDot = (status: OrderStatus) => {
  if (status === "cancelled") return "bg-destructive";
  if (status === "delivered") return "bg-foreground/30";
  return "bg-foreground";
};

const fmtDate = (ts: number) =>
  new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(ts);

const fmtDateTime = (ts: number) =>
  new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(ts);

const AccountPage = () => {
  const { t } = useLanguage();
  const orders = useOrders();
  const reservations = useReservations();

  const totals = useMemo(() => ({
    spent: orders.reduce((s, o) => s + (o.status === "cancelled" ? 0 : o.total), 0),
    activeRes: reservations.filter(r => r.status === "active").length,
  }), [orders, reservations]);

  return (
    <main className="min-h-screen bg-background pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t("account.back")}
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 mb-16 text-center"
        >
          <p className="text-xs tracking-[0.5em] uppercase text-muted-foreground mb-4">{t("account.subtitle")}</p>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.1em] text-foreground">{t("account.title")}</h1>
          <div className="h-px bg-border w-16 mx-auto mt-6" />
        </motion.header>

        {/* Quick stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-20 border border-border">
          {[
            { label: t("account.stat.orders"), value: orders.length.toString() },
            { label: t("account.stat.reservations"), value: totals.activeRes.toString() },
            { label: t("account.stat.spent"), value: `€${totals.spent.toFixed(0)}` },
          ].map((s) => (
            <div key={s.label} className="bg-background p-8 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">{s.label}</p>
              <p className="text-3xl font-extralight tracking-[0.05em] text-foreground">{s.value}</p>
            </div>
          ))}
        </section>

        {/* Orders */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-2">{t("account.section.ordersKicker")}</p>
              <h2 className="text-2xl font-extralight tracking-[0.1em] text-foreground">{t("account.section.orders")}</h2>
            </div>
            <Package className="w-5 h-5 text-muted-foreground" strokeWidth={1.2} />
          </div>

          {orders.length === 0 ? (
            <EmptyState label={t("account.empty.orders")} />
          ) : (
            <div className="grid gap-5">
              {orders.map((o, i) => (
                <motion.article
                  key={o.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="border border-border bg-background p-6 md:p-8 hover:border-foreground/40 transition-colors"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">#{o.id.slice(-6).toUpperCase()}</p>
                      <p className="text-sm text-foreground font-light mt-1">{fmtDateTime(o.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDot(o.status)}`} />
                      <span className="text-xs tracking-[0.2em] uppercase text-foreground">{statusLabel(o.status, t)}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    {o.items.map((item) => (
                      <div key={item.name} className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-sm flex-shrink-0" loading="lazy" width={40} height={40} />
                        <span className="text-sm font-light text-foreground flex-1 truncate">{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.qty}×</span>
                        <span className="text-sm text-foreground tabular-nums">€{(item.price * item.qty).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground font-light flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {o.address || "—"}
                    </p>
                    <p className="text-base font-light text-foreground tabular-nums">€{o.total.toFixed(0)}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        {/* Reservations */}
        <section>
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-2">{t("account.section.reservationsKicker")}</p>
              <h2 className="text-2xl font-extralight tracking-[0.1em] text-foreground">{t("account.section.reservations")}</h2>
            </div>
            <CalendarCheck2 className="w-5 h-5 text-muted-foreground" strokeWidth={1.2} />
          </div>

          {reservations.length === 0 ? (
            <EmptyState label={t("account.empty.reservations")} />
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {reservations.map((r, i) => (
                <motion.article
                  key={r.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="border border-border bg-background p-6 md:p-8 hover:border-foreground/40 transition-colors"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-2">{r.unitLabel}</p>
                      <h3 className="text-lg font-extralight tracking-[0.05em] text-foreground">{r.name}</h3>
                    </div>
                    <span className={`text-[10px] tracking-[0.25em] uppercase px-2 py-1 border ${r.status === "active" ? "border-foreground text-foreground" : "border-destructive/30 text-destructive"}`}>
                      {r.status === "active" ? t("account.status.active") : t("account.status.cancelled")}
                    </span>
                  </div>

                  <dl className="space-y-3 text-sm font-light text-foreground">
                    <div className="flex items-center gap-3">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <dd>
                        {fmtDate(new Date(r.date).getTime())} · {r.time}
                      </dd>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      <dd>{r.guests} {r.guests === 1 ? t("res.person") : t("res.people")}</dd>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      <dd>{r.tableLabel}</dd>
                    </div>
                  </dl>
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

const EmptyState = ({ label }: { label: string }) => (
  <div className="border border-dashed border-border py-16 text-center">
    <p className="text-sm font-light text-muted-foreground">{label}</p>
  </div>
);

export default AccountPage;
