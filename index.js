let form = document.querySelector('#form');
let modalSuccess = document.querySelector('.success');
let errorlSuccess = document.querySelector('.error');
let btnClose = document.querySelectorAll('.button-close');
let inputs = document.querySelectorAll('.input')
let texts = document.querySelectorAll('.text')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let count = 0;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == '') {
            texts[i].style.color = 'red'
            count++
        } else {
            texts[i].style.color = 'black'
        }
    }
    if (count > 0) {
        return false
    }

    const formData = new FormData(form)
    const values = Object.fromEntries(formData.entries());

    sendRequest('POST', requestURL, values)
        .then(data => {
            modalSuccess.style.display = 'block'
        })
        .catch(err => {
            errorlSuccess.style.display = 'block'
        })
});

const requestURL = 'https://jsonplaceholder.typicode.com/users'

function sendRequest(method, url, body = null) {
    const headers = {
        'Content-Type': 'application/json'
    }

    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json()
        }

        return response.json().then(error => {
            const e = new Error('Что-то пошло не так')
            e.data = error
            throw e
        })
    })
}

btnClose.forEach(item => {
    item.addEventListener('click', function () {
        this.parentNode.style.display = 'none'
    })
})




