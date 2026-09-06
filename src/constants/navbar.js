import { IoPersonOutline, IoBriefcaseOutline } from "react-icons/io5";

const MAIN_NAV_LINKS = [
  { name: "Painters", path: "/painters" },
  { name: "Dealers", path: "/dealers" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/product" },
];

const AUTH_NAV_LINKS = [
  { name: "Painter Signup", path: "/painter-signup", icon: IoPersonOutline },
  { name: "Dealer Signup", path: "/dealer-signup", icon: IoBriefcaseOutline },
];
export { MAIN_NAV_LINKS, AUTH_NAV_LINKS };
