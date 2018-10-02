var config = {
    type: Phaser.AUTO,
    width: 800, //
    height: 600,
    parent: "container", // Esto es por como esta creado el html
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
          //  gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);


var player;
var stars;
var platforms;
var cursors;
var gameOver = false;





function preload ()
{
  console.log("iniciando preload")
    this.load.image('sky', '../assets/fondo2.png');
    this.load.image('ground', '../assets/platformBlanca.png');
    this.load.image('star', '../assets/nota.png');
    this.load.image('bomb', '../assets/bomb.png');
    this.load.spritesheet('dude', '../assets/playerAmarillo.png', { frameWidth: 51, frameHeight: 48 });
}

function create ()
{
console.log("iniciando create")
background = this.add.image(400, 300,'sky');



    player = this.physics.add.sprite(300, 400, 'dude'); // aca arma el jugador.

// Lo nuevo
  barras = this.physics.add.image(600, 0, 'ground'); // Se agrega las barras
  barras.body.setVelocityY(100); // Puede ser velocidad o aceleracion. Si es aceleracion, se hace cada vez mas veloz.
    barras.body.setAccelerationY(10);
player.setCollideWorldBounds(true); // Esto es para que frene si toca un borde

    // lo que sigue crea las animaciones para cuando se mueve.

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        //frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6 }),
        frameRate: 10,
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 15,
        repeat: -1
    });


  //Define los cursores
    cursors = this.input.keyboard.createCursorKeys();


// Declara el callback cuando coliciona el player y la barra
    this.physics.add.collider(player, barras, hitBarra, null, this); // Para la interseccion  entre barra y player

// Comando util para debuguear
  console.log(barras)


}

function update ()
{
// Para que la particula se mueva libremente
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }

  else  if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else {
      player.setVelocityX(0);
    }
   if (cursors.up.isDown)
    {

        player.setVelocityY(-160);

        player.anims.play('up', true);
    }
  else  if (cursors.down.isDown)
    {
        player.setVelocityY(160);

        player.anims.play('down', true);
    }
    else
    {
          player.setVelocityY(0);

        player.anims.play('turn');
    }
	moverFondo();

  magiabarra();


}

function moverFondo()
{
background.y +=2;
if(background.y >= 1445){
	background.y = -845;
  }
}
function hitBarra (player, barras) // No se de donde saque esta funcion.
{
  console.log("hitbarra")
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}
function magiabarra(){ // Es la misma barra una y otra vez.
  if (barras.y>700) {
    barras.y=0;
    barras.x = Phaser.Math.Between(0, 600);
    var escala=Phaser.Math.Between(1, 5);
    barras.setScale(1/escala,1);
    console.log(escala)
    console.log(barras.x)

}


}
