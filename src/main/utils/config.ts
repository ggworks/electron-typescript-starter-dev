import { app } from 'electron'
import * as path from 'path'

function fileUrl(str: string) {
  let pathName = path.resolve(str).replace(/\\/g, '/')

  // Windows drive letter must be prefixed with a slash
  if (pathName[0] !== '/') {
    pathName = '/' + pathName
  }

  return encodeURI('file://' + pathName)
}

const CONFIG: any = {}

CONFIG.appName = 'myapp'

CONFIG.appDataDir = path.join(app.getPath('appData'), CONFIG.appName)

CONFIG.distDir = path.join(__dirname, '../../')

if (!app.isPackaged) {
  CONFIG.entryUrl = fileUrl(path.join(CONFIG.distDir, 'index/index.html'))
  CONFIG.endPoint = fileUrl(path.join(CONFIG.distDir))

  CONFIG.assetsDir = path.join(__dirname, '../../../', 'assets')
} else {
  CONFIG.entryUrl = fileUrl(path.join(CONFIG.distDir, 'index/index.html'))
  CONFIG.endPoint = fileUrl(path.join(CONFIG.distDir))

  CONFIG.assetsDir = path.join(process.resourcesPath!, 'assets')
}

CONFIG.loadingUrl = fileUrl(path.join(CONFIG.distDir, 'index/loading/loading.html'))

CONFIG.settingsFile = path.join(CONFIG.appDataDir, 'settings.json')

global.CONFIG = CONFIG

export default CONFIG
