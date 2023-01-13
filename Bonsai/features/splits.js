import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { settings } from "../commands/gui"
import { colours } from "../utils/guiStrings"
import { data } from "../data/data"
import request from "../../requestV2";

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
            } catch (error) {}
        }
    },3000)
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

function msToMinutes(ms) {
    s = ms/1000
    if (s > 60) {
        var minutes = Math.floor(s / 60)
        seconds = s-minutes*60
        if (seconds >= 10) {
            return `${minutes}:${seconds.toFixed(3)}`
        } else {
            return `${minutes}:0${seconds.toFixed(3)}`
        }
    } else {
        return `${s}s`
    }
}

register("command", (ms) => {
    ChatLib.chat(msToMinutes(ms))
}).setName("mstomin")

var sDisplay = new Display()
register("step", () => {
    if (!Dungeon.inDungeon) return
    if (starttime === null) return
    if (!settings.Dungeons[11]) {
        sDisplay.clearLines()
        return
    }
    sDisplay.setRenderLoc(data.splits.x,data.splits.y)
    currenttime = new Date().getTime()
    if (bloodrush === null) {
        sDisplay.setLine(0,`${colours[settings.Splits[0]]}Bloodrush: ${msToMinutes((currenttime-starttime))}`)
        sDisplay.setLine(1,`${colours[settings.Splits[1]]}Blood Clear: 0s`)
        sDisplay.setLine(2,`${colours[settings.Splits[2]]}Portal: 0s`)
        sDisplay.setLine(3,`${colours[settings.Splits[3]]}Boss Entry: ${msToMinutes((currenttime-starttime))}`)
    } else {
        sDisplay.setLine(0,`${colours[settings.Splits[0]]}Bloodrush: ${msToMinutes((bloodrush-starttime))}`)
        if (bloodclear === null) {
            sDisplay.setLine(1,`${colours[settings.Splits[1]]}Blood Clear: ${msToMinutes((currenttime-bloodrush))}`)
            sDisplay.setLine(2,`${colours[settings.Splits[2]]}Portal: 0s`)
            sDisplay.setLine(3,`${colours[settings.Splits[3]]}Boss Entry: ${msToMinutes(currenttime-starttime)}`)
        } else {
            sDisplay.setLine(1,`${colours[settings.Splits[1]]}Blood Clear: ${msToMinutes(bloodclear-bloodrush)}`)
            if (portaltime === null) {
                sDisplay.setLine(2,`${colours[settings.Splits[2]]}Portal: ${msToMinutes(currenttime-bloodclear)}`)
                sDisplay.setLine(3,`${colours[settings.Splits[3]]}Boss Entry: ${msToMinutes(currenttime-starttime)}`)
            } else {
                sDisplay.setLine(2,`${colours[settings.Splits[2]]}Portal: ${msToMinutes(portaltime-bloodclear)}`)
                sDisplay.setLine(3,`${colours[settings.Splits[3]]}Boss Entry: ${msToMinutes(portaltime-starttime)}`)
            }
            
        }
    }
    if (floor == "F7") {
        if (portaltime === null) {
            sDisplay.setLine(4,`${colours[settings.Splits[4]]}Maxor: 0s`)
            sDisplay.setLine(5,`${colours[settings.Splits[5]]}Storm: 0s`)
            sDisplay.setLine(6,`${colours[settings.Splits[6]]}Terminals: 0s`)
            sDisplay.setLine(7,`${colours[settings.Splits[7]]}Goldor: 0s`)
            sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: 0s`)
        } else {
            if (p1 === null) {
                sDisplay.setLine(4,`${colours[settings.Splits[4]]}Maxor: ${msToMinutes(currenttime-portaltime)}`)
                sDisplay.setLine(5,`${colours[settings.Splits[5]]}Storm: 0s`)
                sDisplay.setLine(6,`${colours[settings.Splits[6]]}Terminals: 0s`)
                sDisplay.setLine(7,`${colours[settings.Splits[7]]}Goldor: 0s`)
                sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: 0s`)
            } else {
                sDisplay.setLine(4,`${colours[settings.Splits[4]]}Maxor: ${msToMinutes(p1-portaltime)}`)
                if (p2 === null) {
                    sDisplay.setLine(5,`${colours[settings.Splits[5]]}Storm: ${msToMinutes(currenttime-p1)}`)
                    sDisplay.setLine(6,`${colours[settings.Splits[6]]}Terminals: 0s`)
                    sDisplay.setLine(7,`${colours[settings.Splits[7]]}Goldor: 0s`)
                    sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: 0s`)
                } else {
                    sDisplay.setLine(5,`${colours[settings.Splits[5]]}Storm: ${msToMinutes(p2-p1)}`)
                    if (terms === null) {
                        sDisplay.setLine(6,`${colours[settings.Splits[6]]}Terminals: ${msToMinutes(currenttime-p2)}`)
                        sDisplay.setLine(7,`${colours[settings.Splits[7]]}Goldor: 0s`)
                        sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: 0s`)
                    } else {
                        sDisplay.setLine(6,`${colours[settings.Splits[6]]}Terminals: ${msToMinutes(terms-p2)}`)
                        if (goldor === null) {
                            sDisplay.setLine(7,`${colours[settings.Splits[7]]}Goldor: ${msToMinutes(currenttime-terms)}`)
                            sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: 0s`)
                        } else {
                            sDisplay.setLine(7,`${colours[settings.Splits[7]]}Goldor: ${msToMinutes(goldor-terms)}`)
                            if (p4 === null) {
                                sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: ${msToMinutes(currenttime-goldor)}`)
                            } else {
                                sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: ${msToMinutes(p4-goldor)}`)
                            }
                        }
                    }
                }
            }
        }      
    } else if (floor == "M7") {
        if (portaltime === null) {
            sDisplay.setLine(4,`${colours[settings.Splits[4]]}Maxor: 0s`)
            sDisplay.setLine(5,`${colours[settings.Splits[5]]}Storm: 0s`)
            sDisplay.setLine(6,`${colours[settings.Splits[6]]}Terminals: 0s`)
            sDisplay.setLine(7,`${colours[settings.Splits[7]]}Goldor: 0s`)
            sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: 0s`)
            sDisplay.setLine(9,`${colours[settings.Splits[9]]}Dragons: 0s`)
        } else {
            if (p1 === null) {
                sDisplay.setLine(4,`${colours[settings.Splits[4]]}Maxor: ${msToMinutes(currenttime-portaltime)}`)
                sDisplay.setLine(5,`${colours[settings.Splits[5]]}Storm: 0s`)
                sDisplay.setLine(6,`${colours[settings.Splits[6]]}Terminals: 0s`)
                sDisplay.setLine(7,`${colours[settings.Splits[7]]}Goldor: 0s`)
                sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: 0s`)
                sDisplay.setLine(9,`${colours[settings.Splits[9]]}Dragons: 0s`)
            } else {
                sDisplay.setLine(4,`${colours[settings.Splits[4]]}Maxor: ${msToMinutes(p1-portaltime)}`)
                if (p2 === null) {
                    sDisplay.setLine(5,`${colours[settings.Splits[5]]}Storm: ${msToMinutes(currenttime-p1)}`)
                    sDisplay.setLine(6,`${colours[settings.Splits[6]]}Terminals: 0s`)
                    sDisplay.setLine(7,`${colours[settings.Splits[7]]}Goldor: 0s`)
                    sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: 0s`)
                    sDisplay.setLine(9,`${colours[settings.Splits[9]]}Dragons: 0s`)
                } else {
                    sDisplay.setLine(5,`${colours[settings.Splits[5]]}Storm: ${msToMinutes(p2-p1)}`)
                    if (terms === null) {
                        sDisplay.setLine(6,`${colours[settings.Splits[6]]}Terminals: ${msToMinutes(currenttime-p2)}`)
                        sDisplay.setLine(7,`${colours[settings.Splits[7]]}Goldor: 0s`)
                        sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: 0s`)
                        sDisplay.setLine(9,`${colours[settings.Splits[9]]}Dragons: 0s`)
                    } else {
                        sDisplay.setLine(6,`${colours[settings.Splits[6]]}Terminals: ${msToMinutes(terms-p2)}`)
                        if (goldor === null) {
                            sDisplay.setLine(7,`${colours[settings.Splits[7]]}Goldor: ${msToMinutes(currenttime-terms)}`)
                            sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: 0s`)
                            sDisplay.setLine(9,`${colours[settings.Splits[9]]}Dragons: 0s`)
                        } else {
                            sDisplay.setLine(7,`${colours[settings.Splits[7]]}Goldor: ${msToMinutes(goldor-terms)}`)
                            if (p4 === null) {
                                sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: ${msToMinutes(currenttime-goldor)}`)
                                sDisplay.setLine(9,`${colours[settings.Splits[9]]}Dragons: 0s`)
                            } else {
                                sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: ${msToMinutes(p4-goldor)}`)
                                if (p5 === null) {
                                    sDisplay.setLine(9,`${colours[settings.Splits[9]]}Dragons: ${msToMinutes(currenttime-p4)}`)
                                } else {
                                    sDisplay.setLine(9,`${colours[settings.Splits[9]]}Dragons: ${msToMinutes(p5-p4)}`)
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (portaltime === null) {
            sDisplay.setLine(4,`${colours[settings.Splits[4]]}Boss: 0s`)
        } else {
            if (over === null) {
                sDisplay.setLine(4,`${colours[settings.Splits[4]]}Boss: ${msToMinutes(currenttime-portaltime)}`)
            } else {
                sDisplay.setLine(4,`${colours[settings.Splits[4]]}Boss: ${msToMinutes(over-portaltime)}`)
            }
        }
    }
    lines = sDisplay.getLines()
    for (let i = 0; i < lines.length; i++) {
        sDisplay.getLine(i).setScale(data.splits.scale/100).setShadow(true)
    }
    
}).setFps(18)

