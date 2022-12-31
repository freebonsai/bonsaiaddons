const rightClick = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag")
rightClick.setAccessible(true)
register("command", () => {
    ChatLib.command("party tocl")
    setTimeout(() => {
        rightClick.invoke(Client.getMinecraft())
        setTimeout(() => {
            let inv = Player.getContainer();
            inv.click(23,false,"LEFT")
            setTimeout(() => {
                let inv = Player.getContainer();
                inv.click(13,false,"LEFT")
            }, 500)
        }, 500)
    }, 500)
}).setName("tf7")