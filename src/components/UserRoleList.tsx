'use client'

import {useEffect,useState} from "react";
import {GetEventsForUser, GetUserAdmin} from "~/server/querys"
import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import * as schema from "~/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";

type emps = InferSelectModel<typeof schema.opLidi>;
type events = InferSelectModel<typeof schema.opHlavni>;
type admins = InferSelectModel<typeof schema.opAdmin>;

export function UserRoleButton({passedEvent,userAdmin}: {passedEvent: events, userAdmin: admins[]}){
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

  const userPerms = userAdmin.find((element:admins) => element.idRole == passedEvent.idRole);

  if(userPerms){
    if (passedEvent.datumVykonZruseni && userPerms.prikazce) {
      return(<Button onClick={znovuPrikazat}>Znovu přikázat zřízení</Button>)
    } else if (passedEvent.datumVykonZrizeni && passedEvent.datumPrikazZruseni == null && userPerms.prikazce) {
      return(<Button onClick={prikazatZruseni}>Přikázat zrušení</Button>)
    } else if (passedEvent.datumPrikazZruseni && passedEvent.datumVykonZruseni == null && userPerms.vykonavatel) {
      return(<Button variant="secondary" onClick={provestZruseni}>Provést zrušení</Button>)
    }else if (passedEvent.datumPrikazZrizeni && passedEvent.datumVykonZrizeni == null && userPerms.vykonavatel){
      return(<Button variant="secondary" onClick={provestZrizeni}>Provést zřízení</Button>)
    }else{
      return(<div>Nemáte oprávnění k provedení akce</div>)
    }
  }else{
    return(<div>Nemáte oprávnění k provedení akce</div>)
  }

}

export function LastRoleEvent({passedEvent}: {passedEvent: events}){
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


export default function UserEventList(props: { emp: emps ;username: string }){
    const [empEvents, setEmpEvents] = useState<events[]>([]);
    const [userAdmin, setUserAdmin] = useState<admins[]>([]);
      useEffect(() => {
        async function fetchData() {
          const fetchedEmpEvents = JSON.parse(await GetEventsForUser(props.emp.login));
          const fetchedUserAdmin = JSON.parse(await GetUserAdmin(props.username));
          setUserAdmin(fetchedUserAdmin);
          setEmpEvents(fetchedEmpEvents);
        }

        void fetchData();
      }, [props.emp]);
    return(
          <div className="h-full flex flex-col gap-4 w-full items-center overflow-y-scroll">{
            empEvents.map((event,index) => (
            <div key={index}
              className={"flex flex-row justify-between items-center rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 w-full " + ((event.datumVykonZrizeni == null) || (event.datumPrikazZruseni != null && event.datumVykonZruseni == null) ? "border-2 border-red-500" : "")}
            >
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold">{event.idRole}</h3>
                <p></p>
              </div>
              <div className="text-lg">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button><LastRoleEvent passedEvent={event} /></button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-auto">
                      <div className="flex justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">Historie událostí u role</h4>
                          {event.datumPrikazZrizeni ? <p className="text-sm">Nařízeno přidělení <b>{event.datumPrikazZrizeni}</b> uživatelem <b>{event.loginPrikazZrizeni}</b></p> : ""}
                          {event.datumVykonZrizeni ? <p className="text-sm">Přiděleno <b>{event.datumVykonZrizeni}</b> uživatelem <b>{event.loginVykonZrizeni}</b></p> : ""}
                          {event.datumPrikazZruseni ? <p className="text-sm">Nařízeno zrušení <b>{event.datumPrikazZruseni}</b> uživatelem <b>{event.loginPrikazZruseni}</b></p> : ""}
                          {event.datumVykonZruseni ? <p className="text-sm">Zrušeno <b>{event.datumVykonZruseni}</b> uživatelem <b>{event.loginVykonZruseni}</b></p> : ""}
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
              </div>
              <div className="flex flex-col">
                <UserRoleButton passedEvent={event} userAdmin={userAdmin}/>
              </div>
            </div>))
            }
          </div>)}