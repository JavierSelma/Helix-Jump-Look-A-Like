let playState = {
    preload: loadPlayAssets,
    create: displayPlayScreen,
    update: updatePlay,
};

var emmiter;

let cursors;
let letters;
let obstacles;
let soundBounce;
let PLATAFORMASTOTALES = 25;

let passed;

let levelsJSON = ['assets/levels/level1.json', 'assets/levels/level2.json', 'assets/levels/levelS.json'];
let levelConfig;

let arrayLetters = 'ABCDEFGHIJKLMNOPQRTUVWXYZ';

let Health_original_width;
let HealthBar;
let MaxHealth = 100;
let CurrentHealth;
let score = 0;
let scoreText;
let ballLastY;

let lvlText;
let nicKText;

function loadPlayAssets()
{

    game.load.text('level', levelsJSON[level], true);

    loadPlayImages();
    loadPlayAudio();
}

function loadPlayImages()
{
    if (level == 0 || level == 2)
    {
        game.load.image('bgPlay', 'assets/imgs/bgPlay.png');
        game.load.image('platform', 'assets/imgs/plataforma.png');
        game.load.image('trap','assets/imgs/trap.png');
        game.load.image('plEmitter', 'assets/imgs/plemitter.png');

    }else if (level == 1)
    {
        game.load.image('bgPlay', 'assets/imgs/bgPlay2.png');
        game.load.image('platform', 'assets/imgs/plataforma2.png');
        game.load.image('trap','assets/imgs/trap2.png');
        game.load.image('plEmitter', 'assets/imgs/plemitter2.png');
        game.load.image('movingP', 'assets/imgs/movingP.png');
    }

    game.load.image('spike','assets/imgs/spike.png');
    game.load.image('health_bg','assets/imgs/health_bg.png');
    game.load.image('health','assets/imgs/health.png');
    game.load.image('powerSUp', 'assets/imgs/SpeedUP.png');
    game.load.image('powerHUp', 'assets/imgs/HealthUP.png');
    game.load.image('powerEUp', 'assets/imgs/ShieldUP.png');
    game.load.image('PUshield', 'assets/imgs/shieldPU.png');
    game.load.image('ballEmitter', 'assets/imgs/ballParticle.png');
}

function loadPlayAudio(){
    game.load.audio('sndBounce', 'assets/snds/Bounce.wav');
    game.load.audio('sndLevel', 'assets/snds/LevelSucces.wav');
    game.load.audio('sndHurt', 'assets/snds/Hurt.wav');
    game.load.audio('sndFail', 'assets/snds/Fail.wav');
    game.load.audio('Musica', 'assets/snds/Musica.wav');
    game.load.audio('sndHeal', 'assets/snds/PowerUp.wav');
    game.load.audio('sndShield', 'assets/snds/Escudo.wav');
    game.load.audio('sndShieldBroken', 'assets/snds/EscudoRoto.wav');
    game.load.audio('sndSpeedUp', 'assets/snds/Speed.wav');
}

function displayPlayScreen()
{

    game.world.setBounds(0, 0, 400, 7400);
    game.world.width = 400;
    game.world.height = 7400;
    game.scale.setGameSize(400, 800);

    game.add.image(0,0, 'bgPlay');

    levelConfig = JSON.parse(game.cache.getText('level'));

    CurrentHealth = MaxHealth;
    contadorPlataformas = 0;
    newPlatform = 1;
    platformDestroyed = 0;
    finalPlayed = false;
    dead = false;
    InputUsed = false;

    createKeyControls();
    createPlatforms();
    createBall();
    createPowerUps();
    createSounds();
    createScore();
    CreateHealthBar();

    musica.play();

}

function updatePlay()
{
    manageBall();
    manageScore();
    managePhysics();
    managePlatforms();
    manageShield();
    letterPressed();
    manageCamera();

    if(level == 1) manageMovingPlatforms();
}

function managePhysics()
{
    game.physics.arcade.collide(ball, GroupPlatforms, PlatformCollision, null, this);
    game.physics.arcade.collide(ball, GroupSpikes, SpikeCollision, null, this);
    game.physics.arcade.collide(ball, GroupPowerUps, PowerUpCollision, null, this);
    game.physics.arcade.collide(ball, GroupMovingPlat, MovingPlatCollision, null, this);
}

function createKeyControls(){
    cursors = game.input.keyboard.createCursorKeys();
}

function CreateHealthBar()
{
    if(level == 2)return;

    x = 5;
    y = 35;
    heightRatio = 0.5;

    bg = game.add.sprite(x,y, 'health_bg');
    bg.height *= heightRatio;
    bg.fixedToCamera = true;

    h = game.add.sprite(x,y, 'health');
    h.height *= heightRatio;
    h.fixedToCamera = true;

    Health_original_width = h.width;
    HealthBar = h;
}

