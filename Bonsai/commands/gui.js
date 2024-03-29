import Config from "../Config"
import { data } from "../data/data"
import { prefix } from "../utils/prefix"
import PogObject from "../../PogData/index"
import { splitsStrings,dungeonStrings, generalStrings, renderStrings, clipStrings, cliplocations, dungeonsDescriptions, generalDescriptions, renderDescriptions, clipDescriptions, colours } from "../utils/guiStrings"

export const settings = new PogObject("bonsaidata", {
  "Dungeons": [false,false,false,false,false,false,false,false,false,false,false,false,false,0],
  "General": [false,false,false,false,false,false],
  "Render": [false,false,false,false],
  "Clip": [false,false,false,false,false,0],
  "Splits": [0,0,0,0,0,0,0,0,0,0]
}, "settings.json")

mainGui = new Gui()

if (settings.Dungeons[9] == undefined) settings.Dungeons[9] = 0

register("command", (...args) => {
  if (args[0] == "dev") {
    data.dev = !data.dev
    data.save()
    if (data.dev) {
      ChatLib.chat(`${prefix} &bToggled dev mode! It's now &aon`)
    } else {
      ChatLib.chat(`${prefix} &bToggled dev mode! It's now &coff`)
    }
  } else if (args[0] == "options") {
    Config.openGUI()
  } else if (args[0] == "help") {
    ChatLib.chat(`&a/bo help &bto send this message`)
    ChatLib.chat(`&a/bo &bto open the main gui`)
    ChatLib.chat(`&a/bo options &bto open the vigilance gui for sub-options`)
    ChatLib.chat(`&a/bo dev &bto turn on dev mode`)
  } else {
    mainGui.open()
  }
}).setTabCompletions("help","dev","options").setName("bo")

register("tick", () => {
  if (Config.presetgui.isOpen()) {
    Config.presetgui.close()
  }
})

guikey = new KeyBind("Main Gui", Keyboard.KEY_NONE, "Bonsai")
guikey.registerKeyPress(() => {
  mainGui.open()
})

reloadkey = new KeyBind("Reload CT", Keyboard.KEY_NONE, "Bonsai")
reloadkey.registerKeyPress(() => {
  ChatTriggers.reloadCT()
})

consolekey = new KeyBind("Open Console", Keyboard.KEY_NONE, "Bonsai")
consolekey.registerKeyPress(() => {
  ChatLib.command("ct console js", true)
})

const colors = new PogObject("bonsaidata", {
  "r":[170,45,0,20],
  "g":[0,45,0,20],
  "b":[0,45,0,20]
}, "colors.json")

const Font = Java.type("xyz.forkdev.fontlib.Font")
const font = new Font("Bonsai/utils/Pacifico-Regular.ttf", 150)
const font2 = new Font("Bonsai/utils/Minecraft.ttf", 21)

blue = [0,170,170]
green = [85,255,85]
red = [255,85,85]
purple = [170,0,170]
orange = [255,170,0]

