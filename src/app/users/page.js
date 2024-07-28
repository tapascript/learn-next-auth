
import { fetchClient } from "@/lib/fetch-client";
import { redirect } from "next/navigation";

const UserPage = async () => {

  const res = await fetchClient("http://localhost:5001/api/users", {
    headers: { "Content-Type": "application/json" },
  });

  if(!res.ok) {
    if (res.status === 403) {
      console.log("Token Expired");
      redirect('/login');
    }
  }

  const users = await res.json() ?? [];

  console.log(users);
  
  return (
    <div className="p-3">
    <h2 className="text-2xl my-2">User Page</h2>
    <ul>
      {
        users.map(user => (
          <li key={user._id}>{user?.email}</li>
        ))

      }
    </ul>
    </div>
  )
}

export default UserPage