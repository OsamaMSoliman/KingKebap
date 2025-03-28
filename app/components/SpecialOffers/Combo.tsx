import { Button } from "../ui/button";

interface IProps {
  id: number;
  image: string;
  name: string;
  price: string;
  description?: string;
}

export default function Combo({
  id,
  image,
  name,
  price,
  description = "+ Pommes + Getränk",
}: IProps) {
  return (
    <div className="m-4 flex">
      <p
        className="bg-white px-1 py-2 text-center text-red-500"
        style={{ writingMode: "vertical-lr" }}
      >
        Menü-{id}
      </p>
      <div className="flex grow items-center space-x-4 bg-red-600 p-2">
        {image && (
          <img
            src={image}
            alt={name}
            className="h-24 w-24 rounded-md object-cover"
          />
        )}
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="">{description}</p>
        </div>
        <Button variant="ghost" color="red" className="ml-auto bg-gray-900">
          <span className="min-w-16 text-base tabular-nums md:min-w-20">
            {`${price} Є`}
          </span>
        </Button>
      </div>
    </div>
  );
}
