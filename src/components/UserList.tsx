'use client'

import {Button} from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"


export function EmpCell(props){
  function findNotifRole(){
      const checkRole = props.roleTable.find((element) => (element.datumVykonZrizeni == null && element.login == props.user.login) || (element.datumPrikazZruseni != null && element.datumVykonZruseni == null && element.login == props.user.login))
      return (checkRole != null)
  }
  const notifRole = findNotifRole();
  return(
    <tr className={"border w-full h-10 text-center "+ (notifRole ? "bg-red-600/50 hover:bg-red-600/80" : "odd:bg-white/10 hover:bg-white/20")}  key={props.index + "t"} onClick={() => props.changeHandler(props.user)}><td key={props.index}>{props.user.jmeno + " " + props.user.prijmeni}</td></tr>
  )
}

export default function UserList(props: { users: any[]; changeHandler: (arg0: any) => void; curUser: { jmeno: string; prijmeni: string; };roleTable}) {

    return(
      <div className="h-full flex flex-col">
        <div className="w-full text-center text-xl font-bold pb-4 pt-4 flex flex-row justify-around">{props.curUser.jmeno + " "  + props.curUser.prijmeni} <Popover>
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
                {props.users.map((user, index) => (
                  <EmpCell changeHandler={props.changeHandler} user={user} key={index} roleTable={props.roleTable}/>
                ))}
              </tbody>
            </table>
          </div>
      </div>
  )}