import {type RouteConfig, index, route,} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "pages/access/login/index.tsx"),
    route("/register", "pages/access/register/index.tsx"),
    route("/recovery", "pages/access/recovery/index.tsx"),
    route("/dashboard", "pages/dashboard/index.tsx"),
    route("/admin", "pages/admin/dashboard/index.tsx"),
    route("/admin/new", "pages/admin/register/index.tsx"),
    route("/admin/login", "pages/admin/access/index.tsx"),
] satisfies RouteConfig;
