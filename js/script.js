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
  let data = {
              name: document.getElementById("name").value,
              email: document.getElementById("email").value,
              password: document.getElementById("password").value,
              role_id : 2

          };
  let name = document.forms["formRegister"]["name"].value;
  let email = document.forms["formRegister"]["email"].value;
  let password = document.forms["formRegister"]["password"].value;
  try {

      if (name == "" || email == "" || password == "") {
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
          swal({
              title: "Registro correcto!",
              text: "Los datos son: " + JSON.stringify(response),
              icon: "success",
              button: "Salir!",
          });

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
          swal({
              title: "Registro correcto!",
              text: "Los datos son: " + JSON.stringify(response),
              icon: "success",
              button: "Salir!",
          });

          //location.reload()
      }
      //alert('success: ' + JSON.stringify(response));
  } catch (error) {
      alert(error);
  }

}
