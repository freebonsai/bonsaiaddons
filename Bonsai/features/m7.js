/// <reference types="../../CTAutocomplete" />
import Config from "../Config"
import { settings } from "../commands/gui"
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
over = true
register("chat", () => {
  lines = Scoreboard.getLines()
  for (let i = 0;i < lines.length;i++) {
    if (lines[i].toString().includes("M7")) {
      if (settings.Dungeons[12]) {
        switch(settings.Dungeons[13]) {
          case 0:
            ChatLib.command("pc green");
            break;
          case 1:
            ChatLib.command("pc red");
            break;
          case 2:
            ChatLib.command("pc purple");
            break;
          case 3:
            ChatLib.command("pc orange");
            break;
          case 4:
            ChatLib.command("pc blue");
            break;
          default:
            break;
        }
        //inp5 = true
      }
      if (settings.Dungeons[6]) {
        for (let i=0;i<blocks.length;i++) {
          Client.getMinecraft().func_71410_x().field_71441_e.func_175698_g(blocks[i].toMCBlock())
        }
      }
    }
  }
}).setChatCriteria("[BOSS] Necron: Let's make some space!")

register("command", () => {
  for (let i=0;i<blocks.length;i++) {
    Client.getMinecraft().func_71410_x().field_71441_e.func_175698_g(blocks[i].toMCBlock())
  }
}).setName("testnecrongb")

entities = []
names = []
const killEntity = entity => entity.func_70106_y()
register("renderEntity", (entity,pos,ticks,event) => {
  if (inp5 && settings.Render[1]) {
    if (entity.getName() == "Armor Stand") {
      killEntity(entity.getEntity())
    }
  }
  if (over && settings.Render[2]) {
    if (names.includes(entity.getName())) {
      killEntity(entity.getEntity())
    }
  }
})

register("command", () => {
  tabnames = TabList.getNames()
  names = []
  for (let i = 1; i < 20; i+=4) {
    tobepushed = tabnames[i].removeFormatting()
    match = tobepushed.match(/^\[(\d+)\] (?:\[\w+\] )*(\w+) [♲Ⓑ ]*\((\w+)(?: (\w+))*\)$/)
    let [_, sbLevel, player, clazz, level] = match
    names.push(player)
  }
  console.log(names)
}).setName("listplayers")

register("worldLoad", () => {
  inp5 = false
  over = false
  names = []
})

register("chat", () => {
  inp5 = true
  if (settings.Dungeons[5]) {
    setTimeout(() => {
      let inv = Player.getContainer();
      index = Player.getContainer()?.getItems()?.findIndex(item => item && item.getName()?.match(/§.\[Lvl \d+\] §.Ender Dragon/))
      if (index == -1) {
        index = Player.getContainer().getItems().findIndex(item => item?.getName()?.includes('Next Page'))
        inv.click(index, false, "MIDDLE")
        setTimeout(() => {
          let inv = Player.getContainer();
          index = Player.getContainer()?.getItems()?.findIndex(item => item && item.getName()?.match(/§.\[Lvl \d+\] §.Ender Dragon/))
          if (Player.getContainer()?.getName()?.includes('Pets')) {
            if (index == -1) return
            inv.click(index, false, "MIDDLE")
          }
        }, 400)
      }
      if (Player.getContainer()?.getName()?.includes('Pets')) {
        if (index == -1) return
        inv.click(index, false, "MIDDLE")
      }
    }, 400)
  }
}).setChatCriteria("[BOSS] Wither King: You.. again?")

register("command", () => {
  ChatLib.command("pets")
  setTimeout(() => {
    let inv = Player.getContainer();
    index = Player.getContainer().getItems().findIndex(item => item?.getName()?.includes('Ender Dragon'))
    if (index == -1) {
      index = Player.getContainer().getItems().findIndex(item => item?.getName()?.includes('Next Page'))
      inv.click(index, false, "MIDDLE")
    }
    if (Player.getContainer()?.getName()?.includes('Pets')) {
      if (index == -1) return
      inv.click(index, false, "MIDDLE")
    }
  }, 400)
}).setName("edragopen")

register("chat", () => {
  inp5 = false
  tabnames = TabList.getNames()
  names = []
  for (let i = 1; i < 20; i+=4) {
    tobepushed = tabnames[i].removeFormatting()
    if (tobepushed) {
      match = tobepushed.match(/^\[(\d+)\] (?:\[\w+\] )*(\w+) [♲Ⓑ ]*\((\w+)(?: (\w+))*\)$/)
      let [_, sbLevel, player, clazz, level] = match
      if (Player.getName() != player) names.push(player)
    }
  }
  over = true
}).setChatCriteria("[BOSS] Wither King: Incredible. You did what I couldn't do myself.")

register("command", () => {
  inp5 = !inp5
}).setName("toggleinp5")