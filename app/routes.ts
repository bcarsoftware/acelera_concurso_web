import {type RouteConfig, index, route,} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/register", "pages/access/register/index.tsx"),
    route("/recovery", "pages/access/recovery/index.tsx"),

    route("", "pages/dashboard/dashboard-layout.tsx", [
        route("/dashboard", "pages/dashboard/index.tsx"),
        route("/login", "pages/access/login/index.tsx"),
    ]),
    route("/admin", "pages/admin/admin-layout.tsx", [
        route("", "pages/admin/dashboard/index.tsx"),
        route("new", "pages/admin/register/index.tsx"),
        route("login", "pages/admin/access/index.tsx"),
    ]),
] satisfies RouteConfig;
