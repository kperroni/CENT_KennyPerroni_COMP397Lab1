/*      Source file name: collision.js
        Author's name: Kenny Perroni
        Last Modified by: Kenny Perroni
        Date Last Modified: 06/14/2017
        Program Description: Checks if the movement of the player is allowed and if any game objects collide with the player.
        Revision History: 6/11/2017 collision implemented
                          6/13/2017 code refactored
                          6/15/2017 details implemented (tweening added when colliding)
*/

//Checks if the player collides with a game object and executes the correspondant statements
function checkCollision(x, y, playerMove) {

    switch (world[x][y]) { //Position that the player will move to

        case DANGER_CODE:

            if (y < positionY) //Moving to the left
                nextX -= playerMove;

            if (y > positionY) //Moving to the right
                nextX += playerMove;

            if (x < positionX) //Moving Up
                nextY -= playerMove;

            if (x > positionX) //Moving Down
                nextY += playerMove;

            fogMatrix[x][y].visible = false;
            iconMatrix[x][y].visible = true;
            movement = false;
            loserFlag = true;
            createjs.Sound.stop("backtrack");
            return true;

        case DANGER1_CODE:
            nextX = playerStagePositionX;
            nextY = playerStagePositionY;
            fogMatrix[x][y].visible = false;
            iconMatrix[x][y].visible = true;
            movement = true;
            resetWorld();
            return true;

        case WALL_CODE:
            showMessage("Hold it!", "You cannot go into the thunderstorm!", 2);
            fogMatrix[x][y].visible = false;
            iconMatrix[x][y].visible = true;
            createjs.Sound.play("thunder");
            return true;

        case BONUS_CODE:
            fogMatrix[x][y].visible = false;
            iconMatrix[x][y].visible = true;
            createjs.Tween.get(iconMatrix[x][y], { loop: false, visible: true }).to({ y: bonusMovement(x, y, playerMove) }, 200, createjs.Ease.bounceOut).call(bonusVanish, [iconMatrix[x][y], x, y, playerMove], this);
            inventory[0] = "Fuel";
            countInventory[0] += 1;
            iconMatrix[x][y] = "TAKEN";
            createjs.Sound.play("bonus");
            return false;

        case BONUS1_CODE:
            fogMatrix[x][y].visible = false;
            iconMatrix[x][y].visible = true;
            createjs.Tween.get(iconMatrix[x][y], { loop: false, visible: true }).to({ y: bonusMovement(x, y, playerMove) }, 200, createjs.Ease.bounceOut).call(bonusVanish, [iconMatrix[x][y], x, y, playerMove], this);
            inventory[1] = "Luggage";
            countInventory[1] += 1;
            iconMatrix[x][y] = "TAKEN";
            createjs.Sound.play("bonus");
            return false;

        default:
            return false;
    }

}

//Vanishes the bonus as soon as the player reaches it
function bonusVanish(myBonus, x, y, playerMove) {

    setTimeout(function timer() {

        myBonus.visible = false;
        myBonus.y = nextY;
    }, 250);
}

//Checks if the movement executed by the player is allowed
function offLimits(x, y) {

    if (x > (world.length - 1) || x < 0 || y > (world[0].length - 1) || y < 0) {

        if (y < positionY) //Moving to the left
            nextX = FIX_IMAGE;

        if (y > positionY) //Moving to the right
            nextX = FIX_IMAGE;

        if (x < positionX) //Moving Up
            nextY = FIX_IMAGE;

        if (x > positionX) //Moving Down
            nextY = FIX_IMAGE;

        showMessage("Hold it!", "You are not allowed to fly out of boundaries!", 2);
        return true;
    }

    return false;

}

//Checks the direction of the movement of the player
function bonusMovement(x, y, playerMove) {

    if (y < positionY || y > positionY) //Moving to the left or right
        return nextY - playerMove;

    if (x < positionX) //Moving Up
        return nextY - playerMove - playerMove;

    if (x > positionX) //Moving Down
        return nextY;

}