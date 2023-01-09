import Dungeon from "../../BloomCore/dungeons/Dungeon"
import Config from "../Config"
import { settings } from "../commands/gui"

register("tick", () => {
    if (settings.Clip[1])  {
        if (Dungeon.inDungeon) {
            lines = Scoreboard.getLines()
            for (let i = 0;i < lines.length;i++) {
                if (lines[i].toString().includes("F4") || lines[i].toString().includes("M4")) {
                    //console.log(Math.floor(Player.getX()),Math.floor(Player.getY()),Math.floor(Player.getZ()))
                    let atCoords = (x,y,z) => Math.floor(Player.getX()) == x && Math.floor(Player.getY()) == y && Math.floor(Player.getZ()) == z
                    if (atCoords(5,69,-21)) {
                        px = Player.getX()
                        py = Player.getY()
                        pz = Player.getZ()
                        new Thread(() => {
                            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py+3, pz)
                            py += 3
                            Thread.sleep(100)
                            for (let i = 0; i < 16; i++) {
                                Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py, pz + 1)
                                Thread.sleep(6)
                                pz = Player.getZ()
                            }
                            Thread.sleep(100)
                            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py -2, pz)
                        }).start()
                    }
                }
            }
        }
    }
})



// F5
register("tick", () => {
    if (settings.Clip[2])  {
        if (Dungeon.inDungeon) {
            lines = Scoreboard.getLines()
            for (let i = 0;i < lines.length;i++) {
                if (lines[i].toString().includes("F5") || lines[i].toString().includes("M5")) {
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
        }
    }
})

const rightClick = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag")
rightClick.setAccessible(true)
clicked = false
hasclipped = false
// F7
register("tick", () => {
    if (settings.Clip[4] && !hasclipped)  {
        if (Dungeon.inDungeon) {
            let atCoords = (x,y,z) => Math.floor(Player.getX()) == x && Math.floor(Player.getY()) == y && Math.floor(Player.getZ()) == z
            if (atCoords(73,221,14)) {
                if (settings.Clip[5] == 1 && !hasclipped) { // RIGHT
                    px = Player.getX()
                    py = Player.getY()+1.5
                    pz = Player.getZ()
                    xleft = -9
                    yleft = 17
                    zleft = 35.5
                    new Thread(() => {
                        for (let i = 0; i < 35; i++) {
                            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + (xleft/35), py + (yleft/35), pz + (zleft/35))
                            Thread.sleep(6)
                            px += (xleft/35)
                            py += (yleft/35)
                            pz += (zleft/35)
                        }
                        Thread.sleep(10)
                        rightClick.invoke(Client.getMinecraft())
                        clicked = true
                    }).start()
                    hasclipped = true
                    console.log("hello")
                } else if (settings.Clip[5] == 0 && !hasclipped) { // LEFT
                    px = Player.getX()
                    py = Player.getY()+1.5
                    pz = Player.getZ()
                    xleft = 9
                    yleft = 17
                    zleft = 35.5
                    new Thread(() => {
                        for (let i = 0; i < 35; i++) {
                            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + (xleft/35), py + (yleft/35), pz + (zleft/35))
                            Thread.sleep(6)
                            px += (xleft/35)
                            py += (yleft/35)
                            pz += (zleft/35)
                        }
                        Thread.sleep(10)
                        rightClick.invoke(Client.getMinecraft())
                        clicked = true
                    }).start()
                    hasclipped = true
                } else if (settings.Clip[5] == 2 && !hasclipped) { // DOWN
                    new Thread(() => {
                        starttime = new Date().getTime()
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 222, 19.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 222, 24.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 222, 28.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 222, 32.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 218, 32.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 211, 32.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 203, 32.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 195, 32.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 187, 32.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 179, 32.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 171, 32.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 171, 36.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 165, 36.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 158, 36.5)
                        Thread.sleep(60)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(74.5, 150, 36.5)
                        Thread.sleep(60)
                        endtime = new Date().getTime()
                        console.log(endtime-starttime)
                    }).start()
                    hasclipped = true
                } else if (settings.Clip[5] == 3 && !hasclipped) { // CONVEYOR
                    px = Player.getX()
                    py = Player.getY()+5
                    pz = Player.getZ()
                    Thread.sleep(80)
                    new Thread(() => {
                        for (let i = 0; i < 62; i++) {
                            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py, pz + 1)
                            Thread.sleep(6)
                            pz+=1
                        }
                        Thread.sleep(10)
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py, pz + 0.8)
                        Player.getPlayer().field_70177_z = 180
                        Player.getPlayer().field_70125_A = 0
                    }).start()
                    hasclipped = true
                }
            }
        }
    }
})

