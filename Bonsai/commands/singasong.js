import Config from "../Config"
import { song } from "../data/song"
import { settings } from "../commands/gui"

register("command", () => {if (settings.General[1]) {new Thread(() => {for (let i = 0; i < song.length; i++) {ChatLib.say(song[i]); Thread.sleep(Config.songsleep)}}).start()}}).setName("singasong")