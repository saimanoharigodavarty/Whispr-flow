import type { VoxTraceApi } from "../preload/index.js";

declare global {
  interface Window {
    voxtrace?: VoxTraceApi;
  }
}

export {};

