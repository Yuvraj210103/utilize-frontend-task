import { useLocation, useNavigate } from "react-router-dom";
import { PageRoutes } from "../@types/enum";
import { useAuthState } from "../store";

const NavItem = ({
  name,
  path,
  callback,
}: {
  name: string;
  path?: string;
  callback?: () => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      onClick={() => (path ? navigate(path) : callback && callback())}
      className={`uppercase cursor-pointer p-2 duration-200 whitespace-nowrap ${
        location.pathname === path ||
        location.pathname.includes(`/${name.toLowerCase()}`)
          ? "bg-surface text-textPrimary"
          : "hover:bg-onHoverBg hover:text-textPrimary"
      }`}
    >
      {name}
    </div>
  );
};

const Nav = () => {
  const { userSignOut } = useAuthState();

  return (
    <div
      className={`flex overflow-x-auto sidebar-scrollbar items-center gap-4 w-full bg-primary text-surface  text-sm p-1 justify-between`}
    >
      <NavItem path={PageRoutes.HOME} name="Home" />

      <NavItem callback={userSignOut} name="Logout" />
    </div>
  );
};

export default Nav;
