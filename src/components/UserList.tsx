import {GetUsers} from "~/server/db/querys";

export default async function UserList() {
  const users = await GetUsers();
    return(
      <div className="h-full overflow-scroll">
        <table className="border w-full">
          <tbody>
            {users.map((user, index) => (
              <tr className="border w-full h-10 text-center odd:bg-white/20" key={index + "t"}><td key={index}>{user.login}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
  )}