interface IProps {
  header: React.ReactNode;
  children: React.ReactNode[];
}

export default function ({ header, children }: IProps) {
  return (
    <div className="mb-8">
      {header}
      <ul>
        {children.map((item, index) => (
          <li key={index} className="my-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
