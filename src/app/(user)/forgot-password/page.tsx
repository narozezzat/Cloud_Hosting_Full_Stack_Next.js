import Link from "next/link";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      eyebrow="Account recovery"
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a link to reset it."
      footer={
        <>
          Remembered it?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand-500 hover:underline"
          >
            Back to log in
          </Link>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
