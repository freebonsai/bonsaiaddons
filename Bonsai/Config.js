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
    // SORTING
    getCategoryComparator: () => (a, b) => {
        const categories = ['Dungeons','General','Etherwarp','Swarm Counter', 'Message Hider','Terminal Caller','Clipping'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
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
    }
    //#endregion


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
    

    @SliderProperty({
        name: "Song Delay",
        description: "Delay between song singer",
        category: "General",
        subcategory: "Song",
        min: 1,
        max: 1000
    })
    songsleep = 200;

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
        options: ['Right','Left','Down','Conveyor'],
        requires: 'Auto Clip F7'
    })
    clipSide = 0;


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

    
    @SliderProperty({
        name: "Edrag Slot",
        description: "Edrag slot (/bo dev then go in /pets to see slots)",
        category: "Dungeons",
        subcategory: "M7",
        min: 0,
        max: 43
    })
    edragSlot = 0;



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

    
    // SWARM COUNTER
    //#region 
    swarmCounterMove = new Gui()

    // TOGGLE DISPLAY
   

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