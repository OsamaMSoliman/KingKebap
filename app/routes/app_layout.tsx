import { useState } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import AboutUs from '~/components/about-us/AboutUs';
// import FAB from "~/components/floating-action-button/FAB";
import Navbar from '~/components/nav-bar/NavBar';
import SidePanel from '~/components/side-panel/SidePanel';
import type { Route } from './+types/app_layout';
// import { ScrollArea } from "~/components/ui/scroll-area";

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleFooter = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="mx-auto flex h-screen w-[80vw] max-w-[960px] min-w-[420px] flex-col">
      {/* Header - fixed height */}
      <header className="sticky top-0 z-10 h-16 shadow-md">
        <Navbar />
      </header>

      {/* Main Content - flex-1 to take remaining space */}
      <main className="flex-1 overflow-y-auto">
        {/* <main className="mx-auto w-[80vw] max-w-[960px] min-w-[400px]"> */}
        {/* TODO: <ScrollArea className="h-full"> */}
        <Outlet />
        {/* </ScrollArea> */}
        {/* <FAB /> */}
        {/* TODO: make it an app (WPA) */}
        {/* TODO: Impressum & Datenschutz-AGB */}
        {/* TODO:
          ZUSATZSTOFFE
          1.)mit Farbstoff 2.) mit Konservierungsstoff 3.)mit Antioxidationsmittel 4.) mit Geschmacksverstärker 5.) geschwefelt 6.) geschwärzt 7.) gewachst 8.)mit Phosphat 9.) mit Süßungsmittel *enthält eine Phenylalininquelle 10.) mit Koffein 11.) mit Chinin
          ALLERGENE
          A.) Glutenhaltige Getreide* B.)Krebstiere* C.) Eier* D.) Fisch* E.)Erdnüsse F.)Sojabohnen* G.) Milch* H.)Schalenfrüchte* I.)Sellerie* J.) Senf* K.)Sesamsamen* L.)Schwefeldioxid und Sulfite M.)Lupinen* N.) Weichtiere *= und daraus gewonene Erzeugnisse
        */}
        <SidePanel />
        <Toaster />
      </main>

      {/* Footer - fixed height with toggle */}
      <footer
        className="cursor-pointer overflow-hidden bg-gray-800 p-4 text-center transition-all duration-300 ease-in-out"
        onClick={toggleFooter}
        style={{ height: isCollapsed ? '3em' : '30em' }}
      >
        <AboutUs
          isExpanded={!isCollapsed}
          isCurrentlyClosed={!loaderData.isCurrentlyOpen}
        />
      </footer>
    </div>
  );
}

export async function loader() {
  const currentHour = new Date().getHours();
  return {
    isCurrentlyOpen: currentHour >= 12 && currentHour < 23,
  };
}
