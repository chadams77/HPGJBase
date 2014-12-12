var GAME = GAME || {};

// Automatically resizes game area to full screen
// functions PX and PY convert world units to game units
// Where GH (game height) is always 100, and GW (game width) is always 100 * the aspect ratio

GAME.Init = function ( )
{
    GAME.W = $(window).width();
    GAME.H = $(window).height();

    var setBuffer = function ( )
    {
        if (GAME.bfrImg)
        {
            GAME.bfrImg.parent.removeChild(GAME.bfrImg);
            GAME.bfrImg.kill();
        }

        GAME.bfr = GAME.game.make.bitmapData(GAME.W, GAME.H);
        GAME.bfrImg = GAME.bfr.addToWorld(0, 0);

        GAME.GW = 100 * (GAME.W/GAME.H);
        GAME.GH = 100;
    };

    var game = GAME.game = new Phaser.Game(GAME.W, GAME.H, Phaser.AUTO, '', {
        preload: function () {

            //game.load.image('ship', 'img/ship.png');

        },
        create: function () {

            setBuffer();

        },
        update: GAME.Update
    });

    $(window).resize(function(){
        GAME.W = $(window).width();
        GAME.H = $(window).height();
        game.width = GAME.W;
        game.height = GAME.H;
        game.renderer.resize(GAME.W, GAME.H);
        setBuffer();
    });

};

// Convert world coords to screen
var PX = function ( x )
{
    return (x/GAME.GW) * GAME.W;
};

var PY = function ( y )
{
    return (y/GAME.GH) * GAME.H;
};

// sz: Units on screen
// isz: Original size of image in pixels
var PSCALE = function ( sz, isz )
{
    return PY(sz) / isz;
};

// Returns the time elapsed in seconds since the game started
// Pauses if window loses context
var __ctime = 0.0;
var ctime = function ( )
{
    return __ctime;
};

GAME.Update = function ( )
{
    // Update timer
    var delta = 1.0/60.0;
    var newTime = GAME.game.time.now / 1000.0;
    if (GAME.lastFrameTime)
        delta = newTime - GAME.lastFrameTime;
    GAME.lastFrameTime = newTime;
    if (delta > 1/10) delta = 1/10;
    __ctime += delta;

    // Clear screen
    GAME.bfr.ctx.fillStyle = 'black';
    GAME.bfr.ctx.fillRect(0, 0, GAME.W, GAME.H);

    // --- Update and render

    // -- Sprite rendering example

    //var spr = GAME.game.make.sprite(0, 0, 'ship');
    //spr.anchor.set(0.5);
    //spr.scale.set(PSCALE(10, 128.0));

    //GAME.bfr.draw(spr, PX(gameX), PY(gameY));

    // -- Context available (GAME.bfr.ctx for manual drawing)

    // -- Keyboard input example

    // if (GAME.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { ... left arrow pressed ... }
};