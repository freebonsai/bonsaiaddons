// positions = []
// chests = []

// register("renderTileEntity", (ent, pos, ticks, event) => {
//     try {
//         if (!positions.includes(ent.toString())) {
//             positions.push(ent.toString())
//             if (ent.blockType.name == "Chest") {
//                 chests.push({x:ent.x,y:ent.y,z:ent.z})
//             }
//         }
//     } catch (error) {}
//    // console.log(ent.toString())
// })

// register("command", () => {
//     for (let i=0;i<chests.length;i++) console.log(chests[i].x,chests[i].y,chests[i].z)
// }).setName("listchests")

// register("worldLoad", () => {
//     positions = []
//     chests = []
// })