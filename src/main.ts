import { BrowserWindow, app, ipcMain, IpcMainInvokeEvent } from 'electron'
import path from "path";
import { DMX, SACNDriver} from "dmx-ts";

let dmx:DMX = new DMX();
let win:BrowserWindow;

async function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });
    win.loadURL(`file://${__dirname}/render/index.html`);
    dmx.addUniverse('Universe', new SACNDriver(0,{
        ip: "192.168.0.25"
    }));
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow().then()
});

app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.handle('move', (_: IpcMainInvokeEvent,x:number,y:number) => {
    //限界まで回すのに必要なdmx値
    let dmxMovePower = 85

    //中央の位置
    let centerX = win.getSize()[0];
    let centerY = win.getSize()[1];

    //一度回すのに必要な座標
    let transX = centerX / dmxMovePower;
    let transY = centerY / dmxMovePower;

    /*
        中央位置を0としたときの相対座標を一度回すのに必要な座標で割る
        dmxMovePower/2は、ライトの中央をwindowの中央位置にするための処理

        1,3は、dmxチャンネル（エミュレーターでは、1が回転、3が上下。各ライトの説明書参照）
     */
    dmx.update('Universe', {1: (x / transX) +　dmxMovePower/2, 3: (y / transY)});
});

