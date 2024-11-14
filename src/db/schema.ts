import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, serial, text, timestamp, uuid, boolean, index
} from 'drizzle-orm/pg-core'

export const accountTypeEnum = pgEnum("accountType",["email","google","github"]);

export const users = pgTable("users",{
    id: serial("id").primaryKey(),
    email: text("email").unique(),
    emailVerified: boolean("verifiedEmail").default(false),
    emailDateVerify: timestamp("emailVerifyDate",{ mode: "date"})
})

export const accounts = pgTable("accounts",{
    id: serial("id").primaryKey(),
    userId: integer("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade"}),
    accountType: accountTypeEnum("accountType").notNull(),
    githubId: text("githubId").unique(),
    googleId: text("googleId").unique(),
    password: text("password"),
    salt: text("salt"),
},(table) => ({
    userIdAccountTypeIdx: index("user_id_account_type_idx").on(
        table.userId,
        table.accountType
    )
}))

export const profiles = pgTable("profiles",{
    id: serial("id").primaryKey(),
    userId: integer("userId")
    .notNull()
    .references(() => users.id,{ onDelete: "cascade"})
    .unique(),
    name: text("name"),
    lastName: text("lastName")
})

export const houses = pgTable("houseDirectoryTable",{
    id: uuid("id").defaultRandom().primaryKey(),
    identifier: text("identifier").notNull(),
})

export const residents = pgTable("residentTable",{
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    lastName: text("lastName"),
    email: text("email"),
    phone: text("phone").notNull(),
    houseId: uuid("houseId")
})


export const sessions = pgTable("sessions",{
    id: text("id").primaryKey(),
    userId: integer("userId")
    .notNull()
    .references(() => users.id,{onDelete: "cascade"}),
    expiresAt: timestamp("expiresAt",{
        withTimezone: true,
        mode: "date"
    }).notNull()
},(table) =>({
    userIdIdx: index("sessions_user_id_idx").on(table.userId)
}))

// RELATION SECTION
export const houseRelations = relations(houses, ({ many }) => ({
    residents: many(residents),
}));

export const residentRelations = relations(residents, ({ one }) => ({
    house: one(houses, {
        fields: [residents.houseId],
        references: [houses.id],
    }),
}));




