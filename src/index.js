// document.addEventListener('DOMContentLoaded', () => {

// })

const dogDatabase = 'http://localhost:3000/dogs';
const tableBody = document.getElementById('table-body');
const form = document.getElementById('dog-form');
form.addEventListener('submit', databaseUpdater);
const formName = form.name;
const formBreed = form.breed;
const formSex = form.sex;

function dataFetcher() {
    fetch(dogDatabase)
            .then(response => response.json())
            .then(tableFiller)
}
dataFetcher()

function tableFiller(dogArray) {
    tableBody.innerHTML = '';
    dogArray.forEach(dogItem => {
        let row = document.createElement('tr');
        row.id = dogItem.id;
        let name = document.createElement('td');
        name.textContent = dogItem.name;
        name.id = 'dogName';
        let breed = document.createElement('td');
        breed.textContent = dogItem.breed;
        breed.id = 'dogBreed';
        let sex = document.createElement('td');
        sex.textContent = dogItem.sex;
        sex.id = 'dogSex';
        let editDog = document.createElement('td');
        editDog.textContent = 'Edit Dog';
        editDog.addEventListener('click', formFiller)
        row.append(name, breed, sex, editDog);
        tableBody.append(row);
    })
}

function formFiller(event) {
    let tableRow = event.target.parentElement;
    let dogName = tableRow.querySelector('#dogName').innerText;
    let dogBreed = tableRow.querySelector('#dogBreed').innerText;
    let dogSex = tableRow.querySelector('#dogSex').innerText;
    formName.value = dogName;
    formBreed.value = dogBreed;
    formSex.value = dogSex;
    formName.id = tableRow.id;
}

function databaseUpdater(submitEvent) {
    submitEvent.preventDefault();
    let newDogInfo = {
        name: formName.value,
        breed: formBreed.value,
        sex: formSex.value,
        id: formName.id,
    }
    fetch(dogDatabase+'/'+formName.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(newDogInfo)
    })
    .then(response => response.json())
    .then(newData => {
        console.log(newData);
        dataFetcher()
    })
    form.reset();
}
