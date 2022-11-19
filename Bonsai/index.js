/// <reference types="../CTAutocomplete" />
import Config from "./Config"
import { data } from "./data/data"
import Dungeon from "../BloomCore/dungeons/Dungeon"
import request from "../requestV2"

// CONSTANTS
//#region 
const colorOrder = [1, 4, 13, 11, 14]
const isEnchanted = (slot) => Player.getContainer()?.getStackInSlot(slot)?.isEnchanted()
const EntityMob = Java.type("net.minecraft.entity.monster.EntityMob").class;
const sv = 20
const colorReplacements = {
  "light gray": "silver",
  "wool": "white",
  "bone": "white",
  "ink": "black",
  "lapis": "blue",
  "cocoa": "brown",
  "dandelion": "yellow",
  "rose": "red",
  "cactus": "green"
}
//#endregion

// PREFIX FOR MOD MESSAGES
const prefix = "&d[&aBonsai&d]"

// TERMINAL SOLVER FUNCTIONS
//#region 
const getInvItemsTo = (endIndex) => Array.from(Array(endIndex).keys()).filter(a => Player.getContainer().getStackInSlot(a))
const filterPanesWithMeta = (array, meta) => array.filter(a => Player.getContainer().getStackInSlot(a).getRegistryName() == "minecraft:stained_glass_pane" && Player.getContainer().getStackInSlot(a).getMetadata() == meta) 
const filterPanesWithoutMeta = (array, meta) => array.filter(a => Player.getContainer().getStackInSlot(a).getRegistryName() == "minecraft:stained_glass_pane" && Player.getContainer().getStackInSlot(a).getMetadata() !== meta) 
const getStackFromIndex = (index) => Player.getContainer().getStackInSlot(index)
const sortStackSize = (array) => array.sort((a, b) => getStackFromIndex(a).getStackSize() - getStackFromIndex(b).getStackSize())
const fixColor = (itemName) => {
  Object.keys(colorReplacements).map(a => itemName = itemName.toLowerCase().replace(new RegExp(`^${a}`), colorReplacements[a]))
  return itemName
}
//#endregion



let checked = false
register("step", () => {
    if (checked) return
    checked = true
    request("https://raw.githubusercontent.com/freebonsai/bonsaiaddons/main/api.json").then(stuff => {
        stuff = JSON.parse(stuff.replace(new RegExp("    ", "g"), ""))
        // ChatLib.chat(JSON.stringify(stuff, "", 4))
        let metadata = JSON.parse(FileLib.read("Bonsai", "metadata.json"))

        if (metadata.version !== stuff.latestVersion) {
            new Message(`&9&m${ChatLib.getChatBreak(" ")}\n`,
            new TextComponent(`${prefix} &aA new version of Bonsai is available! (&c${stuff.latestVersion}&a) Click to go to the Github page! `).setClick(
                "open_url",
                "https://github.com/freebonsai/bonsaiaddons"
            ).setHover(
                "show_text",
                "&aClick to open\n&7https://github.com/freebonsai/bonsaiaddons"
            ),
            new TextComponent(`&7(Changelog)`).setHover(
                "show_text",
                `&6&nChangeLog for ${stuff.latestVersion}:\n &7- ` + stuff.changelog.join("\n &7- ")
            ),
            `\n&9&m${ChatLib.getChatBreak(" ")}`).chat()
        }
    }).catch(error => {
        ChatLib.chat(`${prefix} &cError whilst checking for update: ${error}`)
    })
})

// ANNOYING ABI CALLS HIDER
register("Chat", (event) => {
  var abi = ChatLib.getChatMessage(event, true);
  if(abi.includes("&r&e✆ &r&5Igrupan&r&e ✆ &r") || abi.includes("&r&e✆ &r&cAranya&r&e ✆ &r") || abi.includes("&r&e✆ &r&dKaus&r&e ✆ &r") || abi.includes("&r&e✆ &r&5Rollim&r&e ✆ &r") || abi.includes("&r&a✆ Ring...") || abi.includes("&r&a✆ Ring... Ring...") || abi.includes("&r&a✆ Ring... Ring... Ring...r")) {
    cancel(event)
  }
});


