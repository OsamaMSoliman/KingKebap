import { useRef, useState } from 'react';

import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Textarea } from '~/components/ui/textarea';
import { options as OverallOptions } from '~/data/menu.json';
import { setUpsertItem } from '~/stores/CartStore';
import Options, { type TOptions } from './Options';

interface IProps {
  cartId?: string;
  id: string;
  title: string;
  selectedPrice: string;
  options: Array<string>;
}

// This confirmation dialog is used to confirm the options selected per item (every item has its own ConfirmationDialog)
export default function ConfirmationDialog({
  cartId,
  id,
  title,
  selectedPrice,
  options,
}: IProps) {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<TOptions>(() =>
    options.reduce<TOptions>((defaults, option) => {
      const [firstOptionValue] =
        OverallOptions[option as keyof typeof OverallOptions];
      const isMultiple = false; // values.length > 1;
      defaults[option] = isMultiple ? [firstOptionValue] : firstOptionValue;
      return defaults;
    }, {})
  );

  const handleUpsertItem = () => {
    setUpsertItem({
      cartId,
      id,
      name: title,
      price: selectedPrice!,
      options: Object.fromEntries(
        Object.entries(selectedOptions).map(([k, v]) => [
          k,
          Array.isArray(v) ? v.join(', ') : v,
        ])
      ),
      quantity: 1,
      note: commentRef.current?.value || '',
    });
    toast.success(
      `${title} wurde hinzugefügt`
      // { action: {
      //   label: "Undo",
      //   onClick: () => console.log("TODO: Undo"),
      // }}
    );
  };
  // const handleAddItem = () => {
  //   toast.promise(
  //     new Promise<string>((resolve) => {
  //       setTimeout(() => {
  //         addItem({
  //           id,
  //           name: title,
  //           price: selectedPrice!,
  //           options: [],
  //           quantity: 1,
  //         });
  //         // toast.success("Added to Cart");
  //         resolve(title);
  //       }, 2000);
  //     }),
  //     {
  //       loading: "Adding to Cart...",
  //       action: {
  //         label: "Undo",
  //         onClick: () => console.log("TODO: Undo"),
  //       },
  //       success: (data) => {
  //         return `${data} has been added`;
  //       },
  //       error: "Error",
  //     },
  //   );
  // };

  return (
    <DialogContent className="text-black">
      <DHeader selectedPrice={selectedPrice} />

      <div className="w-full">
        <Options
          options={options}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <Textarea
          ref={commentRef}
          name="comment"
          placeholder="Anmerkungen zur Bestellung"
        />
      </div>

      <DFooter handleUpsertItem={handleUpsertItem} />
    </DialogContent>
  );
}

const DHeader = ({ selectedPrice }: { selectedPrice: string }) => (
  <DialogHeader>
    <DialogTitle>Auswahlmöglichkeiten:</DialogTitle>
    <DialogDescription>
      Der Preis bleibt {selectedPrice} und wird nicht beeinflusst
    </DialogDescription>
  </DialogHeader>
);

const DFooter = ({ handleUpsertItem }: { handleUpsertItem: () => void }) => (
  <DialogFooter>
    <DialogClose asChild>
      <Button type="button" variant="secondary">
        Abbrechen
      </Button>
    </DialogClose>

    <DialogClose asChild>
      <Button onClick={handleUpsertItem}>
        Zum <ShoppingCart className="mr-1 h-5 w-5" /> hinzufügen
      </Button>
    </DialogClose>
  </DialogFooter>
);
