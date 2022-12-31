import { prefix } from "./prefix"
register("step", () => {
    usage = Client.getMemoryUsage()
    if (usage > 70) {
        ChatLib.chat(`${prefix} &bMemory usage is &c${usage}%! &b/clearlag might help. Consider restarting your game`)
        World.playSound("random.break", 1, 1);
    }
}).setDelay(300)

register("command", () => {
    java.lang.System.gc()
    ChatLib.chat(`${prefix} &bCleared lag`)
}).setName("clearlag")