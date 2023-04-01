import knex from "knex";

declare module "knex/types/tables" {
  interface Filter {
    id: string;
    guild: string;
    type: "guild" | "role" | "channel" | "user";
    filter: string;
  }

  interface Chatbot {
    id: string;
    name?: string;
    avatar?: string;
    persona?: string;
    hello?: string;
    keywords?: string;
  }

  interface Tables {
    filters: Filter;
    chatbots: Chatbot;
  }
}

const db = knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data.db",
  },
});

if (!(await db.schema.hasTable("filters")))
  await db.schema.createTable("filters", (table) => {
    table.string("id");
    table.string("type");
    table.string("guild");
    table.string("filter");
  });

if (!(await db.schema.hasTable("chatbots")))
  await db.schema.createTable("chatbots", (table) => {
    table.string("id");
    table.string("name");
    table.string("avatar");
    table.string("persona");
    table.string("hello");
    table.string("keywords");
  });

export default db;
