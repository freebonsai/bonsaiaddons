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
      for (let i=0;i<(d*4);i++) {
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + newx/d/4, py + newy/d/4, pz + newz/d/4)
        Thread.sleep(Config.infdelay/4)
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