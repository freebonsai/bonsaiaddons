import { settings } from "../commands/gui"
register("renderEntity", (entity,pos,ticks,event) => {
    if (settings.Render[0] && entity.getName() == "Falling Block") {
        cancel(event)
    }
})