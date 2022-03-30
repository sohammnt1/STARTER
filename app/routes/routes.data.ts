import { Route } from "./routes.types";
import UserRouter from "../modules/user/user.routes";
import MasterModuleRouter from "../modules/masterModule/masterModule.routes";

export const routes = [
  new Route("/user", UserRouter),
  new Route("/mastermodule", MasterModuleRouter),
];

export const excludedPaths = [
  { method: "POST", route: "/user/login" },
  { method: "GET", route: "/mastermodule/display" },
];
