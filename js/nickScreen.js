let doneButton;
let backButton;
let nickname;
let defaultNickNameButton;
let defaultNickNameButton2;

let input;

let nicknameState = {
    preload: nicknameAssets,
    create: displayNickname
};

function nicknameAssets() {
    game.load.image('doneButton', 'assets/imgs/doneButton.png');
    game.load.image('nickButton', 'assets/imgs/buttonNick.png');
    game.load.image('nickButton2', 'assets/imgs/buttonNick2.png');
}

function displayNickname() {
    game.add.image(0, 0, 'bg');

    game.add.plugin(PhaserInput.Plugin);

    let ball, mainTween, animation;

    animateBall(ball, mainTween, animation);

    input = game.add.inputField(game.world.width/2 - 125, 50, {
        font: '18px FantasqueSansMonoRegular',
        fontWeight: 'bold',
        width: 250,
        height: 20,
        borderWidth: 1,
        borderColor: '#000',
        placeHolder: 'Choose your Nickname!',
        textAlign: 'center'
    });

    doneButton = game.add.button(game.world.width/2 + 140, 50, 'doneButton', doneButtonPressed);
    backButton = game.add.button(game.world.width - 100, 20, 'backButton', backButtonPressed);
    defaultNickNameButton = game.add.button(game.world.width/2 -70, 120, 'nickButton', nickButton);
    defaultNickNameButton2 = game.add.button(game.world.width/2 - 70, 200, 'nickButton2', nickButton2);
}

function doneButtonPressed() {
    nickname = input.text._text;
    if(nickname != ''){
        nicknameChosen = true;
        game.state.start('initialScreen');
    }
}

function backButtonPressed() {
    game.state.start('initialScreen');
}

function nickButton(){
    nickname = 'Capo';
    nicknameChosen = true;
    game.state.start('initialScreen');
}

function nickButton2(){
    nickname = 'Tina';
    nicknameChosen = true;
    game.state.start('initialScreen');
}