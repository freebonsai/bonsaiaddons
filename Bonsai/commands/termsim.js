const resetTimerKeyBind = new KeyBind("Reset fishing timer", Keyboard.KEY_NONE, "Alon Addons");
const dungRepartyKeyBind = new KeyBind("Dungeon reparty", Keyboard.KEY_NONE, "Alon Addons");
const fragRun = new KeyBind("Frag run warp out", Keyboard.KEY_NONE, "Alon Addons");
const mc = Client.getMinecraft();
const glStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
const gL11 = Java.type("org.lwjgl.opengl.GL11");
const nBTTagList = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.inventory.nbt.NBTTagList")
const NBTTagString = Java.type("net.minecraft.nbt.NBTTagString")
const armorStandClass = Java.type('net.minecraft.entity.item.EntityArmorStand').class
const itemFrameClass = Java.type('net.minecraft.entity.item.EntityItemFrame').class
const KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");
const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement")
const AddPlayerData = Java.type("net.minecraft.network.play.server.S38PacketPlayerListItem$AddPlayerData")
const S38PacketPlayerListItem = Java.type("net.minecraft.network.play.server.S38PacketPlayerListItem")
const IChatComponent = Java.type("net.minecraft.util.IChatComponent")
const ChatComponentText = Java.type("net.minecraft.util.ChatComponentText")
const NetHandlerPlayClient = mc.func_147114_u()
const GameType = Java.type("net.minecraft.world.WorldSettings$GameType")
const blockPos = net.minecraft.util.BlockPos;
const GuiChest = Java.type('net.minecraft.client.gui.inventory.GuiChest');
const InventoryBasic = Java.type('net.minecraft.inventory.InventoryBasic');
const Settings = com.chattriggers.ctjs.minecraft.wrappers.Settings
const ItemStack = Java.type("net.minecraft.item.ItemStack")
const MCItem = Java.type("net.minecraft.item.Item")
const GuiConfirmOpenLink = Java.type("net.minecraft.client.gui.GuiConfirmOpenLink")
const GuiScreen = Java.type("net.minecraft.client.gui.GuiScreen")

let itemsHighlight = []
let itemsSolverHighlight = []
let lastMoveDirection = -1;
let lastSlot = -1;
let mazeEndSlot = -1;
let mazeSlotDirection = [-9, -1, +1, +9]
let terminalGreenPane = []
let terminalItemEnchant = []
let wrongColorList = {
    "light grey": "silver",
    "wool": "white wool",
    "ink": "black ink",
    "lapis": "blue lapis",
    "cocoa": "brown cocoa"
}

register("command", () => {
    openTerminalSim()
}).setName("opentermsim")
let alive = false
const BackgroundItemStack = new ItemStack(MCItem.func_150899_d(160), 1, 15).func_151001_c("")
const TermSimMenuDesign = [
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    new ItemStack(MCItem.func_150899_d(339), 1, 0).func_151001_c("§rWhat starts with: _?"),
    new ItemStack(MCItem.func_150899_d(351), 1, 6).func_151001_c("§rSelect all the ___ items!"),
    new ItemStack(MCItem.func_150899_d(160), 1, 14).func_151001_c("§rCorrect all the panes!"),
    new ItemStack(MCItem.func_150899_d(160), 1, 0).func_151001_c("§rNavigate the maze!"),
    new ItemStack(MCItem.func_150899_d(160), 1, 5).func_151001_c("§rClick in order!"),
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack,
    BackgroundItemStack
]

