import Config from "../Config"

register("chat", () => {
  lines = Scoreboard.getLines()
  for (let i = 0;i < lines.length;i++) {
    if (lines[i].toString().includes("M7")) {
      if (Config.magepad2nd) {
        ChatLib.command("pc Mage drain then pad yellow")
      }
    }
  }
}).setChatCriteria("[BOSS] Storm: I'd be happy to show you what that's like!")