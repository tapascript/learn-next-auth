
import { fetchClient } from "@/lib/fetch-client";
import { redirect } from "next/navigation";

import { Stopwatch } from "@/components/Stopwatch";

const UserPage = async () => {

  const res = await fetchClient(`${process.env.API_SERVER_BASE_URL}/api/users`, {
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
      <div className="flex justify-around">
        <ul>
          <h3 className="text-xl my-2">User List</h3>
          {
            users.map(user => (
              <li key={user._id}>{user?.email}({user?.role})</li>
            ))

          }
        </ul>
        <Stopwatch />
      </div>
    </div>
  )
}

export default UserPage