/// <reference types="../../CTAutocomplete" />
import Config from "../Config"
import { thirdfloor1, thirdfloor2, thirdfloor3, thirdfloor4, thirdfloor5 } from "../utils/icefillconfigurations"
import { prefix } from "../utils/prefix"
import { data } from "../data/data"
import { settings } from "../commands/gui"

hasicefill = false
hasscanned = false
let firstblockx
let firstblocky
let firstblockz
let rotation
thirdmoves = []

register("worldLoad", () => {
    hasicefill = false
    hasscanned = false
    stopped = false
    thirdmoves = []
    chest = false
})

register("worldUnload", () => {
    stopped = true
})

register("command", () => {
    stopped = !stopped
    thirdmoves = []
}).setName("stopthird")

register("step", () => {
    if (!hasicefill) {
        if (settings.Dungeons[1]) {
            px = Math.floor(Player.getX())
            py = Math.floor(Player.getY())
            pz = Math.floor(Player.getZ())
            if (py == 72) {
                let BlockBlock = new BlockPos(px,py-1,pz)
                b = World.getBlockStateAt(BlockBlock)
                if (b == "minecraft:ice") {
                    hasicefill = true
                    checkRotation()
                    firstblockx = px; firstblocky = py; firstblockz = pz;
                    scanthird()
                    movethird()
                }
            }
        }
    }
    if (!data.dev) {
        iDisplay.clearLines()
    }
}).setFps(5)

function checkRotation() {
    px = Math.floor(Player.getX())
    py = Math.floor(Player.getY())
    pz = Math.floor(Player.getZ())
    BlockBlock = new BlockPos(Math.floor(px)+8,Math.floor(py),Math.floor(pz))
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "east"
        return
    }
    BlockBlock = new BlockPos(Math.floor(px)-8,Math.floor(py),Math.floor(pz))
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "west"
        return
    }
    BlockBlock = new BlockPos(Math.floor(px),Math.floor(py),Math.floor(pz)+8)
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "south"
        return
    }
    BlockBlock = new BlockPos(Math.floor(px),Math.floor(py),Math.floor(pz)-8)
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "north"
        return
    }
}

const System = Java.type("java.lang.System")
function scanthird() {
    startTime = System.nanoTime()
    if (thirdmoves.length < 1) {
        checkthird1()
    }
    if (thirdmoves.length < 1) {
        checkthird2()
    }
    if (thirdmoves.length < 1) {
        checkthird3()
    }
    if (thirdmoves.length < 1) {
        checkthird4()
    }
    if (thirdmoves.length < 1) {
        checkthird5()
    }
    endTime = System.nanoTime()
    if ((endTime-startTime)/1000000 < 0.2) {
        ChatLib.chat(`${prefix} &bScan time for third floor: &a${(endTime-startTime)/1000000}ms`)
    } else if ((endTime-startTime)/1000000 < 0.5) {
        ChatLib.chat(`${prefix} &bScan time for third floor: &e${(endTime-startTime)/1000000}ms`)
    } else {
        ChatLib.chat(`${prefix} &bScan time for third floor: &c${(endTime-startTime)/1000000}ms`)
    }
}

const rightClick = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag")
rightClick.setAccessible(true)

var iDisplay = new Display();
iDisplay.setRenderLoc(200, 100)
iDisplay.setAlign("center")

