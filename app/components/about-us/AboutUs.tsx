import { AlertTriangle, MapPinIcon, PhoneIcon, TruckIcon } from 'lucide-react';
// This is not required, but I wanted to test out both kinds of css imports
import './AboutUs.css';
import styles from './AboutUs.module.css';

interface IProps {
  isExpanded?: boolean;
  isCurrentlyClosed: boolean;
}

export default function AboutUs({
  isCurrentlyClosed,
  isExpanded = false,
}: IProps) {
  return isExpanded ? (
    <div className="space-y-2">
      <p>Über uns</p>
      <InfoAboutUs />
      {isCurrentlyClosed && (
        <div className="relative overflow-hidden">
          <div className="animate-scrollHorizontally inline-flex space-x-8">
            <CurrentlyClosedAlert />
            <CurrentlyClosedAlert /> {/* Duplicate for seamless looping */}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="relative overflow-hidden">
      <div
        className={`${styles['scrolling-content-vertically']} flex flex-col space-y-4`}
      >
        <InfoAboutUs />
        <InfoAboutUs /> {/* Duplicate for seamless looping */}
      </div>
    </div>
  );
}

const InfoAboutUs = () => (
  <>
    <table className="mx-auto table-auto border-separate border-spacing-x-5 border-spacing-y-1">
      <caption className="caption-top">
        <TruckIcon className="mx-1 inline-block h-5 w-5" />
        Lieferung ab 15€ Bestellwert frei Haus
      </caption>
      <tbody>
        <tr>
          <td>Taglich:</td>
          <td>12:00-22:00 Uhr</td>
        </tr>
        <tr>
          <td>Sonn- & Feiertage:</td>
          <td>13:00-22:00 Uhr</td>
        </tr>
      </tbody>
      <caption className="caption-bottom">
        <MapPinIcon className="mx-1 inline-block h-5 w-5" />
        Bachstrase 2 • 58762 Altena
      </caption>
    </table>
    <p>
      <PhoneIcon className="mx-1 inline-block h-5 w-5" />
      02352 - 2670780
    </p>
  </>
);

const CurrentlyClosedAlert = () => (
  <p className="items-center whitespace-nowrap text-red-300 animate-pulse">
    <AlertTriangle className="mr-8 inline-block h-5 w-5 animate-ping" />
    Hinweis: Wir haben gerade geschlossen. Wenn Sie möchten, können Sie aber
    jetzt schon bestellen, wir liefern dann zu unseren Geschäftszeiten.
  </p>
);
