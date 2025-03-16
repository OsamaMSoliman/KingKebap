import { create } from "zustand";

export interface ICartItem {
  cartId: number;
  id: string;
  name: string;
  price: string;
  quantity: number;
  options?: Array<string>;
  note?: string;
}

interface CartStore {
  items: ICartItem[];
  addItem: (item: Omit<ICartItem, "cartId">) => void;
  removeItem: (item: ICartItem) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, { ...item, cartId: state.items.length }],
    })),
  removeItem: (item) =>
    set((state) => ({
      items: state.items.filter((i) => i.cartId !== item.cartId),
    })),
}));
