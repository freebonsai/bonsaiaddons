const MagmaCube = Java.type("net.minecraft.entity.monster.EntityMagmaCube")
register("command", () => {
    entities = World.getAllEntitiesOfType(MagmaCube)
    for (let i = 0; i < entities.length; i++) {
        console.log(entities[i])
    }
}).setName("getentities")