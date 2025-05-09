"use client";

import FloatInput from "@/app/common/float-input/FloatInput";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'react-toastify';

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        if (email === "") return toast.error("Email is required");
        if (password === "") return toast.error("Password is required");
        console.log({ email, password });
        router.push("/");
    }

    return (
        <Form onFinish={formSubmitHandler} className="flex gap-6 flex-col">
            <Form.Item noStyle>
                <FloatInput
                    type="email"
                    label="Email"
                    name="email"
                    className="w-full rounded text-xl"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Item>
            <Form.Item noStyle>
                <FloatInput
                    type="password"
                    label="Password"
                    name="password"
                    className="w-full rounded text-xl border"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                className="w-full h-[48px] rounded text-xl text-white hover:text-white mb-4 font-bold bg-[#0059d6] hover:!bg-[#2419be]"
            >
                Log In
            </Button>
        </Form>)
}

export default LoginForm