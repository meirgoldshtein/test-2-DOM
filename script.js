const [homePage, editPage] = document.querySelectorAll('section');
const addBtn = document.querySelector('.btnAdd');
const cancelBtn = document.querySelector('.btnCancel');
const saveBtn = document.querySelector('.btnSave');



// החזרת מערך המשימות מהלוקל סטורג
const loadPersons = () => {
    const arr = localStorage.getItem('personsArr');
    return arr ? JSON.parse(arr) : [];
}
// הוספת אובייקט משימה למערך הלוקל סטורג
const addPerson = (person) => {
    const arr = loadPersons();
    arr.push(person);
    localStorage.setItem('personsArr', JSON.stringify(arr));
}
// מחיקת משימה מהמערך בלוקל סטורג
const removeTask = (id) => {
    const arr = loadPersons().filter(t => t.id != id);
    localStorage.setItem('personsArr', JSON.stringify(arr));
}




const addRemoveListener = () => {
    const removeBtns = document.querySelectorAll('.remove');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.classList[1];
            removeTask(id);
            refreshView();
        })
    })
}


const addMissionListener = () => {
    const missionBtns = document.querySelectorAll('.mission');
    missionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.classList[1];
            startMission(id);
        })
    })
}


const addEditListener = () => {
    const editBtns = document.querySelectorAll('.edit');
    editBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.classList[1];
            // editPage.classList.remove('hidden');
            // homePage.classList.add('hidden');
            editPerson(id);
        })
    })
}

const refreshView = () => {
    const table = document.querySelector('.tableBody');
    console.log(table)
    table.innerHTML = '';
    const arr = loadPersons();
    arr.forEach(person => {
        const row = document.createElement('div');
        row.classList.add('tableRow');
        row.innerHTML = `
        <div class="rowDiv name">${person.name}</div>
        <div class="rowDiv rank">${person.rank}</div>
        <div class="rowDiv position">${person.position}</div>
        <div class="rowDiv platoon">${person.platoon}</div>
        <div class="rowDiv status">${person.status}</div>
        <div class="rowDiv actions">
            <p class="remove ${person.id}">Remove</p>
            <p class="mission ${person.id}">Mission</p>
            <p class="edit ${person.id}">Edit</p>
        </div>`
        table.appendChild(row);
    })
    addRemoveListener();
    addMissionListener();
    addEditListener();
    
    
} 

//מאזין לכפתור הוספת חייל
addBtn.addEventListener('click', () => {
    const name = document.querySelector('#name');
    const rank = document.querySelector('#rank');
    const position = document.querySelector('#position');
    const platoon = document.querySelector('#platoon');
    const time = document.querySelector('#time');
    const status = document.querySelector('#status');
    const newPerson = {
        name: name.value,
        rank: rank.value,
        position: position.value,
        platoon: platoon.value,
        time: time.value,
        status: status.value
    }
    console.log(newPerson);
    addPerson(newPerson);
    refreshView();
    document.querySelectorAll('input').forEach(el => el.value = '');
    document.querySelector('select').value = '';
})