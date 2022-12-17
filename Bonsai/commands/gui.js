import Config from "../Config"
import { data } from "../data/data"
import { prefix } from "../utils/prefix"
import PogObject from "../../PogData/index"

if (!FileLib.exists("Bonsai", "settings/settings.json")) {
  FileLib.write("./Bonsai/settings","settings.json","")
}

export const settings = new PogObject("Bonsai", {
  "Dungeons": [false,false,false,false,false,false,false,false,false,0],
  "General": [false,false,false,false,false,false],
  "Render": [false,false,false],
  "Clip": [false,false,false,false,false,0]
}, "settings/settings.json")

mainGui = new Gui()

if (settings.Dungeons[10] == undefined) settings.Dungeons[10] = 0

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
}).setName("bonsai").setAliases("bo", "bonsaiaddons");

register("tick", () => {
  if (Config.presetgui.isOpen()) {
    Config.presetgui.close()
  }
})

guikey = new KeyBind("Main Gui", Keyboard.KEY_NONE, "Bonsai")
guikey.registerKeyPress(() => {
  mainGui.open()
})

dLoc = {"x":100,"y":30}
gLoc = {"x":270,"y":30}
rLoc = {"x":440,"y":30}
clipLoc = {"x":610,"y":30}
reloadLoc = {"x":850,"y":500}
buttonwidth = 100
buttonheight = 15
dungeonStrings = [
  "Dungeons",
  "Auto Kick",
  "Auto Ice Fill",
  "Auto Terminals",
  "Auto Black Cat",
  "Auto Warp",
  "Auto Edrag",
  "Auto GB",
  "Mage Pad 2nd",
  "Terminal Counter",
  "Relic Caller"
]
generalStrings = [
  "General",
  "Auto Flint",
  "Song Singer",
  "Swarm Counter",
  "Message Hider",
  "Auto Sell",
  "Auto Rogue"
]
renderStrings = [
  "Render",
  "Falling Blocks",
  "Armor Stands p5",
  "Players"
]
clipStrings = [
  "Clip",
  "3D Infinite",
  "Auto F4",
  "Auto F5",
  "Auto F6",
  "Auto F7",
]

