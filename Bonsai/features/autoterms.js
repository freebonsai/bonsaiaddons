import Config from "../Config"

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
const colorOrder = [1, 4, 13, 11, 14]
const isEnchanted = (slot) => Player.getContainer()?.getStackInSlot(slot)?.isEnchanted()
const getInvItemsTo = (endIndex) => Array.from(Array(endIndex).keys()).filter(a => Player.getContainer().getStackInSlot(a))
const filterPanesWithMeta = (array, meta) => array.filter(a => Player.getContainer().getStackInSlot(a).getRegistryName() == "minecraft:stained_glass_pane" && Player.getContainer().getStackInSlot(a).getMetadata() == meta) 
const filterPanesWithoutMeta = (array, meta) => array.filter(a => Player.getContainer().getStackInSlot(a).getRegistryName() == "minecraft:stained_glass_pane" && Player.getContainer().getStackInSlot(a).getMetadata() !== meta) 
const getStackFromIndex = (index) => Player.getContainer().getStackInSlot(index)
const sortStackSize = (array) => array.sort((a, b) => getStackFromIndex(a).getStackSize() - getStackFromIndex(b).getStackSize())
const fixColor = (itemName) => {
  Object.keys(colorReplacements).map(a => itemName = itemName.toLowerCase().replace(new RegExp(`^${a}`), colorReplacements[a]))
  return itemName
}
const sv = 20

let inTerm = false
let q = []
function clickQueue() {
  let inv = Player.getContainer();
  new Thread(() => {
    for (let i = q.length-1; i >= 0; i--) {
      if (Config.autoClickType == 0) {
        inv.click(q[i],false,"LEFT")
      } else if (Config.autoClickType == 1) {
        inv.click(q[i],false,"MIDDLE")
      } else if (Config.autoClickType == 2) {
        inv.click(q[i],true,"LEFT")
      }
      s = Math.floor(Math.random() * sv) + Config.autoTermDelay-(sv/2)
      if (s < 0) s = 10
      Thread.sleep(s)
    }
    q = []
  }).start()
}

register('tick', () => {
  if (Config.autoTerms && !inTerm) {
    let inv = Player.getContainer();
    let n = inv.getName();
    // "Correct all the panes!"
    if (n == "Correct all the panes!") {
      if (Config.panes) {
        inTerm = true
        tobesolved = filterPanesWithMeta(getInvItemsTo(45), 14)
        for (let i = 0; i < tobesolved.length; i++) {
          q.push(tobesolved[i])
        }
        clickQueue()
      }
    }
    //rubix
    if (n == "Change all to same color!") {
      if (Config.rubix) {
        inTerm = true
        tobesolved = colorOrder.map((v, i) => filterPanesWithoutMeta(getInvItemsTo(45), 15).map(a => Array(Math.abs(colorOrder.length-1 - (colorOrder.indexOf(inv.getStackInSlot(a).getMetadata())+i)%colorOrder.length)).fill(a)).reduce((a, b) => a.concat(b), [])).sort((a, b) => a.length - b.length)[0]
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
    q = []
  }
});