import Config from "../Config"
import { secondfloor1,secondfloor2,secondfloor3,secondfloor4 } from "../utils/icefillconfigurations"


hasicefill = false
hasscanned = false
let firstblockx
let firstblocky
let firstblockz
let rotation
secondmoves = []

register("worldLoad", () => {
    hasicefill = false
    hasscanned = false
    //console.log("worldload")
})

register("step", () => {
    if (!hasicefill) {
        if (Config.autoIceFill) {
            //console.log(hasicefill,hasscanned)
            px = Math.floor(Player.getX())
            py = Math.floor(Player.getY())
            pz = Math.floor(Player.getZ())
            if (py == 71) {
                let BlockBlock = new BlockPos(px,py-1,pz)
                b = World.getBlockStateAt(BlockBlock)
                if (b == "minecraft:ice") {
                    hasicefill = true
                    //console.log(hasicefill)
                    checkRotation()
                    firstblockx = px; firstblocky = py; firstblockz = pz;
                    scansecond()
                    movesecond()
                }
            }
        }
    }
}).setFps(5)

function checkRotation() {
    px = Math.floor(Player.getX())
    py = Math.floor(Player.getY())
    pz = Math.floor(Player.getZ())
    BlockBlock = new BlockPos(Math.floor(px)+6,Math.floor(py),Math.floor(pz))
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "east"
        console.log("east")
        return
    }
    BlockBlock = new BlockPos(Math.floor(px)-6,Math.floor(py),Math.floor(pz))
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "west"
        console.log("west")
        return
    }
    BlockBlock = new BlockPos(Math.floor(px),Math.floor(py),Math.floor(pz)+6)
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "south"
        console.log("south")
        return
    }
    BlockBlock = new BlockPos(Math.floor(px),Math.floor(py),Math.floor(pz)-6)
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "north"
        console.log("north")
        return
    }
}

function scansecond() {
    if (secondmoves.length < 1) {
        checksecond1()
        console.log("checked second 1")
    }
    if (secondmoves.length < 1) {
        checksecond2()
        console.log("checked second 2")
    }
    if (secondmoves.length < 1) {
        checksecond3()
        console.log("checked second 3")
    }
    if (secondmoves.length < 1) {
        checksecond4()
        console.log("checked second 4")
    }
}

gonext = false
function movesecond() {
    new Thread(() => {
        for (let i = 0; i < secondmoves.length; i++) {
            // while (!gonext) {
            //     px = Math.floor(Player.getX())
            //     py = Math.floor(Player.getY())
            //     pz = Math.floor(Player.getZ())
            //     let BlockBlock = new BlockPos(px,py-1,pz)
            //     b = World.getBlockStateAt(BlockBlock)
            //     if (b == "minecraft:packed_ice") {
            //         gonext = true
            //         //console.log("packed")
            //     } else {
            //         Thread.sleep(25)
            //         //console.log("not packed")
            //     }
            // }
            Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(secondmoves[i].x+0.5,secondmoves[i].y,secondmoves[i].z+0.5)
            gonext = false
            Thread.sleep(250)
        }
        x = Player.getX()
        y = Player.getY()
        z = Player.getZ()
        Thread.sleep(200)
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
    }).start()
}


function checksecond1() {
    if (rotation == "east") {
        for (let i = 0; i < secondfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+secondfloor1[i].x,firstblocky+secondfloor1[i].y,firstblockz+secondfloor1[i].z)
            bstate = World.getBlockStateAt(testblock)
            //console.log(bstate, testblock)
            if (bstate == "minecraft:air") {
                secondmoves.push({"x":firstblockx+secondfloor1[i].x,"y":firstblocky+secondfloor1[i].y,"z":firstblockz+secondfloor1[i].z})
            } else {
                secondmoves = []
                console.log("not second 1")
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < secondfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+secondfloor1[i].x * (-1),firstblocky+secondfloor1[i].y,firstblockz+secondfloor1[i].z * (-1))
            bstate = World.getBlockStateAt(testblock)
            if (bstate == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor1[i].x * (-1)),"y":firstblocky+secondfloor1[i].y,"z":firstblockz+(secondfloor1[i].z * (-1))})
            } else {
                secondmoves = []
                console.log("not second 1")
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < secondfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+secondfloor1[i].z,firstblocky+secondfloor1[i].y,firstblockz+secondfloor1[i].x)
            bstate = World.getBlockStateAt(testblock)
            //console.log(bstate)
            if (bstate == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor1[i].z),"y":firstblocky+secondfloor1[i].y,"z":firstblockz+(secondfloor1[i].x)})
            } else {
                secondmoves = []
                console.log("not second 1")
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < secondfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+secondfloor1[i].z,firstblocky+secondfloor1[i].y,firstblockz+(secondfloor1[i].x * (-1)))
            bstate = World.getBlockStateAt(testblock)
            if (bstate == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor1[i].z),"y":firstblocky+secondfloor1[i].y,"z":firstblockz+(secondfloor1[i].x * (-1))})
            } else {
                secondmoves = []
                console.log("not second 1")
                return
            }
        }
    }
}

