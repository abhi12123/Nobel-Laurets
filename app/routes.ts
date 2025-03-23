import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [index("routes/landing-page.tsx")]),
] satisfies RouteConfig;
