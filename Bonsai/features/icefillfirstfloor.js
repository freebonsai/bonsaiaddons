/// <reference types="../../CTAutocomplete" />
import Config from "../Config"
import { firstfloor1, firstfloor2, firstfloor3 } from "../utils/icefillconfigurations"
import { prefix } from "../utils/prefix"
import { data } from "../data/data"
import { settings } from "../commands/gui"

hasicefill = false
hasscanned = false
let firstblockx
let firstblocky
let firstblockz
let rotation
firstmoves = []

register("worldLoad", () => {
    hasicefill = false
    hasscanned = false
    stopped = false
    firstmoves = []
})

register("worldUnload", () => {
    stopped = true
})

register("command", () => {
    stopped = !stopped
    firstmoves = []
}).setName("stopfirst")

register("step", () => {
    if (!hasicefill) {
        if (settings.Dungeons[1]) {
            px = Math.floor(Player.getX())
            py = Math.floor(Player.getY())
            pz = Math.floor(Player.getZ())
            if (py == 70) {
                let BlockBlock = new BlockPos(px,py-1,pz)
                b = World.getBlockStateAt(BlockBlock)
                if (b == "minecraft:ice") {
                    hasicefill = true
                    checkRotation()
                    firstblockx = px; firstblocky = py; firstblockz = pz;
                    scanfirst()
                    movefirst()
                }
            }
        }
    }
    if (!data.dev) {
        iDisplay.clearLines()
    }
}).setFps(4)

function checkRotation() {
    px = Math.floor(Player.getX())
    py = Math.floor(Player.getY())
    pz = Math.floor(Player.getZ())
    BlockBlock = new BlockPos(Math.floor(px)+4,Math.floor(py),Math.floor(pz))
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "east"
        return
    }
    BlockBlock = new BlockPos(Math.floor(px)-4,Math.floor(py),Math.floor(pz))
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "west"
        return
    }
    BlockBlock = new BlockPos(Math.floor(px),Math.floor(py),Math.floor(pz)+4)
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "south"
        return
    }
    BlockBlock = new BlockPos(Math.floor(px),Math.floor(py),Math.floor(pz)-4)
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "north"
        return
    }
}

const System = Java.type("java.lang.System")
function scanfirst() {
    startTime = System.nanoTime()
    if (firstmoves.length < 1) {
        checkfirst1()
    }
    if (firstmoves.length < 1) {
        checkfirst2()
    }
    if (firstmoves.length < 1) {
        checkfirst3()
    }
    endTime = System.nanoTime()
    if ((endTime-startTime)/1000000 < 0.1) {
        ChatLib.chat(`${prefix} &bScan time for first floor: &a${(endTime-startTime)/1000000}ms`)
    } else if ((endTime-startTime)/1000000 < 0.18) {
        ChatLib.chat(`${prefix} &bScan time for first floor: &e${(endTime-startTime)/1000000}ms`)
    } else {
        ChatLib.chat(`${prefix} &bScan time for first floor: &c${(endTime-startTime)/1000000}ms`)
    }
}

var iDisplay = new Display();
iDisplay.setRenderLoc(200, 100)
iDisplay.setAlign("center")

gonext = false
function movefirst() {
    if (data.dev) iDisplay.setLine(0, `&bIce fill`)
    new Thread(() => {
        for (let i = 0; i < firstmoves.length; i++) {
            if (data.dev) iDisplay.setLine(1, `${i}/${firstmoves.length}`)
            while (!gonext) {
                let BlockBlock
                if (i == 0) {
                    BlockBlock = new BlockPos(firstblockx,firstblocky-1,firstblockz)
                } else {
                    BlockBlock = new BlockPos(firstmoves[i-1].x,firstmoves[i-1].y-1,firstmoves[i-1].z)
                }
                b = World.getBlockStateAt(BlockBlock)
                if (b == "minecraft:packed_ice") {
                    gonext = true
                }
                if (stopped) {
                    return
                }
            }
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(firstmoves[i].x+0.5,firstmoves[i].y,firstmoves[i].z+0.5)
            gonext = false
        }
        if (data.dev) iDisplay.setLine(1, `${firstmoves.length}/${firstmoves.length}`)
        x = Player.getX()
        y = Player.getY()
        z = Player.getZ()
        while (!gonext) {
            px = Math.floor(Player.getX())
            py = Math.floor(Player.getY())
            pz = Math.floor(Player.getZ())
            let BlockBlock = new BlockPos(px,py-1,pz)
            b = World.getBlockStateAt(BlockBlock)
            if (b == "minecraft:packed_ice") {
                gonext = true
            } else {
                Thread.sleep(5)
            }
        }
        gonext = false
        if (rotation == "east") {
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x+0.5,y+0.5,z)
            Thread.sleep(100)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x+1,y+1,z)
            Thread.sleep(150)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x+2,y+1,z)
        } else if (rotation == "west") {
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x-0.5,y+0.5,z)
            Thread.sleep(100)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x-1,y+1,z)
            Thread.sleep(150)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x-2,y+1,z)
        } else if (rotation == "south") {
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y+0.5,z+0.5)
            Thread.sleep(100)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y+1,z+1)
            Thread.sleep(150)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y+1,z+2)
        } else if (rotation == "north") {
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y+0.5,z-0.5)
            Thread.sleep(100)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y+1,z-1)
            Thread.sleep(150)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y+1,z-2)
        }
        iDisplay.clearLines()
    }).start()
}


