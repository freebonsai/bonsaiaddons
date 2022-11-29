import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty
} from 'Vigilance';

@Vigilant('Bonsai', 'Proest Mod', {
    // SORTING OF STUFF
    //#region 
    getCategoryComparator: () => (a, b) => {
        const categories = ['Dungeons','Etherwarp','Swarm Counter', 'Message Hider','Terminal Caller','Clipping'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },

    getPropertyComparator: () => (a, b) => {
        const names = ["Don't Render Falling Blocks",'Auto Terminals','Auto Term Delay','Click Type','Relic Caller','Relic','Auto Warp','Terminal Counter','Auto Kick','Auto Black Cat'];

        return names.indexOf(a.attributesExt.name) - names.indexOf(b.attributesExt.name);
    },

    getSubcategoryComparator: () => (a, b) => {
        const subcategories = ['Render','Auto Terms', 'M7','Warp','Terminal Counter','Auto Kick','Black Cat'];

        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) -
            subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    },

    getPropertyComparator: () => (a, b) => {
        const names = ['Message Hider','Blocked Name'];

        return names.indexOf(a.attributesExt.name) - names.indexOf(b.attributesExt.name);
    },

    getSubcategoryComparator: () => (a, b) => {
        const subcategories = ['§4One', '§3Two','§bThree','§dFour'];

        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) -
            subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    },
    //#endregion
})
class Config {
    // CONSTRUCTOR BLAHBLAH
    //#region 
    constructor() {
        this.initialize(this)
        this.setCategoryDescription("Dungeons", 
            "&5&lBonsai's very pro mod"
        )
        this.setCategoryDescription("Terminal Caller", 
            "&5&lCalls terms!\n"
        )
        this.setCategoryDescription("Clipping", 
            "&5&lDifferent features for clipping!"
        )
        this.setCategoryDescription("Etherwarp", 
            "&5&lEtherwarp helper!\n" +
            "&6PLEASE DON'T PUT VALUES TOO HIGH THEY WILL LAG YOUR GAME SO BAD"
        )

        // RELIC
        this.addDependency("Relic", "Relic Caller")

        // SWARM COUNTER
        this.addDependency("Show Percent", "Swarm Counter")
        this.addDependency("Swarm Counter Size", "Swarm Counter")
        this.addDependency("Move Swarm Counter", "Swarm Counter")

        // MESSAGE HIDER
        this.addDependency("Blocked Name", "Message Hider")

        // TERMINALS
        this.addDependency("Auto Term Delay", "Auto Terminals")
        this.addDependency("Click Type", "Auto Terminals")

        // TYPE OF TERMS
        this.addDependency("Correct the Panes", "Auto Terminals")
        this.addDependency("Numbers", "Auto Terminals")
        this.addDependency("Same Color", "Auto Terminals")
        this.addDependency("Select of Same", "Auto Terminals")
        this.addDependency("Starts With", "Auto Terminals")

        // WARP
        this.addDependency("Warped Name", "Auto Warp")
        this.addDependency("Warp Delay", "Auto Warp")


        //Auto Clip
        this.addDependency("Crystal", "Auto Clip F7")

        // ETHERWARP
        this.addDependency("Etherwarp FOV", "Etherwarp Helper")
        this.addDependency("Etherwarp Distance", "Etherwarp Helper")
        this.addDependency("Etherwarp Block", "Etherwarp Helper")
        this.addDependency("Etherwarp Auto Click", "Etherwarp Helper")
    }
    //#endregion

    // DUNGEONS


    @SwitchProperty({
        name: "Don't Render Falling Blocks",
        description: "Stops falling blocks from rendering",
        category: "Dungeons",
        subcategory: "Render"
    })
    fallingBlock = false


    //QUIZ
    @SwitchProperty({
        name: "Auto Quiz",
        description: "Automatically clicks correct buttons in quiz (Extremely WIP)",
        category: "Dungeons",
        subcategory: "Quiz"
    })
    autoQuiz = false

