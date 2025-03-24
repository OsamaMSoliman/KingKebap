import { selectAllIds } from "~/stores/CartStore";
import CartItem from "../cart-item/CartItem";

interface IProps {}

export default function Cart({}: IProps) {
  const allItemIds = selectAllIds();

  return (
    <div className="flex flex-col space-y-2">
      {allItemIds.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        allItemIds.map((id, index) => (
          <CartItem
            key={`${id}-${index}`}
            cartId={id}
            // item={{
            //   cartId: index + 1,
            //   id: `${index + 1}`,
            //   name: `Item ${index + 1}`,
            //   price: `${(index + 1) * 10}`,
            //   quantity: 1,
            // }}
          />
        ))
      )}
    </div>
  );
}
