import Config from "../Config"

register("chat", () => {
  lines = Scoreboard.getLines()
  for (let i = 0;i < lines.length;i++) {
    if (lines[i] == " §7⏣ §cThe Catac👾§combs §7(M7)" || lines[i] == " §7⏣ §cThe Catac🌠§combs §7(M7)" || lines[i] == " §7⏣ §cThe Catac🔮§combs §7(M7)") {
      if (Config.relicCaller) {
        if (Config.relicType == 0) {
          ChatLib.say("green")
        } else if (Config.relicType == 1) {
          ChatLib.say("red")
        } else if (Config.relicType == 2) {
          ChatLib.say("purple")
        } else if (Config.relicType == 3) {
          ChatLib.say("orange")
        } else if (Config.relicType == 4) {
          ChatLib.say("blue")
        }
      }
    }
  }
}).setChatCriteria("[BOSS] Necron: All this, for nothing...")