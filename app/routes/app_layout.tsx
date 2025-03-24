import { useState } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import AboutUs from "~/components/about-us/AboutUs";
// import FAB from "~/components/floating-action-button/FAB";
import Navbar from "~/components/nav-bar/NavBar";
import SidePanel from "~/components/side-panel/SidePanel";
// import { ScrollArea } from "~/components/ui/scroll-area";

export default function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleFooter = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="mx-auto flex max-h-screen w-[80vw] max-w-[960px] min-w-[420px] flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 shadow-md">
        <Navbar />
      </header>
      {/* Scrollable Main Content */}
      <main className="overflow-y-auto">
        {/* <main className="mx-auto w-[80vw] max-w-[960px] min-w-[400px]"> */}
        {/* TODO: <ScrollArea className="h-full"> */}
        <Outlet />
        {/* </ScrollArea> */}
        {/* <FAB /> */}
        <SidePanel />
        <Toaster />
      </main>
      {/* Footer */}
      <footer
        className="cursor-pointer overflow-hidden bg-gray-800 p-4 text-center transition-all duration-300 ease-in-out"
        onClick={toggleFooter}
        style={{ height: isCollapsed ? "10em" : "110em" }}
      >
        <AboutUs isOpen={!isCollapsed} />
      </footer>
    </div>
  );
}
