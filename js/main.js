let game;

let nicknameChosen = false;

let wfConfig = {
    active: function() {
        startGame();
    },

    google: {
        families: ['Montserrat','Roboto','Monofett']
    },

    custom: {
        families: ['FantasqueSansMonoRegular'],
        urls: ["https://fontlibrary.org/face/fantasque-sans-mono"]
    }
};

WebFont.load(wfConfig);

function startGame() {
    game = new Phaser.Game(800, 400, Phaser.CANVAS, 'gameScreen');

    game.state.add('initialScreen', initialState);

    game.state.add('nickname', nicknameState);

    game.state.add('howto', howtoState);

    game.state.add('about', aboutState);

    game.state.add('play', playState);

    game.state.add('choose', chooseState);

    game.state.add('end', endState);

    game.state.start('initialScreen');
}