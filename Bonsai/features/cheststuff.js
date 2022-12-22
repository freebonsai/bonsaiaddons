
// // X = field_70165_t
// // Y = field_70163_u
// // Z = field_70161_v 

// const C02PacketUseEntity = Java.type("net.minecraft.network.play.client.C02PacketUseEntity")
// const BP = Java.type("net.minecraft.util.BlockPos")
// const Villager = Java.type("net.minecraft.entity.Entity.Villager")
// register("command", () => {
//     //Client.getMinecraft().field_71442_b.func_78768_b(Client.getMinecraft().field_71439_g,)
//     entities = Client.getMinecraft().field_71441_e.func_72910_y()
//     for (let i=0; i<entities.length; i++) {
//         if (entities[i].toString().startsWith("EntityArmorStand")) {
//             console.log(entities[i].field_70165_t,entities[i].field_70163_u,entities[i].field_70161_v)
//             // if (entities[i].func_95999_t() == "§e§lCLICK") {
//             //     Client.getMinecraft().field_71442_b.func_78768_b(Client.getMinecraft().field_71439_g,entities[i])
//             //     return
//             // }
            
            
//             // if (entities[i].field_70165_t == 3.375 && entities[i].field_70163_u == 100.125 && entities[i].field_70161_v == 10.84375) {
//             //     Client.getMinecraft().field_71442_b.func_78768_b(Client.getMinecraft().field_71439_g,entities[i])
//             //     // console.log(entities[i])
//             //     // return
//             // }
//         }
//     }
//     // console.log(entities)
// }).setName("clickentity")