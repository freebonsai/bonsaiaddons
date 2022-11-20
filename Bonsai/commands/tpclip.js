import { prefix } from "../utils/prefix"
register("command", (x,y,z) => {
    // GETTING VARIABLES
    px = Player.getX()
    py = Player.getY()
    pz = Player.getZ()
    x*=1
    y*=1
    z*=1
    // THE CLIPPING FUNCTION
    if (Number.isInteger(x) && Number.isInteger(y) && Number.isInteger(z)) {
      Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px+x,py+y,pz+z)
    } else {
      ChatLib.chat(prefix + " &bNot enough arguments or isn't an integer! &aUse /tpclip x y z")
    }
}).setName("tpclip")