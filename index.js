const addBut = document.getElementById("addBut");
const delBut = document.getElementById("delBut");
const list = document.getElementById("list");

addBut.onclick = function() {
    let newLi = document.createElement('li');
    let date = new Date();
    newLi.id = String(date.getTime());
    newLi.innerHTML = 'New note';
    list.append(newLi);
}

list.onclick = function (event) {
    if(event.target.tagName != "LI") return;
    let li = event.target;
    let selected = list.querySelectorAll('.selected');
    for(let elem of selected){
        elem.classList.remove('selected');
    }
    li.classList.add('selected');
}

delBut.onclick = function () {
    let selected = list.querySelectorAll('.selected');
    for(let elem of selected){
        elem.parentNode.removeChild(elem);
    }
}