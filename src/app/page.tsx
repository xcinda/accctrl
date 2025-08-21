import Link from "next/link";
import { UserList,Selector } from "~/components";
import { db } from "~/server/db";

export const user="jcinybulk";

export default async function HomePage() {

  const userRole = await db.query.opHlavni.findMany({
    where: (userRole, { eq }) => eq(userRole.login, user),
});
  const role = await db.query.opRole.findMany();

  return (
      <div className="flex flex-row justify-between h-full w-7/10 overflow-hidden pt-10">
        <div id="LevySloupec" className="w-1/4 h-full overflow-hidden flex flex-col">
          <div className="w-full text-center text-xl font-bold pb-3">{user}</div>
          <div className="overflow-scroll flex-1">
            <UserList />
          </div>
          <div className="h-20 align-center">
            <Selector/>
          </div>
        </div>
          <div className="w-full h-full overflow-scroll">
            <div className="flex flex-col w-full items-center overflow-scroll">
        <div id="PravySloupec" className="flex flex-row justify-between w-7/10">
          <div className="flex flex-col gap-4 w-full justify-center">{
            userRole.map((role,index) => (
            <div key={index}
              className="flex flex-row justify-around items-center rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
              <h3 className="text-2xl font-bold">{role.idRole}</h3>
              <div className="text-lg">
                {role.datumVykonZrizeni}
              </div>
              <div className="flex flex-col"> <button>Přidělit přístup</button></div>
            </div>))
            }
          </div>
        </div>
      </div>
          </div>
      </div>
  );
}


