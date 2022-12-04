import Config from "../Config"
import { thirdfloor1, thirdfloor2, thirdfloor3, thirdfloor4 } from "../utils/icefillconfigurations"


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
    //console.log("worldload")
})

register("command", () => {
    stopped = !stopped
    console.log(stopped)
    thirdmoves = []
}).setName("stopicefill")

register("step", () => {
    if (!hasicefill) {
        if (Config.autoIceFill) {
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
}).setFps(5)

function checkRotation() {
    px = Math.floor(Player.getX())
    py = Math.floor(Player.getY())
    pz = Math.floor(Player.getZ())
    BlockBlock = new BlockPos(Math.floor(px)+8,Math.floor(py),Math.floor(pz))
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "east"
        console.log("east")
        return
    }
    BlockBlock = new BlockPos(Math.floor(px)-8,Math.floor(py),Math.floor(pz))
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "west"
        console.log("west")
        return
    }
    BlockBlock = new BlockPos(Math.floor(px),Math.floor(py),Math.floor(pz)+8)
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "south"
        console.log("south")
        return
    }
    BlockBlock = new BlockPos(Math.floor(px),Math.floor(py),Math.floor(pz)-8)
    b = World.getBlockStateAt(BlockBlock)
    if (b.toString().includes("minecraft:stone_brick_stairs")) {
        rotation = "north"
        console.log("north")
        return
    }
}

function scanthird() {
    if (thirdmoves.length < 1) {
        checkthird1()
        console.log("checked third 1")
    }
    if (thirdmoves.length < 1) {
        checkthird2()
        console.log("checked third 2")
    }
    if (thirdmoves.length < 1) {
        checkthird3()
        console.log("checked third 3")
    }
    if (thirdmoves.length < 1) {
        checkthird4()
        console.log("checked third 4")
    }
}

gonext = false
stopped = false
function movethird() {
    new Thread(() => {
        for (let i = 0; i < thirdmoves.length; i++) {
            if (!stopped) {
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
                Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(thirdmoves[i].x+0.5,thirdmoves[i].y,thirdmoves[i].z+0.5)
                gonext = false
                //Thread.sleep(250)
            } else {
                return
            }
        }
    }).start()
}


