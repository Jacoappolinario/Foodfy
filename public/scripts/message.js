const Message = {
    error(event) {
        Swal.fire({
            title: 'Oops...',
            text: 'Chef possui receitas!',
            icon: 'error',
            confirmButtonColor: '#6558C3',
            confirmButtonText: 'OK'
        })

        event.preventDefault()
    },
    confirmDelete() {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6558C3',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, exclua!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Excluído!',
                text: 'Seu arquivo foi excluído.',
                icon: 'success',
                confirmButtonColor: '#6558C3',
                confirmButtonText: 'OK'
              }).then(()=> {
                  document.getElementById("form-delete").submit()
                })
            }
          })
    }
}
