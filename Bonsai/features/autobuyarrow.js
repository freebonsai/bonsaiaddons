import { prefix } from "../utils/prefix"

let lastclick = new Date().getTime()-501
let clicked = false
register("tick", () => {
    if (!clicked) {
        let inv = Player.getContainer();
        let n = inv.getName();
        new Thread(() => {
            if (n == "Ophelia" || n == "Weaponsmith") {
                Thread.sleep(100)
                item = inv.getStackInSlot(53).getLore()
                if (!item.includes("§5§o§aYour quiver is full!")) {
                    if (new Date().getTime() - lastclick > 1000) {
                        new Message(prefix +" &bFilled arrows").setChatLineId(24305).chat();
                        clicked = true
                        inv.click(53,false,"MIDDLE")
                        lastclick = new Date().getTime()
                    }
                }
            }
        }).start()
    }
})
register('GuiClosed', () => { if (clicked) { clicked = false }});

register("tick", () => {
    if (new Date().getTime() - lastclick > 6000) {
      ChatLib.clearChat(24305);
    }
})

register("chat", (amount,event) => {
    if (new Date().getTime() - lastclick < 400) {
        cancel(event)
    }
}).setChatCriteria("You filled your quiver with ${amount} extra arrows!")