splitsLoc = {"x":20,"y":30}
dLoc = {"x":180,"y":30}
gLoc = {"x":340,"y":30}
rLoc = {"x":500,"y":30}
clipLoc = {"x":660,"y":30}
colorLoc = {"x":820,"y":45}
buttonwidth = 100
buttonheight = 15
const ResourceLocation = Java.type("net.minecraft.util.ResourceLocation")
shouldremove = true
register("renderOverlay", () => {
  if (!mainGui.isOpen()) {
    if (shouldremove) {
      Client.getMinecraft().field_71460_t.func_181022_b() // clears shaders (blur)
      shouldremove = false
    }
    return
  }
  shouldremove = true
  topcolor = Renderer.color(colors.r[0],colors.g[0],colors.b[0],255)
  offcolor = Renderer.color(colors.r[1],colors.g[1],colors.b[1],255)
  font.drawStringWithShadow("Bonsai Addons", 35, 350, new java.awt.Color(colors.r[0]/255,colors.g[0]/255,colors.b[0]/255,1))
  Renderer.drawRect(topcolor, dLoc.x, dLoc.y-2, buttonwidth, buttonheight+2)
  font2.drawStringWithShadow(dungeonStrings[0], dLoc.x+(70-Renderer.getStringWidth(dungeonStrings[0]))/2+15,dLoc.y+3, new java.awt.Color(colors.r[3]/255,colors.g[3]/255,colors.b[3]/255,1))
  for (let i=1; i< dungeonStrings.length; i++) {
    Renderer.drawRect(offcolor, dLoc.x, dLoc.y+(i*buttonheight), buttonwidth, buttonheight)
  }
  for (let i=1; i< dungeonStrings.length; i++) {
    if (settings.Dungeons[i-1]) {
      // Renderer.drawString(`&2${dungeonStrings[i]}`,dLoc.x+(70-Renderer.getStringWidth(dungeonStrings[i]))/2+15,dLoc.y+3+(i*buttonheight),true)
      font2.drawStringWithShadow(dungeonStrings[i], dLoc.x+(70-Renderer.getStringWidth(dungeonStrings[i]))/2+15,dLoc.y+3+(i*buttonheight), new java.awt.Color(colors.r[2]/255,colors.g[2]/255,colors.b[2]/255,1))
    } else {
      font2.drawStringWithShadow(dungeonStrings[i], dLoc.x+(70-Renderer.getStringWidth(dungeonStrings[i]))/2+15,dLoc.y+3+(i*buttonheight), new java.awt.Color(1,1,1,1))
    }
  }

  Renderer.drawRect(topcolor, gLoc.x, gLoc.y-2, buttonwidth, buttonheight+2)
  font2.drawStringWithShadow(generalStrings[0], gLoc.x+(70-Renderer.getStringWidth(generalStrings[0]))/2+15,gLoc.y+3, new java.awt.Color(colors.r[3]/255,colors.g[3]/255,colors.b[3]/255,1))
  for (let i=1; i< generalStrings.length; i++) {
    Renderer.drawRect(offcolor, gLoc.x, gLoc.y+(i*buttonheight), buttonwidth, buttonheight)
  }
  for (let i=1; i< generalStrings.length; i++) {
    if (settings.General[i-1]) {
      font2.drawStringWithShadow(generalStrings[i], gLoc.x+(70-Renderer.getStringWidth(generalStrings[i]))/2+15,gLoc.y+3+(i*buttonheight), new java.awt.Color(colors.r[2]/255,colors.g[2]/255,colors.b[2]/255,1))
    } else {
      font2.drawStringWithShadow(generalStrings[i], gLoc.x+(70-Renderer.getStringWidth(generalStrings[i]))/2+15,gLoc.y+3+(i*buttonheight), new java.awt.Color(1,1,1,1))
    }
  }

  Renderer.drawRect(topcolor, rLoc.x, rLoc.y-2, buttonwidth, buttonheight+2)
  font2.drawStringWithShadow(renderStrings[0], rLoc.x+(70-Renderer.getStringWidth(renderStrings[0]))/2+15,rLoc.y+3, new java.awt.Color(colors.r[3]/255,colors.g[3]/255,colors.b[3]/255,1))
  for (let i=1; i< renderStrings.length; i++) {
    Renderer.drawRect(offcolor, rLoc.x, rLoc.y+(i*buttonheight), buttonwidth, buttonheight)
  }
  for (let i=1; i< renderStrings.length; i++) {
    if (settings.Render[i-1]) {
      font2.drawStringWithShadow(renderStrings[i], rLoc.x+(70-Renderer.getStringWidth(renderStrings[i]))/2+15,rLoc.y+3+(i*buttonheight), new java.awt.Color(colors.r[2]/255,colors.g[2]/255,colors.b[2]/255,1))
    } else {
      font2.drawStringWithShadow(renderStrings[i], rLoc.x+(70-Renderer.getStringWidth(renderStrings[i]))/2+15,rLoc.y+3+(i*buttonheight), new java.awt.Color(1,1,1,1))
    }
    
  }

  Renderer.drawRect(topcolor, clipLoc.x, clipLoc.y-2, buttonwidth, buttonheight+2)
  font2.drawStringWithShadow(clipStrings[0], clipLoc.x+(70-Renderer.getStringWidth(clipStrings[0]))/2+15,clipLoc.y+3, new java.awt.Color(colors.r[3]/255,colors.g[3]/255,colors.b[3]/255,1))
  for (let i=1; i< clipStrings.length; i++) {
    Renderer.drawRect(offcolor, clipLoc.x, clipLoc.y+(i*buttonheight), buttonwidth, buttonheight)
  }
  for (let i=1; i< clipStrings.length; i++) {
    if (settings.Clip[i-1]) {
      font2.drawStringWithShadow(clipStrings[i], clipLoc.x+(70-Renderer.getStringWidth(clipStrings[i]))/2+15,clipLoc.y+3+(i*buttonheight), new java.awt.Color(colors.r[2]/255,colors.g[2]/255,colors.b[2]/255,1))
    } else {
      font2.drawStringWithShadow(clipStrings[i], clipLoc.x+(70-Renderer.getStringWidth(clipStrings[i]))/2+15,clipLoc.y+3+(i*buttonheight), new java.awt.Color(1,1,1,1))
    }
  }
  if (displayf7settings) {
    Renderer.drawRect(offcolor, clipLoc.x, clipLoc.y+(6*buttonheight), buttonwidth, buttonheight)
    font2.drawStringWithShadow(cliplocations[settings.Clip[5]],clipLoc.x+(70-(Renderer.getStringWidth(cliplocations[settings.Clip[5]])))/2+15,clipLoc.y+3+(6*buttonheight), new java.awt.Color(1,1,1,1))
  }
  if (displayrelic) {
    Renderer.drawRect(offcolor, dLoc.x, dLoc.y+(buttonheight*dungeonStrings.length-2), buttonwidth, buttonheight)
    if (settings.Dungeons[dungeonStrings.length-1] == 0) {
      font2.drawStringWithShadow("Green",dLoc.x+(70-(Renderer.getStringWidth("Green")))/2+15,dLoc.y+3+(buttonheight*dungeonStrings.length-2), new java.awt.Color(green[0]/255,green[1]/255,green[2]/255,1))
    } else if (settings.Dungeons[dungeonStrings.length-1] == 1) {
      font2.drawStringWithShadow("Red",dLoc.x+(70-(Renderer.getStringWidth("Red")))/2+15,dLoc.y+3+(buttonheight*dungeonStrings.length-2), new java.awt.Color(red[0]/255,red[1]/255,red[2]/255,1))
    } else if (settings.Dungeons[dungeonStrings.length-1] == 2) {
      font2.drawStringWithShadow("Purple",dLoc.x+(70-(Renderer.getStringWidth("Purple")))/2+15,dLoc.y+3+(buttonheight*dungeonStrings.length-2), new java.awt.Color(purple[0]/255,purple[1]/255,purple[2]/255,1))
    } else if (settings.Dungeons[dungeonStrings.length-1] == 3) {
      font2.drawStringWithShadow("Orange",dLoc.x+(70-(Renderer.getStringWidth("Orange")))/2+15,dLoc.y+3+(buttonheight*dungeonStrings.length-2), new java.awt.Color(orange[0]/255,orange[1]/255,orange[2]/255,1))
    } else if (settings.Dungeons[dungeonStrings.length-1] == 4) {
      font2.drawStringWithShadow("Blue",dLoc.x+(70-(Renderer.getStringWidth("Blue")))/2+15,dLoc.y+3+(buttonheight*dungeonStrings.length-2), new java.awt.Color(blue[0]/255,blue[1]/255,blue[2]/255,1))
    }
  }
  Renderer.drawRect(offcolor, 850, 450, buttonwidth, buttonheight)
  font2.drawStringWithShadow("Reload CT",850+(70-(Renderer.getStringWidth("Reload CT")))/2+15,450+3, new java.awt.Color(1,1,1,1))

  
  Renderer.drawRect(topcolor, colorLoc.x, colorLoc.y-buttonheight-2, buttonwidth, buttonheight+2)
  for (let i = 0; i < 16; i++) {
    Renderer.drawRect(offcolor, colorLoc.x, colorLoc.y+buttonheight*i, buttonwidth, buttonheight)
  }
  font2.drawStringWithShadow("Colors", colorLoc.x+(70-Renderer.getStringWidth("Colors"))/2+15,colorLoc.y-12, new java.awt.Color(colors.r[3]/255,colors.g[3]/255,colors.b[3]/255,1))

  for (let i = 0; i < 4; i++) {
    Renderer.drawLine(Renderer.RED,colorLoc.x+5, colorLoc.y+buttonheight*i*4+buttonheight/2+buttonheight, colorLoc.x+buttonwidth-5, colorLoc.y+buttonheight*i*4+buttonheight/2+buttonheight,5)
  }
  for (let i = 0; i < 4; i++) {
    Renderer.drawLine(Renderer.GREEN,colorLoc.x+5, colorLoc.y+buttonheight*i*4+buttonheight/2+buttonheight*2, colorLoc.x+buttonwidth-5, colorLoc.y+buttonheight*i*4+buttonheight/2+buttonheight*2,5)
  }
  for (let i = 0; i < 4; i++) {
    Renderer.drawLine(Renderer.BLUE,colorLoc.x+5, colorLoc.y+buttonheight*i*4+buttonheight/2+buttonheight*3, colorLoc.x+buttonwidth-5, colorLoc.y+buttonheight*i*4+buttonheight/2+buttonheight*3,5)
  }

  for (let i = 0; i < 4; i++) {
    Renderer.drawCircle(Renderer.WHITE,colorLoc.x+5+(colors.r[i])/(255/(buttonwidth-10)),colorLoc.y+buttonheight*i*4+buttonheight/2+buttonheight,4,1024)
  }
  for (let i = 0; i < 4; i++) {
    Renderer.drawCircle(Renderer.WHITE,colorLoc.x+5+(colors.g[i])/(255/(buttonwidth-10)),colorLoc.y+buttonheight*i*4+buttonheight/2+buttonheight*2,4,1024)
  }
  for (let i = 0; i < 4; i++) {
    Renderer.drawCircle(Renderer.WHITE,colorLoc.x+5+(colors.b[i])/(255/(buttonwidth-10)),colorLoc.y+buttonheight*i*4+buttonheight/2+buttonheight*3,4,1024)
  }
  font2.drawStringWithShadow("Top Color",colorLoc.x+(70-Renderer.getStringWidth("Top Color"))/2+15,colorLoc.y+3,new java.awt.Color(1,1,1,1))
  font2.drawStringWithShadow("Button Color",colorLoc.x+(70-Renderer.getStringWidth("Button Color"))/2+15,colorLoc.y+3+(buttonheight*4),new java.awt.Color(1,1,1,1))
  font2.drawStringWithShadow("On Color",colorLoc.x+(70-Renderer.getStringWidth("On Color"))/2+15,colorLoc.y+3+(buttonheight*8),new java.awt.Color(1,1,1,1))
  font2.drawStringWithShadow("Top text Color",colorLoc.x+(70-Renderer.getStringWidth("Top text Color"))/2+15,colorLoc.y+3+(buttonheight*12),new java.awt.Color(1,1,1,1))

  Renderer.drawRect(topcolor, splitsLoc.x, splitsLoc.y-2, buttonwidth, buttonheight+2)
  font2.drawStringWithShadow(splitsStrings[0],splitsLoc.x+(70-Renderer.getStringWidth(splitsStrings[0]))/2+15,splitsLoc.y+3,new java.awt.Color(colors.r[3]/255,colors.g[3]/255,colors.b[3]/255,1))
  for (let i = 0; i < 10; i++) {
    Renderer.drawRect(offcolor, splitsLoc.x, splitsLoc.y+buttonheight*(i+1), buttonwidth, buttonheight)
    Renderer.drawString(`${colours[settings.Splits[i]]}${splitsStrings[i+1]}`,splitsLoc.x+(70-Renderer.getStringWidth(colours[settings.Splits[i]]+splitsStrings[i+1]))/2+15,splitsLoc.y+3+buttonheight*(i+1))
  }




  mx = Client.getMouseX()
  my = Client.getMouseY()
  if (mx > dLoc.x && mx < dLoc.x+buttonwidth) {
    toshow = Math.floor((my-45)/15)
    if (toshow >= 0 && toshow <= 12) {
      Renderer.drawRect(Renderer.BLACK, dLoc.x+buttonwidth, my-10, Renderer.getStringWidth(dungeonsDescriptions[toshow])+4, buttonheight)
      Renderer.drawStringWithShadow(`&7${dungeonsDescriptions[toshow]}`,dLoc.x+buttonwidth+2,my-7)
    } else if (toshow == 13 && displayrelic) {
      Renderer.drawRect(Renderer.BLACK, dLoc.x+buttonwidth, my-10, Renderer.getStringWidth(dungeonsDescriptions[toshow])+4, buttonheight)
      Renderer.drawStringWithShadow(`&7${dungeonsDescriptions[toshow]}`,dLoc.x+buttonwidth+2,my-7)
    }
  } else if (mx > gLoc.x && mx < gLoc.x+buttonwidth) {
    toshow = Math.floor((my-45)/15)
    if (toshow >= 0 && toshow <= 6) {
      Renderer.drawRect(Renderer.BLACK, gLoc.x+buttonwidth, my-10, Renderer.getStringWidth(generalDescriptions[toshow])+4, buttonheight)
      Renderer.drawStringWithShadow(`&7${generalDescriptions[toshow]}`,gLoc.x+buttonwidth+2,my-7)
    }
  } else if (mx > rLoc.x && mx < rLoc.x+buttonwidth) {
    toshow = Math.floor((my-45)/15)
    if (toshow >= 0 && toshow <= 3) {
      Renderer.drawRect(Renderer.BLACK, rLoc.x+buttonwidth, my-10, Renderer.getStringWidth(renderDescriptions[toshow])+4, buttonheight)
      Renderer.drawStringWithShadow(`&7${renderDescriptions[toshow]}`,rLoc.x+buttonwidth+2,my-7)
    }
  } else if (mx > clipLoc.x && mx < clipLoc.x+buttonwidth) {
    toshow = Math.floor((my-45)/15)
    if (toshow >= 0 && toshow <= 4) {
      Renderer.drawRect(Renderer.BLACK, clipLoc.x-Renderer.getStringWidth(clipDescriptions[toshow])-4, my-10, Renderer.getStringWidth(clipDescriptions[toshow])+4, buttonheight)
      Renderer.drawStringWithShadow(`&7${clipDescriptions[toshow]}`,clipLoc.x-Renderer.getStringWidth(clipDescriptions[toshow])-2,my-7)
    } else if (toshow == 5 && displayf7settings) {
      Renderer.drawRect(Renderer.BLACK, clipLoc.x-Renderer.getStringWidth(clipDescriptions[toshow])-4, my-10, Renderer.getStringWidth(clipDescriptions[toshow])+4, buttonheight)
      Renderer.drawStringWithShadow(`&7${clipDescriptions[toshow]}`,clipLoc.x-Renderer.getStringWidth(clipDescriptions[toshow])-2,my-7)
    }
  }

  Client.getMinecraft().field_71460_t.func_181022_b()
  Client.getMinecraft().field_71460_t.func_175069_a(new ResourceLocation("shaders/post/blur.json"))
})

