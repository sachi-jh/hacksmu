"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Chat from "../../components/Chat";
import { useUser } from "@propelauth/nextjs/client";

export default function Groups() {
    const router = useRouter();
    const user = useUser().user;

    const [clicked, setClicked] = useState(false);
    const [convID, setConvID] = useState("");
    const [conversations, setConversations] = useState<any[]>([]); // Store conversation data
    const appId = "tqe3ix7R"; // Replace with your TalkJS app ID
    const token = "sk_test_RJPYVGePhdJfB9OhMGmorO12hNxyJlFx"; // Replace with your TalkJS API key

    useEffect(() => {
        const fetchConversations = async () => {
            const url = `https://api.talkjs.com/v1/${appId}/users/${user?.email}/conversations`;

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        `Error: ${response.status} ${response.statusText}`
                    );
                }

                const data = await response.json();
                setConversations(data.data); // The response contains an array of conversations
                console.log("Conversations fetched:", data);
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        };

        fetchConversations();
    }, [user, appId, token]);

    return (
        <div>
            <div className="flex items-center gap-8">
                <h1 className="text-2xl">
                    Fill out questionaire for group assignment:
                </h1>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="font-semibold hover:bg-main hover:text-white py-2 px-3 rounded-2xl text-2xl text-main"
                    onClick={() => {
                        router.push("/questionaire");
                    }}
                >
                    Questionaire
                </motion.button>
            </div>
            <h1 className="text-3xl font-bold mt-24 mb-12">Support Groups</h1>
            <div className="mx-16 grid grid-cols-4 text-2xl text-main font-semibold mt-4">
                <h1>NAME</h1>
                <h1>LAST MESSAGE</h1>
                <h1>UNREAD MESSAGES</h1>
                <h1>PARTICIPANTS</h1>
            </div>
            {}
            <div className="border border-1"></div>
            {conversations &&
                conversations.map((conversation) => (
                    <>
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                cursor: "pointer",
                                color: "#fff",
                                backgroundColor: "#88b7cd",
                            }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                setClicked(true);
                                setConvID(conversation.id);
                            }}
                            key={conversation.id}
                            className="mx-16 grid grid-cols-4 my-2 items-center text-xl rounded-2xl px-3 py-2"
                        >
                            <h1>{conversation.subject || "No Subject"}</h1>
                            <h1>
                                {conversation.lastMessage?.text ||
                                    "No messages yet"}
                            </h1>
                            <h1>{conversation.unreadMessageCount}</h1>
                            <h1>
                                {Object.keys(conversation.participants).join(
                                    ", "
                                )}
                            </h1>
                        </motion.div>
                        <div className="border border-1"></div>
                    </>
                ))}

            {clicked && (
                <div className="my-10">
                    <Chat conversationID={convID} />
                </div>
            )}
        </div>
    );
}
