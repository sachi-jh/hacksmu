"use client";
import React, { useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@propelauth/nextjs/client";
import Talk from "talkjs";

export default function JoinGroup(props: any) {
    const user = useUser().user;
    const [talkSession, setTalkSession] = useState<any>(null);
    const [hasJoined, setHasJoined] = useState(false); // Track if the user has joined the conversation

    useEffect(() => {
        if (user) {
            const currentUser = new Talk.User({
                id: `${user?.firstName}`,
                name: `${user?.firstName} ${user?.lastName}`,
                email: `${user?.email}`,
                photoUrl: `${user?.pictureUrl}`,
            });

            Talk.ready.then(() => {
                const session = new Talk.Session({
                    appId: "tqe3ix7R",
                    me: currentUser,
                });

                setTalkSession(session);
            });
        }
    }, [user]);

    const handleJoinChat = useCallback(() => {
        if (talkSession) {
            const conversation = talkSession.getOrCreateConversation(
                `${props.name}`
            );
            conversation.setParticipant(talkSession.me);

            // Change the button text after joining
            setHasJoined(true);

            // Optionally display the chatbox, or any additional logic
            console.log("User added to the conversation", conversation);
        }
    }, [talkSession, props.name]);

    return (
        <div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleJoinChat} // Trigger conversation creation here
                className="cursor-pointer shadow-2xl rounded-3xl p-16 border border-gray-400 border-opacity-40 h-fit w-fit flex justify-center"
            >
                <h1 className="text-lg font-bold">
                    {hasJoined ? "Joined" : props.name}
                </h1>{" "}
                {/* Conditionally render the button text */}
            </motion.button>
        </div>
    );
}
