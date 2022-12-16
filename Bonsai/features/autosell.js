import { settings } from "../commands/gui"

intrades = false
going = false
sellable = [
    "1xtile.ice@0",
    "1xitem.potion@16389"
]
q = []
register("tick", () => {
    if (intrades) return
    let inv = Player.getContainer();
    let n = inv.getName();
    // console.log(n)
    if (n == "Trades") {
        for (let i=54; i<88; i++) {
            if (Player.getContainer().getStackInSlot(i) != null) {
                if (sellable.includes(Player.getContainer().getStackInSlot(i).toString())) {
                    q.push(i)
                } else {
                    // console.log(Player.getContainer().getStackInSlot(i))
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
    console.log(q[counter])
    counter++ 
}).setFps(6)

register('GuiClosed', () => {
    if (intrades) { 
      intrades = false
      q = []
    }
  });