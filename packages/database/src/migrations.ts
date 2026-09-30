import type Database from "better-sqlite3";

interface Migration {
  version: number;
  name: string;
  sql: string;
}

const migrations: readonly Migration[] = [
  {
    version: 1,
    name: "initial_projects_and_events",
    sql: `
      CREATE TABLE projects (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        canonical_path TEXT NOT NULL,
        remote_url TEXT,
        default_branch TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE UNIQUE INDEX projects_canonical_path_uq ON projects (canonical_path);

      CREATE TABLE domain_events (
        sequence INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        id TEXT NOT NULL,
        aggregate_type TEXT NOT NULL,
        aggregate_id TEXT NOT NULL,
        event_type TEXT NOT NULL,
        schema_version INTEGER NOT NULL,
        occurred_at TEXT NOT NULL,
        correlation_id TEXT NOT NULL,
        causation_id TEXT,
        payload_json TEXT NOT NULL
      );
      CREATE UNIQUE INDEX domain_events_id_uq ON domain_events (id);
      CREATE INDEX domain_events_aggregate_idx
        ON domain_events (aggregate_type, aggregate_id, sequence);
      CREATE INDEX domain_events_correlation_idx ON domain_events (correlation_id);
    `,
  },
];

export function applyMigrations(sqlite: Database.Database): void {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS voxtrace_migrations (
      version INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL
    );
  `);

  const appliedVersions = new Set(
    sqlite
      .prepare<[], { version: number }>(
        "SELECT version FROM voxtrace_migrations ORDER BY version",
      )
      .all()
      .map((row) => row.version),
  );

  for (const migration of migrations) {
    if (appliedVersions.has(migration.version)) continue;

    sqlite.exec("BEGIN IMMEDIATE");
    try {
      sqlite.exec(migration.sql);
      sqlite
        .prepare(
          "INSERT INTO voxtrace_migrations (version, name, applied_at) VALUES (?, ?, ?)",
        )
        .run(migration.version, migration.name, new Date().toISOString());
      sqlite.exec("COMMIT");
    } catch (error) {
      sqlite.exec("ROLLBACK");
      throw error;
    }
  }
}

