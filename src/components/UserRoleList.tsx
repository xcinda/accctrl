import {useEffect,useState} from "react";
import {GetRolesForUser} from "~/server/querys"

export default function UserRoleList(props: { userRole: any[]; user; }){
    const [userRole, setUserRole] = useState([]);
      useEffect(() => {
        async function fetchData() {
          const fetchedUserRole = JSON.parse(await GetRolesForUser(props.user.login));
          setUserRole(fetchedUserRole);
        }

        fetchData();
      }, [props.user]);
    return(
          <div className="h-full flex flex-col gap-4 w-full items-center overflow-y-scroll">{
            userRole.map((role,index) => (
            <div key={index}
              className="flex flex-row justify-between items-center rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 w-full"
            >
              <h3 className="text-2xl font-bold">{role.idRole}</h3>
              <div className="text-lg">
                {role.datumVykonZrizeni}
              </div>
              <div className="flex flex-col"> <button>Přidělit přístup</button></div>
            </div>))
            }
          </div>)}