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

export default function Home() {
  return (
    <>
      <ComboMeals />
      <Menu />
      <Offers />
    </>
  );
}
