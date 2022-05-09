let howtoState = {
    preload: howtoAssets,
    create: displayHowTo
}

function howtoAssets() {
    game.load.image('keyImage', 'assets/imgs/keysImage.png');
    game.load.image('cursorImage', 'assets/imgs/cursorImage.png');
}

function displayHowTo() {
    game.add.image(0, 0, 'bg');

    let ball, mainTween, animation;

    animateBall(ball, mainTween, animation);

    let howto = 'You will have to get to the bottom of the level, avoiding falling on traps, getting power-ups, and above all, having fun! Use your arrow keys or your mouse to control the movement of the platforms';

    let howtoText = game.add.text(0, 0, howto, {
        font: '28px Roboto',
        fontWeight: 'bold',
        fill: '#000',
    });

    howtoText.setTextBounds(0, 15, game.world.width, game.world.height -200);
    howtoText.boundsAlignH = 'center';
    howtoText.boundsAlignV = 'middle';
    howtoText.wordWrap = true;
    howtoText.wordWrapWidth = game.world.width - 200;

    game.add.image(100 , game.world.height / 2 + 50, 'keyImage');
    game.add.image(game.world.width - 200, game.world.height / 2 + 50, 'cursorImage');

    backButton = game.add.button(game.world.width - 100, 20, 'backButton', backButtonPressed);
}