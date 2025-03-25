import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  vorname: '',
  nachname: '',
  telefon: '',
  email: '',
  adresse: '',
  bemerkungen: '',
};

export const useContactStore = create<typeof initialState>()(
  persist(() => initialState, { name: 'contact-info' })
);

// actions
// export const selectContactInfo = (): typeof initialState => useContactStore.getState();
export const setContactInfo = (
  key: keyof typeof initialState,
  value: string
): void => useContactStore.setState((state) => ({ ...state, [key]: value }));
export const setCompleteReset = (): void => {
  useContactStore.persist.clearStorage();
  useContactStore.setState(initialState);
};
