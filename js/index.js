const form = document.querySelector('form'); //getId doesn't seem to work with form.reset
let ulUser = document.getElementById('user-list');
let ulRepo = document.getElementById('repos-list');
let usersArray;

form.addEventListener('submit', (e) =>
{   e.preventDefault()
    ulUser.innerHTML = ''
    ulRepo.innerHTML = ''
    const userInput = e.target.search.value
    fetch(`https://api.github.com/search/users?q=${userInput}`)
    .then(resp => resp.json())
    .then(obj => {
        usersArray = obj.items
        usersArray.map(searchResult)
    form.reset()
    })
}
)
function searchResult(eachUser) {
    const li = document.createElement('li');
    const h2 = document.createElement('h2');
    const img = document.createElement('img')
    img.src = eachUser.avatar_url
    h2.textContent = eachUser.login
    li.append(h2, img)
    ulUser.appendChild(li)

    h2.addEventListener('click', () => {
        ulRepo.innerHTML = ''
        fetch(`https://api.github.com/users/${eachUser.login}/repos`)
        .then(resp => resp.json())
        .then(repoList => {
        repoList.map(showRepo)
})
    })
}

function showRepo(eachRepo) {
    const li = document.createElement('li');
    li.innerHTML = `
    <h1>${eachRepo.name} </h1>
    `
    ulRepo.appendChild(li)

}

