import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route('contact', 'routes/contact.tsx'),
  layout('routes/app_layout.tsx', [
    index('routes/home.tsx'),
    route('menu', 'routes/menu.tsx'),
    route('offers', 'routes/offers.tsx'),
    route('combo-meals', 'routes/combo-meals.tsx'),
  ]),
] satisfies RouteConfig;
