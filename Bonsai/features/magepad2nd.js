import Config from "../Config"

register("chat", () => {
  lines = Scoreboard.getLines()
  for (let i = 0;i < lines.length;i++) {
    if (lines[i].toString().includes("M7")) {
      if (Config.magepad2nd) {
        ChatLib.command("pc Mage pad yellow")
      }
    }
  }
}).setChatCriteria("[BOSS] Storm: ENERGY HEED MY CALL!")