register("command", () => {
    px = Player.getX()
    py = Player.getY()+5
    pz = Player.getZ()
    Thread.sleep(80)
    new Thread(() => {
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 221, 19.5)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 221, 24.5)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 221, 28.5)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 221, 32.5)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 218, 32.5)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 211, 32.5)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 203, 32.5)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 195, 32.5)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 187, 32.5)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 179, 32.5)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 171, 32.5)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 171, 36.5)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 165.5, 35.925)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(73.5, 158, 36.5)
        Thread.sleep(60)
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(74.5, 150, 36.5)
    }).start()
}).setName("testclip")

register("worldLoad", () => {
    hasclipped = false
})

// AFTER CRYSTAL PICK UP
register("chat", (name) => {
    if (clicked) {
        if (name == Player.getName()) {
            if (settings.Clip[5] == 1) {
                xleft = -12
                zleft = -10
                new Thread(() => {
                    for (let i = 0; i < 10; i++) {
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + (xleft/10), py, pz + (zleft/10))
                        Thread.sleep(15)
                        px = Player.getX()
                        py = Player.getY()
                        pz = Player.getZ()
                    }
                }).start()
                clicked = false
            } else {
                xleft = 12
                zleft = -10
                new Thread(() => {
                    for (let i = 0; i < 10; i++) {
                        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + (xleft/10), py, pz + (zleft/10))
                        Thread.sleep(15)
                        px = Player.getX()
                        py = Player.getY()
                        pz = Player.getZ()
                    }
                }).start()
                clicked = false
            }
        }
    }
}).setChatCriteria("${name} picked up an Energy Crystal!")


