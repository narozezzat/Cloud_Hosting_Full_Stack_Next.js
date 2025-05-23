"use client";
import FloatInput from "@/app/common/float-input/FloatInput";
import useLoading from "@/hooks/useLoading";
import { DOMAIN } from "@/utils/constants";
import { Button, Form } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, withLoading } = useLoading();

  const formSubmitHandler = async (e: React.FormEvent) => {
    if (username === "") return toast.error("Username is required");
    if (email === "") return toast.error("Email is required");
    if (password === "") return toast.error("Password is required");

    try {
      await withLoading(async () => {
        await axios.post(`${DOMAIN}/api/users/register`, {
          email,
          password,
          username,
        });
        router.replace("/");
        router.refresh();
      });
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <Form onFinish={formSubmitHandler} className="flex gap-4 flex-col">
      <Form.Item name="username" noStyle>
        <FloatInput
          className="border rounded w-full text-xl"
          type="text"
          label="Username"
          placeholder="Enter Your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item name="email" noStyle>
        <FloatInput
          className="border rounded w-full p-2 text-xl"
          type="email"
          label="Email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Item>
      <Form.Item name="password" noStyle>
        <FloatInput
          className="border rounded w-full p-2 text-xl"
          type="password"
          label="Password"
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
        className="w-full text-white h-[48px] mt-2 text-xl font-bold bg-[#0059d6] hover:bg-[#2419be]"
      >
        Register
      </Button>
    </Form>
  );
};

export default RegisterForm;
