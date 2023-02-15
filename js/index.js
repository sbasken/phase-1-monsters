const monsterList = document.querySelector("#monster-container")
const div = document.querySelector("#create-monster")
const forward = document.querySelector("#forward")
const back = document.querySelector("#back")
let page = 1;


fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
.then(res => res.json())
.then(monsters => {
    monsters.forEach(renderMonster)
    renderForm()

})

forward.addEventListener("click", () => {
    monsterList.innerHTML = ""

    page += 1;

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(monsters => {
        monsters.forEach(renderMonster)
    })
})

back.addEventListener("click", () => {
    monsterList.innerHTML = ""

    if (page > 1) {
        page -= 1;
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(monsters => {
            monsters.forEach(renderMonster)
        })
    }

})

function renderMonster(monster) {
    const div = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.textContent = monster.name;

    const h4 = document.createElement('h4')
    h4.textContent = monster.age;

    const p = document.createElement('p')
    p.textContent = monster.description;

    monsterList.append(div, h2, h4, p)
}

function renderForm() {
    const form = document.createElement('form')
    div.append(form)
    const name = document.createElement('input')
    name.id = "name"
    name.placeholder = "Name..."
    name.name = "name"

    const age = document.createElement('input')
    age.id = "age"
    age.placeholder = "Age..."
    age.name = "age"

    const description = document.createElement('input')
    description.id = "description"
    description.placeholder = "Description..."
    description.name = "description"

    const button = document.createElement('button')
    button.textContent = "Create Monster Button"

    form.append(name, age, description, button)

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log(e.target.name.value)
        const newMonster = {
            name: e.target.name.value,
            age: parseInt(e.target.age.value),
            description: e.target.description.value
        }
        console.log(newMonster)
        renderMonster(newMonster)
        
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMonster)
        })
    })
}

