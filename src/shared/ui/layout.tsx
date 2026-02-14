import { cn } from "@/shared/lib/utils";
import { Navbar } from "@/shared/ui";
import { Outlet, Link, useLocation } from "react-router-dom";

// ! In many cases layout will not be placed in shared folder, cause it can have business logic in it.

const links = [
  { to: "/", label: "Products" },
  { to: "/bet-calculation", label: "Bet Calculation" },
];

const Layout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar ariaLabel="Main navigation">
        {links.map(({ to, label }) => {
          const isActive = location.pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                className={cn(
                  "text-zinc-300 hover:text-white",
                  isActive && "text-primary",
                )}
                tabIndex={0}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </Navbar>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
