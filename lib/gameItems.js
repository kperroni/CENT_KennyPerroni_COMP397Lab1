/*      Source file name: gameItems.js
        Author's name: Kenny Perroni
        Last Modified by: Kenny Perroni
        Date Last Modified: 06/14/2017
        Program Description: Creates tiles, icons, initializes winner position (i,j), checks if the player wins,
        initializes player initial position, creates and shows winning or losing message.
        Revision History: 6/09/2017 tiles and icons creation implemented
                          6/12/2017 code refactored
                          6/15/2017 details implemented (showMessage function)
*/

//Creates a tile in the world
function createTile(x, y) {
    myTile = new createjs.Shape();
    myTile.graphics.rect(x, y, TILE_WIDTH, TILE_HEIGHT);
    return myTile;
}

//Creates a game object according to the icon parameter (fog, danger, player, danger1, bonus, bonus1)
function createIcon(x, y, icon) {

    var myIcon = null;
    myIcon = new createjs.Bitmap(icon);
    myIcon.x = x + (FIX_IMAGE);
    myIcon.y = y + (FIX_IMAGE);

    if (icon != FOG_ICON) {
        blurFilter = new createjs.BlurFilter(0, 0, 1);
        myIcon.filters = [blurFilter];
        var bounds = blurFilter.getBounds();
        myIcon.cache(-50 + bounds.x, -50 + bounds.y, 100 + bounds.width, 100 + bounds.height);
        if (icon != PLAYER_ICON)
            myIcon.visible = false;
    }

    else {
        blurFilter = new createjs.BlurFilter(0, 0, 1);
        myIcon.filters = [blurFilter];
        var bounds = blurFilter.getBounds();
        myIcon.cache(-50 + bounds.x, -50 + bounds.y, 100 + bounds.width, 100 + bounds.height);
    }

    myIcon.image.onload = function () {
        stage.update();
    }
    return myIcon;
}

//Show the instructions of the game at the beginning of the game
function showIntructions() {
    var ins = new createjs.DOMElement(instructions);
    ins.alpha = 0;
    ins.regX = 200;
    ins.x = (stage.canvas.width) - ins.width;
    ins.y = 0;
    stage.addChild(ins);
    createjs.Tween.get(ins).wait(1000).to({ y: 40, alpha: 1 }, 1000, createjs.Ease.quadOut);
}

//Creates an instance of a div that contains a game over message
function createMessage() {
    myMessage = new createjs.DOMElement(message);
    myMessage.alpha = 1;
    myMessage.regX = 200;
    myMessage.x = stage.canvas.width / 2;
    myMessage.y = 0;
    myMessage.visible = false;
    stage.addChild(myMessage);
}

//Shows the game over instance
function showMessage(header, message, type) {
    document.getElementById("text").innerHTML = message;
    document.getElementById("header").innerHTML = header;
    myMessage.y = 0;

    if (type == 1) { //if player wins
        document.getElementById("canvas").hidden = true;
        document.getElementById("message").style.backgroundColor = "#80ff80";
        myMessage.visible = true;
        createjs.Tween.get(myMessage).wait(250).to({ y: 100, alpha: 1 }, 1000, createjs.Ease.quadOut);

    }
    else {
        if (type == 0) { //if player loses
            document.getElementById("canvas").hidden = true;
            document.getElementById("message").style.backgroundColor = "#d98c8c";
            myMessage.visible = true;
            createjs.Tween.get(myMessage).wait(250).to({ y: 100, alpha: 1 }, 1000, createjs.Ease.quadOut);
        }

        else { //collision object or off limits
            document.getElementById("message").style.backgroundColor = "#b3b3ff";
            myMessage.visible = true;
            createjs.Tween.get(myMessage).wait(250).to({ y: 100, alpha: 1 }, 1000, createjs.Ease.quadOut).call(wallTween, [myMessage], this);
        }
    }

}

//Executes after showing the message when hitting a wall or going off limits
function wallTween(message) {

    message.visible = false;
}

//Gets the player initial position
function getPlayerInitialPosition() {

    var band = false;

    for (i = 0; i < world.length; i++) {

        if (band == true)
            break;

        for (j = 0; j < world[i].length; j++) {

            if (world[i][j] == 2) {
                positionX = positionInitialX = i;
                positionY = positionInitialY = j;
                band = true;
                break;
            }
        }
    }
}

//Gets the winning position
function getWinnerPosition() {
    var band = false;

    for (i = 0; i < world.length; i++) {

        if (band == true)
            break;

        for (j = 0; j < world[i].length; j++) {

            if (world[i][j] == 3) {
                positionWinnerX = i;
                positionWinnerY = j;
                band = true;
                break;
            }
        }
    }
}

//Initializes matrices to keep track of game objects
function initializeMatrices() {

    for (var i = 0; i < world.length; i++) {
        fogMatrix[i] = new Array(world[i].length);
        iconMatrix[i] = new Array(world[i].length);
        bonusMatrix[i] = new Array(world[i].length);
    }
}

//Initializes inventory arrays
function initializeInventory() {

    for (var i = 0; i < 2; i++) {
        inventory[i] = "";
        countInventory[i] = 0;
    }
}

//Checks if the player wins
function checkWinner() {

    return (positionX == positionWinnerX && positionY == positionWinnerY);
}

//Checks if the player loses
function checkLoser() {

    return loserFlag;
}
