import Config from "../Config"
const blocks = [
  new BlockPos(50,64,76),
  new BlockPos(50,63,76),
  new BlockPos(50,62,76),
  new BlockPos(50,61,76),
  new BlockPos(51,64,76),
  new BlockPos(51,63,76),
  new BlockPos(54,64,80),
  new BlockPos(54,63,80),
  new BlockPos(54,62,80),
  new BlockPos(54,61,80),
  new BlockPos(54,64,79),
  new BlockPos(54,63,79),
  new BlockPos(58,64,76),
  new BlockPos(58,63,76),
  new BlockPos(58,62,76),
  new BlockPos(58,61,76),
  new BlockPos(58,64,76),
  new BlockPos(57,64,76),
  new BlockPos(57,63,76),
  new BlockPos(54,64,72),
  new BlockPos(54,63,72),
  new BlockPos(54,62,72),
  new BlockPos(54,61,72),
  new BlockPos(54,64,73),
  new BlockPos(54,63,73),

  new BlockPos(55,63,73),
  new BlockPos(53,63,73),
  new BlockPos(57,63,75),
  new BlockPos(57,63,77),
  new BlockPos(53,63,79),
  new BlockPos(55,63,79),
  new BlockPos(51,63,75),
  new BlockPos(51,63,77),

  new BlockPos(55,64,73),
  new BlockPos(53,64,73),
  new BlockPos(57,64,75),
  new BlockPos(57,64,77),
  new BlockPos(53,64,79),
  new BlockPos(55,64,73),
  new BlockPos(51,64,75),
  new BlockPos(51,64,77),

  new BlockPos(55,63,72),
  new BlockPos(53,63,72),
  new BlockPos(58,63,75),
  new BlockPos(58,63,77),
  new BlockPos(53,63,80),
  new BlockPos(55,63,80),
  new BlockPos(50,63,75),
  new BlockPos(50,63,77),

  new BlockPos(55,64,72),
  new BlockPos(53,64,72),
  new BlockPos(58,64,75),
  new BlockPos(58,64,77),
  new BlockPos(53,64,80),
  new BlockPos(55,64,80),
  new BlockPos(50,64,75),
  new BlockPos(50,64,77),


  new BlockPos(52,64,78),
  new BlockPos(53,64,78),
  new BlockPos(54,64,78),
  new BlockPos(55,64,78),
  new BlockPos(56,64,78),
  new BlockPos(52,64,77),
  new BlockPos(53,64,77),
  new BlockPos(54,64,77),
  new BlockPos(55,64,77),
  new BlockPos(56,64,77),
  new BlockPos(52,64,76),
  new BlockPos(53,64,76),
  new BlockPos(54,64,76),
  new BlockPos(55,64,76),
  new BlockPos(56,64,76),
  new BlockPos(52,64,75),
  new BlockPos(53,64,75),
  new BlockPos(54,64,75),
  new BlockPos(55,64,75),
  new BlockPos(56,64,75),
  new BlockPos(52,64,74),
  new BlockPos(53,64,74),
  new BlockPos(54,64,74),
  new BlockPos(55,64,74),
  new BlockPos(56,64,74),

  new BlockPos(55,64,79),

  new BlockPos(52,63,78),
  new BlockPos(53,63,78),
  new BlockPos(54,63,78),
  new BlockPos(55,63,78),
  new BlockPos(56,63,78),
  new BlockPos(52,63,77),
  new BlockPos(53,63,77),
  new BlockPos(54,63,77),
  new BlockPos(55,63,77),
  new BlockPos(56,63,77),
  new BlockPos(52,63,76),
  new BlockPos(53,63,76),
  new BlockPos(54,63,76),
  new BlockPos(55,63,76),
  new BlockPos(56,63,76),
  new BlockPos(52,63,75),
  new BlockPos(53,63,75),
  new BlockPos(54,63,75),
  new BlockPos(55,63,75),
  new BlockPos(56,63,75),
  new BlockPos(52,63,74),
  new BlockPos(53,63,74),
  new BlockPos(54,63,74),
  new BlockPos(55,63,74),
  new BlockPos(56,63,74),

  new BlockPos(55,62,72),
  new BlockPos(53,62,72),
  new BlockPos(55,62,80),
  new BlockPos(53,62,80),
  new BlockPos(50,62,75),
  new BlockPos(50,62,77),
  new BlockPos(58,62,75),
  new BlockPos(58,62,77),
]

inp5 = false
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
        //inp5 = true
      }
    }
  }
}).setChatCriteria("[BOSS] Necron: Let's make some space!")

register("command", () => {
  for (let i=0;i<blocks.length;i++) {
    Client.getMinecraft().func_71410_x().field_71441_e.func_175698_g(blocks[i].toMCBlock())
  }
}).setName("testnecrongb")

register("command", () => {
  pos = new BlockPos(75,64,45)
  pos2 = new BlockPos(75,64,46)
  type = World.getBlockStateAt(pos2)
  Client.getMinecraft().func_71410_x().field_71441_e.func_175656_a(pos.toMCBlock(), type)
  type2 = World.getBlockStateAt(pos2).class.getName()
  console.log(type2)
}).setName("testblockstate")




register("renderEntity", (entity,pos,ticks,event) => {
  if (inp5 && Config.armorStandRender) {
    if (entity.getName() == "Armor Stand") {
      entity.getEntity().func_70106_y()
      //console.log("killed")
    }
    //console.log(entity.getName())
  }
})

register("worldLoad", () => {
  inp5 = false
})

register("chat", () => {
  inp5 = true
  console.log("in p5!!")
  if (Config.autoEdrag) {
    new Thread(() => {
      ChatLib.command("pets")
      Thread.sleep(300)
      let inv = Player.getContainer();
      inv.click(Config.edragSlot+10)
    }).start()
  }
}).setChatCriteria("[BOSS] Wither King: We will decide it all, here, now.")

register("chat", () => {
  inp5 = false
  console.log("over")
}).setChatCriteria("[BOSS] Wither King: Incredible. You did what I couldn't do myself.")

register("command", () => {
  inp5 = !inp5
}).setName("toggleinp5")






