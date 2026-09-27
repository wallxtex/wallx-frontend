import { IoPersonOutline, IoBriefcaseOutline } from "react-icons/io5";

const MAIN_NAV_LINKS = [
  { name: "Painters", path: "/painters" },
  { name: "Dealers", path: "/dealers" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/products" },
];

const AUTH_NAV_LINKS = [
  { name: "Painter Login", path: "/painter-login", icon: IoPersonOutline },
  { name: "Dealer Login", path: "/dealer-login", icon: IoBriefcaseOutline },
];
export { MAIN_NAV_LINKS, AUTH_NAV_LINKS };