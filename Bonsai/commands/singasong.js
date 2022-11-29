import Config from "../Config"
import { song } from "../data/song"

register("command", () => {
    if (Config.singasong) {
        new Thread(() => {
            for (let i = 0; i < song.length; i++) {
                ChatLib.say(song[i])
                Thread.sleep(Config.songsleep)
            }
        }).start()
    }
}).setName("singasong")