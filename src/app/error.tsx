"use client";
import { Button, Result } from "antd";
import Link from "next/link";

interface ErrorPageProps {
  error: Error;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <div className="flex fix-height items-center justify-center bg-gray-100">
      <Result
        // status={error.status >= 500 ? "500" : "404"}
        title={error.message || "Error"}
        subTitle="Sorry, something went wrong. Please try again later."
        extra={
          <Button href="/" type="primary">
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;
