import Dungeon from "../../BloomCore/dungeons/Dungeon"

let _,symbol,symbol2,floor
register("worldLoad", () => {
    floor = null
    setTimeout(() => {
        if (!Dungeon.inDungeon) return
        lines = Scoreboard.getLines()
        for (let i = 0;i < lines.length;i++) {
            check = ChatLib.removeFormatting(lines[i].toString())
            match = check.match(/ (.) The Catac(.+)ombs (....)/)
            try {
                [_,symbol,symbol2,floor] = match
                floor = floor.replace('(','').replace(')','')
                console.log(floor)
            } catch (error) {}
        }
    },1000)
})

starttime = null
bloodrush = null
bloodclear = null
portaltime = null
p1 = null
p2 = null
terms = null
goldor = null
p4 = null
p5 = null
over = null
register("worldLoad", () => {
    starttime = null
    bloodrush = null
    bloodclear = null
    portaltime = null
    p1 = null
    p2 = null
    terms = null
    goldor = null
    p4 = null
    p5 = null
    over = null
    sDisplay.clearLines()
})

var sDisplay = new Display()
register("step", () => {
    if (!Dungeon.inDungeon) return
    if (starttime === null) return
    sDisplay.setRenderLoc(300,300)
    currenttime = new Date().getTime()
    if (bloodrush === null) {
        sDisplay.setLine(0,`Bloodrush: ${(currenttime-starttime)/1000}s`)
        sDisplay.setLine(1,`Blood Clear: 0s`)
        sDisplay.setLine(2,`Portal: 0s`)
        sDisplay.setLine(3,`Boss Entry: ${(currenttime-starttime)/1000}s`)
        return
    } else {
        sDisplay.setLine(0,`Bloodrush: ${(bloodrush-starttime)/1000}s`)
        if (bloodclear === null) {
            sDisplay.setLine(1,`Blood Clear: ${(currenttime-bloodrush)/1000}s`)
            sDisplay.setLine(2,`Portal: 0s`)
            sDisplay.setLine(3,`Boss Entry: ${(currenttime-starttime)/1000}s`)
        } else {
            sDisplay.setLine(1,`Blood Clear: ${(bloodclear-bloodrush)/1000}s`)
            if (portaltime === null) {
                sDisplay.setLine(2,`Portal: ${(currenttime-bloodclear)/1000}s`)
                sDisplay.setLine(3,`Boss Entry: ${(currenttime-starttime)/1000}s`)
            } else {
                sDisplay.setLine(2,`Portal: ${(portaltime-bloodclear)/1000}s`)
                sDisplay.setLine(3,`Boss Entry: ${(portaltime-starttime)/1000}s`)
            }
            
        }
    }
    if (floor == "F7") {
        if (p1 === null) {
            sDisplay.setLine(4,`Maxor: ${(currenttime-portaltime)/1000}s`)
            sDisplay.setLine(5,`Storm: 0s`)
            sDisplay.setLine(6,`Terminals: 0s`)
            sDisplay.setLine(7,`Goldor: 0s`)
            sDisplay.setLine(8,`Necron: 0s`)
        } else {
            sDisplay.setLine(4,`Maxor: ${(p1-portaltime)/1000}s`)
            if (p2 === null) {
                sDisplay.setLine(5,`Storm: ${(currenttime-p1)/1000}s`)
                sDisplay.setLine(6,`Terminals: 0s`)
                sDisplay.setLine(7,`Goldor: 0s`)
                sDisplay.setLine(8,`Necron: 0s`)
            } else {
                sDisplay.setLine(5,`Storm: ${(p2-p1)/1000}s`)
                if (terms === null) {
                    sDisplay.setLine(6,`Terminals: ${(currenttime-p2)/1000}s`)
                    sDisplay.setLine(7,`Goldor: 0s`)
                    sDisplay.setLine(8,`Necron: 0s`)
                } else {
                    sDisplay.setLine(5,`Terminals: ${(terms-p2)/1000}s`)
                    if (goldor === null) {
                        sDisplay.setLine(7,`Goldor: ${(currenttime-terms)/1000}s`)
                        sDisplay.setLine(8,`Necron: 0s`)
                    } else {
                        sDisplay.setLine(7,`Goldor: ${(goldor-terms)/1000}s`)
                        if (p4 === null) {
                            sDisplay.setLine(8,`Necron: ${(currenttime-goldor)/1000}s`)
                        } else {
                            sDisplay.setLine(8,`Necron: ${(p4-goldor)/1000}s`)
                        }
                    }
                }
            }
        }
    } else if (floor == "M7") {
        if (p1 === null) {
            sDisplay.setLine(4,`Maxor: ${(currenttime-portaltime)/1000}s`)
            sDisplay.setLine(5,`Storm: 0s`)
            sDisplay.setLine(6,`Terminals: 0s`)
            sDisplay.setLine(7,`Goldor: 0s`)
            sDisplay.setLine(8,`Necron: 0s`)
            sDisplay.setLine(9,`Dragons: 0s`)
        } else {
            sDisplay.setLine(4,`Maxor: ${(p1-portaltime)/1000}s`)
            if (p2 === null) {
                sDisplay.setLine(5,`Storm: ${(currenttime-p1)/1000}s`)
                sDisplay.setLine(6,`Terminals: 0s`)
                sDisplay.setLine(7,`Goldor: 0s`)
                sDisplay.setLine(8,`Necron: 0s`)
                sDisplay.setLine(9,`Dragons: 0s`)
            } else {
                sDisplay.setLine(5,`Storm: ${(p2-p1)/1000}s`)
                if (terms === null) {
                    sDisplay.setLine(6,`Terminals: ${(currenttime-p2)/1000}s`)
                    sDisplay.setLine(7,`Goldor: 0s`)
                    sDisplay.setLine(8,`Necron: 0s`)
                    sDisplay.setLine(9,`Dragons: 0s`)
                } else {
                    sDisplay.setLine(5,`Terminals: ${(terms-p2)/1000}s`)
                    if (goldor === null) {
                        sDisplay.setLine(7,`Goldor: ${(currenttime-terms)/1000}s`)
                        sDisplay.setLine(8,`Necron: 0s`)
                        sDisplay.setLine(9,`Dragons: 0s`)
                    } else {
                        sDisplay.setLine(7,`Goldor: ${(goldor-terms)/1000}s`)
                        if (p4 === null) {
                            sDisplay.setLine(8,`Necron: ${(currenttime-goldor)/1000}s`)
                            sDisplay.setLine(9,`Dragons: 0s`)
                        } else {
                            sDisplay.setLine(8,`Necron: ${(p4-goldor)/1000}s`)
                            if (p5 === null) {
                                sDisplay.setLine(9,`Dragons: ${(currenttime-necron)/1000}s`)
                            } else {
                                sDisplay.setLine(9,`Dragons: ${(p5-necron)/1000}s`)
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (portaltime === null) {
            sDisplay.setLine(4,`Boss: 0s`)
        } else {
            if (over === null) {
                sDisplay.setLine(4,`Boss: ${(currenttime-portaltime)/1000}s`)
            } else {
                sDisplay.setLine(4,`Boss: ${(over-portaltime)/1000}s`)
            }
        }
    }
}).setFps(60)

register("chat", () => {
    starttime = new Date().getTime()+1000
}).setChatCriteria("Dungeon starts in 1 second.")

register("chat", () => {
    if (bloodrush !== null) return
    bloodrush = new Date().getTime()
    ChatLib.chat(`Bloodrush took ${(bloodrush-starttime)/1000} seconds`)
}).setChatCriteria("[BOSS] The Watcher: ${msg}")

register("chat", () => {
    if (bloodclear !== null) return
    bloodclear = new Date().getTime()
    ChatLib.chat(`Blood clear took ${(bloodclear-starttime)/1000} seconds`)
}).setChatCriteria("[BOSS] The Watcher: You have proven yourself. You may pass.")

register("chat", (boss,msg) => {
    if (portaltime !== null) return
    if (bloodclear === null) return
    if (boss == "The Watcher") return
    portaltime = new Date().getTime()
    ChatLib.chat(`Portal took ${(portaltime-starttime)/1000} seconds to enter`)
}).setChatCriteria("[BOSS] ${boss}: ${msg}")

register("chat", () => {
    p1 = new Date().getTime()
    ChatLib.chat(`Maxor took ${(p1-portaltime)/1000} seconds`)
}).setChatCriteria("[BOSS] Storm: Pathetic Maxor, just like expected.")

register("chat", () => {
    p2 = new Date().getTime()
    ChatLib.chat(`Storm took ${(p2-p1)/1000} seconds`)
}).setChatCriteria("[BOSS] Storm: At least my son died by your hands.")

register("chat", () => {
    terms = new Date().getTime()
    ChatLib.chat(`Terminals took ${(terms-p2)/1000} seconds`)
}).setChatCriteria("The Core entrance is opening!")

register("chat", () => {
    goldor = new Date().getTime()
    ChatLib.chat(`Goldor took ${(goldor-terms)/1000} seconds`)
}).setChatCriteria("[BOSS] Goldor: ....")

register("chat", () => {
    p4 = new Date().getTime()
    ChatLib.chat(`Goldor took ${(p4-goldor)/1000} seconds`)
}).setChatCriteria("[BOSS] Necron: All this, for nothing...")

register("chat", () => {
    p5 = new Date().getTime()
    ChatLib.chat(`Goldor took ${(p5-p4)/1000} seconds`)
}).setChatCriteria("[BOSS] Wither King: Incredible. You did what I couldn't do myself.")

let endMsgs = [
    "[BOSS] Bonzo: Just you wait...",
    "[BOSS] Scarf: You'll never beat my teacher..",
    "[BOSS] Necron: Before I have to deal with you myself.",
    "[BOSS] Thorn: Congratulations humans, you may pass.",
    "[BOSS] Livid: My shadows are everywhere, THEY WILL FIND YOU!!",
    "[BOSS] Sadan: FATHER, FORGIVE ME!!!",
]

register("chat", (msg) => {
    if (endMsgs.includes(msg)) {
        over = new Date().getTime()
        ChatLib.chat(`Boss took ${(over-portaltime)/1000} seconds`) 
    }
}).setChatCriteria("${msg}")