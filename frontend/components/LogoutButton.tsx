"use client";

import { useLogoutFunction } from "@propelauth/nextjs/client";

export default function LogoutButton() {
    const logoutFn = useLogoutFunction();
    return (
        <button
            onClick={() => {
                logoutFn();
                console.log("Logout button clicked");
            }}
        >
            Logout
        </button>
    );
}
