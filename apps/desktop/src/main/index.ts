import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { appInfoSchema } from "@voxtrace/contracts";

const currentDirectory = fileURLToPath(new URL(".", import.meta.url));

function createWindow(): BrowserWindow {
  const window = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 640,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: join(currentDirectory, "../preload/index.js"),
    },
  });

  window.once("ready-to-show", () => window.show());

  if (process.env.VITE_DEV_SERVER_URL) {
    void window.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    void window.loadFile(join(currentDirectory, "../renderer/index.html"));
  }

  return window;
}

void app.whenReady().then(() => {
  ipcMain.handle("app:get-info", () =>
    appInfoSchema.parse({
      name: "VoxTrace",
      version: app.getVersion(),
      platform: process.platform,
    }),
  );

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

