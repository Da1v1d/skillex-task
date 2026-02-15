import { Calculator, Package } from "lucide-react";
import { Navbar, NavLink } from "@/shared/ui";
import { Outlet, useLocation } from "react-router-dom";
import SkillexIcon from "@/shared/ui/icons/skillex-icon";

// ! In many cases layout will not be placed in shared folder, cause it can have business logic in it.

const links = [
  { to: "/", label: "Products", icon: Package },
  { to: "/bet-calculation", label: "Bet Calculation", icon: Calculator },
] as const;

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar
        ariaLabel="Main navigation"
        brand={
          <>
            <SkillexIcon className="size-10" />
            <h1 className="text-xl font-semibold tracking-tight text-zinc-200">
              Skillex Task
            </h1>
          </>
        }
      >
        {links.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              label={label}
              icon={icon}
              isActive={location.pathname === to}
            />
          </li>
        ))}
      </Navbar>
      <main className="p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
