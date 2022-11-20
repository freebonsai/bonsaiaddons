import Config from "../Config"
import { prefix } from "../utils/prefix"
import toRadians from "../utils/toradians"
import Dungeon from "../../BloomCore/dungeons/Dungeon"

let lastblock = new Date().getTime()-1000
register("clicked", (a,c,btn) => {
  if (btn == 0) {
    if (Config.etherHelper) {
      if (Dungeon.inDungeon) {
        if (Player.isSneaking()) {
          ya = Player.getYaw()
          pi = Player.getPitch()
          px = Player.getX()
          py = Player.getY()
          pz = Player.getZ()
          for (let i=10;i<Config.etherDist;i++) {
            for (let j=-Config.etherFOV;j<Config.etherFOV;j++) {
              for (let k=-Config.etherFOV;k<Config.etherFOV;k++) {
                newx = -Math.sin(toRadians(ya+k)) * Math.cos(toRadians(pi)) * i
                newy = -Math.sin(toRadians(pi+j)) * i
                newz = Math.cos(toRadians(ya-k)) * Math.cos(toRadians(pi)) * i
                let BlockBlock = new BlockPos(Math.floor(px+newx),Math.floor(py+newy),Math.floor(pz+newz))
                b = (World.getBlockStateAt(BlockBlock))
                if (b == "minecraft:diamond_block") {
                  etherthingy(BlockBlock)
                  return
                }
              } 
            }
          }
        }
      }
    }
  }
})

let getEyePos = () => {
  return {x:Player.getX(), y:Player.getY()+Player.getPlayer().func_70047_e(), z:Player.getZ()};
}
let lookAtBlock = (blcPos,plrPos) => {
  if (!plrPos) plrPos=getEyePos();
  var d = {x:blcPos.x-plrPos.x,y:blcPos.y-plrPos.y,z:blcPos.z-plrPos.z};
  var yaw = 0;
  var pitch = 0;
  if (d.x != 0) {
      if (d.x < 0) { yaw = 1.5 * Math.PI; } else { yaw = 0.5 * Math.PI; }
      yaw = yaw - Math.atan(d.z / d.x);
  } else if (d.z < 0) { yaw = Math.PI; }
  d.xz = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.z, 2));
  pitch = -Math.atan(d.y / d.xz);
  yaw = -yaw * 180 / Math.PI;
  pitch = pitch * 180 / Math.PI;
  if (pitch<-90||pitch>90||isNaN(yaw)||isNaN(pitch)||yaw==null||pitch==null|yaw==undefined||pitch==null) return;
  if (plrPos.x < blcPos.x && plrPos.z > blcPos.z) {
    lookAt(yaw+1,pitch-1);
  } else if (plrPos.x > blcPos.x && plrPos.z < blcPos.z){
    lookAt(yaw-1,pitch-1);
  } else {
    lookAt(yaw,pitch-1);
  }
}
let lookAt = (yaw,pitch) => {
  yaw = Math.floor(yaw);
  yawD = yaw - Math.floor(Player.getYaw());

  pitch = Math.floor(pitch);
  pitchD = pitch - Math.floor(Player.getPitch());

  
  if(yawD < -180) yawD += 360;
  new Thread(() => {
    for(i = (yawD >= 0 ? 0 : yawD); i < (yawD >= 0 ? yawD : 0); i++) {
      Player.getPlayer().field_70177_z += (yawD >= 0 ? 1 : -1);
      Thread.sleep(10);
    }

    for(i = (pitchD >= 0 ? 0 : pitchD); i < (pitchD >= 0 ? pitchD : 0); i++) {
      Player.getPlayer().field_70125_A += (pitchD >= 0 ? 1 : -1);
      Thread.sleep(10);
    }
  }).start();
}

//lookAtBlock({x:0,y:50,z:0})

function etherthingy(b) {
  if (new Date().getTime() - lastblock > 1000) {
    new Thread(() => {
      lookAtBlock(b)
      ChatLib.chat(prefix + " &bFound etherwarp block!")
    }).start()
  }
}