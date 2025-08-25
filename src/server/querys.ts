'use server'

import type { SQLWrapper } from "drizzle-orm";
import { db } from "~/server/db";
import { desc, asc, eq, and, isNull } from 'drizzle-orm';
import { opHlavni } from "drizzle/schema";

export async function GetUsers(){
    const users = await db.query.opLidi.findMany({
	orderBy: (opLidi, { asc }) => [asc(opLidi.prijmeni)],
});
    return JSON.stringify(users);
}

export async function GetAllRoles(){
    const role = await db.query.opRole.findMany();
    return JSON.stringify(role);
}

export async function GetRoleByName(userRole){
    const role = await db.query.opRole.findMany({
        where: (role, { eq }) => eq(role.idRole, userRole)
});
    return JSON.stringify(role);
}

export async function GetRoleTable(){
    const roleTable = await db.query.opHlavni.findMany();
    return JSON.stringify(roleTable);
}

export async function GetRolesForUser(user: string | SQLWrapper){
  const userRole = await db.query.opHlavni.findMany({
    where: (userRole, { eq }) => eq(userRole.login, user),
    orderBy: (opHlavni, { asc }) => [asc(opHlavni.idRole)],
});
    return JSON.stringify(userRole);
}