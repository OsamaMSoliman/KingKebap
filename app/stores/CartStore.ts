import { create } from "zustand";

interface CartStore {
  show: boolean;
  toggle: () => void;
  itemIDs: string[];
  addItemId: (item: string) => void;
  removeItemId: (item: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  show: false,
  toggle: () => set((state) => ({ show: !state.show })),
  itemIDs: [],
  addItemId: (item) => set((state) => ({ itemIDs: [...state.itemIDs, item] })),
  removeItemId: (item) =>
    set((state) => ({
      itemIDs: state.itemIDs.filter((id) => id !== item),
    })),
}));
