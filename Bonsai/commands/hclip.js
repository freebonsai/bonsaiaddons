
register("command", (d,o) => {
    ya = Player.getYaw()
    px = Player.getX()
    py = Player.getY()
    pz = Player.getZ()
    newx = -Math.sin(toRadians(ya))*d
    newz = Math.cos(toRadians(ya))*d
    o = o*1
    if (o) {
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px+newx,py+o,pz+newz)
    } else {
        Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px+newx,py,pz+newz)
    }
}).setName("hclipbo")