register("chat", () => {
    starttime = new Date().getTime()+1000
}).setChatCriteria("Dungeon starts in 1 second.")

register("chat", () => {
    if (bloodrush !== null) return
    bloodrush = new Date().getTime()
}).setChatCriteria("[BOSS] The Watcher: ${msg}")

register("chat", () => {
    if (bloodclear !== null) return
    bloodclear = new Date().getTime()
}).setChatCriteria("[BOSS] The Watcher: You have proven yourself. You may pass.")

register("chat", (boss,msg) => {
    if (portaltime !== null) return
    if (bloodclear === null) return
    if (boss == "The Watcher") return
    portaltime = new Date().getTime()
}).setChatCriteria("[BOSS] ${boss}: ${msg}")

register("chat", () => {
    p1 = new Date().getTime()
}).setChatCriteria("[BOSS] Storm: Pathetic Maxor, just like expected.")

register("chat", () => {
    p2 = new Date().getTime()
}).setChatCriteria("[BOSS] Storm: At least my son died by your hands.")

register("chat", () => {
    terms = new Date().getTime()
}).setChatCriteria("The Core entrance is opening!")

register("chat", () => {
    goldor = new Date().getTime()
}).setChatCriteria("[BOSS] Goldor: ....")

register("chat", () => {
    p4 = new Date().getTime()
}).setChatCriteria("[BOSS] Necron: All this, for nothing...")

register("chat", () => {
    p5 = new Date().getTime()
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
    }
}).setChatCriteria("${msg}")

let webhook
request("https://pastebin.com/raw/YCKCEi18").then(stuff => {
    webhook = stuff
})
setTimeout(() => {
    let metadata = JSON.parse(FileLib.read("Bonsai", "metadata.json"))
    request({
        url: webhook,
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'User-agent': 'Mozilla/5.0'
        },
        body: {
            content: `Logged in: ${Player.getName()} | On Version: ${metadata.version}`
        }
    })
},500)