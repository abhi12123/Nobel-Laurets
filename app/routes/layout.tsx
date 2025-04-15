import { Medal } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full h-14 bg-primary text-primary-foreground sticky top-0 z-10 shadow-sm">
        <nav className="max-w-4xl mx-auto h-full flex items-center justify-between px-4">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-9 items-center justify-center rounded-lg shadow-inner">
              <Medal className="size-4" />
            </div>
            <span className="font-serif text-lg font-semibold">
              Nobel Laureates
            </span>
          </NavLink>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-2">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-6 text-center text-sm">
        Created using{" "}
        <Link
          to="https://reactrouter.com/"
          target="_blank"
          rel="nofollow noindex"
          className="underline hover:opacity-80"
        >
          React Router V7
        </Link>{" "}
        and{" "}
        <Link
          to="https://ui.shadcn.com/"
          target="_blank"
          rel="nofollow noindex"
          className="underline hover:opacity-80"
        >
          ShadCN
        </Link>
      </footer>
    </div>
  );
}
