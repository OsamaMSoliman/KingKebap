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
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
