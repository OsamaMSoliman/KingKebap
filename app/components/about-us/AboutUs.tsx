import { MapPinIcon, PhoneIcon, TruckIcon } from "lucide-react";

interface IProps {
  isOpen?: boolean;
}

export default function AboutUs({ isOpen = false }: IProps) {
  return isOpen ? (
    <div className="space-y-2">
      <p>Über uns</p>
      <table className="mx-auto table-auto border-separate border-spacing-x-5 border-spacing-y-1">
        <caption className="caption-top">
          <TruckIcon className="mx-1 inline-block h-5 w-5" />
          Lieferung ab 15€ Bestellwert frei Haus
        </caption>
        <tr>
          <td>Taglich:</td>
          <td>12:00-22:00 Uhr</td>
        </tr>
        <tr>
          <td>Sonn- & Feiertage:</td>
          <td>13:00-22:00 Uhr</td>
        </tr>
        <caption className="caption-bottom">
          <MapPinIcon className="mx-1 inline-block h-5 w-5" />
          Bachstrase 2 58762 Altena
        </caption>
      </table>
      <p>
        <PhoneIcon className="mx-1 inline-block h-5 w-5" />
        02352 - 2670780
      </p>
    </div>
  ) : (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="animate-scrollText inline-block flex-row [--scroll-duration:30s] [--scroll-start:45%]">
        <span className="mr-100">
          <TruckIcon className="mx-1 inline-block h-5 w-5" />
          Lieferung ab 15€ Bestellwert frei Haus
        </span>
        <span className="mr-100">
          Taglich: 12:00-22:00 Uhr Sonn- & Feiertage: 13:00-22:00 Uhr
        </span>
        <span className="mr-100">
          <MapPinIcon className="mx-1 inline-block h-5 w-5" />
          Bachstrase 2 58762 Altena
        </span>
        <span className="">
          <PhoneIcon className="mx-1 inline-block h-5 w-5" />
          02352 - 2670780
        </span>
      </div>
    </div>
  );
}
