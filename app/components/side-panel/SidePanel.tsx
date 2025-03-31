import { useEffect, useMemo, useState } from 'react';
import { useFetcher } from 'react-router';
import { toast } from 'sonner';
import Cart from '~/components/cart/Cart';
import { ToggleGroup, ToggleItem } from '~/components/toggle-group/ToggleGroup';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Button } from '~/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet';
import UserInfo from '~/components/user-info/UserInfo';
import type { action as checkoutAction } from '~/routes/checkout';
import { getAllItems } from '~/stores/CartStore';
import {
  setLieferungOderAbholung,
  useContactStore,
} from '~/stores/ContactStore';
import { useSidePanelStore } from '~/stores/SidePanelStore';

interface IProps {}

type AccordionValue = 'user-info' | 'user-cart';

export default function SidePanel({}: IProps) {
  const show = useSidePanelStore((state) => state.show);
  const toggle = useSidePanelStore((state) => state.toggle);

  const contactInfo = useContactStore();
  const defaultAccordion = useMemo(
    () =>
      Object.entries(contactInfo)
        .filter(([key, _]) => key !== 'bemerkungen') // all required excluding bemerkungen
        .some(([_, info]) => info === '') // if any of the required is empty
        ? 'user-info'
        : 'user-cart',
    [contactInfo]
  );
  const [accordionValue, setAccordionValue] =
    useState<AccordionValue>(defaultAccordion);

  const handleToggle = (open: boolean): void => {
    toggle();
    setAccordionValue(defaultAccordion);
  };

  const {
    data: receivedData,
    formData: sentData,
    submit,
    state, // TODO: prevent the user from submitting multiple times
  } = useFetcher<typeof checkoutAction>();

  useEffect(() => {
    if (receivedData?.ok) {
      console.log({ receivedData });
      toast.success('Bestellung wurde erfolgreich abgeschickt', {
        action: {
          label: 'Undo',
          onClick: () => console.log('TODO: Undo'),
        },
      });
    } else {
      // TODO: state why?
      toast.error('Bestellung konnte nicht abgeschickt werden', {
        action: {
          label: 'Undo',
          onClick: () => console.log('TODO: Undo'),
        },
      });
    }
  }, [receivedData]);

  const onClick = async () =>
    await submit(
      {
        ...contactInfo,
        items: getAllItems(),
      },
      {
        method: 'POST',
        action: '/api/checkout',
        encType: 'application/json',
      }
    );

  return (
    <Sheet open={show} onOpenChange={handleToggle}>
      <SheetContent aria-describedby={undefined}>
        <SheetHeader className="pb-0">
          <SheetTitle>Zur Kasse</SheetTitle>

          <SheetDescription>
            <ToggleGroup
              className="w-full border border-gray-300"
              value={contactInfo['wo?'] as 'Lieferung' | 'Abholung'}
              onValueChange={setLieferungOderAbholung}
            >
              <ToggleItem value="Lieferung">Lieferung</ToggleItem>
              <ToggleItem value="Abholung">Abholung</ToggleItem>
            </ToggleGroup>
          </SheetDescription>
        </SheetHeader>

        <div className="h-full overflow-y-auto px-4 text-black">
          <Accordion
            type="single"
            className="w-full"
            value={accordionValue}
            onValueChange={(value: AccordionValue) => setAccordionValue(value)}
          >
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
            <Button type="submit" onClick={onClick}>
              Jetzt Bestellen
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
