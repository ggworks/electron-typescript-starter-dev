import { app as ElectronApp } from "electron"

import "./utils/config"

import { Application } from "./electron/app-entry"

const appEntry = new Application()

ElectronApp.on("ready", () => {
    appEntry.init(__dirname)
    appEntry.start()
})

ElectronApp.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        ElectronApp.quit()
    }
})

ElectronApp.on("activate", () => {
    appEntry.activate()
})
