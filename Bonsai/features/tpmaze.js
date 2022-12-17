positions = []
chests = []
let rotation
register("renderTileEntity", (ent, pos, ticks, event) => {
    try {
        if (!positions.includes(ent.toString())) {
            positions.push(ent.toString())
            if (ent.blockType.name == "Chest") {
                // chests.push({x:ent.x,y:ent.y,z:ent.z})
                BlockBlock = new BlockPos(ent.x,ent.y-1,ent.z)
                b = World.getBlockStateAt(BlockBlock)
                if (b == "minecraft:double_stone_slab[seamless=false,variant=stone]") {
                    console.log("tp maze")
                    BlockBlock = new BlockPos(ent.x,ent.y,ent.z+1)
                    b = World.getBlockStateAt(BlockBlock)
                    if (b.toString().startsWith("minecraft:iron_bars")) {
                        console.log("south")
                        rotation = "south"
                        return
                    }

                    BlockBlock = new BlockPos(ent.x,ent.y,ent.z-1)
                    b = World.getBlockStateAt(BlockBlock)
                    if (b.toString().startsWith("minecraft:iron_bars")) {
                        console.log("north")
                        rotation = "north"
                        return
                    }

                    BlockBlock = new BlockPos(ent.x+1,ent.y,ent.z)
                    b = World.getBlockStateAt(BlockBlock)
                    if (b.toString().startsWith("minecraft:iron_bars")) {
                        console.log("east")
                        rotation = "east"
                        return
                    }

                    BlockBlock = new BlockPos(ent.x-1,ent.y,ent.z)
                    b = World.getBlockStateAt(BlockBlock)
                    if (b.toString().startsWith("minecraft:iron_bars")) {
                        console.log("west")
                        rotation = "west"
                        return
                    }
                    
                }
            }
        }
    } catch (error) {}
})

register("command", () => {
    for (let i=0;i<chests.length;i++) console.log(chests[i].x,chests[i].y,chests[i].z)
}).setName("listchests")

register("worldLoad", () => {
    positions = []
    chests = []
})