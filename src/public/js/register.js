const form = document.getElementById('registerForm');


form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status == 200) {
            window.location.replace('/current')
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuario Registrado",
                timer: 6000
              })
        }
    })
    document.getElementById("registerForm").reset();
})


