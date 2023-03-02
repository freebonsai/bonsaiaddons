import { settings } from "../commands/gui"
register("renderEntity", (entity,pos,ticks,event) => {
    if (settings.Render[0] && entity.getName() == "Falling Block") {
        entity.getEntity().func_70106_y()
    }
})