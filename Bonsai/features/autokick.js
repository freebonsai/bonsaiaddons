import { data } from "../data/data"
import { prefix } from "../utils/prefix"
import Config from "../Config"

register("chat", (n,c) => {
    if (Config.autoKick) {
        if (data.bl.includes(n.toLowerCase())) {
            ChatLib.command(`p kick ${n}`)
        }
    }
}).setChatCriteria("Dungeon Finder > ${name} joined the dungeon group! ${lvl}")

register("command", (...args) => {
    if (args == "list") {
        if (data.bl != undefined) {
            ChatLib.chat(prefix + " &bYour blacklist&a:")
            for (let i=0;i<data.bl.length;i++) {
                ChatLib.chat("&a" + data.bl[i])
          } 
        } else {
            ChatLib.chat(prefix + " &bYour blacklist is empty!")
        }
    } else if (args.includes("add")) {
    if (data.bl != undefined) {
      if (!data.bl.includes(args[1])) {
        data.bl.push(args[1].toLowerCase())
        ChatLib.chat(prefix + "&b Added &a" + args[1] + " &bto your blacklist")
      } else {
        ChatLib.chat(prefix + "&b Name already in blacklist!")
      }
    } else {
        data.bl.push(args[1].toLowerCase())
        ChatLib.chat(prefix + "&b Added &a" + args[1] + " &bto your blacklist")
    }
    } else if (args.includes("remove")) {
        toberemoved = data.bl.indexOf(args[1].toLowerCase())
        if (toberemoved >= 0) {
            data.bl.splice(toberemoved)
            ChatLib.chat(prefix + "&b Removed &a" + args[1] + " &bfrom your blacklist")
        } else {
            ChatLib.chat(prefix + " &bName is not in the blacklist, or invalid arguments, use /blacklist help for additional help")
        }
    } else if (args == "help") {
      ChatLib.chat(prefix + " &bThe commands&a:")
      ChatLib.chat("&c/blacklist list &bto list all names in your blacklist")
      ChatLib.chat("&c/blacklist add &bto add a name to your blacklist")
      ChatLib.chat("&c/blacklist remove &bto remove a name from your blacklist")
      ChatLib.chat("&c/blacklist help &bto get this message")
      ChatLib.chat(prefix + " &bCorrect capitalization is required!")
    } else if (args.length == 1) {
      Config.openGUI()
    } else {
      ChatLib.chat(prefix + " &bInvalid arguments, use&a:")
      ChatLib.chat("&c/blacklist list &bto list all names in your blacklist")
      ChatLib.chat("&c/blacklist add (name) &bto add a name to your blacklist")
      ChatLib.chat("&c/blacklist remove (name) &bto remove a name from your blacklist")
      ChatLib.chat(prefix + " &bCorrect capitalization is required!")
    }
    data.save()
}).setName("blacklist")