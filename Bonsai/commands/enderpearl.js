register("command", () => {
    new Thread(() => {
        ChatLib.command("storage")
        Thread.sleep(350)
        inv = Player.getContainer();
        inv.click(38,false,"LEFT")
        Thread.sleep(550)
        inv = Player.getContainer();
        epearlslot = -1
        for (let i = 9; i < 44; i++) {
            item = inv.getStackInSlot(i)
            //console.log(item)
            if (item !== null) {
                if (item.toString().includes("enderPearl@0")) {
                    epearlslot = i
                }
            }
        }
        if (epearlslot >= 0) {
            inv.click(epearlslot,true,"LEFT")
        }
    }).start()
}).setName("epearl")