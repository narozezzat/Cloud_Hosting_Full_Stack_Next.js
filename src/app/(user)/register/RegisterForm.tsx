"use client";
import useLoading from "@/hooks/useLoading";
import { API_BASE_URL } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import axios from "axios";
import * as React from "react";
import { toast } from "react-toastify";
import { Mail, User } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { cn } from "@/lib/cn";

function passwordStrength(pw: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "bg-destructive",
    "bg-destructive",
    "bg-warning",
    "bg-info",
    "bg-success",
  ];
  return { score, label: labels[score], color: colors[score] };
}

const RegisterForm = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loading, withLoading } = useLoading();

  const strength = passwordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return toast.error("Username is required");
    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    try {
      await withLoading(async () => {
        await axios.post(`${API_BASE_URL}/api/users/register`, {
          email,
          password,
          username,
        });
        // Full navigation so the server re-renders the root layout's Header
        // with the new auth cookie (a soft replace + refresh can race and
        // leave the header logged-out until a manual reload).
        window.location.assign("/");
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label="Username" htmlFor="username">
        <Input
          id="username"
          type="text"
          autoComplete="username"
          placeholder="your-handle"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          leftIcon={<User className="h-4 w-4" />}
          required
        />
      </FormField>

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
          autoComplete="new-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {password && (
          <div className="space-y-1 pt-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    i <= strength.score ? strength.color : "bg-secondary",
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Password strength: {strength.label}
            </p>
          </div>
        )}
      </FormField>

      <Button type="submit" loading={loading} size="lg" className="w-full">
        Create account
      </Button>
    </form>
  );
};

export default RegisterForm;
