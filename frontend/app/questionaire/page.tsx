"use client";
import JoinGroup from "@/components/JoinGroup";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Question = {
    id: number;
    text: string;
    category: string;
};

type Answers = {
    [key: number]: "yes" | "no" | null;
};

const questions: Question[] = [
    {
        id: 1,
        text: "Do you often feel overwhelmed by sadness or a sense of hopelessness that lasts for weeks?",
        category: "depression",
    },
    {
        id: 2,
        text: "Do you frequently experience intense anxiety or panic attacks that interfere with your daily life?",
        category: "anxiety",
    },
    {
        id: 3,
        text: "Have you ever felt the need to reduce your alcohol consumption?",
        category: "alcohol_abuse",
    },
    {
        id: 4,
        text: "Do you use recreational drugs or prescription medications not as directed by a doctor?",
        category: "drug_abuse",
    },
    {
        id: 5,
        text: "Are you often preoccupied with thoughts about your body weight or shape, leading to unhealthy behaviors?",
        category: "eating_disorders",
    },
    {
        id: 6,
        text: "Do you experience persistent feelings of stress or anxiety related to work, school, or personal relationships?",
        category: "stress",
    },
    {
        id: 7,
        text: "Do you struggle with controlling your anger, often resulting in conflict or regret?",
        category: "anger_management",
    },
    {
        id: 8,
        text: "Do you find it challenging to maintain relationships because of your intense emotional reactions?",
        category: "borderline",
    },
    {
        id: 9,
        text: "Do you experience extreme mood swings, including periods of high energy followed by deep lows?",
        category: "bipolar",
    },
    {
        id: 10,
        text: "Do you have intrusive thoughts or compulsive behaviors that disrupt your daily life?",
        category: "ocd",
    },
];

const Questionnaire: React.FC = () => {
    const router = useRouter();
    const [answers, setAnswers] = useState<Answers>({});
    const [recommendedGroups, setRecommendedGroups] = useState<string[]>([]); // New state variable

    const handleAnswer = (questionId: number, value: "yes" | "no") => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    useEffect(() => {
        console.log("rc", recommendedGroups);
    }, [recommendedGroups]);

    const calculateResults = () => {
        const categories = Object.entries(answers).reduce(
            (acc: { [key: string]: number }, [questionId, value]) => {
                if (value === "yes") {
                    const question = questions.find(
                        (q) => q.id === parseInt(questionId)
                    );
                    if (question) {
                        acc[question.category] =
                            (acc[question.category] || 0) + 1;
                    }
                }
                return acc;
            },
            {}
        );

        // Get all unique categories that received "yes" responses
        const uniqueCategories = Object.keys(categories);
        console.log("Unique Categories:", uniqueCategories);

        // Use a Set to avoid duplicates
        const groupsSet = new Set<string>();

        // Map unique categories to their respective support group names
        uniqueCategories.forEach((category) => {
            const groupName = getSupportGroupName(category);
            console.log(`Group for category '${category}':`, groupName);
            groupsSet.add(groupName);
        });

        // Convert Set back to an array
        const groupsUnique = Array.from(groupsSet);
        console.log("Unique Groups:", groupsUnique);

        // Save unique categories and recommended support groups to state
        setRecommendedGroups(groupsUnique); // Save all recommended support groups
    };

    const getSupportGroupName = (category: string): string => {
        const groupNames: { [key: string]: string } = {
            depression: "Depression Support Group",
            anxiety: "Anxiety Support Group",
            alcohol_abuse: "Alcoholics Anonymous",
            drug_abuse: "Substance Abuse Recovery Group",
            eating_disorders: "Eating Disorders Support Group",
            stress: "Stress Management Group",
            anger_management: "Anger Management Group",
        };
        return groupNames[category] || "General Mental Health Support Group";
    };

    return (
        <div className="mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Mental Health Support Group Questionnaire
            </h1>
            {questions.map((question) => (
                <div key={question.id} className="mb-4">
                    <p className="mb-2">{question.text}</p>
                    <div>
                        <button
                            className={`mr-2 px-3 py-1 rounded-2xl ${
                                answers[question.id] === "yes"
                                    ? "bg-main text-white"
                                    : "bg-gray-200"
                            }`}
                            onClick={() => handleAnswer(question.id, "yes")}
                        >
                            Yes
                        </button>
                        <button
                            className={`px-3 py-1 rounded-2xl ${
                                answers[question.id] === "no"
                                    ? "bg-main text-white"
                                    : "bg-gray-200"
                            }`}
                            onClick={() => handleAnswer(question.id, "no")}
                        >
                            No
                        </button>
                    </div>
                </div>
            ))}
            <button
                className="bg-main text-white px-4 py-2 rounded-2xl mt-4 hover:scale-110 transition-all"
                onClick={calculateResults}
            >
                Submit (then scroll down)
            </button>
            {recommendedGroups.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">
                        Recommended Support Groups:
                    </h2>
                    <ul className="list-disc pl-5 mt-2">
                        {recommendedGroups.map((category, index) => (
                            <li key={index} className="text-lg">
                                {category}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-sm text-gray-600">
                        Note: These recommendations are based on your responses.
                        It's always best to consult with a mental health
                        professional for a comprehensive evaluation and
                        personalized advice.
                    </p>
                    <h1 className="text-xl my-10">
                        Join By Clicking On Cards Below
                    </h1>
                    <div className="flex flex-wrap justify-left gap-5">
                        {recommendedGroups.map((group) => (
                            <JoinGroup
                                key={group}
                                name={group}
                                conversationID={group}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center my-16">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-main text-white px-4 py-2 rounded-2xl hover:scale-110 transition-all text-3xl"
                            onClick={() => router.push("/groups")}
                        >
                            Return to Groups
                        </motion.button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Questionnaire;
