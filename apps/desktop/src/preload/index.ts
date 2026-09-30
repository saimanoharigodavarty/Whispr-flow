import { contextBridge, ipcRenderer } from "electron";

import { appInfoSchema, type AppInfo } from "@voxtrace/contracts";

export interface VoxTraceApi {
  getAppInfo(): Promise<AppInfo>;
}

const api: VoxTraceApi = {
  async getAppInfo() {
    return appInfoSchema.parse(await ipcRenderer.invoke("app:get-info"));
  },
};

contextBridge.exposeInMainWorld("voxtrace", api);

