import { useState } from 'react';
import DialogBox from '~/components/dialogbox/DialogBox';
import { Dialog, DialogTrigger } from '~/components/ui/dialog';
import { options } from '~/data/menu.json';
const { Belag } = options;

interface IProps {
  basePrice?: number;
  pricePerZutat?: number;
  specialOfferPrice?: number;
}

export default function ({
  basePrice = 25,
  pricePerZutat = 3,
  specialOfferPrice = 30,
}: IProps) {
  const [selectedZutaten, setSelectedZutaten] = useState<string[]>([]);

  // Calculate total price
  const totalPrice =
    selectedZutaten.length === 3
      ? specialOfferPrice
      : basePrice + selectedZutaten.length * pricePerZutat;

  // Toggle Zutaten selection
  const toggleZutat = (zutat: string) => {
    if (selectedZutaten.includes(zutat)) {
      setSelectedZutaten(selectedZutaten.filter((item) => item !== zutat));
    } else {
      setSelectedZutaten([...selectedZutaten, zutat]);
    }
  };

  return (
    <div className="m-4 flex min-w-sm flex-col gap-4 rounded-lg bg-white">
      <Dialog>
        <div className="mx-5 mt-2 text-center">
          <h3 className="mb-2 text-3xl font-bold text-red-500">
            Pizzablech 60x40cm 🍕
          </h3>
          <p className="mb-2 text-gray-600">Basisbelag 25,00€ + 3€ pro Belag</p>

          <div className="flex items-baseline justify-between">
            <p className="py-1.5 text-gray-600">Wähle deine Zutaten:</p>
            {selectedZutaten.length === 3 && (
              <p className="rounded-b-sm border-b border-dashed text-lg font-bold text-green-500">
                ✨Sonderangebot✨
              </p>
            )}
          </div>
        </div>

        <div className="mx-3 mb-2 flex gap-4">
          {/* Zutaten Grid */}
          <div className="mb-4 grid flex-5 grid-cols-4 gap-2 text-black">
            {Belag.map((zutat) => (
              <button
                key={zutat}
                onClick={() => toggleZutat(zutat)}
                className={`rounded-lg border-2 p-2 transition-all ${
                  selectedZutaten.includes(zutat)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-transparent bg-gray-100'
                }`}
              >
                {zutat}
              </button>
            ))}
          </div>

          <DialogTrigger asChild>
            <button
              className="flex flex-1 items-center justify-center bg-red-500 pr-2 pl-8 hover:bg-red-700"
              // className="flex flex-1 items-center justify-center bg-red-500 px-5 hover:bg-red-700"
              style={{
                clipPath: 'polygon(100% 0,  100% 100%, 25% 100%, 0 50%, 25% 0)',
                // clipPath:
                // "polygon( 25% 0, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0 50% )",
              }}
            >
              <p className="text-3xl font-bold text-nowrap oldstyle-nums tabular-nums">{`${totalPrice.toFixed(2)} Є`}</p>
            </button>
          </DialogTrigger>
        </div>

        <DialogBox
          id="Pizzablech"
          title="Pizzablech"
          selectedPrice={totalPrice.toString()}
          // options={['Belag']}
          preSelectedOptions={{ Belag: selectedZutaten }}
        />
      </Dialog>
    </div>
  );
}
