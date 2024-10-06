"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useUser } from "@propelauth/nextjs/client";
import Talk from "talkjs";

export default function JoinGroup(props: any) {
    const { user } = useUser();
    const [talkSession, setTalkSession] = useState<any>(null);
    const [hasJoined, setHasJoined] = useState(false);

    useEffect(() => {
        if (user) {
            initializeTalkJS(user);
        }
    }, [user]);

    const initializeTalkJS = (user: any) => {
        const currentUser = new Talk.User({
            id: user?.email,
            name: `anonymous`,
            email: `anonymous`,
            photoUrl: user?.pictureUrl,
            welcomeMessage: "Welcome to the group chat!",
            role: "member",
        });

        Talk.ready.then(() => {
            const session = new Talk.Session({
                appId: "tqe3ix7R",
                me: currentUser,
            });
            setTalkSession(session);
        });
    };

    // Handles message sending
    const sendMessage = async () => {
        const messageUrl = `https://api.talkjs.com/v1/tqe3ix7R/conversations/${props.conversationID}/messages`;
        const messageBody = [
            {
                text: "Hello.",
                sender: user?.email,
                type: "UserMessage",
            },
        ];

        await apiPost(messageUrl, messageBody);
    };

    // Create or update user
    const createOrUpdateUser = async () => {
        const userUrl = `https://api.talkjs.com/v1/tqe3ix7R/users/${user?.email}`;
        const requestBody = {
            name: `${user?.firstName} ${user?.lastName}`,
            email: [user?.email],
            welcomeMessage: "Welcome to the group chat!",
            photoUrl: user?.pictureUrl,
            role: "member",
        };

        return apiPut(userUrl, requestBody);
    };

    // Updates the participant for the conversation
    const updateParticipant = async () => {
        const userUpdated = await createOrUpdateUser();
        if (!userUpdated) return;

        await createOrGetConversation();

        const participantUrl = `https://api.talkjs.com/v1/tqe3ix7R/conversations/${props.conversationID}/participants/${user?.email}`;
        const participantBody = { access: "ReadWrite", notify: true };

        await apiPut(participantUrl, participantBody);
        setHasJoined(true);
    };

    // Creates or retrieves the conversation
    const createOrGetConversation = async () => {
        const conversationUrl = `https://api.talkjs.com/v1/tqe3ix7R/conversations/${props.conversationID}`;
        const conversationBody = {
            participants: [user?.email],
            subject: props.conversationID,
        };

        await apiPut(conversationUrl, conversationBody);
        await sendMessage();
        setHasJoined(true);
    };

    // Reusable API PUT method
    const apiPut = async (url: string, body: any) => {
        const token = "sk_test_RJPYVGePhdJfB9OhMGmorO12hNxyJlFx";
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("API PUT request failed:", error);
            return false;
        }
    };

    // Reusable API POST method
    const apiPost = async (url: string, body: any) => {
        const token = "sk_test_RJPYVGePhdJfB9OhMGmorO12hNxyJlFx";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("API POST request failed:", error);
        }
    };

    return (
        <div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={updateParticipant}
                className="cursor-pointer shadow-2xl rounded-2xl p-16 border border-gray-400 border-opacity-40 h-fit w-fit flex justify-center"
            >
                <h1
                    className={
                        hasJoined
                            ? "text-lg text-main font-semibold"
                            : "text-lg text-black"
                    }
                >
                    {hasJoined ? `Joined ${props.name}` : props.name}
                </h1>
            </motion.button>
        </div>
    );
}
