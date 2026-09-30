import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable(
  "projects",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    canonicalPath: text("canonical_path").notNull(),
    remoteUrl: text("remote_url"),
    defaultBranch: text("default_branch"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [uniqueIndex("projects_canonical_path_uq").on(table.canonicalPath)],
);

export const domainEvents = sqliteTable(
  "domain_events",
  {
    sequence: integer("sequence").primaryKey({ autoIncrement: true }),
    id: text("id").notNull(),
    aggregateType: text("aggregate_type").notNull(),
    aggregateId: text("aggregate_id").notNull(),
    eventType: text("event_type").notNull(),
    schemaVersion: integer("schema_version").notNull(),
    occurredAt: text("occurred_at").notNull(),
    correlationId: text("correlation_id").notNull(),
    causationId: text("causation_id"),
    payloadJson: text("payload_json").notNull(),
  },
  (table) => [
    uniqueIndex("domain_events_id_uq").on(table.id),
    index("domain_events_aggregate_idx").on(table.aggregateType, table.aggregateId, table.sequence),
    index("domain_events_correlation_idx").on(table.correlationId),
  ],
);

export type ProjectRecord = typeof projects.$inferSelect;
export type NewProjectRecord = typeof projects.$inferInsert;
export type DomainEventRecord = typeof domainEvents.$inferSelect;

