import { NavLink } from "react-router";
import type { Route } from "../+types";
import { cn } from "~/lib/utils";

export function meta({ params, data }: Route.MetaArgs) {
  const year = params.year || "Nobel Prize Year";
  const categories = data ? Object.keys(data).join(", ") : "various categories";

  return [
    {
      title: `${year} Nobel Prize Winners - Achievements and Laureates`,
    },
    {
      name: "description",
      content: `Discover the Nobel Prize winners of ${year} across ${categories}. Learn about their groundbreaking achievements and contributions.`,
    },
    {
      name: "keywords",
      content: `Nobel Prize ${year}, Nobel Laureates ${year}, Nobel Prize winners, ${categories}, Nobel Prize history, Nobel Prize achievements`,
    },
    {
      property: "og:title",
      content: `${year} Nobel Prize Winners`,
    },
    {
      property: "og:description",
      content: `Explore the laureates of the ${year} Nobel Prizes in ${categories}, recognized for their outstanding contributions to humanity.`,
    },
    {
      property: "og:type",
      content: "article",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: `${year} Nobel Prize Winners`,
    },
    {
      name: "twitter:description",
      content: `Learn about the ${year} Nobel Prize winners in ${categories}.`,
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const searchParams = new URLSearchParams([
    ["limit", "100"],
    ["nobelPrizeYear", params.year as string],
  ]);
  const response = await fetch(
    `http://api.nobelprize.org/2.1/nobelPrizes?${searchParams}`
  );
  const data = await response.json();

  const categoriesAndPrizes = {};
  data.nobelPrizes.forEach((el: any) => {
    //@ts-ignore
    categoriesAndPrizes[el.category.en] = el.laureates || [];
  });

  return categoriesAndPrizes;
}

export default function Year({ loaderData, params }: Route.ComponentProps) {
  return (
    <main className="p-2 max-w-5xl mx-auto">
      <h1 className="scroll-m-20 p-2 sticky top-14 z-10 bg-background text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
        {params.year} Nobel Prize Winners
      </h1>
      <div className="mt-8">
        {Object.keys(loaderData).length === 0 ? (
          <p className="text-center text-muted-foreground">
            No Nobel Prize winners found for {params.year}.
          </p>
        ) : (
          Object.keys(loaderData).map((category) => (
            <section key={category} className="mb-8">
              <h2
                className="scroll-m-20 sticky top-28 bg-background border-b pb-2 text-3xl font-semibold tracking-tight"
                style={{ top: 120 }}
              >
                {category}
              </h2>
              <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 px-2">
                {/* @ts-ignore */}
                {loaderData[category].map((laureate: any) => (
                  <NavLink
                    key={laureate.id}
                    to={`/laureates/${laureate.id}`}
                    aria-label={`Learn more about ${
                      laureate.fullName?.en || laureate.orgName?.en
                    }`}
                  >
                    {({ isPending }) => (
                      <article
                        className={cn(
                          "rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-primary",
                          { "opacity-40": isPending }
                        )}
                      >
                        <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                          {laureate.fullName?.en || laureate.orgName?.en}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {laureate.motivation?.en || "No motivation provided."}
                        </p>
                      </article>
                    )}
                  </NavLink>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}