    // TERMINALS
    //#region 
    @SwitchProperty({
        name: "Auto Terminals",
        description: "Automatically completes terminals",
        category: "Dungeons",
        subcategory: "Auto Terms"
    })
    autoTerms = false

    @SliderProperty({
        name: "Auto Term Delay",
        description: "Delay between auto terminal clicking",
        category: "Dungeons",
        subcategory: "Auto Terms",
        min: 1,
        max: 500
    })
    autoTermDelay = 200;

    @SelectorProperty({
        name: 'Click Type',
        description: 'Which click type auto terminals utilise',
        category: 'Dungeons',
        subcategory: 'Auto Terms',
        options: ['Left', 'Middle', 'Shift'],
    })
    autoClickType = 0;

    // TYPES OF TERMS
    @CheckboxProperty({
        name: 'Correct the Panes',
        description: 'Correct all the panes terminal',
        category: 'Dungeons',
        subcategory: 'Auto Terms',
    })
    panes = true;

    @CheckboxProperty({
        name: 'Numbers',
        description: 'Click on order terminal',
        category: 'Dungeons',
        subcategory: 'Auto Terms',
    })
    numbers = true;

    @CheckboxProperty({
        name: 'Same Color',
        description: 'Change all to same color terminal',
        category: 'Dungeons',
        subcategory: 'Auto Terms',
    })
    rubix = true;

    @CheckboxProperty({
        name: 'Select of Same',
        description: 'Correct all the panes terminal',
        category: 'Dungeons',
        subcategory: 'Auto Terms',
    })
    selectallthe = true;

    @CheckboxProperty({
        name: 'Starts With',
        description: 'Starts with Terminal',
        category: 'Dungeons',
        subcategory: 'Auto Terms',
    })
    startswith = true;
    //#endregion
    
    // AUTO
    @SwitchProperty({
        name: "Auto Clip F5",
        description: "Automatically clips when entered f5 bossfight",
        category: "Clipping",
        subcategory: "Auto"
    })
    f5clip = true

    @SwitchProperty({
        name: "Auto Clip F6",
        description: "Automatically clips when entered f6 bossfight",
        category: "Clipping",
        subcategory: "Auto"
    })
    f6clip = true

    @SelectorProperty({
        name: 'F6 Class',
        description: 'Where you will clip in f6',
        category: 'Clipping',
        subcategory: 'Auto',
        options: ['Tank (Auto)', 'Healer', 'Mage','Archer','Berserker'],
        requires: 'Auto Clip F6'
    })
    f6Class = 0;

    @SwitchProperty({
        name: "Auto Clip F7",
        description: "Automatically clips to crystal when entered f7 bossfight",
        category: "Clipping",
        subcategory: "Auto"
    })
    f7clip = false

    @SelectorProperty({
        name: 'Crystal',
        description: 'Which crystal will be clipped to',
        category: 'Clipping',
        subcategory: 'Auto',
        options: ['Right','Left','Down'],
        requires: 'Auto Clip F7'
    })
    clipSide = 0;

    // 3D CLIP

    @SwitchProperty({
        name: "3D Clip Infinite",
        description: "Toggle whether dclipbo should use the infinite feature or not",
        category: "Clipping",
        subcategory: "3d"
    })
    dclipinf = true

    @SliderProperty({
        name: "Infinite Sleep",
        description: "Delay between every block infinite dclip moves",
        category: "Clipping",
        subcategory: "3d",
        min: 5,
        max: 40
    })
    infdelay = 10;

    // HCLIP


    @SliderProperty({
        name: "Funiclip Delay",
        description: "Delay between every block funiclip moves",
        category: "Clipping",
        subcategory: "Funi",
        min: 5,
        max: 150
    })
    funiinfdelay = 100;

