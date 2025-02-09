interface IProps {
  title: string;
  food: string;
  price: string;
  note?: string;
}

export default function ({
  title,
  food,
  price,
  note = "*Gutlig nur bei Abholung",
}: IProps) {
  return (
    <div className="flex p-4">
      <div className="flex-col bg-white flex-3 text-center">
        <p className="text-red-500 font-semibold text-lg">{title}</p>
        <p className="text-black font-bold text-5xl">{food}</p>
        <p className="text-red-500 text-sm">{note}</p>
      </div>
      <div
        className="w-0"
        style={{
          borderLeft: "4em solid white",
          borderBottom: "6em solid var(--color-red-500)",
        }}
      />
      <div className="bg-red-500 flex-1 flex items-center justify-center">
        <p className="text-6xl font-bold">{price}</p>
      </div>
    </div>
  );
}
