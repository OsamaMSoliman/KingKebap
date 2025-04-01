import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  vorname: '',
  nachname: '',
  telefon: '',
  email: '',
  adresse: '',
  bemerkungen: '',
  'wo?': 'Lieferung',
};

export type ContactInfo = typeof initialState;

export const useContactStore = create<ContactInfo>()(
  persist(() => initialState, { name: 'contact-info' })
);

const actions = {
  getInfos: (): typeof initialState => useContactStore.getState(),
  setInfos: (info: Partial<typeof initialState>) =>
    useContactStore.setState((state) => ({ ...state, ...info })),
  reset: () => {
    useContactStore.persist.clearStorage();
    useContactStore.setState(initialState);
  },
  setDeliveryMethod: (method: 'Lieferung' | 'Abholung') =>
    useContactStore.setState((state) => ({ ...state, 'wo?': method })),
};

export const { getInfos, setInfos, reset, setDeliveryMethod } = actions;
