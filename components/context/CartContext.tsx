"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import {
  Beverage,
  CartBeverage,
  CartHotDog,
  HotDogVariety,
} from "../../data/menu";

export type CartFries = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type DeliveryType = "takeaway" | "envio";

export type TakeAwayTiming = "asap" | "specific-time";

export type PaymentMethod = "efectivo" | "debito" | "mercado-pago";

export type CheckoutData = {
  clientName: string;
  clientPhone: string;
  deliveryType: DeliveryType | null;
  takeAwayName: string;
  takeAwayTiming: TakeAwayTiming | null;
  takeAwaySpecificTime: string;
  envioCalle: string;
  envioAltura: string;
  envioEntreCalles: string;
  envioReferencia: string;
  envioComentario: string;
  paymentMethod: PaymentMethod | null;
};

const EMPTY_CHECKOUT: CheckoutData = {
  clientName: "",
  clientPhone: "",
  deliveryType: null,
  takeAwayName: "",
  takeAwayTiming: null,
  takeAwaySpecificTime: "",
  envioCalle: "",
  envioAltura: "",
  envioEntreCalles: "",
  envioReferencia: "",
  envioComentario: "",
  paymentMethod: null,
};

type CartContextValue = {
  hotDogs: CartHotDog[];
  beverages: CartBeverage[];
  fries: CartFries[];
  addHotDog: (variety: HotDogVariety, sauces: string[], toppings: string[], quantity: number) => void;
  addBeverage: (beverage: Beverage, quantity: number) => void;
  addFries: (name: string, price: number, image: string, quantity: number) => void;
  updateHotDogQty: (id: string, delta: number) => void;
  updateBeverageQty: (id: string, delta: number) => void;
  updateFriesQty: (id: string, delta: number) => void;
  removeHotDog: (id: string) => void;
  removeBeverage: (id: string) => void;
  removeFries: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  totalPriceLabel: string;
  checkout: CheckoutData;
  setCheckoutField: <K extends keyof CheckoutData>(key: K, value: CheckoutData[K]) => void;
  resetCheckout: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const uid = () => Math.random().toString(36).slice(2, 10);

const formatPrice = (n: number) =>
  "$" +
  n
    .toLocaleString("es-AR")
    .replace(/,/g, ".")
    .replace(/\.00$/, "");

export function CartProvider({ children }: { children: ReactNode }) {
  const [hotDogs, setHotDogs] = useState<CartHotDog[]>([]);
  const [beverages, setBeverages] = useState<CartBeverage[]>([]);
  const [fries, setFries] = useState<CartFries[]>([]);
  const [checkout, setCheckout] = useState<CheckoutData>({ ...EMPTY_CHECKOUT });

  const addHotDog = useCallback(
    (variety: HotDogVariety, sauces: string[], toppings: string[], quantity: number) => {
      setHotDogs((prev) => [
        ...prev,
        {
          id: uid(),
          variety,
          sauces,
          toppings,
          quantity: Math.max(1, quantity),
        },
      ]);
    },
    [],
  );

  const addBeverage = useCallback((beverage: Beverage, quantity: number) => {
    setBeverages((prev) => {
      const existing = prev.find((b) => b.beverage.id === beverage.id);
      if (existing) {
        return prev.map((b) =>
          b.id === existing.id ? { ...b, quantity: b.quantity + Math.max(1, quantity) } : b,
        );
      }
      return [
        ...prev,
        { id: uid(), beverage, quantity: Math.max(1, quantity) },
      ];
    });
  }, []);

  const addFries = useCallback((name: string, price: number, image: string, quantity: number) => {
    setFries((prev) => {
      const existing = prev.find((f) => f.name === name);
      if (existing) {
        return prev.map((f) =>
          f.id === existing.id ? { ...f, quantity: f.quantity + Math.max(1, quantity) } : f,
        );
      }
      return [
        ...prev,
        { id: uid(), name, price, image, quantity: Math.max(1, quantity) },
      ];
    });
  }, []);

  const updateHotDogQty = useCallback((id: string, delta: number) => {
    setHotDogs((prev) =>
      prev
        .map((h) => (h.id === id ? { ...h, quantity: Math.max(1, h.quantity + delta) } : h))
    );
  }, []);

  const updateBeverageQty = useCallback((id: string, delta: number) => {
    setBeverages((prev) =>
      prev.map((b) => (b.id === id ? { ...b, quantity: Math.max(1, b.quantity + delta) } : b)),
    );
  }, []);

  const updateFriesQty = useCallback((id: string, delta: number) => {
    setFries((prev) =>
      prev.map((f) => (f.id === id ? { ...f, quantity: Math.max(1, f.quantity + delta) } : f)),
    );
  }, []);

  const removeHotDog = useCallback((id: string) => {
    setHotDogs((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const removeBeverage = useCallback((id: string) => {
    setBeverages((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const removeFries = useCallback((id: string) => {
    setFries((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setHotDogs([]);
    setBeverages([]);
    setFries([]);
    setCheckout({ ...EMPTY_CHECKOUT });
  }, []);

  const setCheckoutField = useCallback(
    <K extends keyof CheckoutData>(key: K, value: CheckoutData[K]) => {
      setCheckout((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetCheckout = useCallback(() => {
    setCheckout({ ...EMPTY_CHECKOUT });
  }, []);

  const { totalCount, totalPrice } = useMemo(() => {
    let count = 0;
    let price = 0;
    for (const h of hotDogs) {
      count += h.quantity;
      price += h.variety.price * h.quantity;
    }
    for (const b of beverages) {
      count += b.quantity;
      price += b.beverage.price * b.quantity;
    }
    for (const f of fries) {
      count += f.quantity;
      price += f.price * f.quantity;
    }
    return { totalCount: count, totalPrice: price };
  }, [hotDogs, beverages, fries]);

  const value: CartContextValue = {
    hotDogs,
    beverages,
    fries,
    addHotDog,
    addBeverage,
    addFries,
    updateHotDogQty,
    updateBeverageQty,
    updateFriesQty,
    removeHotDog,
    removeBeverage,
    removeFries,
    clearCart,
    totalCount,
    totalPrice,
    totalPriceLabel: formatPrice(totalPrice),
    checkout,
    setCheckoutField,
    resetCheckout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
