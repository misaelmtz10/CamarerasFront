const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

/*getToken = () =>{
    let token = sessionStorage.getItem("myToken");
    console.log(token);
}*/

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


/*Function login api rest*/
async function Registrar() {
  let data = {
              name: document.getElementById("name").value,
              surname: document.getElementById("surname").value,
              lastname: document.getElementById("lastname").value,
              email: document.getElementById("email").value,
              password: document.getElementById("password").value,
              status: 1,
              role_id : 2

          };
  let name = document.forms["formRegister"]["name"].value;
  let surname = document.forms["formRegister"]["surname"].value
  let lastname = document.forms["formRegister"]["lastname"].value
  let email = document.forms["formRegister"]["email"].value;
  let password = document.forms["formRegister"]["password"].value;
  try {

      if (name == "" || surname == "" || lastname == "" || email == "" || password == "") {
          alert("Todos los campos deben estar llenos");
      } else {
          
          const request = await fetch('http://127.0.0.1:8000/api/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json;'
              },
              body: JSON.stringify(data)
          })
          const response = await request.json()
          console.log(response);
          if (response.data) {
            swal({
                title: "Éxito!",
                text: JSON.stringify(response.message),
                icon: "success",
                button: "ok",
            });
            setTimeout( function() { window.location.href = "http://localhost:8080/"; }, 3000 );
          } else {
            swal({
                title: "Error!",
                text: JSON.stringify(response.message),
                icon: "error",
                button: "ok",
            });
          }
          

          //location.reload()
      }
      //alert('success: ' + JSON.stringify(response));
  } catch (error) {
      alert(error);
  }

}


async function login() {
  let data = {
              email: document.getElementById("emaillogin").value,
              password: document.getElementById("passwordlogin").value,
          };
  let email = document.forms["formLogin"]["emaillogin"].value;
  let password = document.forms["formLogin"]["passwordlogin"].value;
  try {

      if (email == "" || password == "") {
          alert("Todos los campos deben estar llenos");
      } else {
          
          const request = await fetch('http://127.0.0.1:8000/api/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json;'
              },
              body: JSON.stringify(data)
          })
          const response = await request.json()
          console.log(response);
          if (response.access_token) {
            sessionStorage.setItem("myToken", response.access_token);
            setTimeout( function() { window.location.href = "http://localhost:8080/pages/home.html"; }, 3000 );
          } else {
            swal({
                title: "Error!",
                text: "Contraseña y/o usuario incorrectos",
                icon: "error",
                button: "Ok",
            }); 
          }

          //location.reload()
      }
      //alert('success: ' + JSON.stringify(response));
  } catch (error) {
      alert(error);
  }

}
