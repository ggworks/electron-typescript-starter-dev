import * as fse from 'fs-extra'
import log from 'electron-log'
class PersistenceSettings {
  private config: any
  constructor() {
    this.loadFromFile()
  }

  public loadFromFile() {
    if (fse.existsSync(global.CONFIG.settingsFile)) {
      try {
        this.config = JSON.parse(fse.readFileSync(global.CONFIG.settingsFile, 'utf8'))
      } catch (err) {
        log.error(err)
        this.config = {}
      }
    } else {
      this.config = {}
      this.save()
    }
  }

  public get(name: string) {
    return this.config ? this.config[name] : undefined
  }

  public set(name: string, value: any) {
    this.config[name] = value
  }

  public save() {
    return fse.writeFile(global.CONFIG.settingsFile, JSON.stringify(this.config), {
      encoding: 'utf-8',
    })
  }
}

const settings = new PersistenceSettings()

export { settings }
