import { Outlet } from "react-router";

export default function () {
  return (
    <div className="flex-col p-4">
      <Outlet />
    </div>
  );
}
