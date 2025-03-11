interface IProps {
  title: string;
  note?: string;
  description?: string;
}

export default function ({ title, description, note }: IProps) {
  return (
    <div className={`sticky top-0 mb-${description ? 0 : 4} bg-black`}>
      <div className="flex items-end bg-red-500 p-1">
        <p className="mr-auto text-2xl font-bold">{title}</p>
        {/* absolute right-0 bottom-6 m-auto */}
        {note && <p className="text-center text-sm">{note}</p>}
      </div>
      <p className="text-red-500">{description}</p>
    </div>
  );
}
