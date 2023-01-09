import { settings } from "../commands/gui"

intrades = false
going = false
sellable = [
    "Enchanted Ice",
    "Health Potion",
    "superboom tnt"
]
q = []
register("tick", () => {
    if (intrades) return
    if (!settings.General[4]) return
    let inv = Player.getContainer();
    let n = inv.getName();
    // console.log(n)
    if (n == "Trades") {
        for (let i=54; i<88; i++) {
            if (Player.getContainer().getStackInSlot(i) != null) {
                item = ChatLib.removeFormatting(Player.getContainer().getStackInSlot(i).getName().toLowerCase())
                for (let j = 0; j < sellable.length; j++) {
                    if (item.startsWith(sellable[j].toLowerCase())) {
                        q.push(i)
                    }
                }
            }
        }
        //console.log(q)
        intrades = true
        going = true
    }
})

counter = 0
register("step", () => {
    if (!going) return
    if (counter >= q.length) {
        counter = 0
        going = false
        q = []
        return
    }
    inv = Player.getContainer();
    inv.click(q[counter],false,"MIDDLE")
    counter++ 
}).setFps(6)

register('GuiClosed', () => {
    if (intrades) { 
      intrades = false
      q = []
    }
  });