function checkfirst1() {
    if (rotation == "east") {
        for (let i = 0; i < firstfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+firstfloor1[i].x,firstblocky+firstfloor1[i].y,firstblockz+firstfloor1[i].z)
            bstate = World.getBlockStateAt(testblock)
            if (bstate == "minecraft:air") {
                firstmoves.push({"x":firstblockx+firstfloor1[i].x,"y":firstblocky+firstfloor1[i].y,"z":firstblockz+firstfloor1[i].z})
            } else {
                firstmoves = []
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < firstfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+(-firstfloor1[i].x),firstblocky+firstfloor1[i].y,firstblockz+(-firstfloor1[i].z))
            bstate = World.getBlockStateAt(testblock)
            if (bstate == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(-firstfloor1[i].x),"y":firstblocky+firstfloor1[i].y,"z":firstblockz+(-firstfloor1[i].z)})
            } else {
                firstmoves = []
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < firstfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+firstfloor1[i].z,firstblocky+firstfloor1[i].y,firstblockz+firstfloor1[i].x)
            bstate = World.getBlockStateAt(testblock)
            if (bstate == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(firstfloor1[i].z),"y":firstblocky+firstfloor1[i].y,"z":firstblockz+(firstfloor1[i].x)})
            } else {
                firstmoves = []
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < firstfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+firstfloor1[i].z,firstblocky+firstfloor1[i].y,firstblockz+(-firstfloor1[i].x))
            bstate = World.getBlockStateAt(testblock)
            if (bstate == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(firstfloor1[i].z),"y":firstblocky+firstfloor1[i].y,"z":firstblockz+(-firstfloor1[i].x)})
            } else {
                firstmoves = []
                return
            }
        }
    }
}

function checkfirst2() {
    if (rotation == "east") {
        for (let i = 0; i < firstfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+(firstfloor2[i].x),firstblocky+firstfloor2[i].y,firstblockz+(firstfloor2[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(firstfloor2[i].x),"y":firstblocky+firstfloor2[i].y,"z":firstblockz+(firstfloor2[i].z)})
            } else {
                firstmoves = []
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < firstfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+(-firstfloor2[i].x),firstblocky+firstfloor2[i].y,firstblockz+(-firstfloor2[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(-firstfloor2[i].x),"y":firstblocky+firstfloor2[i].y,"z":firstblockz+(-firstfloor2[i].z)})
            } else {
                firstmoves = []
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < firstfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+(firstfloor2[i].z),firstblocky+firstfloor2[i].y,firstblockz+(firstfloor2[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(firstfloor2[i].z),"y":firstblocky+firstfloor2[i].y,"z":firstblockz+(firstfloor2[i].x)})
            } else {
                firstmoves = []
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < firstfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+(firstfloor2[i].z),firstblocky+firstfloor2[i].y,firstblockz+(-firstfloor2[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(firstfloor2[i].z),"y":firstblocky+firstfloor2[i].y,"z":firstblockz+(-firstfloor2[i].x)})
            } else {
                firstmoves = []
                return
            }
        }
    }
}

function checkfirst3() {
    if (rotation == "east") {
        for (let i = 0; i < firstfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+(firstfloor3[i].x),firstblocky+firstfloor3[i].y,firstblockz+(-firstfloor3[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(firstfloor3[i].x),"y":firstblocky+firstfloor3[i].y,"z":firstblockz+(-firstfloor3[i].z)})
            } else {
                firstmoves = []
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < firstfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+(-firstfloor3[i].x),firstblocky+firstfloor3[i].y,firstblockz+(firstfloor3[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(-firstfloor3[i].x),"y":firstblocky+firstfloor3[i].y,"z":firstblockz+firstfloor3[i].z})
            } else {
                firstmoves = []
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < firstfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+(firstfloor3[i].z),firstblocky+firstfloor3[i].y,firstblockz+(firstfloor3[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(firstfloor3[i].z),"y":firstblocky+firstfloor3[i].y,"z":firstblockz+(firstfloor3[i].x)})
            } else {
                firstmoves = []
                return
            }
        }



    } else if (rotation == "north") {
        for (let i = 0; i < firstfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+(-firstfloor3[i].z),firstblocky+firstfloor3[i].y,firstblockz+(-firstfloor3[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(-firstfloor3[i].z),"y":firstblocky+firstfloor3[i].y,"z":firstblockz+(-firstfloor3[i].x)})
            } else {
                firstmoves = []
                return
            }
        }
    }
}

var GL11 = Java.type("org.lwjgl.opengl.GL11"); //using var so it goes to global scope
var GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");


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
    if (firstmoves.length > 0) {
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
        Tessellator.pos(firstmoves[0].x+0.5,firstmoves[0].y+0.1,firstmoves[0].z+0.5);
        for (let i = 1; i < firstmoves.length; i++) {
            Tessellator.pos(firstmoves[i-1].x+0.5,firstmoves[i-1].y+0.1,firstmoves[i-1].z+0.5);
            Tessellator.pos(firstmoves[i].x+0.5,firstmoves[i].y+0.1,firstmoves[i].z+0.5);
        }
        Tessellator.draw();
        GlStateManager.func_179121_F();
        GL11.glEnable(GL11.GL_TEXTURE_2D);
        GL11.glDisable(GL11.GL_BLEND);
    }
})