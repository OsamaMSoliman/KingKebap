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
import { useSidePanelStore } from "~/stores/SidePanelStore";
import Cart from "../cart/Cart";
import UserInfo from "../user-info/UserInfo";

interface IProps {}

export default function SidePanel({}: IProps) {
  const show = useSidePanelStore((state) => state.show);
  const toggle = useSidePanelStore((state) => state.toggle);

  return (
    <Sheet open={show} onOpenChange={toggle}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Zur Kasse</SheetTitle>
          {/* <SheetDescription>
            add address and some other user information then checkout
          </SheetDescription> */}
        </SheetHeader>

        <div className="h-full overflow-y-auto px-4 text-black">
          <Accordion type="single" className="w-full" defaultValue="user-info">
            <AccordionItem value="user-info">
              <AccordionTrigger>Kontaktformular</AccordionTrigger>
              <AccordionContent>
                <UserInfo />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="user-cart">
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
