import { useState } from 'react';

import { DialogClose } from '@radix-ui/react-dialog';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Textarea } from '~/components/ui/textarea';
import { setAddItem } from '~/stores/CartStore';
import Options from './Options';

interface IProps {
  id: string;
  title: string;
  selectedPrice: string;
  options: Array<string>;
}

export default function ConfirmationDialog({
  id,
  title,
  selectedPrice,
  options,
}: IProps) {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string | string[];
  }>({});
  const [comment, setComment] = useState<string>('');

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
          name="comment"
          placeholder="Anmerkungen zur Bestellung"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <DFooter
        id={id}
        title={title}
        selectedPrice={selectedPrice}
        selectedOptions={selectedOptions}
        comment={comment}
        setAddItem={setAddItem}
      />
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

const DFooter = ({
  id,
  title,
  selectedPrice,
  selectedOptions,
  comment,
  setAddItem,
}: {
  id: string;
  title: string;
  selectedPrice: string;
  selectedOptions: { [key: string]: string | string[] };
  comment: string;
  setAddItem: (item: any) => void;
}) => (
  <DialogFooter>
    <DialogClose asChild>
      <Button type="button" variant="secondary">
        Abbrechen
      </Button>
    </DialogClose>

    <DialogClose asChild>
      <Button
        // type="submit"
        // onClick={handleAddItem}
        onClick={() => {
          setAddItem({
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
            note: comment,
          });
          toast.success(
            `${title} wurde hinzugefügt`
            // { action: {
            //   label: "Undo",
            //   onClick: () => console.log("TODO: Undo"),
            // }}
          );
        }}
      >
        Zum <ShoppingCart className="mr-1 h-5 w-5" /> hinzufügen
      </Button>
    </DialogClose>
  </DialogFooter>
);