// SINSEEKER CLIP KEYBIND THINGY
let lastsinmsg
sinseekerslot = -1
sinclipkey = new KeyBind("Sinseeker Key", Keyboard.KEY_7, "Bonsai")
sinclipkey.registerKeyPress(() => {
  if (Config.sinclip) {
    items = Player.getInventory().getItems()
    for (let i=0;i<items.length;i++) {
      if (items[i] == "1xitem.hoeGold@0") {
        if (items[i].getName() == "§5§4Sin§5seeker Scythe") {
          sinseekerslot = i
        }
      }
    }
    if (sinseekerslot >= 0) {
      new Thread(() => {
        Thread.sleep(Config.sindelay)
        ChatLib.command("vertclip", true)
        new Message(prefix +" &bSinseeker clipping").setChatLineId(5050).chat();
        lastsinmsg = new Date().getTime()
      }).start()
    }
  }
})

register("tick", () => {
  if (new Date().getTime() - lastsinmsg > 6000) {
    ChatLib.clearChat(5050);
    lastsinmsg = undefined
  }
})

// FUNCION TO CONVERT DEGREES TO RADIANS (NEEDED FOR COS() AND SIN())
function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function toDegrees (angle) {
  return angle * (180/ Math.PI);
}

// VCLIP
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
    console.log("searching for blocks")
    px = Player.getX()
    py = Player.getY()
    pz = Player.getZ()
    let air = 0
    let c = 1
    while (air < 10) {
      let BlockBlock = new BlockPos(Math.floor(px),Math.floor(py)-c,Math.floor(pz))
      b = World.getBlockStateAt(BlockBlock)
      if (b == "minecraft:air") {
        air++
        console.log("air!")
      } else {
        c++
        console.log("next block")
      }
    }
    if (c < 9) {
      Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px,py-c-1,pz)
    } else {
      ChatLib.chat(prefix + " &bClosest block will lag you back!")
    }
  }
}).setName("vclipbo")

// HCLIP
register("command", (d,o) => {
  // GETTING VARIABLES
  ya = Player.getYaw()
  px = Player.getX()
  py = Player.getY()
  pz = Player.getZ()
  newx = -Math.sin(toRadians(ya))*d
  newz = Math.cos(toRadians(ya))*d
  o = o*1
  // THE CLIPPING FUNCTION
  if (o) {
    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px+newx,py+o,pz+newz)
  } else {
    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px+newx,py,pz+newz)
  }
}).setName("hclipbo")

// FUNI MARIOKART
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

// TP CLIP
register("command", (x,y,z) => {
  // GETTING VARIABLES
  px = Player.getX()
  py = Player.getY()
  pz = Player.getZ()
  x*=1
  y*=1
  z*=1
  // THE CLIPPING FUNCTION
  if (Number.isInteger(x) && Number.isInteger(y) && Number.isInteger(z)) {
    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px+x,py+y,pz+z)
  } else {
    ChatLib.chat(prefix + " &bNot enough arguments or isn't an integer! &aUse /tpclip x y z")
  }
}).setName("tpclip")

// 3D CLIP
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
        px = Player.getX()
        py = Player.getY()
        pz = Player.getZ()
      }
    }).start()
  } else {
    Client.getMinecraft().func_71410_x().field_71439_g.func_70107_b(px + newx, py + newy, pz + newz)
  }
}).setName("dclipbo")

// SWARM COUNTER VARIABLES AND SETUP
//#region 
let counter = 0
var cDisplay = new Display();
var mDisplay = new Display();
mDisplay.setRenderLoc(Renderer.screen.getWidth()/2, 30)
mDisplay.setAlign("center")
mDisplay.setMinWidth(100)
swarmlevel = 0
swarmname = "Swarm "
//#endregion

