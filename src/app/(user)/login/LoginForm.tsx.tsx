"use client";

import { useState } from "react";
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email === "") return toast.error("Email is required");
        if (password === "") return toast.error("Password is required");
        console.log({ email, password });
    }

    return (
        <form onSubmit={formSubmitHandler} className="flex flex-col">
            <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full p-2 rounded text-xl border mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full p-2 rounded text-xl border mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="text-2xl bg-blue-800 text-white p-2 rounded-lg font-bold"
            >
                Log In
            </button>
        </form>)
}

export default LoginForm