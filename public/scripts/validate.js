const Validate = {
    apply(input, func) {
        Validate.clearErros(input)

        let results = Validate[func](input.value)
        input.value = results.value

        if (results.error)
            Validate.displayError(input, results.error)
    },
    displayError(input, error) {
        const div = document.createElement('div')
        div.classList.add('error')
        div.innerHTML = error
        input.parentNode.appendChild(div)
        input.focus()
    },
    clearErros(input){
        const errorDiv = input.parentNode.querySelector(".error")
        if (errorDiv)
            errorDiv.remove()
    },
    isEmail(value) {
        let error = null

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!value.match(mailFormat))
            error = "Email inválido"

        return {
            error,
            value
        }
    },
    allFields(e) {
        const items = document.querySelectorAll(' .item input, .item select, .item textarea')
        for (item of items) {
            if (item.value == "") {
                const message = document.createElement('div')
                message.classList.add('messages')
                message.classList.add('error')
                message.style.position = 'fixed'
                message.innerHTML = 'Por favor, preencha todos os campos.'
                document.querySelector('body').append(message)

                e.preventDefault()
            }
        }
    }
}