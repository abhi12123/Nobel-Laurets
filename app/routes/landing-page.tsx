import LandingPage from "~/pages/landing-page";
import type { Route } from "./+types/landing-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <LandingPage />;
}
