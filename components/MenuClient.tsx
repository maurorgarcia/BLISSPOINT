"use client";

import { useCallback, useEffect, useState } from "react";
import { Hero } from "./sections/Hero";
import { ElPancho } from "./sections/ElPancho";
import { Toppings } from "./sections/Toppings";
import { Barra } from "./sections/Barra";
import { Combos } from "./sections/Combos";
import { Nosotros } from "./sections/Nosotros";
import { Footer } from "./sections/Footer";
import { TabNav } from "./ui/TabNav";
import { Modal } from "./ui/Modal";
import { OrderModal } from "./sections/OrderModal";
import { CartDrawer, CartFloatingButton } from "./sections/CartDrawer";
import { CartProvider } from "./context/CartContext";
import { BarCategory, Combo, SECTION_IDS, Tab, TABS } from "../data/menu";

export function MenuClient() {
  const [activeTab, setActiveTab] = useState<Tab>("El pancho");
  const [cat, setCat] = useState<BarCategory>("Pan");
  const [pedidosYaOpen, setPedidosYaOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState<Combo | undefined>(undefined);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  }, []);

  const goSection = useCallback(
    (tab: Tab) => {
      setActiveTab(tab);
      scrollTo(SECTION_IDS[tab]);
    },
    [scrollTo],
  );

  useEffect(() => {
    const onScroll = () => {
      let current: Tab = activeTab;
      for (const name of TABS) {
        const el = document.getElementById(SECTION_IDS[name]);
        if (el && el.getBoundingClientRect().top <= 140) current = name;
      }
      setActiveTab((prev) => (prev === current ? prev : current));
    };

    const onMove = (e: MouseEvent) => {
      const layers = document.querySelectorAll<HTMLElement>("[data-parallax]");
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      layers.forEach((l) => {
        const d = parseFloat(l.getAttribute("data-parallax") || "1") || 1;
        l.style.setProperty("transform", `translate3d(${-dx * 26 * d}px, ${-dy * 20 * d}px, 0)`);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openPedidosYa = () => setPedidosYaOpen(true);
  const closePedidosYa = () => setPedidosYaOpen(false);
  const goMenu = () => scrollTo("sec-pancho");
  const goToppings = () => scrollTo("sec-toppings");
  const openCart = () => setCartDrawerOpen(true);
  const closeCart = () => setCartDrawerOpen(false);
  const openOrder = (combo?: Combo) => {
    setSelectedCombo(combo);
    setOrderModalOpen(true);
  };
  const closeOrder = () => {
    setOrderModalOpen(false);
    setTimeout(() => setSelectedCombo(undefined), 300);
  };
  const closeOrderAndGoCart = () => {
    setOrderModalOpen(false);
    setTimeout(() => {
      setSelectedCombo(undefined);
      setCartDrawerOpen(true);
    }, 250);
  };

  return (
    <CartProvider>
      <div style={{ background: "var(--color-bg-base)", fontFamily: "var(--font-ui)", overflowX: "clip" }}>
        <Hero onOpenOrder={() => openOrder()} onGoMenu={goMenu} />

        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: "var(--z-nav-sticky)" as unknown as number,
            background: "rgba(31,10,12,0.92)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--color-border-subtle)",
          }}
        >
          <TabNav tabs={[...TABS]} active={activeTab} onChange={(tab) => goSection(tab as Tab)} />
        </div>

        <ElPancho onGoToppings={goToppings} />
        <Toppings />
        <Barra cat={cat} onSelectCat={setCat} />
        <Combos onOpenOrder={openOrder} />
        <Nosotros />
        <Footer onOpenOrder={() => openOrder()} />

        <Modal
          open={pedidosYaOpen}
          onClose={closePedidosYa}
          title="¿Lo querés en tu casa?"
          ctaLabel="Ir a PedidosYa"
          onCta={closePedidosYa}
        >
          Elegí la sucursal más cerca y pedilo por PedidosYa. Link a confirmar con el local.
        </Modal>

        <OrderModal
          open={orderModalOpen}
          onClose={closeOrder}
          initialCombo={selectedCombo}
          onFinalize={closeOrderAndGoCart}
        />

        <CartFloatingButton onClick={openCart} />
        <CartDrawer open={cartDrawerOpen} onClose={closeCart} />
      </div>
    </CartProvider>
  );
}
