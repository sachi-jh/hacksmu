import type { Metadata } from "next";
import "./globals.css";
import MainNav from "@/components/MainNav";
import { AuthProvider } from "@propelauth/nextjs/client";
import { Fredoka } from "next/font/google"

const fredoka = Fredoka({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "Ebby",
    description: "AI Mental and Emotional Health Assistant",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <AuthProvider authUrl={process.env.NEXT_PUBLIC_AUTH_URL!}>
                <body
                    className={fredoka.className}
                >
                    <nav className="flex flex-col items-center border-b mb-5 px-5 py-3">
                        <div className="max-w-6xl w-full">
                            <MainNav />
                        </div>
                    </nav>
                    <main className="flex flex-col items-center">
                        <div className="max-w-6xl w-full">{children}</div>
                    </main>
                </body>
            </AuthProvider>
        </html>
    );
}
