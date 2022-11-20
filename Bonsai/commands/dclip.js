import Config from "../Config"
import toRadians from "../utils/toradians"

register("command", (d) => {
  // GETTING VARIABLES
  ya = Player.getYaw()
  pi = Player.getPitch()
  px = Player.getX()
  py = Player.getY()
  pz = Player.getZ()
  newx = -Math.sin(toRadians(ya)) * Math.cos(toRadians(pi)) * d
  newy = -Math.sin(toRadians(pi)) * d
  newz = Math.cos(toRadians(ya)) * Math.cos(toRadians(pi)) * d

  // THE CLIPPING FUNCTION
  if (Config.dclipinf) {
    new Thread(() => {
      for (let i=0;i<d;i++) {
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + newx/d, py + newy/d, pz + newz/d)
        Thread.sleep(Config.infdelay)
        ya = Player.getYaw()
        pi = Player.getPitch()
        px = Player.getX()
        py = Player.getY()
        pz = Player.getZ()
        newx = -Math.sin(toRadians(ya)) * Math.cos(toRadians(pi)) * d
        newy = -Math.sin(toRadians(pi)) * d
        newz = Math.cos(toRadians(ya)) * Math.cos(toRadians(pi)) * d
      }
    }).start()
  } else {
    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + newx, py + newy, pz + newz)
  }
}).setName("dclipbo")