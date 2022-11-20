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