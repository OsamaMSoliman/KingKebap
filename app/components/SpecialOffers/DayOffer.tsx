import { Link } from 'react-router';

interface IProps {
  title: string;
  food: string;
  price: string;
  note?: string;
  to: Parameters<typeof Link>[0]['to'];
  // to: LinkProps['to'];
}

export default function ({
  title,
  food,
  price,
  note = '*Gutlig nur bei Abholung',
  to,
}: IProps) {
  return (
    <Link to={to}>
      <div className="m-4 flex bg-white">
        <div className="flex-3 flex-col text-center">
          <p className="text-lg font-semibold text-red-500">{title}</p>
          <p className="text-3xl font-bold text-black">{food}</p>
          <p className="text-sm text-red-500 underline">{note}</p>
        </div>
        <button
          className="flex flex-1 items-center justify-center bg-red-500 pr-2 pl-8 hover:bg-red-700"
          style={{ clipPath: 'polygon(100% 0,  100% 100%, 0 100%, 25% 0)' }}
        >
          <p className="text-3xl font-bold text-nowrap">{`${price} Є`}</p>
        </button>
      </div>
    </Link>
  );
}
