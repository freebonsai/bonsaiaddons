import WebSocket from "../../WebSocket"
const ws = new WebSocket("wss://irc.bonsai.xyz")

const serverId = java.util.UUID.randomUUID().toString().replace("-", "")
Client.getMinecraft().func_152347_ac().joinServer(Client.getMinecraft().func_110432_I().func_148256_e(), Client.getMinecraft().func_110432_I().func_148254_d(), serverId)

ws.onMessage = message => {
    const json = JSON.parse(message.toString())

    if (json.success) {
        ChatLib.chat("§8[§9IRC§8] §2Logged in successfully!")
        reconnected = false
    }
    else if (json.method == "message") {
        ChatLib.chat(json)
    }
    else if (json.method == "online") ChatLib.chat(`§8[§9IRC§8] §aOnline (§6${ json.users.length }§a)§8: §b${ json.users.map(user => "§b" + user).join("§8, ") }`)
    else if (json.method == "heartbeat") ws.send(JSON.stringify({ method: "heartbeat" }))
}