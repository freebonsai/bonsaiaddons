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

// 5 70 42