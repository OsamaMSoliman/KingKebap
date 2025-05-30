import type { TOptions } from '~/components/dialogbox/Options';
import Header from '~/components/Menu/Header';
import Item from '~/components/Menu/Item';
import List from '~/components/Menu/List';
import Pizzablech from '~/components/SpecialOffers/Pizzablech';

import { dishes as MENU, options as OPTIONS } from '~/data/menu.json';

export default function () {
  return (
    <>
      <p className="my-4 text-center text-6xl font-extrabold">Speisekarte</p>
      {Object.entries(MENU).map(([title, menu], i) => (
        <div key={`Menu-${i}`} id={title}>
          <List
            header={
              <Header
                title={title}
                description={
                  'description' in menu ? menu.description : undefined
                }
                note={'note' in menu ? menu.note : undefined}
              />
            }
          >
            {menu.items.map((item, j) => {
              const description = 'description' in item ? item.description : '';
              const optionKeys: string[] =
                'options' in item ? (item.options as Array<string>) : [];
              optionKeys?.push(
                ...Object.keys(OPTIONS).filter((option) =>
                  description?.includes(option)
                )
              );

              const options = optionKeys.reduce<TOptions>((defaults, opKey) => {
                const [firstOption] = OPTIONS[opKey as keyof typeof OPTIONS];
                defaults[opKey] = false ? [firstOption] : firstOption; // isMultiple ?
                return defaults;
              }, {});

              return (
                <Item
                  key={`Item-${i}-${j}`}
                  id={item.id}
                  title={item.title}
                  prices={item.prices}
                  description={description}
                  note={'note' in item ? item.note : undefined}
                  options={options}
                />
              );
            })}
          </List>
          {title.split(' ').some((word) => word === 'Pizza') && <Pizzablech />}
        </div>
      ))}
    </>
  );
}
