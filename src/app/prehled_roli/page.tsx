import Link from "next/link";
import { db } from "~/server/db";

export default async function HomePage() {
  const user = "jcinybulk"

  const userRole = await db.query.opHlavni.findMany({
    where: (userRole, { eq }) => eq(userRole.login, user),
});
  const role = await db.query.opRole.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-8">{
          userRole.map((role,index) => (
          <div key={index}
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          >
            <h3 className="text-2xl font-bold">{role.idRole}</h3>
            <div className="text-lg">
              {role.datumVykonZrizeni}
            </div>
            <div className="flex flex-col"> <button>Přidělit přístup</button></div>
          </div>))
          }
          <div
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
