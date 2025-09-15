'use client'

import { UserList,Selector,UserRoleList } from "~/components";
import {GetUsers, GetRoleTable} from "~/server/querys"
import{useEffect,useState} from "react";
import{GetHeaders} from "~/server/headers"


export default function HomePage() {
  const [selectorPos, setSelectorPos] = useState("");
  const [eventTable, setEventTable] = useState<events[]>([]);
  const [allEmps,setAllEmps] = useState<emps[]>([]);
  const [filteredEmps,setFilteredEmps] = useState<emps[]>([]);
  const [curEmp,setCurEmp] = useState<emps>({ email: "", jmeno:"Vyberte",prijmeni:"uživatele",login:""});
  const [Headers,setHeaders] = useState<Headers>();

  interface emps{
    login:string;
    jmeno:string;
    prijmeni:string;
    osobniCislo:number;
    aktivni:number;
    datumOdchod:Date;
    email:string;
  }
  interface events{
    cislo:number;
    login:string;
    idRole:string;
    datumPrikazZrizeni:Date;
    datumVykonZrizeni:Date;
    datumPrikazZruseni:Date;
    datumVykonZruseni:Date;
    loginPrikazZrizeni:string;
    loginVykonZrizeni:string;
    loginPrikazZruseni:string;
    loginVykonZruseni:string;
  }
  useEffect(() => {
    async function fetchData() {
      const fetchedEventTable: events[] = JSON.parse(await GetRoleTable()) as events[];
      const fetchedUsers: emps[] = JSON.parse(await GetUsers()) as emps[];
      const fetchedHeaders = await GetHeaders();
      setEventTable(fetchedEventTable);
      setAllEmps(fetchedUsers);
      setHeaders(fetchedHeaders);
    }
    fetchData().then(() => setSelectorPos("aktivni")).catch(e => console.log(e));
  }, []);

  useEffect(() => {
      if (selectorPos == "aktivni"){
        setFilteredEmps(allEmps.filter((element)=> element.aktivni.data[0] == 1));
        console.log(Headers);
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
            {}
            <UserList users={filteredEmps} changeHandler={setCurEmp} curEmp={curEmp} roleTable={eventTable} selectorPos={selectorPos}/>
          </div>
          <div className="h-1/10 align-center flex flex-row items-center justify-center">
            <Selector changeHandler={setSelectorPos}/>
          </div>
        </div>
        <div id="PravySloupec" className="w-full h-full overflow-hidden flex flex-col">
          <UserRoleList user={curEmp}/>
          </div>
      </div>
  );
}