// SWARM COUNTER MAIN FUNCTION
register("tick", () => {
  cDisplay.setRenderLoc(data.swarmCounter.x, data.swarmCounter.y)
  if (Config.SwarmCounter) {
    try {
      Player.getHeldItem().getLore().map(lore => {
        if(lore.includes(swarmname)){
          //console.log("swarm")
          World.getAllEntitiesOfType(EntityMob).forEach(EntityMob => {
            if (EntityMob.distanceTo(Player.getPlayer()) < 10) {
              counter = counter + 1
            }
          })
          for (let i = 0; i < 5; i++) {
            if (lore.includes(swarmname + i)) {
              swarmlevel = i+1
            }
          }
          if (counter > 10) counter = 10
          if (counter > 0) {
            if (Config.SwarmCounterPercent) {
              cDisplay.setLine(0, "&5&lSwarm Mobs:&6&l " + counter + ": " + counter*swarmlevel*2 + "%  ")
            } else {
              cDisplay.setLine(0, "&5&lSwarm Mobs:&6&l " + counter + " ")
            }
            cDisplay.getLine(0).setScale(Config.SwarmCounterScale/100)
          } else {
            cDisplay.clearLines()
          }
          counter = 0
        }
      })
    } catch (error) {
      cDisplay.clearLines()
    }
  }
  if (Config.swarmCounterMove.isOpen()) {
    cDisplay.setAlign("center")
    if (Config.SwarmCounterPercent) {
      cDisplay.setLine(0, "&5&lSwarm Mobs:&6&l " + counter + ": " + counter*10 + "%  ")
    } else {
      cDisplay.setLine(0, "&5&lSwarm Mobs:&6&l " + counter + " ")
    }
    mDisplay.setLine(0, "&6&lMove the swarm counter")
    mDisplay.getLine(0).setScale(2)
  }
  if (Config.SwarmCounter == false) cDisplay.clearLines()
})

// CLEARS SWARM COUNTER IF PLAYER IS NO LONGER HOLDING SWARM WEAPON
register("tick", () => {
  try {
    Player.getHeldItem().getLore().map(lore => {
      if(!lore.includes(swarmname)){
        cDisplay.clearLines()
      }
    })
  } catch (error) {
    cDisplay.clearLines()
  }
})

// MOVE SWARM COUNTER
register("dragged", (mx, my, x, y) => {
  if (!Config.swarmCounterMove.isOpen()) return
  data.swarmCounter.x = x
  data.swarmCounter.y = y
  data.save()
})

let releasecount = 0
// CLOSES SWARM MOVE GUI IF MOUSE RELEASED
register("GuiMouseRelease", () => {
  if (Config.swarmCounterMove.isOpen()) {
    releasecount++
    if (releasecount > 1) {
      new Thread(() => {
        Config.swarmCounterMove.close()
        mDisplay.clearLines()
        Thread.sleep(1000)
        cDisplay.clearLines()
        releasecount = 0
      }).start()
    }
  }
})

// CLOSES SWARM MOVE GUI IF BUTTON CLICKED
register("guiKey", (char, code, gui, event) => {
  if (Config.swarmCounterMove.isOpen()) cDisplay.clearLines(),mDisplay.clearLines()
})

// OPEN MAIN GUI
register("command", (args) => 
  Config.openGUI()
).setName("bonsai").setAliases("bo", "bonsaiaddons");



// VARIABLES FOR AUTO TERM
//#region 
let windowId = null
let lastClickWasntATerm = true
let terminalCooldown = 0
let inTerm = false
//#endregion

