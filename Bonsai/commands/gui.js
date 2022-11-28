import Config from "../Config"

register("command", (args) => 
  Config.openGUI()
).setName("bonsai").setAliases("bo", "bonsaiaddons");

register("tick", () => {
  if (Config.presetgui.isOpen()) {
    Config.presetgui.close()
  }
})