displayf7settings = false
displayrelic = false
register("clicked", (x,y,b,isdown) => {
  if (isdown && mainGui.isOpen()) {
    if (x > splitsLoc.x && x < splitsLoc.x+buttonwidth) {
      if (b == 0) {
        tochange = Math.floor((y-45)/15)
        if (settings.Splits[tochange] == 15) {
          settings.Splits[tochange] = 0
        } else {
          settings.Splits[tochange]++
        }
      }
    }
    if (x > dLoc.x && x < dLoc.x+buttonwidth) {
      if (b == 0) {
        tochange = Math.floor((y-45)/15)
        if (tochange == dungeonStrings.length-1) {
          if (settings.Dungeons[tochange] == 4) {
            settings.Dungeons[tochange] = 0
          } else {
            settings.Dungeons[tochange]++
          }
        } else {
          settings.Dungeons[tochange] = !settings.Dungeons[tochange]
        }
      } else if (b == 1 && Math.floor((y-45)/15) == dungeonStrings.length-2) {
        displayrelic = !displayrelic
      } else if (b == 2 && Math.floor((y-45)/15) == 9) {
        mainGui.close()
        powerdisplaymove.open()
      } else if (b == 2 && Math.floor((y-45)/15) == 10) {
        mainGui.close()
        dragonTimerMove.open()
      } else if (b == 2 && Math.floor((y-45)/15) == 11) {
        mainGui.close()
        splitsMove.open()
      }
    } else if (x > gLoc.x && x < gLoc.x+buttonwidth) {
      if (b == 0) {
        tochange = Math.floor((y-45)/15)
        settings.General[tochange] = !settings.General[tochange]
      }
    } else if (x > rLoc.x && x < rLoc.x+buttonwidth) {
      if (b == 0) {
        tochange = Math.floor((y-45)/15)
        settings.Render[tochange] = !settings.Render[tochange]
      }
    } else if (x > clipLoc.x && x < clipLoc.x+buttonwidth) {
      if (b == 0) {
        tochange = Math.floor((y-45)/15)
        if (tochange == 5) {
          if (settings.Clip[tochange] == 3) {
            settings.Clip[tochange] = 0
          } else {
            settings.Clip[tochange]++
          }
        } else {
          settings.Clip[tochange] = !settings.Clip[tochange]
        }
      } else if (b == 1 && Math.floor((y-45)/15) == 4) {
        displayf7settings = !displayf7settings
      }
    } else if (x > colorLoc.x && x < colorLoc.x+buttonwidth) {
      if (y > colorLoc.y+buttonheight*27 && y < colorLoc.y+buttonheight*28) {
        if (b == 0) {
          mainGui.close()
          setTimeout(()=>{ChatTriggers.reloadCT()},50)
        }
      }
    }
    settings.save()
  }
})

