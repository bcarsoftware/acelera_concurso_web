import {AuthAdminProvider} from "../../../context/auth-admin-context";
import {Outlet} from "react-router";

export default function AdminLayout() {
    return (
        <AuthAdminProvider>
            <Outlet />
        </AuthAdminProvider>
    );
}
