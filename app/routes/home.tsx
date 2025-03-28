import type { Route } from './+types/home';
import ComboMeals from './combo-meals';
import Menu from './menu';
import Offers from './offers';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const today = new Date(); // Get the current date
  // console.log(
  //   today,
  //   today.getDay(),
  //   today.toLocaleDateString(),
  //   today.toLocaleTimeString(),
  //   today.toLocaleString(),
  // );
  return {
    isMonday: today.getDay() === 1, //  (1 corresponds to Monday)
    isTuesday: today.getDay() === 4, //  (1 corresponds to Teusday)
    today: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][today.getDay()],
  };
}

export function HydrateFallback() {
  return <p>Loading ...</p>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { today, isMonday, isTuesday } = loaderData;

  return (
    <>
      <div>
        <h1>Welcome, today is {today}!</h1>
        {isMonday ? <p>Today is Monday!</p> : <p>Today is not Monday.</p>}
        {isTuesday ? <p>Today is Tuesday!</p> : <p>Today is not Tuesday.</p>}
      </div>
      {/* TODO: show the offer of the day on top, maybe in the navbar ?*/}
      <ComboMeals />
      <Menu />
      <Offers />
    </>
  );
}
