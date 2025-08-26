'use client'

import { UserList,Selector,UserRoleList } from "~/components";
import {GetUsers, GetRoleTable} from "~/server/querys"
import{useEffect,useState} from "react";

export default function HomePage() {
  const [selectorPos, setSelectorPos] = useState("vsichni");
  const [eventTable, setEventTable] = useState([]);
  const [allEmps,setAllEmps] = useState([]);
  const [filteredEmps,setFilteredEmps] = useState([]);
  const [curUser,setCurUser] = useState({jmeno:"Vyberte",prijmeni:"uživatele",login:""});

  useEffect(() => {
    async function fetchData() {
      const fetchedEventTable = JSON.parse(await GetRoleTable());
      const fetchedUsers = JSON.parse(await GetUsers());
      setEventTable(fetchedEventTable);
      setAllEmps(fetchedUsers);
      if (selectorPos == "vsichni"){
        setFilteredEmps(fetchedUsers);
      }else if (selectorPos == "aktivni"){
        setFilteredEmps(fetchedUsers.filter((element)=> element.aktivni.data[0] == 1));
      }else if (selectorPos == "notif"){
        var tempEmpList = []
        fetchedUsers.forEach(element => {
          if(fetchedEventTable.find((passedEmpEvent) => ((passedEmpEvent.login == element.login && passedEmpEvent.datumVykonZrizeni == null) || (passedEmpEvent.login == element.login && passedEmpEvent.datumPrikazZruseni != null && passedEmpEvent.datumVykonZruseni == null)))){
            tempEmpList.push(element)
          }
          setFilteredEmps(tempEmpList);
        });
      }
      
    }

    void fetchData();
  }, [selectorPos]);


  return (
      <div className="flex flex-row justify-between h-full w-7/10 overflow-hidden pt-10 gap-6">
        <div id="LevySloupec" className="w-1/4 h-full overflow-hidden flex flex-col">
          <div className="overflow-hidden flex-1">
            <UserList users={filteredEmps} changeHandler={setCurUser} curUser={curUser} roleTable={eventTable} selectorPos={selectorPos}/>
          </div>
          <div className="h-1/10 align-center flex flex-row items-center justify-center">
            <Selector changeHandler={setSelectorPos}/>
          </div>
        </div>
        <div id="PravySloupec" className="w-full h-full overflow-hidden flex flex-col">
          <UserRoleList user={curUser}/>
          </div>
      </div>
  );
}