topcolor = Renderer.DARK_RED
oncolor = Renderer.GREEN
offcolor = Renderer.color(45,45,45,255)
image = new Image("christmas","https://png.pngtree.com/png-vector/20201123/ourmid/pngtree-3d-sign-of-merry-christmas-lantern-png-image_2462919.png")
cliplocations = [
  "Left",
  "Right",
  "Down",
  "Conveyor"
]
relics = [
  "&aGreen",
  "&cRed",
  "&5Purple",
  "&6Orange",
  "&bBlue"
]
register("renderOverlay", () => {
  if (!mainGui.isOpen()) return
  Renderer.drawRect(topcolor, dLoc.x, dLoc.y-2, buttonwidth, buttonheight+2)
  Renderer.drawString(`&7${dungeonStrings[0]}`,dLoc.x+27,dLoc.y+3,true)
  for (let i=1; i< dungeonStrings.length; i++) {
    Renderer.drawRect(offcolor, dLoc.x, dLoc.y+(i*buttonheight), buttonwidth, buttonheight)
  }
  for (let i=1; i< dungeonStrings.length; i++) {
    if (settings.Dungeons[i-1]) {
      Renderer.drawString(`&2${dungeonStrings[i]}`,dLoc.x+(70-Renderer.getStringWidth(dungeonStrings[i]))/2+15,dLoc.y+3+(i*buttonheight),true)
    } else {
      Renderer.drawString(dungeonStrings[i],dLoc.x+(70-Renderer.getStringWidth(dungeonStrings[i]))/2+15,dLoc.y+3+(i*buttonheight),true)
    }
  }

  Renderer.drawRect(topcolor, gLoc.x, gLoc.y-2, buttonwidth, buttonheight+2)
  Renderer.drawString(`&7${generalStrings[0]}`,gLoc.x+33,gLoc.y+3,true)
  for (let i=1; i< generalStrings.length; i++) {
    Renderer.drawRect(offcolor, gLoc.x, gLoc.y+(i*buttonheight), buttonwidth, buttonheight)
  }
  for (let i=1; i< generalStrings.length; i++) {
    if (settings.General[i-1]) {
      Renderer.drawString(`&2${generalStrings[i]}`,gLoc.x+(70-Renderer.getStringWidth(generalStrings[i]))/2+15,gLoc.y+3+(i*buttonheight),true)
    } else {
      Renderer.drawString(generalStrings[i],gLoc.x+(70-Renderer.getStringWidth(generalStrings[i]))/2+15,gLoc.y+3+(i*buttonheight),true)
    }
  }

  Renderer.drawRect(topcolor, rLoc.x, rLoc.y-2, buttonwidth, buttonheight+2)
  Renderer.drawString(`&7${renderStrings[0]}`,rLoc.x+35,rLoc.y+3,true)
  for (let i=1; i< renderStrings.length; i++) {
    Renderer.drawRect(offcolor, rLoc.x, rLoc.y+(i*buttonheight), buttonwidth, buttonheight)
  }
  for (let i=1; i< renderStrings.length; i++) {
    if (settings.Render[i-1]) {
      Renderer.drawString(`&2${renderStrings[i]}`,rLoc.x+(70-Renderer.getStringWidth(renderStrings[i]))/2+15,rLoc.y+3+(i*buttonheight),true)
    } else {
      Renderer.drawString(renderStrings[i],rLoc.x+(70-Renderer.getStringWidth(renderStrings[i]))/2+15,rLoc.y+3+(i*buttonheight),true)
    }
    
  }

  Renderer.drawRect(topcolor, clipLoc.x, clipLoc.y-2, buttonwidth, buttonheight+2)
  Renderer.drawString(`&7${clipStrings[0]}`,clipLoc.x+45,clipLoc.y+3,true)
  for (let i=1; i< clipStrings.length; i++) {
    Renderer.drawRect(offcolor, clipLoc.x, clipLoc.y+(i*buttonheight), buttonwidth, buttonheight)
  }
  for (let i=1; i< clipStrings.length; i++) {
    if (settings.Clip[i-1]) {
      Renderer.drawString(`&2${clipStrings[i]}`,clipLoc.x+(70-Renderer.getStringWidth(clipStrings[i]))/2+15,clipLoc.y+3+(i*buttonheight),true)
    } else {
      Renderer.drawString(clipStrings[i],clipLoc.x+(70-Renderer.getStringWidth(clipStrings[i]))/2+15,clipLoc.y+3+(i*buttonheight),true)
    }
  }
  if (displayf7settings) {
    Renderer.drawRect(offcolor, clipLoc.x, clipLoc.y+(6*buttonheight), buttonwidth, buttonheight)
    Renderer.drawString(cliplocations[settings.Clip[5]],clipLoc.x+(70-Renderer.getStringWidth(cliplocations[settings.Clip[5]]))/2+15,clipLoc.y+3+(6*buttonheight),true)
  }
  if (displayrelic) {
    Renderer.drawRect(offcolor, dLoc.x, dLoc.y+(11*buttonheight), buttonwidth, buttonheight)
    Renderer.drawString(relics[settings.Dungeons[10]],dLoc.x+(70-(Renderer.getStringWidth(relics[settings.Dungeons[10]])))/2+15,dLoc.y+3+(11*buttonheight),true)
  }
  Renderer.drawRect(offcolor, reloadLoc.x, reloadLoc.y, buttonwidth, buttonheight)
  Renderer.drawString("Reload CT",reloadLoc.x+(70-(Renderer.getStringWidth("Reload CT")))/2+15,reloadLoc.y+3,true)
})

displayf7settings = false
displayrelic = false
register("clicked", (x,y,b,isdown) => {
  if (isdown && mainGui.isOpen()) {
    if (x > dLoc.x && x < dLoc.x+buttonwidth) {
      if (b == 0) {
        tochange = Math.floor((y-45)/15)
        if (tochange == 10) {
          if (settings.Dungeons[tochange] == 4) {
            settings.Dungeons[tochange] = 0
          } else {
            settings.Dungeons[tochange]++
          }
        } else {
          settings.Dungeons[tochange] = !settings.Dungeons[tochange]
        }
      } else if (b == 1 && Math.floor((y-45)/15) == 9) {
        displayrelic = !displayrelic
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
    } else if (x > reloadLoc.x && x < reloadLoc.x+buttonwidth) {
      if (y > reloadLoc.y && y < reloadLoc.y+buttonheight) {
        if (b == 0) {
          mainGui.close()
          setTimeout(()=>{ChatTriggers.reloadCT()},50)
        }
      }
    }
    settings.save()
  }
})