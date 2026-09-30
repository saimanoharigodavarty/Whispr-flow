import { randomUUID } from "node:crypto";

import { eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";

import { openDatabase, projects } from "./index.js";

describe("openDatabase", () => {
  it("applies migrations and persists real project records", () => {
    const database = openDatabase(":memory:");
    const now = new Date().toISOString();
    const project = {
      id: randomUUID(),
      name: "fixture",
      canonicalPath: "D:/fixtures/project",
      createdAt: now,
      updatedAt: now,
    };

    try {
      database.db.insert(projects).values(project).run();
      const stored = database.db
        .select()
        .from(projects)
        .where(eq(projects.id, project.id))
        .get();

      expect(stored).toMatchObject(project);
    } finally {
      database.close();
    }
  });

  it("applies migrations idempotently", () => {
    const database = openDatabase(":memory:");
    try {
      const migrations = database.sqlite
        .prepare("SELECT version, name FROM voxtrace_migrations")
        .all();
      expect(migrations).toEqual([
        { version: 1, name: "initial_projects_and_events" },
      ]);
    } finally {
      database.close();
    }
  });
});

