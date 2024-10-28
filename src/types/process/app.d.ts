declare global {
    interface Window {
        dmx: IMainProcess;
    }
}

export interface IMainProcess {
    move: (x:number,y:number) => Promise<void>;
}
