"use client";
import JoinGroup from "@/components/JoinGroup";
import React, { useState } from "react";

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
        text: "Do you often feel overwhelming sadness or hopelessness?",
        category: "depression",
    },
    {
        id: 2,
        text: "Do you experience frequent, intense anxiety or panic attacks?",
        category: "anxiety",
    },
    {
        id: 3,
        text: "Have you ever felt that you should cut down on your drinking?",
        category: "alcoholic",
    },
    {
        id: 4,
        text: "Do you use drugs other than those required for medical reasons?",
        category: "substance_abuse",
    },
    {
        id: 5,
        text: "Do you often feel preoccupied with your body shape or weight?",
        category: "eating_disorders",
    },
    {
        id: 6,
        text: "Have you experienced a traumatic event that still affects you today?",
        category: "ptsd",
    },
    {
        id: 7,
        text: "Do you have difficulty controlling your anger?",
        category: "anger_management",
    },
    {
        id: 8,
        text: "Do you struggle with maintaining relationships due to intense emotions?",
        category: "borderline",
    },
    {
        id: 9,
        text: "Do you experience extreme mood swings, including emotional highs?",
        category: "bipolar",
    },
    {
        id: 10,
        text: "Do you have persistent thoughts or behaviors that interfere with daily life?",
        category: "ocd",
    },
];

const Questionnaire: React.FC = () => {
    const [answers, setAnswers] = useState<Answers>({});
    const [results, setResults] = useState<string[]>([]);

    const handleAnswer = (questionId: number, value: "yes" | "no") => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

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

        // Sort categories by count and get top 3 (or all if less than 3)
        const sortedCategories = Object.entries(categories)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([category]) => category);

        setResults(sortedCategories);
    };

    const getSupportGroupName = (category: string): string => {
        const groupNames: { [key: string]: string } = {
            depression: "Depression Support Group",
            anxiety: "Anxiety Support Group",
            alcoholic: "Alcoholics Anonymous",
            substance_abuse: "Substance Abuse Recovery Group",
            eating_disorders: "Eating Disorders Support Group",
            ptsd: "PTSD Support Group",
            anger_management: "Anger Management Group",
            borderline: "Borderline Personality Disorder Support Group",
            bipolar: "Bipolar Disorder Support Group",
            ocd: "OCD Support Group",
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
                            className={`mr-2 px-3 py-1 rounded ${
                                answers[question.id] === "yes"
                                    ? "bg-main text-white"
                                    : "bg-gray-200"
                            }`}
                            onClick={() => handleAnswer(question.id, "yes")}
                        >
                            Yes
                        </button>
                        <button
                            className={`px-3 py-1 rounded ${
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
                className="bg-main text-white px-4 py-2 rounded mt-4 hover:scale-110 transition-all"
                onClick={calculateResults}
            >
                Submit
            </button>
            {results.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">
                        Recommended Support Groups:
                    </h2>
                    <ul className="list-disc pl-5 mt-2">
                        {results.map((category, index) => (
                            <li key={index} className="text-lg">
                                {getSupportGroupName(category)}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-sm text-gray-600">
                        Note: These recommendations are based on your responses.
                        It's always best to consult with a mental health
                        professional for a comprehensive evaluation and
                        personalized advice.
                    </p>
                    <h1 className="text-xl my-10">Join By Clicking On Cards Below</h1>
                    <JoinGroup name="Depression Support Group" />
                </div>
            )}
        </div>
    );
};

export default Questionnaire;