    @SwitchProperty({
        name: "Etherwarp Helper",
        description: "Automatically etherwarps on your selected block when you left click within fov of it",
        category: "Etherwarp",
        subcategory: "Etherwarp"
    })
    etherHelper = false

    @SliderProperty({
        name: "Etherwarp FOV",
        description: "The FOV the etherwarp helper searches within",
        category: "Etherwarp",
        subcategory: "Etherwarp",
        min: 2,
        max: 20
    })
    etherFOV = 5;

    @SliderProperty({
        name: "Etherwarp Distance",
        description: "The distance the etherwarp helper searches within (It starts at 10 blocks for slightly better performance)",
        category: "Etherwarp",
        subcategory: "Etherwarp",
        min: 10,
        max: 50
    })
    etherDist = 30;

    @TextProperty({
        name: 'Etherwarp Block',
        description: 'Which block etherwarp helper searches for\nNeeds to be in the format minecraft:(block)',
        category: 'Etherwarp',
        subcategory: 'Etherwarp',
        placeholder: 'Put a block!',
        triggerActionOnInitialization: false,
    })
    textInput = 'minecraft:diamond_block';

    @SwitchProperty({
        name: "Etherwarp Auto Click",
        description: "Automatically right clicks after rotating you",
        category: "Etherwarp",
        subcategory: "Etherwarp"
    })
    etherClick = false

    // M7
    //#region 
    @SwitchProperty({
        name: "Relic Caller",
        description: "Automatically calls a relic when Necron dies in M7",
        category: "Dungeons",
        subcategory: "M7"
    })
    relicCaller = false

    @SelectorProperty({
        name: 'Relic',
        description: 'Which relic will be auto called',
        category: 'Dungeons',
        subcategory: 'M7',
        options: ['§aGreen', '§cRed', '§5Purple','§6Orange','§bBlue'],
        requires: 'Relic Caller',
    })
    relicType = 0;

    // WARP
    @SwitchProperty({
        name: "Auto Warp",
        description: "Automatically warps players back to your dungeon when they disconnect",
        category: "Dungeons",
        subcategory: "Warp"
    })
    autoWarp = false

    @TextProperty({
        name: 'Warped Name',
        description: 'Choose the ign of the person you want to warp back',
        category: 'Dungeons',
        subcategory: 'Warp',
        placeholder: 'Name',
        triggerActionOnInitialization: false,
    })
    ignWarp = '';

    @SliderProperty({
        name: "Warp Delay",
        description: "Delay between the person disconnecting and the warp",
        category: "Dungeons",
        subcategory: "Warp",
        min: 500,
        max: 3000
    })
    warpDelay = 1000;
    //#endregion

    @SwitchProperty({
        name: "Terminal Counter",
        description: "Counts how many terms and devices everyone in your team does.",
        category: "Dungeons",
        subcategory: "Terminal Counter"
    })
    terminalCounter = true

    @SwitchProperty({
        name: "Auto Kick",
        description: "Automatically kicks certain players when they join from pf. /blacklist help for more info",
        category: "Dungeons",
        subcategory: "Auto Kick"
    })
    autoKick = false

    @SwitchProperty({
        name: "Auto Black Cat",
        description: "Automatically selects black cat pet at start of terminals in f7",
        category: "Dungeons",
        subcategory: "Black Cat"
    })
    blackCat = false
    
    // SWARM COUNTER
    //#region 
    swarmCounterMove = new Gui()

    // TOGGLE DISPLAY
    @SwitchProperty({
        name: "Swarm Counter",
        description: "Turns on the Swarm Counter.",
        category: "Swarm Counter",
        subcategory: "Swarm Counter"
    })
    SwarmCounter = false

    // SHOW PERCENT
    @SwitchProperty({
        name: "Show Percent",
        description: "Shows the percent buff swarm adds to your damage",
        category: "Swarm Counter",
        subcategory: "Swarm Counter"
    })
    SwarmCounterPercent = true

