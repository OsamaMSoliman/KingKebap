import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ICartItem {
  cartId: string;
  id: string;
  name: string;
  price: string;
  quantity: number;
  options?: Record<string, string>;
  note?: string;
}

// store
const initialState = {
  _ids: [] as string[],
  _items: {} as Record<string, ICartItem>,
};

const useCartStore = create<typeof initialState>()(
  devtools(() => initialState)
);

// selectors
export const selectAllIds = (): typeof initialState._ids =>
  useCartStore((state) => state._ids);
export const selectItem = (cartId: string): ICartItem | undefined =>
  useCartStore((state) => state._items[cartId]);
export const getAllItems = (): Required<ICartItem>[] =>
  Object.values(useCartStore.getState()._items).map((item) => ({
    ...item,
    options: item.options || {},
    note: item.note || '',
  }));

// actions
export const setReset = (): void => useCartStore.setState(initialState);
export const setIncrementItem = (cartId: string): void =>
  useCartStore.setState((state) => {
    const item = state._items[cartId];
    return {
      ...state,
      _items: {
        ...state._items,
        [cartId]: {
          ...item,
          quantity: item.quantity + 1,
        },
      },
    };
  });
export const setAddItem = (item: Omit<ICartItem, 'cartId'>): void => {
  const { quantity, ...rest } = item;
  const cartId = Object.values(rest).join('-');
  console.log({ quantity, cartId });
  if (useCartStore.getState()._ids.includes(cartId)) {
    return setIncrementItem(cartId);
  }
  useCartStore.setState((state) => ({
    _ids: [...state._ids, cartId],
    _items: { ...state._items, [cartId]: { ...item, cartId: cartId } },
  }));
};
export const setDecrementItem = (cartId: string): void => {
  const item = useCartStore.getState()._items[cartId];
  if (item && item.quantity > 1)
    useCartStore.setState((state) => ({
      ...state,
      _items: {
        ...state._items,
        [cartId]: {
          ...item,
          quantity: item.quantity - 1,
        },
      },
    }));
  else setRemoveItemByCartId(cartId);
};
export const setRemoveItemByCartId = (cartId: string): void =>
  useCartStore.setState((state) => ({
    _ids: state._ids.filter((id) => id !== cartId),
    _items: Object.fromEntries(
      Object.entries(state._items).filter(([key]) => key !== cartId)
    ),
  }));