gonext = false
stopped = false
function movethird() {
    if (data.dev) iDisplay.setLine(0, `&bIce fill`)
    new Thread(() => {
        for (let i = 0; i < thirdmoves.length; i++) {
            if (data.dev) iDisplay.setLine(1, `${i}/${thirdmoves.length}`)
            while (!gonext) {
                let BlockBlock
                if (i == 0) {
                    BlockBlock = new BlockPos(firstblockx,firstblocky-1,firstblockz)
                } else {
                    BlockBlock = new BlockPos(thirdmoves[i-1].x,thirdmoves[i-1].y-1,thirdmoves[i-1].z)
                }
                b = World.getBlockStateAt(BlockBlock)
                if (b == "minecraft:packed_ice") {
                    gonext = true
                }
                if (stopped) {
                    return
                }
            }
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(thirdmoves[i].x+0.5,thirdmoves[i].y,thirdmoves[i].z+0.5)
            gonext = false
        }
        if (data.dev) iDisplay.setLine(1, `${thirdmoves.length}/${thirdmoves.length}`)
        while (!gonext) {
            px = Math.floor(Player.getX())
            py = Math.floor(Player.getY())
            pz = Math.floor(Player.getZ())
            let BlockBlock = new BlockPos(px,py-1,pz)
            b = World.getBlockStateAt(BlockBlock)
            if (b == "minecraft:packed_ice") {
                gonext = true
            }
            if (stopped) {
                return
            }
        }
        Player.getPlayer().field_70125_A = -35
        chest = false
        if (rotation == "east") {
            Player.getPlayer().field_70177_z = -90
            while (!chest) {
                lookingat = Player.lookingAt().type
                if (lookingat == "BlockType{name=minecraft:chest}") {
                    chest = true
                } else {
                    World.getWorld().func_175698_g(new BlockPos(Math.floor(Player.getX())+1,Math.floor(Player.getY())+2,Math.floor(Player.getZ())).toMCBlock())
                    Thread.sleep(15)
                }
            }
            Thread.sleep(15)
            rightClick.invoke(Client.getMinecraft())
        } else if (rotation == "west") {
            Player.getPlayer().field_70177_z = 90
            World.getWorld().func_175698_g(new BlockPos(Math.floor(Player.getX())-1,Math.floor(Player.getY())+2,Math.floor(Player.getZ())).toMCBlock())
            while (!chest) {
                lookingat = Player.lookingAt().type
                if (lookingat == "BlockType{name=minecraft:chest}") {
                    chest = true
                } else {
                    World.getWorld().func_175698_g(new BlockPos(Math.floor(Player.getX())-1,Math.floor(Player.getY())+2,Math.floor(Player.getZ())).toMCBlock())
                    Thread.sleep(15)
                }
            }
            Thread.sleep(15)
            rightClick.invoke(Client.getMinecraft())
        } else if (rotation == "south") {
            Player.getPlayer().field_70177_z = 0
            while (!chest) {
                lookingat = Player.lookingAt().type
                if (lookingat == "BlockType{name=minecraft:chest}") {
                    chest = true
                } else {
                    World.getWorld().func_175698_g(new BlockPos(Math.floor(Player.getX()),Math.floor(Player.getY())+2,Math.floor(Player.getZ()+1)).toMCBlock())
                    Thread.sleep(15)
                }
            }
            Thread.sleep(15)
            rightClick.invoke(Client.getMinecraft())
        } else if (rotation == "north") {
            Player.getPlayer().field_70177_z = 180
            while (!chest) {
                lookingat = Player.lookingAt().type
                if (lookingat == "BlockType{name=minecraft:chest}") {
                    chest = true
                } else {
                    World.getWorld().func_175698_g(new BlockPos(Math.floor(Player.getX()),Math.floor(Player.getY())+2,Math.floor(Player.getZ())-1).toMCBlock())
                    Thread.sleep(15)
                }
            }
            Thread.sleep(15)
            rightClick.invoke(Client.getMinecraft())
        }
        iDisplay.clearLines()
    }).start()
}


