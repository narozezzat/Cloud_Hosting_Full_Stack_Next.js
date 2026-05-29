import Link from "next/link";
import LoginForm from "./LoginForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Log in to your account"
      subtitle="Enter your credentials to continue to Cloud Hosting."
      footer={
        <>
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-brand-500 hover:underline"
          >
            Create one
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
