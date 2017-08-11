/*      Source file name: worldHandler.js
        Author's name: Kenny Perroni
        Last Modified by: Kenny Perroni
        Date Last Modified: 06/14/2017
        Program Description: Creates, updates, and resets the world.
        Revision History: 6/09/2017 world creation implemented
                          6/11/2017 code refactored
                          6/13/2017 details implemented (delay function)
                          
*/

//If the movement of the player is allowed, the world matrix is updated with the new values
function updateWorld(x, y) {

    world[x][y] = PLAYER_CODE;
    world[positionX][positionY] = ALLOWED_CODE;
    positionX = x;
    positionY = y;
}

//Creates the world according to the matrix defined with its different game objects and covers the map with fog
function createWorld() {

    var x = 0;
    var y = 0;
    var tile = null;
    var icon = null;
    var fog = null;

    for (i = 0; i < world.length; i++) {
        for (j = 0; j < world[i].length; j++) {

            switch (world[i][j]) { //World matrix position

                case PLAYER_CODE:
                    tile = createTile(x, y);
                    icon = createIcon(x, y, PLAYER_ICON);
                    player = icon;
                    playerStagePositionX = x + FIX_IMAGE;
                    playerStagePositionY = y + FIX_IMAGE;
                    fog = createIcon(x, y, FOG_ICON);
                    break;

                case WALL_CODE:
                    tile = createTile(x, y);
                    icon = createIcon(x, y, WALL_ICON);
                    fog = createIcon(x, y, FOG_ICON);
                    break;

                case GOAL_CODE:
                    tile = createTile(x, y);
                    icon = createIcon(x, y, GOAL_ICON);
                    fog = createIcon(x, y, FOG_ICON);
                    break;

                case ALLOWED_CODE:
                    tile = createTile(x, y);
                    icon = createIcon(x, y, ALLOWED_ICON);
                    fog = createIcon(x, y, FOG_ICON);
                    break;

                case DANGER_CODE:
                    tile = createTile(x, y);
                    icon = createIcon(x, y, DANGER_ICON);
                    fog = createIcon(x, y, FOG_ICON);
                    break;

                case DANGER1_CODE:
                    tile = createTile(x, y);
                    icon = createIcon(x, y, DANGER1_ICON);
                    fog = createIcon(x, y, FOG_ICON);
                    break;

                case BONUS_CODE:
                    tile = createTile(x, y);
                    icon = createIcon(x, y, BONUS_ICON);
                    fog = createIcon(x, y, FOG_ICON);
                    break;

                case BONUS1_CODE:
                    tile = createTile(x, y);
                    icon = createIcon(x, y, BONUS1_ICON);
                    fog = createIcon(x, y, FOG_ICON);
                    break;

            }
            //Adding items to the stage
            stage.addChild(tile);
            stage.addChild(icon);

            if (world[i][j] != PLAYER_CODE)
                stage.addChild(fog);

            iconMatrix[i][j] = icon;
            bonusMatrix[i][j] = icon;
            fogMatrix[i][j] = fog;

            x += 100;
        }
        y += 100;
        x = 0;
    }
}

//The world matrix is reset using an auxMatrix that holds the initial values
//Calls functions to get the player's initial position and the winner position
//Hides the map in fog
function resetWorld() {

    for (i = 0; i < world.length; i++) {
        for (j = 0; j < world[i].length; j++) {
            world[i][j] = auxWorld[i][j];
        }
    }
    getPlayerInitialPosition();
    getWinnerPosition();
    restoreBonus();
    initializeInventory();
    setTimeout(function timer() {

        for (i = 0; i < fogMatrix.length; i++) {
            for (j = 0; j < fogMatrix[i].length; j++) {
                if (fogMatrix[i][j] != null) {
                    if (fogMatrix[i][j].visible == false)
                        createjs.Tween.get(fogMatrix[i][j]).to({ x: j, y: i, visible: true }, 250, createjs.Ease.quadOut).call(restoreFog, [fogMatrix[i][j], i, j], this);
                }
                if (world[i][j] == 2) {
                    iconMatrix[i][j].visible = true;
                }
                else
                    iconMatrix[i][j].visible = false;
            }
        }
    }, 300);
}

//Resets the bonus matrix
function restoreBonus() {

    for (i = 0; i < world.length; i++) {
        for (j = 0; j < world[i].length; j++) {

            if (world[i][j] == BONUS_CODE) {
                iconMatrix[i][j] = bonusMatrix[i][j];
            }

            if (world[i][j] == BONUS1_CODE) {
                iconMatrix[i][j] = bonusMatrix[i][j];
            }
        }
    }


}

//Animates fog when resetting the world
function restoreFog(item, i, j) {
    createjs.Tween.get(item).to({ x: (j * 100) + FIX_IMAGE, y: (i * 100) + FIX_IMAGE, visible: true }, 250, createjs.Ease.quadOut);
    movement = false;
}