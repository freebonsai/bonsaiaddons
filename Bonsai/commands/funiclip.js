import Config from "../Config"
import toRadians from "../utils/toradians"
register("command", (d) => {
    new Thread(() => {
      for (let i=0;i<d;i++) {
        px = Player.getX()
        py = Player.getY()
        pz = Player.getZ()
        ya = Player.getYaw()
        newx = -Math.sin(toRadians(ya))*d
        newz = Math.cos(toRadians(ya))*d
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px+newx/d,py,pz+newz/d)
        Thread.sleep(Config.funiinfdelay)
      }
    }).start()
}).setName("funiclip")