let q = []
function clickQueue() {
  let inv = Player.getContainer();
  let n = inv.getName();
  let wi = Player.getContainer().getWindowId();
  if (windowId < wi) windowId = wi
  new Thread(() => {
    console.log(q)
    for (let i = q.length-1; i >= 0; i--) {
      //clickSlot(q[i], windowId, 2)
      if (Config.autoClickType == 0) {
        inv.click(q[i],false,"LEFT")
      } else if (Config.autoClickType == 1) {
        inv.click(q[i],false,"MIDDLE")
      } else if (Config.autoClickType == 2) {
        inv.click(q[i],true,"LEFT")
      }
      windowId++
      s = Math.floor(Math.random() * sv) + Config.autoTermDelay-(sv/2)
      if (s < 0) s = 10
      Thread.sleep(s)
      console.log(s)
    }
    q = []
  }).start()
}

let solved = false
// AUTO TERM MAIN FUNC
register('tick', () => {
  if (Config.autoTerms && !inTerm) {
    let inv = Player.getContainer();
    let n = inv.getName();
    let wi = Player.getContainer().getWindowId();
    if (windowId < wi) windowId = wi
    // "Correct all the panes!"
    if (n == "Correct all the panes!") {
      if (Config.panes) {
        solved = false
        inTerm = true
        tobesolved = filterPanesWithMeta(getInvItemsTo(45), 14)
        console.log(tobesolved)
        for (let i = 0; i < tobesolved.length; i++) {
          q.push(tobesolved[i])
          //console.log("next to click " + tobesolved[i+1])
        }
        clickQueue()
      }
    }
    //rubix
    if (n == "Change all to same color!") {
      if (Config.rubix) {
        inTerm = true
        tobesolved = colorOrder.map((v, i) => filterPanesWithoutMeta(getInvItemsTo(45), 15).map(a => Array(Math.abs(colorOrder.length-1 - (colorOrder.indexOf(inv.getStackInSlot(a).getMetadata())+i)%colorOrder.length)).fill(a)).reduce((a, b) => a.concat(b), [])).sort((a, b) => a.length - b.length)[0]
        console.log(tobesolved)
        solved = false
        for (let i = 0; i < tobesolved.length; i++) {
          q.push(tobesolved[i])
        }
        clickQueue()
      }
    }
    // Numbers
    if (n == "Click in order!") {
      if (Config.numbers) {
        inTerm = true
        tobesolved = correctSlots = sortStackSize(filterPanesWithMeta(getInvItemsTo(35), 14))
        console.log(tobesolved)
        solved = false
        for (let i = 0; i < tobesolved.length; i++) {
            q.push(tobesolved[i])
        }
        clickQueue()
      }
    }
    if (n.startsWith("What starts with:")) {
      if (Config.startswith) {
        inTerm = true
        let letter = n.match(/What starts with: '(\w+)'?/)[1].toLowerCase()
        tobesolved = getInvItemsTo(45).filter(a => inv.getStackInSlot(a).getName().removeFormatting().toLowerCase().startsWith(letter)).filter(a => !isEnchanted(a))
        console.log(tobesolved)
        solved = false
        for (let i = 0; i < tobesolved.length; i++) {
          q.push(tobesolved[i])
        }
        clickQueue()
      }
    }
    if (n.startsWith("Select all the")) {
      if (Config.selectallthe) {
        inTerm = true
        let color = n.match(/Select all the (.+) items!/)[1].toLowerCase()
        tobesolved = getInvItemsTo(45).filter(a => fixColor(inv.getStackInSlot(a).getName().removeFormatting().toLowerCase()).startsWith(color)).filter(a => !isEnchanted(a))
        console.log(tobesolved)
        solved = false
        for (let i = 0; i < tobesolved.length; i++) {
          q.push(tobesolved)
        }
        clickQueue()
      }
    }
  }
});

// TERM CLOSED
register('GuiClosed', () => {
  if (inTerm) { 
    inTerm = false
    console.log("GUI CLOSED")
    q = []
  }
});



