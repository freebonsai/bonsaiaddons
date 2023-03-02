import request from "../../requestV2"
import { prefix } from "../utils/prefix";

// yummy stealing soopy code

function modMessage(t) { ChatLib.chat(`${prefix} &b${t}`) }


function getDungeoneeringLevel(xp) {
    let a = getLevelByXp(xp, 2, 50);

    return a.level + a.progress;
}

function getLevelByXp(xp, type, levelCap) {
    let xp_table =
        type == 1 ?
            someData.runecrafting_xp :
            type == 2 ?
                someData.dungeoneering_xp :
                someData.leveling_xp;

    if (isNaN(xp)) {
        return {
            xp: 0,
            level: 0,
            xpCurrent: 0,
            xpForNext: xp_table[1],
            progress: 0,
        };
    }

    let xpTotal = 0;
    let level = 0;

    let xpForNext = Infinity;

    let maxLevel = Math.min(levelCap, Object.keys(xp_table)
        .sort((a, b) => Number(a) - Number(b))
        .map((a) => Number(a))
        .pop())

    for (let x = 1; x <= maxLevel; x++) {
        xpTotal += xp_table[x];

        if (xpTotal > xp) {
            xpTotal -= xp_table[x];
            break;
        } else {
            level = x;
        }
    }

    let xpCurrent = Math.floor(xp - xpTotal);

    if (level < maxLevel) xpForNext = Math.ceil(xp_table[level + 1]);

    let progress = Math.max(0, Math.min(xpCurrent / xpForNext, 1));

    return {
        xp,
        level,
        maxLevel,
        xpCurrent,
        xpForNext,
        progress,
    };
}

register("command", (user) => {
    getClassRunsLeft(user)
}).setName("ca")

const mToHrAndMin = (min) => {
    if (min > 60) {
        let hours = Math.floor(min / 60)
        let minutes = (min % 60).toFixed(0)
        return `${hours}h ${minutes}m`
    } else {
        return `${min}m`
    }
}

function getClassRunsLeft(user, classAvgNeeded = 50) {
    let xpPer = 315000
    let uuidData
    request("https://soopy.dev/api/v2/player/" + user).then(stuff => {
        uuidData = JSON.parse(stuff)
        request("https://soopy.dev/api/v2/player_skyblock/" + (uuidData.data.uuid)).then(stuff2 => {
            data2 = JSON.parse(stuff2)
            if (!data2.data.stats.currentProfileId) {
                return "That player has not joined skyblock!"
            }

            let dungeonsData = data2.data.profiles[data2.data.stats.bestProfileId].members[uuidData.data.uuid].dungeons

            let tempClassData = JSON.parse(JSON.stringify(dungeonsData.class_levels))
            let runs = 0

            function getClassAverage(data) {
                return Object.values(data).map(a => getDungeoneeringLevel(a.xp)).reduce((a, b) => a + b, 0) / Object.keys(data).length
            }

            let classAvg = getClassAverage(tempClassData)

            let runsDone = {}

            while (classAvg < classAvgNeeded) {
                runs++
                let tempClassPlaying
                Object.keys(tempClassData).forEach(key => {
                    tempClassData[key].xp += xpPer * 0.25
                    if (tempClassData[key].xp < (tempClassData[tempClassPlaying]?.xp || Infinity)) {
                        tempClassPlaying = key
                    }
                })

                tempClassData[tempClassPlaying].xp += xpPer * 0.75

                runsDone[tempClassPlaying] = (runsDone[tempClassPlaying] || 0) + 1

                classAvg = getClassAverage(tempClassData)

                if (runs >= 50000) {
                    modMessage("Timed out (Over 50k runs)")
                    return
                }
            }

            let classLevels = {}

            Object.keys(runsDone).forEach(clas => {
                classLevels[clas] = getDungeoneeringLevel(dungeonsData.class_levels[clas].xp + runsDone[clas] * xpPer)
            })

            if (runsDone.archer) { archer = JSON.stringify(runsDone.archer) } else archer = 0
            if (runsDone.berserker) { berserker = JSON.stringify(runsDone.berserker) } else berserker = 0
            if (runsDone.mage) { mage = JSON.stringify(runsDone.mage) } else mage = 0
            if (runsDone.tank) { tank = JSON.stringify(runsDone.tank) } else tank = 0
            if (runsDone.healer) { healer = JSON.stringify(runsDone.healer) } else healer = 0
            total = parseInt(archer)+parseInt(berserker)+parseInt(mage)+parseInt(tank)+parseInt(healer)

            new Message(`&5&m${ChatLib.getChatBreak(" ")}\n`,
            new TextComponent(`${prefix} &bRuns needed for &a${user}&b: \n`),
            new TextComponent(`&cArcher: ${archer <= 150 ? "&a" : archer <= 250 ? "&e" : "&c"}${archer} - ${mToHrAndMin(archer*8)} \n`),
            new TextComponent(`&6Berserker: ${berserker <= 150 ? "&a" : berserker <= 250 ? "&e" : "&c"}${berserker} - ${mToHrAndMin(berserker*8)} \n`),
            new TextComponent(`&bMage: ${mage <= 150 ? "&a" : mage <= 250 ? "&e" : "&c"}${mage} - ${mToHrAndMin(mage*8)} \n`),
            new TextComponent(`&3Tank: ${tank <= 150 ? "&a" : tank <= 250 ? "&e" : "&c"}${tank} - ${mToHrAndMin(tank*8)} \n`),
            new TextComponent(`&aHealer: ${healer <= 150 ? "&a" : healer <= 250 ? "&e" : "&c"}${healer} - ${mToHrAndMin(healer*8)} \n`),
            new TextComponent(`&dTotal: ${total <= 300 ? "&a" : total <= 500 ? "&e" : "&c"}${total} - ${mToHrAndMin(total*8)}`),
            `\n&5&m${ChatLib.getChatBreak(" ")}`).chat()
        }).catch(error => console.log(error))
    }).catch(error => console.log(error))
}