function checksecond2() {
    if (rotation == "east") {
        for (let i = 0; i < secondfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+secondfloor2[i].x,firstblocky+secondfloor2[i].y,firstblockz+secondfloor2[i].z)
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor2[i].x),"y":firstblocky+secondfloor2[i].y,"z":firstblockz+secondfloor2[i].z})
            } else {
                secondmoves = []
                console.log("not second 2")
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < secondfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+(secondfloor2[i].x * (-1)),firstblocky+secondfloor2[i].y,firstblockz+(secondfloor2[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            //console.log(bstate2, testblock)
            if (bstate2 == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor2[i].x * (-1)),"y":firstblocky+secondfloor2[i].y,"z":firstblockz+secondfloor2[i].z})
            } else {
                secondmoves = []
                console.log("not second 2")
                return
            }
        }


    } else if (rotation == "south") { // SHOULD WORK
        for (let i = 0; i < secondfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+(secondfloor2[i].z),firstblocky+secondfloor2[i].y,firstblockz+(secondfloor2[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor2[i].z),"y":firstblocky+secondfloor2[i].y,"z":firstblockz+(secondfloor2[i].x)})
            } else {
                secondmoves = []
                console.log("not second 2")
                return
            }
        }


    } else if (rotation == "north") {
        for (let i = 0; i < secondfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+secondfloor2[i].z,firstblocky+secondfloor2[i].y,firstblockz+(secondfloor2[i].x * (-1)))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor2[i].z),"y":firstblocky+secondfloor2[i].y,"z":firstblockz+(secondfloor2[i].x * (-1))})
            } else {
                secondmoves = []
                console.log("not second 2")
                return
            }
        }
    }
}

function checksecond3() {
    if (rotation == "east") {
        for (let i = 0; i < secondfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+secondfloor3[i].x,firstblocky+secondfloor3[i].y,firstblockz+secondfloor3[i].z)
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor3[i].x),"y":firstblocky+secondfloor3[i].y,"z":firstblockz+secondfloor3[i].z})
            } else {
                secondmoves = []
                console.log("not second 3")
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < secondfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+(secondfloor3[i].x * (-1)),firstblocky+secondfloor3[i].y,firstblockz+(secondfloor3[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            //console.log(bstate2, testblock)
            if (bstate2 == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor3[i].x * (-1)),"y":firstblocky+secondfloor3[i].y,"z":firstblockz+secondfloor3[i].z})
            } else {
                secondmoves = []
                console.log("not second 3")
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < secondfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+secondfloor3[i].z * (-1),firstblocky+secondfloor3[i].y,firstblockz+secondfloor3[i].x)
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor3[i].z * (-1)),"y":firstblocky+secondfloor3[i].y,"z":firstblockz+(secondfloor3[i].x)})
            } else {
                secondmoves = []
                console.log("not second 3")
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < secondfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+secondfloor3[i].z,firstblocky+secondfloor3[i].y,firstblockz+(secondfloor3[i].x * (-1)))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor3[i].z),"y":firstblocky+secondfloor3[i].y,"z":firstblockz+(secondfloor1[i].x * (-1))})
            } else {
                secondmoves = []
                console.log("not second 3")
                return
            }
        }
    }
}

function checksecond4() {
    if (rotation == "east") {
        for (let i = 0; i < secondfloor4.length; i++) {
            let testblock = new BlockPos(firstblockx+secondfloor4[i].x,firstblocky+secondfloor4[i].y,firstblockz+secondfloor4[i].z)
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor4[i].x),"y":firstblocky+secondfloor4[i].y,"z":firstblockz+secondfloor4[i].z})
            } else {
                secondmoves = []
                console.log("not second 4")
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < secondfloor4.length; i++) {
            let testblock = new BlockPos(firstblockx+(secondfloor4[i].x * (-1)),firstblocky+secondfloor4[i].y,firstblockz+(secondfloor4[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            //console.log(bstate2, testblock)
            if (bstate2 == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor4[i].x * (-1)),"y":firstblocky+secondfloor4[i].y,"z":firstblockz+secondfloor4[i].z})
            } else {
                secondmoves = []
                console.log("not second 4")
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < secondfloor4.length; i++) {
            let testblock = new BlockPos(firstblockx+secondfloor4[i].z * (-1),firstblocky+secondfloor4[i].y,firstblockz+secondfloor4[i].x)
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor4[i].z * (-1)),"y":firstblocky+secondfloor4[i].y,"z":firstblockz+(secondfloor4[i].x)})
            } else {
                secondmoves = []
                console.log("not second 4")
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < secondfloor4.length; i++) {
            let testblock = new BlockPos(firstblockx+secondfloor4[i].z,firstblocky+secondfloor4[i].y,firstblockz+(secondfloor4[i].x * (-1)))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                secondmoves.push({"x":firstblockx+(secondfloor4[i].z),"y":firstblocky+secondfloor4[i].y,"z":firstblockz+(secondfloor4[i].x * (-1))})
            } else {
                secondmoves = []
                console.log("not second 4")
                return
            }
        }
    }
}