window.onload = async () => {
    console.log("Hello from the renderer process!");
}

function sendmove(event:MouseEvent){
    window.dmx.move(event.clientX,event.clientY)
}

window.addEventListener("mousedown", () => {
    window.addEventListener("mousemove",sendmove);
})

window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove",sendmove);
})


function updateGrid() {
    const gridElement = document.getElementById("grid");
    if (!gridElement) return

    const width = window.innerWidth;
    const height = window.innerHeight;
    gridElement.style.width = `${width}px`;
    gridElement.style.height = `${height}px`;
}

// 初期設定
updateGrid();

// ウィンドウのリサイズイベントでグリッドを更新
window.addEventListener("resize", updateGrid);
