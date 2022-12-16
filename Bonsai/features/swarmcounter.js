import Config from "../Config"
import { data } from "../data/data"
import { settings } from "../commands/gui"

const EntityMob = Java.type("net.minecraft.entity.monster.EntityMob").class;

// SWARM COUNTER VARIABLES AND SETUP
let counter = 0
var cDisplay = new Display();
var mDisplay = new Display();
mDisplay.setRenderLoc(Renderer.screen.getWidth()/2, 30)
mDisplay.setAlign("center")
mDisplay.setMinWidth(100)
swarmlevel = 0
swarmname = "Swarm "

// SWARM COUNTER MAIN FUNCTION
register("tick", () => {
  cDisplay.setRenderLoc(data.swarmCounter.x, data.swarmCounter.y)
  if (settings.General[2]) {
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
              cDisplay.setLine(0, "&5&lSwarm Mobs:&6&l " + counter + ": &c&l" + counter*swarmlevel*2 + "%  ")
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
      cDisplay.setLine(0, "&5&lSwarm Mobs:&6&l " + counter + ": &c&l" + counter*10 + "%  ")
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
      if(!lore.includes(swarmname) && !Config.swarmCounterMove.isOpen()){
        cDisplay.clearLines()
      }
    })
  } catch (error) {
    if (!Config.swarmCounterMove.isOpen()) {
      cDisplay.clearLines()
    }
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