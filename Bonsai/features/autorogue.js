import { settings } from "../commands/gui"

const C08PacketPlayerBlockPlacement = Java.type('net.minecraft.network.play.client.C08PacketPlayerBlockPlacement');
const C09PacketHeldItemChange = Java.type('net.minecraft.network.play.client.C09PacketHeldItemChange')

lastrogue = new Date().getTime()-30001
register("tick", () => {
    if (new Date().getTime() - lastrogue < 30000) return
    if (!settings.General[5]) return
    for (let i = 0; i < 9; i++) {
        if (ChatLib.removeFormatting(Player.getInventory().getStackInSlot(i)?.getName()).includes("Rogue Sword")) {
            lastrogue = new Date().getTime()
            let previousItem = Player.getHeldItemIndex()
            Client.getMinecraft().func_147114_u().func_147298_b().func_179290_a(new C09PacketHeldItemChange(i))
            Client.getMinecraft().func_147114_u().func_147298_b().func_179290_a(new C08PacketPlayerBlockPlacement(Client.getMinecraft().field_71439_g.func_70694_bm()));
            Client.getMinecraft().func_147114_u().func_147298_b().func_179290_a(new C09PacketHeldItemChange(previousItem))
        }
    }
})