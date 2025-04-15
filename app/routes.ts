import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/landing-page.tsx"),
    route("laureates/year/:year", "routes/laureates/year/index.tsx"),
    route("laureates/:id", "routes/laureates/index.tsx"),
  ]),
] satisfies RouteConfig;