function openTerminalSim() {
    setTimeout(() => {
        alive = true
        const player = mc.field_71439_g; // thePlayer
        const inv = player.field_71071_by; // inventory
        const lower = new InventoryBasic('Terminal simulator', true, 3 * 9)
        const gui = new GuiChest(inv, lower);
        Client.currentGui.close()
        new Gui().open()
        while (!Client.isInGui()) {
            Thread.sleep(1)
        }
        mc.func_147108_a(gui); // displayGuiScreen
        for (let i = 0; i < 27; i++) {
            Player.getPlayer().field_71070_bA.func_75141_a(i, TermSimMenuDesign[i])
        }
        const onGuiKey = register("guiKey", (keyString, keyCode, gui, event) => {
            if (keyCode === Client.getMinecraft().field_71474_y.field_74316_C.func_151463_i()) {
                cancel(event)
            }
            else {
                Client.getMinecraft().field_71474_y.field_151456_ac.forEach((keybind) => {
                    if (keybind.func_151463_i() === keyCode) {
                        cancel(event)
                    }
                })
            }
        })
        const onGuiClick = register('guiMouseClick', (mouseX, mouseY, button, gui, e) => {
            // if (!alive) {
            //     onGuiKey.unregister()
            //     onGuiClick.unregister()
            //     return;
            // }
            let slot
            let position
            try {
                slot = gui.getSlotUnderMouse();
                position = slot.field_75222_d;
            } catch (e) {
                let inventory = Player.getContainer()
                let notNullCheck = false
                slot = 0
                while (slot < inventory.getSize() - 1) {
                    const x = slot % 9;
                    const y = Math.floor(slot / 9);
                    const renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18);
                    const renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - inventory.getSize() / 18) * 18);
                    if (mouseX > renderX - 10 && mouseX < renderX + 10
                        && mouseY > renderY - 10 && mouseY < renderY + 10) {
                        notNullCheck = true
                        break;
                    }
                    slot++
                }
                if (!notNullCheck) { return; }
                position = slot
            }
            if (!slot) return;
            cancel(e)
            if (position === 11) {
                WhatStartsWith()
            } else if (position === 12) {
                SelectAllThe()
            } else if (position === 13) {
                CorrectAllThePanes()
            } else if (position === 14) {
                NaviTheMaze()
            } else if (position === 15) {
                ClickInOrder()
            }
        })
        const onGuiExit = register('guiOpened', (e) => {
            onGuiKey.unregister()
            onGuiClick.unregister();
            onGuiExit.unregister();
        });
    }, 0);
}

const panesFalseOrTrueDesign = [
    new ItemStack(MCItem.func_150899_d(160), 1, 5).func_151001_c(""),
    new ItemStack(MCItem.func_150899_d(160), 1, 14).func_151001_c("")
]

