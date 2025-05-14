const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const fireworks = document.getElementById('fireworks');
let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];
let winCombo = [];

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add('taken', currentPlayer === 'X' ? 'red' : 'blue');

  if (checkWin()) {
    gameActive = false;
    highlightWin();
    statusText.textContent = `🎉 Player ${currentPlayer} wins! 🎉`;
    triggerFireworks();
  } else if (board.every(cell => cell !== '')) {
    statusText.textContent = `It's a draw!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'Y' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winCombo = [a, b, c];
      return true;
    }
  }
  return false;
}

function highlightWin() {
  winCombo.forEach(index => {
    cells[index].classList.add('win');
  });
}

function triggerFireworks() {
  for (let i = 0; i < 20; i++) {
    const fire = document.createElement('div');
    fire.classList.add('fire');
    fire.style.left = `${Math.random() * 100 - 50}%`;
    fire.style.backgroundColor = currentPlayer === 'X' ? 'red' : 'blue';
    fireworks.appendChild(fire);
    setTimeout(() => fire.remove(), 1000);
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  winCombo = [];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell'; // Reset all classes
  });
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  fireworks.innerHTML = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
