import NavBar from "~/components/nav-bar/NavBar";
import type { Route } from "./+types/home";
import Menu from "./menu";
import Offers from "./offers";
import FAB from "~/components/floating-action-button/FAB";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <div className="mx-auto flex max-h-screen w-[80vw] max-w-[960px] min-w-[420px] flex-col">
        <header className="sticky top-0 z-10 shadow-md">
          <NavBar />
        </header>
        <main className="overflow-y-scroll">
          {/* <main className="mx-auto w-[80vw] max-w-[960px] min-w-[400px]"> */}
          <Menu />
          {/* <Offers /> */}
          <FAB />
        </main>
        <footer className="bg-gray-800 p-4 text-center">
          <p>Footer</p>
        </footer>
      </div>
    </>
  );
}
