import Link from "next/link";
import { UserList } from "~/components";
import { db } from "~/server/db";

export default async function HomePage() {

  const users = ['user1','user2','user3','user4']

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-row items-center justify-between">
        <div className="h-dvh  w-1/4 flex flex-col overflow-scroll">
          <UserList users={users}/>
        <div>
          Selector here
        </div>
        </div>
        <div className="w-full h-dvh">

        </div>
      </div>
    </main>
  );
}