register("dragged", (mdx,mdy,mx,my,b) => {
  if (!mainGui.isOpen()) return
  if (mx > colorLoc.x && mx < colorLoc.x+buttonwidth) {
    tochange = Math.floor((my-45)/15)
    if (tochange%4 == 1) {
      if (colors.r[(tochange-1)/4]+mdx*(255/(buttonwidth-10)) < 255 && colors.r[(tochange-1)/4]+mdx*(255/(buttonwidth-10)) > 0) {
        colors.r[(tochange-1)/4]+=mdx*(255/(buttonwidth-10))
      }
    } else if (tochange%4 == 2) {
      if (colors.g[(tochange-2)/4]+mdx*(255/(buttonwidth-10)) < 255 && colors.g[(tochange-2)/4]+mdx*(255/(buttonwidth-10)) > 0) {
        colors.g[(tochange-2)/4]+=mdx*(255/(buttonwidth-10))
      }
    } else if (tochange%4 == 3) {
      if (colors.b[(tochange-3)/4]+mdx*(255/(buttonwidth-10)) < 255 && colors.b[(tochange-3)/4]+mdx*(255/(buttonwidth-10)) > 0) {
        colors.b[(tochange-3)/4]+=mdx*(255/(buttonwidth-10))
      }
    }
  }
  colors.save()
})

