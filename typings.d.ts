import electron from 'electron'

declare interface Window {
  Electron: typeof electron
}
