import Config from "../Config"
import {prefix } from "../utils/prefix"
import { settings } from "../commands/gui"

register("chat", (name) => {
  if (settings.Dungeons[4]) {
    if (name.toLowerCase() == Config.ignWarp.toLowerCase()) {
      new Thread(() => {
        ChatLib.chat(prefix + " &dWARPING")
        Thread.sleep(Config.warpDelay)
        ChatLib.command("p warp")
      }).start()
    }
  }
}).setChatCriteria(" ☠ ${name} disconnected from the Dungeon and became a ghost.")