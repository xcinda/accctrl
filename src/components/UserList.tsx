'use client'

import {useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {Button} from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"


const FormSchema = z.object({
  login: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  jmeno: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  prijmeni: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  osobniCislo: z.number(),
  aktivni: z.boolean()
})

const editFormItems = [
  { id:"login",
    label: "login"
  },
  { id:"jmeno",
    label: "Jméno"
  },
  { id:"prijmeni",
    label: "Přijmení"
  },
  { id:"osobniCislo",
    label: "Osobní číslo"
  }
]

export function InputForm({user}) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      login: user.login,
      jmeno: user.jmeno,
      prijmeni: user.prijmeni,
      osobniCislo: user.osobniCislo,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(user.aktivni + Boolean(user.aktivni));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {editFormItems.map((item) => (
        <FormField
          control={form.control}
          name={item.id}
          key={item.id}
          render={({ field }) => (
            <FormItem key={item.id}>
              <FormLabel>{item.label}</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        ))}
        
          <FormField
          control={form.control}
          name="aktivni"
          render={({ field }) => (
            <FormItem key="aktivni">
              <FormLabel>Aktivní</FormLabel>
              <FormControl>
                <Checkbox {...field} />
              </FormControl>
            </FormItem>)} />
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export function UserCell(props){
  function findNotifRole(){
      const checkRole = props.roleTable.find((element) => (element.datumVykonZrizeni == null && element.login == props.user.login) || (element.datumPrikazZruseni != null && element.datumVykonZruseni == null && element.login == props.user.login))
      return (checkRole != null)
  }
  const notifRole = findNotifRole();
  console.log(notifRole);
  return(
    <tr className={"border w-full h-10 text-center "+ (notifRole ? "bg-red-600/50 hover:bg-red-600/80" : "odd:bg-white/10 hover:bg-white/20")}  key={props.index + "t"} onClick={() => props.changeHandler(props.user)}><td key={props.index}>{props.user.jmeno + " " + props.user.prijmeni}</td></tr>
  )
}

export default function UserList(props: { users: any[]; changeHandler: (arg0: any) => void; curUser: { jmeno: string; prijmeni: string; };roleTable}) {
    return(
      <div className="h-full flex flex-col">
        <div className="w-full text-center text-xl font-bold pb-4 pt-4 flex flex-row justify-around">{props.curUser.jmeno + " "  + props.curUser.prijmeni} <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Editovat</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <InputForm user={props.curUser}/>
      </PopoverContent>
    </Popover></div>
          <div className="h-full w-full overflow-y-scroll p-0">
            <table className="border w-full">
              <tbody>
                {props.users.map((user, index) => (
                  <UserCell changeHandler={props.changeHandler} user={user} key={index} roleTable={props.roleTable}/>
                ))}
              </tbody>
            </table>
          </div>
      </div>
  )}