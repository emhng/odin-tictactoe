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
        decideWin(playerOne);
        decideWin(playerTwo);
        });
    });
};

gameBoard();

const switchPlayers = (cell) =>{
    if(playerTurn === 1){
        placeMarker(cell,playerOne);
        return playerTurn = 2;
    }else{
        placeMarker(cell,playerTwo);
        return playerTurn = 1;
    };
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

const decideWin = (player) => {

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
      return isAllTrue = false;
    }
  })

  if(isAllTrue === true){
    return true;
  }else{
    return false;
  }
};

let win = false;
let noWin = false;

winPatternList.forEach(pattern=>{
  console.log(pattern);
  checkPattern(pattern,player);
  if(checkPattern(pattern,player)===true){
    return win = true;
  }else{
    return noWin = true;
  }
});

if(win === true){
    alert(`${player.name} wins`);
}

};