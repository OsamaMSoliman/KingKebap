import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/app_layout.tsx", [
    route("menu", "routes/menu.tsx"),
    route("offers", "routes/offers.tsx"),
  ]),
] satisfies RouteConfig;
