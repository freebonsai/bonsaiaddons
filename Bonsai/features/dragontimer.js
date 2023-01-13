import { settings } from "../commands/gui"
import { data } from "../data/data"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import Config from "../Config"
orangetime = null
redtime = null
greentime = null
bluetime = null
purpletime = null
let _,typeofparticle,x,y,z,rgba,age
register("spawnParticle", (particle, type, event) => {
    stringparticle = particle.toString()
    match = stringparticle.match(/Entity(\w+)FX, Pos (?:(.+),(.+),(.+)), RGBA (.+), Age (.+)/)
    try {
        [_,typeofparticle,x,y,z,rgba,age] = match
    } catch (error) {return}
    x = x.replace('(','')
    z = z.replace(')','')
    x = Math.floor(x)
    y = Math.floor(y)
    z = Math.floor(z)
    if (typeofparticle != "Flame") return
    if (x >= 82 && x <= 88 && y >= 15 && y <= 22 && z <= 59 && z >= 53 && orangetime === null) {
        orangetime = new Date().getTime()
        return
    }
    if (x >= 24 && x <= 30 && y >= 15 && y <= 22 && z <= 62 && z >= 56 && redtime === null) {
        redtime = new Date().getTime()
        return
    }
    if (x >= 23 && x <= 29 && y >= 15 && y <= 22 && z <= 97 && z >= 91 && greentime === null) {
        greentime = new Date().getTime()
        return
    }
    if (x >= 53 && x <= 59 && y >= 15 && y <= 22 && z <= 128 && z >= 122 && purpletime === null) {
        purpletime = new Date().getTime()
        return
    }
    if (x >= 82 && x <= 88 && y >= 15 && y <= 22 && z <= 97 && z >= 91 && bluetime === null) {
        bluetime = new Date().getTime()
        return
    }
})

dragonspawntime = 5000
dDisplay = new Display()
atLine = 0
register("step", () => {
    if (!settings.Dungeons[10]) return
    if (!Dungeon.inDungeon) return
    currentTime = new Date().getTime()
    dDisplay.setRenderLoc(data.dragonTimer.x, data.dragonTimer.y)
    if (orangetime !== null) {
        if (currentTime - orangetime < dragonspawntime) {
            orangein = dragonspawntime - (currentTime-orangetime)
            dDisplay.setLine(atLine, `&6Orange spawning in&r: ${(orangein <= 1000 ? "&c" : orangein <= 3000 ? "&e" : "&a") + orangein}ms`)
            atLine++
        } else {
            orangetime = null
        }
    }
    if (redtime !== null) {
        if (currentTime - redtime < dragonspawntime) {
            redin = dragonspawntime - (currentTime-redtime)
            dDisplay.setLine(atLine, `&4Red spawning in&r: ${(redin <= 1000 ? "&c" : redin <= 3000 ? "&e" : "&a") + redin}ms`)
            atLine++
        } else {
            redtime = null
        }
    }
    if (greentime !== null) {
        if (currentTime - greentime < dragonspawntime) {
            greenin = dragonspawntime - (currentTime-greentime)
            dDisplay.setLine(atLine, `&aGreen spawning in&r: ${(greenin <= 1000 ? "&c" : greenin <= 3000 ? "&e" : "&a") + greenin}ms`)
            atLine++
        }  else {
            greentime = null
        }
    }
    if (bluetime !== null) {
        if (currentTime - bluetime < dragonspawntime) {
            bluein = dragonspawntime - (currentTime-bluetime)
            dDisplay.setLine(atLine, `&bBlue spawning in&r: ${(bluein <= 1000 ? "&c" : bluein <= 3000 ? "&e" : "&a") + bluein}ms`)
            atLine++
        }  else {
            bluetime = null
        }
    }
    if (purpletime !== null) {
        if (currentTime - purpletime < dragonspawntime) {
            purplein = dragonspawntime - (currentTime-purpletime)
            dDisplay.setLine(atLine, `&5Purple spawning in&r: ${(purplein <= 1000 ? "&c" : purplein <= 3000 ? "&e" : "&a") + purplein}ms`)
            atLine++
        }  else {
            purpletime = null
        }
    }
    for (let i = 0; i < atLine; i++) {
        dDisplay.getLine(i).setScale(data.dragonTimer.scale/100).setShadow(true)
    }
    atLine = 0
}).setFps(20)

register("step", () => {
    dDisplay.clearLines()
}).setFps(2)

register("worldLoad", () => {
    orangetime = null
    redtime = null
    greentime = null
    bluetime = null
    purpletime = null
    dDisplay.clearLines()
})

register("command", () => {
    ChatLib.command("particle flame 84 18 95 1 1 1 1 100")
    ChatLib.command("particle flame 57 18 125 1 1 1 1 100")
    ChatLib.command("particle flame 26 18 95 1 1 1 1 100")
    ChatLib.command("particle flame 27 18 60 1 1 1 1 100")
    ChatLib.command("particle flame 84 18 56 1 1 1 1 100")
}).setName("testdragons")
