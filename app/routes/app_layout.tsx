import { Outlet } from "react-router";
import FAB from "~/components/floating-action-button/FAB";
import Navbar from "~/components/nav-bar/NavBar";

export default function AppLayout() {
  return (
    <div className="mx-auto flex max-h-screen w-[80vw] max-w-[960px] min-w-[420px] flex-col">
      <header className="sticky top-0 z-10 shadow-md">
        <Navbar />
      </header>
      <main className="overflow-y-scroll">
        {/* <main className="mx-auto w-[80vw] max-w-[960px] min-w-[400px]"> */}
        <Outlet />
        <FAB />
      </main>
      <footer className="bg-gray-800 p-4 text-center">
        <p>Footer</p>
      </footer>
    </div>
  );
}
