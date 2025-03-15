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
import { useCartStore } from "~/stores/CartStore";
import Cart from "../cart/Cart";

interface IProps {}

export default function SidePanel({}: IProps) {
  const show = useCartStore((state) => state.show);
  const toggle = useCartStore((state) => state.toggle);

  return (
    <Sheet open={show} onOpenChange={toggle}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Zur Kasse</SheetTitle>
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
              <AccordionTrigger>Anschrift</AccordionTrigger>
              <AccordionContent>The address of the user</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Bestellungen</AccordionTrigger>
              <AccordionContent>
                <Cart />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Jetzt Bestellen</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