export const powerdisplaymove = new Gui()
var pDisplay = new Display()
register("tick", () => {
  if (!powerdisplaymove.isOpen()) {
    pDisplay.clearLines()
    return
  }
  pDisplay.setRenderLoc(data.powerDisplay.x,data.powerDisplay.y)
  pDisplay.setLine(0,`&cPower&r: &a19`)
  pDisplay.setLine(1,`&cT&6i&am&1e&r: &a5`)
  lines = pDisplay.getLines()
  for (let i = 0; i < lines.length; i++) {
    pDisplay.getLine(i).setScale(data.powerDisplay.scale/100)
  }
})

register("dragged", (mx, my, x, y) => {
  if (!powerdisplaymove.isOpen()) return
  data.powerDisplay.x = x
  data.powerDisplay.y = y
  data.save()
})

register("scrolled", (mx,my,dir) => {
  if (!powerdisplaymove.isOpen()) return
  if (dir == -1) {
    if (data.powerDisplay.scale > 0) {
      data.powerDisplay.scale--
    }
  } else {
    data.powerDisplay.scale++
  }
  data.save()
})

export const dragonTimerMove = new Gui()
var dtDisplay = new Display()
register("tick", () => {
  if (!dragonTimerMove.isOpen()) {
    dtDisplay.clearLines()
    return
  }
  dtDisplay.setRenderLoc(data.dragonTimer.x,data.dragonTimer.y)
  dtDisplay.setLine(0,`&6Orange spawning in&r: &c250ms`)
  dtDisplay.setLine(1,`&4Red spawning in&r: &e1150ms`)
  dtDisplay.setLine(2,`&aGreen spawning in&r: &e1930ms`)
  dtDisplay.setLine(3,`&5Purple spawning in&r: &a2400ms`)
  dtDisplay.setLine(4,`&bBlue spawning in&r: &a4300ms`)
  lines = dtDisplay.getLines()
  for (let i = 0; i < lines.length; i++) {
    dtDisplay.getLine(i).setScale(data.dragonTimer.scale/100)
  }
})

