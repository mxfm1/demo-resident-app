import { sql } from "drizzle-orm";
import { database } from ".";

async function main(){
    const tablesSchema = await database._.schema;
    if(!tablesSchema) throw new Error("Schemas are not loaded..");

    await database.execute(sql.raw(`DROP TABLE IF EXISTS "users" CASCADE`));
}

main()