function createScore()
{
    if(level == 2)return;

    let scoreX = 5;
    let scoreY = 15;

    let styleText;

    if (level == 0){
        styleText = {fontSize: '18px', fill: '#000000'};
    }else if (level == 1){
        styleText = {fontSize: '18px', fill: '#FFFFFF'};
    }

    scoreText = game.add.text(scoreX, scoreY, 'Score: '+ score, styleText);

    if (level == 0){
        lvlText = game.add.text(scoreX + 150, scoreY, 'Level '+ 1 , styleText);
    }else if (level == 1){
        lvlText = game.add.text(scoreX + 150, scoreY, 'Level '+ 2 , styleText);
    }

    nicKText = game.add.text(scoreX + 320, scoreY, nickname, styleText);

    //variable auxiliar para el score
    scoreText.fixedToCamera = true;
    lvlText.fixedToCamera = true;
    nicKText.fixedToCamera = true;
}

let camera_originalY;
let ball_originalY;
let camera_targetY;

function manageCamera()
{
    if(level == 2)return;

    if(!dead){
        let sum = ball.y - ball_originalY*2.75;
        let newpos = camera_originalY + sum;


        if(newpos>game.camera.y)game.camera.y = newpos;
    }
}

function createSounds(){
    soundBounce = game.add.audio('sndBounce');
    soundLevel = game.add.audio('sndLevel');
    soundHurt = game.add.audio('sndHurt');
    soundFail = game.add.audio('sndFail');
    musica = game.add.audio('Musica', 1, true);
    soundHeal = game.add.audio('sndHeal');
    soundShield = game.add.audio('sndShield');
    soundShieldBroken = game.add.audio('sndShieldBroken',10);
    soundSpeed = game.add.audio('sndSpeedUp');
}

function createBall()
{
    InputUsed = false;
    camera_originalY = game.camera.y;
    ball_originalY = levelConfig.ballStart.y;
    ball_LastHitHeight = ball_originalY;
    ball = game.add.sprite(levelConfig.ballStart.x, ball_originalY, 'ball', 3);
    ball.width*=0.75;
    ball.height *=0.75;
    ball.anchor.setTo(0.5, 0.5);

    animation = ball.animations.add('rotate');
    ball.animations.play('rotate', 8, true);

    game.physics.arcade.enable(ball);

    if(level == 2)ball_maxBounce = 75;
    else ball_maxBounce = 150;
}

function manageBall()
{
    movementBall();
}


let ball;

let ball_velocity = 0;

let ball_bounceAcceleration = 0.3;
let ball_freefallAcceleration = 0.5;
let ball_maxBounce = 150;
let ball_maxVelocity = 15;


let ball_direction = -1;
let ball_LastHitHeight;
let InputUsed;




function movementBall()
{
    if(finalPlayed || !InputUsed)return;

    if(ball_direction == -1) // aceleracion cuando se va hacia arriba ( va disminuyendo)
    {
        distance = ((ball_LastHitHeight-ball_maxBounce) - ball.y)*-1;
        if(distance>1)ball_velocity = ball_bounceAcceleration*distance;
        else ball_direction = 1;
    }
    else // aceleracion cuando se va hacia abajo ( va aumentando)
    {
        ball_velocity += ball_freefallAcceleration;
    }

    if(level == 2 && ball_velocity > ball_maxVelocity)ball_velocity = ball_maxVelocity;
    nextY = ball.y + ball_velocity*ball_direction;
    ball.y = nextY;

    if(level == 2 && ball.y>600)GameOver();
}

Spike = function (game,x,y,nplatform)
{
    this.nplatform = nplatform;
    Phaser.Sprite.call(this, game, x, y, 'spike', 17,nplatform);
    game.physics.arcade.enable(this);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.width*=0.75;
    this.height*=0.75;

};

Spike.prototype = Object.create(Phaser.Sprite.prototype);
Spike.prototype.constructor = Spike;



