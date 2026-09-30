import { describe, expect, it } from "vitest";

import { eventEnvelopeSchema, verificationStateSchema } from "./index.js";

describe("verificationStateSchema", () => {
  it("rejects invented verification states", () => {
    expect(verificationStateSchema.safeParse("probably-verified").success).toBe(false);
  });
});

describe("eventEnvelopeSchema", () => {
  it("requires a positive sequence number", () => {
    const result = eventEnvelopeSchema.safeParse({
      id: "15cb0bc1-3d30-47f2-989a-4f81a8c9d828",
      sequence: 0,
      aggregateType: "project",
      aggregateId: "9621bb99-2597-4eb2-a3e5-84db2f88d945",
      eventType: "RepositoryImported",
      schemaVersion: 1,
      occurredAt: "2026-09-30T00:00:00.000Z",
      correlationId: "b699f487-aad8-464f-8c45-77784a14186a",
      payload: {},
    });

    expect(result.success).toBe(false);
  });
});

