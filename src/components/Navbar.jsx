import Link from "next/link"

const Navbar = () => {
  return (
    <header className="flex justify-between bg-slate-900 text-white p-2">
      <Link href="/">
        <h1 className="text-2xl">Some Random Product App</h1>
      </Link>
      <nav>
        <ul className="flex pt-1">
          <li className="mx-2">
            <Link href="/login">Login</Link>
          </li>
          <li className="mx-2">
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar