import {prefix} from "./prefix"
import request from "../../requestV2"

seen = false
register("worldLoad", () => {
    if (!seen) {
        request("https://raw.githubusercontent.com/freebonsai/bonsaiaddons/main/api.json").then(stuff => {
            stuff = JSON.parse(stuff.replace(new RegExp("    ", "g"), ""))
            // ChatLib.chat(JSON.stringify(stuff, "", 4))
            let metadata = JSON.parse(FileLib.read("Bonsai", "metadata.json"))
            //console.log(metadata.version, stuff.latestVersion)
            if (metadata.version !== stuff.latestVersion) {
                new Message(`&5&m${ChatLib.getChatBreak(" ")}\n`,
                new TextComponent(`${prefix} &bA new version of &aBonsai &bis available! (&c${stuff.latestVersion}&b) Click to go to the Github page! `).setClick(
                    "open_url",
                    "https://github.com/freebonsai/bonsaiaddons"
                ).setHover(
                    "show_text",
                    "&aClick to open\n&7https://github.com/freebonsai/bonsaiaddons"
                ),
                new TextComponent(`&7(Changelog) \n`).setHover(
                    "show_text",
                    `&5&lChangelog for ${stuff.latestVersion}:\n &r- ` + stuff.changelog.join("\n &r- ")
                ),
                new TextComponent(` &aClick to set to seen until next time chattriggers loads!`).setClick(
                    "run_command",
                    "/updateseen"
                ),
                `\n&5&m${ChatLib.getChatBreak(" ")}`).chat()
            }
        }).catch(error => {
            ChatLib.chat(`${prefix} &cError whilst checking for update: ${error}`)
        })
    }
})

register("command", () => {
    ChatLib.chat(`${prefix} &bThe update message won't be sent until the next time chattrigers loads!`)
    seen = true
}).setName("updateseen")