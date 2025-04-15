import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, NavLink, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement } from "react";
import { Medal, Loader2, ArrowRight, PartyPopper } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const layout = withComponentProps(function Layout2() {
  return /* @__PURE__ */ jsxs("div", {
    className: "bg-background text-foreground min-h-screen flex flex-col",
    children: [/* @__PURE__ */ jsx("header", {
      className: "w-full h-14 bg-primary text-primary-foreground sticky top-0 z-10 shadow-sm",
      children: /* @__PURE__ */ jsx("nav", {
        className: "max-w-4xl mx-auto h-full flex items-center justify-between px-4",
        children: /* @__PURE__ */ jsxs(NavLink, {
          to: "/",
          className: "flex items-center gap-2",
          children: [/* @__PURE__ */ jsx("div", {
            className: "bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-lg shadow-inner",
            children: /* @__PURE__ */ jsx(Medal, {
              className: "size-4"
            })
          }), /* @__PURE__ */ jsx("span", {
            className: "font-serif text-lg font-semibold",
            children: "Nobel Laureates"
          })]
        })
      })
    }), /* @__PURE__ */ jsx("main", {
      className: "flex-1 max-w-4xl mx-auto w-full p-2",
      children: /* @__PURE__ */ jsx(Outlet, {})
    }), /* @__PURE__ */ jsxs("footer", {
      className: "bg-primary text-primary-foreground py-6 text-center text-sm",
      children: ["Created using", " ", /* @__PURE__ */ jsx(Link, {
        to: "https://reactrouter.com/",
        target: "_blank",
        rel: "nofollow noindex",
        className: "underline hover:opacity-80",
        children: "React Router V7"
      }), " ", "and", " ", /* @__PURE__ */ jsx(Link, {
        to: "https://ui.shadcn.com/",
        target: "_blank",
        rel: "nofollow noindex",
        className: "underline hover:opacity-80",
        children: "ShadCN"
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: layout
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function meta$2({}) {
  return [{
    title: "Nobel Laureates - Explore the World's Greatest Minds"
  }, {
    name: "description",
    content: "Discover the achievements and biographies of Nobel Laureates from 1901 to 2024. Explore by year or category."
  }, {
    name: "keywords",
    content: "Nobel Laureates, Nobel Prize winners, Nobel Prize history, list of Nobel Prize winners, Nobel Prize in Physics, Nobel Prize in Literature, Nobel Prize in Peace"
  }, {
    property: "og:title",
    content: "Nobel Laureates - Explore the World's Greatest Minds"
  }, {
    property: "og:description",
    content: "Discover the achievements and biographies of Nobel Laureates from 1901 to 2024. Explore by year or category."
  }, {
    property: "og:type",
    content: "website"
  }, {
    name: "robots",
    content: "index, follow"
  }];
}
const buttonToNobelByYears = Array.from({
  length: 2024 - 1901 + 1
}, (_, i) => {
  const year = 2024 - i;
  return /* @__PURE__ */ jsx(NavLink, {
    to: `/laureates/year/${year}`,
    children: ({
      isPending
    }) => /* @__PURE__ */ jsxs(Button, {
      variant: "outline",
      className: "w-full",
      children: [year, " Nobel Laureates", " ", isPending ? /* @__PURE__ */ jsx(Loader2, {
        className: "animate-spin"
      }) : /* @__PURE__ */ jsx(ArrowRight, {})]
    })
  }, year);
});
const landingPage = withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("main", {
    className: "max-w-2xl w-full mx-auto",
    children: [/* @__PURE__ */ jsxs("h1", {
      className: "scroll-m-20 mt-20 text-4xl text-center font-extrabold tracking-tight lg:text-5xl",
      children: [/* @__PURE__ */ jsx(Medal, {
        className: "size-8 pb-1 lg:pb-2 lg:size-11 inline mr-2"
      }), "Nobel Laureates"]
    }), /* @__PURE__ */ jsxs("h2", {
      className: "text-lg mt-10 font-semibold",
      children: ["Celebrating the world’s greatest minds", /* @__PURE__ */ jsx(PartyPopper, {
        className: "inline ml-2"
      })]
    }), /* @__PURE__ */ jsx("p", {
      className: "mt-5 text-sm max-w-lg",
      children: "Explore the lives and achievements of Nobel Laureates across science, literature, peace, and more."
    }), /* @__PURE__ */ jsx("p", {
      className: "mt-5 text-sm max-w-lg",
      children: "Since 1901, the Nobel Prize has been awarded to individuals who have conferred the greatest benefit to humankind in the fields of Physics, Chemistry, Medicine, Literature, Peace, and Economic Sciences. This website provides a comprehensive list of all Nobel Laureates, allowing you to explore their lives and achievements by year."
    }), /* @__PURE__ */ jsx("div", {
      className: "flex flex-col gap-4 mt-10",
      children: buttonToNobelByYears
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: landingPage,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({
  params,
  data
}) {
  const year = params.year || "Nobel Prize Year";
  const categories = data ? Object.keys(data).join(", ") : "various categories";
  return [{
    title: `${year} Nobel Prize Winners - Achievements and Laureates`
  }, {
    name: "description",
    content: `Discover the Nobel Prize winners of ${year} across ${categories}. Learn about their groundbreaking achievements and contributions.`
  }, {
    name: "keywords",
    content: `Nobel Prize ${year}, Nobel Laureates ${year}, Nobel Prize winners, ${categories}, Nobel Prize history, Nobel Prize achievements`
  }, {
    property: "og:title",
    content: `${year} Nobel Prize Winners`
  }, {
    property: "og:description",
    content: `Explore the laureates of the ${year} Nobel Prizes in ${categories}, recognized for their outstanding contributions to humanity.`
  }, {
    property: "og:type",
    content: "article"
  }, {
    name: "robots",
    content: "index, follow"
  }, {
    name: "twitter:card",
    content: "summary_large_image"
  }, {
    name: "twitter:title",
    content: `${year} Nobel Prize Winners`
  }, {
    name: "twitter:description",
    content: `Learn about the ${year} Nobel Prize winners in ${categories}.`
  }];
}
async function loader$1({
  params
}) {
  const searchParams = new URLSearchParams([["limit", "100"], ["nobelPrizeYear", params.year]]);
  const response = await fetch(`http://api.nobelprize.org/2.1/nobelPrizes?${searchParams}`);
  const data = await response.json();
  const categoriesAndPrizes = {};
  data.nobelPrizes.forEach((el) => {
    categoriesAndPrizes[el.category.en] = el.laureates || [];
  });
  return categoriesAndPrizes;
}
const index$1 = withComponentProps(function Year({
  loaderData,
  params
}) {
  return /* @__PURE__ */ jsxs("main", {
    className: "p-2 max-w-5xl mx-auto",
    children: [/* @__PURE__ */ jsxs("h1", {
      className: "scroll-m-20 p-2 sticky top-14 z-10 bg-background text-4xl text-center font-extrabold tracking-tight lg:text-5xl",
      children: [params.year, " Nobel Prize Winners"]
    }), /* @__PURE__ */ jsx("div", {
      className: "mt-8",
      children: Object.keys(loaderData).length === 0 ? /* @__PURE__ */ jsxs("p", {
        className: "text-center text-muted-foreground",
        children: ["No Nobel Prize winners found for ", params.year, "."]
      }) : Object.keys(loaderData).map((category) => /* @__PURE__ */ jsxs("section", {
        className: "mb-8",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "scroll-m-20 sticky top-28 bg-background border-b pb-2 text-3xl font-semibold tracking-tight",
          style: {
            top: 120
          },
          children: category
        }), /* @__PURE__ */ jsx("div", {
          className: "grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 px-2",
          children: loaderData[category].map((laureate) => {
            var _a, _b;
            return /* @__PURE__ */ jsx(NavLink, {
              to: `/laureates/${laureate.id}`,
              "aria-label": `Learn more about ${((_a = laureate.fullName) == null ? void 0 : _a.en) || ((_b = laureate.orgName) == null ? void 0 : _b.en)}`,
              children: ({
                isPending
              }) => {
                var _a2, _b2, _c;
                return /* @__PURE__ */ jsxs("article", {
                  className: cn("rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-primary", {
                    "opacity-40": isPending
                  }),
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "text-xl font-serif font-semibold text-primary mb-2",
                    children: ((_a2 = laureate.fullName) == null ? void 0 : _a2.en) || ((_b2 = laureate.orgName) == null ? void 0 : _b2.en)
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-muted-foreground leading-relaxed text-base",
                    children: ((_c = laureate.motivation) == null ? void 0 : _c.en) || "No motivation provided."
                  })]
                });
              }
            }, laureate.id);
          })
        })]
      }, category))
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$1,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({
  data
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const laureate = data == null ? void 0 : data.data[0];
  const wikiData = data == null ? void 0 : data.wikiData;
  const name = ((_a = laureate == null ? void 0 : laureate.fullName) == null ? void 0 : _a.en) || ((_b = laureate == null ? void 0 : laureate.orgName) == null ? void 0 : _b.en) || "Nobel Laureate";
  const category = ((_e = (_d = (_c = laureate == null ? void 0 : laureate.nobelPrizes) == null ? void 0 : _c[0]) == null ? void 0 : _d.categoryFullName) == null ? void 0 : _e.en) || "Nobel Prize";
  const year = ((_g = (_f = laureate == null ? void 0 : laureate.nobelPrizes) == null ? void 0 : _f[0]) == null ? void 0 : _g.dateAwarded) ? new Date(laureate.nobelPrizes[0].dateAwarded).getFullYear() : "unknown year";
  const description = (wikiData == null ? void 0 : wikiData.extract) ? `${wikiData.extract.substring(0, 150)}...` : `Explore the life, achievements, and Nobel Prize details of ${name}, awarded the ${category} in ${year}.`;
  return [{
    title: `${name} - ${category} ${year} | Nobel Laureate Details`
  }, {
    name: "description",
    content: description
  }, {
    name: "keywords",
    content: `${name}, Nobel Laureate, Nobel Prize ${year}, ${category}, ${(wikiData == null ? void 0 : wikiData.description) || ""}, Nobel Prize winners, Nobel Prize biography, Nobel Prize achievements`
  }, {
    property: "og:title",
    content: `${name} - ${category} ${year}`
  }, {
    property: "og:description",
    content: description
  }, {
    property: "og:type",
    content: "profile"
  }, {
    property: "og:image",
    content: ((_h = wikiData == null ? void 0 : wikiData.thumbnail) == null ? void 0 : _h.source) || ((_i = wikiData == null ? void 0 : wikiData.originalimage) == null ? void 0 : _i.source) || ""
  }, {
    name: "robots",
    content: "index, follow"
  }, {
    name: "twitter:card",
    content: "summary_large_image"
  }, {
    name: "twitter:title",
    content: `${name} - ${category} ${year}`
  }, {
    name: "twitter:description",
    content: `Learn about ${name}'s Nobel Prize in ${category} for ${year}.`
  }, {
    name: "twitter:image",
    content: ((_j = wikiData == null ? void 0 : wikiData.thumbnail) == null ? void 0 : _j.source) || ((_k = wikiData == null ? void 0 : wikiData.originalimage) == null ? void 0 : _k.source) || ""
  }];
}
async function loader({
  params
}) {
  const response = await fetch(`http://api.nobelprize.org/2.1/laureate/${params.id}`);
  const data = await response.json();
  const wikiDataRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${data[0].wikipedia.slug}`);
  const wikiData = await wikiDataRes.json();
  return {
    data,
    wikiData
  };
}
const index = withComponentProps(function Laureate({
  loaderData
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  const laureate = loaderData.data[0];
  const wikiData = loaderData.wikiData;
  return /* @__PURE__ */ jsxs("main", {
    className: "p-4 max-w-3xl mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "scroll-m-20 mt-16 text-4xl font-serif font-extrabold tracking-tight text-center lg:text-5xl",
      children: ((_a = laureate.fullName) == null ? void 0 : _a.en) || laureate.orgName.en
    }), ((_b = wikiData == null ? void 0 : wikiData.thumbnail) == null ? void 0 : _b.source) && /* @__PURE__ */ jsx("img", {
      src: wikiData.thumbnail.source,
      alt: `${((_c = laureate.fullName) == null ? void 0 : _c.en) || laureate.orgName.en}, Nobel Laureate`,
      className: "mx-auto my-6 w-full max-w-xs rounded-xl border border-border bg-muted shadow-md",
      style: {
        height: wikiData.thumbnail.height / wikiData.thumbnail.width * 300,
        width: 300
      }
    }), /* @__PURE__ */ jsxs("section", {
      className: "mb-6 space-y-1 text-muted-foreground text-sm",
      children: [/* @__PURE__ */ jsxs("p", {
        children: [/* @__PURE__ */ jsx("strong", {
          className: "text-foreground",
          children: "Born:"
        }), " ", ((_d = laureate == null ? void 0 : laureate.birth) == null ? void 0 : _d.date) || ((_e = laureate == null ? void 0 : laureate.founded) == null ? void 0 : _e.date) || "Unknown", " in", " ", ((_h = (_g = (_f = laureate == null ? void 0 : laureate.birth) == null ? void 0 : _f.place) == null ? void 0 : _g.locationString) == null ? void 0 : _h.en) || ((_k = (_j = (_i = laureate == null ? void 0 : laureate.founded) == null ? void 0 : _i.place) == null ? void 0 : _j.locationString) == null ? void 0 : _k.en) || "Unknown location"]
      }), laureate.gender && /* @__PURE__ */ jsxs("p", {
        children: [/* @__PURE__ */ jsx("strong", {
          className: "text-foreground",
          children: "Gender:"
        }), " ", laureate.gender]
      }), (wikiData == null ? void 0 : wikiData.description) && /* @__PURE__ */ jsxs("p", {
        children: [/* @__PURE__ */ jsx("strong", {
          className: "text-foreground",
          children: "Field:"
        }), " ", wikiData.description]
      })]
    }), (wikiData == null ? void 0 : wikiData.extract) && /* @__PURE__ */ jsxs("section", {
      className: "mb-6",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-semibold text-primary mb-2",
        children: "Biography"
      }), /* @__PURE__ */ jsx("div", {
        className: "text-sm text-muted-foreground prose",
        dangerouslySetInnerHTML: {
          __html: wikiData.extract_html
        }
      }), ((_m = (_l = wikiData == null ? void 0 : wikiData.content_urls) == null ? void 0 : _l.desktop) == null ? void 0 : _m.page) && /* @__PURE__ */ jsx("p", {
        className: "mt-4",
        children: /* @__PURE__ */ jsx("a", {
          href: wikiData.content_urls.desktop.page,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-sm font-medium text-primary underline hover:text-primary/80 transition",
          children: "Read more on Wikipedia →"
        })
      })]
    }), /* @__PURE__ */ jsxs("section", {
      className: "space-y-6",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-semibold text-primary mb-2",
        children: "Nobel Prize Details"
      }), (_n = laureate.nobelPrizes) == null ? void 0 : _n.map(({
        affiliations,
        dateAwarded,
        categoryFullName,
        motivation
      }, i) => {
        const year = new Date(dateAwarded).getFullYear();
        return /* @__PURE__ */ jsxs("article", {
          className: "rounded-lg border border-border bg-card p-4 shadow-sm",
          children: [/* @__PURE__ */ jsxs("h3", {
            className: "text-base text-primary font-medium mb-1",
            children: [categoryFullName.en, " ", year]
          }), /* @__PURE__ */ jsxs("p", {
            className: "text-sm text-muted-foreground mb-2",
            children: ["Awarded on: ", dateAwarded]
          }), /* @__PURE__ */ jsxs("p", {
            className: "text-sm mb-3 italic",
            children: ['"', motivation.en, '"']
          }), (affiliations == null ? void 0 : affiliations.length) > 0 && /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-sm text-foreground font-semibold",
              children: "Affiliations:"
            }), /* @__PURE__ */ jsx("ul", {
              className: "list-disc ml-6 text-sm text-muted-foreground mb-4",
              children: affiliations.map((aff, j) => {
                var _a2, _b2;
                return /* @__PURE__ */ jsxs("li", {
                  children: [(_a2 = aff.name) == null ? void 0 : _a2.en, " – ", (_b2 = aff.locationString) == null ? void 0 : _b2.en]
                }, j);
              })
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-4 text-right",
            children: /* @__PURE__ */ jsxs(NavLink, {
              to: `/laureates/year/${year}`,
              className: "inline-block text-sm font-medium text-primary underline hover:text-primary/80 transition",
              children: ["View all Nobel Prizes from ", year, " →"]
            })
          })]
        }, i);
      })]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BY56KDw8.js", "imports": ["/assets/chunk-GNGMS2XR-DwajmGVO.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-iuIPNzEj.js", "imports": ["/assets/chunk-GNGMS2XR-DwajmGVO.js", "/assets/with-props-D0Kq-uZP.js"], "css": ["/assets/root-Bv-v5WRQ.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/layout": { "id": "routes/layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/layout-BccRSYBf.js", "imports": ["/assets/with-props-D0Kq-uZP.js", "/assets/chunk-GNGMS2XR-DwajmGVO.js", "/assets/medal-BLB_9N7J.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/landing-page": { "id": "routes/landing-page", "parentId": "routes/layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/landing-page-DhtAZu_p.js", "imports": ["/assets/with-props-D0Kq-uZP.js", "/assets/chunk-GNGMS2XR-DwajmGVO.js", "/assets/utils-eOuC519h.js", "/assets/medal-BLB_9N7J.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/laureates/year/index": { "id": "routes/laureates/year/index", "parentId": "routes/layout", "path": "laureates/year/:year", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-eP2An-ng.js", "imports": ["/assets/with-props-D0Kq-uZP.js", "/assets/chunk-GNGMS2XR-DwajmGVO.js", "/assets/utils-eOuC519h.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/laureates/index": { "id": "routes/laureates/index", "parentId": "routes/layout", "path": "laureates/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-AXFoDHNa.js", "imports": ["/assets/with-props-D0Kq-uZP.js", "/assets/chunk-GNGMS2XR-DwajmGVO.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-767af1b6.js", "version": "767af1b6" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/layout": {
    id: "routes/layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/landing-page": {
    id: "routes/landing-page",
    parentId: "routes/layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/laureates/year/index": {
    id: "routes/laureates/year/index",
    parentId: "routes/layout",
    path: "laureates/year/:year",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/laureates/index": {
    id: "routes/laureates/index",
    parentId: "routes/layout",
    path: "laureates/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