function CorrectAllThePanes() {
    new Thread(() => {
        setTimeout(() => {
            alive = true;
            const player = mc.field_71439_g; // thePlayer
            const inv = player.field_71071_by; // inventory
            const lower = new InventoryBasic('Correct all the panes!', true, 5 * 9)
            const gui = new GuiChest(inv, lower);
            Client.currentGui.close()
            new Gui().open()
            while (!Client.isInGui()) {
                Thread.sleep(1)
            }
            mc.func_147108_a(gui); // displayGuiScreen

            for (let i = 0; i < 45; i++) {
                // Player.getPlayer().field_71070_bA.func_75141_a(i, TermSimMenuDesign[i])
                let zeroCount = 0
                if ((i > 10 && i < 16) || (i > 19 && i < 25) || (i > 28 && i < 34)) {
                    let j
                    if (zeroCount > 10) {
                        j = 1
                    }
                    else {
                        if (Math.random() < 0.25) {
                            j = 0
                            zeroCount++
                        }
                        else {
                            j = 1
                        }
                    }
                    Player.getPlayer().field_71070_bA.func_75141_a(i, panesFalseOrTrueDesign[j])
                }
                else {
                    Player.getPlayer().field_71070_bA.func_75141_a(i, BackgroundItemStack)
                }
            }
            const onGuiKey = register("guiKey", (keyString, keyCode, gui, event) => {
                if (keyCode === Client.getMinecraft().field_71474_y.field_74316_C.func_151463_i()) {
                    cancel(event)
                }
                else {
                    Client.getMinecraft().field_71474_y.field_151456_ac.forEach((keybind) => {
                        if (keybind.func_151463_i() === keyCode) {
                            cancel(event)
                        }
                    })
                }
            })
            const onGuiClick = register('guiMouseClick', (mouseX, mouseY, button, gui, e) => {
                if (!alive) {
                    onGuiKey.unregister()
                    onGuiClick.unregister()
                    return;
                }
                let slot
                let position
                try {
                    slot = gui.getSlotUnderMouse();
                    position = slot.field_75222_d;
                } catch (e) {
                    let inventory = Player.getOpenedInventory()
                    let notNullCheck = false
                    slot = 0
                    while (slot < inventory.getSize() - 1) {
                        const x = slot % 9;
                        const y = Math.floor(slot / 9);
                        const renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18);
                        const renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - inventory.getSize() / 18) * 18);
                        if (mouseX > renderX - 10 && mouseX < renderX + 10
                            && mouseY > renderY - 10 && mouseY < renderY + 10) {
                            notNullCheck = true
                            break;
                        }
                        slot++
                    }
                    if (!notNullCheck) { return; }
                    position = slot
                }
                if (!slot) return;
                cancel(e)
                if (Player.getOpenedInventory().getStackInSlot(position)?.getDamage() === 14) {
                    makeDingSound()
                    Player.getPlayer().field_71070_bA.func_75141_a(position, new ItemStack(MCItem.func_150899_d(160), 1, 5).func_151001_c(""))
                    let doKeepAlive = false
                    for (let i = 0; i < 45; i++) {
                        if ((i > 10 && i < 16) || (i > 19 && i < 25) || (i > 28 && i < 34)) {
                            if (Player.getOpenedInventory().getStackInSlot(i)?.getDamage() === 14) {
                                doKeepAlive = true
                            }
                        }
                    }
                    if (!doKeepAlive) {
                        alive = false
                        onGuiKey.unregister()
                        onGuiClick.unregister()
                        openTerminalSim()
                    }
                }
            })

            // const onGuiExit = register('guiOpened', (e) => {
            //     console.log(2)
            //     alive = false;
            //     onGuiClick.unregister();
            //     onGuiExit.unregister();
            // });

        }, 0);
    }).start()
}
function ClickInOrder() {
    new Thread(() => {
        setTimeout(() => {
            alive = true;
            const player = mc.field_71439_g; // thePlayer
            const inv = player.field_71071_by; // inventory
            const lower = new InventoryBasic('Click in order!', true, 4 * 9)
            const gui = new GuiChest(inv, lower);
            Client.currentGui.close()
            new Gui().open()
            while (!Client.isInGui()) {
                Thread.sleep(1)
            }
            mc.func_147108_a(gui); // displayGuiScreen
            let shuffledNumberList = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
            for (let i = 0; i < 36; i++) {
                // Player.getPlayer().field_71070_bA.func_75141_a(i, TermSimMenuDesign[i])
                if ((i > 9 && i < 17) || (i > 18 && i < 26)) {
                    let numberUsed = shuffledNumberList.shift()
                    Player.getPlayer().field_71070_bA.func_75141_a(i, new ItemStack(MCItem.func_150899_d(160), numberUsed, 14).func_151001_c(numberUsed))
                }
                else {
                    Player.getPlayer().field_71070_bA.func_75141_a(i, BackgroundItemStack)
                }
            }
            const onGuiKey = register("guiKey", (keyString, keyCode, gui, event) => {
                if (keyCode === Client.getMinecraft().field_71474_y.field_74316_C.func_151463_i()) {
                    cancel(event)
                }
                else {
                    Client.getMinecraft().field_71474_y.field_151456_ac.forEach((keybind) => {
                        if (keybind.func_151463_i() === keyCode) {
                            cancel(event)
                        }
                    })
                }
            })
            const onGuiClick = register('guiMouseClick', (mouseX, mouseY, button, gui, e) => {
                if (!alive) {
                    onGuiKey.unregister()
                    onGuiClick.unregister()
                    return;
                }
                let slot
                let position
                try {
                    slot = gui.getSlotUnderMouse();
                    position = slot.field_75222_d;
                } catch (e) {
                    let inventory = Player.getOpenedInventory()
                    let notNullCheck = false
                    slot = 0
                    while (slot < inventory.getSize() - 1) {
                        const x = slot % 9;
                        const y = Math.floor(slot / 9);
                        const renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18);
                        const renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - inventory.getSize() / 18) * 18);
                        if (mouseX > renderX - 10 && mouseX < renderX + 10
                            && mouseY > renderY - 10 && mouseY < renderY + 10) {
                            notNullCheck = true
                            break;
                        }
                        slot++
                    }
                    if (!notNullCheck) { return; }
                    position = slot
                }
                if (!slot) return;
                cancel(e)
                if (itemsHighlight.includes(position)) {
                    makeDingSound()
                    Player.getOpenedInventory().getStackInSlot(position).getItemStack().func_77964_b(5)
                    let doKeepAlive = false
                    for (let i = 0; i < 36; i++) {
                        if ((i > 9 && i < 17) || (i > 18 && i < 26)) {
                            if (Player.getOpenedInventory().getStackInSlot(i)?.getDamage() === 14) {
                                doKeepAlive = true
                            }
                        }
                    }
                    if (!doKeepAlive) {
                        alive = false
                        onGuiKey.unregister()
                        onGuiClick.unregister()
                        openTerminalSim()
                    }
                }
            })

            // const onGuiExit = register('guiOpened', (e) => {
            //     console.log(2)
            //     alive = false;
            //     onGuiClick.unregister();
            //     onGuiExit.unregister();
            // });

        }, 0);
    }).start()
}

