import { settings } from "../commands/gui"
import Dungeon from "../../BloomCore/dungeons/Dungeon"

register("renderTileEntity", (entity, pos, ticks, event) => {
    if (Dungeon.inDungeon) { 
        if (settings.Render[3]) { 
            try {
                if (entity.blockType.name.toString() == "Sign") { 
                    cancel(event) 
                }
            } catch (e) {}
        }
    }
})