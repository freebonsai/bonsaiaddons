import Config from "../Config"
import toRadians from "../utils/toradians"
register("command", (d,yaw,del) => {
  if (yaw && del) {
    new Thread(() => {
      Thread.sleep(del)
      for (let i=0;i<d*10;i++) {
        px = Player.getX()
        py = Player.getY()
        pz = Player.getZ()
        newx = -Math.sin(toRadians(yaw))*d
        newz = Math.cos(toRadians(yaw))*d
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px+newx/d/10,py,pz+newz/d/10)
        Thread.sleep(Config.funiinfdelay/10)
      }
    }).start()
  } else {
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
  }
}).setName("funiclip")