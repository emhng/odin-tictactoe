(() => {

//Generate player
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

//Change screens by toggling hidden class
const toggleHidden = (targetElId) =>{
const targetContEl = document.querySelector(targetElId);
targetContEl.classList.toggle("hidden");
};

//Start Tic Tac Toe game
const startButtonEl = document.querySelector("button#start");

startButtonEl.addEventListener("click", ()=> {

  let playerTurn = 1;

  let playerOneName = document.querySelector("input#player-one").value;
  let playerTwoName = document.querySelector("input#player-two").value;

  const playerOne = player(playerOneName,1);
  const playerTwo = player(playerTwoName,2);

  toggleHidden("div#start-screen");
  toggleHidden("div#gameboard");

//Play a round of Tic Tac Toe
((playerOne,playerTwo) => {
    const boardCell = document.querySelectorAll("div.cell");

    boardCell.forEach(cell=>{
    cell.addEventListener("click",()=>{
        switchPlayers(cell);
        checkForWin(playerOne);
        checkForWin(playerTwo);
        decideGame(playerOne,playerTwo);
        });
    });
})(playerOne,playerTwo);

//Alternate between players
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

//Display the correct marker upon hover over empty cell on gameboard
const hoverMarker = (player) => {
  const rootEl = document.querySelector(":root");
  rootEl.style.setProperty("--player-marker",`url(${player.markerSVG})`);
};

//Place correct marker on gameboard 
const placeMarker = (cell,player) => {
    const targetCellEl = document.querySelector(`div.cell#${cell.id}`);

    if(targetCellEl.classList.contains("taken")){
        //Do not allow user to place another marker if spot is taken
        return
    }
    else{
        //Place correct marker on gameboard
        const imgEl = document.createElement("img");
        imgEl.src = player.markerSVG;
        targetCellEl.appendChild(imgEl);

        //Mark taken spot on board as taken
        targetCellEl.classList.add("taken");

        //Record what position the player took
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
    };
};

//Check if player has a winning position
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

//Check the player's taken positions against a winning position's pattern
const checkPattern = (pattern,player)=>{
  let isAllTrue = false;

  pattern.every(value =>{
    player.positions.includes(value);
    if(player.positions.includes(value)===true){
      return isAllTrue = true;
    }else{
        //every(); stops evaluting values when it hits a false 
        //so if isAllTrue comes back as false, it will stay false & not be overwritten by a true
      return isAllTrue = false;
    };
  });

//Define a true/false value for the pattern that was checked
  if(isAllTrue === true){
    return true;
  }else{
    return false;
  };
};

//Run through all the win patterns in the list to check if there is a winning pattern present
let win = false;
winPatternList.forEach(pattern=>{
  checkPattern(pattern,player);
  if(checkPattern(pattern,player)===true){
    return win = true;
  };
});

//Define checkForWin() as true if winning pattern exists
if(win === true){
  return true;
}else{
  return false;
};

};

//Display win/draw screen
const decideGame = (playerOne,playerTwo) => {

  displayWinMsg(playerOne);
  displayWinMsg(playerTwo);

  const lastMove = playerOne.positions.length === 5 || playerTwo.positions.length === 5;
  const noWinners = checkForWin(playerOne) === false && checkForWin(playerTwo) === false;

  const h1El = document.querySelector("h1#judge");

  if (lastMove && noWinners){
    h1El.textContent="It's a draw!";
    toggleHidden("div#end-screen");
  };

  const h2El = document.querySelector("h2#who-goes-first");
  playerTurn === 2 ? h2El.textContent = `${playerTwo.name} goes first next game` : h2El.textContent = `${playerOne.name} goes first next game`;

};

const displayWinMsg = (player) =>{
  const playerWon = checkForWin(player) === true;
  const h1El = document.querySelector("h1#judge");

  if(playerWon){
    h1El.textContent = `${player.name} wins!`;
    toggleHidden("div#end-screen");
  };

};

//Reset game for next round
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

})();