Platform = function (game, x, y, nplatform)
{

    if(nplatform == -100)
    {
        Phaser.Sprite.call(this, game, x, y, 'movingP', 17, nplatform);
        game.physics.arcade.enable(this);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        return;
    }

    this.nplatform = nplatform;

    item = 'platform';
    frame = 17;

    Phaser.Sprite.call(this, game, x, y, item, frame, nplatform);

    game.physics.arcade.enable(this);

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;


    if(y === 7350)
    {
        this.width = 500;
        this.alpha =  0;
        return; // si es la ultima plata hacemos return para que no pueda sacar spike ni trap
    }


    dice = game.rnd.between(0,100); // random para establecer si tendra spike

    if(level != 2 && dice <=7 && nplatform != 1)
    {
        GroupSpikes.add(new Spike(game,x,y-20,nplatform));
    }

    if( level != 2 && game.rnd.between(0,100) <= 15 && nplatform != 1)// random para establecer si va a ser trap o platforma
    {
        this.istrap = true;
        this.loadTexture('trap');

    }

};

Platform.prototype = Object.create(Phaser.Sprite.prototype);
Platform.prototype.constructor = Platform;


let GroupPlatforms;
let GroupSpikes;
let GroupLetters;
let GroupMovingPlat;
let contadorPlataformas;

function createPlatforms()
{
    GroupPlatforms = game.add.group();
    if(level == 2)
    {
        GroupPlatforms.x = 200;
        GroupPlatforms.y = 350;

        GroupPlatforms.pivot.x = 200;
        GroupPlatforms.pivot.y = 350;
    }
    GroupSpikes = game.add.group();
    GroupLetters = game.add.group();
    GroupMovingPlat = game.add.group();

    levelConfig.platformData.forEach(createPlatform, this); // mete todas las platas menos la ultima
    GroupPlatforms.add(new Platform(game, 400/2, 7350, ++contadorPlataformas));//mete la ultima plata
}

function createPlatform(element)
{
    let x;
    let y = element.y;

    for(let i = 0, max = element.level.length; i < max; i++)
    {
        x = element.level[i].x;
        let plt = new Platform(game, x, y, element.nplatform);
        if(level == 2 && (element.rotation != 0))
        {
            plt.anchor.x = 0;
            plt.anchor.y = 0;
            plt.angle = element.rotation;
        }
        GroupPlatforms.add(plt);
    }

    if(element.nohole){
        let rndletter = arrayLetters[game.rnd.between(0,arrayLetters.length-1)];
        let lttr = game.add.text(x-10, y-120, rndletter, {
            font: '50px FantasqueSansMonoRegular',
            fontWeight: 'bold',
            fill:'#fff700'
        });
        lttr.nplatform = element.nplatform;
        GroupLetters.add(lttr);
    }

    else if(level == 1)
    {
        if(element.nplatform != 1)
        {

            let dice = game.rnd.between(0, 100);
            if(dice > 75)
            {
                movingP =  new Platform(game, element.hole*100, element.y, -100);
                //let movingP = game.add.image(element.hole*100, element.y, 'movingP');
                //game.physics.arcade.enable(movingP);

                let direction = game.rnd.pick([-1,1]);
                movingP.anchor.x = 0.5;
                movingP.anchor.y = 0.5;



                movingP.originalX = element.hole*100;
                movingP.nplatform = element.nplatform;
                movingP.direction = direction;


                GroupMovingPlat.add(movingP);
            }
        }
    }

    contadorPlataformas++;
}

let newPlatform;
let platformDestroyed;
let finalPlayed;
let contador;

function PlatformCollision (player, platform)
{
    //cuando se colisiona con una plataforma

    if(level == 2 && ball.y< ball_originalY)return;

    ball_direction = -1;
    ball_LastHitHeight = platform.y;

    if(platform.nplatform != newPlatform){
        ct = 0;
    }

    newPlatform = platform.nplatform;


    if(!speedUp){
        contador = 0;
    }
    else if(speedUp && contador >= 1){
        speedInvincible = false;
        speedUp = false;
        hudS.kill();
    }

    if(level != 2) destroyPlatform();
    else lvl2PlatformDestruction(platform);

    if (platform.istrap)//plata trap
    {
        if(shielded){
            platform.loadTexture('platform');
            platform.istrap = false;
            shieldSprite.kill();
            soundShieldBroken.play();
            shielded = false;
            hudE.kill();
        }
        else if (!speedInvincible){
            damage = ball_velocity*0.25;
            UpdateHealth(-damage);
            if (CurrentHealth <= 0){
                soundFail.play();
            }else{
                soundHurt.play();
            }
        }
    }



    //reproducir sonido
    if (ball.y < 7200 ) //Plataforma normal
        soundBounce.play();
    else //Plataforma final
    {
        LevelCompleted();
    }

}

function LevelCompleted()
{
    if(!finalPlayed)
    {
        soundLevel.play();
        finalPlayed = true;
        game.input.enabled = false;
        passed = true;
        game.time.events.add(2000, getEndScreen, this);
    }
}

