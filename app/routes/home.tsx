import type { Route } from "./+types/home";
import Menu from "./menu";
import Offers from "./offers";
import ComboMeals from "./combo-meals";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const today = new Date();

function isMondayOrTuesday() {
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
  };
}

export default function Home() {
  const { isMonday, isTuesday } = isMondayOrTuesday();

  return (
    <>
      <div>
        <h1>Welcome, today is {days[today.getDay()]}!</h1>
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
