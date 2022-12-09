// DEV COMMANDS

// SWITCH ENCHANT FOR SWARM COUNTER COMMAND
register("command", (...args) => {
  if (Player.getName() == 'freebonsai') {
    if (args.length > 1) {
      swarmname = args[0] + " " + args[1] + " "
      console.log("changed to " + args[0] + " " + args[1] + " ")
    } else {
      swarmname = "Swarm "
      console.log("changed back to swarm")
    }
  }
}).setName("switchench")
  
// SIMULATE CHAT MESSAGE COMMAND
register("command", (...args) => {
  if (Player.getName() == 'freebonsai') {
    let msg = ""
    for (let i=0;i<args.length;i++) {
      if (args.length > i+1) {
        msg += args[i] + " "
      } else {
        msg += args[i]
      }
    }
    ChatLib.simulateChat(msg)
  }
}).setName("bosim")

register("command", (x,y,z) => {
  if (Player.getName() == 'freebonsai') {
    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x, y, z)
  }
}).setName("botp")

register("command", () => {
  if (Player.getName() == 'freebonsai') {
    lines = Scoreboard.getLines()
    for (let i = 0; i < lines.length; i++) {
      console.log(lines[i])
    }
  }
}).setName("getscoreboard")

// 6 101 8
register("command", (x,y,z) => {
  if (Player.getName() == 'freebonsai') {
    x*=1
    y*=1
    z*=1
    pos = new BlockPos(x,y,z)
    console.log(pos)
    Client.getMinecraft().func_71410_x().field_71441_e.func_175698_g(pos.toMCBlock())
  }
}).setName("setgb")

register("command", (x,y,z) => {
  Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y,z)
}).setName("tpbo")

register("command", (x,y,z) => {
  px = Math.floor(Player.getX())
  py = Math.floor(Player.getY())
  pz = Math.floor(Player.getZ())
  ChatLib.chat(`${px}, ${py}, ${pz}`)
}).setName("getcoords")

register("command", () => {
  lookingat = Player.lookingAt().type
  console.log(lookingat)
  if (lookingat == "BlockType{name=minecraft:iron_bars}") {
    console.log("iron bar")
  }
}).setName("lookingat")