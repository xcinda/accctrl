'use client'
import {useState} from "react";

export default function UserList(props: { users: any[]; changeHandler: (arg0: any) => void}) {

    return(
      <div>
        <div className="w-full text-center text-xl font-bold pb-3"></div>
        <div className="h-full overflow-scroll">
          <table className="border w-full">
            <tbody>
              {props.users.map((user, index) => (
                <tr className="border w-full h-10 text-center odd:bg-white/20" key={index + "t"}><td key={index}><button onClick={() => props.changeHandler(user.login)}>{user.jmeno + " " + user.prijmeni}</button></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )}