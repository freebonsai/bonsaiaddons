
let lastpower
let lastperson
register("chat", (person,time) => {
    currentTime = new Date().getTime()
    if (currentTime - lastpower < 2000 && person == lastperson) {
        Client.showTitle("&cBOMB GAVE POWER","HOLY SHIT",6,60,6)
        World.playSound("random.break", 1, 1)
    }
    lastpower = currentTime
    lastperson = person
}).setChatCriteria("DUNGEON BUFF! ${person} found a Blessing of Power V${time}")