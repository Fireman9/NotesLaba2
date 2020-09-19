const addBut = document.getElementById("addBut");
const list = document.getElementById("list");

let notesArray = new Array();

function addNewNote() {
    let newLi = document.createElement('li');
    let date = new Date();
    newLi.id = String(date.getTime());
    newLi.innerHTML = 'New note';
    list.append(newLi);
}

addBut.addEventListener("click", addNewNote);