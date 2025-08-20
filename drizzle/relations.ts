import { relations } from "drizzle-orm/relations";
import { opRole, opAd, opLidi, opAdmin, opFunkce, opHlavni } from "./schema";

export const opAdRelations = relations(opAd, ({one}) => ({
	opRole: one(opRole, {
		fields: [opAd.idRole],
		references: [opRole.idRole]
	}),
}));

export const opRoleRelations = relations(opRole, ({many}) => ({
	opAds: many(opAd),
	opAdmins: many(opAdmin),
	opFunkces: many(opFunkce),
	opHlavnis: many(opHlavni),
}));

export const opAdminRelations = relations(opAdmin, ({one, many}) => ({
	opLidi: one(opLidi, {
		fields: [opAdmin.login],
		references: [opLidi.login]
	}),
	opRole: one(opRole, {
		fields: [opAdmin.idRole],
		references: [opRole.idRole]
	}),
	opHlavnis_loginPrikazZrizeni: many(opHlavni, {
		relationName: "opHlavni_loginPrikazZrizeni_opAdmin_login"
	}),
	opHlavnis_loginVykonZrizeni: many(opHlavni, {
		relationName: "opHlavni_loginVykonZrizeni_opAdmin_login"
	}),
	opHlavnis_loginPrikazZruseni: many(opHlavni, {
		relationName: "opHlavni_loginPrikazZruseni_opAdmin_login"
	}),
	opHlavnis_loginVykonZruseni: many(opHlavni, {
		relationName: "opHlavni_loginVykonZruseni_opAdmin_login"
	}),
}));

export const opLidiRelations = relations(opLidi, ({many}) => ({
	opAdmins: many(opAdmin),
	opHlavnis: many(opHlavni),
}));

export const opFunkceRelations = relations(opFunkce, ({one}) => ({
	opRole: one(opRole, {
		fields: [opFunkce.idRole],
		references: [opRole.idRole]
	}),
}));

export const opHlavniRelations = relations(opHlavni, ({one}) => ({
	opAdmin_loginPrikazZrizeni: one(opAdmin, {
		fields: [opHlavni.loginPrikazZrizeni],
		references: [opAdmin.login],
		relationName: "opHlavni_loginPrikazZrizeni_opAdmin_login"
	}),
	opAdmin_loginVykonZrizeni: one(opAdmin, {
		fields: [opHlavni.loginVykonZrizeni],
		references: [opAdmin.login],
		relationName: "opHlavni_loginVykonZrizeni_opAdmin_login"
	}),
	opAdmin_loginPrikazZruseni: one(opAdmin, {
		fields: [opHlavni.loginPrikazZruseni],
		references: [opAdmin.login],
		relationName: "opHlavni_loginPrikazZruseni_opAdmin_login"
	}),
	opAdmin_loginVykonZruseni: one(opAdmin, {
		fields: [opHlavni.loginVykonZruseni],
		references: [opAdmin.login],
		relationName: "opHlavni_loginVykonZruseni_opAdmin_login"
	}),
	opLidi: one(opLidi, {
		fields: [opHlavni.login],
		references: [opLidi.login]
	}),
	opRole: one(opRole, {
		fields: [opHlavni.idRole],
		references: [opRole.idRole]
	}),
}));