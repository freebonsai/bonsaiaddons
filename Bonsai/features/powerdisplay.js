import { settings,powerdisplaymove } from "../commands/gui"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { data } from "../data/data"

var pDisplay = new Display()
const updatePowerDisplay = () => {
  if (!Dungeon.inDungeon || !settings.Dungeons[9] || powerdisplaymove.isOpen()) {
    pDisplay.clearLines();
    return;
  }
  atLine = 0;
  const footer = TabList.getFooter().removeFormatting();
  const blessings = {
    power: /Blessing of Power (.+)/,
    time: /Blessing of Time (.+)/
  };
  pDisplay.setRenderLoc(data.powerDisplay.x, data.powerDisplay.y);
  Object.entries(blessings).forEach(([name, pattern]) => {
    const match = footer.match(pattern);
    if (match) {
      const [, value] = match;
      (name == "power") ? pDisplay.setLine(atLine,`&cPower&r: &a${romanToInt(value)}`) : pDisplay.setLine(atLine,`&cT&6i&am&1e&r: &a${romanToInt(value)}`)
      atLine++;
    }
  });
  for (let i = 0; i < atLine; i++) {
    pDisplay.getLine(i)
      .setScale(data.powerDisplay.scale / 100)
      .setShadow(true);
  }
};

register("step", updatePowerDisplay).setFps(10);

const romanHash = {
  I: 1,
  V: 5,
  X: 10
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
    } else {
      accumulator += romanHash[s[i]];
    }
  }
  return accumulator;
}