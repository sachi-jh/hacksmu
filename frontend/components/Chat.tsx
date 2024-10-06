"use client";
import React, { useEffect, useCallback } from "react";
import { Session, Inbox } from "@talkjs/react";
import { useUser } from "@propelauth/nextjs/client";
import Talk from "talkjs";

export default function Chat(props: any) {
    const { user } = useUser();

    useEffect(() => {
        console.log(user);
    }, [user]);

    const syncUser = useCallback(() => {
        return new Talk.User({
            id: `${user?.email}`,
            name: `anonymous`,
            email: `anonymous`,
            photoUrl: `${user?.pictureUrl}` || "", // Provide an empty string if photoUrl is missing
        });
    }, [user]);

    // Ensure user data is fully available before rendering the Session
    if (!user || !user.email || !user.firstName || !user.lastName) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Session appId="tqe3ix7R" syncUser={syncUser}>
                <Inbox
                    conversationId={props.conversationID}
                    className="w-full h-[calc(100vh-6rem)]"
                />
            </Session>
        </div>
    );
}
