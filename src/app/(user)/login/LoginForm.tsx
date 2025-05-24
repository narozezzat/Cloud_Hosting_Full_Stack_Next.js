"use client";

import FloatInput from "@/app/common/float-input/FloatInput";
import useLoading from "@/hooks/useLoading";
import { DOMAIN } from "@/utils/constants";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'react-toastify';

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loading, withLoading } = useLoading();

    const formSubmitHandler = async (e: React.FormEvent) => {
        if (email === "") return toast.error("Email is required");
        if (password === "") return toast.error("Password is required");

        try {
            await withLoading(async () => {
                await axios.post(`${DOMAIN}/api/users/login`, { email, password });
                router.replace('/');
                router.refresh();
            });
        } catch (error: any) {
            toast.error(error?.response?.data.message);
        }
    }

    return (
        <Form onFinish={formSubmitHandler} className="flex gap-4 flex-col">
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
                loading={loading}
                disabled={loading}
                htmlType="submit"
                className="w-full text-white h-[48px] mt-2 text-xl mb-4 font-bold bg-[#0059d6] hover:bg-[#2419be]"
            >
                Log In
            </Button>
        </Form>)
}

export default LoginForm