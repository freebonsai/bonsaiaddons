import { settings } from "../commands/gui"
register("renderEntity", (x) => {
    if (settings.Render[0]) {
        if (x.getName() == "Falling Block") {
            x.getEntity().func_70106_y()
        }
    }
})