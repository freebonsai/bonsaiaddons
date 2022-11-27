import Dungeon from "../../BloomCore/dungeons/Dungeon"
import Config from "../Config"


// F5
register("tick", () => {
    if (Config.f5clip)  {
        if (Dungeon.inDungeon) {
            let atCoords = (x,y,z) => Math.floor(Player.getX()) == x && Math.floor(Player.getY()) == y && Math.floor(Player.getZ()) == z
            if (atCoords(5,69,0)) {
                px = Player.getX()
                py = Player.getY()+1.5
                pz = Player.getZ()
                new Thread(() => {
                    for (let i = 0; i < 42; i++) {
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py, pz + 1)
                        Thread.sleep(5)
                        pz = Player.getZ()
                    }
                }).start()
            }
        }
    }
})

const rightClick = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag")
rightClick.setAccessible(true)

// F7
// 64 238 49
register("tick", () => {
    if (Config.f7clip)  {
        if (Dungeon.inDungeon) {
            let atCoords = (x,y,z) => Math.floor(Player.getX()) == x && Math.floor(Player.getY()) == y && Math.floor(Player.getZ()) == z
            if (atCoords(73,221,14)) {
                if (Config.clipSide == 0) {
                    px = Player.getX()
                    py = Player.getY()
                    pz = Player.getZ()
                    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py + 1.5, pz)
                    py = Player.getY()
                    xleft = -9
                    yleft = 17
                    zleft = 35.5
                    new Thread(() => {
                        for (let i = 0; i < 35; i++) {
                            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + (xleft/35), py + (yleft/35), pz + (zleft/35))
                            Thread.sleep(6)
                            px = Player.getX()
                            py = Player.getY()
                            pz = Player.getZ()
                        }
                        Thread.sleep(10)
                        rightClick.invoke(Client.getMinecraft())
                        Thread.sleep(150)
                        xleft = -12
                        zleft = -10
                        for (let i = 0; i < 10; i++) {
                            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + (xleft/10), py, pz + (zleft/10))
                            Thread.sleep(15)
                            px = Player.getX()
                            py = Player.getY()
                            pz = Player.getZ()
                        }
                    }).start()
                } else {
                    px = Player.getX()
                    py = Player.getY()
                    pz = Player.getZ()
                    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py + 1.5, pz)
                    py = Player.getY()
                    xleft = 9
                    yleft = 17
                    zleft = 35.5
                    new Thread(() => {
                        for (let i = 0; i < 35; i++) {
                            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + (xleft/35), py + (yleft/35), pz + (zleft/35))
                            Thread.sleep(6)
                            px = Player.getX()
                            py = Player.getY()
                            pz = Player.getZ()
                        }
                        Thread.sleep(10)
                        rightClick.invoke(Client.getMinecraft())
                        Thread.sleep(150)
                        xleft = 12
                        zleft = -10
                        for (let i = 0; i < 10; i++) {
                            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + (xleft/10), py, pz + (zleft/10))
                            Thread.sleep(15)
                            px = Player.getX()
                            py = Player.getY()
                            pz = Player.getZ()
                        }
                    }).start()
                }
            }
        }
    }
})