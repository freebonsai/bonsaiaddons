import ItemLib from "../utils/itemLib"

let lastBonzoProc = 0
let lastFraggedBonzoProc = 0
let lastSpiritProc = 0

register("worldLoad", () => {
    lastBonzoProc = 0
    lastFraggedBonzoProc = 0
    lastSpiritProc = 0
})

register("chat", (event) => {
    lastSpiritProc = Date.now()
}).setChatCriteria("Second Wind Activated! Your Spirit Mask saved your life!")

register("chat", (item) => {
    if (item === "Bonzo's Mask") {
        lastBonzoProc = Date.now()
    } else {
        lastFraggedBonzoProc = Date.now()
    }
}).setChatCriteria("Your ${item} saved your life!")

register("renderItemOverlayIntoGui", (item, x, y) => {
    let sbId = item?.getNBT()?.get("tag")?.get("ExtraAttributes")?.getString("id")
    let durability = 1

    if (sbId === "BONZO_MASK") {
        durability = (Date.now() - lastBonzoProc) / 180000
    } else if (sbId === "STARRED_BONZO_MASK") {
        durability = (Date.now() - lastFraggedBonzoProc) / 180000
    } else if (sbId === "SPIRIT_MASK") {
        durability = (Date.now() - lastSpiritProc) / 30000
    }

    if (durability < 1) ItemLib.renderItemDurability(durability, x, y)
})