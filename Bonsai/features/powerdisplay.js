import { settings,powerdisplaymove } from "../commands/gui"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { data } from "../data/data"

var pDisplay = new Display()

atLine = 0
register("step", () => {
  if (!Dungeon.inDungeon) {
    pDisplay.clearLines()
    return
  }
  if (!settings.Dungeons[9]) {
    pDisplay.clearLines()
    return
  }
  if (powerdisplaymove.isOpen()) {
    pDisplay.clearLines()
    return
  }
  pDisplay.setRenderLoc(data.powerDisplay.x, data.powerDisplay.y)
  footer = TabList.getFooter().removeFormatting()
  match = footer.match(/Blessing of Power (.+)/)
  if (match) {
    let [_, power] = match
    pDisplay.setLine(atLine,`&cPower&r: &a${romanToInt(power)}`)
    atLine++
  }
  match = footer.match(/Blessing of Time (.+)/)
  if (match) {
    let [msg, time] = match
    pDisplay.setLine(atLine,`&cT&6i&am&1e&r: &a${romanToInt(time)}`)
    atLine++
  }
  for (let i = 0; i < atLine; i++) {
    pDisplay.getLine(i).setScale(data.powerDisplay.scale/100).setShadow(true)
  }
  atLine = 0
}).setDelay(1)

const romanHash = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};
function romanToInt(s) {
  let accumulator = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "I" && s[i + 1] === "V") {
      accumulator += 4;
      i++;
    } else if (s[i] === "I" && s[i + 1] === "X") {
      accumulator += 9;
      i++;
    } else if (s[i] === "X" && s[i + 1] === "L") {
      accumulator += 40;
      i++;
    } else if (s[i] === "X" && s[i + 1] === "C") {
      accumulator += 90;
      i++;
    } else if (s[i] === "C" && s[i + 1] === "D") {
      accumulator += 400;
      i++;
    } else if (s[i] === "C" && s[i + 1] === "M") {
      accumulator += 900;
      i++;
    } else {
      accumulator += romanHash[s[i]];
    }
  }
  return accumulator;
}