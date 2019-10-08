import { BrowserWindow, app, App } from 'electron'
import * as path from 'path'

class Main {
  private mainWindow: BrowserWindow | null = null
  private app: App
  private mainURL = `file://${__dirname}/index.html`

  constructor(app: App) {
    this.app = app
    this.app.on('window-all-closed', this.onWindowAllClosed.bind(this))
    this.app.on('ready', this.onReady.bind(this))
    this.app.on('activate', this.onActivated.bind(this))
  }

  private onWindowAllClosed(): void {
    this.app.quit()
  }

  private onReady(): void {
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 400,
      minWidth: 500,
      minHeight: 200,
      acceptFirstMouse: true,
      titleBarStyle: 'hidden',
      icon: path.join(__dirname, '../build/icons/icon.png'),
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })

    this.mainWindow.loadURL(this.mainURL)

    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })
  }

  private onActivated(): void {
    if (this.mainWindow === null) {
      this.onReady()
    }
  }
}

new Main(app)
