import Config from "../Config"
import toRadians from "../utils/toradians"

going = false
dist = 0
const rate = 30
register("command", (d) => {
  going = true
  dist = d*rate
}).setName("funiclip")

counter = 0
register("step", () => {
  if (!going) return
  px = Player.getX()
  py = Player.getY()
  pz = Player.getZ()
  ya = Player.getYaw()
  newx = -Math.sin(toRadians(ya))/rate
  newz = Math.cos(toRadians(ya))/rate
  Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px+newx,py,pz+newz)
  counter++
  if (counter >= dist) {
    going = false
    dist = 0
    counter = 0
  }
}).setFps(1000/Config.funiinfdelay*rate)