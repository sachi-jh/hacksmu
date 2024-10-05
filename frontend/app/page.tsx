import React from "react";
import { getUser } from "@propelauth/nextjs/server/app-router";

const Home = async () => {
    const user = await getUser();

    return (
        <div>
            <div>hi {user?.email}</div>
        </div>
    );
};

export default Home;
