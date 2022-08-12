import { app } from 'electron'
import mkdirp from 'mkdirp'
import log from 'electron-log'
import path from 'path'
import * as AppCore from '../../nativelib/app_core'

import './utils/config'

const setupLog = async () => {
  const logPath = path.join(global.CONFIG.appDataDir, 'logs/app.log')

  log.transports.file.resolvePath = () => logPath
  log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}:{ms}] [{level}] {text}'

  log.info(`[+]app start`)
  log.info(`CONFIG ${JSON.stringify(global.CONFIG)}`)
}

const setupAppDirs = async () => {
  try {
    await mkdirp(global.CONFIG.appDataDir)
  } catch (err) {
    log.error(err)
  }
}

const setupMain = async () => {
  await setupLog()
  await setupAppDirs()
}

const quitApp = () => {
  setImmediate(() => {
    log.info(`[+]app quit`)
    app.quit()
  })
}

const main = async () => {
  await setupMain()

  log.error(`AppCore.hello(): ${AppCore.hello()}`)

  import('./electron/common/settings')
  const { Application } = await import('./electron/app-entry')
  const appEntry = new Application()

  app.whenReady().then(() => {
    log.info(`electron app ready`)
    appEntry.init(__dirname)
    appEntry.start()
  })

  app.on('window-all-closed', () => {
    log.info(`window-all-closed`)
    if (process.platform !== 'darwin') {
      appEntry.quit()
      quitApp()
    }
  })

  app.on('activate', () => {
    appEntry.activate()
  })
}

main()