// MESSAGE HIDER
register("chat", (chat,rank,name,msg,event) => {
  if (Config.messageHider && name.toLowerCase() == Config.ignHide.toLowerCase()) {
    if (rank == "[MVP+]" || rank == "[MVP]") {
      ChatLib.chat(prefix + " &b" + name + " &dis smeshnik and shouldn't be allowed to speak")
    } else if (rank == "[MVP++]") {
      ChatLib.chat(prefix + " &6" + name + " &dis smeshnik and shouldn't be allowed to speak")
    } else if (rank == "[VIP]" || rank == "[VIP+]") {
      ChatLib.chat(prefix + " &a" + name + " &dis smeshnik and shouldn't be allowed to speak")
    }
    cancel(event)
  }
}).setChatCriteria("${chat} > ${rank} ${name}: ${msg}")

register("chat", (chat,rank,name,grank,msg,event) => {
  if (Config.messageHider && name.toLowerCase() == Config.ignHide.toLowerCase()) {
    if (rank == "[MVP+]" || rank == "[MVP]") {
      ChatLib.chat(prefix + " &b" + name + " &dis smeshnik and shouldn't be allowed to speak")
    } else if (rank == "[MVP++]") {
      ChatLib.chat(prefix + " &6" + name + " &dis smeshnik and shouldn't be allowed to speak")
    } else if (rank == "[VIP]" || rank == "[VIP+]") {
      ChatLib.chat(prefix + " &a" + name + " &dis smeshnik and shouldn't be allowed to speak")
    }
    cancel(event)
  }
}).setChatCriteria("${chat} > ${rank} ${name} ${grank}: ${msg}")

// AUTO WARP
register("chat", (name) => {
  if (Config.autoWarp) {
    if (name.toLowerCase() == Config.ignWarp.toLowerCase()) {
      new Thread(() => {
        ChatLib.chat(prefix + " &dWARPING")
        Thread.sleep(Config.warpDelay)
        ChatLib.command("p warp")
      }).start()
    }
  }
}).setChatCriteria(" ☠ ${name} disconnected from the Dungeon and became a ghost.")

// COMMAND TO TEST IF WARP FUNCTION WORKS
register("command", () => {
  ChatLib.simulateChat(" ☠ " + Config.ignWarp.toLowerCase() + " disconnected from the Dungeon and became a ghost.")
}).setName("botestwarp")

let inm7 = false
// RELIC CALLER WHEN NECRON END
register("chat", () => {
  lines = Scoreboard.getLines()
  for (let i = 0;i < lines.length;i++) {
    if (lines[i] == " §7⏣ §cThe Catac👾§combs §7(M7)" || lines[i] == " §7⏣ §cThe Catac🌠§combs §7(M7)") {
      if (Config.relicCaller) {
        if (Config.relicType == 0) {
          ChatLib.say("green")
        } else if (Config.relicType == 1) {
          ChatLib.say("red")
        } else if (Config.relicType == 2) {
          ChatLib.say("purple")
        } else if (Config.relicType == 3) {
          ChatLib.say("orange")
        } else if (Config.relicType == 4) {
          ChatLib.say("blue")
        }
        console.log("tried to call a relic")
      }
      inm7 = true
    } else if (!inm7) {
      //console.log("not in m7")
    }
  }
  console.log("checked if in m7")
}).setChatCriteria("[BOSS] Necron: All this, for nothing...")

register("command", () =>{
  ChatLib.simulateChat("[BOSS] Necron: All this, for nothing...")
}).setName("testrelic")

let inPhase = 0
// FIRST PHASE
register("chat", () => {
  if (Dungeon.inDungeon) {
    inPhase = 1
    cDisplay.clearLines()
    if (Config.oneleft1) {
      ChatLib.say("1st left $bterm$")
    } 
    if (Config.oneleft2) {
      ChatLib.say("2nd left $bterm$")
    } 
    if (Config.onedev) {
      ChatLib.say("Simon Says $bterm$")
    } 
    if (Config.oneright1) {
      ChatLib.say("1st right $bterm$")
    } 
    if (Config.oneright2) {
      ChatLib.say("2nd right $bterm$")
    } 
    if (Config.pre4) {
      ChatLib.say("Pre 4 $bterm$")
    }
  }
}).setChatCriteria("[BOSS] Goldor: Who dares trespass into my domain?")

