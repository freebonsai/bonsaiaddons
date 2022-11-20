import Config from "../Config"
import {prefix} from "../utils/prefix"

let lastsinmsg
sinseekerslot = -1
sinclipkey = new KeyBind("Sinseeker Key", Keyboard.KEY_7, "Bonsai")
sinclipkey.registerKeyPress(() => {
  if (Config.sinclip) {
    items = Player.getInventory().getItems()
    for (let i=0;i<items.length;i++) {
      if (items[i] == "1xitem.hoeGold@0") {
        if (items[i].getName() == "§5§4Sin§5seeker Scythe") {
          sinseekerslot = i
        }
      }
    }
    if (sinseekerslot >= 0) {
      new Thread(() => {
        Thread.sleep(Config.sindelay)
        ChatLib.command("vertclip", true)
        new Message(prefix +" &bSinseeker clipping").setChatLineId(5050).chat();
        lastsinmsg = new Date().getTime()
      }).start()
    }
  }
})

register("tick", () => {
  if (new Date().getTime() - lastsinmsg > 6000) {
    ChatLib.clearChat(5050);
    lastsinmsg = undefined
  }
})