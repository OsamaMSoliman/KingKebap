import List from "~/components/Menu/List";
import Header from "~/components/Menu/Header";
import Item from "~/components/Menu/Item";
import Pizzablech from "~/components/SpecialOffers/Pizzablech";

import { dishes as MENU } from "~/data/menu.json";

export default function () {
  return (
    <>
      <p className="my-4 text-center text-6xl font-extrabold">Speisekarte</p>
      {Object.entries(MENU).map(([title, menu], i) => (
        <>
          <List
            key={`List-${i}`}
            header={
              <Header
                title={title}
                description={
                  "description" in menu ? menu.description : undefined
                }
                note={"note" in menu ? menu.note : undefined}
              />
            }
          >
            {menu.items.map((item, j) => (
              <Item
                key={`Item-${i}-${j}`}
                id={item.id}
                title={item.title}
                prices={item.prices}
                description={
                  "description" in item ? item.description : undefined
                }
                note={"note" in item ? item.note : undefined}
                options={"options" in item ? item.options : undefined}
              />
            ))}
          </List>
          {title.split(" ").some((word) => word === "Pizza") && (
            <Pizzablech key={i} />
          )}
        </>
      ))}
    </>
  );
}