// SECOND AND FOURTH PHASE
register("chat", () => {
  if (Dungeon.inDungeon) {
    inPhase++
    cDisplay.clearLines()
    if (inPhase == 2) {
      if (Config.tworight1) {
        ChatLib.say("1st right $bterm$")
      } 
      if (Config.tworight2) {
        ChatLib.say("2nd right $bterm$")
      } 
      if (Config.twodev) {
        ChatLib.say("Device $bterm$")
      } 
      if (Config.tworight3) {
        ChatLib.say("3rd right $bterm$")
      } 
      if (Config.tworight4) {
        ChatLib.say("4th right $bterm$")
      } 
      if(Config.twoleft1) {
        ChatLib.say("1st left $bterm$")
      }
    }
    if (inPhase == 4) {
      if (Config.fourleft1) {
        ChatLib.say("1st left $bterm$")
      } 
      if (Config.fourleft2) {
        ChatLib.say("2nd left $bterm$")
      } 
      if (Config.fourdev) {
        ChatLib.say("Device $bterm$")
      } 
      if (Config.fourleft3) {
        ChatLib.say("3rd left $bterm$")
      } 
      if (Config.fourright1) {
        ChatLib.say("1st right $bterm$")
      }
    }
  }
}).setChatCriteria("${blah} (7/7)")

// THIRD PHASE
register("chat", () => {
  if (Dungeon.inDungeon) {
    inPhase++
    cDisplay.clearLines()
    if (Config.threeleft1) {
      ChatLib.say("1st left $bterm$")
    } 
    if (Config.threeleft2) {
      ChatLib.say("2nd left $bterm$")
    } 
    if (Config.threedev) {
      ChatLib.say("Device $bterm$")
    } 
    if (Config.threeright1) {
      ChatLib.say("1st right $bterm$")
    } 
    if (Config.threeleft3) {
      ChatLib.say("3rd left $bterm$")
    }
  }
}).setChatCriteria("${blah} (8/8)")

// GOLDOR OVER
register("chat", () => {
  inPhase = 0
  cDisplay.clearLines()
}).setChatCriteria("[BOSS] Goldor: Necron, forgive me.")

// GOLDOR OVER
register("chat", () => {
  inPhase = 0
  cDisplay.clearLines()
}).setChatCriteria("[BOSS] Goldor: FINALLY! This took way too long.")

// TERM DISPLAY SETUP
//#region 
var tDisplay = new Display();
var mtDisplay = new Display();
mtDisplay.setAlign("center")
mtDisplay.setRenderLoc(Renderer.screen.getWidth()/2, 30)
//#endregion

let atline = 1
// TERM DISPLAY MESSAGE CATCHER
register("chat", (rank,name,term) => {
  if (Config.termcalldisplay) {
    if (inPhase == 1) {
      tDisplay.setLine(0,"&4&lOne")
    } else if (inPhase == 2) {
      tDisplay.setLine(0,"&3&lTwo")
    } else if (inPhase == 3) {
      tDisplay.setLine(0,"&b&lThree")
    } else if (inPhase == 4) {
      tDisplay.setLine(0,"&d&lFour")
    }
    if (inPhase == 0) {
      tDisplay.setLine(atline, "&6" + term + ": &a" + name)
      atline++
    }
  }
}).setChatCriteria("Party > ${rank} ${name}: ${term} $bterm$")

// CLEAR TERM DISPLAY WHEN SETTING TURNED OFF AND SET LOCATION TO DATA LOCATION
register("tick", () => {
  if (!Config.termcalldisplay) {
    tDisplay.clearLines()
  }
  tDisplay.setRenderLoc(data.termDisplay.x, data.termDisplay.y)
})

