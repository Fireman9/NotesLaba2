const addBut = document.getElementById("addBut");
const delBut = document.getElementById("delBut");
const list = document.getElementById("list");
const textArea = document.getElementById("textArea");

let notesArray;
if (localStorage.getItem('notesArray')) {
    notesArray = JSON.parse(localStorage.getItem('notesArray'));
    for(i in notesArray){
        let newLi = document.createElement('li');
        newLi.id = notesArray[i].id;
        if(notesArray[i].text.length > 0) {
            newLi.innerHTML = notesArray[i].text.slice(0, 15);
            let temp = newLi.innerHTML.split('\n');
            if (temp.length > 1) {
                newLi.innerHTML = temp[0];
            } else {
                newLi.innerHTML = temp[0] + "...";
            }
        }
        else{
            newLi.innerHTML = 'New note';
        }
        list.append(newLi);
    }
} else {
    notesArray = new Array();
}

window.addEventListener("beforeunload", function (event) {
    localStorage.setItem('notesArray', JSON.stringify(notesArray));
})

addBut.onclick = function() {
    let newLi = document.createElement('li');
    let date = new Date();
    newLi.id = String(date.getTime());
    let note = {id: newLi.id, text: ""};
    notesArray.push(note);
    newLi.innerHTML = 'New note';
    list.append(newLi);
}

list.onclick = function (event) {
    if(event.target.tagName != "LI") return;
    let li = event.target;
    for(let i in notesArray){
        if(notesArray[i].id == li.id){
            document.getElementById("textArea").value = notesArray[i].text;
        }
    }
    let selected = list.querySelectorAll('.selected');
    for(let elem of selected){
        elem.classList.remove('selected');
    }
    li.classList.add('selected');
    textArea.readOnly = false;
    textArea.focus();
}

delBut.onclick = function () {
    let selected = list.querySelectorAll('.selected');
    if (selected.length == 0){
        alert("Nothing selected");
        // TODO: alert change
    }
    textArea.value = "";
    textArea.readOnly = true;
    for(let i in notesArray){
        if(notesArray[i].id == selected[0].id){
            notesArray.splice(i, 1);
        }
    }
    for(let elem of selected){
        elem.parentNode.removeChild(elem);
    }
}

textArea.oninput = function () {
    let selected = list.querySelectorAll('.selected');
    for (let i in notesArray) {
        if (notesArray[i].id == selected[0].id) {
            notesArray[i].text = textArea.value;
        }
    }
    selected[0].textContent = textArea.value.slice(0, 15);
    let temp = selected[0].textContent.split('\n');
    if(temp.length > 1){
        selected[0].textContent = temp[0];
    }
    else{
        selected[0].textContent = temp[0] + "...";
    }
}