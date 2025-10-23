import {type RouteConfig, index, route,} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "pages/login-page.tsx")
] satisfies RouteConfig;