import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import RegisterForm from "./RegisterForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

const RegisterPage = () => {
  const token = cookies().get("jwtToken")?.value;
  if (token) redirect("/");

  return (
    <AuthLayout
      eyebrow="Start free"
      title="Create your account"
      subtitle="14-day free trial. No credit card required."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand-500 hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
