import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/app_layout.tsx", [
    index("routes/home.tsx"),
    route("menu", "routes/menu.tsx"),
    route("offers", "routes/offers.tsx"),
  ]),
] satisfies RouteConfig;
