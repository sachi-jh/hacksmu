"use client";

import { useLogoutFunction } from "@propelauth/nextjs/client";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default function LogoutButton() {
    const logoutFn = useLogoutFunction();
    return (
        <button
        className="text-2xl mx-3 text-main hover:bg-main hover:text-white px-4 py-2 rounded-2xl transition-colors duration-300"
            onClick={() => {
                logoutFn();
            }}
        >
            Logout
        </button>
    );
}