    @SliderProperty({
        name: "Swarm Counter Size",
        description: "The size of the swarm counter",
        category: "Swarm Counter",
        subcategory: "Swarm Counter",
        min: 0,
        max: 200
    })
    SwarmCounterScale = 100;

    // MOVE DISPLAY
    @ButtonProperty({
        name: "Move Swarm Counter",
        description: "Move the swarm counter on your screen",
        category: "Swarm Counter",
        subcategory: "Swarm Counter",
        placeholder: "Move!",
    })
    MoveSwarmCounter() {
        this.swarmCounterMove.open()
    };
    //#endregion

    // MESSAGE HIDER
    //#region 
    @TextProperty({
        name: 'Blocked Name',
        description: 'Choose the ign of the person you want to block messages from',
        category: 'Message Hider',
        subcategory: 'Smeshnik',
        placeholder: 'Name',
        triggerActionOnInitialization: false,
    })
    ignHide = '';

    @SwitchProperty({
        name: "Message Hider",
        description: "Hides all messages from someone",
        category: "Message Hider",
        subcategory: "Smeshnik"
    })
    messageHider = false
    //#endregion

    // TERMINAL CALLER
    //#region

    // DISPLAY STUFF
    //#region  
    @SwitchProperty({
        name: "Term Caller Display",
        description: "Shows a display of who in the party called which term",
        category: "Terminal Caller",
        subcategory: "§aDisplay"
    })
    termcalldisplay = true

    termdisplaymove = new Gui()

    // MOVE DISPLAY
    @ButtonProperty({
        name: "Move Term Display",
        description: "Move the term display on your screen",
        category: "Terminal Caller",
        subcategory: "§aDisplay",
        placeholder: "Move!",
    })
    MoveTermDisplay() {
        this.termdisplaymove.open()
    };
    //#endregion

    // PRESETS

    presetgui = new Gui()
    // ALL OFF
    //#region 
    @ButtonProperty({
        name: "All off",
        description: "Turns all terminals off",
        category: "Terminal Caller",
        subcategory: "Presets",
        placeholder: "All Off",
    })
    Off() {
        this.oneleft1 = false
        this.oneleft2 = false
        this.oneright1 = false
        this.oneright2 = false
        this.onedev = false

        this.tworight1 = false
        this.tworight2 = false
        this.tworight3 = false
        this.tworight4 = false
        this.twoleft1 = false
        this.twodev = false

        this.threeleft1 = false
        this.threeleft2 = false
        this.threeleft3 = false
        this.threeright1 = false
        this.threedev = false

        this.fourleft1 = false
        this.fourleft2 = false
        this.fourleft3 = false
        this.fourright1 = false
        this.fourdev = false
        this.presetgui.open()
    };
    //#endregion

    // DEVICES
    //#region 
    @ButtonProperty({
        name: "Devices",
        description: "Sets your terminals to the devices preset",
        category: "Terminal Caller",
        subcategory: "Presets",
        placeholder: "Devices",
    })
    Devices() {
        this.oneleft1 = false
        this.oneleft2 = false
        this.oneright1 = false
        this.oneright2 = false
        this.onedev = true

        this.tworight1 = false
        this.tworight2 = false
        this.tworight3 = false
        this.tworight4 = false
        this.twoleft1 = true
        this.twodev = true

        this.threeleft1 = false
        this.threeleft2 = false
        this.threeleft3 = false
        this.threeright1 = false
        this.threedev = true

        this.fourleft1 = false
        this.fourleft2 = false
        this.fourleft3 = false
        this.fourright1 = false
        this.fourdev = true
        this.presetgui.open()
    };
    //#endregion
    
