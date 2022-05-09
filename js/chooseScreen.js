let level;

let chooseState = {
    preload: loadChooseAssets,
    create: displayChooseScreen
};

function loadChooseAssets() {
    game.load.image('1Button', 'assets/imgs/level1Button.png');
    game.load.image('2Button', 'assets/imgs/level2Button.png');
    game.load.image('SButton', 'assets/imgs/levelSButton.png');
}

function displayChooseScreen(){
    game.add.image(0, 0, 'bg');

    let ball, mainTween, animation;

    animateBall(ball, mainTween, animation);

    game.add.button(game.world.width / 2 - 199.5, game.world.height / 2 - 60, '1Button', button1Pressed);
    game.add.button(game.world.width / 2 + 66.5, game.world.height / 2 - 60, '2Button', button2Pressed);
    game.add.button(game.world.width / 2 - 66.5, game.world.height / 2 + 60, 'SButton', buttonSPressed);

    backButton = game.add.button(game.world.width - 100, 20, 'backButton', backButtonPressed);
}

function button1Pressed() {
    level = 0;
    game.state.start('play');
}

function button2Pressed() {
    level = 1;
    game.state.start('play');
}

function buttonSPressed() {
    level = 2;
    game.state.start('play');
}