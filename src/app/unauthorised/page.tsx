import { db } from "~/server/db";

export default async function ForbiddenPage() {

  return (
      <div className="flex flex-col w-full items-center overflow-scroll h-full">
        <div className="flex flex-row justify-between w-7/10 h-full">
          <div className="flex flex-col gap-4 w-full justify-center h-full text-center align-middle">
            <div><h1 className=" text-3xl">Neautorizovaný přístup</h1></div>
            <div>v aplikaci správy přístupů nefigurujete ani jako přidělovatel, ani jako vykonavatel</div>
            <div>pokud si myslíte, že byste sem měli mít přístup, kontaktujte IT.</div>
          </div>
        </div>
      </div>
  );
}
