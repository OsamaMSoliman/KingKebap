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
import { setDeliveryMethod, useContactStore } from '~/stores/ContactStore';
import { useSidePanelStore } from '~/stores/SidePanelStore';

type AccordionValue = 'user-info' | 'user-cart';

export default function SidePanel() {
  const { show, toggle } = useSidePanelStore();
  const contactInfo = useContactStore();

  // Accordion state management
  const [accordionValue, setAccordionValue] = useState<AccordionValue>();

  // Memoized calculation for required fields
  const hasEmptyRequiredFields = useMemo(
    () =>
      Object.entries(contactInfo)
        .filter(([key]) => key !== 'bemerkungen')
        .some(([_, info]) => !info),
    [contactInfo]
  );

  // Handle hydration and contact info changes
  useEffect(() => {
    const updateAccordion = () => {
      setAccordionValue(hasEmptyRequiredFields ? 'user-info' : 'user-cart');
    };

    const unsubscribe =
      useContactStore.persist.onFinishHydration(updateAccordion);
    // If already hydrated, set immediately
    if (useContactStore.persist.hasHydrated()) updateAccordion();

    return unsubscribe;
  }, [hasEmptyRequiredFields]);

  // Panel toggle handler
  const handleToggleSidePanel = (open: boolean): void => {
    toggle();
    if (open)
      setAccordionValue(hasEmptyRequiredFields ? 'user-info' : 'user-cart');
  };

  // Only allow manual accordion changes when all required fields are filled
  const handleAccordionChange = (value: AccordionValue) =>
    !hasEmptyRequiredFields && setAccordionValue(value);

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
    <Sheet open={show} onOpenChange={handleToggleSidePanel}>
      <SheetContent aria-describedby={undefined}>
        <SheetHeader className="pb-0">
          <SheetTitle>Zur Kasse</SheetTitle>

          <SheetDescription asChild>
            <ToggleGroup
              className="w-full border border-gray-300"
              value={contactInfo['wo?'] as 'Lieferung' | 'Abholung'}
              onValueChange={setDeliveryMethod}
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
            onValueChange={handleAccordionChange}
          >
            <AccordionItem value="user-info">
              <AccordionTrigger>Kontaktformular</AccordionTrigger>
              <AccordionContent>
                <UserInfo onSubmit={() => handleAccordionChange('user-cart')} />
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
