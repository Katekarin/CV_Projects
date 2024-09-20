document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return cells[index].textContent === currentPlayer;
            });
        });
    };

    const handleClick = (event) => {
        const cell = event.target;
        if (cell.textContent === '') {
            cell.textContent = currentPlayer;
            if (checkWin()) {
                alert(`Player ${currentPlayer} wins!`);
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    };

    const resetGame = () => {
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
    };

    cells.forEach(cell => cell.addEventListener('click', handleClick));
});
