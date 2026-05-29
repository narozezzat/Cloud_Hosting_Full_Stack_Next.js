"use client";
import useLoading from "@/hooks/useLoading";
import { DOMAIN } from "@/lib/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
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
  const router = useRouter();

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const { loading, withLoading } = useLoading();

  const strength = passwordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return toast.error("Username is required");
    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

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
      toast.error(error?.response?.data.message ?? "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Username" htmlFor="username">
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
      </Field>

      <Field label="Email" htmlFor="email">
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
      </Field>

      <Field label="Password" htmlFor="password">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="cursor-pointer hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
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
      </Field>

      <Button type="submit" loading={loading} size="lg" className="w-full">
        Create account
      </Button>
    </form>
  );
};

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export default RegisterForm;
