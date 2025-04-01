import Combo from '~/components/SpecialOffers/Combo';
import DialogBox from '~/components/dialogbox/DialogBox';
import { Dialog, DialogTrigger } from '~/components/ui/dialog';

import { combos } from '~/data/menu.json';

export default function ComboMeals() {
  return (
    <>
      <p className="text-center text-6xl font-extrabold my-4">Menü</p>
      {combos.map((item, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <div>
              <Combo {...item} />
            </div>
          </DialogTrigger>
          <DialogBox
            id={item.id}
            title={`${item.name} Menü-${item.id.substring(3)}`}
            selectedPrice={item.price}
          />
        </Dialog>
      ))}
    </>
  );
}
