import type { ReactNode } from "react";

interface IProps {
  tl: string /* top-left */;
  tr?: string /* top-right */;
  br?: string /* bottom-right */;
  bl?: string /* bottom-left */;
  children?: ReactNode;
}
export default function Grid4x4({ tr, tl, br, bl, children }: IProps) {
  return (
    <>
      <div className="flex justify-between">
        <p className="bg-red-500">{tl}</p>
        <p className="bg-blue-500">{tr}</p>
      </div>
      <div className="flex justify-between">
        <p className="bg-yellow-500">{bl}</p>
        <p className="bg-green-500">{br}</p>
      </div>
      {children}
    </>
  );
}