// SHOW DISPLAY WHEN MOVE GUI IS OPEN
register("tick", () => {
  if (Config.termdisplaymove.isOpen()) {
    tDisplay.setLine(0,"&4&lOne")
    tDisplay.setLine(1,"&61st term left: &aPlayer 1")
    tDisplay.setLine(2,"&6Device: &aPlayer 2")
    tDisplay.setLine(3,"&62nd term right: &aPlayer 3")
    mtDisplay.setLine(0,"&c&lMove the term display")
    mtDisplay.getLine(0).setScale(2)
  }
})

// MOVE TERM DISPLAY
register("dragged", (mx, my, x, y) => {
  if (!Config.termdisplaymove.isOpen()) return
  data.termDisplay.x = x
  data.termDisplay.y = y
  data.save()
})

let rcount = 0
// CLOSE MOVE GUI WHEN MOUSE RELEASE
register("GuiMouseRelease", () => {
  if (Config.termdisplaymove.isOpen()) {
    rcount++
    if (rcount > 1) {
      Config.termdisplaymove.close()
      tDisplay.clearLines()
      mtDisplay.clearLines()
      rcount = 0
    }
  }
})

// CLOSE MOVE GUI WHEN KEY PRESS
register("guiKey", (char, code, gui, event) => {
  if (Config.termdisplaymove.isOpen()) tDisplay.clearLines(), mtDisplay.clearLines()
})

// CLEAR TERM DISPLAY COMMAND
register("command", () => {
  tDisplay.clearLines()
}).setName("cleartermdisplay")

// EXAMPLE TERM DISPLAY COMMAND
register("command", () => {
  new Thread(() => {
    tDisplay.setLine(0,"&4&lOne")
    tDisplay.setLine(1,"&61st term left: &aPlayer 1")
    tDisplay.setLine(2,"&6Device: &aPlayer 2")
    tDisplay.setLine(3,"&62nd term right: &aPlayer 3")
    Thread.sleep(10000)
    tDisplay.clearLines()
  }).start()
}).setName("showtermdisplay")



let lastblock = new Date().getTime()-1000
register("clicked", (a,c,btn) => {
  if (btn == 0) {
    if (Config.etherHelper) {
      if (Dungeon.inDungeon) {
        if (Player.isSneaking()) {
          ya = Player.getYaw()
          pi = Player.getPitch()
          px = Player.getX()
          py = Player.getY()
          pz = Player.getZ()
          for (let i=10;i<Config.etherDist;i++) {
            for (let j=-Config.etherFOV;j<Config.etherFOV;j++) {
              for (let k=-Config.etherFOV;k<Config.etherFOV;k++) {
                newx = -Math.sin(toRadians(ya+k)) * Math.cos(toRadians(pi)) * i
                newy = -Math.sin(toRadians(pi+j)) * i
                newz = Math.cos(toRadians(ya-k)) * Math.cos(toRadians(pi)) * i
                let BlockBlock = new BlockPos(Math.floor(px+newx),Math.floor(py+newy),Math.floor(pz+newz))
                b = (World.getBlockStateAt(BlockBlock))
                if (b == "minecraft:diamond_block") {
                  etherthingy(BlockBlock)
                  return
                }
              } 
            }
          }
        }
      }
    }
  }
})

