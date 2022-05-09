let aboutState = {
    preload: aboutAssets,
    create: displayAbout
}

function aboutAssets() {
    game.load.image('jorgito', 'assets/imgs/fotoJorgito.png');
    game.load.image('borjita', 'assets/imgs/fotoBorjita.png');
    game.load.image('javi', 'assets/imgs/fotoJavi.png');
}

function displayAbout() {
    game.add.image(0, 0, 'bg');

    let ball, mainTween, animation;

    animateBall(ball, mainTween, animation);

    game.add.image(100, 50, 'javi');
    game.add.image(300, 50, 'jorgito');
    game.add.image(500, 50, 'borjita');

    let coders = 'JSR           JGA            BEP';
    let texto = "                    From the team \n   \" Coronao coronao programamos por el lao \" \n    we are pleased to present you: JUMPERBALL\n     a classic arcade that you won't forget!";

    game.add.text(140, 10, coders, {
        font: '28px FantasqueSansMonoRegular',
        fontWeight: 'bold',
    });

    game.add.text(70, 210, texto,{
        font: '28px FantasqueSansMonoRegular',
        fontWeight: 'bold',
    });

    backButton = game.add.button(game.world.width - 100, 20, 'backButton', backButtonPressed);
}