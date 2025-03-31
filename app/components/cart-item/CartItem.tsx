import { Edit, Minus, Plus, Trash2 } from 'lucide-react';
import ConfirmationDialog from '~/components/Menu/ConfirmationDialog';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Dialog, DialogTrigger } from '~/components/ui/dialog';
import {
  selectItem,
  setDecrementItem,
  setIncrementItem,
} from '~/stores/CartStore';

interface IProps {
  cartId: string;
}

export default function CartItem({ cartId }: IProps) {
  const item = selectItem(cartId);
  if (!item) throw new Error('Item not found');
  const { name, options, quantity, price, note, id } = item;

  const handleIncrease = () => setIncrementItem(cartId);
  const handleDecrease = () => setDecrementItem(cartId);

  const totalPrice = parseFloat(price.replace(',', '.')) * quantity;

  const optionKeys = Object.keys(options ?? {});
  const renderOptions = optionKeys.length > 0 && (
    <ul className="list-inside list-disc">
      {Object.entries(options!).map(([key, value], index) => (
        <li key={index} className="text-sm text-gray-600">
          {key}:{' '}
          {value === 'true' || value === 'false' ? (
            <Checkbox checked={value === 'true'} />
          ) : (
            value
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
          {/* Main Content */}
          <div className="p-4">
            {/* Name, Basic Price, and Edit Icon */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-gray-700">({price}€)</p>
              </div>
              <Edit className="m-2 h-4 w-4" />
            </div>

            {/* Options */}
            {optionKeys.length > 0 && (
              <div className="mt-2">
                {/* <p className="text-sm text-gray-600 underline"> {optionKeys.length} Options: */}
                <p className="text-sm text-gray-600">
                  Options: ( {optionKeys.length} )
                </p>
                {renderOptions}
              </div>
            )}

            {/* Note */}
            {note && (
              <div className="mt-2 rounded-lg border p-2">
                <p className="text-sm text-gray-600">{note}</p>
              </div>
            )}
          </div>

          {/* Quantity Controls and Total Price Banner */}
          <div className="rounded-b-lg border-t bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDecrease();
                  }}
                  className="flex h-8 w-8 items-center justify-center p-0"
                >
                  {quantity === 1 ? (
                    <Trash2 className="h-4 w-4" />
                  ) : (
                    <Minus className="h-4 w-4" />
                  )}
                </Button>
                <span className="text-lg font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIncrease();
                  }}
                  className="flex h-8 w-8 items-center justify-center p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-lg font-semibold">{totalPrice.toFixed(2)}€</p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <ConfirmationDialog
        cartId={cartId}
        id={id}
        title={name}
        selectedPrice={price}
        options={optionKeys}
        quantity={quantity}
      />
    </Dialog>
  );
}