let getEyePos = () => {
  return {x:Player.getX(), y:Player.getY()+Player.getPlayer().func_70047_e(), z:Player.getZ()};
}
let lookAtBlock = (blcPos,plrPos) => {
  if (!plrPos) plrPos=getEyePos();
  var d = {x:blcPos.x-plrPos.x,y:blcPos.y-plrPos.y,z:blcPos.z-plrPos.z};
  var yaw = 0;
  var pitch = 0;
  if (d.x != 0) {
      if (d.x < 0) { yaw = 1.5 * Math.PI; } else { yaw = 0.5 * Math.PI; }
      yaw = yaw - Math.atan(d.z / d.x);
  } else if (d.z < 0) { yaw = Math.PI; }
  d.xz = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.z, 2));
  pitch = -Math.atan(d.y / d.xz);
  yaw = -yaw * 180 / Math.PI;
  pitch = pitch * 180 / Math.PI;
  if (pitch<-90||pitch>90||isNaN(yaw)||isNaN(pitch)||yaw==null||pitch==null|yaw==undefined||pitch==null) return;
  if (plrPos.x < blcPos.x && plrPos.z > blcPos.z) {
    lookAt(yaw+1,pitch-1);
  } else if (plrPos.x > blcPos.x && plrPos.z < blcPos.z){
    lookAt(yaw-1,pitch-1);
  } else {
    lookAt(yaw,pitch-1);
  }
}
let lookAt = (yaw,pitch) => {
  yaw = Math.floor(yaw);
  yawD = yaw - Math.floor(Player.getYaw());

  pitch = Math.floor(pitch);
  pitchD = pitch - Math.floor(Player.getPitch());

  
  if(yawD < -180) yawD += 360;
  new Thread(() => {
    for(i = (yawD >= 0 ? 0 : yawD); i < (yawD >= 0 ? yawD : 0); i++) {
      Player.getPlayer().field_70177_z += (yawD >= 0 ? 1 : -1);
      Thread.sleep(10);
    }

    for(i = (pitchD >= 0 ? 0 : pitchD); i < (pitchD >= 0 ? pitchD : 0); i++) {
      Player.getPlayer().field_70125_A += (pitchD >= 0 ? 1 : -1);
      Thread.sleep(10);
    }
  }).start();
}

//lookAtBlock({x:0,y:50,z:0})

function etherthingy(b) {
  if (new Date().getTime() - lastblock > 1000) {
    new Thread(() => {
      lookAtBlock(b)
      ChatLib.chat(prefix + " &bFound etherwarp block!")
    }).start()
  }
}

unmutetime = 1668899146917+315160000
function dhm (ms) {
  const days = Math.floor(ms / (24*60*60*1000));
  const daysms = ms % (24*60*60*1000);
  const hours = Math.floor(daysms / (60*60*1000));
  const hoursms = ms % (60*60*1000);
  const minutes = Math.floor(hoursms / (60*1000));
  const minutesms = ms % (60*1000);
  const sec = Math.floor(minutesms / 1000);
  return days + "d " + hours + "h " + minutes + "m " + sec + "s";
}

register("command", () => {
  t = unmutetime - new Date().getTime()
  ChatLib.chat(`${prefix} &bbestie bonsai will be unmuted in ${dhm(t)}`)
}).setName("unmute")




























// DEV COMMANDS

// SWITCH ENCHANT FOR SWARM COUNTER COMMAND
register("command", (...args) => {
  if (Player.getName() == 'freebonsai') {
    if (args.length > 1) {
      swarmname = args[0] + " " + args[1] + " "
      console.log("changed to " + args[0] + " " + args[1] + " ")
    } else {
      swarmname = "Swarm "
      console.log("changed back to swarm")
    }
  }
}).setName("switchench")

// SIMULATE CHAT MESSAGE COMMAND
register("command", (...args) => {
  if (Player.getName() == 'freebonsai') {
    let msg = ""
    for (let i=0;i<args.length;i++) {
      if (args.length > i+1) {
        msg += args[i] + " "
      } else {
        msg += args[i]
      }
    }
    ChatLib.simulateChat(msg)
  }
}).setName("bosim")

register("command", (i) => {
  tab = TabList.getNames()
  sEl = tab[67]
  s1 = sEl.charAt(15)
  s2 = sEl.charAt(16)
  s3 = sEl.charAt(17)
  s=s1+s2+s3
  s*=1
  ChatLib.chat(prefix + " &bCurrent speed: &r" + s)
}).setName("getspeed")