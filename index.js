// Data - Cell -> act as a Selector 
const Cross = "x";
const Circle = "circle";
const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
]
let Cellelements = document.querySelectorAll('[data-cell]');
let changeTurn=false;
const board = document.getElementById('board');
const resMssg = document.getElementById("res-mssg");  
const resMssgElement = document.getElementById("res-Screen") 
const restart = document.getElementById("restartBtn");
// let selected = [1,2,3,4,5,6,7,8,9];
// Once : true -> fire the function for one time only

startGame();
restart.addEventListener('click',startGame);
function startGame()
{
    
    Cellelements.forEach(cell => {
        cell.classList.remove(Cross);
        cell.classList.remove(Circle);
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click',handleClick,{once : true})
    })
    setBoardHoverClass();
    resMssgElement.classList.remove('show');
    

}

function endGame(draw){
    if(draw)
    {
        resMssg.innerText = "Draw !";
    }
    else
    {
        resMssg.innerText = `${changeTurn ? "0's " : "X's "}Wins"`
    }
    resMssgElement.classList.add('show');
}
function handleClick(e)
{
    const cell = e.target;
    const currentTurn = changeTurn? Circle : Cross;
   Place_Mark(cell,currentTurn);
   if(chk_win(currentTurn))
   {
    console.log("win")
    endGame(false);
   }
   else if(isDraw(cell))
   {
    endGame(true);
   }
    else
    {
        Switch_Turns();
        setBoardHoverClass();
    }
}

function isDraw()
{
    return [...Cellelements].every(cell => {
        return cell.classList.contains(Cross) || cell.classList.contains(Circle);
    })
}
function Place_Mark(cell,currentTurn){
    cell.classList.add(currentTurn);
    // let index = cell.id;
    // popIndex(index);
    // console.log(currentTurn);
}

// function Switch_Turns(cell,currentTurn)
// {
//     changeTurn = !changeTurn;
//     let random = selected[Math.floor(Math.random()*selected.length)]
//     cell.classList.add(currentTurn);
// }

// function popIndex(index)
// {
//     if(index >-1)
//     {
//         selected.splice(index,1);
//     }
//     console.log(selected);
// }

function Switch_Turns()
{
    changeTurn = !changeTurn;
}

function setBoardHoverClass()
{
    board.classList.remove(Cross);
    board.classList.remove(Circle);
    if(changeTurn)
    {
        board.classList.add(Circle);
    }
    else
    {
        board.classList.add(Cross);
    }
}

function chk_win(currentTurn){
    return win.some(comb =>{
        return comb.every(index =>{
            return Cellelements[index].classList.contains(currentTurn)
        })
    })
}   