import { create } from "zustand";

interface SidePanelStore {
  show: boolean;
  toggle: () => void;
}

export const useSidePanelStore = create<SidePanelStore>((set) => ({
  show: false,
  toggle: () => set((state) => ({ show: !state.show })),
}));
