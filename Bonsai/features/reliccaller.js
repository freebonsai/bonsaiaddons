import Config from "../Config"
const blocks = [
  new BlockPos(50,64,76),
  new BlockPos(50,63,76),
  new BlockPos(50,62,76),
  new BlockPos(50,61,76),


  new BlockPos(54,64,80),
  new BlockPos(54,63,80),
  new BlockPos(54,62,80),
  new BlockPos(54,61,80),


  new BlockPos(58,64,76),
  new BlockPos(58,63,76),
  new BlockPos(58,62,76),
  new BlockPos(58,61,76),


  new BlockPos(54,64,72),
  new BlockPos(54,63,72),
  new BlockPos(54,62,72),
  new BlockPos(54,61,72)
]

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
        for (let i=0;i<blocks.length;i++) {
          Client.getMinecraft().func_71410_x().field_71441_e.func_175698_g(blocks[i].toMCBlock())
        }
      }
    }
  }
}).setChatCriteria("[BOSS] Necron: Let's make some space!")

