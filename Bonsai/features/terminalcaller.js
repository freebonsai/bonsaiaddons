import Config from "../Config"
import Dungeon from "../../BloomCore/dungeons/Dungeon"

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