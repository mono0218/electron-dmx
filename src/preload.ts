import { contextBridge, ipcRenderer } from 'electron'

// メインプロセスから分離した処理をレンダラーに'myObj'として公開します
// preload.jsのinvokeとmain.jsのhandleがセットになっており
// invokeされたをチャンネル'appendTxt'をメインプロセスのhandleで拾う
contextBridge.exposeInMainWorld('dmx', {
    move: async (x:number,y:number) => ipcRenderer.invoke('move',x,y),
});
