const addBut = document.getElementById("addBut");
const delBut = document.getElementById("delBut");
const list = document.getElementById("list");
const textArea = document.getElementById("textArea");

let notesArray;

function getTimeFromId(id) {
    let time = new Date(parseInt(id));
    let year = String(time.getFullYear());
    let month = String(time.getMonth() + 1);
    if (month.length < 2) month = "0" + month;
    let date = String(time.getDate());
    if (date.length < 2) date = "0" + date;
    let hours = String(time.getHours());
    if (hours.length < 2) hours = "0" + hours;
    let minutes = String(time.getMinutes());
    if (minutes.length < 2) minutes = "0" + minutes;
    let seconds = String(time.getSeconds());
    if (seconds.length < 2) seconds = "0" + seconds;
    return "<br>" + hours + ":" + minutes + ":" + seconds + ", " + date + " " +
        time.toLocaleString('en', {month: 'long'}) + " " + year;
}

if (localStorage.getItem('notesArray')) {
    notesArray = JSON.parse(localStorage.getItem('notesArray'));
    for (i in notesArray) {
        let newLi = document.createElement('li');
        newLi.id = notesArray[i].id;
        if (notesArray[i].text.length > 0) {
            newLi.innerHTML = notesArray[i].text.slice(0, 15);
            let temp = newLi.innerHTML.split('\n');
            if (temp.length > 1) {
                newLi.innerHTML = temp[0];
            } else {
                newLi.innerHTML = temp[0] + "...";
            }
        } else {
            newLi.innerHTML = 'New note';
        }
        newLi.innerHTML += getTimeFromId(newLi.id);
        list.append(newLi);
    }
} else {
    notesArray = new Array();
}

function selectOnUrlChange(id) {
    if (id == "") return;
    let is = false;
    for (let i in notesArray) {
        if (notesArray[i].id == id) {
            is = true;
            document.getElementById("textArea").value = notesArray[i].text;
        }
    }
    if (!is) {
        window.location.href = window.location.href.replace(window.location.hash, '');
    }
    let selected = list.querySelectorAll('.selected');
    for (let elem of selected) {
        elem.classList.remove('selected');
    }
    document.getElementById(id).classList.add('selected');
    textArea.readOnly = false;
    textArea.focus();
    window.location.href = window.location.href.replace(window.location.hash, '') + "#" + id;
}

window.addEventListener("load", selectOnUrlChange(window.location.hash.slice(1)));

window.onhashchange = function () {
    for (let i in notesArray) {
        if (notesArray[i].id == window.location.hash.slice(1)) {
            document.getElementById("textArea").value = notesArray[i].text;
        }
    }
    let selected = list.querySelectorAll('.selected');
    for (let elem of selected) {
        elem.classList.remove('selected');
    }
    document.getElementById(window.location.hash.slice(1)).classList.add('selected');
    textArea.readOnly = false;
    textArea.focus();
}

window.addEventListener("beforeunload", function (event) {
    localStorage.setItem('notesArray', JSON.stringify(notesArray));
})

addBut.onclick = function () {
    let newLi = document.createElement('li');
    let date = new Date();
    newLi.id = String(date.getTime());
    let note = {id: newLi.id, text: ""};
    notesArray.unshift(note);
    newLi.innerHTML = 'New note';
    newLi.innerHTML += getTimeFromId(newLi.id);
    list.prepend(newLi);
}

list.onclick = function (event) {
    if (event.target.tagName != "LI") return;
    selectOnUrlChange(event.target.id);
}

delBut.onclick = function () {
    let selected = list.querySelectorAll('.selected');
    if (selected.length == 0) {
        if (document.getElementById("notSelected")) return;
        let notSelectedAlert = document.createElement('div');
        notSelectedAlert.id = "notSelected";
        notSelectedAlert.innerHTML = "Nothing selected";
        buttons.append(notSelectedAlert);
        setTimeout(function () {
            notSelectedAlert.parentNode.removeChild(notSelectedAlert);
        }, 3000);
        return;
    }
    textArea.value = "";
    textArea.readOnly = true;
    for (let i in notesArray) {
        if (notesArray[i].id == selected[0].id) {
            notesArray.splice(i, 1);
        }
    }
    for (let elem of selected) {
        elem.parentNode.removeChild(elem);
    }
    window.location.href = window.location.href.replace(window.location.hash, '');
}

textArea.oninput = function () {
    let selected = list.querySelectorAll('.selected');
    for (let i in notesArray) {
        if (notesArray[i].id == selected[0].id) {
            notesArray[i].text = textArea.value;
        }
    }
    selected[0].textContent = textArea.value.slice(0, 15);
    if (textArea.value.length == 0) {
        selected[0].innerHTML = "New note" + getTimeFromId(selected[0].id);
        return;
    }
    let temp = selected[0].textContent.split('\n');
    if (temp.length > 1) {
        selected[0].innerHTML = temp[0] + getTimeFromId(selected[0].id);
    } else {
        selected[0].innerHTML = temp[0] + "..." + getTimeFromId(selected[0].id);
    }
}