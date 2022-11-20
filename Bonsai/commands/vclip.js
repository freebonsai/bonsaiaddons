import { prefix } from "../utils/prefix"
register("command", (y) => {
  // GETTING VARIABLES
  ya = Player.getYaw()
  pi = Player.getPitch()
  px = Player.getX()
  py = Player.getY()
  pz = Player.getZ()
  y = y*1

  // THE CLIPPING FUNCTION
  if (y) {
    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px,py+y,pz)
  } else {
    ChatLib.chat(prefix + " &bNot enough arguments! Use /vclipbo (amount)")
  }
}).setName("vclipbo")