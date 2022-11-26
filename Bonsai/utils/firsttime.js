import { numerals } from "../../BloomCore/utils/Utils"
import { data } from "../data/data"
import { prefix } from "./prefix"
register("worldLoad", () => {
    if (data.firstTime) {
        new Message(`&5&m${ChatLib.getChatBreak(" ")}\n`,
        new TextComponent(`${prefix} &bThanks for downloading bonsai addons!\n`),
        new TextComponent(`${prefix} &c/bo for settings\n`),
        new TextComponent(`${prefix} &b&nLook at the github for a feature list!`).setClick(
            "open_url",
            "https://github.com/freebonsai/bonsaiaddons"
        ),
        `\n&5&m${ChatLib.getChatBreak(" ")}`).chat()
        data.firstTime = false
        data.save()
    }
})