# VoxTrace

> Voice → Intent → Code → Evidence → Verification

VoxTrace is a local-first evidence and verification layer for voice-driven and AI-assisted software development. It connects what a developer asked for to the repository changes, commands, tests, and artifacts that demonstrate whether the resulting implementation actually works.

AI can make a claim. VoxTrace asks: **can you prove it?**

## Why VoxTrace

AI coding tools can produce code quickly, but their completion claims are not evidence. Prompts disappear into chat histories, repository changes lose their original context, and passing test suites may not prove the requirement that was requested.

VoxTrace is designed to preserve this chain:

```text
Wispr Flow voice instruction
            ↓
Original developer intent
            ↓
Approved acceptance criteria
            ↓
Real repository changes
            ↓
Tests, builds, and browser checks
            ↓
Evidence-backed verification
```

## Trust principles

- Production views use real repository, process, test, and artifact data.
- The original dictated intent is preserved separately from AI-normalized text.
- AI may suggest and summarize, but it cannot mark a criterion as verified.
- Verification decisions are bound to the repository state they evaluated.
- Evidence becomes stale when relevant implementation code changes.
- Source code and evidence remain local unless the user explicitly exports them.
- Commands are reviewed before execution and stored as executable-plus-argument specifications.

## Planned workflow

1. Import a local Git repository.
2. Start a development session.
3. Dictate an implementation request using Wispr Flow.
4. Review and approve a structured Intent Contract.
5. Implement the feature in an external IDE.
6. Observe real Git and filesystem changes in VoxTrace.
7. Run approved verification commands.
8. Map machine-readable evidence to acceptance criteria.
9. Inspect verified, failed, missing, inconclusive, or stale results.
10. Replay and export the evidence-backed development history.

## Verification states

| State | Meaning |
| --- | --- |
| `verified` | Required deterministic evidence passed against the applicable repository state. |
| `stale` | Evidence passed previously, but relevant implementation state changed. |
| `unverified` | Sufficient evidence has not been collected. |
| `failed` | Current evidence contradicts the criterion. |
| `inconclusive` | Available evidence cannot establish the claim reliably. |
| `waived` | A human explicitly accepted an exception and recorded a reason. |

## Current foundation

The repository currently includes:

- an Electron, React, Vite, and TypeScript desktop foundation;
- isolated Electron main, preload, and renderer boundaries;
- runtime-validated shared contracts using Zod;
- a pnpm and Turborepo workspace;
- SQLite persistence through Drizzle ORM and `better-sqlite3`;
- WAL mode, foreign-key enforcement, and transactional migrations;
- project and append-only domain-event tables;
- lint, type-check, test, and production-build gates.

VoxTrace is under active development. Repository observation, intent contracts, evidence collection, and deterministic verification are not yet complete.

## Repository structure

```text
apps/
  desktop/              Electron main, preload, and React renderer
packages/
  contracts/            Shared runtime schemas and TypeScript types
  database/             SQLite connection, schema, and migrations
```

Additional domain packages will be introduced only when their boundaries are supported by working functionality.

## Requirements

- Node.js 24 or newer
- Git
- Windows, macOS, or Linux

The application is currently developed and tested primarily on Windows.

## Install

The repository pins pnpm `10.17.1` as a local development dependency. If pnpm is installed globally:

```bash
pnpm install
```

Without a global pnpm installation on Windows:

```powershell
node_modules\.bin\pnpm.cmd install
```

`better-sqlite3` is the only dependency currently permitted to run an installation build script.

## Development commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm dev
```

On Windows without global pnpm, replace `pnpm` with `node_modules\.bin\pnpm.cmd`.

## Security model

The Electron renderer runs with:

- context isolation enabled;
- Node integration disabled;
- Chromium sandboxing enabled;
- a narrow preload bridge;
- runtime validation at IPC boundaries;
- a restrictive Content Security Policy.

Future repository access and command execution will remain in the privileged main process and will not be exposed directly to the renderer.

## Development status

VoxTrace is pre-release software. The trusted persistence foundation works, but the complete end-to-end product is still being implemented. No production readiness or security certification is claimed.

## License

No license has been selected yet. All rights are reserved until a license file is added.