function checkthird1() {
    if (rotation == "east") {
        for (let i = 0; i < thirdfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor1[i].x,firstblocky+thirdfloor1[i].y,firstblockz+thirdfloor1[i].z)
            bstate = World.getBlockStateAt(testblock)
            //console.log(bstate, testblock)
            if (bstate == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+thirdfloor1[i].x,"y":firstblocky+thirdfloor1[i].y,"z":firstblockz+thirdfloor1[i].z})
            } else {
                thirdmoves = []
                console.log("not first 1")
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < thirdfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor1[i].x * (-1),firstblocky+thirdfloor1[i].y,firstblockz+thirdfloor1[i].z * (-1))
            bstate = World.getBlockStateAt(testblock)
            if (bstate == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor1[i].x * (-1)),"y":firstblocky+thirdfloor1[i].y,"z":firstblockz+(thirdfloor1[i].z * (-1))})
            } else {
                thirdmoves = []
                console.log("not first 1")
                return
            }
        }
    } else if (rotation == "south") { // SHOULD WORK
        for (let i = 0; i < thirdfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+(thirdfloor1[i].z * (-1)),firstblocky+thirdfloor1[i].y,firstblockz+(thirdfloor1[i].x))
            bstate = World.getBlockStateAt(testblock)
            //console.log(bstate, testblock)
            if (bstate == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor1[i].z * (-1)),"y":firstblocky+thirdfloor1[i].y,"z":firstblockz+(thirdfloor1[i].x)})
            } else {
                thirdmoves = []
                console.log("not first 1")
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < thirdfloor1.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor1[i].z,firstblocky+thirdfloor1[i].y,firstblockz+(thirdfloor1[i].x * (-1)))
            bstate = World.getBlockStateAt(testblock)
            if (bstate == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor1[i].z),"y":firstblocky+thirdfloor1[i].y,"z":firstblockz+(thirdfloor1[i].x * (-1))})
            } else {
                thirdmoves = []
                console.log("not first 1")
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
                console.log("not first 2")
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < thirdfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+(thirdfloor2[i].x * (-1)),firstblocky+thirdfloor2[i].y,firstblockz+(thirdfloor2[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            console.log(bstate2, testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor2[i].x * (-1)),"y":firstblocky+thirdfloor2[i].y,"z":firstblockz+thirdfloor2[i].z})
            } else {
                thirdmoves = []
                console.log("not first 2")
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < thirdfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+(thirdfloor2[i].z * (-1)),firstblocky+thirdfloor2[i].y,firstblockz+(thirdfloor2[i].x * (-1)))
            bstate2 = World.getBlockStateAt(testblock)
            console.log(bstate2, testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor2[i].z * (-1)),"y":firstblocky+thirdfloor2[i].y,"z":firstblockz+(thirdfloor2[i].x)})
            } else {
                thirdmoves = []
                console.log("not first 2")
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < thirdfloor2.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor2[i].z,firstblocky+thirdfloor2[i].y,firstblockz+(thirdfloor2[i].x * (-1)))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor2[i].z),"y":firstblocky+thirdfloor2[i].y,"z":firstblockz+(thirdfloor1[i].x * (-1))})
            } else {
                thirdmoves = []
                console.log("not first 2")
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
                console.log("not first 2")
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < thirdfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+(thirdfloor3[i].x * (-1)),firstblocky+thirdfloor3[i].y,firstblockz+(thirdfloor3[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            console.log(bstate2, testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor3[i].x * (-1)),"y":firstblocky+thirdfloor3[i].y,"z":firstblockz+thirdfloor3[i].z})
            } else {
                thirdmoves = []
                console.log("not first 2")
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < thirdfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+(thirdfloor3[i].z * (-1)),firstblocky+thirdfloor3[i].y,firstblockz+(thirdfloor3[i].x * (-1)))
            bstate2 = World.getBlockStateAt(testblock)
            console.log(bstate2, testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor3[i].z * (-1)),"y":firstblocky+thirdfloor3[i].y,"z":firstblockz+(thirdfloor3[i].x)})
            } else {
                thirdmoves = []
                console.log("not first 2")
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < thirdfloor3.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor3[i].z,firstblocky+thirdfloor3[i].y,firstblockz+(thirdfloor3[i].x * (-1)))
            bstate2 = World.getBlockStateAt(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor3[i].z),"y":firstblocky+thirdfloor3[i].y,"z":firstblockz+(thirdfloor1[i].x * (-1))})
            } else {
                thirdmoves = []
                console.log("not first 2")
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
                console.log("not third 4")
                return
            }
        }
    } else if (rotation == "west") {
        for (let i = 0; i < thirdfloor4.length; i++) {
            let testblock = new BlockPos(firstblockx+(thirdfloor4[i].x * (-1)),firstblocky+thirdfloor4[i].y,firstblockz+(thirdfloor4[i].z))
            bstate2 = World.getBlockStateAt(testblock)
            console.log(bstate2, testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor4[i].x * (-1)),"y":firstblocky+thirdfloor4[i].y,"z":firstblockz+thirdfloor4[i].z})
            } else {
                thirdmoves = []
                console.log("not third 4")
                return
            }
        }
    } else if (rotation == "south") {
        for (let i = 0; i < thirdfloor4.length; i++) {
            let testblock = new BlockPos(firstblockx+(thirdfloor4[i].z * (-1)),firstblocky+thirdfloor4[i].y,firstblockz+(thirdfloor4[i].x * (-1)))
            bstate2 = World.getBlockStateAt(testblock)
            console.log(bstate2, testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor4[i].z * (-1)),"y":firstblocky+thirdfloor4[i].y,"z":firstblockz+(thirdfloor4[i].x)})
            } else {
                thirdmoves = []
                console.log("not third 4")
                return
            }
        }
    } else if (rotation == "north") {
        for (let i = 0; i < thirdfloor4.length; i++) {
            let testblock = new BlockPos(firstblockx+thirdfloor4[i].z,firstblocky+thirdfloor4[i].y,firstblockz+(-thirdfloor4[i].x))
            bstate2 = World.getBlockStateAt(testblock)
            console.log(testblock)
            if (bstate2 == "minecraft:air") {
                thirdmoves.push({"x":firstblockx+(thirdfloor4[i].z),"y":firstblocky+thirdfloor4[i].y,"z":firstblockz+(-thirdfloor4[i].x)})
            } else {
                thirdmoves = []
                console.log("not third 4")
                return
            }
        }
    }
}