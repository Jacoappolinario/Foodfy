const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener("click", function() {
        const id = card.getAttribute('id')
        window.location.href = `/recipes/${id}`
    })
}

const PhotosUpload = {
    uploadLimit: 5,
    handleFileInput(event) {
        const { files: filesList } = event.target
        const { uploadLimit } = PhotosUpload

        if (filesList.length > uploadLimit) {
            alert(`Envie no maximo ${uploadLimit} fotos`)
            event.preventDefault()
            return 
        }

        Array.from(filesList).forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = document.createElement('div')
                div.classList.add('photo')

                div.onclick = () => alert('remover foto')

                div.appendChild(image)

                document.querySelector('#photos-preview').appendChild(div)
            }

            reader.readAsDataURL(file)
        })
    }
}