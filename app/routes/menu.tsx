import List from "~/components/Menu/List";
import Header from "~/components/Menu/Header";
import Item from "~/components/Menu/Item";

import MENU from "~/data/menu.json";
import Pizzablech from "~/components/SpecialOffers/Pizzablech";

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
              />
            ))}
          </List>
          {title === "Pizza" && <Pizzablech />}
        </>
      ))}
    </>
  );
}
