import List from "~/components/Menu/List";
import Header from "~/components/Menu/Header";
import Item from "~/components/Menu/Item";

import MENU from "~/data/menu.json";

export default function () {
  return (
    <>
      <p className="text-center text-6xl font-extrabold">Speisekarte</p>
      {Object.entries(MENU).map(([title, menu], index) => (
        <List
          key={index}
          header={
            <Header
              title={title}
              description={"description" in menu ? menu.description : undefined}
              note={"note" in menu ? menu.note : undefined}
            />
          }
        >
          {menu.items.map((item, index) => (
            <Item
              key={index}
              id={item.id}
              title={item.title}
              prices={item.prices}
              description={"description" in item ? item.description : undefined}
            />
          ))}
        </List>
      ))}
    </>
  );
}
