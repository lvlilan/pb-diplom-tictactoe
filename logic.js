let players = ["x", "o"];
let activePlayer = 0;
let board = [];
let size = 3; // размер поля

function startGame() {
  board = [];
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i][j] = '';
    }
  }
  
  activePlayer = 0;
  renderBoard(board);
}

function click(row, col) {
  if (board[row][col] !== '') return;
  
  board[row][col] = players[activePlayer];
  renderBoard(board);
  
  if (checkWin()) {
    showWinner(activePlayer);
    return;
  }
  
  if (isDraw()) {
    document.querySelector('#modal__window h2').textContent = '🤝 Ничья! 🤝';
    document.getElementById('modal').classList.remove('hidden');
    return;
  }
  
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function checkWin() {
  const symbol = players[activePlayer];
  
  for (let i = 0; i < size; i++) {
    let win = true;
    for (let j = 0; j < size; j++) {
      if (board[i][j] !== symbol) {
        win = false;
        break;
      }
    }
    if (win) return true;
  }
  
  for (let j = 0; j < size; j++) {
    let win = true;
    for (let i = 0; i < size; i++) {
      if (board[i][j] !== symbol) {
        win = false;
        break;
      }
    }
    if (win) return true;
  }
  
  let win = true;
  for (let i = 0; i < size; i++) {
    if (board[i][i] !== symbol) {
      win = false;
      break;
    }
  }
  if (win) return true;
  
  win = true;
  for (let i = 0; i < size; i++) {
    if (board[i][size - 1 - i] !== symbol) {
      win = false;
      break;
    }
  }
  if (win) return true;
  
  return false;
}

function isDraw() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === '') return false;
    }
  }
  return true;
}