register("dragged", (mx, my, x, y) => {
  if (!dragonTimerMove.isOpen()) return
  data.dragonTimer.x = x
  data.dragonTimer.y = y
  data.save()
})

register("scrolled", (mx,my,dir) => {
  if (!dragonTimerMove.isOpen()) return
  if (dir == -1) {
    if (data.dragonTimer.scale > 0) {
      data.dragonTimer.scale--
    }
  } else {
    data.dragonTimer.scale++
  }
  data.save()
})

export const splitsMove = new Gui()
var sDisplay = new Display()
register("tick", () => {
  if (!splitsMove.isOpen()) {
    sDisplay.clearLines()
    return
  }
  sDisplay.setRenderLoc(data.splits.x,data.splits.y)
  sDisplay.setLine(0,`${colours[settings.Splits[0]]}Bloodrush: 0s`)
  sDisplay.setLine(1,`${colours[settings.Splits[1]]}Blood Clear: 0s`)
  sDisplay.setLine(2,`${colours[settings.Splits[2]]}Portal: 0s`)
  sDisplay.setLine(3,`${colours[settings.Splits[3]]}Boss Entry: 0s`)
  sDisplay.setLine(4,`${colours[settings.Splits[4]]}Maxor: 0s`)
  sDisplay.setLine(5,`${colours[settings.Splits[5]]}Storm: 0s`)
  sDisplay.setLine(6,`${colours[settings.Splits[6]]}Terminals: 0s`)
  sDisplay.setLine(7,`${colours[settings.Splits[7]]}Goldor: 0s`)
  sDisplay.setLine(8,`${colours[settings.Splits[8]]}Necron: 0s`)
  sDisplay.setLine(9,`${colours[settings.Splits[9]]}Dragons: 0s`)
  lines = sDisplay.getLines()
  for (let i = 0; i < lines.length; i++) {
    sDisplay.getLine(i).setScale(data.splits.scale/100)
  }
})

register("dragged", (mx, my, x, y) => {
  if (!splitsMove.isOpen()) return
  data.splits.x = x
  data.splits.y = y
  data.save()
})

register("scrolled", (mx,my,dir) => {
  if (!splitsMove.isOpen()) return
  if (dir == -1) {
    if (data.splits.scale > 0) {
      data.splits.scale--
    }
  } else {
    data.splits.scale++
  }
  data.save()
})