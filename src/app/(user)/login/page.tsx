import LoginForm from "./LoginForm.tsx"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const LoginPage = () => {
  const token = cookies().get("jwtToken")?.value;
  if (token) redirect("/");

  return (
    <section className="fix-height container m-auto px-7 flex items-center justify-center">
      <div className="m-auto bg-gray-50 rounded-lg p-5 w-full max-w-md shadow-lg">
        <h1 className="text-center font-bold text-gray-800 mb-5 fluid-heading">Log In</h1>
        <LoginForm />
      </div>
    </section>
  )
}

export default LoginPage