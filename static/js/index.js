const containerNode = document.getElementById('fifteen');
const itemNodes = Array.from(containerNode.querySelectorAll('.item'));
const countItems = 16;

if(itemNodes.length !== 16){
    throw new Error(`Должно быть ровно ${countItems} items in HTML`)
}

/** Position */
itemNodes[countItems - 1].style.display = 'none';
let matrix = getMatrix( 
    itemNodes.map((item) => Number(item.dataset.matrixId))
)

setPositionItems(matrix);

/** Shuffle */
document.getElementById('shuffle').addEventListener('click', () => {
    const shuffledArray = shuffleArray(matrix.flat());
    matrix = getMatrix(shuffledArray);
    setPositionItems(matrix);
})
/** Change position by click*/
const blankNumber = 16;
containerNode.addEventListener('click', (event) => {
    const buttonNode = event.target.closest('button');
    if (!buttonNode) {
        return;
    }

    const butonNumber = Number(buttonNode.dataset.matrixId);
    const buttonCoords = findCoordinatesByNumber(butonNumber, matrix);
    const blankCoords = findCoordinatesByNumber(butonNumber, matrix);
    const isValid = isValidForSwap(buttonCoords, blankCoords);

    console.log(isValid);

    if (isValid){

    }
})
/** Change position by keydown */
/** Show won */

/**Helpers */

function getMatrix(arr){
    const matrix = [[],[],[],[]];

    let y = 0;
    let x = 0;

    for (let i=0; i<arr.length; i++){
        if (x>=4){
            y++;
            x=0;
        }
        matrix[y][x] = arr[i];
        x++;
    }
    return matrix;
}

function setPositionItems(matrix){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x];
            const node = itemNodes[value - 1];
            setNodesStyles(node, x, y);
        }
    }
}

function setNodesStyles(node, x, y){
    const shiftPs = 100;
    node.style.transform = `translate3D(${x*shiftPs}%, ${y*shiftPs}%, 0)`
}

function shuffleArray(arr) {
    return arr
        .map(value => ({value, sort: Math.random()}))
        .sort((a,b) => a.sort - b.sort)
        .map(({value}) => value)
}

function findCoordinatesByNumber(number, matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === number)
            {
                return {x, y};
            }
        }
    }
    return null;
}

function isValidForSwap(coords1, coords2) {
    const diffX = Math.abs(coords1.x - coords2.x);
    const diffY = Math.abs(coords1.y - coords2.y);
    return (diffX === 1 || diffY === 1);
}