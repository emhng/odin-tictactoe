const player = (name,playerNo) => {
    let playerOne = playerNo === 1;
    let marker = "";
    playerOne ? marker = "x" : marker = "o";
    playerOne ? markerSVG = "x.svg" : markerSVG = "o.svg";
    return {name, playerNo, marker, markerSVG};
};

const playerOne = player("A",1);
const playerTwo = player("B",2);

let playerTurn = 1;

const gameBoard = () =>{
    const boardCell = document.querySelectorAll("div.cell");

    boardCell.forEach(cell=>{
    cell.addEventListener("click",()=>{
        switchPlayers(cell);
        });
    });

};

gameBoard();

const switchPlayers = (cell) =>{
    if(playerTurn === 1){
        placeMarker(cell,playerOne.markerSVG);
        return playerTurn = 2;
    }else{
        placeMarker(cell,playerTwo.markerSVG);
        return playerTurn = 1;
    };
};

const placeMarker = (cell,markerSVG) => {
    const targetCellEl = document.querySelector(`div.cell#${cell.id}`);
    if(targetCellEl.classList.contains("taken")){
        //Do not allow user to place another marker
        return
    }
    else{
        const imgEl = document.createElement("img");
        imgEl.src = markerSVG;
        targetCellEl.appendChild(imgEl);
        targetCellEl.classList.add("taken");
    }
};