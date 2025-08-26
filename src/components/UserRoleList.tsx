'use client'

import {useEffect,useState} from "react";
import {GetRolesForUser} from "~/server/querys"
import { Button } from "~/components/ui/button";


export function UserRoleButton({passedRole: passedEvent}){
  if (passedEvent.datumVykonZruseni) {
    return(<Button>Znovu přikázat</Button>)
  } else if (passedEvent.datumVykonZrizeni && passedEvent.datumPrikazZruseni == null) {
    return(<Button variant="secondary">Přikázat zrušení</Button>)
  } else if (passedEvent.datumPrikazZruseni) {
    return(<Button variant="secondary">Provést zrušení</Button>)
  }else if (passedEvent.datumPrikazZrizeni){
    return(<Button variant="secondary">Provést zřízení</Button>)
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


export default function UserRoleList(props: { user; }){
    const [userRole, setUserRole] = useState([]);
      useEffect(() => {
        async function fetchData() {
          const fetchedUserRole = JSON.parse(await GetRolesForUser(props.user.login));
          setUserRole(fetchedUserRole);
        }

        void fetchData();
      }, [props.user]);
    return(
          <div className="h-full flex flex-col gap-4 w-full items-center overflow-y-scroll">{
            userRole.map((role,index) => (
            <div key={index}
              className={"flex flex-row justify-between items-center rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 w-full " + ((role.datumVykonZrizeni == null) || (role.datumPrikazZruseni != null && role.datumVykonZruseni == null) ? "border-2 border-red-500" : "")}
            >
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold">{role.idRole}</h3>
                <p>Tady bude jednou popis role</p>
              </div>
              <div className="text-lg">

                <LastRoleEvent passedEvent={role}/>
              </div>
              <div className="flex flex-col">
                <UserRoleButton passedRole={role}/>
              </div>
            </div>))
            }
          </div>)}