import { Button } from "../ui/button";

interface IProps {
  id?: string;
  title: string;
  note?: string;
  description?: string;
  prices: Array<string | null>;
}

export default function ({
  id,
  title,
  description,
  note = "A,G",
  prices,
}: IProps) {
  return (
    <div className="w-fill flex items-center">
      <p className="m-1 border-y-2 font-bold slashed-zero tabular-nums">
        {id}.
      </p>
      <div className="grow">
        <div className="flex items-center gap-2">
          <div className="mr-auto flex gap-1">
            <p className="text-lg">{title}</p>
            {note && <p className="text-xs text-gray-500">{note}</p>}
          </div>
          {prices.map((price, i) => (
            <Button variant="ghost" key={i} color="red" className="bg-gray-900">
              <p className="min-w-16 text-base tabular-nums md:min-w-20">
                {price} Є
              </p>
            </Button>
          ))}
        </div>
        <p className="text-red-500">{description}</p>
      </div>
    </div>
  );
}
