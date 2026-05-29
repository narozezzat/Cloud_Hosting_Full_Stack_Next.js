import Link from "next/link";
import ResetPasswordForm from "./ResetPasswordForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

interface ResetPasswordPageProps {
  searchParams: { token?: string };
}

const ResetPasswordPage = ({ searchParams }: ResetPasswordPageProps) => {
  return (
    <AuthLayout
      eyebrow="Account recovery"
      title="Set a new password"
      subtitle="Choose a strong password you don't use anywhere else."
      footer={
        <>
          Changed your mind?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand-500 hover:underline"
          >
            Back to log in
          </Link>
        </>
      }
    >
      <ResetPasswordForm token={searchParams.token || ""} />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
