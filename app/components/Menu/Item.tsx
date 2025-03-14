import { Button } from "../ui/button";

interface IProps {
  id?: string;
  title: string;
  note?: string;
  description?: string;
  prices: Array<string>;
  options?: Array<string[]>;
}

export default function ({
  id,
  title,
  description,
  note = "A,G",
  prices,
  options = [],
}: IProps) {
  const colors = [
    "bg-amber-100", // Farbe für das erste Sub-Array
    "bg-blue-100", // Farbe für das zweite Sub-Array
    "bg-green-100", // Farbe für das dritte Sub-Array
    // Füge weitere Farben hinzu, wenn nötig
  ];

  const optionColors = options.reduce<{ [option: string]: string }>(
    (acc, subArray, index) => {
      subArray.forEach((option) => {
        acc[option] = colors[index % colors.length];
      });
      return acc;
    },
    {},
  );

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
          {prices.map((price, i) => (
            <Button variant="ghost" key={i} className="bg-gray-900">
              <p className="min-w-16 text-base tabular-nums md:min-w-20">
                {price} Є
              </p>
            </Button>
          ))}
        </div>
        <p className="text-red-500">
          {/* The description has the toggle buttons */}
          {description &&
            description
              .split(
                new RegExp(`(${Object.keys(optionColors).join("|")})`, "g"),
              )
              // .filter(Boolean) // Removes empty strings from the array that can arise from the division
              .map((str, i) =>
                optionColors[str] ? (
                  <Button
                    variant="ghost"
                    key={i}
                    className={`m-1 border p-1 italic ${optionColors[str]}`}
                  >
                    {str}
                  </Button>
                ) : (
                  str
                ),
              )}
        </p>
      </div>
    </div>
  );
}
