import Config from "../Config"
import { firstfloor1, firstfloor2, firstfloor3 } from "../utils/icefillconfigurations"

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
    //console.log("worldload")
})

register("step", () => {
    if (!hasicefill) {
        if (Config.autoIceFill) {
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
}).setFps(5)

function checkRotation() {
    px = Math.floor(Player.getX())
    py = Math.floor(Player.getY())
    pz = Math.floor(Player.getZ())
    BlockBlock = new BlockPos(Math.floor(px)+4,Math.floor(py),Math.floor(pz))
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "east"
        console.log("east")
        return
    }
    BlockBlock = new BlockPos(Math.floor(px)-4,Math.floor(py),Math.floor(pz))
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "west"
        console.log("west")
        return
    }
    BlockBlock = new BlockPos(Math.floor(px),Math.floor(py),Math.floor(pz)+4)
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "south"
        console.log("south")
        return
    }
    BlockBlock = new BlockPos(Math.floor(px),Math.floor(py),Math.floor(pz)-4)
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "north"
        console.log("north")
        return
    }
}

function scanfirst() {
    if (firstmoves.length < 1) {
        checkfirst1()
    }
    if (firstmoves.length < 1) {
        checkfirst2()
        console.log("checkfirst2")
    }
    if (firstmoves.length < 1) {
        checkfirst3()
        console.log("checkfirst3")
    }
}

gonext = false
function movefirst() {
    new Thread(() => {
        for (let i = 0; i < firstmoves.length; i++) {
            while (!gonext) {
                px = Math.floor(Player.getX())
                py = Math.floor(Player.getY())
                pz = Math.floor(Player.getZ())
                let BlockBlock = new BlockPos(px,py-1,pz)
                b = World.getBlockStateAt(BlockBlock)
                if (b == "minecraft:packed_ice") {
                    gonext = true
                    //console.log("packed")
                } else {
                    Thread.sleep(25)
                    //console.log("not packed")
                }
            }
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(firstmoves[i].x+0.5,firstmoves[i].y,firstmoves[i].z+0.5)
            gonext = false
            //Thread.sleep(300)
        }
        x = Player.getX()
        y = Player.getY()
        z = Player.getZ()
        Thread.sleep(300)
        if (rotation == "east") {
            Thread.sleep(100)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x+0.5,y+0.5,z)
            Thread.sleep(100)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x+1,y+1,z)
            Thread.sleep(150)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x+2,y+1,z)
        } else if (rotation == "west") {
            Thread.sleep(100)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x-0.5,y+0.5,z)
            Thread.sleep(100)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x-1,y+1,z)
            Thread.sleep(150)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x-2,y+1,z)
        } else if (rotation == "south") {
            Thread.sleep(100)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y+0.5,z+0.5)
            Thread.sleep(100)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y+1,z+1)
            Thread.sleep(150)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y+1,z+2)
        } else if (rotation == "north") {
            Thread.sleep(100)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y+0.5,z-0.5)
            Thread.sleep(100)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y+1,z-1)
            Thread.sleep(150)
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(x,y+1,z-2)
        }
        
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
                console.log("not first 1")
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
                console.log("not first 1")
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < firstfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+firstfloor1[i].z,firstblocky+firstfloor1[i].y,firstblockz+firstfloor1[i].x)
            bstate = World.getBlockStateAt(testblock)
            //console.log(bstate)
            if (bstate == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(firstfloor1[i].z),"y":firstblocky+firstfloor1[i].y,"z":firstblockz+(firstfloor1[i].x)})
            } else {
                firstmoves = []
                console.log("not first 1")
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
                console.log("not first 1")
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
            console.log(bstate2, testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(firstfloor2[i].x),"y":firstblocky+firstfloor2[i].y,"z":firstblockz+(firstfloor2[i].z)})
            } else {
                firstmoves = []
                console.log("not first 2")
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < firstfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+(-firstfloor2[i].x),firstblocky+firstfloor2[i].y,firstblockz+(-firstfloor2[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            //console.log(bstate2, testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(-firstfloor2[i].x),"y":firstblocky+firstfloor2[i].y,"z":firstblockz+(-firstfloor2[i].z)})
            } else {
                firstmoves = []
                console.log("not first 2")
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < firstfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+(firstfloor2[i].z),firstblocky+firstfloor2[i].y,firstblockz+(firstfloor2[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            //console.log(testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(firstfloor2[i].z),"y":firstblocky+firstfloor2[i].y,"z":firstblockz+(firstfloor2[i].x)})
            } else {
                firstmoves = []
                console.log("not first 2")
                console.log(bstate2,testblock)
                return
            }
        }
    } else if (rotation == "north") {
        //console.log(-firstfloor2[0].x)
        for (let i = 0; i < firstfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+(firstfloor2[i].z),firstblocky+firstfloor2[i].y,firstblockz+(-firstfloor2[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            console.log(testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(firstfloor2[i].z),"y":firstblocky+firstfloor2[i].y,"z":firstblockz+(-firstfloor2[i].x)})
                //console.log((-firstfloor2[i].z),firstfloor2[i].y,(-firstfloor2[i].x), "i" + i)
            } else {
                firstmoves = []
                console.log("not first 2")
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
            //console.log(bstate2, testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(firstfloor3[i].x),"y":firstblocky+firstfloor3[i].y,"z":firstblockz+(-firstfloor3[i].z)})
            } else {
                firstmoves = []
                console.log("not first 2")
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < firstfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+(-firstfloor3[i].x),firstblocky+firstfloor3[i].y,firstblockz+(firstfloor3[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            //console.log(bstate2, testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(-firstfloor3[i].x),"y":firstblocky+firstfloor3[i].y,"z":firstblockz+firstfloor3[i].z})
            } else {
                firstmoves = []
                console.log("not first 2")
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < firstfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+(firstfloor3[i].z),firstblocky+firstfloor3[i].y,firstblockz+(firstfloor3[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            //console.log(testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(firstfloor3[i].z),"y":firstblocky+firstfloor3[i].y,"z":firstblockz+(firstfloor3[i].x)})
            } else {
                firstmoves = []
                console.log("not first 2")
                console.log(bstate2,testblock)
                return
            }
        }



    } else if (rotation == "north") {
        //console.log(-firstfloor3[0].x)
        for (let i = 0; i < firstfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+(-firstfloor3[i].z),firstblocky+firstfloor3[i].y,firstblockz+(-firstfloor3[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            //console.log(testblock)
            if (bstate2 == "minecraft:air") {
                firstmoves.push({"x":firstblockx+(-firstfloor3[i].z),"y":firstblocky+firstfloor3[i].y,"z":firstblockz+(-firstfloor3[i].x)})
                //console.log((-firstfloor3[i].z),firstfloor3[i].y,(-firstfloor2[i].x), "i" + i)
            } else {
                firstmoves = []
                console.log("not first 2")
                return
            }
        }
    }
}