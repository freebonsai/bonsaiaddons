import { prefix } from "../utils/prefix"
register("command", (x,y,z,d) => {
    // GETTING VARIABLES
    px = Player.getX()
    py = Player.getY()
    pz = Player.getZ()
    // THE CLIPPING FUNCTION
    if (x && y && z && d) {
      x*=1
      y*=1
      z*=1
      d*=1

      new Thread(() => {
        Thread.sleep(d)

        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px+x,py+y,pz+z)
      }).start()
    } else if (x && y && z) {
      x*=1
      y*=1
      z*=1
      Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px+x,py+y,pz+z)
    } else {
      ChatLib.chat(prefix + " &bNot enough arguments! &aUse /tpclip x y z")
    }
}).setName("tpclip")