import Config from "../Config"
register("renderEntity", (x) => {
    if (Config.fallingBlock) {
        if (x.getName() == "Falling Block") {
            x.getEntity().func_70106_y()
        }
    }
})