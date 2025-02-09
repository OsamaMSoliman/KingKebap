interface IProps {
  id?: string;
  title: string;
  note?: string;
  description?: string;
  prices: Array<string|null>;
}

export default function ({ title, description, note, prices }: IProps) {
  return (
    <>
      <div className="w-fill flex text-center text-3xl">
        <p className="mr-auto ">{title}</p>
        {note && <p className="text-sm">{note}</p>}
        {prices.map((price) => (
          <p className="min-w-20 text-right">{price}</p>
        ))}
      </div>
      <p className="text-alt">{description}</p>
    </>
  );
}
