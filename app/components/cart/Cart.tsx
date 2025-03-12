import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";

interface IProps {
  open: boolean;
  setOpen?(open: boolean): void;
}

export default function Cart({ open, setOpen }: IProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger> */}

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Food Orders</SheetTitle>
          <SheetDescription>
            add address and some other user information then checkout
          </SheetDescription>
        </SheetHeader>

        <div className="p-4 text-black">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Adresse</AccordionTrigger>
              <AccordionContent>The address of the user</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>The Order</AccordionTrigger>
              <AccordionContent>The food the user ordered</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Order Now</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