function shuffle(array) {
    let currentIndex = array.length,
    temporaryValue, 
    randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
const WhiteGlassPane = new ItemStack(MCItem.func_150899_d(160), 1, 0).func_151001_c("")
const RedGlassPane = new ItemStack(MCItem.func_150899_d(160), 1, 14).func_151001_c("")
const GreenGlassPane = new ItemStack(MCItem.func_150899_d(160), 1, 5).func_151001_c("")
// MCItem.class.getDeclaredMethods().forEach((method) => {
//     console.log(method.getName())
// })
const mazeGUIhelper = [
    BackgroundItemStack,
    WhiteGlassPane,
    RedGlassPane,
    GreenGlassPane
]
// 0 = background
// 1 = correct way
// 2 = start
// 3 = end

const possibleMazeRoutes = [
    [
        0, 0, 0, 2, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 3, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 3, 0, 0, 0, 0, 0, 2, 0,
        0, 1, 0, 1, 1, 1, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 1, 0,
        0, 1, 1, 1, 0, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 3, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 0, 0, 1, 1, 1, 0,
        0, 1, 0, 0, 1, 1, 0, 1, 0,
        0, 1, 0, 1, 1, 0, 0, 1, 0,
        0, 1, 1, 1, 0, 0, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 2, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        3, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 0,
        2, 1, 0, 1, 1, 1, 0, 1, 0,
        0, 1, 1, 1, 0, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 2, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 3, 0, 0, 0, 0,
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        3, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 1,
        2, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]
]

function NaviTheMaze() {
    new Thread(() => {
        setTimeout(() => {
            alive = true;
            const player = mc.field_71439_g; // thePlayer
            const inv = player.field_71071_by; // inventory
            const lower = new InventoryBasic('Navigate the maze!', true, 6 * 9)
            const gui = new GuiChest(inv, lower);
            Client.currentGui.close()
            new Gui().open()
            while (!Client.isInGui()) {
                Thread.sleep(1)
            }
            mc.func_147108_a(gui); // displayGuiScreen
            let randomMazePattern = possibleMazeRoutes[Math.floor(Math.random() * possibleMazeRoutes.length)]
            for (let i = 0; i < 54; i++) {
                // Player.getPlayer().field_71070_bA.func_75141_a(i, TermSimMenuDesign[i])

                Player.getPlayer().field_71070_bA.func_75141_a(i, mazeGUIhelper[randomMazePattern[i]])
            }
            const onGuiKey = register("guiKey", (keyString, keyCode, gui, event) => {
                if (keyCode === Client.getMinecraft().field_71474_y.field_74316_C.func_151463_i()) {
                    cancel(event)
                }
                else {
                    Client.getMinecraft().field_71474_y.field_151456_ac.forEach((keybind) => {
                        if (keybind.func_151463_i() === keyCode) {
                            cancel(event)
                        }
                    })
                }
            })

            const onGuiClick = register('guiMouseClick', (mouseX, mouseY, button, gui, e) => {
                if (!alive) {
                    onGuiKey.unregister()
                    onGuiClick.unregister()
                    return;
                }
                let slot
                let position
                try {
                    slot = gui.getSlotUnderMouse();
                    position = slot.field_75222_d;
                } catch (e) {
                    let inventory = Player.getOpenedInventory()
                    let notNullCheck = false
                    slot = 0
                    while (slot < inventory.getSize() - 1) {
                        const x = slot % 9;
                        const y = Math.floor(slot / 9);
                        const renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18);
                        const renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - inventory.getSize() / 18) * 18);
                        if (mouseX > renderX - 10 && mouseX < renderX + 10
                            && mouseY > renderY - 10 && mouseY < renderY + 10) {
                            notNullCheck = true
                            break;
                        }
                        slot++
                    }
                    if (!notNullCheck) { return; }
                    position = slot
                }
                if (!slot) return;
                cancel(e)
                if (itemsHighlight.includes(position)) {
                    makeDingSound()
                    Player.getPlayer().field_71070_bA.func_75141_a(position, new ItemStack(MCItem.func_150899_d(160), 1, 5).func_151001_c(""))
                    lastSlot = position
                    let doKeepAlive = false
                    for (let i = 0; i < 54; i++) {
                        if (Player.getOpenedInventory().getStackInSlot(i).getDamage() === 0) {
                            doKeepAlive = true
                        }
                    }
                    if (!doKeepAlive) {
                        alive = false
                        onGuiKey.unregister()
                        onGuiClick.unregister()
                        openTerminalSim()
                    }
                }
            })

            // const onGuiExit = register('guiOpened', (e) => {
            //     console.log(2)
            //     alive = false;
            //     onGuiClick.unregister();
            //     onGuiExit.unregister();
            // });

        }, 0);
    }).start()
}

