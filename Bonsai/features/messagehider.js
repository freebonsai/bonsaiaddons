import Config from "../Config"
import { prefix } from "../utils/prefix"


register("chat", (chat,rank,name,msg,event) => {
    if (Config.messageHider && name.toLowerCase() == Config.ignHide.toLowerCase()) {
      if (rank == "[MVP+]" || rank == "[MVP]") {
        ChatLib.chat(prefix + " &b" + name + " &dis smeshnik and shouldn't be allowed to speak")
      } else if (rank == "[MVP++]") {
        ChatLib.chat(prefix + " &6" + name + " &dis smeshnik and shouldn't be allowed to speak")
      } else if (rank == "[VIP]" || rank == "[VIP+]") {
        ChatLib.chat(prefix + " &a" + name + " &dis smeshnik and shouldn't be allowed to speak")
      }
      console.log(`${chat} > ${rank} ${name}: ${msg}`)
      cancel(event)
    }
  }).setChatCriteria("${chat} > ${rank} ${name}: ${msg}")
  
  register("chat", (chat,rank,name,grank,msg,event) => {
    if (Config.messageHider && name.toLowerCase() == Config.ignHide.toLowerCase()) {
      if (rank == "[MVP+]" || rank == "[MVP]") {
        ChatLib.chat(prefix + " &b" + name + " &dis smeshnik and shouldn't be allowed to speak")
      } else if (rank == "[MVP++]") {
        ChatLib.chat(prefix + " &6" + name + " &dis smeshnik and shouldn't be allowed to speak")
      } else if (rank == "[VIP]" || rank == "[VIP+]") {
        ChatLib.chat(prefix + " &a" + name + " &dis smeshnik and shouldn't be allowed to speak")
      }
      console.log(`${chat} > ${rank} ${name} ${grank}: ${msg}`)
      cancel(event)
    }
  }).setChatCriteria("${chat} > ${rank} ${name} ${grank}: ${msg}")