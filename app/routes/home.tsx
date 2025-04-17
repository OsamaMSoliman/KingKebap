import type { Route } from './+types/home';
import ComboMeals from './combo-meals';
import Menu from './menu';
import Offers, { DonnerstagAngebot, MontagAngebot } from './offers';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'KingKebap' },
    { name: 'description', content: 'Welcome to KingKebap restaurant!' },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const today = new Date(); // Get the current date

  return {
    isMonday: today.getDay() === 1, //  (1 corresponds to Monday)
    isTuesday: today.getDay() === 4, //  (1 corresponds to Teusday)
  };
}

export function HydrateFallback() {
  return <p>Loading ...</p>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { isMonday, isTuesday } = loaderData;

  return (
    <>
      <ShowOfferOfTheDay isMonday={isMonday} isTuesday={isTuesday} />
      <ComboMeals />
      <Menu />
      <Offers />
    </>
  );
}

const ShowOfferOfTheDay = ({
  isMonday,
  isTuesday,
}: {
  isMonday: boolean;
  isTuesday: boolean;
}) => (
  <>
    {isMonday && (
      <>
        <p className="text-center text-6xl font-extrabold my-4">
          Heute ist Dönertag!
        </p>
        <MontagAngebot />
      </>
    )}
    {isTuesday && (
      <>
        <p className="text-center text-6xl font-extrabold my-4">
          Heute ist Pizzatag!
        </p>
        <DonnerstagAngebot />
      </>
    )}
  </>
);
