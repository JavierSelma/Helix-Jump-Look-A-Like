let aboutButton, nicknameButton, howtoButton, playButton;

let warningSign;

let initialState = {
    preload: loadInitialAssets,
    create: displayInitialScreen
};

function loadInitialAssets() {

    game.load.image('bg', 'assets/imgs/background.png');
    game.load.image('aboutButton', 'assets/imgs/aboutButton.png');
    game.load.image('howtoButton', 'assets/imgs/howtoButton.png');
    game.load.image('backButton', 'assets/imgs/backButton.png');
    game.load.image('nicknameButton', 'assets/imgs/nicknameButton.png');
    game.load.image('playButton', 'assets/imgs/playButton.png');
    game.load.image('warning', 'assets/imgs/chooseNickname.png');
    game.load.spritesheet('ball', 'assets/imgs/ballSpritesheet.png', 59.5, 60);

    game.load.audio('MusicaMenu', 'assets/snds/MusicaMenu.mp3');
}

function displayInitialScreen() {

    game.input.enabled = true;
    game.add.image(0, 0, 'bg');

    let ball, mainTween, animation;

    animateBall(ball, mainTween, animation);

    aboutButton = game.add.button(game.world.width - 100, 20, 'aboutButton', aboutButtonPressed);
    nicknameButton = game.add.button(500, 150, 'nicknameButton', nicknameButtonPressed);
    howtoButton = game.add.button(500, 200, 'howtoButton', howtoButtonPressed);

    if(!nicknameChosen){
        warningSign = game.add.image(525, 50, 'warning');
    }

    if(nicknameChosen){
        playButton = game.add.button(100, 160, 'playButton', playButtonPressed);
        game.add.text(20, 20, 'Hi ' + nickname + '!', {
            font: '18px FantasqueSansMonoRegular',
            fontWeight: 'bold'
        });
    }

}

function aboutButtonPressed() {
    game.state.start('about');
}

function nicknameButtonPressed() {
    game.state.start('nickname');
}

function howtoButtonPressed() {
    game.state.start('howto');

}

function playButtonPressed() {
    game.state.start('choose');
}

function animateBall(ball, mainTween, animation) {
    ball = game.add.sprite(-100, game.world.height - 120, 'ball', 3);
    ball.anchor.setTo(0.5, 0.5);

    mainTween = game.add.tween(ball).to({
        x: 900
    }, 3500, Phaser.Easing.Linear.None);

    mainTween.loop(true);
    mainTween.start();

    startBounceTween();

    function startBounceTween() {

        ball.y = game.world.height - 120;

        let bounce = game.add.tween(ball);

        bounce.to({ y: 180 }, 350, Phaser.Easing.Bounce.In).to({
            y: game.world.height - 120
        }, 350, Phaser.Easing.Bounce.Out);
        bounce.onComplete.add(startBounceTween, this);
        bounce.start();
    }

    animation = ball.animations.add('rotate');
    ball.animations.play('rotate', 8, true);
}

