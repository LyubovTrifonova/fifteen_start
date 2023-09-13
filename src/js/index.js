const containerNode = document.getElementById('fifteen');
const itemNodes = Array.from(containerNode.querySelectorAll('.item'));
const countItems = 16;

if(itemNodes.length !== 16){
    throw new Error(`Должно быть ровно ${countItems} items in HTML`)
}

/** Position */
/** Shuffle */
/** Change position by click*/
/** Change position by keydown */