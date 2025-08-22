import {useEffect,useState} from "react";
import {GetRolesForUser} from "~/server/querys"

export function UserRoleButton({passedRole}){
  if (passedRole.datumVykonZruseni) {
    return(<h1>zruseno</h1>)
  } else {
    return(<h1>nezruseno</h1>)
  }
}


export default function UserRoleList(props: { user; }){
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
                Přikázáno {role.datumPrikazZrizeni} uživatelem {role.loginPrikazZrizeni}<br/>
                Přiděleno {role.datumVykonZrizeni} uživatelem {role.loginVykonZrizeni}<br/>
              </div>
              <div className="flex flex-col">
                <UserRoleButton passedRole={role}/>
              </div>
            </div>))
            }
          </div>)}