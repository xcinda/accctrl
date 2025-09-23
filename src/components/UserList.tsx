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
  if (props.emp.aktivni.data[0] == 0){
    return(
    <tr className="border w-full h-10 text-center bg-gray-950 hover:bg-gray-800"  key={props.index + "t"} onClick={() => props.changeHandler(props.emp)}><td key={props.index}>{props.emp.jmeno + " " + props.emp.prijmeni}</td></tr>
  )} 
  else if (props.emp.datumOdchod) {
    return(
    <tr className="border w-full h-10 text-center bg-red-600/50 hover:bg-red-600/80"  key={props.index + "t"} onClick={() => props.changeHandler(props.emp)}><td key={props.index}>{props.emp.jmeno + " " + props.emp.prijmeni}</td></tr>
  )}
  else{
  return(
    <tr className={"border w-full h-10 text-center "+ (notifRole ? "bg-amber-300/50 hover:bg-amber-300/80" : "odd:bg-white/10 hover:bg-white/20")}  key={props.index + "t"} onClick={() => props.changeHandler(props.emp)}><td key={props.index}>{props.emp.jmeno + " " + props.emp.prijmeni}</td></tr>
  )}
}

export function EmpSelected({curEmp}){
  if (curEmp.datumOdchod) {
    return(
      <div>{curEmp.jmeno + " "  + curEmp.prijmeni}<br/> {curEmp.datumOdchod}</div>)
    
  }
  else{
    return(
      <div>{curEmp.jmeno + " " + curEmp.prijmeni}</div>
    )
  }
}



export default function UserList(props: { users: any[]; changeHandler: (arg0: any) => void; curEmp: { jmeno: string; prijmeni: string; };roleTable}) {

    return(
      <div className="h-full flex flex-col">
        <div className="w-full text-center text-xl font-bold pb-4 pt-4 flex flex-col justify-around gap-4"><EmpSelected curEmp={props.curEmp}/>
      <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Editovat</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        tady jednou bude react hook form na úpravu uživatele. Až budu mít motivaci zjistit jak funguje.
      </PopoverContent>
    </Popover></div>
          <div className="h-full w-full overflow-y-scroll p-0">
            <table className="border w-full">
              <tbody>
                <Popover>
                <PopoverTrigger asChild>
                <tr className="h-20 text-center bg-white/10 hover:bg-white/20"><th><button>Přidat uživatele</button></th></tr>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  tady jednou bude react hook form na nového uživatele. Až budu mít motivaci zjistit jak funguje.
                </PopoverContent>
                </Popover>
                {props.users.map((emp, index) => (
                  <EmpCell changeHandler={props.changeHandler} emp={emp} key={index} roleTable={props.roleTable}/>
                ))}
              </tbody>
            </table>
          </div>
      </div>
  )}