let someData = {
    leveling_xp: {
        1: 50,
        2: 125,
        3: 200,
        4: 300,
        5: 500,
        6: 750,
        7: 1000,
        8: 1500,
        9: 2000,
        10: 3500,
        11: 5000,
        12: 7500,
        13: 10000,
        14: 15000,
        15: 20000,
        16: 30000,
        17: 50000,
        18: 75000,
        19: 100000,
        20: 200000,
        21: 300000,
        22: 400000,
        23: 500000,
        24: 600000,
        25: 700000,
        26: 800000,
        27: 900000,
        28: 1000000,
        29: 1100000,
        30: 1200000,
        31: 1300000,
        32: 1400000,
        33: 1500000,
        34: 1600000,
        35: 1700000,
        36: 1800000,
        37: 1900000,
        38: 2000000,
        39: 2100000,
        40: 2200000,
        41: 2300000,
        42: 2400000,
        43: 2500000,
        44: 2600000,
        45: 2750000,
        46: 2900000,
        47: 3100000,
        48: 3400000,
        49: 3700000,
        50: 4000000,
        51: 4300000,
        52: 4600000,
        53: 4900000,
        54: 5200000,
        55: 5500000,
        56: 5800000,
        57: 6100000,
        58: 6400000,
        59: 6700000,
        60: 7000000
    },

    // XP required for each level of Runecrafting
    runecrafting_xp: {
        1: 50,
        2: 100,
        3: 125,
        4: 160,
        5: 200,
        6: 250,
        7: 315,
        8: 400,
        9: 500,
        10: 625,
        11: 785,
        12: 1000,
        13: 1250,
        14: 1600,
        15: 2000,
        16: 2465,
        17: 3125,
        18: 4000,
        19: 5000,
        20: 6200,
        21: 7800,
        22: 9800,
        23: 12200,
        24: 15300,
        25: 19050,
    },

    dungeoneering_xp: {
        1: 50,
        2: 75,
        3: 110,
        4: 160,
        5: 230,
        6: 330,
        7: 470,
        8: 670,
        9: 950,
        10: 1340,
        11: 1890,
        12: 2665,
        13: 3760,
        14: 5260,
        15: 7380,
        16: 10300,
        17: 14400,
        18: 20000,
        19: 27600,
        20: 38000,
        21: 52500,
        22: 71500,
        23: 97000,
        24: 132000,
        25: 180000,
        26: 243000,
        27: 328000,
        28: 445000,
        29: 600000,
        30: 800000,
        31: 1065000,
        32: 1410000,
        33: 1900000,
        34: 2500000,
        35: 3300000,
        36: 4300000,
        37: 5600000,
        38: 7200000,
        39: 9200000,
        40: 12000000,
        41: 15000000,
        42: 19000000,
        43: 24000000,
        44: 30000000,
        45: 38000000,
        46: 48000000,
        47: 60000000,
        48: 75000000,
        49: 93000000,
        50: 116250000
    }
}