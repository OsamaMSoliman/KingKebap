import { useState } from "react";
import { options as OverallOptions } from "~/data/menu.json";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Checkbox } from "~/components/ui/checkbox";
import { Textarea } from "~/components/ui/textarea";
import { ToggleGroup, ToggleItem } from "~/components/toggle-group/ToggleGroup";
import { ShoppingCart } from "lucide-react";

interface IProps {
  id: string;
  title: string;
  note?: string;
  description?: string;
  prices: Array<string>;
  options?: Array<string>;
}

export default function ({
  id,
  title,
  description,
  note = "A,G",
  prices,
  options = [],
}: IProps) {
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  return (
    <div className="w-fill flex items-center">
      <p className="m-1 border-y-2 font-bold slashed-zero tabular-nums">
        {`${id}.`}
      </p>
      <div className="grow">
        <div className="flex items-center gap-2">
          <div className="mr-auto flex gap-1">
            <p className="text-lg">{title}</p>
            {note && <p className="text-xs text-gray-500">{note}</p>}
          </div>
          <Dialog>
            {prices.map((price, i) => (
              <DialogTrigger asChild key={i} value={price}>
                <Button
                  variant="ghost"
                  className="bg-gray-900"
                  onClick={() => setSelectedPrice(price)}
                >
                  <p className="min-w-16 text-base tabular-nums md:min-w-20">
                    {price} Є
                  </p>
                </Button>
              </DialogTrigger>
            ))}
            <DialogContent className="text-black">
              <DialogHeader>
                <DialogTitle>Auswahlmöglichkeiten:</DialogTitle>
                <DialogDescription>
                  Der Preis bleibt {selectedPrice} und wird nicht beeinflusst
                </DialogDescription>
              </DialogHeader>
              <div className="w-full">
                {Object.values(options).map((option, i) => {
                  const optionValues =
                    OverallOptions[option as keyof typeof OverallOptions];
                  const isMultiple = false; // values.length > 1;

                  const [value, setValue] = useState<string | string[]>(
                    isMultiple ? [optionValues[0]] : optionValues[0],
                  );

                  if (
                    optionValues[0] === "true" ||
                    optionValues[0] === "false"
                  ) {
                    return (
                      <div key={i} className="mb-8 flex items-center space-x-2">
                        <Checkbox id={option} defaultChecked />
                        <label
                          htmlFor={option}
                          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option}
                        </label>
                      </div>
                    );
                  }

                  return (
                    <div key={i} className="mb-8">
                      <p className="mb-2 font-semibold">{option}:</p>
                      <ToggleGroup
                        value={value}
                        onValueChange={setValue}
                        multiple={isMultiple}
                        className="h-auto w-full flex-wrap gap-x-3 gap-y-1"
                      >
                        {optionValues.map((value, j) => (
                          <ToggleItem
                            key={j}
                            value={value}
                            className="flex-auto"
                          >
                            {value}
                          </ToggleItem>
                        ))}
                      </ToggleGroup>
                    </div>
                  );
                })}
                <Textarea placeholder="Anmerkungen zur Bestellung" />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Abbrechen
                  </Button>
                </DialogClose>
                <Button type="submit">
                  Zum <ShoppingCart className="mr-1 h-5 w-5" /> hinzufügen
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {description && <p className="text-red-500">{description}</p>}
      </div>
    </div>
  );
}
