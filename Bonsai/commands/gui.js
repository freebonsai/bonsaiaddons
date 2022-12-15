import Config from "../Config"
import { data } from "../data/data"
import { prefix } from "../utils/prefix"

register("command", (...args) => {
  if (args[0] == "dev") {
    data.dev = !data.dev
    data.save()
    if (data.dev) {
      ChatLib.chat(`${prefix} &bToggled dev mode! It's now &aon`)
    } else {
      ChatLib.chat(`${prefix} &bToggled dev mode! It's now &coff`)
    }
  } else {
    Config.openGUI()
  }
}).setName("bonsai").setAliases("bo", "bonsaiaddons");

register("tick", () => {
  if (Config.presetgui.isOpen()) {
    Config.presetgui.close()
  }
})