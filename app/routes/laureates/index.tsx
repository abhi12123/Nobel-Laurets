import type { NobelLaureate } from "~/IModels";
import type { Route } from "./+types";
import { NavLink } from "react-router";

export function meta({ data }: Route.MetaArgs) {
  const laureate = data?.data[0];
  const wikiData = data?.wikiData;
  const name =
    laureate?.fullName?.en || laureate?.orgName?.en || "Nobel Laureate";
  const category =
    laureate?.nobelPrizes?.[0]?.categoryFullName?.en || "Nobel Prize";
  const year = laureate?.nobelPrizes?.[0]?.dateAwarded
    ? new Date(laureate.nobelPrizes[0].dateAwarded).getFullYear()
    : "unknown year";
  const description = wikiData?.extract
    ? `${wikiData.extract.substring(0, 150)}...`
    : `Explore the life, achievements, and Nobel Prize details of ${name}, awarded the ${category} in ${year}.`;

  return [
    { title: `${name} - ${category} ${year} | Nobel Laureate Details` },
    {
      name: "description",
      content: description,
    },
    {
      name: "keywords",
      content: `${name}, Nobel Laureate, Nobel Prize ${year}, ${category}, ${
        wikiData?.description || ""
      }, Nobel Prize winners, Nobel Prize biography, Nobel Prize achievements`,
    },
    {
      property: "og:title",
      content: `${name} - ${category} ${year}`,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:type",
      content: "profile",
    },
    {
      property: "og:image",
      content:
        wikiData?.thumbnail?.source || wikiData?.originalimage?.source || "",
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
      content: `${name} - ${category} ${year}`,
    },
    {
      name: "twitter:description",
      content: `Learn about ${name}'s Nobel Prize in ${category} for ${year}.`,
    },
    {
      name: "twitter:image",
      content:
        wikiData?.thumbnail?.source || wikiData?.originalimage?.source || "",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(
    `http://api.nobelprize.org/2.1/laureate/${params.id}`
  );
  const data: NobelLaureate[] = await response.json();

  const wikiDataRes = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${data[0].wikipedia.slug}`
  );
  const wikiData = await wikiDataRes.json();

  return {
    data,
    wikiData,
  };
}

export default function Laureate({ loaderData }: Route.ComponentProps) {
  const laureate = loaderData.data[0];
  const wikiData = loaderData.wikiData;

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="scroll-m-20 mt-16 text-4xl font-serif font-extrabold tracking-tight text-center lg:text-5xl">
        {laureate.fullName?.en || laureate.orgName.en}
      </h1>

      {wikiData?.thumbnail?.source && (
        <img
          src={wikiData.thumbnail.source}
          alt={`${
            laureate.fullName?.en || laureate.orgName.en
          }, Nobel Laureate`}
          className="mx-auto my-6 w-full max-w-xs rounded-xl border border-border bg-muted shadow-md"
          style={{
            height:
              (wikiData.thumbnail.height / wikiData.thumbnail.width) * 300,
            width: 300,
          }}
        />
      )}

      <section className="mb-6 space-y-1 text-muted-foreground text-sm">
        <p>
          <strong className="text-foreground">Born:</strong>{" "}
          {laureate?.birth?.date || laureate?.founded?.date || "Unknown"} in{" "}
          {laureate?.birth?.place?.locationString?.en ||
            laureate?.founded?.place?.locationString?.en ||
            "Unknown location"}
        </p>
        {laureate.gender && (
          <p>
            <strong className="text-foreground">Gender:</strong>{" "}
            {laureate.gender}
          </p>
        )}
        {wikiData?.description && (
          <p>
            <strong className="text-foreground">Field:</strong>{" "}
            {wikiData.description}
          </p>
        )}
      </section>

      {wikiData?.extract && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-2">
            Biography
          </h2>
          <div
            className="text-sm text-muted-foreground prose"
            dangerouslySetInnerHTML={{ __html: wikiData.extract_html }}
          />
          {wikiData?.content_urls?.desktop?.page && (
            <p className="mt-4">
              <a
                href={wikiData.content_urls.desktop.page}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary underline hover:text-primary/80 transition"
              >
                Read more on Wikipedia →
              </a>
            </p>
          )}
        </section>
      )}

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-primary mb-2">
          Nobel Prize Details
        </h2>
        {laureate.nobelPrizes?.map(
          ({ affiliations, dateAwarded, categoryFullName, motivation }, i) => {
            const year = new Date(dateAwarded).getFullYear();

            return (
              <article
                key={i}
                className="rounded-lg border border-border bg-card p-4 shadow-sm"
              >
                <h3 className="text-base text-primary font-medium mb-1">
                  {categoryFullName.en} {year}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Awarded on: {dateAwarded}
                </p>
                <p className="text-sm mb-3 italic">"{motivation.en}"</p>

                {affiliations?.length > 0 && (
                  <>
                    <p className="text-sm text-foreground font-semibold">
                      Affiliations:
                    </p>
                    <ul className="list-disc ml-6 text-sm text-muted-foreground mb-4">
                      {affiliations.map((aff, j) => (
                        <li key={j}>
                          {aff.name?.en} – {aff.locationString?.en}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="mt-4 text-right">
                  <NavLink
                    to={`/laureates/year/${year}`}
                    className="inline-block text-sm font-medium text-primary underline hover:text-primary/80 transition"
                  >
                    View all Nobel Prizes from {year} →
                  </NavLink>
                </div>
              </article>
            );
          }
        )}
      </section>
    </main>
  );
}
