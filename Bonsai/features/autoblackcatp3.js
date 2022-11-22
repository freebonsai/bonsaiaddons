import { prefix } from "../utils/prefix"
import Config from "../Config"

pets = []
blackcatslot = -1
gdragslot = -1
lastclick = new Date().getTime()
lastpet = ""
petsopen = false
register("chat", () =>{
    if (Config.blackCat) {
        ChatLib.command("pets")
        new Thread(() => {
            Thread.sleep(400)
            blackcat()
        }).start()
    }
}).setChatCriteria("[BOSS] Storm: I should have known that I stood no chance.")

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
    if (petsopen) {
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
    lastclick = new Date().getTime()
    lastpet = "Black Cat"
}


function gdrag() {
    if (petsopen) {
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
    lastclick = new Date().getTime()
    lastpet = "Golden Dragon"
}

register("chat", () => {
    if (new Date().getTime() - lastclick < 15000) {
        new Thread(() => {
            Thread.sleep(5000)
            ChatLib.command("pets")
            Thread.sleep(500)
            if (lastpet == "Golden Dragon") {
                gdrag()
            } else if (lastpet == "Black Cat") {
                blackcat()
            }
        }).start()
    }
}).setChatCriteria("You can't use this menu while in combat!")

register("tick", () => {
    let inv = Player.getContainer();
    let n = inv.getName();
    if (n == "Pets") {
        petsopen = true
    } else {
        petsopen = false
    }
})