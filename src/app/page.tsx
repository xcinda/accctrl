import Link from "next/link";
import { UserList,Selector } from "~/components";
import { db } from "~/server/db";

export default async function HomePage() {

  const users = ['user1','user2','user3','user4']

  return (
      <div className="flex flex-row justify-between h-full w-7/10 overflow-hidden">
        <div className="w-1/4 h-full overflow-hidden flex flex-col">
          <div className="overflow-scroll flex-1">
            <UserList users={users}/>
          </div>
          <div className="h-20 align-center">
            <Selector/>
          </div>
        </div>
          <div className="w-full h-full overflow-scroll">
            CONTENT HERE andherererererreerererererreerererererreerererererreerererererreerererererreerererererreerererererreerererererreerererererreerererererreerererererreerererererreerererererreerererererreerererererre
          </div>
      </div>
  );
}


