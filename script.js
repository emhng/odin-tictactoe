const gameRunner = () =>{

const player = (name,playerNo) => {
  const playerOne = playerNo === 1;
  const noName = name === "";

  if(playerOne && noName){
    name = "Player One";
  };

  if(!playerOne && noName){
    name = "Player Two";
  };

  let marker = "";

  playerOne ? marker = "x" : marker = "o";
  playerOne ? markerSVG = "x.svg" : markerSVG = "o.svg";
  let positions = [];
  return {name, playerNo, marker, markerSVG, positions};
};

const toggleHidden = (querySelector)=>{
const targetContEl = document.querySelector(querySelector);
targetContEl.classList.toggle("hidden");
};

const startButtonEl = document.querySelector("button#start");

startButtonEl.addEventListener("click", ()=> {

  let playerTurn = 1;

  let playerOneName = document.querySelector("input#player-one").value;
  let playerTwoName = document.querySelector("input#player-two").value;

  let playerOne = player(playerOneName,1);
  let playerTwo = player(playerTwoName,2);

  console.log(playerOne);
  console.log(playerTwo);

  toggleHidden("div#start-screen")
  toggleHidden("div#gameboard")

const gameBoard = (playerOne,playerTwo) => {
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

gameBoard(playerOne,playerTwo);

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
  const lastMove = playerOne.positions.length === 5 || playerTwo.positions.length === 5;
  const noWinners = !playerOneWins && !playerTwoWins;

  const h1El = document.querySelector("h1#judge");

  if(playerOneWins){
    h1El.textContent = `${playerOne.name} wins!`;
    toggleHidden("div#end-screen");
  };

  if(playerTwoWins){
      h1El.textContent =`${playerTwo.name} wins!`;
      toggleHidden("div#end-screen");
  };
  
  if (lastMove && noWinners){
    h1El.textContent="It's a draw!";
    toggleHidden("div#end-screen");
  };

  const h2El = document.querySelector("h2#who-goes-first");
  if(playerTurn === 2){
    h2El.textContent = `${playerTwo.name} goes first next game`;
  }else{
    h2El.textContent = `${playerOne.name} goes first next game`;
  };

};

const restartButtonEl = document.querySelector("button#restart");

restartButtonEl.addEventListener("click", ()=>{
  playerOne.positions.length = 0;
  playerTwo.positions.length = 0;

  const markersEl = document.querySelectorAll("div.cell.taken img");

  markersEl.forEach(marker=>{
    marker.remove();
  });

  const takenBoardCellEl = document.querySelectorAll("div.cell.taken");

  takenBoardCellEl.forEach(cell=>{
    cell.classList.remove("taken");
  });
  
  toggleHidden("div#end-screen");

});

});

};

gameRunner();