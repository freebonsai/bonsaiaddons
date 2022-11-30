import Config from "../Config"

register("chat", () => {
  lines = Scoreboard.getLines()
  for (let i = 0;i < lines.length;i++) {
    if (lines[i].toString().includes("M7")) {
      if (Config.relicCaller) {
        if (Config.relicType == 0) {
          ChatLib.command("pc green")
        } else if (Config.relicType == 1) {
          ChatLib.command("pc red")
        } else if (Config.relicType == 2) {
          ChatLib.command("pc purple")
        } else if (Config.relicType == 3) {
          ChatLib.command("pc orange")
        } else if (Config.relicType == 4) {
          ChatLib.command("pc blue")
        }
      }
    }
  }
}).setChatCriteria("[BOSS] Necron: Let's make some space!")