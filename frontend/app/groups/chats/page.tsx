"use client";
import React, { useEffect } from "react";
import { Session, Chatbox, Inbox } from "@talkjs/react";
import { useUser } from "@propelauth/nextjs/client";
import Talk from "talkjs";
import { useCallback } from "react";

function Chat() {
    const user = useUser().user;

    useEffect(() => {
        console.log(user);
    }, [user]);

    const syncUser = useCallback(
        () =>
            new Talk.User({
                id: `${user?.firstName}`,
                name: `${user?.firstName} ${user?.lastName}`,
                email: `${user?.email}`,
                photoUrl: `${user?.pictureUrl}`,
            }),
        []
    );

    const syncConversation = useCallback((session: any) => {
        // JavaScript SDK code here
        const conversation =
            session.getOrCreateConversation("new_conversation");

        return conversation;
    }, []);

    return (
        <Session appId="tqe3ix7R" syncUser={syncUser}>
            <Inbox
                syncConversation={syncConversation}
                style={{ width: "100%", height: "1000px" }}
            ></Inbox>
        </Session>
    );
}

export default Chat;
