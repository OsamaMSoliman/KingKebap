import List from "~/components/Menu/List";
import Header from "~/components/Menu/Header";
import Item from "~/components/Menu/Item";

import MENU from "~/data/menu.json";

export default function () {
  return (
    <>
      {Object.entries(MENU).map(([title, menu], index) => (
        <List
          key={index}
          header={
            <Header
              title={title}
              description={"description" in menu ? menu.description : undefined}
              prices={"prices" in menu ? menu.prices : []}
              note={"img" in menu ? menu.img : undefined}
            />
          }
        >
          {menu.items.map((item, index) => (
            <Item
              key={index}
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
