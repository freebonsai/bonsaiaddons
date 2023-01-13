import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { prefix } from "../utils/prefix"
import Config from "../Config"
import { settings } from "../commands/gui"

// Counter
//#region 
names = []
name1 = ""
name2 = ""
name3 = ""
name4 = ""
name5 = ""
tcount1 = 0
tcount2 = 0
tcount3 = 0
tcount4 = 0
tcount5 = 0
dcount1 = 0
dcount2 = 0
dcount3 = 0
dcount4 = 0
dcount5 = 0
register("chat", (name,time) => {
  if (!names.includes(name)) {
    names.push(name)
    if (name1.length < 1) {
      name1 = name
      tcount1++
    } else if (name2.length < 1) {
      name2 = name
      tcount2++
    } else if (name3.length < 1) {
      name3 = name
      tcount3++
    } else if (name4.length < 1) {
      name4 = name
      tcount4++
    } else if (name5.length < 1) {
      name5 = name
      tcount5++
    }
  } else {
    if (name == name1) {
      tcount1++
    } else if (name == name2) {
      tcount2++
    } else if (name == name3) {
      tcount3++
    } else if (name == name4) {
      tcount4++
    } else if (name == name5) {
      tcount5++
    }
  }
}).setChatCriteria("${name} activated a terminal! ${time}")

let lastdev = new Date().getTime()-1000
register("chat", (name,time) => {
  if (new Date().getTime() - lastdev > 200) {
    if (!names.includes(name)) {
      names.push(name)
      if (name1.length < 1) {
        name1 = name
        dcount1++
      } else if (name2.length < 1) {
        name2 = name
        dcount2++
      } else if (name3.length < 1) {
        name3 = name
        dcount3++
      } else if (name4.length < 1) {
        name4 = name
        dcount4++
      } else if (name5.length < 1) {
        name5 = name
        dcount5++
      }
    } else {
      if (name == name1) {
        dcount1++
      } else if (name == name2) {
        dcount2++
      } else if (name == name3) {
        dcount3++
      } else if (name == name4) {
        dcount4++
      } else if (name == name5) {
        dcount5++
      }
    }
    lastdev = new Date().getTime()
  }
}).setChatCriteria("${name} completed a device! ${time}")


register("chat", () => {
  if (settings.Dungeons[8]) {
    ChatLib.chat(`${prefix} &6${name1} &bdid &a${tcount1} &bterms and &a${dcount1} &bdevices`)
    addtolog(name1,tcount1,dcount1)
    if (name2.length >= 2) {
      ChatLib.chat(`${prefix} &6${name2} &bdid &a${tcount2} &bterms and &a${dcount2} &bdevices`)
      addtolog(name2,tcount2,dcount2)
    }
    if (name3.length >= 3) {
      ChatLib.chat(`${prefix} &6${name3} &bdid &a${tcount3} &bterms and &a${dcount3} &bdevices`)
      addtolog(name3,tcount3,dcount3)
    }
    if (name4.length >= 4) {
      ChatLib.chat(`${prefix} &6${name4} &bdid &a${tcount4} &bterms and &a${dcount4} &bdevices`)
      addtolog(name4,tcount4,dcount4)
    }
    if (name5.length >= 5) {
      ChatLib.chat(`${prefix} &6${name5} &bdid &a${tcount5} &bterms and &a${dcount5} &bdevices`)
      addtolog(name5,tcount5,dcount5)
    }
  }
  names = []
  name1 = ""
  name2 = ""
  name3 = ""
  name4 = ""
  name5 = ""
  tcount1 = 0
  tcount2 = 0
  tcount3 = 0
  tcount4 = 0
  tcount5 = 0
  dcount1 = 0
  dcount2 = 0
  dcount3 = 0
  dcount4 = 0
  dcount5 = 0
}).setChatCriteria("[BOSS] Goldor: You have done it, you destroyed the factory…")

register("WorldLoad", () => {
  names = []
  name1 = ""
  name2 = ""
  name3 = ""
  name4 = ""
  name5 = ""
  tcount1 = 0
  tcount2 = 0
  tcount3 = 0
  tcount4 = 0
  tcount5 = 0
  dcount1 = 0
  dcount2 = 0
  dcount3 = 0
  dcount4 = 0
  dcount5 = 0
})

register("tick", () => {
  if (!Dungeon.inDungeon) {
      names = []
      name1 = ""
      name2 = ""
      name3 = ""
      name4 = ""
      name5 = ""
      tcount1 = 0
      tcount2 = 0
      tcount3 = 0
      tcount4 = 0
      tcount5 = 0
      dcount1 = 0
      dcount2 = 0
      dcount3 = 0
      dcount4 = 0
      dcount5 = 0
  }
})

function addtolog(n,t,d) {
  if (!FileLib.exists("bonsaidata", "termLogs.json")) FileLib.write("bonsaidata", "termLogs.json", "[]")
  let data = {
    "n": n.toLowerCase(),
    "t": t,
    "d": d
  }
  let logs = JSON.parse(FileLib.read("bonsaidata", "termLogs.json"))
  logs.push(data)
  FileLib.write("bonsaidata", "termLogs.json", JSON.stringify(logs))
}

register("command", (name) => {
  if (name) {
    termcount = 0
    devcount = 0
    runcount = 0
    let logs = JSON.parse(FileLib.read("bonsaidata", "termLogs.json"))
    for (let i=0;i<logs.length;i++) {
      if (name.toLowerCase() == logs[i].n) {
        runcount++
        termcount+=logs[i].t*1
        devcount+=logs[i].d*1
      }
    }
    if (runcount > 0) {
      ChatLib.chat(`&5&m${ChatLib.getChatBreak(" ")}`)
      ChatLib.chat(`${prefix} &bTotal runs with &a${name}&b: &d${runcount}`)
      ChatLib.chat(`${prefix} &bTotal terms gotten by &a${name}&b: &d${termcount}`)
      ChatLib.chat(`${prefix} &bTotal devices gotten by &a${name}&b: &d${devcount}`)
      ChatLib.chat(`${prefix} &bAverage terms gotten by &a${name}&b: &d${Math.round(termcount/runcount)}`)
      ChatLib.chat(`${prefix} &bAverage devices gotten by &a${name}&b: &d${Math.round(devcount/runcount)}`)
      ChatLib.chat(`&5&m${ChatLib.getChatBreak(" ")}`)
    } else {
      ChatLib.chat(`${prefix} &cNo runs logged with this player`)
    }
  } else {
    ChatLib.chat(`${prefix} &bInvalid arguments! Use &c/termlogs (name)`)
  }
}).setName("termlogs").setAliases("tlogs","tlog","tl")