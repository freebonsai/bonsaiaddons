import { settings } from "../commands/gui"
register("chat", () => {for (let i = 0;i < Scoreboard.getLines().length;i++) {if (Scoreboard.getLines()[i].toString().includes("M7")) {if (settings.Dungeons[7]) {ChatLib.command("pc Mage drain then pad yellow")}}}}).setChatCriteria("[BOSS] Storm: I'd be happy to show you what that's like!")