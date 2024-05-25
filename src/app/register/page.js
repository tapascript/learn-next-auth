import RegistrationForm from "@/components/RegistrationForm"
import Link from "next/link"

const RegistrationPage = () => {
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <h1 className="text-3xl my-3">Hey, time to Register</h1>
      <RegistrationForm />
      <p className="my-3">
        Already have an account?
        <Link href="/" className="mx-2 underline">Login</Link>
      </p>
    </div>
  )
}

export default RegistrationPage