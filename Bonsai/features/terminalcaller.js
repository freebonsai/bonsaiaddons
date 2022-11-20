import Config from "../Config"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { data } from "../data/data"

var tDisplay = new Display();
var mtDisplay = new Display();
mtDisplay.setAlign("center")
mtDisplay.setRenderLoc(Renderer.screen.getWidth()/2, 30)

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