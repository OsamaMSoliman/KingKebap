import { Button } from '~/components/ui/button';
import { DialogTrigger } from '~/components/ui/dialog';

export const Prices = ({
  prices,
  setSelectedPrice,
}: {
  prices: string[];
  setSelectedPrice: (price: string) => void;
}) =>
  prices.map((price, i) => (
    <Price key={i} price={price} setSelectedPrice={setSelectedPrice} />
  ));

const Price = ({
  price,
  setSelectedPrice,
}: {
  price: string;
  setSelectedPrice: (price: string) => void;
}) => {
  return (
    <DialogTrigger asChild value={price}>
      <Button
        variant="ghost"
        className="bg-gray-900"
        onClick={() => setSelectedPrice(price)}
      >
        <p className="min-w-16 text-base tabular-nums md:min-w-20">{price} Є</p>
      </Button>
    </DialogTrigger>
  );
};

export default Prices;
