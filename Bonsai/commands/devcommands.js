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