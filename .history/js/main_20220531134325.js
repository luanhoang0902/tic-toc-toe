import { getCellElementList, getCurrentTurnElement, getCellElementAtIdx, getGameStatusElement } from "./selectors.js";
import { TURN } from "./constants.js";

/**
 * Global variables
 */
let currentTurn = TURN.CROSS;
let isGameEnded = false;
let cellValues = new Array(9).fill("");

function toggleTurn() {
    // toggle turn
    currentTurn = currentTurn === TURN.CIRCLE? TURN.CROSS:TURN.CIRCLE

    // update turn on DOM element
    const currentTurnElement = getCurrentTurnElement();
    if(currentTurnElement){
        currentTurnElement.classList.remove(TURN.CROSS, TURN.CIRCLE)
    }
}

function handleCellClick(cell, index) {
    cell.classList.add(currentTurn)
    toggleTurn()
}
function initCellElementList() {
    const cellElementList = getCellElementList();
    cellElementList.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(cell, index));
    });
}
/**
 * TODOs
 *
 * 1. Bind click event for all cells
 * 2. On cell click, do the following:
 *    - Toggle current turn
 *    - Mark current turn to the selected cell
 *    - Check game state: win, ended or playing
 *    - If game is win, highlight win cells
 *    - Not allow to re-click the cell having value.
 *
 * 3. If game is win or ended --> show replay button.
 * 4. On replay button click --> reset game to play again.
 *
 */
(()=> {
    initCellElementList();
})()