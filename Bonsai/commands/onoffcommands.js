import Config from "../Config"
import { prefix } from "../utils/prefix"

register("command", (arg) => {
    if (arg == "toggle") {
        Config.f7clip = !Config.f7clip
        ChatLib.chat(`${prefix} &bToggled f7 clip, its now set to ${Config.f7clip}`)
    } else if (arg == "right") {
        Config.clipSide = 0
        ChatLib.chat(`${prefix} &bSet f7 clip to right!`)
    } else if (arg == "left") {
        Config.clipSide = 1
        ChatLib.chat(`${prefix} &bSet f7 clip to left!`)
    } else if (arg == "down") {
        Config.clipSide = 2
        ChatLib.chat(`${prefix} &bSet f7 clip to down!`)
    } else if (arg == "conveyor") {
        Config.clipSide = 3
        ChatLib.chat(`${prefix} &bSet f7 clip to conveyor!`)
    } else if (arg == "off") {
        Config.f7clip = false
        ChatLib.chat(`${prefix} &bTurned f7 clip off!`)
    } else if (arg == "on") {
        Config.f7clip = true
        ChatLib.chat(`${prefix} &bTurned f7 clip on!`)
    } else {
        ChatLib.chat(`${prefix} &bIncorrect usage! &c/f7clip (toggle|right|left|down)`)
    }
}).setName("f7clip")