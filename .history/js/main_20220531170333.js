import { getCellElementList, getCurrentTurnElement, getCellElementAtIdx, getGameStatusElement, getReplayButtonElement } from "./selectors.js";
import { CELL_VALUE, GAME_STATUS, TURN } from "./constants.js";
import { checkGameStatus } from "./utils.js";

// console.log(checkGameStatus(['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O']).status);
/**
 * Global variables
 */
// Biến class X O được lấy ra từ Global variables
let currentTurn = TURN.CROSS;
let gameStatus = GAME_STATUS.PLAYING;
// Khởi tạo mảng 9 phần tử chuỗi rỗng
let cellValues = new Array(9).fill("");

// Thay đổi biến chứa class quy định X O. Đồng thời add css đó vào turn( hiển thị người đi tiếp theo)
function toggleTurn() {
    // toggle turn: Sau mỗi lần click thì sẽ đổi lại biến class X O
    currentTurn = currentTurn === TURN.CIRCLE? TURN.CROSS:TURN.CIRCLE

    // update turn on DOM element: Thay đổi X O ở turn
    const currentTurnElement = getCurrentTurnElement();
    if(currentTurnElement){
        currentTurnElement.classList.remove(TURN.CROSS, TURN.CIRCLE)
        currentTurnElement.classList.add(currentTurn)
    }
}
// Hàm xử lý thay đổi element status nhận vào dữ liệu được lấy ra từ các case trả về. Dữ liệu là 4 TH. X WIN, O Win, PLAYING, END GAME.
function updateGameStatus(newGameStatus){
    gameStatus = newGameStatus;
    const gameStatusElement = getGameStatusElement();
    // Dữ liệu được truyền vào text của element
    if(gameStatusElement) gameStatusElement.textContent = newGameStatus;
}
// Hàm được gọi sẽ làm hiện buttom lên. Với hai case là End game và Win
function showReplayButton(){
    const replayButton = getReplayButtonElement();
    if(replayButton) replayButton.classList.add('show')

}
// Hàm giúp hightlight lên đường win. Nhận vào phần tử winPositions( phần tử chứa trường hợp win) trong object của hàm checkGameStatus trả về.
function highlightWinCells(winPositions){
    if(!Array.isArray(winPositions) || winPositions.length !== 3) {
        throw new Error('Invalid win positions')
    }
    // Duyệt qua các phần tử trong mảng trường hợp win.
    for(const positions of winPositions) {
        // Đưa giá trị duyệt vào hàm lấy ra ô trong trường hợp win. Lấy ra được 3 ô hightlight.
        const cell = getCellElementAtIdx(positions)
        if(cell) cell.classList.add('win')
    }
}

// Khi click sẽ thêm class X O tương ứng và thay đổi X O ở phần turn( người đi tiếp theo). Đồng thời kiểm tra nếu ô đã chọn ko được chọn nữa
function handleCellClick(cell, index) {
    // Kiểm tra xem ô đã click chưa. Nếu đã click thì ko cho click nữa
    const isClicked = cell.classList.contains(TURN.CROSS) || cell.classList.contains(TURN.CIRCLE);
    // Kiểm tra game đã end chưa
    const isEndGame = gameStatus !== GAME_STATUS.PLAYING;
    if(isClicked || isEndGame) return;
    // set selected cell: Khi click vào một ô thì sẽ add class X O cho nó. Giá trị X hay O tùy thuộc vào currentTurn biến đổi sau mỗi lần click.
    cell.classList.add(currentTurn)

    // update cellValuess
    cellValues[index] = currentTurn ===  TURN.CIRCLE? CELL_VALUE.CIRCLE: CELL_VALUE.CROSS;

    // toggle turn: Định nghĩa ở trên
    toggleTurn()

    // check game status: Kiểm tra dữ liệu mà hàm checkGameStatus trả về tương ứng với case nào?
    // console.log(cellValues)
    const game = checkGameStatus(cellValues);
    switch (game.status) {
        // Với trường hợp end game thì sẽ nhận về status là End game và truyền vào hàm updateGameStatus. Đồng thời hiện button lên.
        case GAME_STATUS.ENDED: {
            // update game status
            updateGameStatus(game.status)
            // show replay button
            showReplayButton()
            break;
        }
        case GAME_STATUS.O_WIN: {
             // update game status
             updateGameStatus(game.status)
             // show replay button
             showReplayButton()
             // hightlight win cells
             highlightWinCells(game.winPositions)
             break;
        }
        case GAME_STATUS.X_WIN: {
            // update game status
            updateGameStatus(game.status)
            // show replay button
            showReplayButton()
            // hightlight win cells
            highlightWinCells(game.winPositions)
            break;
        }
        break;
        default:
    }
}

// Lấy ra từng phần tử và gán sự kiện click cho nó. Khi click một phần tử sẽ gọi đến hàm handleCellClick
function initCellElementList() {
    // Lấy ra từng phần tử và gán sự kiện click cho nó. Khi click một phần tử sẽ gọi đến hàm handleCellClick
    const cellElementList = getCellElementList();
    cellElementList.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(cell, index));
    });
}

function resetGame() {
    // reset temp global vars
    currentTurn = TURN.CROSS;
    gameStatus = GAME_STATUS.PLAYING;
    cellValues = cellValues.map(()=>"");
    // reset dom elements.
    updateGameStatus(GAME_STATUS.PLAYING)
    // reset current turn.
    const currentTurnElement = getCurrentTurnElement();
    if(currentTurnElement){
        currentTurnElement.classList.remove(TURN.CROSS, TURN.CIRCLE)
        currentTurnElement.classList.add(TURN.CROSS)
    }
    // reset game board.
    const cellElementList = getCellElementList();
    for(const cellElement of cellElementList){
        cellElement.classList.remove(TURN.CROSS, TURN.CIRCLE);
    }
    // hide replay button.
    const replayButton = getReplayButtonElement();
    if(replayButton) replayButton.classList.remove('show')

}

function initReplayButton() {
    console.log('ok')
    const replayButton = getReplayButtonElement()
    if(replayButton) {
        replayButton.addEventListener("click", () => resetGame);
    }
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
    // bind click event for all li elements.
    initCellElementList();
    // bind click event for replay elements.
    initReplayButton();
})()