import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, int, varchar, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const opAd = mysqlTable("op_ad", {
	cislo: int().autoincrement().notNull(),
	idRole: varchar("id_role", { length: 50 }).notNull().references(() => opRole.idRole),
},
(table) => [
	index("cislo").on(table.cislo),
]);

export const opAdmin = mysqlTable("op_admin", {
	cislo: int().autoincrement().notNull(),
	login: varchar({ length: 50 }).default('NULL').references(() => opLidi.login),
	idRole: varchar("id_role", { length: 50 }).default('NULL').references(() => opRole.idRole),
	prikazce: int().default(0),
	vykonavatel: int().default(0)
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("prikazce"),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("vykonavatel"),
},
(table) => [
	index("Cislo").on(table.cislo),
]);

export const opFunkce = mysqlTable("op_funkce", {
	funkce: varchar({ length: 50 }).default('\'').notNull(),
	cislo: int().default(0).notNull(),
	idRole: varchar("id_role", { length: 50 }).default('\'').notNull().references(() => opRole.idRole),
},
(table) => [
	index("cislo").on(table.cislo),
]);

export const opHlavni = mysqlTable("op_hlavni", {
	cislo: int().autoincrement().notNull(),
	login: varchar({ length: 50 }).notNull().references(() => opLidi.login),
	idRole: varchar("id_role", { length: 50 }).default('NULL').references(() => opRole.idRole),
	datumPrikazZrizeni: timestamp("datum_prikaz_zrizeni", { mode: 'string' }).default('NULL'),
	datumVykonZrizeni: timestamp("datum_vykon_zrizeni", { mode: 'string' }).default('NULL'),
	datumPrikazZruseni: timestamp("datum_prikaz_zruseni", { mode: 'string' }).default('NULL'),
	datumVykonZruseni: timestamp("datum_vykon_zruseni", { mode: 'string' }).default('NULL'),
	loginPrikazZrizeni: varchar("login_prikaz_zrizeni", { length: 50 }).default('NULL').references(() => opAdmin.login),
	loginVykonZrizeni: varchar("login_vykon_zrizeni", { length: 50 }).default('NULL').references(() => opAdmin.login),
	loginPrikazZruseni: varchar("login_prikaz_zruseni", { length: 50 }).default('NULL').references(() => opAdmin.login),
	loginVykonZruseni: varchar("login_vykon_zruseni", { length: 50 }).default('NULL').references(() => opAdmin.login),
},
(table) => [
	index("cislo").on(table.cislo),
]);

export const opLidi = mysqlTable("op_lidi", {
	login: varchar({ length: 50 }).notNull(),
	jmeno: varchar({ length: 50 }).notNull(),
	prijmeni: varchar({ length: 50 }).notNull(),
	aktivni: int(),
	// Warning: Can't parse bit(1) from database
	// bit(1)Type: bit(1)("aktivni"),
	osobniCislo: int("osobni_cislo").default('NULL'),
	datumOdchod: timestamp("datum_odchod", { mode: 'string' }).default('NULL'),
	email: varchar({ length: 50 }).default('NULL'),
},
(table) => [
	index("Login").on(table.login),
]);

export const opRole = mysqlTable("op_role", {
	idRole: varchar("id_role", { length: 50 }).notNull(),
	nazevRole: varchar("nazev_role", { length: 50 }).notNull(),
	url: varchar({ length: 50 }).default('NULL'),
	poznamka: varchar({ length: 50 }).default('NULL'),
},
(table) => [
	index("ID_role").on(table.idRole),
]);
