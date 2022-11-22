import { prefix } from "../utils/prefix"
import Config from "../Config"

pets = []
blackcatslot = -1
gdragslot = -1
lastclick = new Date().getTime() - 2000
register("chat", () =>{
    if (Config.blackCat) {
        ChatLib.command("pets")
        new Thread(() => {
            Thread.sleep(400)
            blackcat()
        }).start()
    }
}).setChatCriteria("[BOSS] Goldor: Who dares trespass into my domain?")

register("chat", () => {
    if (Config.blackCat) {
        ChatLib.command("pets")
        new Thread(() => {
            Thread.sleep(400)
            gdrag()
        }).start()
    }   
}).setChatCriteria("[BOSS] Goldor: You have done it, you destroyed the factory…")

register("guiClosed", () => {
    pets = []
    blackcatslot = -1
    gdragslot = -1
})

function blackcat() {
    let inv = Player.getContainer();
    let n = inv.getName();
    for (let i = 10; i < 44; i++) {
        item = inv.getStackInSlot(i)
        if (item != null) {
            lore = item.getLore()
            pets.push(lore)
        }
    }
    for (let i=0;i<pets.length;i++) {
        if (pets[i][0] == "§o§7[Lvl 100] §6Black Cat§r" && pets[i][24] == "§5§o§7§eClick to summon!") {
            blackcatslot = i+10
            ChatLib.chat(`${prefix} &bEquipped black cat!`)
            inv.click(blackcatslot,false,"MIDDLE")
        } else if (pets[i][0] == "§o§7[Lvl 100] §6Black Cat§r" && pets[i][23] == "§5§o§7§eClick to summon!") {
            blackcatslot = i+10
            ChatLib.chat(`${prefix} &bEquipped black cat!`)
            inv.click(blackcatslot,false,"MIDDLE")
        } else if (pets[i][0] == "§o§7[Lvl 100] §6Black Cat§r" && pets[i][25] == "§5§o§7§eClick to summon!") {
            blackcatslot = i+10
            ChatLib.chat(`${prefix} &bEquipped black cat!`)
            inv.click(blackcatslot,false,"MIDDLE")
        }
        
    } 
    if (blackcatslot < 0) {
        ChatLib.chat(`${prefix} &bBlack cat already equipped!`)
        Client.currentGui.close()
    }
}


function gdrag() {
    let inv = Player.getContainer();
    let n = inv.getName();
    for (let i = 10; i < 44; i++) {
        item = inv.getStackInSlot(i)
        if (item != null) {
            lore = item.getLore()
            pets.push(lore)
        }
    }
    for (let i=0;i<pets.length;i++) {
        if (pets[i][0] == "§o§7[Lvl 200] §6Golden Dragon§r" && pets[i][32] == "§5§o§7§eClick to summon!") {
            blackcatslot = i+10
            ChatLib.chat(`${prefix} &bEquipped golden dragon!`)
            inv.click(blackcatslot,false,"MIDDLE")
        } else if (pets[i][0] == "§o§7[Lvl 200] §6Golden Dragon§r" && pets[i][33] == "§5§o§7§eClick to summon!") {
            blackcatslot = i+10
            ChatLib.chat(`${prefix} &bEquipped golden dragon!`)
            inv.click(blackcatslot,false,"MIDDLE")
        } else if (pets[i][0] == "§o§7[Lvl 200] §6Golden Dragon§r" && pets[i][34] == "§5§o§7§eClick to summon!") {
            blackcatslot = i+10
            ChatLib.chat(`${prefix} &bEquipped golden dragon!`)
            inv.click(blackcatslot,false,"MIDDLE")
        }
    } 
    if (blackcatslot < 0) {
        ChatLib.chat(`${prefix} &bGolden dragon already equipped!`)
        Client.currentGui.close()
    }
}