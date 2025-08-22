'use client'

import Link from "next/link";
import { UserList,Selector,UserRoleList } from "~/components";
import {GetUsers,GetAllRoles,GetRolesForUser} from "~/server/querys"
import{useEffect,useState} from "react";

export default function HomePage() {
  const [userRole, setUserRole] = useState([]);
  const [role, setRole] = useState([]);
  const [users,setUsers] = useState([]);
  const [curUser,setCurUser] = useState();

  useEffect(() => {
    async function fetchData() {
      const fetchedUserRole = JSON.parse(await GetRolesForUser(curUser));
      const fetchedRoles = JSON.parse(await GetAllRoles());
      const fetchedUsers = JSON.parse(await GetUsers());
      setUserRole(fetchedUserRole);
      setRole(fetchedRoles);
      setUsers(fetchedUsers);
    }

    fetchData();
  }, [curUser]);


  return (
      <div className="flex flex-row justify-between h-full w-7/10 overflow-hidden pt-10">
        <div id="LevySloupec" className="w-1/4 h-full overflow-hidden flex flex-col">
          <div className="overflow-scroll flex-1">
            <UserList users={users} changeHandler={setCurUser}/>
          </div>
          <div className="h-20 align-center">
            <Selector/>
          </div>
        </div>
          <div className="w-full h-full overflow-scroll">
            <div className="flex flex-col w-full items-center overflow-scroll">
        <div id="PravySloupec" className="flex flex-row justify-between w-7/10">
          <UserRoleList userRole={userRole}/>
        </div>
      </div>
          </div>
      </div>
  );
}


