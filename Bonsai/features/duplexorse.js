termdisplay = new Display()
termdisplay.setRenderLoc(240,531)

register("step", () => {
    items = Player?.getInventory()?.getItems()
    if (items == undefined) return
    if (items[7]?.getItemNBT()?.toString()?.includes("Duplex")) {
        termdisplay.setLine(0,"&d&lDuplex")
    } else if (items[7]?.getItemNBT()?.toString()?.includes("Soul Eater")) {
        termdisplay.setLine(0,"&e&lSoul Eater")
    } else if (items[7]?.getItemNBT()?.toString()?.includes("Fatal Tempo")) {
        termdisplay.setLine(0,"&b&lFatal Tempo")
    } else {
        termdisplay.clearLines()
    }
}).setFps(4)