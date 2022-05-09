let endState = {
    preload: endAssets,
    create: displayEnd,
    update: keySPressed
};

function endAssets(){
    game.load.image('restartButton', 'assets/imgs/restartButton.png');
    game.load.image('victory', 'assets/imgs/victory.png');
    game.load.image('defeat', 'assets/imgs/defeat.png');
}

let sKey;

function displayEnd(){

    game.input.enabled = true;

    game.scale.setGameSize(800, 400);
    game.world.width = 800;
    game.world.height = 400;
    game.world.setBounds(0, 0, game.world.width, game.world.height);

    game.add.image(0, 0, 'bg');

    let ball, mainTween, animation;

    animateBall(ball, mainTween, animation);


    game.add.button(game.world.width / 2 - 270, game.world.height / 2, '1Button', button1Pressed);
    game.add.button(game.world.width / 2 + -70, game.world.height / 2, '2Button', button2Pressed);
    game.add.button(game.world.width / 2 + 130, game.world.height / 2, 'SButton', buttonSPressed);


    game.add.button(game.world.width / 2 - 105, game.world.height / 2 + 90, 'restartButton', buttonRestartPressed);


    textX = game.world.width / 2 - 200;
    textY = game.world.height / 3;

    if(level == 2)
    {
        if(passed)
        {
            game.add.image(game.world.width / 2 - 120, 0 + game.world.height / 6 - 50, 'victory');

            let end = 'Congratulations! You completed the special level!';
            let endText = game.add.text(textX, textY, end, {
            font: '18px FantasqueSansMonoRegular',
            fontWeight: 'bold',
            fill: '#000',
            });
        }
        else
        {
            game.add.image(game.world.width / 2 - 120, 0 + game.world.height / 6 - 50, 'defeat');

            let end = 'You lost! Try again!';
            let endText = game.add.text(textX+100, textY, end, {
            font: '18px FantasqueSansMonoRegular',
            fontWeight: 'bold',
            fill: '#000',
            });
        }

        
    }

    if(level != 2)
    {
        if(passed)
        {
            game.add.image(game.world.width / 2 - 120, 0 + game.world.height / 6 - 50, 'victory');

            let end = 'Congratulations! You have passed ' + PLATAFORMASTOTALES + ' platforms!';
            let endText = game.add.text(textX, textY, end, {
                font: '18px FantasqueSansMonoRegular',
                fontWeight: 'bold',
                fill: '#000',
            });
        }
        else
        {
            game.add.image(game.world.width / 2 - 120, 0 + game.world.height / 6 - 50, 'defeat');

            let end = 'You lost! You achieved to pass ' + newPlatform + ' platforms!';
            let endText = game.add.text(textX, textY, end, {
                font: '18px FantasqueSansMonoRegular',
                fontWeight: 'bold',
                fill: '#000',
            });
        }
    }

    let restart = 'Press S to restart!';
    let restartText = game.add.text(20, 50, restart, {
        font: '24px FantasqueSansMonoRegular',
        fontWeight: 'bold',
        fill: '#000',
    });

    game.add.button(game.world.width - 100, 20, 'backButton', backButtonPressed);

    game.time.events.add(15000, resetPlay, this);

    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);


}


function buttonRestartPressed() {
    game.state.start('play');
}

function resetPlay(){
    game.state.start('play');
}

function keySPressed(){
    if(sKey.isDown) game.state.start('play');
}
