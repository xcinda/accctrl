  export default function UserList(props: { users: any; }) {
  return <div className="h-auto overflow-scroll">
    <table className="border w-full">
      <tbody className="h-1/10">
        {[...props.users, ...props.users, ...props.users, ...props.users, ...props.users, ...props.users].map((user, index) => (
          <tr className="border w-full h-10 text-center odd:bg-white/20" key={index + "t"}><td key={index}>{user}</td></tr>
        ))}
      </tbody>
    </table>
  </div>}