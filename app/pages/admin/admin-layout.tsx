import {AuthAdminProvider, useAdminAuth} from "../../../context/auth-admin-context";
import {Outlet, useNavigate} from "react-router";
import {useEffect} from "react";

export default function AdminLayout() {
    return (
        <AuthAdminProvider>
            <Outlet />
        </AuthAdminProvider>
    );
}
