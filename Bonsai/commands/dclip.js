import toRadians from "../utils/toradians"
import { settings } from "../commands/gui"

dist = 0
going = false
register("command", (d) => {
  if (settings.Clip[0]) {
    going = true
    dist = d
  } else {
    px = Player.getX()
    py = Player.getY()
    pz = Player.getZ()
    ya = Player.getYaw()
    pi = Player.getPitch()
    newx = -Math.sin(toRadians(ya)) * Math.cos(toRadians(pi)) * d
    newy = -Math.sin(toRadians(pi)) * d
    newz = Math.cos(toRadians(ya)) * Math.cos(toRadians(pi)) * d
    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + newx, py + newy, pz + newz)
  }
}).setName("dclipbo")

counter = 0
register("step", () => {
  if (!going) return
  px = Player.getX()
  py = Player.getY()
  pz = Player.getZ()
  ya = Player.getYaw()
  pi = Player.getPitch()
  newx = -Math.sin(toRadians(ya))
  newy = -Math.sin(toRadians(pi))
  newz = Math.cos(toRadians(ya))
  Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px+newx, py+newy, pz+newz)
  counter++
  if (counter >= dist) {
    going = false
    dist = 0
    counter = 0
  }
}).setFps(100)