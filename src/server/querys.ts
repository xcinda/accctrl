'use server'

import { db } from "~/server/db";

export async function GetUsers(){
    const users = await db.query.opLidi.findMany();
    return users;
}

export async function GetAllRoles(){
    const role = await db.query.opRole.findMany();
    return role;
}

export async function GetRolesForUser(user){
  const userRole = await db.query.opHlavni.findMany({
    where: (userRole, { eq }) => eq(userRole.login, user),
});
    return userRole
}