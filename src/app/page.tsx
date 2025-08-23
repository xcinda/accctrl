'use client'

import Link from "next/link";
import { UserList,Selector,UserRoleList } from "~/components";
import {GetUsers,GetAllRoles} from "~/server/querys"
import{useEffect,useState} from "react";

export default function HomePage() {
  const [userRole, setUserRole] = useState([]);
  const [role, setRole] = useState([]);
  const [users,setUsers] = useState([]);
  const [curUser,setCurUser] = useState({jmeno:"Vyberte",prijmeni:"uživatele",login:""});

  useEffect(() => {
    async function fetchData() {
      const fetchedRoles = JSON.parse(await GetAllRoles());
      const fetchedUsers = JSON.parse(await GetUsers());
      setRole(fetchedRoles);
      setUsers(fetchedUsers);
    }

    fetchData();
  }, []);
  
  return (
      <div className="flex flex-row justify-between h-full w-7/10 overflow-hidden pt-10 gap-6">
        <div id="LevySloupec" className="w-1/4 h-full overflow-hidden flex flex-col">
          <div className="overflow-hidden flex-1">
            <UserList users={users} changeHandler={setCurUser} curUser={curUser}/>
          </div>
          <div className="h-20 align-center">
            <Selector/>
          </div>
        </div>
        <div id="PravySloupec" className="w-full h-full overflow-hidden flex flex-col">
          <UserRoleList user={curUser}/>
          </div>
      </div>
  );
}


