import { z } from "zod";

export const verificationStateSchema = z.enum([
  "verified",
  "stale",
  "unverified",
  "failed",
  "inconclusive",
  "waived",
]);

export type VerificationState = z.infer<typeof verificationStateSchema>;

export const repositorySnapshotSchema = z.object({
  canonicalPath: z.string().min(1),
  branch: z.string().min(1).nullable(),
  headSha: z.string().regex(/^[0-9a-f]{40}$/iu),
  fingerprint: z.string().regex(/^[0-9a-f]{64}$/iu),
  capturedAt: z.string().datetime(),
});

export type RepositorySnapshot = z.infer<typeof repositorySnapshotSchema>;

export const eventEnvelopeSchema = z.object({
  id: z.string().uuid(),
  sequence: z.number().int().positive(),
  aggregateType: z.string().min(1),
  aggregateId: z.string().uuid(),
  eventType: z.string().min(1),
  schemaVersion: z.number().int().positive(),
  occurredAt: z.string().datetime(),
  correlationId: z.string().uuid(),
  causationId: z.string().uuid().optional(),
  payload: z.unknown(),
});

export type EventEnvelope = z.infer<typeof eventEnvelopeSchema>;

export const appInfoSchema = z.object({
  name: z.literal("VoxTrace"),
  version: z.string().min(1),
  platform: z.string().min(1),
});

export type AppInfo = z.infer<typeof appInfoSchema>;

