import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import { applyMigrations } from "./migrations.js";
import * as schema from "./schema.js";

export interface VoxTraceDatabase {
  sqlite: Database.Database;
  db: BetterSQLite3Database<typeof schema>;
  close(): void;
}

export function openDatabase(filename: string): VoxTraceDatabase {
  if (filename !== ":memory:") mkdirSync(dirname(filename), { recursive: true });

  const sqlite = new Database(filename);
  sqlite.pragma("foreign_keys = ON");
  sqlite.pragma("busy_timeout = 5000");
  if (filename !== ":memory:") sqlite.pragma("journal_mode = WAL");

  try {
    applyMigrations(sqlite);
    const db = drizzle(sqlite, { schema });
    return {
      sqlite,
      db,
      close: () => sqlite.close(),
    };
  } catch (error) {
    sqlite.close();
    throw error;
  }
}

export { domainEvents, projects } from "./schema.js";
export type {
  DomainEventRecord,
  NewProjectRecord,
  ProjectRecord,
} from "./schema.js";

