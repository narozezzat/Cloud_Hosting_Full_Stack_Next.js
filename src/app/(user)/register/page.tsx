import RegisterForm from "./RegisterForm"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const RegisterPage = () => {
  const token = cookies().get("jwtToken")?.value;
  if (token) redirect("/");

  return (
    <section className="fix-height container m-auto px-7 flex items-center justify-center">
      <div className="m-auto bg-gray-50 rounded-lg p-5 w-full max-w-md shadow-lg">
        <h1 className="font-bold text-center text-gray-800 mb-5 fluid-heading">
          Create New Account
        </h1>
        <RegisterForm />
      </div>
    </section>
  )
}

export default RegisterPage
