import {Outlet} from "react-router";
import {AuthProvider} from "../../../context/auth-context";

export default function DashboardLayout() {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
}
