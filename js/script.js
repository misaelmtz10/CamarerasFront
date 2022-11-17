const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

/*Function login api rest*/
async function Registrar() {
    let name = document.forms["formRegister"]["name"].value;
    let surname = document.forms["formRegister"]["surname"].value
    let lastname = document.forms["formRegister"]["lastname"].value
    let email = document.forms["formRegister"]["email"].value;
    let password = document.forms["formRegister"]["password"].value;

    let data = {
        name: name,
        surname: surname,
        lastname: lastname,
        email: email,
        password: password,
        status: 1,
        role_id: 2

    }

    try {
        if (name == "" || surname == "" || lastname == "" || email == "" || password == "") {
            swal({
                title: "Error!",
                text: "Todos los campos deben estar llenos",
                icon: "warning",
                button: "Ok",
            });
        } else {
            const request = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(data)
            })
            const response = await request.json()
            if (response.data) {
                swal({
                    title: "Éxito!",
                    text: JSON.stringify(response.message),
                    icon: "success",
                    button: "ok",
                });
                setTimeout(function () { window.location.href = "http://localhost:8080/"; }, 3000);
            } else {
                swal({
                    title: "Error!",
                    text: JSON.stringify(response.message),
                    icon: "error",
                    button: "ok",
                });
            }
        }
    } catch (error) {
        alert(error);
    }

}


async function login() {
    let email = document.forms["formLogin"]["emaillogin"].value;
    let password = document.forms["formLogin"]["passwordlogin"].value;
    let data = {
        email: email,
        password: password,
    }
    try {
        if (email == "" || password == "") {
            swal({
                title: "Error!",
                text: "Todos los campos deben estar llenos",
                icon: "warning",
                button: "Ok",
            });
        } else {
            const request = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;'
                },
                body: JSON.stringify(data)
            })
            const response = await request.json()
            if (response.access_token) {
                localStorage.setItem("myToken", response.access_token);
                setTimeout(function () { window.location.href = "http://localhost:8080/pages/edificio.html"; }, 500);
            } else {
                swal({
                    title: "Error!",
                    text: "Contraseña y/o usuario incorrectos",
                    icon: "error",
                    button: "Ok",
                });
            }
        }
    } catch (error) {
        alert(error);
    }

}

async function signOut (){
    let token = localStorage.getItem("myToken")
    const request = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
        },
    })
    const response = await request.json()
    
    if (response.message.localeCompare('Unauthenticated.') === 0) {
        new swal({
            title: "Error!",
            text: "No hay una sesión activa",
            icon: "error",
            button: "Ok",
        });
    }
    localStorage.removeItem("myToken")
    setTimeout(function () { window.location.href = "http://localhost:8080/"; }, 500);
}
