import { Button } from "~/components/ui/button";
import type { Route } from "./+types/landing-page";
import { ArrowRight, Loader2, Medal, PartyPopper } from "lucide-react";
import { NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nobel Laureates - Explore the World's Greatest Minds" },
    {
      name: "description",
      content:
        "Discover the achievements and biographies of Nobel Laureates from 1901 to 2024. Explore by year or category.",
    },
    {
      name: "keywords",
      content:
        "Nobel Laureates, Nobel Prize winners, Nobel Prize history, list of Nobel Prize winners, Nobel Prize in Physics, Nobel Prize in Literature, Nobel Prize in Peace",
    },
    {
      property: "og:title",
      content: "Nobel Laureates - Explore the World's Greatest Minds",
    },
    {
      property: "og:description",
      content:
        "Discover the achievements and biographies of Nobel Laureates from 1901 to 2024. Explore by year or category.",
    },
    { property: "og:type", content: "website" },
    { name: "robots", content: "index, follow" },
  ];
}

const buttonToNobelByYears = Array.from({ length: 2024 - 1901 + 1 }, (_, i) => {
  const year = 2024 - i;
  return (
    <NavLink key={year} to={`/laureates/year/${year}`}>
      {({ isPending }) => (
        <Button variant="outline" className="w-full">
          {year} Nobel Laureates{" "}
          {isPending ? <Loader2 className="animate-spin" /> : <ArrowRight />}
        </Button>
      )}
    </NavLink>
  );
});

export default function Home() {
  return (
    <main className="max-w-2xl w-full mx-auto">
      <h1 className="scroll-m-20 mt-20 text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
        <Medal className="size-8 pb-1 lg:pb-2 lg:size-11 inline mr-2" />
        Nobel Laureates
      </h1>
      <h2 className="text-lg mt-10 font-semibold">
        Celebrating the world’s greatest minds
        <PartyPopper className="inline ml-2" />
      </h2>
      <p className="mt-5 text-sm max-w-lg">
        Explore the lives and achievements of Nobel Laureates across science,
        literature, peace, and more.
      </p>
      <p className="mt-5 text-sm max-w-lg">
        Since 1901, the Nobel Prize has been awarded to individuals who have
        conferred the greatest benefit to humankind in the fields of Physics,
        Chemistry, Medicine, Literature, Peace, and Economic Sciences. This
        website provides a comprehensive list of all Nobel Laureates, allowing
        you to explore their lives and achievements by year.
      </p>
      <div className="flex flex-col gap-4 mt-10">{buttonToNobelByYears}</div>
    </main>
  );
}
