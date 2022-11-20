import Config from "../Config"
import { data } from "../data/data"

var tDisplay = new Display();
var mtDisplay = new Display();
mtDisplay.setAlign("center")
mtDisplay.setRenderLoc(Renderer.screen.getWidth()/2, 30)
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