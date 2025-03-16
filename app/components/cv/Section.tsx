import type { ReactNode } from "react";

interface IProps {
  header: string;
  children: ReactNode;
}

export default function Section({ header, children }: IProps) {
  return (
    <>
      <div className="flex gap-2">
        <p className="text-2xl">{header}</p>
        <div className="grow border-b" />
      </div>
      {children}
    </>
  );
}
