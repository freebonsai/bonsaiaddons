import { prefix } from "../utils/prefix"

register("command", (i) => {
  tab = TabList.getNames()
  sEl = tab[67]
  s1 = sEl.charAt(15)
  s2 = sEl.charAt(16)
  s3 = sEl.charAt(17)
  s=s1+s2+s3
  s*=1
  ChatLib.chat(prefix + " &bCurrent speed: &r" + s)
}).setName("getspeed")