function checkthird1() {
    if (rotation == "east") {
        for (let i = 0; i < thirdfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor1[i].x,firstblocky+thirdfloor1[i].y,firstblockz+thirdfloor1[i].z)
            bstate = World.getBlockStateAt(testblock)
            if (bstate == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+thirdfloor1[i].x,"y":firstblocky+thirdfloor1[i].y,"z":firstblockz+thirdfloor1[i].z})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < thirdfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+(-thirdfloor1[i].x),firstblocky+thirdfloor1[i].y,firstblockz+(-thirdfloor1[i].z))
            bstate = World.getBlockStateAt(testblock)
            if (bstate == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(-thirdfloor1[i].x),"y":firstblocky+thirdfloor1[i].y,"z":firstblockz+(-thirdfloor1[i].z)})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < thirdfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+(-thirdfloor1[i].z),firstblocky+thirdfloor1[i].y,firstblockz+(thirdfloor1[i].x))
            bstate = World.getBlockStateAt(testblock)
            if (bstate == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(-thirdfloor1[i].z),"y":firstblocky+thirdfloor1[i].y,"z":firstblockz+(thirdfloor1[i].x)})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < thirdfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor1[i].z,firstblocky+thirdfloor1[i].y,firstblockz+(-thirdfloor1[i].x))
            bstate = World.getBlockStateAt(testblock)
            if (bstate == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor1[i].z),"y":firstblocky+thirdfloor1[i].y,"z":firstblockz+(-thirdfloor1[i].x)})
            } else {
                thirdmoves = []
                return
            }
        }
    }
}

function checkthird2() {
    if (rotation == "east") {
        for (let i = 0; i < thirdfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor2[i].x,firstblocky+thirdfloor2[i].y,firstblockz+thirdfloor2[i].z)
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor2[i].x),"y":firstblocky+thirdfloor2[i].y,"z":firstblockz+thirdfloor2[i].z})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < thirdfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+(-thirdfloor2[i].x),firstblocky+thirdfloor2[i].y,firstblockz+(-thirdfloor2[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(-thirdfloor2[i].x),"y":firstblocky+thirdfloor2[i].y,"z":firstblockz+(-thirdfloor2[i].z)})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < thirdfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+(-thirdfloor2[i].z),firstblocky+thirdfloor2[i].y,firstblockz+(thirdfloor2[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(-thirdfloor2[i].z),"y":firstblocky+thirdfloor2[i].y,"z":firstblockz+(thirdfloor2[i].x)})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < thirdfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor2[i].z,firstblocky+thirdfloor2[i].y,firstblockz+(-thirdfloor2[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor2[i].z),"y":firstblocky+thirdfloor2[i].y,"z":firstblockz+(-thirdfloor2[i].x)})
            } else {
                thirdmoves = []
                return
            }
        }
    }
}

function checkthird3() {
    if (rotation == "east") {
        for (let i = 0; i < thirdfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor3[i].x,firstblocky+thirdfloor3[i].y,firstblockz+thirdfloor3[i].z)
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor3[i].x),"y":firstblocky+thirdfloor3[i].y,"z":firstblockz+thirdfloor3[i].z})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < thirdfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+(-thirdfloor3[i].x),firstblocky+thirdfloor3[i].y,firstblockz+(-thirdfloor3[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(-thirdfloor3[i].x),"y":firstblocky+thirdfloor3[i].y,"z":firstblockz+(-thirdfloor3[i].z)})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < thirdfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+(-thirdfloor3[i].z),firstblocky+thirdfloor3[i].y,firstblockz+(thirdfloor3[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor3[i].z * (-1)),"y":firstblocky+thirdfloor3[i].y,"z":firstblockz+(thirdfloor3[i].x)})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < thirdfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor3[i].z,firstblocky+thirdfloor3[i].y,firstblockz+(-thirdfloor3[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor3[i].z),"y":firstblocky+thirdfloor3[i].y,"z":firstblockz+(-thirdfloor3[i].x)})
            } else {
                thirdmoves = []
                return
            }
        }
    }
}

