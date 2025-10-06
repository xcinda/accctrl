'use client'

import { UserList,Selector,UserRoleList } from "~/components";
import {GetUsers, GetRoleTable} from "~/server/querys"
import{useEffect,useState} from "react";
import * as schema from "~/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";

type emps = InferSelectModel<typeof schema.opLidi>;
type events = InferSelectModel<typeof schema.opHlavni>;

export default function HomePage() {
  const [selectorPos, setSelectorPos] = useState("");
  const [eventTable, setEventTable] = useState<events[]>([]);
  const [allEmps,setAllEmps] = useState<emps[]>([]);
  const [filteredEmps,setFilteredEmps] = useState<emps[]>([]);
  const [curEmp,setCurEmp] = useState<emps>({ email: null, jmeno:"Vyberte",prijmeni:"uživatele",login:"",aktivni:1,osobniCislo:null,datumOdchod:null});
  const [username,setUsername] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await(fetch("api/authUser").then((promise) => promise.json()));
      const fetchedEventTable: events[] = JSON.parse(await GetRoleTable()) as events[];
      const fetchedUsers: emps[] = JSON.parse(await GetUsers()) as emps[];
      setEventTable(fetchedEventTable);
      setAllEmps(fetchedUsers);
      setUsername(fetchedUser.username);
    }
    fetchData().then(() => setSelectorPos("aktivni")).catch(e => console.log(e));
  }, []);

  useEffect(() => {
      if (selectorPos == "aktivni"){
        setFilteredEmps(allEmps.filter((filterEmp)=> filterEmp.aktivni.data[0] == 1));
      }else if (selectorPos == "notif"){
        const tempEmpList: emps[] = []
        allEmps.forEach(element => {
          if(eventTable.find((passedEmpEvent) => ((passedEmpEvent.login == element.login && passedEmpEvent.datumVykonZrizeni == null) || (passedEmpEvent.login == element.login && passedEmpEvent.datumPrikazZruseni != null && passedEmpEvent.datumVykonZruseni == null)))){
            tempEmpList.push(element)
          }
          setFilteredEmps(tempEmpList);
        });
      }else{
        setFilteredEmps(allEmps);
      }
  },[selectorPos,allEmps,eventTable])

  return (
      <div className="flex flex-row justify-between h-full w-7/10 overflow-hidden pt-10 gap-6">
        <div id="LevySloupec" className="w-1/4 h-full overflow-hidden flex flex-col">
          <div className="overflow-hidden flex-1">
            <UserList users={filteredEmps} changeHandler={setCurEmp} curEmp={curEmp} eventTable={eventTable} selectorPos={selectorPos}/>
          </div>
          <div className="h-1/10 align-center flex flex-row items-center justify-center">
            <Selector changeHandler={setSelectorPos}/>
          </div>
        </div>
        <div id="PravySloupec" className="w-full h-full overflow-hidden flex flex-col">
          <UserRoleList emp={curEmp} username={username}/>
          </div>
      </div>
  );
}


