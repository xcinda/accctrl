'use client'

import {useEffect,useState} from "react";
import {GetRolesForUser, GetUserAdmin} from "~/server/querys"
import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";


export function UserRoleButton({passedEvent,userAdmin}){
  function znovuPrikazat(){
    const newEvent = {
      datumPrikazZrizeni: Date(),
      datumPrikazZruseni: null,
      datumVykonZrizeni:null,
      datumVykonZruseni:null,
      idRole: passedEvent.idRole,
      login: passedEvent.login,
      loginPrikazZrizeni: "TEST",
      loginPrikazZruseni: null,
      loginVykonZrizeni: null,
      loginVykonZruseni: null
    }
    console.log(newEvent)
  }
  function provestZrizeni(){
    console.log("Provést zřízení " + passedEvent.idRole + Date());
  }
  function prikazatZruseni(){
    console.log("Přikázat zrušení " + passedEvent.idRole + Date());
  }
  function provestZruseni(){
    console.log("Provést zrušení " + passedEvent.idRole + Date());
  }

  const userPerms = userAdmin.find((element) => element.idRole == passedEvent.idRole);

  if(userPerms){
    if (passedEvent.datumVykonZruseni && userPerms.prikazce.data[0] == 1) {
      return(<Button onClick={znovuPrikazat}>Znovu přikázat zřízení</Button>)
    } else if (passedEvent.datumVykonZrizeni && passedEvent.datumPrikazZruseni == null && userPerms.prikazce.data[0] == 1) {
      return(<Button onClick={prikazatZruseni}>Přikázat zrušení</Button>)
    } else if (passedEvent.datumPrikazZruseni && passedEvent.datumVykonZruseni == null && userPerms.vykonavatel.data[0] == "1") {
      return(<Button variant="secondary" onClick={provestZruseni}>Provést zrušení</Button>)
    }else if (passedEvent.datumPrikazZrizeni && passedEvent.datumVykonZrizeni == null && userPerms.vykonavatel.data[0] == "1"){
      return(<Button variant="secondary" onClick={provestZrizeni}>Provést zřízení</Button>)
    }else{
      return(<div>Nemáte oprávnění k provedení akce</div>)
    }
  }else{
    return(<div>Nemáte oprávnění k provedení akce</div>)
  }

}

export function LastRoleEvent({passedEvent}){
  if (passedEvent.datumVykonZruseni){
    return(<p>Zrušeno {passedEvent.datumVykonZruseni} uživatelem {passedEvent.loginVykonZruseni}</p>)
  }else if(passedEvent.datumPrikazZruseni){
    return(<p>Nařízeno zrušení {passedEvent.datumPrikazZruseni} uživatelem {passedEvent.loginPrikazZruseni}</p>)
  }else if(passedEvent.datumVykonZrizeni){
    return(<p>Přiděleno {passedEvent.datumVykonZrizeni} uživatelem {passedEvent.loginVykonZrizeni}</p>)
  }else{
    return(<p>Nařízeno přidělení {passedEvent.datumPrikazZrizeni} uživatelem {passedEvent.loginPrikazZrizeni}</p>)
  }
}


export default function UserRoleList(props: { emp;username }){
    const [empRole, setEmpRole] = useState([]);
    const [userAdmin, setUserAdmin] = useState([]);
      useEffect(() => {
        async function fetchData() {
          const fetchedEmpRole = JSON.parse(await GetRolesForUser(props.emp.login));
          const fetchedUserAdmin = JSON.parse(await GetUserAdmin(props.username));
          setUserAdmin(fetchedUserAdmin);
          setEmpRole(fetchedEmpRole);
        }

        void fetchData();
      }, [props.emp]);
    return(
          <div className="h-full flex flex-col gap-4 w-full items-center overflow-y-scroll">{
            empRole.map((role,index) => (
            <div key={index}
              className={"flex flex-row justify-between items-center rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 w-full " + ((role.datumVykonZrizeni == null) || (role.datumPrikazZruseni != null && role.datumVykonZruseni == null) ? "border-2 border-red-500" : "")}
            >
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold">{role.idRole}</h3>
                <p></p>
              </div>
              <div className="text-lg">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button><LastRoleEvent passedEvent={role} /></button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-auto">
                      <div className="flex justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">Historie událostí u role</h4>
                          {role.datumPrikazZrizeni ? <p className="text-sm">Nařízeno přidělení <b>{role.datumPrikazZrizeni}</b> uživatelem <b>{role.loginPrikazZrizeni}</b></p> : ""}
                          {role.datumVykonZrizeni ? <p className="text-sm">Přiděleno <b>{role.datumVykonZrizeni}</b> uživatelem <b>{role.loginVykonZrizeni}</b></p> : ""}
                          {role.datumPrikazZruseni ? <p className="text-sm">Nařízeno zrušení <b>{role.datumPrikazZruseni}</b> uživatelem <b>{role.loginPrikazZruseni}</b></p> : ""}
                          {role.datumVykonZruseni ? <p className="text-sm">Zrušeno <b>{role.datumVykonZruseni}</b> uživatelem <b>{role.loginVykonZruseni}</b></p> : ""}
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
              </div>
              <div className="flex flex-col">
                <UserRoleButton passedEvent={role} userAdmin={userAdmin}/>
              </div>
            </div>))
            }
          </div>)}