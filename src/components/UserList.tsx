  'use client';
  
  export default function UserList(props: { users: any; }) {
  return(
   <div className="h-full overflow-scroll">
    <table className="border w-full">
      <tbody>
        {[...props.users, ...props.users, ...props.users, ...props.users, ...props.users, ...props.users].map((user, index) => (
          <tr className="border w-full h-10 text-center odd:bg-white/20" key={index + "t"}><td key={index}>{user}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
  )}