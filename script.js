
const addBtn = document.querySelector('.btnAdd');
const cancelBtn = document.querySelector('.btnCancel');
const saveBtn = document.querySelector('.btnSave');
const editPage = document.querySelector('.editPage');
const homePage = document.querySelector('.homePage');



// החזרת מערך המשימות מהלוקל סטורג
const loadPersons = () => {
    // console.log("fff");
    
    const arr = localStorage.getItem('personsArr');
    // console.log(arr);
    return arr ? JSON.parse(arr) : [];
}
// הוספת אובייקט משימה למערך הלוקל סטורג
const addPerson = (person) => {
    const arr = loadPersons();
    arr.push(person);
    localStorage.setItem('personsArr', JSON.stringify(arr));
}
// מחיקת משימה מהמערך בלוקל סטורג
const removePerson = (name) => {
    const arr = loadPersons().filter(t => t.name != name);
    localStorage.setItem('personsArr', JSON.stringify(arr));
}

const editPerson = (name) => {
    const arr = loadPersons();
    const person = arr.find(t => t.name === name);
    document.querySelector('#nameE').value = person.name;
    document.querySelector('#rankE').value = person.rank;
    document.querySelector('#positionE').value = person.position;
    document.querySelector('#platoonE').value = person.platoon;
    document.querySelector('#timeE').value = person.time;
    document.querySelector('#statusE').value = person.status;
    document.querySelector('.btnSave').addEventListener('click', () => {
        person.name = document.querySelector('#nameE').value;
        person.rank = document.querySelector('#rankE').value;
        person.position = document.querySelector('#positionE').value;
        person.platoon = document.querySelector('#platoonE').value;
        person.time = document.querySelector('#timeE').value;
        person.status = document.querySelector('#statusE').value;
        localStorage.setItem('personsArr', JSON.stringify(arr));
        refreshView();
        homePage.style.display = 'flex';
        editPage.style.display = 'none';
    })
    document.querySelector('.btnCancel').addEventListener('click', () => {
        homePage.style.display = 'flex';
        editPage.style.display = 'none';
    })
}


const countDownMission = (id, btn) => {
    const arr = loadPersons();
    const person = arr.find(t => t.name === id);
    let time = person.time;
    const interval = setInterval(() => {
        
        if (time <= 0) {
            
            removePerson(id);
            
            btn.innerText = 'Mission Completed';
            person.time = 0;
            person.status = 'Retired';
            localStorage.setItem('personsArr', JSON.stringify(arr));
            clearInterval(interval);
            refreshView();
        }
        else {
            time--;
            btn.innerText = `In Progress:  ${time}` ;
        }
        btn.innerText = time;
    }, 1000)
}

const addRemoveListener = () => {
    console.log("gg")
    const removeBtns = document.querySelectorAll('.remove');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.classList[1];
            console.log(id);
            removePerson(id);
            refreshView();
        })
    })
}


const addMissionListener = () => {
    const missionBtns = document.querySelectorAll('.mission');
    console.log(missionBtns)
    missionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {

            const id = btn.classList[1];
            if(e.target.innerText === 'Start Mission'){
                e.target.innerText = 'In Progress';
                e.target.style.backgroundColor = 'red';
                countDownMission(id, e.target);
            }
            
        })
    })
}


const addEditListener = () => {
    const editBtns = document.querySelectorAll('.edit');
    editBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.classList[1];
            homePage.style.display = 'none';
            editPage.style.display = 'block';
            editPerson(id);
        })
    })
}

const refreshView = () => {
    const table = document.querySelector('.tableBody');
    console.log(table)
    table.innerHTML = '';
    let missionStatus;
    const arr = loadPersons();
    arr.forEach(person => {
        if(person.status === 'Active'){
            missionStatus = 'Mission In Progress';
        }
        else if(person.status === 'Reserve'){
            missionStatus = 'Start Mission';
        }
        else if(person.status === 'Retired'){
            missionStatus = 'Mission Completed';
        }
        const row = document.createElement('div');
        row.classList.add('tableRow');
        row.innerHTML = `
        <div class="rowDiv name">${person.name}</div>
        <div class="rowDiv rank">${person.rank}</div>
        <div class="rowDiv position">${person.position}</div>
        <div class="rowDiv platoon">${person.platoon}</div>
        <div class="rowDiv status">${person.status}</div>
        <div class="rowDiv actions">
            <p class="remove ${person.name}">Remove</p>
            <p class="mission ${person.name}">${missionStatus}</p>
            <p class="edit ${person.name}">Edit</p>
        </div>`
        table.appendChild(row);
        if(person.status === 'Active'){
            row.querySelector('.mission').style.backgroundColor = 'red';
            countDownMission(person.name, row.querySelector('.mission'));
        }
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

let ascend = true;
document.querySelector('.btnSort').addEventListener('click', (e) => {
    const arr = loadPersons();
    if (ascend) {
        arr.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        })
        localStorage.setItem('personsArr', JSON.stringify(arr));
        refreshView();
        ascend = false;
        e.target.innerHTML = 'sort by name - descend';
    }
    else {
        arr.sort((a, b) => {
            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
            return 0;
        })
        localStorage.setItem('personsArr', JSON.stringify(arr));
        refreshView();
        ascend = true;
        e.target.innerHTML = 'sort by name - ascend';
    }

})
