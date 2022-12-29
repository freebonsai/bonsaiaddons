import { prefix } from "../utils/prefix"

register("command", () => {
    console.log(new Date().getTime())
}).setName("gettime")

function dhm(t){
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000)
  if( m === 60 ){
    h++
    m = 0
  }
  if( h === 24 ){
    d++
    h = 0
  }
  return `${d} days, ${h} hours and ${m} minutes`
}

register("command", () => {
    timeuntil = 1673278481938 - new Date().getTime()
    ChatLib.chat(`${prefix} &bVeimo is unbanned in ${dhm(timeuntil)}`)
}).setName("veimo")

register("command", () => {
    timeuntil = 1673387321938 - new Date().getTime()
    ChatLib.chat(`${prefix} &bVesomaina is unbanned in ${dhm(timeuntil)}`)
}).setName("veso")