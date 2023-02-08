
const formElement = document.querySelector('.js-form')

formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const birthDate = e.target[1].value
    console.log(name, birthDate)
})