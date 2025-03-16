interface IProps {
  tags: string[];
}

export default function Tags({ tags }: IProps) {
  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <Tag tag={tag} />
      ))}
    </div>
  );
}

function Tag({ tag }: { tag: string }) {
  return <div className="w-fit rounded-md px-1 shadow-md">{tag}</div>;
  return <div className="w-fit rounded px-1 ring">{tag}</div>;
  return <div className="w-fit rounded-md px-1 inset-shadow-sm">{tag}</div>;
}
