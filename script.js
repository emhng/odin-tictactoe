const player = (name,playerNo) => {
    const playerOne = playerNo === 1;
    let marker = "";
    playerOne ? marker = "x" : marker = "o";
    playerOne ? markerSVG = "x.svg" : markerSVG = "o.svg";
    let positions = [];
    return {name, playerNo, marker, markerSVG, positions};
};

const playerOne = player("A",1);
const playerTwo = player("B",2);

let playerTurn = 1;

const gameBoard = () => {
    const boardCell = document.querySelectorAll("div.cell");

    boardCell.forEach(cell=>{
    cell.addEventListener("click",()=>{
        switchPlayers(cell);
        checkForWin(playerOne);
        checkForWin(playerTwo);
        decideGame(playerOne,playerTwo);
        });
    });
};

gameBoard();

const switchPlayers = (cell) =>{
    if(playerTurn === 1){
        placeMarker(cell,playerOne);
        hoverMarker(playerTwo);
        return playerTurn = 2;
    }else{
        placeMarker(cell,playerTwo);
        hoverMarker(playerOne);
        return playerTurn = 1;
    };
};

const hoverMarker = (player) => {
  const rootEl = document.querySelector(":root");
  const rootStyles = window.getComputedStyle(rootEl);
  rootEl.style.setProperty("--player-marker",`url(${player.markerSVG})`);
};

const placeMarker = (cell,player) => {
    const targetCellEl = document.querySelector(`div.cell#${cell.id}`);

    if(targetCellEl.classList.contains("taken")){
        //Do not allow user to place another marker
        return
    }
    else{
        const imgEl = document.createElement("img");
        imgEl.src = player.markerSVG;

        targetCellEl.appendChild(imgEl);
        targetCellEl.classList.add("taken");

        const convertToNum = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9
        };

        player.positions.push(convertToNum[cell.id]);
    }
};

const checkForWin = (player) => {

const winPattern1 = [1,2,3];
const winPattern2 = [4,5,6];
const winPattern3 = [7,8,9];
const winPattern4 = [1,4,7];
const winPattern5 = [2,5,8];
const winPattern6 = [3,6,9];
const winPattern7 = [1,5,9];
const winPattern8 = [3,5,7];

const winPatternList = [
    winPattern1,
    winPattern2,
    winPattern3,
    winPattern4,
    winPattern5,
    winPattern6,
    winPattern7,
    winPattern8
];

const checkPattern = (pattern,player)=>{
  let isAllTrue = false;

  pattern.every(value =>{
    player.positions.includes(value);
    if(player.positions.includes(value)===true){
      return isAllTrue = true;
    }else{
        //every(); stops evaluting values when it hits a false & moves onto the next pattern set
        //so if isAllTrue comes back as false, it will stay false & not be overwritten by a true
      return isAllTrue = false;
    }
  })

//Define a true/false value for the pattern that was checked
//If returns as true, then that means all values in that pattern matched
  if(isAllTrue === true){
    return true;
  }else{
    return false;
  }
};

let win = false;

//Run through all the win patterns in the list to check if there is a winning pattern present
winPatternList.forEach(pattern=>{
  checkPattern(pattern,player);
  if(checkPattern(pattern,player)===true){
    return win = true;
  }
});

//Define checkForWin() as true if winning pattern exists
if(win === true){
  return true;
}else{
  return false;
};

};

const decideGame = (playerOne,playerTwo) => {
  const playerOneWins = checkForWin(playerOne) === true;
  const playerTwoWins = checkForWin(playerTwo) === true;
  const lastMove = playerOne.positions.length === 5;
  const noWinners = !playerOneWins && !playerTwoWins;

  if(playerOneWins){
    alert(`${playerOne.name} wins!`);
    return true
  };

  if(playerTwoWins){
      alert(`${playerTwo.name} wins!`);
      return true
  };
  
  if (lastMove && noWinners){
    alert("It's a draw!");
    return true
  };
  
};