function checkthird4() {
    if (rotation == "east") {
        for (let i = 0; i < thirdfloor4.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor4[i].x,firstblocky+thirdfloor4[i].y,firstblockz+thirdfloor4[i].z)
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor4[i].x),"y":firstblocky+thirdfloor4[i].y,"z":firstblockz+thirdfloor4[i].z})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < thirdfloor4.length; i++) {
            let testblock = new BlockPos(firstblockx+(-thirdfloor4[i].x),firstblocky+thirdfloor4[i].y,firstblockz+(-thirdfloor4[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(-thirdfloor4[i].x),"y":firstblocky+thirdfloor4[i].y,"z":firstblockz+(-thirdfloor4[i].z)})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < thirdfloor4.length; i++) {
            let testblock = new BlockPos(firstblockx+(-thirdfloor4[i].z),firstblocky+thirdfloor4[i].y,firstblockz+(thirdfloor4[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(-thirdfloor4[i].z),"y":firstblocky+thirdfloor4[i].y,"z":firstblockz+(thirdfloor4[i].x)})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < thirdfloor4.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor4[i].z,firstblocky+thirdfloor4[i].y,firstblockz+(-thirdfloor4[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor4[i].z),"y":firstblocky+thirdfloor4[i].y,"z":firstblockz+(-thirdfloor4[i].x)})
            } else {
                thirdmoves = []
                return
            }
        }
    }
}

function checkthird5() {
    if (rotation == "east") {
        for (let i = 0; i < thirdfloor5.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor5[i].x,firstblocky+thirdfloor5[i].y,firstblockz+thirdfloor5[i].z)
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor5[i].x),"y":firstblocky+thirdfloor5[i].y,"z":firstblockz+thirdfloor5[i].z})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < thirdfloor5.length; i++) {
            let testblock = new BlockPos(firstblockx+(-thirdfloor5[i].x),firstblocky+thirdfloor5[i].y,firstblockz+(-thirdfloor5[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(-thirdfloor5[i].x),"y":firstblocky+thirdfloor5[i].y,"z":firstblockz+(-thirdfloor5[i].z)})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < thirdfloor5.length; i++) {
            let testblock = new BlockPos(firstblockx+(-thirdfloor5[i].z),firstblocky+thirdfloor5[i].y,firstblockz+(thirdfloor5[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(-thirdfloor5[i].z),"y":firstblocky+thirdfloor5[i].y,"z":firstblockz+(thirdfloor5[i].x)})
            } else {
                thirdmoves = []
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < thirdfloor5.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor5[i].z,firstblocky+thirdfloor5[i].y,firstblockz+(-thirdfloor5[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor5[i].z),"y":firstblocky+thirdfloor5[i].y,"z":firstblockz+(-thirdfloor5[i].x)})
            } else {
                thirdmoves = []
                return
            }
        }
    }
}


var GL11 = Java.type("org.lwjgl.opengl.GL11")
var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager")
c = 0.15
direction = "up"
register("step", () => {
    if (direction == "up") {
        if (c <= 0.85) {
            c += 0.0025
        } else {
            direction = "down"
        }
    } else {
        if (c >= 0.15) {
            c -= 0.0025
        } else {
            direction = "up"
        }
    }
}).setFps(60)
register("renderWorld", () => {
    if (thirdmoves.length > 0) {
        px = Math.floor(Player.getX())
        py = Math.floor(Player.getY())
        pz = Math.floor(Player.getZ())
        GL11.glBlendFunc(770, 771);
        GL11.glEnable(GL11.GL_BLEND);
        GL11.glLineWidth(10);
        GL11.glDisable(GL11.GL_TEXTURE_2D);
        GlStateManager.func_179094_E();
    
        Tessellator.begin(GL11.GL_LINE_STRIP).colorize(c, c, c, 1);

        Tessellator.pos(firstblockx+0.5,firstblocky+0.1,firstblockz+0.5);
        Tessellator.pos(thirdmoves[0].x+0.5,thirdmoves[0].y+0.1,thirdmoves[0].z+0.5);
        for (let i = 1; i < thirdmoves.length; i++) {
            Tessellator.pos(thirdmoves[i-1].x+0.5,thirdmoves[i-1].y+0.1,thirdmoves[i-1].z+0.5);
            Tessellator.pos(thirdmoves[i].x+0.5,thirdmoves[i].y+0.1,thirdmoves[i].z+0.5);
        }
        Tessellator.draw();
        GlStateManager.func_179121_F();
        GL11.glEnable(GL11.GL_TEXTURE_2D);
        GL11.glDisable(GL11.GL_BLEND);
    }
})