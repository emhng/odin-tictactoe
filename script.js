const player = (name,playerNo) => {
    let playerOne = playerNo === 1;
    let marker = "";
    playerOne ? marker = "x" : marker = "o";
    playerOne ? markerSVG = "x.svg" : markerSVG = "o.svg";
    return {name, playerNo, marker, markerSVG};
};

const playerOne = player("A",1);
const playerTwo = player("B",2);

const placeMarker = (markerSVG) => {
    const boardCell = document.querySelectorAll("div.cell");

    boardCell.forEach(cell=>{
        cell.addEventListener("click",()=>{
            const targetCellEl = document.querySelector(`div.cell#${cell.id}`);
            console.log(cell.id);

            const imgEl = document.createElement("img");
            imgEl.src = markerSVG;

            targetCellEl.appendChild(imgEl);
        });
    });

};

placeMarker(playerTwo.markerSVG);