// F6
register("tick", () => {
    if (settings.Clip[3])  {
        if (Dungeon.inDungeon) {
            lines = Scoreboard.getLines()
            for (let i = 0;i < lines.length;i++) {
                if (lines[i].toString().includes("F6") || lines[i].toString().includes("M6")) {
                    if (Config.f6Class == 0) { // Tank
                        let atCoords = (x,y,z) => Math.floor(Player.getX()) == x && Math.floor(Player.getY()) == y && Math.floor(Player.getZ()) == z
                        if (atCoords(-9,69,6)) {
                            px = Player.getX()
                            py = Player.getY()+1.5
                            pz = Player.getZ()
                            zleft = 31
                            // -15 70 37
                            new Thread(() => {
                                for (let i = 0; i < zleft; i++) {
                                    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py, pz + 1)
                                    Thread.sleep(5)
                                    pz = Player.getZ()
                                }
                                for (let i = 0; i < 7; i++) {
                                    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px - 1, py, pz)
                                    Thread.sleep(5)
                                    px = Player.getX()
                                }
                            }).start()
                        }
                    } else if (Config.f6Class == 1) { // Healer
                        let atCoords = (x,y,z) => Math.floor(Player.getX()) == x && Math.floor(Player.getY()) == y && Math.floor(Player.getZ()) == z
                        if (atCoords(-9,69,6)) {
                            px = Player.getX()
                            py = Player.getY()+0.5
                            pz = Player.getZ()
                            zleft = 30
                            yleft = 8
                            new Thread(() => {
                                for (let i = 0; i < zleft; i++) {
                                    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py, pz + 1)
                                    Thread.sleep(5)
                                    pz = Player.getZ()
                                }
                                for (let i = 0; i < yleft; i++) {
                                    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py + 1, pz)
                                    Thread.sleep(5)
                                    py = Player.getY()
                                }
                                for (let i = 0; i < 6; i++) {
                                    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px - 1, py, pz)
                                    Thread.sleep(5)
                                    px = Player.getX()
                                }
                            }).start()
                        }
                    } else if (Config.f6Class == 2) { // Mage
                        let atCoords = (x,y,z) => Math.floor(Player.getX()) == x && Math.floor(Player.getY()) == y && Math.floor(Player.getZ()) == z
                        if (atCoords(-9,69,6)) {
                            px = Player.getX()
                            py = Player.getY()+0.5
                            pz = Player.getZ()
                            zleft = 33
                            new Thread(() => {
                                for (let i = 0; i < zleft; i++) {
                                    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py, pz + 1)
                                    Thread.sleep(5)
                                    pz = Player.getZ()
                                }
                                for (let i = 0; i < 2; i++) {
                                    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px - 1, py, pz)
                                    Thread.sleep(5)
                                    px = Player.getX()
                                }
                            }).start()
                        }
                    } else if (Config.f6Class == 3) { // Archer
                        let atCoords = (x,y,z) => Math.floor(Player.getX()) == x && Math.floor(Player.getY()) == y && Math.floor(Player.getZ()) == z
                        if (atCoords(-9,69,6)) {
                            px = Player.getX()
                            py = Player.getY()+0.5
                            pz = Player.getZ()
                            zleft = 48
                            // -18 69 54
                            new Thread(() => {
                                for (let i = 0; i < zleft; i++) {
                                    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py, pz + 1)
                                    Thread.sleep(6)
                                    pz = Player.getZ()
                                }
                                for (let i = 0; i < 9; i++) {
                                    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + 1, py, pz)
                                    Thread.sleep(6)
                                    px = Player.getX()
                                }
                            }).start()
                        }
                    } else if (Config.f6Class == 4) { // Bers
                        let atCoords = (x,y,z) => Math.floor(Player.getX()) == x && Math.floor(Player.getY()) == y && Math.floor(Player.getZ()) == z
                        if (atCoords(-9,69,6)) {
                            px = Player.getX()
                            py = Player.getY()+1
                            pz = Player.getZ()
                            zleft = 48
                            // -18 69 54
                            new Thread(() => {
                                for (let i = 0; i < zleft; i++) {
                                    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px, py, pz + 1)
                                    Thread.sleep(6)
                                    pz = Player.getZ()
                                }
                                for (let i = 0; i < 9; i++) {
                                    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px - 1, py, pz)
                                    Thread.sleep(6)
                                    px = Player.getX()
                                }
                            }).start()
                        }
                    }
                }
            }
        }
    }
})


// -90 21
// 0 6
// 0 6
register("chat", () => {
    if (settings.Clip[3])  {
        if (Config.f6class == 0) {
            new Thread(() => {
                Player.getPlayer().field_70177_z = -90
                Player.getPlayer().field_70125_A = 21
                items = Player.getInventory().getItems()
                for (let i = 0; i < items.length; i++) {
                    if (items[i] == "1xitem.shovelDiamond@0") {
                        aotvslot = i
                    }
                }
                Thread.sleep(250)
                Player.setHeldItemIndex(aotvslot)
                rightClick.invoke(Client.getMinecraft())
                Thread.sleep(700)

                Player.getPlayer().field_70177_z = 0
                Player.getPlayer().field_70125_A = 6
                Thread.sleep(250)
                Player.setHeldItemIndex(aotvslot)
                rightClick.invoke(Client.getMinecraft())
                Thread.sleep(100)

                Player.getPlayer().field_70177_z = 0
                Player.getPlayer().field_70125_A = 6
                Thread.sleep(250)
                Player.setHeldItemIndex(aotvslot)
                rightClick.invoke(Client.getMinecraft())
            }).start()
        }
    }
}).setChatCriteria("[BOSS] Sadan: ENOUGH!")

register("chat", () => {
    if (settings.Clip[3])  {
        if (Config.f6class == 0) {
            new Thread(() => {
                Player.getPlayer().field_70177_z = 0
                Player.getPlayer().field_70125_A = 0
                items = Player.getInventory().getItems()
                for (let i = 0; i < items.length; i++) {
                    if (items[i] == "1xitem.shovelDiamond@0") {
                        aotvslot = i
                    }
                }
                Thread.sleep(250)
                Player.setHeldItemIndex(aotvslot)
                rightClick.invoke(Client.getMinecraft())
            }).start()
        }
    }
}).setChatCriteria("[BOSS] Sadan: You did it. I understand now, you have earned my respect.")