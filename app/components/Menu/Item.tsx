import { useState } from 'react';

import DialogBox from '~/components/dialogbox/DialogBox';
import type { TOptions } from '~/components/dialogbox/Options';
import { Dialog } from '~/components/ui/dialog';
import Prices from './Prices';

interface IProps {
  id: string;
  title: string;
  note?: string;
  description?: string;
  prices: Array<string>;
  options?: TOptions;
}

export default function Item({
  id,
  title,
  description,
  note = 'A,G',
  prices,
  options,
}: IProps) {
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  return (
    <div className="w-fill flex items-center">
      <p className="m-1 border-y-2 font-bold slashed-zero tabular-nums">
        {`${id}.`}
      </p>

      <div className="grow">
        <div className="flex items-center gap-2">
          <div className="mr-auto flex gap-1">
            <p className="text-lg">{title}</p>
            {note && <p className="text-xs text-gray-500">{note}</p>}
          </div>

          <Dialog>
            <Prices prices={prices} setSelectedPrice={setSelectedPrice} />

            <DialogBox
              id={id}
              title={title}
              selectedPrice={selectedPrice!}
              options={options}
            />
          </Dialog>
        </div>
        {description && <p className="text-red-500">{description}</p>}
      </div>
    </div>
  );
}
