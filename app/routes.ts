import {type RouteConfig, index, route,} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "pages/login/index.tsx"),
    route("/register", "pages/register/index.tsx"),
] satisfies RouteConfig;
