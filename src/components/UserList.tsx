'use client'

import {Button} from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"


export function EmpCell(props){
  function findNotifRole(){
      const checkRole = props.roleTable.find((element) => (element.datumVykonZrizeni == null && element.login == props.emp.login) || (element.datumPrikazZruseni != null && element.datumVykonZruseni == null && element.login == props.emp.login))
      return (checkRole != null)
  }
  const notifRole = findNotifRole();
  return(
    <tr className={"border w-full h-10 text-center "+ (notifRole ? "bg-red-600/50 hover:bg-red-600/80" : "odd:bg-white/10 hover:bg-white/20")}  key={props.index + "t"} onClick={() => props.changeHandler(props.emp)}><td key={props.index}>{props.emp.jmeno + " " + props.emp.prijmeni}</td></tr>
  )
}

export default function UserList(props: { users: any[]; changeHandler: (arg0: any) => void; curEmp: { jmeno: string; prijmeni: string; };roleTable}) {

    return(
      <div className="h-full flex flex-col">
        <div className="w-full text-center text-xl font-bold pb-4 pt-4 flex flex-row justify-around">{props.curEmp.jmeno + " "  + props.curEmp.prijmeni} <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Editovat</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        tady jednou bude react hook form. Až budu mít motivaci zjistit jak funguje.
      </PopoverContent>
    </Popover></div>
          <div className="h-full w-full overflow-y-scroll p-0">
            <table className="border w-full">
              <tbody>
              <tr className="h-20 text-center bg-white/10 hover:bg-white/20"><th><button onClick={() => window.alert("hmmm,tady zatím nic")}>Přidat uživatele</button></th></tr>
                {props.users.map((emp, index) => (
                  <EmpCell changeHandler={props.changeHandler} emp={emp} key={index} roleTable={props.roleTable}/>
                ))}
              </tbody>
            </table>
          </div>
      </div>
  )}