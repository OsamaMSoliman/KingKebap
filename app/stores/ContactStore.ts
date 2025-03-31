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
export const setLieferungOderAbholung = (
  value: 'Lieferung' | 'Abholung'
): void =>
  useContactStore.setState((state) => ({
    ...state,
    'wo?': value,
  }));
