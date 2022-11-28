import Config from "../Config"

acount = 0
register("chat", () => {
  lines = Scoreboard.getLines()
  for (let i = 0;i < lines.length;i++) {
    if (lines[i].toString().includes("M7")) {
      if (Config.relicCaller) {
        acount++
        if (acount == 2) {
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
          acount = 0
        }
      }
    }
  }
}).setChatCriteria("[BOSS] Necron: ARGH!")