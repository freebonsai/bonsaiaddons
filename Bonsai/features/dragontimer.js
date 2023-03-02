import { settings } from "../commands/gui"
import { data } from "../data/data"

let window = []
window["orangetime"] = null
window["redtime"] = null
window["greentime"] = null
window["bluetime"] = null
window["purpletime"] = null
const colors = {
    "orangetime": {x: [82, 88], y: [15, 22], z: [53, 59]},
    "redtime": {x: [24, 30], y: [15, 22], z: [56, 62]},
    "greentime": {x: [23, 29], y: [15, 22], z: [91, 97]},
    "purpletime": {x: [53, 59], y: [15, 22], z: [122, 128]},
    "bluetime": {x: [82, 88], y: [15, 22], z: [91, 97]},
}

function checkParticle(particle, color) {
    const [x, y, z] = [particle.x,particle.y,particle.z];
    return x >= colors[color].x[0] && x <= colors[color].x[1] && y >= colors[color].y[0] && y <= colors[color].y[1] && z >= colors[color].z[0] && z <= colors[color].z[1];
}

register("spawnParticle", (particle, type, event) => {
    if (type.toString() !== "FLAME") return;
    Object.keys(colors).forEach((color) => {
        if(checkParticle(particle, color) && window[color] === null){
            window[color] = new Date().getTime();
        }
    });
});
dragonspawntime = 5000
dDisplay = new Display()
atLine = 0
register("step", () => {
    if (!settings.Dungeons[10]) return
    currentTime = new Date().getTime()
    dDisplay.setRenderLoc(data.dragonTimer.x, data.dragonTimer.y)
    const dragonColors = ["orange", "red", "green", "blue", "purple"];
    const colorCodes = ["6","c","a","b","5"]
    for (let i = 0; i < dragonColors.length; i++) {
        color = dragonColors[i];
        time = window[`${color}time`];
        if (time !== null) {
            if (currentTime - time < dragonspawntime) {
                const spawnTime = dragonspawntime - (currentTime - time);
                let colorCode;
                if (spawnTime <= 1000) {
                    colorCode = "&c";
                } else if (spawnTime <= 3000) {
                    colorCode = "&e";
                } else {
                    colorCode = "&a";
                }
                dDisplay.setLine(atLine, `&${colorCodes[i]}${color.charAt(0).toUpperCase() + color.slice(1)} spawning in&r: ${colorCode}${spawnTime}ms`)
                atLine++
            } else {
                window[`${color}time`] = null;
            }
        }
    }
    for (let i = 0; i < atLine; i++) {
        dDisplay.getLine(i).setScale(data.dragonTimer.scale/100).setShadow(true)
    }
    atLine = 0
}).setFps(60)

register("step", () => {
    dDisplay.clearLines()
}).setFps(2)

register("worldLoad", () => {
    window["orangetime"] = null
    window["redtime"] = null
    window["greentime"] = null
    window["bluetime"] = null
    window["purpletime"] = null
    dDisplay.clearLines()
})

register("command", () => {
    ChatLib.command("particle flame 84 18 95 1 1 1 1 100")
    ChatLib.command("particle flame 57 18 125 1 1 1 1 100")
    ChatLib.command("particle flame 26 18 95 1 1 1 1 100")
    ChatLib.command("particle flame 27 18 60 1 1 1 1 100")
    ChatLib.command("particle flame 84 18 56 1 1 1 1 100")
}).setName("testdragons")
