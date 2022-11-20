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
        const names = ['Auto Terminals','Auto Term Delay','Click Type','Relic Caller','Relic','Auto Warp','Terminal Counter'];

        return names.indexOf(a.attributesExt.name) - names.indexOf(b.attributesExt.name);
    },

    getSubcategoryComparator: () => (a, b) => {
        const subcategories = ['Auto Terms', 'M7','Warp','Terminal Counter'];

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
            "&5&lDifferent features for clipping!\n" +
            "&6Keybind can be found in minecraft's own keybind section"
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

        // CLIP STUFF
        this.addDependency("Clip Delay", "Sinseeker Clip")
        this.addDependency("Infinite Sleep", "3D Clip Infinite")

        // ETHERWARP
        this.addDependency("Etherwarp FOV", "Etherwarp Helper")
        this.addDependency("Etherwarp Distance", "Etherwarp Helper")
        this.addDependency("Etherwarp Block", "Etherwarp Helper")
    }
    //#endregion

    // DUNGEONS

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
    
    

    // SINSEEKER
    @SwitchProperty({
        name: "Sinseeker Clip",
        description: "Automatically clips when key pressed (set up a keybind for sinseeker in oringo or floppa i cba)",
        category: "Clipping",
        subcategory: "Sinseeker"
    })
    sinclip = true

    @SliderProperty({
        name: "Clip Delay",
        description: "Delay between keybind press and clip (from my testing minimum that works is 115 but maybe ping or smth just try)",
        category: "Clipping",
        subcategory: "Sinseeker",
        min: 100,
        max: 250
    })
    sindelay = 150;

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
        min: 45,
        max: 150
    })
    funiinfdelay = 100;

    @SwitchProperty({
        name: "Etherwarp Helper",
        description: "Automatically etherwarps on your selected block when you left click within fov of it",
        category: "Etherwarp",
        subcategory: "Etherwarp"
    })
    etherHelper = true

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

    // M7
    //#region 
    @SwitchProperty({
        name: "Relic Caller",
        description: "Automatically calls a relic when Necron dies in M7",
        category: "Dungeons",
        subcategory: "M7"
    })
    relicCaller = true

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
    autoWarp = true

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
    SwarmCounter = true

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
    messageHider = true
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