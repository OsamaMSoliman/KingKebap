import React from "react";
import { Button } from "../ui/button";

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

import { options as OPTIONS } from "~/data/menu.json";
import { ToggleGroup, ToggleItem } from "../toggle-group/ToggleGroup";

interface IProps {
  id?: string;
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
  console.log({ options });

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
              <DialogTrigger asChild key={i}>
                <Button variant="ghost" className="bg-gray-900">
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
                  Price doesn't change with options.
                </DialogDescription>
              </DialogHeader>
              <div className="w-full">
                {/* {Object.entries(OPTIONS).map(([key, values], i) => (
                  <div key={i} className="mb-8">
                    <p className="mb-2 font-semibold">{key}:</p>
                    <ToggleGroup
                      type="multiple"

                      defaultValue={values[0]}
                      className="h-auto w-full flex-wrap"
                    >
                      {values.map((value, j) => (
                        <ToggleGroupItem
                          key={j}
                          value={value}
                          className="flex-auto"
                        >
                          {value}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </div>
                ))} */}
                {/* {Object.entries(OPTIONS).map(([key, values], i) => (
                  <div key={i} className="mb-8">
                    <p className="mb-2 font-semibold">{key}:</p>
                    <Tabs defaultValue={values[0]}>
                      <TabsList
                        className="h-auto w-full flex-wrap gap-x-3"
                        // className="grid h-auto grid-cols-4 gap-2"
                      >
                        {values.map((value, j) => (
                          <TabsTrigger
                            key={j}
                            value={value}
                            className="flex-initial"
                          >
                            {value}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                ))} */}
                {Object.entries(OPTIONS).map(([key, values], i) => {
                  const isMultiple = values.length > 1;

                  const [value, setValue] = React.useState<string | string[]>(
                    isMultiple ? [values[0]] : values[0],
                  );

                  return (
                    <div key={i} className="mb-8">
                      <p className="mb-2 font-semibold">{key}:</p>
                      <ToggleGroup
                        value={value}
                        onValueChange={setValue}
                        multiple={isMultiple}
                        className="h-auto w-full flex-wrap gap-x-3 gap-y-1"
                      >
                        {values.map((value, j) => (
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
              </div>
              {/* <Tabs defaultValue="beef">
                <TabsList className="w-full">
                  <TabsTrigger value="beef">Kalbfleisch</TabsTrigger>
                  <TabsTrigger value="chicken">Hähnchenfleisch</TabsTrigger>
                </TabsList>
              </Tabs> */}

              {/* <ToggleGroup
                type="single"
                defaultValue="bold"
                defaultChecked
                className="w-full"
              >
                <ToggleGroupItem value="bold">A</ToggleGroupItem>
                <ToggleGroupItem value="italic">B</ToggleGroupItem>
                <ToggleGroupItem value="strikethrough">C</ToggleGroupItem>
              </ToggleGroup> */}

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit">Place order</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-red-500">{description}</p>
      </div>
    </div>
  );
}
