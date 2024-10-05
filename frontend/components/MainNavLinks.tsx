"use client";

import * as React from "react";
import Link from "next/link";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { useUser } from "@propelauth/nextjs/client";
import LogoutButton from "./LogoutButton";

export function MainNavLinks() {
    const { loading, user } = useUser();

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Support Groups
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/help" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Excercise
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/login" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Ebby
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    {!user ? (
                        <Link
                            href="https://4525409.propelauthtest.com/"
                            legacyBehavior
                            passHref
                        >
                            <NavigationMenuLink
                                className={`${navigationMenuTriggerStyle()} border: 2px`}
                                style={{
                                    border: "2px solid black",
                                    padding: "16px",
                                }}
                            >
                                Login
                            </NavigationMenuLink>
                        </Link>
                    ) : (
                        <LogoutButton />
                    )}
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default MainNavLinks;
