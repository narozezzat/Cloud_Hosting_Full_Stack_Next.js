import RegisterForm from "./RegisterForm"

const RegisterPage = () => {
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