function lvl2PlatformDestruction(platform)
{
   // SpawnParticles(platform); no funciona porque al rotar el grupo no se actualiza la posicion de las plataformas individuales(lmao)
   platform.kill();

   if(GroupPlatforms.countLiving()== 1)LevelCompleted();
}

let dead;

function UpdateHealth(value)
{
    newvalue = CurrentHealth+value;

    CurrentHealth = newvalue;

    if(CurrentHealth<=0)
    {
        GameOver();

    }
    else if (CurrentHealth > 100)// update UI
    {
        newwidth = Health_original_width;
        HealthBar.width = newwidth;
    }
    else{
        newwidth = Health_original_width*(CurrentHealth*0.01);
        HealthBar.width = newwidth;
    }



}

function GameOver()
{
    if(level != 2) HealthBar.width = 0;
    game.input.enabled = false;
    passed = false;
    dead = true;
    ballBurst();
    ball.kill();

    game.time.events.add(2000, getEndScreen, this);
}

function SpikeCollision (player, spike)
{
    if(shielded){
        spike.kill();
        shieldSprite.kill();
        shielded = false;
        hudE.kill();
    }
    else if(!speedInvincible){
        damage = ball_velocity*0.75;
        UpdateHealth(-damage);
        spike.kill();
        if (CurrentHealth <= 0){
            soundFail.play();
        }
        else{
            soundHurt.play();
        }
    }
}

let minX = -200;
let maxX = 500;

function movementPlatforms(direction)
{
    for (var i = 0, len = GroupPlatforms.children.length; i < len; i++)
    {
        if(GroupPlatforms.children[i].y == 7350) continue;

        nextX = GroupPlatforms.children[i].x + 10*direction;
        if(nextX>=maxX+10)nextX = minX;
        if(nextX<=minX-10)nextX = maxX;
        GroupPlatforms.children[i].x = nextX;
    }

    for (var i = 0, len = GroupSpikes.children.length; i < len; i++)
    {

        nextX = GroupSpikes.children[i].x + 10*direction;
        if(nextX>=maxX+10)nextX = minX;
        if(nextX<=minX-10)nextX = maxX;
        GroupSpikes.children[i].x = nextX;
    }

    for (var i = 0, len = GroupPowerUps.children.length; i < len; i++)
    {

        nextX = GroupPowerUps.children[i].x + 10*direction;
        if(nextX>=maxX+10)nextX = minX;
        if(nextX<=minX-10)nextX = maxX;
        GroupPowerUps.children[i].x = nextX;
    }

    for (var i = 0, len = GroupLetters.children.length; i < len; i++)
    {

        nextX = GroupLetters.children[i].x + 10*direction;
        if(nextX>=maxX+10)nextX = minX;
        if(nextX<=minX-10)nextX = maxX;
        GroupLetters.children[i].x = nextX;
    }

    for (var i = 0, len = GroupMovingPlat.children.length; i < len; i++)
    {

        nextX = GroupMovingPlat.children[i].x + 10*direction;
        if(nextX>=maxX+10)nextX = minX;
        if(nextX<=minX-10)nextX = maxX;
        GroupMovingPlat.children[i].x = nextX;
        GroupMovingPlat.children[i].originalX = nextX;
    }

}

function managePlatforms()
{

    if (cursors.left.isDown || game.input.speed.x < 0)
    {
        if(!InputUsed)InputUsed = true;

        if(level != 2) movementPlatforms(-1);
        else GroupPlatforms.rotation += -0.2;
    }
    else if (cursors.right.isDown || game.input.speed.x > 0)
    {
        if(!InputUsed)InputUsed = true;

        if(level != 2) movementPlatforms(+1);
        else GroupPlatforms.rotation += 0.2;
    }
}

function manageScore()
{
    if(level == 2)return;
    scoreText.setText(contadorPlataformas - newPlatform);
}

function getEndScreen(){
    musica.stop();
    game.state.start('end');
}

let GroupPowerUps;

function createPowerUps() {
    GroupPowerUps = game.add.group();
    GroupPowerUps.enableBody = true;
    levelConfig.powerData.forEach(createPowerUp, this);
    GroupPowerUps.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
}

function createPowerUp(element) {
    dice = game.rnd.between(0, 66);
    if(dice < 22){
        GroupPowerUps.create(element.x, element.y, 'powerHUp');
    }
    else if(dice < 44){
        GroupPowerUps.create(element.x, element.y, 'powerSUp');
    }
    else{
        GroupPowerUps.create(element.x, element.y, 'powerEUp');
    }
}

let shielded = false;
let shieldSprite;
let speedUp = false;
let speedInvincible = false;

