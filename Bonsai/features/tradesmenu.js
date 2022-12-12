trades = new KeyBind("Trades Menu", Keyboard.KEY_NONE, "Bonsai")
trades.registerKeyPress(() => {
    opentradesmenu()
})

register("command", () => {
    opentradesmenu()
}).setName("tradesmenu")

function opentradesmenu() {
    new Thread(() => {
        ChatLib.command("sbmenu")
        let inv = Player.getContainer();
        let n = inv.getName();
        while (n != "SkyBlock Menu") {
            inv = Player.getContainer();
            n = inv.getName();
            Thread.sleep(2)
            //console.log(n)
        }
        inv.click(22,false,"MIDDLE")
    }).start()
}