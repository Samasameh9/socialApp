import {
  Navbar as HeroNav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function Navbar() {
  let { userToken, setuserToken ,UserDetails} = useContext(AuthContext);
 
  
  let navigate = useNavigate();
  function Logout() {
    localStorage.removeItem("token");
    setuserToken(null);
    navigate("/");
  }
  return (
    <HeroNav className="h-20 bg-gray-200 ">
      <NavbarBrand>
        <p className="font-bold   text-2xl text-green-700">Social App</p>
      </NavbarBrand>
      {userToken != null ? (
        <>
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform  cursor-pointer "
                  classNames={{
                    base: "rounded-full w-10 h-10",
                    img: "rounded-full",
                  }}
                  color="success"
                  name="Jason Hughes"
                  size="sm"
                  src={UserDetails?.photo}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="Profile"
                  as={Link}
                  href="/profile"
                  className="text-green-700"
                >
                  Profile
                </DropdownItem>
                 <DropdownItem
                  key="Home"
                  as={Link}
                  href="/home"
                  className="text-green-700"
                >
                  Home
                </DropdownItem>
                <DropdownItem
                  key="ChangePass"
                  as={Link}
                  href="/changepassword"
                  className="text-green-700"
                >
                  Change password
                </DropdownItem>
                <DropdownItem onClick={Logout} key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </>
      ) : (
        <NavbarContent className=" ms-auto flex  gap-4 me-10" justify="center">
          <NavbarItem isActive>
            <NavLink
              to="/register"
              aria-current="page"
              color="secondary"
              className="text-lg"
            >
              Register
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to="/" color="foreground" className="text-lg">
              Login
            </NavLink>
          </NavbarItem>
        </NavbarContent>
      )}
    </HeroNav>
  );
}
