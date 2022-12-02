class Game {

  constructor() {
    this.elements = document.querySelectorAll('.row li');
    this.arr = [];
    this.addFunctionInElements();
    this.playerTurn = true;
    this.winner = false;
  }

  checkRows() {
    let value;

    for (let i = 0; i < 3; i++) {
      value = this.arr[3 * i] + this.arr[3 * i + 1] + this.arr[3 * i + 2];

      if (value === 3 || value === -3) {
        return {
          elementStart: 3 * i,
          winner: value === 3 ? 'Player One' : 'Player Two',
          direction: 'rowWin'
        }
      }
    }

    return false;
  }

  checkCols() {
    let value;

    for (let i = 0; i < 3; i++) {
      value = this.arr[i] + this.arr[i + 3] + this.arr[i + 6];

      if (value === 3 || value === -3) {
        return {
          elementStart: i,
          winner: value === 3 ? 'Player One' : 'Player Two',
          direction: 'colWin'
        }
      }
    }

    return false;
  }

  checkDiagonal() {
    const diagonalOne = this.arr[0] + this.arr[4] + this.arr[8];
    const diagonalTwo = this.arr[2] + this.arr[4] + this.arr[6];

    if (diagonalOne === 3 || diagonalOne === -3) {
      return {
        elementStart: 0,
        winner: diagonalOne === 3 ? 'Player One' : 'Player Two',
        direction: 'dgLeft'
      }
    } 

    if (diagonalTwo === 3 || diagonalTwo === -3) {
      return {
        elementStart: 2,
        winner: diagonalTwo === 3 ? 'Player One' : 'Player Two',
        direction: 'dgRight'
      }
    }
    return false;
  }

  checkWinner() {
    const row = this.checkRows();
    const col = this.checkCols();
    const diagonal = this.checkDiagonal();

    if (row) return row; 
    if (col) return col; 
    if (diagonal) return diagonal;

    return false;
  }

  checkVelha() {
    const COUNT = 9;
    
    if (this.arr.length == COUNT) {

      for (let index = 0; index < this.arr.length; index++) {
        if (this.arr[index] == undefined) return false;
      }
      
      return true;
    }
   
  }

  resetGame() {
    this.arr = [];
    this.winner = false;
    this.playerTurn = this.playerTurn;

    this.elements.forEach((element) => {
      element.innerHTML = "";
      element.className = "";
    });

    const resetButton = document.querySelector('.buttonReset');
  
    resetButton.innerHTML = "";
  }

  createButtonReset() {
    const resetButton = document.querySelector('.buttonReset');
    const button = document.createElement('button');
    button.innerHTML = 'RESET ⭮';

    button.addEventListener('click', () => this.resetGame());
    resetButton.appendChild(button);
  }

  addFunctionInElements() {
    this.elements.forEach((el) => {
      let self = this;

      el.addEventListener('click', () => {
        if (!self.arr[el.dataset.element] && !self.winner) {

          this.arr[el.dataset.element] = this.playerTurn ? 1 : -1;
          el.innerHTML = this.playerTurn ? "✖" : "◯";
          this.playerTurn = !self.playerTurn;

          let hasWinner = self.checkWinner();

          
          if (hasWinner) {
            let startMark = self.elements[hasWinner.elementStart];
            
            startMark.classList.add(hasWinner.direction);
            this.winner = true;
            
            this.createButtonReset();
            return;
          }

          if (this.checkVelha()) this.createButtonReset();
        }
      } );
    });
  }
}

let game = new Game();

