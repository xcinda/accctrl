import Link from "next/link";
import { db } from "~/server/db";

export default async function HomePage() {
  const user = "jcinybulk"

  const userRole = await db.query.opHlavni.findMany({
    where: (userRole, { eq }) => eq(userRole.login, user),
});
  const role = await db.query.opRole.findMany();

  return (
      <div className="flex flex-col w-full items-center overflow-scroll">
        <div className="flex flex-row justify-between w-7/10">
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
  );
}
