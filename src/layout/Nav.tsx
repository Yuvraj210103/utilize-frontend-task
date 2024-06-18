import { useLocation, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { useAuthState } from "../store";
import { openContextModal } from "@mantine/modals";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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
  const { userSignOut, authUser } = useAuthState();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div
      className={`flex overflow-x-auto sidebar-scrollbar items-center gap-4 w-full bg-primary text-surface  text-sm p-1 justify-between px-6`}
    >
      <Drawer opened={opened} onClose={close} title="Your Details">
        <div className="flex flex-col">
          <div className="flex items-center justify-start w-full mb-4">
            <img
              src={authUser?.picture}
              alt=""
              className="rounded-full object-cover"
            />
          </div>
          <div>
            Name: <span className="font-medium">{authUser?.name}</span>
          </div>
          <div>
            Email: <span className="font-medium">{authUser?.email}</span>
          </div>
        </div>
      </Drawer>

      <FaRegUser
        className="text-xl font-semibold cursor-pointer hover:scale-105 duration-200"
        onClick={open}
      />

      <NavItem
        callback={() => {
          openContextModal({
            modal: "confirmModal",
            withCloseButton: false,
            centered: true,
            closeOnClickOutside: true,
            innerProps: {
              title: "Confirm",
              body: "Are you sure to sign out",
              onConfirm: () => {
                userSignOut();
              },
            },
            size: "30%",
            styles: {
              body: { padding: "0px" },
            },
          });
        }}
        name="Logout"
      />
    </div>
  );
};

export default Nav;
