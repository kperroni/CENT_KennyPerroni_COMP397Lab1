/*      Source file name: movement.js
        Author's name: Kenny Perroni
        Last Modified by: Kenny Perroni
        Date Last Modified: 6/14/2017
        Program Description: Handles the movement of the player and inventory through the keyboard arrows.
        Revision History: 6/10/2017 movement implemented
                          6/12/2017 code refactored
                          6/14/2017 winning and losing condition implemented
*/

//This function executes when the keyboard arrows or the I key is pressed. Handles the movement and Inventory events
function onDPad(e) {

    nextX = player.x;
    nextY = player.y;
    var band = false;

    //If player is not moving
    if (!movement) {

        switch (e.keyCode) {

            case ARROW_KEY_LEFT:
                if (!offLimits(positionX, positionY - 1)) {
                    if (!checkCollision(positionX, positionY - 1, PLAYER_VELOCITY)) {
                        updateWorld(positionX, positionY - 1);
                        if (positionX != positionInitialX || positionY != positionInitialY || iconMatrix[positionX][positionY] != "TAKEN") {
                            fogMatrix[positionX][positionY].visible = false;
                            iconMatrix[positionX][positionY].visible = true;
                        }
                        nextX -= PLAYER_VELOCITY;
                    }
                }
                else
                    band = true;
                break;

            case ARROW_KEY_RIGHT:
                if (!offLimits(positionX, positionY + 1)) {
                    if (!checkCollision(positionX, positionY + 1, PLAYER_VELOCITY)) {
                        updateWorld(positionX, positionY + 1);
                        if (positionX != positionInitialX || positionY != positionInitialY || iconMatrix[positionX][positionY] != "TAKEN") {
                            fogMatrix[positionX][positionY].visible = false;
                            iconMatrix[positionX][positionY].visible = true;
                        }
                        nextX += PLAYER_VELOCITY;
                    }
                }
                else
                    band = true;
                break;

            case ARROW_KEY_UP:
                if (!offLimits(positionX - 1, positionY)) {
                    if (!checkCollision(positionX - 1, positionY, PLAYER_VELOCITY)) {
                        updateWorld(positionX - 1, positionY);
                        if (positionX != positionInitialX || positionY != positionInitialY || iconMatrix[positionX][positionY] != "TAKEN") {
                            fogMatrix[positionX][positionY].visible = false;
                            iconMatrix[positionX][positionY].visible = true;
                        }
                        nextY -= PLAYER_VELOCITY;
                    }
                }
                else
                    band = true;
                break;

            case ARROW_KEY_DOWN:
                if (!offLimits(positionX + 1, positionY)) {
                    if (!checkCollision(positionX + 1, positionY, PLAYER_VELOCITY)) {
                        updateWorld(positionX + 1, positionY);
                        if (positionX != positionInitialX || positionY != positionInitialY || iconMatrix[positionX][positionY] != "TAKEN") {
                            fogMatrix[positionX][positionY].visible = false;
                            iconMatrix[positionX][positionY].visible = true;
                        }
                        nextY += PLAYER_VELOCITY;
                    }
                }
                else
                    band = true;
                break;

            case INVENTORY: //Shows inventory when I is pressed
                console.log("Inventory:");
                console.log(inventory);
                console.log(countInventory);
                break;
        }

        if (!band && !loser) {
            movement = true;
            createjs.Tween.get(player, { loop: false }).to({ x: nextX, y: nextY }, 300, createjs.Ease.backIn).call(handleComplete);
        }
    }
}

//This function checks if the player wins or loses
function handleComplete() {

    movement = false;

    if (checkWinner()) {
        setTimeout(function timer() {
            movement = true;
            showMessage("Game Over", "Congratulations! You win", 1);
            createjs.Sound.stop("backtrack");
            createjs.Sound.play("win");
        }, 1000);

    }

    if (checkLoser()) {
        movement = true;
        createjs.Sound.play("death");
        createjs.Tween.get(player, { loop: false }).to({ y: stage.canvas.height }, 2000, createjs.Ease.bounceIn).call(loseComplete);

    }
}

//Executes after death animation ends
function loseComplete() {

    setTimeout(function timer() {

        showMessage("Game Over", "You have crashed the plane! You lose", 0);
        createjs.Sound.play("lose");
    }, 300);

}