    // FIRST TERMS
    //#region 
    @ButtonProperty({
        name: "First Terms",
        description: "Sets your terminals to the first term preset",
        category: "Terminal Caller",
        subcategory: "Presets",
        placeholder: "First Terms",
    })
    First() {
        this.oneleft1 = true
        this.oneleft2 = false
        this.oneright1 = false
        this.oneright2 = false
        this.onedev = false

        this.tworight1 = true
        this.tworight2 = false
        this.tworight3 = false
        this.tworight4 = false
        this.twoleft1 = false
        this.twodev = false

        this.threeleft1 = true
        this.threeleft2 = false
        this.threeleft3 = false
        this.threeright1 = false
        this.threedev = false

        this.fourleft1 = true
        this.fourleft2 = false
        this.fourleft3 = false
        this.fourright1 = false
        this.fourdev = false
        this.presetgui.open()
    };
    //#endregion

    // SECOND TERMS
    //#region 
    @ButtonProperty({
        name: "Second Terms",
        description: "Sets your terminals to the second term preset",
        category: "Terminal Caller",
        subcategory: "Presets",
        placeholder: "Second Terms",
    })
    Second() {
        this.oneleft1 = false
        this.oneleft2 = true
        this.oneright1 = false
        this.oneright2 = false
        this.onedev = false

        this.tworight1 = false
        this.tworight2 = true
        this.tworight3 = false
        this.tworight4 = false
        this.twoleft1 = false
        this.twodev = false

        this.threeleft1 = false
        this.threeleft2 = true
        this.threeleft3 = false
        this.threeright1 = false
        this.threedev = false

        this.fourleft1 = false
        this.fourleft2 = true
        this.fourleft3 = false
        this.fourright1 = false
        this.fourdev = false
        this.presetgui.open()
    };
    //#endregion

    // THIRD TERMS
    //#region 
    @ButtonProperty({
        name: "Third Terms",
        description: "Sets your terminals to the third term preset",
        category: "Terminal Caller",
        subcategory: "Presets",
        placeholder: "Third Terms",
    })
    Third() {
        this.oneleft1 = false
        this.oneleft2 = false
        this.oneright1 = true
        this.oneright2 = false
        this.onedev = false

        this.tworight1 = false
        this.tworight2 = false
        this.tworight3 = true
        this.tworight4 = false
        this.twoleft1 = false
        this.twodev = false

        this.threeleft1 = false
        this.threeleft2 = false
        this.threeleft3 = true
        this.threeright1 = false
        this.threedev = false

        this.fourleft1 = false
        this.fourleft2 = false
        this.fourleft3 = true
        this.fourright1 = false
        this.fourdev = false
        this.presetgui.open()
    };
    //#endregion

    // LAST TERMS
    //#region 
    @ButtonProperty({
        name: "Last Terms",
        description: "Sets your terminals to the last term preset",
        category: "Terminal Caller",
        subcategory: "Presets",
        placeholder: "Last Terms",
    })
    Last() {
        this.oneleft1 = false
        this.oneleft2 = false
        this.oneright1 = false
        this.oneright2 = true
        this.onedev = false

        this.tworight1 = false
        this.tworight2 = false
        this.tworight3 = false
        this.tworight4 = true
        this.twoleft1 = false
        this.twodev = false

        this.threeleft1 = false
        this.threeleft2 = false
        this.threeleft3 = false
        this.threeright1 = true
        this.threedev = false

        this.fourleft1 = false
        this.fourleft2 = false
        this.fourleft3 = false
        this.fourright1 = true
        this.fourdev = false
        this.presetgui.open()
    };
    //#endregion

    // 1
    //#region 
    @CheckboxProperty({
        name: 'Left 1',
        description: 'First term on the left of one',
        category: 'Terminal Caller',
        subcategory: '§4One',
    })
    oneleft1 = false;

    @CheckboxProperty({
        name: 'Left 2',
        description: 'Second term on the left of one',
        category: 'Terminal Caller',
        subcategory: '§4One',
    })
    oneleft2 = false;

    @CheckboxProperty({
        name: 'Device',
        description: 'Simon Says',
        category: 'Terminal Caller',
        subcategory: '§4One',
    })
    onedev = false;

