const formElement = document.querySelector('.js-form')
const listElement = document.querySelector('.js-list')
const pessoas = JSON.parse(localStorage.getItem('pessoas')) || []

pessoas.forEach(e => criaElemento(e))

formElement.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e)
    const id = e.target.elements['id']
    const name = e.target.elements['name']
    const birthDate = e.target.elements['birth-date']

    if (name.value != "" && birthDate.value != "") {

        const pessoaAtual = {
            "id": id.value,
            "name": name.value,
            "birthDate": birthDate.value
        }

        const existe = pessoas.find(ele => ele.id === parseInt(id.value))

        if (existe) {
            pessoaAtual.id = existe.id
            atualizaElemento(pessoaAtual)
            pessoas[pessoas.findIndex(e => e.name === existe.name)] = pessoaAtual
        } else {
            pessoaAtual.id = pessoas[pessoas.length - 1] ? (pessoas[pessoas.length - 1]).id + 1 : 0
            criaElemento(pessoaAtual)
            pessoas.push(pessoaAtual)
        }

        localStorage.setItem('pessoas', JSON.stringify(pessoas))

        id.value = ""
        name.value = ""
        birthDate.value = ""
    }
})

function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.dataset.id = item.id
    novoItem.classList.add('item')

    const nameItem = document.createElement('span')
    nameItem.classList.add('item__name')
    nameItem.innerHTML = item.name
    novoItem.appendChild(nameItem)

    const birthDateItem = document.createElement('strong')
    birthDateItem.innerHTML = item.birthDate
    novoItem.appendChild(birthDateItem)

    novoItem.appendChild(botaoEdita(item.id))
    novoItem.appendChild(botaoDeleta(item.id))

    listElement.appendChild(novoItem)

}

function botaoEdita(id) {
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = 'EDITAR'
    elementoBotao.addEventListener('click', function () {
        editarElemento(id)
    })
    return elementoBotao
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = 'X'

    elementoBotao.addEventListener('click', function () {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function editarElemento (id) {
    const pessoaSelecionada = pessoas.find(e => e.id === id)
    formElement.elements['id'].value = pessoaSelecionada.id
    formElement.elements['name'].value = pessoaSelecionada.name
    formElement.elements['birth-date'].value = pessoaSelecionada.birthDate
}

function deletaElemento(tag, id) {
    tag.remove()

    pessoas.splice(pessoas.findIndex(e => e.id === id), 1)

    localStorage.setItem('pessoas', JSON.stringify(pessoas))
}

function atualizaElemento(item) {
    document.querySelector(`[data-id="${item.id}"]`).children[1].innerHTML = item.birthDate
    document.querySelector('.item__name').innerHTML = item.name
    
}