function makeDingSound() {
    World.playSound("note.pling", 100, 2.5)
}


let coloredArrJSON = {
    95: {
        "White": 0,
        "Orange": 1,
        "Magenta": 2,
        "Light Blue": 3,
        "Yellow": 4,
        "Lime": 5,
        "Gray": 7,
        "Light Gray": 8,
        "Cyan": 9,
        "Purple": 10,
        "Blue": 11,
        "Brown": 12,
        "Green": 13,
        "Red": 14,
        "Black": 15
    },
    159: {
        "White": 0,
        "Orange": 1,
        "Magenta": 2,
        "Light Blue": 3,
        "Yellow": 4,
        "Lime": 5,
        "Gray": 7,
        "Light Gray": 8,
        "Cyan": 9,
        "Purple": 10,
        "Blue": 11,
        "Brown": 12,
        "Green": 13,
        "Red": 14,
        "Black": 15
    },
    351: {
        "Black": 0,
        "Red": 1,
        "Green": 2,
        "Brown": 3,
        "Blue": 4,
        "Purple": 5,
        "Cyan": 6,
        "Light Gray": 7,
        "Gray": 8,
        "Lime": 10,
        "Yellow": 11,
        "Light Blue": 12,
        "Magenta": 13,
        "Orange": 14,
        "White": 15
    },
    35: {
        "White": 0,
        "Orange": 1,
        "Magenta": 2,
        "Light Blue": 3,
        "Yellow": 4,
        "Lime": 5,
        "Light Gray": 7,
        "Gray": 8,
        "Cyan": 9,
        "Purple": 10,
        "Blue": 11,
        "Brown": 12,
        "Green": 13,
        "Red": 14,
        "Black": 15
    }
}
let coloredArr = [
    95,
    159,
    351,
    35
]
function SelectAllThe() {
    new Thread(() => {
        setTimeout(() => {
            alive = true;
            const player = mc.field_71439_g; // thePlayer
            const inv = player.field_71071_by; // inventory
            const lower = new InventoryBasic('Navigate the maze!', true, 6 * 9)
            const gui = new GuiChest(inv, lower);
            Client.currentGui.close()
            new Gui().open()
            while (!Client.isInGui()) {
                Thread.sleep(1)
            }
            mc.func_147108_a(gui); // displayGuiScreen
            let randomColor = Object.keys(coloredArrJSON[35])[Math.floor(Math.random() * 15)]
            lower.func_110133_a("Select all the " + randomColor.toUpperCase() + " items!")
            let itemArray = []
            let randomNumAmount = Math.floor(Math.random() * 3) + 4
            for (let i = 0; i < 28; i++) {
                if (i < randomNumAmount) {
                    let randomBlock = coloredArr[Math.floor(Math.random() * coloredArr.length)]
                    itemArray.push(new ItemStack(MCItem.func_150899_d(randomBlock), 1, coloredArrJSON[randomBlock][randomColor]).func_151001_c("§r" + randomColor))
                }
                else {
                    let randomColorLocal = Object.keys(coloredArrJSON[35])[Math.floor(Math.random() * 15)]
                    while (randomColorLocal === randomColor) {
                        randomColorLocal = Object.keys(coloredArrJSON[35])[Math.floor(Math.random() * 15)]
                    }
                    let randomBlock = coloredArr[Math.floor(Math.random() * coloredArr.length)]
                    itemArray.push(new ItemStack(MCItem.func_150899_d(randomBlock), 1, coloredArrJSON[randomBlock][randomColorLocal]).func_151001_c("§r" + randomColorLocal))
                }
            }
            itemArray = shuffle(itemArray)
            for (let i = 0; i < 54; i++) {
                // Player.getPlayer().field_71070_bA.func_75141_a(i, TermSimMenuDesign[i])
                if (i % 9 === 0 || i % 9 === 8 || i < 9 || i > 44) {
                    Player.getPlayer().field_71070_bA.func_75141_a(i, BackgroundItemStack)
                }
                else {
                    Player.getPlayer().field_71070_bA.func_75141_a(i, itemArray.shift())
                }
            }
            const onGuiKey = register("guiKey", (keyString, keyCode, gui, event) => {
                if (keyCode === Client.getMinecraft().field_71474_y.field_74316_C.func_151463_i()) {
                    cancel(event)
                }
                else {
                    Client.getMinecraft().field_71474_y.field_151456_ac.forEach((keybind) => {
                        if (keybind.func_151463_i() === keyCode) {
                            cancel(event)
                        }
                    })
                }
            })
            const onGuiClick = register('guiMouseClick', (mouseX, mouseY, button, gui, e) => {
                if (!alive) {
                    onGuiKey.unregister()
                    onGuiClick.unregister()
                    return;
                }
                let slot
                let position
                try {
                    slot = gui.getSlotUnderMouse();
                    position = slot.field_75222_d;
                } catch (e) {
                    let inventory = Player.getOpenedInventory()
                    let notNullCheck = false
                    slot = 0
                    while (slot < inventory.getSize() - 1) {
                        const x = slot % 9;
                        const y = Math.floor(slot / 9);
                        const renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18);
                        const renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - inventory.getSize() / 18) * 18);
                        if (mouseX > renderX - 10 && mouseX < renderX + 10
                            && mouseY > renderY - 10 && mouseY < renderY + 10) {
                            notNullCheck = true
                            break;
                        }
                        slot++
                    }
                    if (!notNullCheck) { return; }
                    position = slot
                }
                if (!slot) return;
                cancel(e)
                if (itemsHighlight.includes(position)) {
                    makeDingSound()
                    // Player.getPlayer().field_71070_bA.func_75141_a(position, Player.getOpenedInventory().getStackInSlot(position).getItemStack().func_77966_a(net.minecraft.enchantment.Enchantment.field_180314_l, 1))
                    Player.getOpenedInventory().getStackInSlot(position).getItemStack().func_77966_a(net.minecraft.enchantment.Enchantment.field_180314_l, 1)
                    lastSlot = position
                    let doKeepAlive = false
                    for (let i = 0; i < Player.getOpenedInventory().getItems().length; i++) {
                        if (Player.getOpenedInventory().getStackInSlot(i).getName().includes(randomColor)) {
                            if (!Player.getOpenedInventory().getStackInSlot(i).isEnchanted()) {
                                doKeepAlive = true
                            }
                        }
                    }
                    if (!doKeepAlive) {
                        alive = false
                        onGuiKey.unregister()
                        onGuiClick.unregister()
                        openTerminalSim()
                    }
                }
            })

            // const onGuiExit = register('guiOpened', (e) => {
            //     console.log(2)
            //     alive = false;
            //     onGuiClick.unregister();
            //     onGuiExit.unregister();
            // });

        }, 0);
    }).start()
}

const idArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 427, 428, 429, 430, 431, 2256, 2257, 2258, 2259, 2260, 2261, 2262, 2263, 2264, 2265, 2266, 2267]
const ABC = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "l", "m", "n", "o", "p", "r", "s", "v", "w"]
function WhatStartsWith() {
    new Thread(() => {
        setTimeout(() => {
            alive = true;
            const player = mc.field_71439_g; // thePlayer
            const inv = player.field_71071_by; // inventory
            const lower = new InventoryBasic('Navigate the maze!', true, 6 * 9)
            const gui = new GuiChest(inv, lower);
            Client.currentGui.close()
            new Gui().open()
            while (!Client.isInGui()) {
                Thread.sleep(1)
            }
            mc.func_147108_a(gui); // displayGuiScreen
            let randomLetter = ABC[Math.floor(Math.random() * ABC.length)]
            lower.func_110133_a("What starts with: '" + randomLetter.toUpperCase() + "'?")
            let itemArray = []
            let randomNumAmount = Math.floor(Math.random() * 8) + 3
            for (let i = 0; i < 28; i++) {
                let tryAmount = 0
                if (i < randomNumAmount) {
                    let randomItem = new Item(1).getItemStack()
                    do {
                        if (tryAmount < 100000) {
                            tryAmount++
                            // randomItem = new ItemStack(MCItem.func_150899_d(idArr[Math.floor(Math.random() * idArr.length)]), 1, 0)
                            try {
                                randomItem = new Item(idArr[Math.floor(Math.random() * idArr.length)]).getItemStack()
                            } catch (error) { continue; }
                        }
                        else {
                            break;
                        }
                    } while (!randomItem.func_82833_r().toLowerCase().startsWith(randomLetter))
                    itemArray.push(randomItem)
                }
                else {
                    // let randomItem = new ItemStack(MCItem.func_150899_d(idArr[Math.floor(Math.random() * idArr.length)]), 1, 0)
                    let randomItem = new Item(1).getItemStack()
                    do {
                        // randomItem = new ItemStack(MCItem.func_150899_d(idArr[Math.floor(Math.random() * idArr.length)]), 1, 0)
                        try {
                            randomItem = new Item(idArr[Math.floor(Math.random() * idArr.length)]).getItemStack()
                        } catch (error) { continue; }
                    } while (randomItem.func_82833_r().toLowerCase().startsWith(randomLetter))
                    itemArray.push(randomItem)
                }
            }
            itemArray = shuffle(itemArray)
            for (let i = 0; i < 54; i++) {
                // Player.getPlayer().field_71070_bA.func_75141_a(i, TermSimMenuDesign[i])
                if (i % 9 === 0 || i % 9 === 8 || i < 9 || i > 44) {
                    Player.getPlayer().field_71070_bA.func_75141_a(i, BackgroundItemStack)
                }
                else {
                    let shiftedItem = itemArray.shift()
                    Player.getPlayer().field_71070_bA.func_75141_a(i, shiftedItem.func_151001_c("§r" + shiftedItem.func_82833_r()))
                }
            }
            const onGuiKey = register("guiKey", (keyString, keyCode, gui, event) => {
                if (keyCode === Client.getMinecraft().field_71474_y.field_74316_C.func_151463_i()) {
                    cancel(event)
                }
                else {
                    Client.getMinecraft().field_71474_y.field_151456_ac.forEach((keybind) => {
                        if (keybind.func_151463_i() === keyCode) {
                            cancel(event)
                        }
                    })
                }
            })
            const onGuiClick = register('guiMouseClick', (mouseX, mouseY, button, gui, e) => {
                if (!alive) {
                    onGuiKey.unregister()
                    onGuiClick.unregister()
                    return;
                }
                let slot
                let position
                try {
                    slot = gui.getSlotUnderMouse();
                    position = slot.field_75222_d;
                } catch (e) {
                    let inventory = Player.getOpenedInventory()
                    let notNullCheck = false
                    slot = 0
                    while (slot < inventory.getSize() - 1) {
                        const x = slot % 9;
                        const y = Math.floor(slot / 9);
                        const renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18);
                        const renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - inventory.getSize() / 18) * 18);
                        if (mouseX > renderX - 10 && mouseX < renderX + 10
                            && mouseY > renderY - 10 && mouseY < renderY + 10) {
                            notNullCheck = true
                            break;
                        }
                        slot++
                    }
                    if (!notNullCheck) { return; }
                    position = slot
                }
                if (!slot) return;
                cancel(e)
                if (itemsHighlight.includes(position)) {
                    makeDingSound()
                    // Player.getPlayer().field_71070_bA.func_75141_a(position, Player.getOpenedInventory().getStackInSlot(position).getItemStack().func_77966_a(net.minecraft.enchantment.Enchantment.field_180314_l, 1))
                    Player.getOpenedInventory().getStackInSlot(position).getItemStack().func_77966_a(net.minecraft.enchantment.Enchantment.field_180314_l, 1)
                    lastSlot = position
                    let doKeepAlive = false
                    for (let i = 0; i < Player.getOpenedInventory().getItems().length; i++) {
                        if (Player.getOpenedInventory().getStackInSlot(i).getName().toLowerCase().startsWith("§r" + randomLetter)) {
                            if (!Player.getOpenedInventory().getStackInSlot(i).isEnchanted()) {
                                doKeepAlive = true
                            }
                        }
                    }
                    if (!doKeepAlive) {
                        alive = false
                        onGuiKey.unregister()
                        onGuiClick.unregister()
                        openTerminalSim()
                    }
                }
            })

            // const onGuiExit = register('guiOpened', (e) => {
            //     console.log(2)
            //     alive = false;
            //     onGuiClick.unregister();
            //     onGuiExit.unregister();
            // });

        }, 0);
    }).start()
}

register("guiKey", (charString, keyCode, gui, event) => {
    if (keyCode === 1 || keyCode === Client.getMinecraft().field_71474_y.field_151445_Q.func_151463_i()) {
        alive = false
    }
})

register("guiMouseClick", (mouseX, mouseY, mouseButton, gui, event) => {
    if (alive) {
        cancel(event)
    }
})