    @CheckboxProperty({
        name: 'Right 1',
        description: 'First term on the right of one',
        category: 'Terminal Caller',
        subcategory: '§4One',
    })
    oneright1 = false;

    @CheckboxProperty({
        name: 'Right 2',
        description: 'First term on the right of one',
        category: 'Terminal Caller',
        subcategory: '§4One',
    })
    oneright2 = false;

    @CheckboxProperty({
        name: 'Pre 4',
        description: 'Aiming Device in one',
        category: 'Terminal Caller',
        subcategory: '§4One',
    })
    pre4 = false;
    //#endregion
    // 2
    //#region 
    @CheckboxProperty({
        name: 'Device',
        description: 'Levers',
        category: 'Terminal Caller',
        subcategory: '§3Two',
    })
    twodev = false;

    @CheckboxProperty({
        name: 'Right 1',
        description: 'First term on the right of two',
        category: 'Terminal Caller',
        subcategory: '§3Two',
    })
    tworight1 = false;

    @CheckboxProperty({
        name: 'Right 2',
        description: 'Second term on the right of two',
        category: 'Terminal Caller',
        subcategory: '§3Two',
    })
    tworight2 = false;

    @CheckboxProperty({
        name: 'Right 3',
        description: 'Third term on the right of two',
        category: 'Terminal Caller',
        subcategory: '§3Two',
    })
    tworight3 = false;

    @CheckboxProperty({
        name: 'Right 4',
        description: 'Fourth term on the right of two',
        category: 'Terminal Caller',
        subcategory: '§3Two',
    })
    tworight4 = false;

    @CheckboxProperty({
        name: 'Left 1',
        description: 'First term on the left of two',
        category: 'Terminal Caller',
        subcategory: '§3Two',
    })
    twoleft1 = false;
    //#endregion
    // 3
    //#region 
    @CheckboxProperty({
        name: 'Left 1',
        description: 'First term on the left of three',
        category: 'Terminal Caller',
        subcategory: '§bThree',
    })
    threeleft1 = false;

    @CheckboxProperty({
        name: 'Left 2',
        description: 'Second term on the left of three',
        category: 'Terminal Caller',
        subcategory: '§bThree',
    })
    threeleft2 = false;

    @CheckboxProperty({
        name: 'Right 1',
        description: 'First term on the right of 3',
        category: 'Terminal Caller',
        subcategory: '§bThree',
    })
    threeright1 = false;

    @CheckboxProperty({
        name: 'Device',
        description: 'Correct the arrows',
        category: 'Terminal Caller',
        subcategory: '§bThree',
    })
    threedev = false;

    @CheckboxProperty({
        name: 'Left 3',
        description: 'Third term on the left of three',
        category: 'Terminal Caller',
        subcategory: '§bThree',
    })
    threeleft3 = false;
    //#endregion
    // 4
    //#region 
    @CheckboxProperty({
        name: 'Left 1',
        description: 'First term on the left of four',
        category: 'Terminal Caller',
        subcategory: '§dFour',
    })
    fourleft1 = false;

    @CheckboxProperty({
        name: 'Left 2',
        description: 'Second term on the left of four',
        category: 'Terminal Caller',
        subcategory: '§dFour',
    })
    fourleft2 = false;

    @CheckboxProperty({
        name: 'Left 3',
        description: 'Third term on the left of four',
        category: 'Terminal Caller',
        subcategory: '§dFour',
    })
    fourleft3 = false;

    @CheckboxProperty({
        name: 'Device',
        description: 'Aiming',
        category: 'Terminal Caller',
        subcategory: '§dFour',
    })
    fourdev = false;

    @CheckboxProperty({
        name: 'Right 1',
        description: 'First term on the right of four',
        category: 'Terminal Caller',
        subcategory: '§dFour',
    })
    fourright1 = false;
    //#endregion
    //#endregion
}

export default new Config()