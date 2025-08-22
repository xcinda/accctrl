import { db } from "~/server/db";

export async function GetUsers(){
    const users = await db.query.opLidi.findMany();
    return users;
}