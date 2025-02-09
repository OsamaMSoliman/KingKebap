interface IProps {
    id?: string;
    title: string;
    note?: string;
    description?: string;
    prices: string[];
  }
  
  export default function ({ title, description, note, prices }: IProps) {
    return (
      <div className="sticky top-0 mb-8 bg-black">
        <div className="bg-alt flex p-1 items-end">
          <p className="mr-auto text-3xl font-bold">{title}</p>
          {/* absolute right-0 bottom-6 m-auto */}
          {note && <p className="text-sm text-center">{note}</p>}
          {prices.map((price) => (
            <p className="min-w-20 text-right">{price}</p>
          ))}
        </div>
        <p className="text-alt">{description}</p>
      </div>
    );
  }
  