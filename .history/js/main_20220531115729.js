import { getCellElementList, getCurrentTurnElement, getCellElementAtIdx, getGameStatusElement } from "./selectors.js";

/**
 * Global variables
 */
let currentTurn = "cross";
let isGameEnded = false;
let cellValues = new Array(9).fill("");

function handleCellClick(cell, index) {
    console.log('click', cell, index)
}

function initCellElementList() {
    const cellElementList = getCellElementList();
    for(const cell of cellElementList) {
        cell.addEventListener("click", () => handleCellClick(cell))
    }
    cellElementList.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(cell, index))
    })
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
    initCellElement()
})()