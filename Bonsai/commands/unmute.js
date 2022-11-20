import { prefix } from "../utils/prefix"

unmutetime = 1668899146917+315160000
function dhm (ms) {
  const days = Math.floor(ms / (24*60*60*1000));
  const daysms = ms % (24*60*60*1000);
  const hours = Math.floor(daysms / (60*60*1000));
  const hoursms = ms % (60*60*1000);
  const minutes = Math.floor(hoursms / (60*1000));
  const minutesms = ms % (60*1000);
  const sec = Math.floor(minutesms / 1000);
  return days + "d " + hours + "h " + minutes + "m " + sec + "s";
}

register("command", () => {
  t = unmutetime - new Date().getTime()
  ChatLib.chat(`${prefix} &bbestie bonsai will be unmuted in ${dhm(t)}`)
}).setName("unmute")
