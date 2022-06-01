import { getCellElementList, getCurrentTurnElement, getCellElementAtIdx, getGameStatusElement } from "./selectors.js";
import { TURN } from "./constants.js";
import { checkGameStatus } from "./utils.js";

console.log(checkGameStatus())

/**
 * Global variables
 */
// Biến class X O được lấy ra từ Global variables
let currentTurn = TURN.CROSS;
let isGameEnded = false;
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
// Khi click sẽ thêm class X O tương ứng và thay đổi X O ở phần turn( người đi tiếp theo). Đồng thời kiểm tra nếu ô đã chọn ko được chọn nữa
function handleCellClick(cell, index) {
    // Kiểm tra xem ô đã click chưa. Nếu đã click thì ko cho click nữa
    const isClicked = cell.classList.contains(TURN.CROSS) || cell.classList.contains(TURN.CIRCLE);
    if(isClicked) return;
    // set selected cell: Khi click vào một ô thì sẽ add class X O cho nó. Giá trị X hay O tùy thuộc vào currentTurn biến đổi sau mỗi lần click.
    cell.classList.add(currentTurn)

    // toggle turn: Định nghĩa ở trên
    toggleTurn()
}

// Lấy ra từng phần tử và gán sự kiện click cho nó. Khi click một phần tử sẽ gọi đến hàm handleCellClick
function initCellElementList() {
    // Lấy ra từng phần tử và gán sự kiện click cho nó. Khi click một phần tử sẽ gọi đến hàm handleCellClick
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