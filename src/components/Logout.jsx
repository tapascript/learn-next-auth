import { doLogout } from "@/app/actions"

const Logout = () => {
  return (
    <form action={doLogout}>
        <button className="text-white" type="submit">Logout</button>
    </form>
  )
}

export default Logout