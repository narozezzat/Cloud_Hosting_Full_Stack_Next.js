"use client";

import useLoading from "@/hooks/useLoading";
import { DOMAIN } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import axios from "axios";
import Link from "next/link";
import * as React from "react";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { PasswordInput } from "@/components/ui/PasswordInput";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loading, withLoading } = useLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    try {
      await withLoading(async () => {
        await axios.post(`${DOMAIN}/api/users/login`, { email, password });
        // Full navigation so the server re-renders the root layout's Header
        // with the new auth cookie. A soft router.replace + refresh races and
        // can leave the header showing the logged-out state until a reload.
        window.location.assign("/");
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label="Email" htmlFor="email">
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="h-4 w-4" />}
          required
        />
      </FormField>

      <FormField label="Password" htmlFor="password">
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormField>

      <div className="-mt-1 text-right">
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-brand-500 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" loading={loading} size="lg" className="w-full">
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
