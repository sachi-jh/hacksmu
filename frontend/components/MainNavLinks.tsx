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
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function MainNavLinks() {
    const { loading, user } = useUser();
    const router = useRouter();

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/groups" legacyBehavior passHref>
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
                            >
                                Login
                            </NavigationMenuLink>
                        </Link>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="hover:bg-main hover:text-white py-2 px-3 rounded-3xl text-2xl text-main"
                            onClick={() =>
                                router.push(
                                    "https://4525409.propelauthtest.com/account"
                                )
                            }
                        >
                            Profile
                        </motion.button>
                    )}
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default MainNavLinks;
