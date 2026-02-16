import { Calculator, Menu, Package } from "lucide-react";
import { Button, Drawer, Navbar, NavLink } from "@/shared/ui";
import useToggle from "@/shared/hooks/use-toggle";
import { Outlet, useLocation } from "react-router-dom";
import SkillexIcon from "@/shared/ui/icons/skillex-icon";

// ! In many cases layout will not be placed in shared folder, cause it can have business logic in it.

const links = [
  { to: "/", label: "Products", icon: Package },
  { to: "/bet-calculation", label: "Bet Calculation", icon: Calculator },
] as const;

const Layout = () => {
  const location = useLocation();
  const [drawerOpen, toggleDrawer] = useToggle(false);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar
        ariaLabel="Main navigation"
        brand={
          <a
            href="https://skillex.am/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <SkillexIcon className="size-10" />
            <h1 className="text-xl font-semibold tracking-tight text-zinc-200">
              Skillex Task
            </h1>
          </a>
        }
      >
        {links.map(({ to, label, icon }) => (
          <li key={to} className="hidden sm:list-item">
            <NavLink
              to={to}
              label={label}
              icon={icon}
              isActive={location.pathname === to}
            />
          </li>
        ))}
        <li className="flex-1 flex justify-end sm:hidden">
          <Button
            variant="ghost"
            onClick={() => toggleDrawer(true)}
            aria-label="Open navigation menu"
            className="rounded-md px-2 self-end"
          >
            <Menu className="size-5" aria-hidden />
          </Button>
        </li>
      </Navbar>
      <Drawer open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <ul className="flex flex-col gap-1">
          {links.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                label={label}
                icon={icon}
                isActive={location.pathname === to}
                className="w-full justify-start py-3"
                onClick={() => toggleDrawer(false)}
              />
            </li>
          ))}
        </ul>
      </Drawer>
      <main className="p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
