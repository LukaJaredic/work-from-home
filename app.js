var toDos
const form = document.getElementById('to-do__form')
const msg = document.getElementById('message')
const inputElement = document.getElementById('new-list-item')
const listElement = document.getElementById('to-do__list')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    msg.hidden = true
    inputElement.style.border = 'none'
    addToDo()
})
initToDos()

function initToDos() {
    toDos = localStorage.getItem('to-dos')
    toDos = toDos ? JSON.parse(toDos) : []

    let listHTML = ''
    for (let item of toDos) {
        listHTML += `<li class="to-do__item ${item.done ? 'finished' : ''}" id=${item.id} onclick='done(event)'>
        ${item.txt}
        <button class="close" onclick="remove(event)">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
            >
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                />
            </svg>
        </button>
    </li>`
    }
    listElement.innerHTML = listHTML
}

function done(event) {
    let id = event.currentTarget.id
    for (let item of toDos) if (item.id == id) item.done = !item.done
    saveToDos()
    initToDos()
}

function remove(event) {
    event.stopPropagation()
    let id = event.currentTarget.parentNode.id
    toDos = toDos.filter((item) => item.id != id)
    saveToDos()
    initToDos()
}
function showInvalidInput(message) {
    msg.innerHTML = message
    msg.hidden = false
    inputElement.style.border = '1px solid red'
}
function addToDo() {
    const toDoText = inputElement.value.trim()
    if (toDoText.length == 0) {
        return showInvalidInput('Cant accept an empty task')
    }
    let exists = toDos.find((item) => item.txt === toDoText)
    if (exists) {
        return showInvalidInput('This task already exists in todos')
    }
    toDos.push({ id: new Date().getTime(), txt: toDoText, done: false })
    inputElement.value = ''
    saveToDos()
    initToDos()
}

function saveToDos() {
    localStorage.setItem('to-dos', JSON.stringify(toDos))
}