function PowerUpCollision(player, powerUp){
    if(powerUp.texture.baseTexture.source.name == 'powerHUp'){
        powerUp.kill();
        soundHeal.play();
        UpdateHealth(15);
    }
    if(powerUp.texture.baseTexture.source.name == 'powerEUp'){
        powerUp.kill();
        shielded = true;
        soundShield.play();
        shieldSprite = game.add.image(ball.x + 10, ball.y + 10, 'PUshield');
        //
        hudE = game.add.image(330, 740, 'powerEUp');
        hudE.fixedToCamera = true;
    }
    if(powerUp.texture.baseTexture.source.name == 'powerSUp'){
        powerUp.kill();
        speedUp = true;
        soundSpeed.play();
        speedInvincible = true;
        direction = 1;
        ball_velocity += 200;
        //
        hudS = game.add.image(330, 740, 'powerSUp');
        hudS.fixedToCamera = true;
    }
}

function manageShield(){
    if(shielded){
        shieldSprite.x = ball.x + 10;
        shieldSprite.y = ball.y + 10;
    }
}

function ballBurst(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    let emitter2 = game.add.emitter(0, 0, 100);
    emitter2.makeParticles('ballEmitter');
    emitter2.gravity = 200;
    emitter2.x = ball.x;
    emitter2.y = ball.y;
    emitter2.start(true,2000, null, 10);
}

function SpawnParticles(platform)
{
    let emitter = game.add.emitter(platform.x, platform.y, 50);
    emitter.makeParticles('plEmitter');
    emitter.gravity = 50;
    emitter.start(true, 1000, null, 25);
}

function destroyPlatform(){
    if(ball_velocity > 45 && newPlatform > platformDestroyed+1 && newPlatform != contadorPlataformas && !speedUp) // destruccion de platas y obstaculos al ir to follao
    {
        GroupPlatforms.forEach(platform =>
        {
            if(platform.nplatform == newPlatform)
            {
                SpawnParticles(platform);
                platform.kill();
            }
        });


        GroupSpikes.forEach(spike=>
        {
            if(spike.nplatform == newPlatform)
            {
                spike.kill();
            }
        });

        platformDestroyed = newPlatform;

    }
    else if(ball_velocity > 45 && speedUp){
        GroupPlatforms.forEach(platform =>
            {
                if(platform.nplatform == newPlatform)
                {
                    platform.kill();
                }
            });


            GroupSpikes.forEach(spike=>
            {
                if(spike.nplatform == newPlatform)
                {
                    spike.kill();
                }
            });
        contador++;
    }
}

let ct = 0;

function letterPressed() {
    for(let i = 0; i < GroupLetters.children.length; i++){
        if(newPlatform == GroupLetters.children[i].nplatform){
            let work = GroupLetters.children[i]._text;
            work = work.toLowerCase();
            if(game.input.keyboard.lastChar == work){
                GroupLetters.children[i].kill();
                GroupPlatforms.forEach(platform =>{
                    if(platform.nplatform == newPlatform && platform.x-10 == GroupLetters.children[i].x && platform.y-120 == GroupLetters.children[i].y)
                    {
                        if (ct == 0){
                            let emitter = game.add.emitter(platform.x, platform.y, 50);
                            emitter.makeParticles('plEmitter');
                            emitter.gravity = 50;
                            emitter.start(true, 1000, null, 25);
                            platform.kill();
                            ct++;
                        }
                    }
                });
                GroupSpikes.forEach(spike=>
                {
                    if(spike.nplatform == newPlatform && spike.x-10 == GroupLetters.children[i].x && spike.y-100 == GroupLetters.children[i].y)
                    {
                        spike.kill();
                    }
                });
            }
        }
    }
}

function manageMovingPlatforms()
{
    GroupMovingPlat.forEach(platform =>
        {
        if(platform.nplatform == newPlatform)
        {
            let newX = platform.x + 1*platform.direction;
            platform.x = newX;

            if(platform.direction == 1 && Math.abs(newX-platform.originalX) > 100) platform.direction = -1;
            else if(Math.abs(newX-platform.originalX) > 100) platform.direction = 1;
        }
    });
}

function MovingPlatCollision (player, movingP)
{

    ball_direction = -1;
    ball_LastHitHeight = movingP.y;
    soundBounce.play();

    //old

    if(shielded)
    {
        //movingP.kill();
        shieldSprite.kill();
        shielded = false;
    }
    else if(!speedInvincible){
        damage = ball_velocity*0.15;
        UpdateHealth(-damage);
        //movingP.kill();
        if (CurrentHealth <= 0){
            soundFail.play();
        }
        else{
            soundHurt.play();
        }
    }
}