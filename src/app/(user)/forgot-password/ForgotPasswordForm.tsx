"use client";

import * as React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";
import useLoading from "@/hooks/useLoading";
import { API_BASE_URL } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

const ForgotPasswordForm = () => {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const { loading, withLoading } = useLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    try {
      await withLoading(async () => {
        const res = await axios.post(`${API_BASE_URL}/api/users/forgot-password`, {
          email,
        });
        toast.success(res.data.message);
        setSent(true);
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (sent) {
    return (
      <div className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
        A reset link is on its way to{" "}
        <span className="font-semibold">{email}</span>. Check your inbox (and
        spam folder).
      </div>
    );
  }

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
      <Button type="submit" loading={loading} size="lg" className="w-full">
        Send reset link
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
