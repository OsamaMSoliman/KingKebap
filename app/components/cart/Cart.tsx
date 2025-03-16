import { useCartStore } from "~/stores/CartStore";
import { Button } from "~/components/ui/button";

interface IProps {}

export default function Cart({}: IProps) {
  const { items, removeItem } = useCartStore();
  return (
    <div className="flex flex-col space-y-2">
      {items.map((item) => (
        <div key={item.cartId} className="flex items-center justify-between">
          <span>{item.name}</span>
          <span className="text-sm text-gray-500">
            {item.options?.join(", ")}
          </span>
          <span>{item.quantity}</span>
          <Button onClick={() => removeItem(item)}>Remove</Button>
        </div>
      ))}
    </div>
  );
}
