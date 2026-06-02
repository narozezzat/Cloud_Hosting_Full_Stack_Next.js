"use client";

import * as React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useLoading from "@/hooks/useLoading";
import { API_BASE_URL } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { PasswordInput } from "@/components/ui/PasswordInput";

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const { loading, withLoading } = useLoading();

  if (!token) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-5 text-sm text-destructive">
        This reset link is missing its token. Please request a new one.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (password !== confirm) return toast.error("Passwords do not match");

    try {
      await withLoading(async () => {
        await axios.post(`${API_BASE_URL}/api/users/reset-password`, {
          token,
          password,
        });
        toast.success("Password reset — you can now log in");
        router.replace("/login");
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label="New password" htmlFor="password">
        <PasswordInput
          id="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormField>
      <FormField label="Confirm password" htmlFor="confirm">
        <PasswordInput
          id="confirm"
          autoComplete="new-password"
          placeholder="••••••••"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
      </FormField>
      <Button type="submit" loading={loading} size="lg" className="w-full">
        Reset password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
