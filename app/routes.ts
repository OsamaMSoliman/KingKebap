import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  layout('routes/app_layout.tsx', [
    index('routes/home.tsx'),
    route('menu', 'routes/menu.tsx'),
    route('offers', 'routes/offers.tsx'),
    route('combo-meals', 'routes/combo-meals.tsx'),
  ]),
  ...prefix('api', [route('checkout', 'routes/checkout.ts')]),
] satisfies RouteConfig;
